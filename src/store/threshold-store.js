import { create } from 'zustand';
import { safeGetJSON, safeSet } from '../services/storage';

export const useThresholdStore = create((set, get) => ({
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
  prayerWarningName: null,
  prayerWarningDismissed: false,

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
  setPrayerLock: (locked, prayerName, msRemaining) => set({
    isPrayerLocked: locked,
    currentPrayerName: locked ? prayerName : null,
    prayerMsRemaining: locked ? msRemaining : null,
  }),
  showPrayerWarning: (name) => set({ prayerWarningName: name, prayerWarningDismissed: false }),
  dismissPrayerWarning: () => set({ prayerWarningDismissed: true }),
  clearPrayerWarning: () => set({ prayerWarningName: null, prayerWarningDismissed: false }),

  isOpeningComplete: (moduleId) => !!get().completedOpening[moduleId],
  isClosingComplete: (moduleId) => !!get().completedClosing[moduleId],
  isDeferred: (moduleId) => !!get().deferred[moduleId],
}));
