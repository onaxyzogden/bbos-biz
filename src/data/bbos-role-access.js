// BBOS Role-Tool Access Matrix
// 1:1 mapping — each BBOS task definition ID has its own explicit access entry per role.
// Access levels: O (Owner/full), E (Edit), V (View only), - (Hidden/no access)

export const BBOS_ROLES = [
  { id: 'all', label: 'All Roles',    abbr: 'ALL', description: 'Full access to everything',       color: '#c9a05a', bg: '#c9a05a18' },
  { id: 'OW',  label: 'Owner',        abbr: 'OW',  description: 'Business Owner',                  color: '#22c55e', bg: '#22c55e18' },
  { id: 'ST',  label: 'Strategist',   abbr: 'ST',  description: 'Pipeline Manager',                color: '#3b82f6', bg: '#3b82f618' },
  { id: 'CW',  label: 'Copywriter',   abbr: 'CW',  description: 'Content & Copy',                  color: '#8b5cf6', bg: '#8b5cf618' },
  { id: 'MB',  label: 'Media Buyer',  abbr: 'MB',  description: 'Paid & Distribution',             color: '#f59e0b', bg: '#f59e0b18' },
  { id: 'SE',  label: 'Setter',       abbr: 'SE',  description: 'Appointment Setting',             color: '#ec4899', bg: '#ec489918' },
  { id: 'CL',  label: 'Closer',       abbr: 'CL',  description: 'Sales',                           color: '#ef4444', bg: '#ef444418' },
  { id: 'FU',  label: 'Delivery',     abbr: 'FU',  description: 'Delivery & Client Success',       color: '#14b8a6', bg: '#14b8a618' },
];

// Access matrix: taskId → { OW, ST, CW, MB, SE, CL, FU }
export const BBOS_TASK_ACCESS = {
  // ── FND (9 tasks) ────────────────────────────────────────
  'FND-S1':     { OW: 'O', ST: 'V', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'FND-S2':     { OW: 'O', ST: 'V', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'FND-S3':     { OW: 'O', ST: 'V', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'FND-S4':     { OW: 'O', ST: 'V', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'FND-IFB-S1': { OW: 'O', ST: 'V', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'FND-IFB-S2': { OW: 'O', ST: 'V', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'FND-IFB-S3': { OW: 'O', ST: 'V', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'FND-IFB-S4': { OW: 'O', ST: 'V', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'FND-IFB-S5': { OW: 'O', ST: 'V', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },

  // ── TRU (15 tasks) — all: O O - - - - - ─────────────────
  'TRU-S1':   { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'TRU-S2':   { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'TRU-S3':   { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'TRU-S4':   { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'TRU-S5':   { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'TRU-S6':   { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'TRU-V1':   { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'TRU-V2':   { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'TRU-V3':   { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'TRU-AF1':  { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'TRU-AF2':  { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'TRU-AF3':  { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'TRU-AF4':  { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'TRU-AF5':  { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'TRU-FP02': { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },

  // ── STR (13 tasks) ──────────────────────────────────────
  'STR-S1':  { OW: 'O', ST: 'O', CW: 'V', MB: '-', SE: '-', CL: '-', FU: '-' },
  'STR-S2':  { OW: 'O', ST: 'O', CW: 'V', MB: 'V', SE: '-', CL: 'V', FU: '-' },
  'STR-S3':  { OW: 'O', ST: 'O', CW: 'V', MB: 'V', SE: '-', CL: 'V', FU: '-' },
  'STR-S4':  { OW: 'O', ST: 'O', CW: 'V', MB: 'V', SE: '-', CL: '-', FU: '-' },
  'STR-S5':  { OW: 'O', ST: 'O', CW: 'V', MB: 'V', SE: '-', CL: '-', FU: '-' },
  'STR-V1':  { OW: 'O', ST: 'O', CW: 'V', MB: 'V', SE: '-', CL: '-', FU: '-' },
  'STR-V2':  { OW: 'O', ST: 'O', CW: 'V', MB: 'V', SE: '-', CL: '-', FU: '-' },
  'STR-V3':  { OW: 'O', ST: 'O', CW: 'V', MB: 'V', SE: '-', CL: '-', FU: '-' },
  'STR-AF1': { OW: 'O', ST: 'O', CW: 'V', MB: 'V', SE: '-', CL: 'V', FU: '-' },
  'STR-AF2': { OW: 'O', ST: 'O', CW: 'V', MB: 'V', SE: '-', CL: 'V', FU: '-' },
  'STR-AF3': { OW: 'O', ST: 'O', CW: 'V', MB: 'V', SE: '-', CL: '-', FU: '-' },
  'STR-AF4': { OW: 'O', ST: 'O', CW: 'V', MB: 'E', SE: '-', CL: '-', FU: '-' },
  'STR-AF5': { OW: 'O', ST: 'O', CW: 'V', MB: 'V', SE: '-', CL: '-', FU: '-' },

  // ── OFR (16 tasks) ──────────────────────────────────────
  'OFR-S1':   { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'OFR-S2':   { OW: 'O', ST: 'O', CW: 'V', MB: '-', SE: 'V', CL: 'V', FU: 'V' },
  'OFR-S3':   { OW: 'O', ST: 'O', CW: 'V', MB: '-', SE: 'V', CL: 'V', FU: 'V' },
  'OFR-S4':   { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: '-', FU: 'V' },
  'OFR-S5':   { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'OFR-A1':   { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'OFR-A2':   { OW: 'O', ST: 'O', CW: 'V', MB: '-', SE: 'V', CL: 'V', FU: 'V' },
  'OFR-A3':   { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'OFR-A4':   { OW: 'O', ST: 'O', CW: 'V', MB: '-', SE: '-', CL: 'V', FU: 'V' },
  'OFR-A5':   { OW: 'O', ST: 'O', CW: 'V', MB: '-', SE: '-', CL: 'V', FU: 'V' },
  'OFR-A6':   { OW: 'O', ST: 'O', CW: 'V', MB: '-', SE: '-', CL: 'V', FU: 'V' },
  'OFR-A7':   { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: '-', FU: 'V' },
  'OFR-A8':   { OW: 'O', ST: 'O', CW: 'V', MB: '-', SE: '-', CL: 'V', FU: 'V' },
  'OFR-V1':   { OW: 'O', ST: 'O', CW: 'V', MB: '-', SE: '-', CL: 'V', FU: 'V' },
  'OFR-V2':   { OW: 'O', ST: 'O', CW: 'V', MB: '-', SE: '-', CL: 'V', FU: 'V' },
  'OFR-FP03': { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: '-', FU: 'V' },

  // ── OUT (13 tasks) ──────────────────────────────────────
  'OUT-S1': { OW: 'O', ST: 'O', CW: 'V', MB: 'E', SE: '-', CL: '-', FU: '-' },
  'OUT-S2': { OW: 'O', ST: 'O', CW: 'E', MB: 'V', SE: '-', CL: '-', FU: '-' },
  'OUT-S3': { OW: 'O', ST: 'O', CW: 'E', MB: 'V', SE: '-', CL: '-', FU: '-' },
  'OUT-S4': { OW: 'O', ST: 'O', CW: 'E', MB: 'V', SE: '-', CL: '-', FU: '-' },
  'OUT-S5': { OW: 'O', ST: 'O', CW: 'E', MB: 'V', SE: '-', CL: '-', FU: '-' },
  'OUT-A1': { OW: 'O', ST: 'O', CW: 'E', MB: 'V', SE: '-', CL: '-', FU: '-' },
  'OUT-A2': { OW: 'O', ST: 'O', CW: 'E', MB: '-', SE: '-', CL: 'V', FU: '-' },
  'OUT-A3': { OW: 'O', ST: 'O', CW: 'E', MB: 'V', SE: '-', CL: '-', FU: '-' },
  'OUT-A4': { OW: 'O', ST: 'O', CW: '-', MB: 'E', SE: '-', CL: '-', FU: '-' },
  'OUT-A5': { OW: 'O', ST: 'O', CW: '-', MB: 'E', SE: '-', CL: '-', FU: '-' },
  'OUT-A6': { OW: 'O', ST: 'O', CW: 'E', MB: '-', SE: 'V', CL: 'V', FU: '-' },
  'OUT-A7': { OW: 'O', ST: 'O', CW: '-', MB: 'E', SE: '-', CL: '-', FU: '-' },
  'OUT-IC': { OW: 'O', ST: 'O', CW: 'V', MB: 'E', SE: '-', CL: '-', FU: '-' },

  // ── SAL (16 tasks) ──────────────────────────────────────
  'SAL-S0':   { OW: 'O', ST: 'O', CW: 'E', MB: '-', SE: '-', CL: 'V', FU: '-' },
  'SAL-S1':   { OW: 'O', ST: 'O', CW: 'E', MB: '-', SE: '-', CL: 'V', FU: '-' },
  'SAL-S2':   { OW: 'O', ST: 'O', CW: 'E', MB: '-', SE: '-', CL: 'V', FU: '-' },
  'SAL-S3':   { OW: 'O', ST: 'O', CW: 'E', MB: '-', SE: '-', CL: 'V', FU: '-' },
  'SAL-S4':   { OW: 'O', ST: 'O', CW: 'E', MB: '-', SE: 'V', CL: 'E', FU: '-' },
  'SAL-S5':   { OW: 'O', ST: 'O', CW: 'E', MB: '-', SE: 'V', CL: 'E', FU: '-' },
  'SAL-S6':   { OW: 'O', ST: 'O', CW: 'E', MB: '-', SE: 'E', CL: 'V', FU: '-' },
  'SAL-S7':   { OW: 'O', ST: 'O', CW: 'E', MB: '-', SE: 'E', CL: 'V', FU: '-' },
  'SAL-A0':   { OW: 'O', ST: 'O', CW: 'E', MB: '-', SE: '-', CL: 'V', FU: '-' },
  'SAL-A1':   { OW: 'O', ST: 'O', CW: 'E', MB: '-', SE: '-', CL: 'V', FU: '-' },
  'SAL-A2':   { OW: 'O', ST: 'O', CW: 'E', MB: '-', SE: '-', CL: 'V', FU: '-' },
  'SAL-A3':   { OW: 'O', ST: 'O', CW: 'E', MB: '-', SE: 'V', CL: 'E', FU: '-' },
  'SAL-A4':   { OW: 'O', ST: 'O', CW: 'E', MB: '-', SE: 'V', CL: 'E', FU: '-' },
  'SAL-A5':   { OW: 'O', ST: 'O', CW: 'E', MB: '-', SE: 'V', CL: 'E', FU: '-' },
  'SAL-A6':   { OW: 'O', ST: 'O', CW: '-', MB: 'V', SE: 'E', CL: '-', FU: '-' },
  'SAL-FP03': { OW: 'O', ST: 'O', CW: '-', MB: 'V', SE: 'E', CL: '-', FU: '-' },

  // ── DLR (13 tasks) ──────────────────────────────────────
  'DLR-S0': { OW: 'O', ST: 'O', CW: 'E', MB: '-', SE: 'V', CL: 'V', FU: 'E' },
  'DLR-S1': { OW: 'O', ST: 'O', CW: 'E', MB: '-', SE: 'V', CL: 'V', FU: 'E' },
  'DLR-S2': { OW: 'O', ST: 'O', CW: 'V', MB: '-', SE: '-', CL: 'V', FU: 'E' },
  'DLR-S3': { OW: 'O', ST: 'O', CW: 'V', MB: '-', SE: '-', CL: 'V', FU: 'E' },
  'DLR-S4': { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: 'V', FU: 'E' },
  'DLR-S5': { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: 'V', FU: 'E' },
  'DLR-A1': { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: '-', FU: 'E' },
  'DLR-A2': { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: '-', FU: 'E' },
  'DLR-A3': { OW: 'O', ST: 'O', CW: 'E', MB: '-', SE: '-', CL: 'V', FU: 'E' },
  'DLR-A4': { OW: 'O', ST: 'O', CW: 'E', MB: '-', SE: '-', CL: 'V', FU: 'E' },
  'DLR-A5': { OW: 'O', ST: 'O', CW: 'V', MB: '-', SE: '-', CL: '-', FU: 'E' },
  'DLR-A6': { OW: 'O', ST: 'O', CW: 'V', MB: '-', SE: '-', CL: '-', FU: 'E' },
  'DLR-A7': { OW: 'O', ST: 'O', CW: 'E', MB: '-', SE: '-', CL: 'V', FU: 'E' },

  // ── RET (11 tasks) ──────────────────────────────────────
  'RET-S1': { OW: 'O', ST: 'O', CW: 'E', MB: '-', SE: '-', CL: '-', FU: 'V' },
  'RET-S2': { OW: 'O', ST: 'O', CW: 'E', MB: '-', SE: '-', CL: '-', FU: 'V' },
  'RET-S3': { OW: 'O', ST: 'O', CW: 'E', MB: '-', SE: '-', CL: 'V', FU: '-' },
  'RET-S4': { OW: 'O', ST: 'O', CW: 'E', MB: '-', SE: '-', CL: 'V', FU: '-' },
  'RET-S5': { OW: 'O', ST: 'O', CW: 'E', MB: '-', SE: '-', CL: 'V', FU: '-' },
  'RET-A1': { OW: 'O', ST: 'O', CW: 'E', MB: '-', SE: '-', CL: 'V', FU: '-' },
  'RET-A2': { OW: 'O', ST: 'O', CW: 'E', MB: '-', SE: '-', CL: 'V', FU: '-' },
  'RET-A3': { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: 'V', FU: '-' },
  'RET-A4': { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'RET-A5': { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: 'V', FU: '-' },
  'RET-A6': { OW: 'O', ST: 'O', CW: 'V', MB: '-', SE: '-', CL: '-', FU: 'E' },

  // ── OPT (12 tasks) ──────────────────────────────────────
  'OPT-S1': { OW: 'O', ST: '-', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'OPT-S2': { OW: 'O', ST: '-', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'OPT-S3': { OW: 'O', ST: '-', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'OPT-S4': { OW: 'O', ST: '-', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'OPT-S5': { OW: 'O', ST: '-', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'OPT-S6': { OW: 'O', ST: '-', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'OPT-S7': { OW: 'O', ST: '-', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'OPT-A1': { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'OPT-A2': { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'OPT-A3': { OW: 'O', ST: '-', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'OPT-A4': { OW: 'O', ST: '-', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
  'OPT-A5': { OW: 'O', ST: 'O', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' },
};

/**
 * Get the access level for a role on a specific BBOS task.
 * Returns 'O' when roleId is 'all', task has no entry, or task has no bbosTaskType.
 */
export function getTaskAccessLevel(roleId, bbosTaskType) {
  if (!roleId || roleId === 'all' || !bbosTaskType) return 'O';
  const entry = BBOS_TASK_ACCESS[bbosTaskType];
  if (!entry) return 'O';
  return entry[roleId] || 'O';
}

/**
 * Get a role definition by ID.
 */
export function getBbosRole(roleId) {
  return BBOS_ROLES.find((r) => r.id === roleId) || BBOS_ROLES[0];
}
