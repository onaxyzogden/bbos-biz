// Preset expense categories and payment methods

export const PRESET_CATEGORIES = [
  { id: 'cat_ops', name: 'Operations', color: '#3b82f6', isPreset: true },
  { id: 'cat_mktg', name: 'Marketing', color: '#8b5cf6', isPreset: true },
  { id: 'cat_sw', name: 'Software', color: '#06b6d4', isPreset: true },
  { id: 'cat_team', name: 'Team', color: '#f59e0b', isPreset: true },
  { id: 'cat_office', name: 'Office', color: '#6366f1', isPreset: true },
  { id: 'cat_travel', name: 'Travel', color: '#ec4899', isPreset: true },
  { id: 'cat_prof', name: 'Professional Services', color: '#14b8a6', isPreset: true },
  { id: 'cat_other', name: 'Other', color: '#6b7280', isPreset: true },
];

export const PAYMENT_METHODS = [
  { id: 'cash', label: 'Cash' },
  { id: 'card', label: 'Card' },
  { id: 'bank', label: 'Bank Transfer' },
  { id: 'other', label: 'Other' },
];

export const CATEGORY_COLORS = [
  '#3b82f6', '#8b5cf6', '#06b6d4', '#f59e0b',
  '#6366f1', '#ec4899', '#14b8a6', '#ef4444',
  '#22c55e', '#f97316', '#6b7280', '#0ea5e9',
];
