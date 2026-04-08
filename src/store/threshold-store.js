import { create } from 'zustand';
import { safeGet, safeGetJSON, safeSet } from '../services/storage';

export const useThresholdStore = create((set, get) => ({
  // Daily Niyyah Act — pre-entry orientation
  niyyahDate: safeGet('thr_niyyah_date', null),        // plain string (YYYY-MM-DD)
  niyyahFocus: safeGetJSON('thr_niyyah_focus', []),    // array of pillar IDs

  // Which module ceremony is active (null = none)
  openingModuleId: null,
  closingModuleId: null,

  // Completed ceremonies: { [moduleId]: true }
  completedOpening: safeGetJSON('thr_open', {}),
  completedClosing: safeGetJSON('thr_close', {}),

  // Deferred ceremonies: { [moduleId]: ISO timestamp }
  deferred: safeGetJSON('thr_deferred', {}),

  // Presence awareness (ephemeral — not persisted)
  resumeModuleId: null,
  isPrayerLocked: false,
  currentPrayerName: null,
  prayerMsRemaining: null,
  prayerTimeMs: null,
  prayerWarningName: null,
  prayerWarningDismissed: false,

  completeNiyyah: (focusPillars = []) => {
    const today = new Date().toISOString().slice(0, 10);
    safeSet('thr_niyyah_date', today);
    safeSet('thr_niyyah_focus', focusPillars);
    set({ niyyahDate: today, niyyahFocus: focusPillars });
  },

  isNiyyahComplete: () => {
    const today = new Date().toISOString().slice(0, 10);
    return get().niyyahDate === today;
  },

  setOpeningModuleId: (id) => set({ openingModuleId: id }),
  setClosingModuleId: (id) => set({ closingModuleId: id }),

  completeOpening: (moduleId) => {
    const updated = { ...get().completedOpening, [moduleId]: true };
    const deferred = { ...get().deferred };
    delete deferred[moduleId];
    safeSet('thr_open', updated);
    safeSet('thr_deferred', deferred);
    set({ completedOpening: updated, openingModuleId: null, deferred });
  },

  completeClosing: (moduleId) => {
    const updated = { ...get().completedClosing, [moduleId]: true };
    safeSet('thr_close', updated);
    set({ completedClosing: updated, closingModuleId: null });
  },

  deferOpening: (moduleId) => {
    const deferred = { ...get().deferred, [moduleId]: new Date().toISOString() };
    safeSet('thr_deferred', deferred);
    set({ deferred, openingModuleId: null });
  },

  resetOpening: (moduleId) => {
    const updated = { ...get().completedOpening };
    delete updated[moduleId];
    safeSet('thr_open', updated);
    set({ completedOpening: updated });
  },

  // Presence actions
  triggerResume: (moduleId) => set({ resumeModuleId: moduleId }),
  dismissResume: () => set({ resumeModuleId: null }),
  setPrayerLock: (locked, prayerName, msRemaining, prayerTimeMs) => set({
    isPrayerLocked: locked,
    currentPrayerName: locked ? prayerName : null,
    prayerMsRemaining: locked ? msRemaining : null,
    prayerTimeMs: locked ? (prayerTimeMs ?? null) : null,
  }),
  showPrayerWarning: (name) => set({ prayerWarningName: name, prayerWarningDismissed: false }),
  dismissPrayerWarning: () => set({ prayerWarningDismissed: true }),
  clearPrayerWarning: () => set({ prayerWarningName: null, prayerWarningDismissed: false }),

  isOpeningComplete: (moduleId) => !!get().completedOpening[moduleId],
  isClosingComplete: (moduleId) => !!get().completedClosing[moduleId],
  isDeferred: (moduleId) => !!get().deferred[moduleId],
}));
