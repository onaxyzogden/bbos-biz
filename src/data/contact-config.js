// Unified contacts module configuration

export const CONTACT_TYPES = [
  { id: 'contact', label: 'Contact', color: '#6b7280' },
  { id: 'lead',    label: 'Lead',    color: '#f59e0b' },
  { id: 'client',  label: 'Client',  color: '#22c55e' },
  { id: 'employee', label: 'Employee', color: '#8b5cf6' },
];

export const ENTITY_TYPES = [
  { id: 'person',  label: 'Person' },
  { id: 'company', label: 'Company' },
];

export const LEAD_STAGES = [
  { id: 'unassigned',       label: 'Unassigned',       color: '#6b7280' },
  { id: 'pending_contact',  label: 'Pending Contact',  color: '#3b82f6' },
  { id: 'contacted',        label: 'Contacted',        color: '#8b5cf6' },
  { id: 'qualified',        label: 'Qualified',        color: '#14b8a6' },
  { id: 'sent',             label: 'Sent',             color: '#f59e0b' },
  { id: 'accepted',         label: 'Accepted',         color: '#22c55e' },
  { id: 'disqualified',     label: 'Disqualified',     color: '#ef4444' },
  { id: 'negotiating',      label: 'Negotiating',      color: '#ec4899' },
];

export const LEAD_SOURCES = [
  { id: 'email', label: 'Email' },
  { id: 'form',  label: 'Form' },
  { id: 'phone', label: 'Phone' },
];

export const EMPLOYMENT_TYPES = [
  { id: 'full_time',  label: 'Full-time' },
  { id: 'part_time',  label: 'Part-time' },
  { id: 'contract',   label: 'Contract' },
  { id: 'freelance',  label: 'Freelance' },
  { id: 'intern',     label: 'Intern' },
];

export const CLOCK_IN_LOCATIONS = [
  { id: 'office',  label: 'Office / on-site',   icon: '🏢' },
  { id: 'remote',  label: 'Remote / off-site',  icon: '🏠' },
  { id: 'field',   label: 'Field / Event',       icon: '📍' },
];

export const ABSENCE_TYPES = [
  { id: 'annual',   label: 'Annual',   color: '#3b82f6' },
  { id: 'sick',     label: 'Sick',     color: '#ef4444' },
  { id: 'personal', label: 'Personal', color: '#f59e0b' },
  { id: 'other',    label: 'Other',    color: '#6b7280' },
];

export const ABSENCE_STATUSES = [
  { id: 'pending',  label: 'Pending',  color: '#f59e0b' },
  { id: 'approved', label: 'Approved', color: '#22c55e' },
  { id: 'rejected', label: 'Rejected', color: '#ef4444' },
];

export const DOC_STATUSES = [
  { id: 'pending',  label: 'Pending',  color: '#f59e0b' },
  { id: 'approved', label: 'Approved', color: '#22c55e' },
  { id: 'expired',  label: 'Expired',  color: '#ef4444' },
];

export const SALARY_TYPES = [
  { id: 'base',       label: 'Base Salary' },
  { id: 'bonus',      label: 'Bonus' },
  { id: 'commission', label: 'Commission' },
  { id: 'other',      label: 'Other' },
];

export const AVATAR_COLORS = [
  '#4ab8a8', '#8b5cf6', '#ec4899', '#f59e0b',
  '#14b8a6', '#22c55e', '#6366f1', '#06b6d4',
  '#ef4444', '#f97316', '#3b82f6', '#0ea5e9',
];

export function getAvatarColor(id = '') {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export function getInitials(firstName = '', lastName = '') {
  const f = (firstName || '').trim();
  const l = (lastName || '').trim();
  if (!f && !l) return '?';
  if (!l) return f[0]?.toUpperCase() || '?';
  return ((f[0] || '') + (l[0] || '')).toUpperCase();
}

export function getDisplayName(contact) {
  if (contact.displayName) return contact.displayName;
  if (contact.name) return contact.name;
  const parts = [contact.firstName, contact.lastName].filter(Boolean);
  return parts.join(' ') || contact.email || 'Unnamed';
}
