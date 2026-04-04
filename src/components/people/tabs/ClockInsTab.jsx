import { useState, useEffect, useRef } from 'react';
import { useContactsStore } from '../../../store/contacts-store';
import { CLOCK_IN_LOCATIONS } from '../../../data/contact-config';
import ClockInModal from '../ClockInModal';

function formatDuration(ms) {
  if (!ms || ms < 0) return '00:00:00';
  const totalSec = Math.floor(ms / 1000);
  const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
  const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
  const s = String(totalSec % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function formatTime(iso) {
  if (!iso) return '—';
  try { return new Date(iso).toLocaleTimeString(); } catch { return '—'; }
}

export default function ClockInsTab({ contactId }) {
  const clockIns      = useContactsStore((s) => s.clockIns);
  const clockOut      = useContactsStore((s) => s.clockOut);
  const deleteClockIn = useContactsStore((s) => s.deleteClockIn);
  const getActiveClockIn = useContactsStore((s) => s.getActiveClockIn);

  const [showModal, setShowModal] = useState(false);
  const [elapsed, setElapsed]    = useState(0);
  const timerRef = useRef(null);

  const myClockIns = clockIns.filter((ci) => ci.contactId === contactId)
    .sort((a, b) => b.clockInTime.localeCompare(a.clockInTime));
  const active = myClockIns.find((ci) => !ci.clockOutTime) || null;

  useEffect(() => {
    if (active) {
      timerRef.current = setInterval(() => {
        setElapsed(Date.now() - new Date(active.clockInTime).getTime());
      }, 1000);
    } else {
      setElapsed(0);
    }
    return () => clearInterval(timerRef.current);
  }, [active?.id]);

  // Compute averages
  const completed = myClockIns.filter((ci) => ci.totalMinutes != null);
  const avgDuration = completed.length
    ? completed.reduce((s, ci) => s + ci.totalMinutes, 0) / completed.length
    : 0;

  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    end:   new Date().toISOString().slice(0, 10),
  });

  const inRange = myClockIns.filter((ci) => {
    const d = ci.clockInTime.slice(0, 10);
    return d >= dateRange.start && d <= dateRange.end;
  });

  const inputStyle = {
    padding: '5px 8px', borderRadius: 6, border: '1.5px solid var(--border)',
    background: 'var(--bg)', color: 'var(--text)', fontSize: 12,
  };

  return (
    <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Clock In button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={() => setShowModal(true)} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '7px 16px', borderRadius: 8,
          background: 'var(--text)', color: 'var(--bg)',
          border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer',
        }}>
          + Add Clock In
        </button>
      </div>

      {/* Live timer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'var(--bg)', borderRadius: 10, border: '1.5px solid var(--border)' }}>
        <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'monospace', color: 'var(--text)', letterSpacing: 2 }}>
          {active ? formatDuration(elapsed) : '00:00:00'}
        </div>
        <div style={{ marginLeft: 'auto' }}>
          {active ? (
            <button onClick={() => clockOut(active.id)} style={{
              padding: '7px 16px', borderRadius: 8, background: '#dc2626', color: '#fff',
              border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              ⏹ Clock Out
            </button>
          ) : (
            <button onClick={() => setShowModal(true)} style={{
              padding: '7px 16px', borderRadius: 8, background: '#16a34a', color: '#fff',
              border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              ● Clock In
            </button>
          )}
        </div>
      </div>

      {/* Averages */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {[
          { label: 'Average Clock-In Duration', value: formatDuration(avgDuration * 60 * 1000) },
          { label: 'Average Breaks Duration',   value: '00:00:00' },
          { label: 'Average Break Count',        value: 0 },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--mod-people)', fontFamily: 'monospace' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Date range filter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
        <span style={{ color: 'var(--text3)' }}>Start</span>
        <input type="date" style={inputStyle} value={dateRange.start} onChange={(e) => setDateRange((r) => ({ ...r, start: e.target.value }))} />
        <span style={{ color: 'var(--text3)' }}>—</span>
        <span style={{ color: 'var(--text3)' }}>End</span>
        <input type="date" style={inputStyle} value={dateRange.end} onChange={(e) => setDateRange((r) => ({ ...r, end: e.target.value }))} />
      </div>

      {/* Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            {['Clock In Time', 'Clock Out Time', 'Total Clock In Time', 'Total Break Time', 'Location', 'Description', ''].map((h) => (
              <th key={h} style={{ padding: '6px 8px', textAlign: 'left', fontWeight: 600, color: 'var(--text3)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {inRange.length === 0 ? (
            <tr><td colSpan={7} style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text3)' }}>0–0 of 0</td></tr>
          ) : (
            inRange.map((ci) => (
              <tr key={ci.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '7px 8px' }}>{formatTime(ci.clockInTime)}</td>
                <td style={{ padding: '7px 8px' }}>{formatTime(ci.clockOutTime)}</td>
                <td style={{ padding: '7px 8px' }}>{ci.totalMinutes != null ? formatDuration(ci.totalMinutes * 60 * 1000) : '—'}</td>
                <td style={{ padding: '7px 8px' }}>—</td>
                <td style={{ padding: '7px 8px', textTransform: 'capitalize' }}>{ci.location}</td>
                <td style={{ padding: '7px 8px', color: 'var(--text2)' }}>{ci.description || '—'}</td>
                <td style={{ padding: '7px 8px' }}>
                  <button onClick={() => deleteClockIn(ci.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)' }}>✕</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showModal && (
        <ClockInModal
          contactId={contactId}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
