import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Kanban, ArrowRight, CheckCircle2, Clock, AlertTriangle, CalendarDays,
  ListTodo, FolderOpen, Calendar, BarChart3, Activity, TrendingUp,
  TrendingDown, Eye, Sparkles, ChevronRight, UserPlus,
} from 'lucide-react';
import { useProjectStore } from '../store/project-store';
import { useAuthStore } from '../store/auth-store';
import { useTaskStore } from '../store/task-store';
import { useSettingsStore } from '../store/settings-store';
import { useThresholdStore } from '../store/threshold-store';
import { useOfficeStore } from '../store/office-store';
import { Zap } from 'lucide-react';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import { MODULES } from '../data/modules';
import { MAQASID_PILLARS } from '../data/maqasid';
import PillarCard from '../components/dashboard/PillarCard';
import './Dashboard.css';

/* ── Greeting by time of day ── */
function getGreeting() {
  const h = new Date().getHours();
  if (h < 6) return "you're burning the midnight oil";
  if (h < 12) return "you've made it to the morning";
  if (h < 17) return "you've made it to the afternoon";
  if (h < 21) return "you've made it to the evening";
  return "you're closing out the day";
}

function getMotivation() {
  const phrases = [
    "You've got a mountain to climb today.",
    "Stay focused, stay blessed.",
    "Excellence is a habit, not an act.",
    "Small steps lead to great outcomes.",
    "Every task completed is a step forward.",
  ];
  const dayIndex = new Date().getDate() % phrases.length;
  return phrases[dayIndex];
}

/* ── BCG chart (SVG line chart) ── */
const BCG_RANGES = [
  { id: 'latest', label: 'Latest' },
  { id: '2h',    label: '2 hours' },
  { id: '6h',    label: '6 hours' },
  { id: '12h',   label: '12 Hours' },
  { id: '2d',    label: '2 Days' },
];

function BCGChart({ data }) {
  const [range, setRange] = useState('2d');
  const hasData = data?.some((d) => d.count > 0);

  const PAD = { left: 45, right: 15, top: 20, bottom: 30 };
  const W = 520;
  const H = 180;
  const PLOT_W = W - PAD.left - PAD.right;
  const PLOT_H = H - PAD.top - PAD.bottom;

  const maxVal = Math.max(...(data || []).map((d) => d.count), 1);
  const minVal = 0;
  const midY = PAD.top + PLOT_H / 2;

  const points = (data || []).map((d, i) => {
    const x = PAD.left + (i / Math.max((data || []).length - 1, 1)) * PLOT_W;
    const y = PAD.top + PLOT_H - (d.count / maxVal) * PLOT_H;
    return { x, y, ...d };
  });

  const linePoints = points.map((p) => `${p.x},${p.y}`).join(' ');
  const areaPoints = points.length > 0
    ? `${points[0].x},${PAD.top + PLOT_H} ${linePoints} ${points[points.length - 1].x},${PAD.top + PLOT_H}`
    : '';

  const gridLines = [0.25, 0.5, 0.75].map((pct) => PAD.top + PLOT_H * (1 - pct));
  const yLabels = [0.25, 0.5, 0.75, 1].map((pct) => ({
    y: PAD.top + PLOT_H * (1 - pct),
    label: Math.round(maxVal * pct),
  }));

  return (
    <div className="bcg-chart">
      <div className="bcg-chart__header">
        <div>
          <span className="bcg-chart__title">Your Personal <strong>BCG</strong></span>
        </div>
        <div className="bcg-chart__ranges">
          {BCG_RANGES.map((r) => (
            <button
              key={r.id}
              className={`bcg-range-btn ${range === r.id ? 'active' : ''}`}
              onClick={() => setRange(r.id)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
      {!hasData ? (
        <div className="bcg-chart__empty">
          <Activity size={28} style={{ color: 'var(--text3)' }} />
          <p>Complete tasks to see your BCG</p>
        </div>
      ) : (
        <svg viewBox={`0 0 ${W} ${H}`} className="bcg-chart__svg" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="bcgGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Y-axis labels */}
          {yLabels.map((yl, i) => (
            <text key={i} x={PAD.left - 8} y={yl.y + 3} textAnchor="end"
              fill="var(--text3)" fontSize="9" fontFamily="JetBrains Mono, monospace">
              {yl.label}
            </text>
          ))}

          {/* Grid lines */}
          {gridLines.map((y, i) => (
            <line key={i} x1={PAD.left} y1={y} x2={W - PAD.right} y2={y}
              stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 3" />
          ))}

          {/* Zero line */}
          <line x1={PAD.left} y1={PAD.top + PLOT_H} x2={W - PAD.right} y2={PAD.top + PLOT_H}
            stroke="var(--border)" strokeWidth="0.5" />

          <polygon points={areaPoints} fill="url(#bcgGrad)" />
          <polyline points={linePoints} fill="none" stroke="var(--primary)"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="3"
              fill="var(--primary)" stroke="var(--surface)" strokeWidth="1.5" />
          ))}

          {/* X-axis labels */}
          {points.filter((_, i) => i % Math.ceil(points.length / 7) === 0 || i === points.length - 1).map((p, i) => (
            <text key={`l${i}`} x={p.x} y={H - 6} textAnchor="middle"
              fill="var(--text3)" fontSize="9" fontFamily="DM Sans, sans-serif">
              {p.label}
            </text>
          ))}
        </svg>
      )}
      <div className="bcg-chart__legend">
        <span className="bcg-legend-item">
          <span className="bcg-legend-dot" style={{ background: 'var(--primary)' }} /> Positive signal
        </span>
        <span className="bcg-legend-item">
          <span className="bcg-legend-dot" style={{ background: 'var(--danger)' }} /> Negative signal
        </span>
      </div>
    </div>
  );
}

/* ── Workflow Pressure Gauge ── */
function WorkflowPressure({ level }) {
  // level: 'low' | 'medium' | 'high'
  const bars = 10;
  const filled = level === 'low' ? 2 : level === 'medium' ? 5 : 8;
  const color = level === 'low' ? 'var(--success)' : level === 'medium' ? 'var(--warning)' : 'var(--danger)';

  return (
    <div className="wf-pressure">
      <div className="wf-pressure__header">
        <span className="wf-pressure__title">Workflow Pressure</span>
        <span className="wf-pressure__level" style={{ color }}>{level.toUpperCase()}</span>
      </div>
      <div className="wf-pressure__bars">
        {Array.from({ length: bars }).map((_, i) => (
          <div key={i} className={`wf-bar ${i < filled ? 'filled' : ''}`}
            style={i < filled ? { background: color } : undefined} />
        ))}
      </div>
      <div className="wf-pressure__labels">
        <span>Low</span><span>Medium</span><span>High</span>
      </div>
      <p className="wf-pressure__desc">Workflow pressure is measured by number, priority and due dates of tasks.</p>
    </div>
  );
}

/* ── Main Dashboard ── */
export default function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const allProjects = useProjectStore((s) => s.projects);
  const tasksByProject = useTaskStore((s) => s.tasksByProject);
  const events = useOfficeStore((s) => s.events);
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const completedOpening = useThresholdStore((s) => s.completedOpening);
  const deferred = useThresholdStore((s) => s.deferred);
  const niyyahFocus = useThresholdStore((s) => s.niyyahFocus);
  const { nextPrayer } = usePrayerTimes();

  const [projectFilter, setProjectFilter] = useState('all');
  const [activityTab, setActivityTab] = useState('all');

  const isIslamic = valuesLayer === 'islamic';
  const projects = useMemo(() => allProjects.filter((p) => !p.archived), [allProjects]);
  const allTasks = useMemo(() => Object.values(tasksByProject).flat(), [tasksByProject]);

  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  // Stats
  const stats = useMemo(() => {
    const now = new Date();
    const firstColIds = new Set();
    const lastColIds = new Set();
    for (const p of projects) {
      if (p.columns.length > 0) {
        firstColIds.add(p.columns[0].id);
        lastColIds.add(p.columns[p.columns.length - 1].id);
      }
    }
    return {
      tasks: allTasks.length,
      projects: projects.length,
      events: events.length,
      completed: allTasks.filter((t) => t.completedAt).length,
      inProgress: allTasks.filter((t) =>
        !t.completedAt && !firstColIds.has(t.columnId) && !lastColIds.has(t.columnId)
      ).length,
      overdue: allTasks.filter((t) =>
        t.dueDate && new Date(t.dueDate) < now && !t.completedAt
      ).length,
    };
  }, [allTasks, projects, events]);

  // EPH (events per hour — simplified: tasks completed today)
  const eph = useMemo(() => {
    const todayStr = new Date().toISOString().slice(0, 10);
    return allTasks.filter((t) => t.completedAt && t.completedAt.slice(0, 10) === todayStr).length;
  }, [allTasks]);

  // Workflow pressure
  const pressureLevel = useMemo(() => {
    if (stats.overdue >= 5 || stats.inProgress > 15) return 'high';
    if (stats.overdue >= 2 || stats.inProgress > 8) return 'medium';
    return 'low';
  }, [stats]);

  // 14-point BCG data (last 14 days completions)
  const bcgData = useMemo(() => {
    const days = [];
    const now = new Date();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);
      const dateStr = d.toISOString().slice(0, 10);
      const label = d.toLocaleDateString('en', { month: 'short', day: 'numeric' });
      const count = allTasks.filter((t) =>
        t.completedAt && t.completedAt.slice(0, 10) === dateStr
      ).length;
      days.push({ date: dateStr, label, count });
    }
    return days;
  }, [allTasks]);

  // Upcoming events (next 7 days)
  const upcomingEvents = useMemo(() => {
    const now = new Date();
    const weekLater = new Date(now);
    weekLater.setDate(weekLater.getDate() + 7);
    const todayStr = now.toISOString().slice(0, 10);
    const weekStr = weekLater.toISOString().slice(0, 10);
    return events
      .filter((e) => e.date >= todayStr && e.date <= weekStr)
      .sort((a, b) => a.date.localeCompare(b.date) || (a.startTime || '').localeCompare(b.startTime || ''))
      .slice(0, 5);
  }, [events]);

  // Open tasks sorted by priority
  const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
  const openTasks = useMemo(() => {
    let tasks = allTasks.filter((t) => !t.completedAt);
    if (projectFilter !== 'all') {
      tasks = tasks.filter((t) => t.projectId === projectFilter);
    }
    return tasks
      .sort((a, b) => (priorityOrder[a.priority] ?? 9) - (priorityOrder[b.priority] ?? 9))
      .slice(0, 10);
  }, [allTasks, projectFilter]);

  // Activity timeline
  const activityItems = useMemo(() => {
    const items = [];
    // Recently completed tasks
    allTasks
      .filter((t) => t.completedAt)
      .sort((a, b) => b.completedAt.localeCompare(a.completedAt))
      .slice(0, 8)
      .forEach((t) => {
        const proj = projects.find((p) => (tasksByProject[p.id] || []).some((tt) => tt.id === t.id));
        items.push({
          id: t.id,
          type: 'task_complete',
          text: t.title,
          project: proj?.name || 'General',
          time: t.completedAt,
        });
      });
    // Recently created tasks
    allTasks
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 5)
      .forEach((t) => {
        const proj = projects.find((p) => (tasksByProject[p.id] || []).some((tt) => tt.id === t.id));
        items.push({
          id: 'c_' + t.id,
          type: 'task_create',
          text: t.title,
          project: proj?.name || 'General',
          time: t.createdAt,
        });
      });
    // Events
    events.slice(-3).forEach((e) => {
      items.push({
        id: e.id,
        type: 'event',
        text: e.title,
        project: 'General',
        time: e.createdAt,
      });
    });
    return items
      .sort((a, b) => b.time.localeCompare(a.time))
      .slice(0, 10);
  }, [allTasks, events, projects, tasksByProject]);

  function relativeTime(iso) {
    if (!iso) return '';
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days === 1) return 'a day ago';
    return `${days} days ago`;
  }

  const priorityColor = (p) => {
    if (p === 'urgent') return 'var(--pri-urgent)';
    if (p === 'high') return 'var(--pri-high)';
    if (p === 'medium') return 'var(--pri-medium)';
    return 'var(--pri-low)';
  };

  const greeting = getGreeting();
  const motivation = getMotivation();
  const firstName = user?.name ? user.name.split(' ')[0] : 'there';

  const STAT_CARDS = [
    { key: 'tasks',     label: 'Tasks',     icon: ListTodo,   value: stats.tasks },
    { key: 'projects',  label: 'Projects',  icon: FolderOpen, value: stats.projects },
    { key: 'events',    label: 'Events',    icon: Calendar,   value: stats.events },
    { key: 'completed', label: 'Completed', icon: CheckCircle2, value: stats.completed },
  ];

  return (
    <div className="insight">
      {/* ── Top greeting bar ── */}
      <div className="insight-greeting">
        <div className="insight-greeting__avatar">{initials}</div>
        <span className="insight-greeting__text">
          {firstName}, {greeting}. {motivation}
        </span>
        {isIslamic && nextPrayer && (
          <div className="insight-greeting__prayer">
            <span className="insight-prayer-name">{nextPrayer.name}</span>
            <span className="insight-prayer-time">{nextPrayer.time}</span>
          </div>
        )}
        <div className="insight-greeting__actions">
          <Link to="/app/work" className="insight-action-btn">+ Create Task</Link>
          <button className="insight-action-btn insight-action-btn--outline">Start meeting</button>
          <Link to="/app/office" className="insight-action-btn insight-action-btn--outline">
            <CalendarDays size={13} /> View Calendar
          </Link>
        </div>
      </div>

      {/* ── Pillar summary row ── */}
      {niyyahFocus?.length > 0 && (
        <div className="insight-niyyah-row">
          <Zap size={13} style={{ color: 'var(--accent)' }} />
          <span className="insight-niyyah-label">Today's focus:</span>
          {niyyahFocus.map((pid) => {
            const p = MAQASID_PILLARS.find((pl) => pl.id === pid);
            if (!p) return null;
            return (
              <span key={pid} className="insight-niyyah-pill" style={{ color: p.accentColor, borderColor: p.accentColor + '50', background: p.accentColor + '14' }}>
                {p.sidebarLabel}
              </span>
            );
          })}
        </div>
      )}

      {/* ── Maqasid Pillars ── */}
      <div className="insight-pillars">
        {MAQASID_PILLARS.map((pillar) => {
          const subModules = pillar.subModuleIds
            .map((id) => MODULES.find((m) => m.id === id))
            .filter(Boolean);
          return (
            <PillarCard
              key={pillar.id}
              pillar={pillar}
              subModules={subModules}
              valuesLayer={valuesLayer}
              completedOpening={completedOpening}
              deferred={deferred}
            />
          );
        })}
      </div>

      {/* ── Main grid ── */}
      <div className="insight-grid">
        {/* LEFT COLUMN */}
        <div className="insight-left">
          {/* BCG Chart */}
          <BCGChart data={bcgData} />

          {/* Open Tasks */}
          <div className="insight-open-tasks">
            <div className="insight-open-tasks__header">
              <div className="insight-open-tasks__tabs">
                <button
                  className={`insight-proj-tab ${projectFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setProjectFilter('all')}
                >
                  All
                </button>
                {projects.slice(0, 4).map((p) => (
                  <button
                    key={p.id}
                    className={`insight-proj-tab ${projectFilter === p.id ? 'active' : ''}`}
                    onClick={() => setProjectFilter(p.id)}
                  >
                    <span className="insight-proj-dot" style={{ background: p.color }} />
                    {p.name.length > 12 ? p.name.slice(0, 10) + '...' : p.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="insight-open-tasks__title-row">
              <span>Open Tasks by Priority:</span>
              <span className="insight-open-tasks__count">{openTasks.length}</span>
            </div>
            <div className="insight-open-tasks__list">
              {openTasks.length === 0 && (
                <div className="insight-empty-line">No open tasks</div>
              )}
              {openTasks.map((t) => {
                const proj = projects.find((p) => (tasksByProject[p.id] || []).some((tt) => tt.id === t.id));
                const projInitials = proj ? proj.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2) : 'GP';
                return (
                  <div key={t.id} className="insight-task-row">
                    <div className="insight-task-priority" style={{ background: priorityColor(t.priority) }} />
                    <span className="insight-task-title">{t.title}</span>
                    <span className="insight-task-proj">{projInitials}</span>
                    <Link to={proj ? `/app/work/${proj.id}` : '/app/work'} className="insight-task-view">
                      View Task
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="insight-right">
          {/* EPH + Stats row */}
          <div className="insight-eph-section">
            <div className="insight-eph">
              <div className="insight-eph__label">
                <span>EPH</span>
              </div>
              <div className="insight-eph__value">{eph}</div>
              <div className="insight-eph__desc">Events per Hour</div>
            </div>
            <div className="insight-stat-cards">
              {STAT_CARDS.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.key} className="insight-stat-card">
                    <div className="insight-stat-card__value">{s.value}</div>
                    <div className="insight-stat-card__label">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Workflow Pressure */}
          <WorkflowPressure level={pressureLevel} />

          {/* Upcoming tasks & events */}
          <div className="insight-upcoming">
            <div className="insight-upcoming__header">
              <span>Upcoming tasks &amp; events</span>
            </div>
            {upcomingEvents.length === 0 && (
              <div className="insight-empty-line">No upcoming events this week</div>
            )}
            {upcomingEvents.map((e) => (
              <div key={e.id} className="insight-upcoming-item">
                <div className="insight-upcoming-dot" />
                <div className="insight-upcoming-info">
                  <span className="insight-upcoming-title">{e.title}</span>
                  <span className="insight-upcoming-date">
                    {new Date(e.date + 'T00:00:00').toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' })}
                    {e.startTime ? ` ${e.startTime}` : ''}
                    {e.endTime ? ` - ${e.endTime}` : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom row: Recommendations + Activity ── */}
      <div className="insight-bottom-row">
        {/* Recommendations */}
        <div className="insight-recommendations">
          <div className="insight-section-tabs">
            <span className="insight-section-tab active">Recommendations</span>
            <span className="insight-section-tab">Read</span>
          </div>
          <div className="insight-recommendations__body">
            <div className="insight-recommendations__coming-soon">
              <Sparkles size={40} style={{ color: 'var(--primary)', opacity: 0.5 }} />
              <p className="insight-recommendations__cs-title">Personalized advice from BBOS AI is coming soon.</p>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="insight-activity">
          <div className="insight-section-tabs">
            <span className="insight-section-tab active">Activity</span>
            <div className="insight-activity-filter">
              <button
                className={`insight-act-tab ${activityTab === 'all' ? 'active' : ''}`}
                onClick={() => setActivityTab('all')}
              >All other</button>
              <button
                className={`insight-act-tab ${activityTab === 'mine' ? 'active' : ''}`}
                onClick={() => setActivityTab('mine')}
              >Mine</button>
            </div>
          </div>
          <div className="insight-activity__list">
            {activityItems.length === 0 && (
              <div className="insight-empty-line">No recent activity</div>
            )}
            {activityItems.map((item) => (
              <div key={item.id} className="insight-activity-item">
                <div className="insight-activity-item__dot" />
                <div className="insight-activity-item__body">
                  <span className="insight-activity-item__time">{relativeTime(item.time)}</span>
                  <span className="insight-activity-item__text">
                    {item.type === 'task_complete' && (
                      <><strong>{firstName}</strong> completed the task: <strong>{item.text}</strong></>
                    )}
                    {item.type === 'task_create' && (
                      <><strong>{firstName}</strong> created the task: <strong>{item.text}</strong></>
                    )}
                    {item.type === 'event' && (
                      <>New event: <strong>{item.text}</strong></>
                    )}
                  </span>
                  <span className="insight-activity-item__project">
                    in project <strong>{item.project}</strong>.
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
