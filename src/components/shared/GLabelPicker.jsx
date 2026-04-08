import { useState, useRef, useEffect } from 'react';
import { G_LABELS } from '../../data/g-labels';
import GLabelBadge from './GLabelBadge';

export default function GLabelPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px 8px',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--bg)',
          cursor: 'pointer',
          fontSize: '0.78rem',
          color: 'var(--text2)',
        }}
      >
        {value ? <GLabelBadge gLabel={value} /> : 'G-Label'}
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: '4px',
            minWidth: '200px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            zIndex: 100,
            padding: '4px',
          }}
        >
          {value && (
            <button
              type="button"
              onClick={() => { onChange(null); setOpen(false); }}
              style={{
                display: 'block',
                width: '100%',
                padding: '6px 8px',
                border: 'none',
                background: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.78rem',
                color: 'var(--text3)',
                borderRadius: 'var(--radius-sm)',
              }}
              onMouseEnter={(e) => e.target.style.background = 'var(--bg2)'}
              onMouseLeave={(e) => e.target.style.background = 'none'}
            >
              Clear
            </button>
          )}
          {G_LABELS.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => { onChange(g.id); setOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                padding: '6px 8px',
                border: 'none',
                background: value === g.id ? 'var(--bg2)' : 'none',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.78rem',
                borderRadius: 'var(--radius-sm)',
              }}
              onMouseEnter={(e) => e.target.style.background = 'var(--bg2)'}
              onMouseLeave={(e) => e.target.style.background = value === g.id ? 'var(--bg2)' : 'none'}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  color: g.color,
                  minWidth: '24px',
                }}
              >
                {g.id}
              </span>
              <span style={{ color: 'var(--text)' }}>{g.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
