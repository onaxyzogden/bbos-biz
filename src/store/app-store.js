import { create } from 'zustand';
import { safeGet, safeSet } from '../services/storage';

const EMPTY_FILTERS = { priorities: [], dueDate: null, tags: [] };

function safeGetJSON(key, fallback) {
  try { const v = safeGet(key, null); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}

export const useAppStore = create((set, get) => ({
  sidebarOpen: safeGet('sb_open', 'true') === 'true',
  islamicPanelOpen: safeGet('il_open', 'false') === 'true',
  searchOpen: false,
  reflectionOpen: false,
  activeModule: safeGet('module', 'work'),
  expandedPillars: safeGetJSON('pillars_exp', {}),
  filters: {}, // { [projectId]: { priorities: [], dueDate: null, tags: [] } }
  activeBbosStage: null, // string | null — BBOS stage ID currently selected in the pipeline header

  toggleSidebar: () => set((s) => {
    const v = !s.sidebarOpen;
    safeSet('sb_open', String(v));
    return { sidebarOpen: v };
  }),

  toggleIslamicPanel: () => set((s) => {
    const v = !s.islamicPanelOpen;
    safeSet('il_open', String(v));
    return { islamicPanelOpen: v };
  }),

  setSearchOpen: (open) => set({ searchOpen: open }),
  setReflectionOpen: (open) => set({ reflectionOpen: open }),

  togglePillar: (pillarId) => set((s) => {
    const next = { ...s.expandedPillars, [pillarId]: !s.expandedPillars[pillarId] };
    safeSet('pillars_exp', JSON.stringify(next));
    return { expandedPillars: next };
  }),

  setActiveModule: (mod) => {
    safeSet('module', mod);
    set({ activeModule: mod });
  },

  setFilters: (projectId, partial) => set((s) => {
    const current = s.filters[projectId] || { ...EMPTY_FILTERS };
    return { filters: { ...s.filters, [projectId]: { ...current, ...partial } } };
  }),

  clearFilters: (projectId) => set((s) => ({
    filters: { ...s.filters, [projectId]: { ...EMPTY_FILTERS } },
  })),

  setActiveBbosStage: (stageId) => set({ activeBbosStage: stageId }),
  clearActiveBbosStage: () => set({ activeBbosStage: null }),

  getActiveFilterCount: (projectId) => {
    const f = get().filters[projectId];
    if (!f) return 0;
    return (f.priorities?.length || 0) + (f.dueDate ? 1 : 0) + (f.tags?.length || 0);
  },
}));
