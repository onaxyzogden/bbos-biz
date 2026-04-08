import { useEffect, useCallback, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { PenLine, BookOpen, Plus } from 'lucide-react';
import { safeGetJSON, safeSet } from '../../services/storage';
import { useAppStore } from '../../store/app-store';
import { useProjectStore } from '../../store/project-store';
import { useTaskStore } from '../../store/task-store';
import { useThresholdStore } from '../../store/threshold-store';
import { useSettingsStore } from '../../store/settings-store';
import { useMobile } from '../../hooks/useMobile';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useInactivity } from '../../hooks/useInactivity';
import { usePrayerTimes } from '../../hooks/usePrayerTimes';
import { PRESENCE_CONFIG } from '../../data/islamic-data';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MobileNav from './MobileNav';
import SearchPalette from '../shared/SearchPalette';
import IslamicPanel from '../islamic/IslamicPanel';
import ThresholdModal from '../islamic/ThresholdModal';
import ResumeOverlay from '../islamic/ResumeOverlay';
import PrayerOverlay from '../islamic/PrayerOverlay';
import PrayerWarning from '../islamic/PrayerWarning';
import NiyyahAct from '../islamic/NiyyahAct';
import './AppShell.css';

export default function AppShell() {
  const sidebarOpen = useAppStore((s) => s.sidebarOpen);
  const setSearchOpen = useAppStore((s) => s.setSearchOpen);
  const islamicPanelOpen = useAppStore((s) => s.islamicPanelOpen);
  const toggleIslamicPanel = useAppStore((s) => s.toggleIslamicPanel);
  const activeModule = useAppStore((s) => s.activeModule);
  const mobile = useMobile();
  const projects = useProjectStore((s) => s.projects);
  const loadTasks = useTaskStore((s) => s.loadTasks);
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);

  // Presence awareness state
  const completedOpening = useThresholdStore((s) => s.completedOpening);
  const resumeModuleId = useThresholdStore((s) => s.resumeModuleId);
  const isPrayerLocked = useThresholdStore((s) => s.isPrayerLocked);
  const currentPrayerName = useThresholdStore((s) => s.currentPrayerName);
  const prayerMsRemaining = useThresholdStore((s) => s.prayerMsRemaining);
  const prayerTimeMs = useThresholdStore((s) => s.prayerTimeMs);
  const prayerWarningName = useThresholdStore((s) => s.prayerWarningName);
  const prayerWarningDismissed = useThresholdStore((s) => s.prayerWarningDismissed);
  const niyyahDate = useThresholdStore((s) => s.niyyahDate);
  const triggerResume = useThresholdStore((s) => s.triggerResume);
  const dismissResume = useThresholdStore((s) => s.dismissResume);
  const setPrayerLock = useThresholdStore((s) => s.setPrayerLock);
  const showPrayerWarning = useThresholdStore((s) => s.showPrayerWarning);
  const dismissPrayerWarning = useThresholdStore((s) => s.dismissPrayerWarning);
  const clearPrayerWarning = useThresholdStore((s) => s.clearPrayerWarning);

  // Wire Cmd+K to open search
  useKeyboard('mod+k', () => setSearchOpen(true), [setSearchOpen]);

  // Wire Cmd+I to toggle Islamic panel
  useKeyboard('mod+i', () => toggleIslamicPanel(), [toggleIslamicPanel]);

  // Preload all project tasks so cross-project search works
  useEffect(() => {
    projects.forEach((p) => loadTasks(p.id));
  }, [projects.length]);

  // Inactivity detection — resume overlay on return
  const handleResume = useCallback(() => {
    if (completedOpening[activeModule]) {
      triggerResume(activeModule);
    }
  }, [completedOpening, activeModule, triggerResume]);

  useInactivity({
    timeoutMs: PRESENCE_CONFIG.INACTIVITY_TIMEOUT_MS,
    onResume: handleResume,
  });

  // Prayer time detection
  const { activePrayer, nextPrayer } = usePrayerTimes();

  // Prayer lock — triggers 5 min before prayer
  const dismissedPrayerRef = useRef(null);

  useEffect(() => {
    if (activePrayer && !isPrayerLocked && valuesLayer === 'islamic' && dismissedPrayerRef.current !== activePrayer.name) {
      setPrayerLock(true, activePrayer.name, activePrayer.msRemaining, activePrayer.prayerTimeMs);
    }
    // Reset dismissed ref when we move to a different prayer
    if (!activePrayer) {
      dismissedPrayerRef.current = null;
    }
  }, [activePrayer?.name, isPrayerLocked, valuesLayer]);

  // Prayer warning — triggers 15 min before prayer
  useEffect(() => {
    if (
      nextPrayer?.remainingMs != null
      && nextPrayer.remainingMs <= PRESENCE_CONFIG.PRAYER_WARNING_LEAD_MS
      && nextPrayer.remainingMs > PRESENCE_CONFIG.PRAYER_LEAD_MS
      && valuesLayer === 'islamic'
      && prayerWarningName !== nextPrayer.name
    ) {
      showPrayerWarning(nextPrayer.name);
    }
    // Clear warning when lock activates
    if (isPrayerLocked && prayerWarningName) {
      clearPrayerWarning();
    }
  }, [nextPrayer?.remainingMs, isPrayerLocked]);

  // Prayer dismiss handler — chain into resume overlay
  const handlePrayerDismiss = useCallback(() => {
    dismissedPrayerRef.current = currentPrayerName;
    setPrayerLock(false, null, null);
    if (completedOpening[activeModule]) {
      triggerResume(activeModule);
    }
  }, [setPrayerLock, completedOpening, activeModule, triggerResume]);

  const showReflectionPanel = useAppStore((s) => s.reflectionOpen);
  const setShowReflectionPanel = useAppStore((s) => s.setReflectionOpen);
  const [isPanelClosing, setIsPanelClosing] = useState(false);
  const [reflectionDraft, setReflectionDraft] = useState('');
  const [reflectionEntries, setReflectionEntries] = useState(() =>
    safeGetJSON('global_journal_reflection', [])
  );

  const addReflection = () => {
    if (!reflectionDraft.trim()) return;
    const entry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      text: reflectionDraft.trim(),
      createdAt: new Date().toISOString(),
    };
    const updated = [entry, ...reflectionEntries];
    setReflectionEntries(updated);
    safeSet('global_journal_reflection', updated);
    setReflectionDraft('');
  };

  const closeReflectionPanel = () => {
    setIsPanelClosing(true);
    setTimeout(() => {
      setShowReflectionPanel(false);
      setIsPanelClosing(false);
    }, 220);
  };

  const removeReflection = (id) => {
    const updated = reflectionEntries.filter((e) => e.id !== id);
    setReflectionEntries(updated);
    safeSet('global_journal_reflection', updated);
  };

  // Daily Niyyah Act gate
  const today = new Date().toISOString().slice(0, 10);
  const niyyahNeeded = niyyahDate !== today;

  const sidebarCol = sidebarOpen ? 'var(--sidebar-w)' : 'var(--sidebar-w-collapsed)';
  const panelCol = islamicPanelOpen && !mobile ? ' var(--islamic-panel-w)' : '';
  const gridCols = mobile ? '1fr' : `${sidebarCol} 1fr${panelCol}`;

  // Minutes until prayer itself, and minutes until the lock screen activates
  const minutesUntilPrayer = nextPrayer?.remainingMs != null
    ? Math.ceil(nextPrayer.remainingMs / 60000)
    : 0;
  const minutesUntilLock = nextPrayer?.remainingMs != null
    ? Math.ceil((nextPrayer.remainingMs - PRESENCE_CONFIG.PRAYER_LEAD_MS) / 60000)
    : 0;

  return (
    <>
      <div className="app-shell" style={{ gridTemplateColumns: gridCols }}>
        <TopBar />
        <Sidebar />
        <main className="app-main">
          <Outlet />
        </main>
        {islamicPanelOpen && <IslamicPanel />}
        {mobile && <MobileNav />}
      </div>
      <SearchPalette />
      <ThresholdModal type="opening" />
      <ThresholdModal type="closing" />
      {resumeModuleId && !isPrayerLocked && (
        <ResumeOverlay moduleId={resumeModuleId} onDismiss={dismissResume} />
      )}
      {isPrayerLocked && (
        <PrayerOverlay
          prayerName={currentPrayerName}
          prayerTimeMs={prayerTimeMs}
          onDismiss={handlePrayerDismiss}
        />
      )}
      {niyyahNeeded && <NiyyahAct />}
      {prayerWarningName && !prayerWarningDismissed && !isPrayerLocked && (
        <PrayerWarning
          prayerName={prayerWarningName}
          minutesUntilPrayer={minutesUntilPrayer}
          minutesUntilLock={minutesUntilLock}
          onDismiss={dismissPrayerWarning}
        />
      )}


      {showReflectionPanel && (
        <>
          <div className="journal-panel-overlay" onClick={closeReflectionPanel} />
          <div className={`journal-panel${isPanelClosing ? ' journal-panel--closing' : ''}`}>
            <div className="journal-panel__header">
              <span className="journal-panel__title">Reflection</span>
              <button className="journal-panel__close" onClick={closeReflectionPanel}>✕</button>
            </div>
            <div className="journal-panel__body">
              <div className="faith-journal">
                <div className="faith-journal__header">
                  <BookOpen size={20} style={{ color: 'var(--text2)' }} aria-hidden="true" />
                  <h3 className="faith-journal__title">Reflection Journal</h3>
                </div>
                <p className="faith-journal__desc">A space for personal reflection, intentions, and insights.</p>
                <div className="faith-journal__compose">
                  <textarea
                    className="faith-journal__textarea"
                    placeholder="Write a reflection..."
                    value={reflectionDraft}
                    onChange={(e) => setReflectionDraft(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) addReflection(); }}
                    rows={3}
                  />
                  <button className="btn btn-primary faith-journal__add" onClick={addReflection} disabled={!reflectionDraft.trim()}>
                    <Plus size={14} aria-hidden="true" /> Add Entry
                  </button>
                </div>
                {reflectionEntries.length === 0 ? (
                  <div className="faith-journal__empty">No journal entries yet. Start by writing a reflection above.</div>
                ) : (
                  <div className="faith-journal__list">
                    {reflectionEntries.map((entry) => (
                      <div key={entry.id} className="faith-journal__entry">
                        <div className="faith-journal__entry-header">
                          <span className="faith-journal__entry-date">
                            {new Date(entry.createdAt).toLocaleDateString(undefined, {
                              weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
                            })}
                          </span>
                          <button className="faith-journal__entry-remove" onClick={() => removeReflection(entry.id)} title="Remove entry">&times;</button>
                        </div>
                        <p className="faith-journal__entry-text">{entry.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
