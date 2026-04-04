import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function CollapsibleSection({ title, children, defaultOpen = false, rightElement }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: open ? 0 : 0 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text)',
          fontWeight: 600,
          fontSize: 13,
          textAlign: 'left',
        }}
      >
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        <span style={{ flex: 1 }}>{title}</span>
        {rightElement}
      </button>
      {open && (
        <div style={{ paddingBottom: 12 }}>
          {children}
        </div>
      )}
    </div>
  );
}
