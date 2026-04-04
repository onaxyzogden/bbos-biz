import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useContactsStore } from '../../store/contacts-store';
import { useAuthStore } from '../../store/auth-store';
import { CLOCK_IN_LOCATIONS } from '../../data/contact-config';

const ICONS = { office: '🏢', remote: '🏠', field: '📍' };

export default function ClockInModal({ contactId, onClose }) {
  const addClockIn = useContactsStore((s) => s.addClockIn);
  const user       = useAuthStore((s) => s.user);
  const firstName  = user?.name?.split(' ')[0] || 'You';

  const [showManual, setShowManual] = useState(false);
  const [manualDate, setManualDate] = useState(new Date().toISOString().slice(0, 10));
  const [manualTime, setManualTime] = useState(new Date().toTimeString().slice(0, 5));
  const [manualLocation, setManualLocation] = useState('office');
  const [manualDesc, setManualDesc] = useState('');

  function clockIn(location) {
    addClockIn({
      contactId: contactId || '',
      clockInTime: new Date().toISOString(),
      location,
    });
    onClose();
  }

  function clockInManual() {
    const clockInTime = new Date(`${manualDate}T${manualTime}`).toISOString();
    addClockIn({ contactId: contactId || '', clockInTime, location: manualLocation, description: manualDesc });
    onClose();
  }

  const inputStyle = {
    width: '100%', padding: '8px 12px', borderRadius: 8,
    border: '1.5px solid var(--border)', background: 'var(--bg)',
    color: 'var(--text)', fontSize: 13, boxSizing: 'border-box',
  };

  return createPortal(
    <div style={{
      position: 'fixed', inset: 0, zIndex: 900,
      background: 'var(--overlay)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={onClose}>
      <div style={{
        width: 400, background: 'var(--surface)', borderRadius: 16,
        boxShadow: 'var(--shadow-xl)', padding: '24px',
        display: 'flex', flexDirection: 'column', gap: 20,
        animation: 'scaleIn 180ms var(--ease)',
      }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>Clocking in</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', padding: 4 }}>
            <X size={16} />
          </button>
        </div>

        {/* Location prompt */}
        <div>
          <div style={{ textAlign: 'center', fontSize: 14, color: 'var(--text)', marginBottom: 16 }}>
            <strong>{firstName}</strong>, where are you clocking in from today?
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {CLOCK_IN_LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                onClick={() => clockIn(loc.id)}
                style={{
                  padding: '16px 8px',
                  background: 'var(--text)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 10,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  fontWeight: 600,
                  fontSize: 12,
                  transition: 'opacity var(--duration) var(--ease)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                <span style={{ fontSize: 22 }}>{loc.icon}</span>
                {loc.label}
              </button>
            ))}
          </div>
        </div>

        {/* Manual option */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontSize: 12, color: 'var(--text3)' }}>or</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>
          <button
            onClick={() => setShowManual((s) => !s)}
            style={{
              width: '100%', padding: '9px 0', borderRadius: 8,
              border: '1.5px solid var(--border)', background: 'transparent',
              color: 'var(--text)', fontWeight: 500, fontSize: 13, cursor: 'pointer',
            }}
          >
            Add manually
          </button>
        </div>

        {/* Manual form */}
        {showManual && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, borderTop: '1px solid var(--border)', paddingTop: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 3 }}>Date</div>
                <input type="date" style={inputStyle} value={manualDate} onChange={(e) => setManualDate(e.target.value)} />
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 3 }}>Time</div>
                <input type="time" style={inputStyle} value={manualTime} onChange={(e) => setManualTime(e.target.value)} />
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 3 }}>Location</div>
              <select style={inputStyle} value={manualLocation} onChange={(e) => setManualLocation(e.target.value)}>
                {CLOCK_IN_LOCATIONS.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 3 }}>Description (optional)</div>
              <input style={inputStyle} value={manualDesc} onChange={(e) => setManualDesc(e.target.value)} placeholder="Notes..." />
            </div>
            <button onClick={clockInManual} style={{
              padding: '9px 0', background: 'var(--mod-people)', color: '#fff',
              border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer',
            }}>Save Clock-In</button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
