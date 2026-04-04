import { Plus } from 'lucide-react';

export default function FloatingFAB({ onClick }) {
  return (
    <button
      onClick={onClick}
      title="Add contact"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: 52,
        height: 52,
        borderRadius: '50%',
        background: 'var(--mod-people)',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(139,92,246,0.4)',
        zIndex: 200,
        transition: 'transform var(--duration) var(--ease), box-shadow var(--duration) var(--ease)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
    >
      <Plus size={22} />
    </button>
  );
}
