import { useEffect, useState } from 'react';
import { BookOpen, Plus, PenLine, KeyRound, ArrowUpCircle, Stars, Clock, Heart, Moon, Calculator, HandHeart, Landmark, Utensils, Brain, CalendarClock, Plane, Map, Building2, Shield, HeartPulse, Activity, Users, Eye, Siren, Handshake, Crown, ScrollText, DoorOpen } from 'lucide-react';
import { useProjectStore } from '../../store/project-store';
import { useTaskStore } from '../../store/task-store';
import { useModuleProgress } from '../../hooks/useModuleProgress';
import { safeGet, safeSet } from '../../services/storage';
import ProjectBoard from './ProjectBoard';
import './PillarBoard.css';

const TABS = [
  { key: 'dashboard',  label: 'Dashboard',  color: '#64748b', type: 'page' },
  { key: 'core',       label: 'CORE',       color: '#C8A96E', type: 'board' },
  { key: 'growth',     label: 'GROWTH',     color: '#4ab8a8', type: 'board' },
  { key: 'excellence', label: 'EXCELLENCE', color: '#8b5cf6', type: 'board' },
  { key: 'journal',    label: 'Journal',    color: '#e57c53', type: 'page' },
];

/* ── Journal helpers ── */
function getJournalKey(modulePrefix, pillarKey) {
  return `bbiz_${modulePrefix}_journal_${pillarKey}`;
}

function loadEntries(modulePrefix, pillarKey) {
  return safeGetJSON(getJournalKey(modulePrefix, pillarKey), []);
}

function saveEntries(modulePrefix, pillarKey, entries) {
  safeSet(getJournalKey(modulePrefix, pillarKey), entries);
}

/* ── Icon map (data icon name → Lucide component) ── */
const ICON_MAP = {
  lock: KeyRound,
  expand_circle_up: ArrowUpCircle,
  stars: Stars,
  schedule: Clock,
  self_improvement: Heart,
  nights_stay: Moon,
  calculate: Calculator,
  volunteer_activism: HandHeart,
  account_balance: Landmark,
  restaurant: Utensils,
  psychology: Brain,
  event_repeat: CalendarClock,
  flight_takeoff: Plane,
  map: Map,
  mosque: Building2,
  shield: Shield,
  heart_pulse: HeartPulse,
  activity: Activity,
  users: Users,
  eye: Eye,
  siren: Siren,
  handshake: Handshake,
  crown: Crown,
  heart: Heart,
  book_open: BookOpen,
  scroll: ScrollText,
  door_open: DoorOpen,
};

/* ── SVG Progress Ring ── */
function MasteryRing({ percent, pillarColor, pillarKey }) {
  const r = 70;
  const stroke = 10;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  const gradId = `ringGrad_${pillarKey}`;

  return (
    <svg width="180" height="180" viewBox="0 0 180 180" className="fpd__ring-svg">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={pillarColor} stopOpacity="0.6" />
          <stop offset="100%" stopColor={pillarColor} />
        </linearGradient>
      </defs>
      <circle cx="90" cy="90" r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
      <circle
        cx="90" cy="90" r={r} fill="none"
        stroke={`url(#${gradId})`} strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={offset}
        transform="rotate(-90 90 90)"
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
      <text x="90" y="82" textAnchor="middle" className="fpd__ring-percent">{percent}%</text>
      <text x="90" y="104" textAnchor="middle" className="fpd__ring-label">Mastery</text>
    </svg>
  );
}

/* ── Dashboard sub-page ── */
function PillarDashboardTab({ pillarName, pillarColor, pillarKey, dashboardData, livePercent, onSwitchTab }) {
  const data = dashboardData;
  if (!data) return null;

  const displayPercent = livePercent ?? 0;

  const cardLevels = [
    { key: 'necessity', tabKey: 'core',       badge: 'NECESSITY',  className: 'fpd__card--necessity' },
    { key: 'growth',    tabKey: 'growth',     badge: 'GROWTH',     className: 'fpd__card--growth' },
    { key: 'excellence',tabKey: 'excellence', badge: 'EXCELLENCE', className: 'fpd__card--excellence' },
  ];

  return (
    <div className="fpd">
      {/* Mastery Ring + Quote */}
      <div className="fpd__ring-section">
        <MasteryRing percent={displayPercent} pillarColor={pillarColor} pillarKey={pillarKey} />
        <div className="fpd__quote-block">
          <p className="fpd__quote">{data.quote}</p>
          <p className="fpd__description">{data.description}</p>
        </div>
      </div>

      {/* 3-Card Grid */}
      <div className="fpd__grid">
        {cardLevels.map(({ key, tabKey, badge, className }) => {
          const card = data[key];
          const IconComp = ICON_MAP[card.icon] || Stars;
          return (
            <div key={key} className={`fpd__card ${className}`}>
              <IconComp size={28} className="fpd__card-icon" />
              <span className="fpd__card-badge">{badge}</span>
              <h4 className="fpd__card-title">{card.title}</h4>
              <p className="fpd__card-desc">{card.desc}</p>
              <button className="fpd__card-cta" onClick={() => onSwitchTab(tabKey)}>
                {card.cta}
              </button>
            </div>
          );
        })}
      </div>

      {/* Banner */}
      <div className="fpd__banner" style={{ '--banner-color': pillarColor }}>
        <h3 className="fpd__banner-headline">{data.banner.headline}</h3>
        <p className="fpd__banner-quote">{data.banner.quote}</p>
      </div>

    </div>
  );
}

/* ── Journal sub-page ── */
function PillarJournalTab({ modulePrefix, pillarKey, pillarName }) {
  const [entries, setEntries] = useState(() => loadEntries(modulePrefix, pillarKey));
  const [draft, setDraft] = useState('');

  const addEntry = () => {
    if (!draft.trim()) return;
    const entry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      text: draft.trim(),
      createdAt: new Date().toISOString(),
    };
    const updated = [entry, ...entries];
    setEntries(updated);
    saveEntries(modulePrefix, pillarKey, updated);
    setDraft('');
  };

  const removeEntry = (id) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    saveEntries(modulePrefix, pillarKey, updated);
  };

  return (
    <div className="faith-journal">
      <div className="faith-journal__header">
        <BookOpen size={20} style={{ color: 'var(--text2)' }} />
        <h3 className="faith-journal__title">{pillarName} Journal</h3>
      </div>
      <p className="faith-journal__desc">
        A space for personal reflection, intentions, and insights on your {pillarName.toLowerCase()} journey.
      </p>

      {/* Compose */}
      <div className="faith-journal__compose">
        <textarea
          className="faith-journal__textarea"
          placeholder="Write a reflection..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) addEntry(); }}
          rows={3}
        />
        <button className="btn btn-primary faith-journal__add" onClick={addEntry} disabled={!draft.trim()}>
          <Plus size={14} /> Add Entry
        </button>
      </div>

      {/* Entries */}
      {entries.length === 0 ? (
        <div className="faith-journal__empty">
          No journal entries yet. Start by writing a reflection above.
        </div>
      ) : (
        <div className="faith-journal__list">
          {entries.map((entry) => (
            <div key={entry.id} className="faith-journal__entry">
              <div className="faith-journal__entry-header">
                <span className="faith-journal__entry-date">
                  {new Date(entry.createdAt).toLocaleDateString(undefined, {
                    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
                  })}
                </span>
                <button
                  className="faith-journal__entry-remove"
                  onClick={() => removeEntry(entry.id)}
                  title="Remove entry"
                >
                  &times;
                </button>
              </div>
              <p className="faith-journal__entry-text">{entry.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Generic tabbed pillar board used by Faith and Life submodule pages.
 * Renders: Dashboard | Core | Growth | Excellence | Journal
 */
export default function PillarBoard({ pillarKey, pillarName, pillarColor, modulePrefix, ensureProjects, dashboardData }) {
  const getProject = useProjectStore((s) => s.getProject);
  const projects = useProjectStore((s) => s.projects);
  const loadTasks = useTaskStore((s) => s.loadTasks);
  const tabStorageKey = `${modulePrefix}_active_tab`;
  const [activeTab, setActiveTabRaw] = useState(() => {
    const saved = safeGet(tabStorageKey, 'dashboard');
    return TABS.some((t) => t.key === saved) ? saved : 'dashboard';
  });
  const setActiveTab = (tab) => {
    setActiveTabRaw(tab);
    safeSet(tabStorageKey, tab);
  };

  useEffect(() => {
    ensureProjects();
  }, []);

  // Load tasks for all three level boards so progress is always current
  useEffect(() => {
    const levels = ['core', 'growth', 'excellence'];
    for (const level of levels) {
      const boardId = `${modulePrefix}_${pillarKey}_${level}`;
      if (projects.some((p) => p.id === boardId)) {
        loadTasks(boardId);
      }
    }
  }, [projects, modulePrefix, pillarKey, loadTasks]);

  const { pct: livePercent } = useModuleProgress(pillarKey);

  const boardId = `${modulePrefix}_${pillarKey}_${activeTab}`;
  const project = getProject(boardId);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-3)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: pillarColor }} />
          <h2 style={{ fontSize: '1.3rem' }}>{pillarName}</h2>
        </div>

        {/* Tabs */}
        <div className="faith-pillar-tabs">
          {TABS.map(({ key, label, color }) => (
            <button
              key={key}
              className={`faith-pillar-tab${activeTab === key ? ' faith-pillar-tab--active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              <span className="faith-pillar-tab__dot" style={{ background: color }} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'dashboard' && (
        <PillarDashboardTab pillarName={pillarName} pillarColor={pillarColor} pillarKey={pillarKey} dashboardData={dashboardData} livePercent={livePercent} onSwitchTab={setActiveTab} />
      )}

      {activeTab === 'journal' && (
        <PillarJournalTab modulePrefix={modulePrefix} pillarKey={pillarKey} pillarName={pillarName} />
      )}

      {(activeTab === 'core' || activeTab === 'growth' || activeTab === 'excellence') && (
        project ? (
          <ProjectBoard projectId={boardId} project={project} />
        ) : (
          <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--text2)' }}>
            Loading board...
          </div>
        )
      )}

    </div>
  );
}
