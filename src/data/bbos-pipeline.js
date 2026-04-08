// BBOS Pipeline — 9-stage business cultivation system
// Each project can opt into BBOS, getting these stages as Kanban columns
// Three layers: Think (FND–OFR), Execute (OUT–DLR), Reckon (RET–OPT)

export const BBOS_LAYERS = [
  { id: 'think',   label: 'Think',   color: '#c9a05a', stages: ['FND', 'TRU', 'STR', 'OFR'] },
  { id: 'execute', label: 'Execute', color: '#4ab8a8', stages: ['OUT', 'SAL', 'DLR'] },
  { id: 'reckon',  label: 'Reckon',  color: '#6366f1', stages: ['RET', 'OPT'] },
];

export const BBOS_STAGES = [
  {
    id: 'FND', order: 0, label: 'Foundation', layer: 'think',
    description: 'Establish the foundational identity, mission, and values of the business.',
    attrs: 'Al-Awwal · Al-Badi',
    color: 'var(--col-todo)',
  },
  {
    id: 'TRU', order: 1, label: 'Truth', layer: 'think',
    description: 'Build credibility and establish the trust infrastructure for your offering.',
    attrs: 'Al-Mu\'min · Al-Wakil',
    color: '#6366f1',
  },
  {
    id: 'STR', order: 2, label: 'Strategy', layer: 'think',
    description: 'Design the operational structure, processes, and team architecture.',
    attrs: 'Al-Musawwir · Al-Mudabbir',
    color: '#8b5cf6',
  },
  {
    id: 'OFR', order: 3, label: 'Offering', layer: 'think',
    description: 'Define and price the service offering with clarity and integrity.',
    attrs: 'Ar-Razzaq · Al-Karim',
    color: '#c9a05a',
  },
  {
    id: 'OUT', order: 4, label: 'Outreach', layer: 'execute',
    description: 'Reach the right people through ethical, purposeful outreach.',
    attrs: 'Al-Hadi · An-Nur',
    color: '#22c55e',
  },
  {
    id: 'SAL', order: 5, label: 'Sales', layer: 'execute',
    description: 'Convert interest into commitment through honest, consultative selling.',
    attrs: 'As-Sami · Al-Basir',
    color: '#3b82f6',
  },
  {
    id: 'DLR', order: 6, label: 'Delivery', layer: 'execute',
    description: 'Deliver the promised outcome with excellence and care.',
    attrs: 'Al-Muhsin · Al-Latif',
    color: '#4ab8a8',
  },
  {
    id: 'RET', order: 7, label: 'Retention', layer: 'reckon',
    description: 'Retain clients through ongoing value, relationship, and stewardship.',
    attrs: 'Al-Wadud · Al-Hafiz',
    color: '#f59e0b',
  },
  {
    id: 'OPT', order: 8, label: 'Optimization', layer: 'reckon',
    description: 'Reckon with outcomes, optimize systems, and prepare for the next cycle.',
    attrs: 'Al-Hasib · Al-Khabir',
    color: '#ef4444',
  },
];

/** Get the layer for a given stage ID */
export function getStageLayer(stageId) {
  return BBOS_LAYERS.find((l) => l.stages.includes(stageId)) || null;
}

/** Get stage by ID */
export function getStage(stageId) {
  return BBOS_STAGES.find((s) => s.id === stageId) || null;
}
