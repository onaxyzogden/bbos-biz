import { getGLabel } from '../../data/g-labels';

export default function GLabelBadge({ gLabel, size = 'sm' }) {
  const g = getGLabel(gLabel);
  if (!g) return null;

  const isSm = size === 'sm';

  return (
    <span
      className="glabel-badge"
      title={`${g.id}: ${g.label} — ${g.description}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '3px',
        padding: isSm ? '1px 6px' : '2px 8px',
        fontSize: isSm ? '0.65rem' : '0.72rem',
        fontWeight: 600,
        fontFamily: "'JetBrains Mono', monospace",
        color: g.color,
        background: g.bg,
        border: `1px solid ${g.color}30`,
        borderRadius: '4px',
        letterSpacing: '0.03em',
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
      }}
    >
      {g.id}
    </span>
  );
}
