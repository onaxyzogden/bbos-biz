// Preset departments, leave types, attendance statuses

export const PRESET_DEPARTMENTS = [
  { id: 'dept_eng', name: 'Engineering', color: '#3b82f6', isPreset: true },
  { id: 'dept_des', name: 'Design', color: '#8b5cf6', isPreset: true },
  { id: 'dept_mktg', name: 'Marketing', color: '#ec4899', isPreset: true },
  { id: 'dept_sales', name: 'Sales', color: '#f59e0b', isPreset: true },
  { id: 'dept_ops', name: 'Operations', color: '#14b8a6', isPreset: true },
  { id: 'dept_fin', name: 'Finance', color: '#22c55e', isPreset: true },
  { id: 'dept_hr', name: 'HR', color: '#6366f1', isPreset: true },
  { id: 'dept_sup', name: 'Support', color: '#06b6d4', isPreset: true },
];

export const LEAVE_TYPES = [
  { id: 'annual', label: 'Annual', color: '#3b82f6' },
  { id: 'sick', label: 'Sick', color: '#ef4444' },
  { id: 'personal', label: 'Personal', color: '#f59e0b' },
  { id: 'other', label: 'Other', color: '#6b7280' },
];

export const ATTENDANCE_STATUSES = [
  { id: 'present', label: 'Present', color: '#22c55e' },
  { id: 'absent', label: 'Absent', color: '#ef4444' },
  { id: 'late', label: 'Late', color: '#f59e0b' },
  { id: 'half-day', label: 'Half Day', color: '#3b82f6' },
  { id: 'leave', label: 'Leave', color: '#8b5cf6' },
];

export const EMPLOYEE_STATUSES = [
  { id: 'active', label: 'Active', color: '#22c55e' },
  { id: 'on-leave', label: 'On Leave', color: '#f59e0b' },
  { id: 'inactive', label: 'Inactive', color: '#6b7280' },
];

export const DEFAULT_LEAVE_BALANCE = { annual: 20, sick: 10, personal: 5 };

export const DEPT_COLORS = [
  '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b',
  '#14b8a6', '#22c55e', '#6366f1', '#06b6d4',
  '#ef4444', '#f97316', '#6b7280', '#0ea5e9',
];
