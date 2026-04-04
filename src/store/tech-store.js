import { create } from 'zustand';
import { safeGetJSON, safeSet } from '../services/storage';
import { genMonitorId, genAlertId, genPerfEntryId, genStackItemId } from '../services/id';

function persistMonitors(d) { safeSet('tech_monitors', d); }
function persistAlerts(d) { safeSet('tech_alerts', d); }
function persistPerf(d) { safeSet('tech_perf', d); }
function persistStack(d) { safeSet('tech_stack', d); }

export const MONITOR_STATUSES = [
  { id: 'up', label: 'Up', color: '#22c55e' },
  { id: 'down', label: 'Down', color: '#ef4444' },
  { id: 'degraded', label: 'Degraded', color: '#f59e0b' },
  { id: 'unknown', label: 'Unknown', color: '#6b7280' },
];

export const ALERT_SEVERITIES = [
  { id: 'critical', label: 'Critical', color: '#ef4444' },
  { id: 'warning', label: 'Warning', color: '#f59e0b' },
  { id: 'info', label: 'Info', color: '#3b82f6' },
];

export const STACK_CATEGORIES = [
  { id: 'infrastructure', label: 'Infrastructure', color: '#3b82f6' },
  { id: 'frontend', label: 'Frontend', color: '#8b5cf6' },
  { id: 'backend', label: 'Backend', color: '#22c55e' },
  { id: 'database', label: 'Database', color: '#f59e0b' },
  { id: 'devops', label: 'DevOps', color: '#06b6d4' },
  { id: 'saas', label: 'SaaS', color: '#ec4899' },
  { id: 'security', label: 'Security', color: '#ef4444' },
  { id: 'other', label: 'Other', color: '#6b7280' },
];

export const useTechStore = create((set, get) => ({
  monitors: safeGetJSON('tech_monitors', []),
  alerts: safeGetJSON('tech_alerts', []),
  perfEntries: safeGetJSON('tech_perf', []),
  stackItems: safeGetJSON('tech_stack', []),

  // ── Monitors ──
  addMonitor: ({ name, url, checkInterval }) => {
    const mon = {
      id: genMonitorId(), name: name || '', url: url || '',
      status: 'unknown', lastChecked: null,
      checkInterval: checkInterval || 5,
      uptimePercent: 100, responseTime: null,
      createdAt: new Date().toISOString(),
    };
    set((s) => { const monitors = [...s.monitors, mon]; persistMonitors(monitors); return { monitors }; });
    return mon;
  },
  updateMonitor: (id, updates) => set((s) => {
    const monitors = s.monitors.map((m) => m.id === id ? { ...m, ...updates } : m);
    persistMonitors(monitors); return { monitors };
  }),
  deleteMonitor: (id) => set((s) => {
    const monitors = s.monitors.filter((m) => m.id !== id);
    persistMonitors(monitors); return { monitors };
  }),
  // Simulate a status check
  checkMonitor: (id) => set((s) => {
    const monitors = s.monitors.map((m) => {
      if (m.id !== id) return m;
      // Simulated — in production this would be a real HTTP check
      const statuses = ['up', 'up', 'up', 'up', 'up', 'degraded', 'down'];
      const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
      const responseTime = newStatus === 'up' ? Math.floor(Math.random() * 300) + 50 : newStatus === 'degraded' ? Math.floor(Math.random() * 1000) + 500 : null;
      return { ...m, status: newStatus, lastChecked: new Date().toISOString(), responseTime };
    });
    persistMonitors(monitors); return { monitors };
  }),

  // ── Alerts ──
  addAlert: ({ title, description, severity, source }) => {
    const alert = {
      id: genAlertId(), title: title || '', description: description || '',
      severity: severity || 'info', source: source || '',
      status: 'active', createdAt: new Date().toISOString(),
      acknowledgedAt: null, resolvedAt: null,
    };
    set((s) => { const alerts = [...s.alerts, alert]; persistAlerts(alerts); return { alerts }; });
    return alert;
  },
  acknowledgeAlert: (id) => set((s) => {
    const alerts = s.alerts.map((a) => a.id === id ? { ...a, status: 'acknowledged', acknowledgedAt: new Date().toISOString() } : a);
    persistAlerts(alerts); return { alerts };
  }),
  resolveAlert: (id) => set((s) => {
    const alerts = s.alerts.map((a) => a.id === id ? { ...a, status: 'resolved', resolvedAt: new Date().toISOString() } : a);
    persistAlerts(alerts); return { alerts };
  }),
  deleteAlert: (id) => set((s) => {
    const alerts = s.alerts.filter((a) => a.id !== id);
    persistAlerts(alerts); return { alerts };
  }),

  // ── Performance ──
  addPerfEntry: ({ metric, value, unit, source, date }) => {
    const entry = {
      id: genPerfEntryId(), metric: metric || '', value: Number(value) || 0,
      unit: unit || 'ms', source: source || '',
      date: date || new Date().toISOString().slice(0, 10),
      createdAt: new Date().toISOString(),
    };
    set((s) => { const perfEntries = [...s.perfEntries, entry]; persistPerf(perfEntries); return { perfEntries }; });
    return entry;
  },
  deletePerfEntry: (id) => set((s) => {
    const perfEntries = s.perfEntries.filter((p) => p.id !== id);
    persistPerf(perfEntries); return { perfEntries };
  }),

  // ── Tech Stack ──
  addStackItem: ({ name, category, version, url, cost, notes }) => {
    const item = {
      id: genStackItemId(), name: name || '', category: category || 'other',
      version: version || '', url: url || '',
      cost: Number(cost) || 0, billingCycle: 'monthly',
      notes: notes || '', createdAt: new Date().toISOString(),
    };
    set((s) => { const stackItems = [...s.stackItems, item]; persistStack(stackItems); return { stackItems }; });
    return item;
  },
  updateStackItem: (id, updates) => set((s) => {
    const stackItems = s.stackItems.map((i) => i.id === id ? { ...i, ...updates, updatedAt: new Date().toISOString() } : i);
    persistStack(stackItems); return { stackItems };
  }),
  deleteStackItem: (id) => set((s) => {
    const stackItems = s.stackItems.filter((i) => i.id !== id);
    persistStack(stackItems); return { stackItems };
  }),
}));
