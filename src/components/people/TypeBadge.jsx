import { CONTACT_TYPES } from '../../data/contact-config';

const TYPE_COLORS = {
  contact:  { bg: 'rgba(107,114,128,0.12)', color: '#6b7280' },
  lead:     { bg: 'rgba(245,158,11,0.12)',  color: '#d97706' },
  client:   { bg: 'rgba(34,197,94,0.12)',   color: '#16a34a' },
  employee: { bg: 'rgba(139,92,246,0.12)',  color: '#7c3aed' },
};

export default function TypeBadge({ type, style = {} }) {
  const cfg = TYPE_COLORS[type] || TYPE_COLORS.contact;
  const label = CONTACT_TYPES.find((t) => t.id === type)?.label || type;
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '2px 8px',
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.3px',
      textTransform: 'uppercase',
      background: cfg.bg,
      color: cfg.color,
      ...style,
    }}>
      {label}
    </span>
  );
}
