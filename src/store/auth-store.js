import { create } from 'zustand';
import { safeGetJSON, safeSet, safeRemove } from '../services/storage';

export const useAuthStore = create((set) => ({
  user: safeGetJSON('user', null),

  login: (userData) => {
    safeSet('user', userData);
    set({ user: userData });
  },

  updateUser: (updates) => set((s) => {
    const user = { ...s.user, ...updates };
    safeSet('user', user);
    return { user };
  }),

  logout: () => {
    safeRemove('user');
    set({ user: null });
  },
}));
