import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Kanban, ArrowRight, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { useProjectStore } from '../store/project-store';
import { useAuthStore } from '../store/auth-store';
import { useTaskStore } from '../store/task-store';
import { useSettingsStore } from '../store/settings-store';
import { useThresholdStore } from '../store/threshold-store';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import { MODULES } from '../data/modules';
import ActivityChart from '../components/dashboard/ActivityChart';
import HealthPulse from '../components/dashboard/HealthPulse';
import ModuleHealthCard from '../components/dashboard/ModuleHealthCard';
import './Dashboard.css';

const STAT_CONFIG = [
  { key: 'activeProjects', label: 'Active Projects', icon: Kanban, color: 'var(--primary)' },
  { key: 'completed', label: 'Completed', icon: CheckCircle2, color: 'var(--success)' },
  { key: 'inProgress', label: 'In Progress', icon: Clock, color: 'var(--warning)' },
  { key: 'overdue', label: 'Overdue', icon: AlertTriangle, color: 'var(--danger)' },
];

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const allProjects = useProjectStore((s) => s.projects);
  const tasksByProject = useTaskStore((s) => s.tasksByProject);
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const completedOpening = useThresholdStore((s) => s.completedOpening);
  const deferred = useThresholdStore((s) => s.deferred);
  const { nextPrayer } = usePrayerTimes();

  const isIslamic = valuesLayer === 'islamic';
  const projects = useMemo(() => allProjects.filter((p) => !p.archived), [allProjects]);
  const allTasks = useMemo(() => Object.values(tasksByProject).flat(), [tasksByProject]);

  // Build column ID sets for "in progress" calculation
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
      activeProjects: projects.length,
      completed: allTasks.filter((t) => t.completedAt).length,
      inProgress: allTasks.filter((t) =>
        !t.completedAt && !firstColIds.has(t.columnId) && !lastColIds.has(t.columnId)
      ).length,
      overdue: allTasks.filter((t) =>
        t.dueDate && new Date(t.dueDate) < now && !t.completedAt
      ).length,
    };
  }, [allTasks, projects]);

  // 7-day activity chart data
  const chartData = useMemo(() => {
    const days = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);
      const dateStr = d.toISOString().slice(0, 10);
      const label = d.toLocaleDateString('en', { weekday: 'short' });
      const count = allTasks.filter((t) =>
        t.completedAt && t.completedAt.slice(0, 10) === dateStr
      ).length;
      days.push({ date: dateStr, label, count });
    }
    return days;
  }, [allTasks]);

  // Health pulse level
  const pulseLevel = useMemo(() => {
    const overdueCount = stats.overdue;
    const deferralCount = Object.keys(deferred).length;
    const readyModules = MODULES.filter((m) => m.ready).map((m) => m.id);
    const allCeremoniesComplete = readyModules.every((id) => completedOpening[id]);
    if (allCeremoniesComplete && overdueCount === 0 && deferralCount === 0) return 'green';
    if (deferralCount >= 2 || overdueCount >= 5) return 'red';
    return 'amber';
  }, [stats.overdue, deferred, completedOpening]);

  const today = new Date().toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dash-header">
        <div className="dash-welcome">
          <h1>Welcome back{user?.name ? `, ${user.name}` : ''}</h1>
          <p>{user?.org ? `${user.org} \u2014 ` : ''}{today}</p>
        </div>
        {isIslamic && nextPrayer && (
          <div className="dash-prayer">
            <span className="dash-prayer-name">{nextPrayer.name}</span>
            <span className="dash-prayer-time">{nextPrayer.time}</span>
            <span className="dash-prayer-badge">{nextPrayer.remaining}</span>
          </div>
        )}
      </div>

      {/* Stat Cards */}
      <div className="dash-stats">
        {STAT_CONFIG.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.key} className="dash-stat">
              <div className="dash-stat-icon" style={{ color: s.color }}>
                <Icon size={20} />
              </div>
              <div className="dash-stat-value">{stats[s.key]}</div>
              <div className="dash-stat-label">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Activity Chart + Health Pulse */}
      <div className="dash-row-2">
        <div className="dash-chart-card">
          <h3 className="dash-chart-title">Activity — Last 7 Days</h3>
          <ActivityChart data={chartData} />
        </div>
        <HealthPulse level={pulseLevel} isIslamic={isIslamic} />
      </div>

      {/* Module Health */}
      <section>
        <div className="dash-section-header">
          <h3>Modules</h3>
        </div>
        <div className="dash-module-grid">
          {MODULES.map((mod) => {
            const taskCount = mod.ready
              ? allTasks.filter((t) => {
                  const proj = projects.find((p) => {
                    const tasks = tasksByProject[p.id] || [];
                    return tasks.some((tt) => tt.id === t.id);
                  });
                  return !!proj;
                }).length
              : null;
            return (
              <ModuleHealthCard
                key={mod.id}
                module={mod}
                ceremonyComplete={!!completedOpening[mod.id]}
                isDeferred={!!deferred[mod.id]}
                taskCount={mod.id === 'work' ? allTasks.length : null}
              />
            );
          })}
        </div>
      </section>

      {/* Recent Projects */}
      <section>
        <div className="dash-section-header">
          <h3>Recent Projects</h3>
          {projects.length > 0 && (
            <Link to="/app/work" className="dash-section-link">
              View all <ArrowRight size={14} />
            </Link>
          )}
        </div>

        {projects.length === 0 ? (
          <div className="dash-empty">
            <Kanban size={40} style={{ color: 'var(--text3)', marginBottom: 'var(--space-3)' }} />
            <h4>No projects yet</h4>
            <p>Create your first project to start managing tasks.</p>
            <Link to="/app/work" className="btn btn-primary">
              <Plus size={16} /> New Project
            </Link>
          </div>
        ) : (
          <div className="dash-project-grid">
            {projects.slice(0, 6).map((p) => (
              <Link key={p.id} to={`/app/work/${p.id}`} className="dash-project-card">
                <div style={{ height: 3, background: p.color }} />
                <div className="dash-project-body">
                  <h4>{p.name}</h4>
                  <p>{p.description || `${p.columns.length} columns`}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
