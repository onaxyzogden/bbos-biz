import { create } from 'zustand';
import { safeGet, safeSet } from '../services/storage';

export const useSettingsStore = create((set) => ({
  theme: safeGet('theme', 'light'),
  valuesLayer: safeGet('values_layer', 'islamic'),
  attrLang: safeGet('attr_lang', 'en'),

  setTheme: (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    safeSet('theme', theme);
    set({ theme });
  },

  setValuesLayer: (valuesLayer) => {
    safeSet('values_layer', valuesLayer);
    set({ valuesLayer });
  },

  setAttrLang: (attrLang) => {
    safeSet('attr_lang', attrLang);
    set({ attrLang });
  },
}));
