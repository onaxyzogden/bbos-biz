// G-Label System — Cross-domain claim integrity grades
// Applied wherever an outcome is stated. No domain may present a G3/G4 claim at G1/G2 level.

export const G_LABELS = [
  {
    id: 'G1',
    label: 'Grounded',
    description: 'Verified delivery — the outcome has been concretely demonstrated.',
    color: '#22c55e',
    bg: '#22c55e18',
    icon: 'ShieldCheck',
  },
  {
    id: 'G2',
    label: 'Supported',
    description: 'Evidenced standard — has supporting data or precedent under normal conditions.',
    color: '#3b82f6',
    bg: '#3b82f618',
    icon: 'FileCheck',
  },
  {
    id: 'G3',
    label: 'Exploratory',
    description: 'Conditional or inferred — based on partial evidence or hypothesis.',
    color: '#f59e0b',
    bg: '#f59e0b18',
    icon: 'FlaskConical',
  },
  {
    id: 'G4',
    label: 'Aspirational',
    description: 'Future intent — not yet attempted or validated.',
    color: '#8b5cf6',
    bg: '#8b5cf618',
    icon: 'Sparkles',
  },
];

export function getGLabel(id) {
  return G_LABELS.find((g) => g.id === id) || null;
}
