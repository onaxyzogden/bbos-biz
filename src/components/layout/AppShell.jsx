import { useEffect, useCallback, useRef } from 'react';
import { Outlet } from 'react-router-dom';
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
  const prayerWarningName = useThresholdStore((s) => s.prayerWarningName);
  const prayerWarningDismissed = useThresholdStore((s) => s.prayerWarningDismissed);
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
      setPrayerLock(true, activePrayer.name, activePrayer.msRemaining);
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
          initialMs={prayerMsRemaining}
          onDismiss={handlePrayerDismiss}
        />
      )}
      {prayerWarningName && !prayerWarningDismissed && !isPrayerLocked && (
        <PrayerWarning
          prayerName={prayerWarningName}
          minutesUntilPrayer={minutesUntilPrayer}
          minutesUntilLock={minutesUntilLock}
          onDismiss={dismissPrayerWarning}
        />
      )}
    </>
  );
}
