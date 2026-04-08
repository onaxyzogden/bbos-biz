import { useState, useRef, useEffect } from 'react';
import { BBOS_ROLES } from '../../data/bbos-role-access';
import BbosRoleBadge from './BbosRoleBadge';

export default function BbosRolePicker({ value, onChange }) {
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
          gap: '6px',
          padding: '3px 10px',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--bg)',
          cursor: 'pointer',
          fontSize: '0.75rem',
          color: 'var(--text2)',
        }}
      >
        <BbosRoleBadge roleId={value || 'all'} />
        <span style={{ fontSize: '0.72rem' }}>
          {BBOS_ROLES.find((r) => r.id === (value || 'all'))?.label || 'Role'}
        </span>
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: '4px',
            minWidth: '240px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            zIndex: 100,
            padding: '4px',
          }}
        >
          {BBOS_ROLES.map((role) => (
            <button
              key={role.id}
              type="button"
              onClick={() => { onChange(role.id); setOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                padding: '6px 8px',
                border: 'none',
                background: (value || 'all') === role.id ? 'var(--bg2)' : 'none',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.78rem',
                borderRadius: 'var(--radius-sm)',
              }}
              onMouseEnter={(e) => e.target.style.background = 'var(--bg2)'}
              onMouseLeave={(e) => e.target.style.background = (value || 'all') === role.id ? 'var(--bg2)' : 'none'}
            >
              <BbosRoleBadge roleId={role.id} />
              <span style={{ color: 'var(--text)', flex: 1 }}>{role.label}</span>
              <span style={{ color: 'var(--text3)', fontSize: '0.68rem' }}>{role.description}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
