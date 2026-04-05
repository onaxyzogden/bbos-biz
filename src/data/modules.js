// Module definitions for the 5 BBOS-Biz modules
export const MODULES = [
  {
    id: 'people',
    name: 'People',
    description: 'Team management, attendance, and HR',
    icon: 'Users',
    color: 'var(--mod-people)',
    attrs: 'Al-Wadud · Al-Adl',
    attrs_ar: 'الودود · العدل',
    ready: true,
    features: [
      'Employee directory',
      'Attendance & leave',
      'Time tracking',
      'Productivity insights',
    ],
  },
  {
    id: 'work',
    name: 'Projects',
    description: 'Projects, tasks, and Kanban boards',
    icon: 'Kanban',
    color: 'var(--mod-work)',
    attrs: 'Al-Muhsin · Al-Wakil',
    attrs_ar: 'المحسن · الوكيل',
    ready: true,
    features: [
      'Kanban boards',
      'Task management',
      'Project tracking',
      'Subtasks & checklists',
      'Due dates & priorities',
      'Multiple views',
    ],
  },
  {
    id: 'money',
    name: 'Money',
    description: 'Expenses, invoicing, and financial reports',
    icon: 'Wallet',
    color: 'var(--mod-money)',
    attrs: 'Ar-Razzaq · Al-Hasib',
    attrs_ar: 'الرزّاق · الحسيب',
    ready: true,
    features: [
      'Expense tracking',
      'Invoicing & billing',
      'Financial reports',
      'Budget management',
    ],
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Website monitoring and security',
    icon: 'Shield',
    color: 'var(--mod-tech)',
    attrs: 'Al-Muhaymin · Al-Hafiz',
    attrs_ar: 'المهيمن · الحفيظ',
    ready: true,
    features: [
      'Uptime monitoring',
      'Security alerts',
      'Performance tracking',
      'Tech stack overview',
    ],
  },
  {
    id: 'office',
    name: 'Office',
    description: 'Chat, calendar, and document management',
    icon: 'Building2',
    color: 'var(--mod-office)',
    attrs: 'As-Sami · Al-Alim',
    attrs_ar: 'السميع · العليم',
    ready: true,
    features: [
      'Team chat',
      'Calendar & events',
      'Document management',
      'Internal Q&A',
    ],
  },
  {
    id: 'family',
    name: 'Family',
    description: 'Family relationships and community connections',
    icon: 'Heart',
    color: 'var(--mod-family)',
    attrs: 'Al-Wadud · Ar-Rahman',
    attrs_ar: 'الودود · الرحمن',
    ready: true,
    features: [
      'Family directory',
      'Community connections',
      'Legacy planning',
    ],
  },
];

export const PROJECT_COLORS = [
  '#4ab8a8', '#3b82f6', '#8b5cf6', '#f59e0b',
  '#ef4444', '#22c55e', '#ec4899', '#6366f1',
];

export const DEFAULT_COLUMNS = [
  { name: 'To Do', color: 'var(--col-todo)' },
  { name: 'In Progress', color: 'var(--col-progress)' },
  { name: 'Review', color: 'var(--col-review)' },
  { name: 'Done', color: 'var(--col-done)' },
];

export const PRIORITIES = [
  { id: 'urgent', label: 'Urgent', color: 'var(--pri-urgent)', bg: 'var(--pri-urgent-bg)' },
  { id: 'high', label: 'High', color: 'var(--pri-high)', bg: 'var(--pri-high-bg)' },
  { id: 'medium', label: 'Medium', color: 'var(--pri-medium)', bg: 'var(--pri-medium-bg)' },
  { id: 'low', label: 'Low', color: 'var(--pri-low)', bg: 'var(--pri-low-bg)' },
];
