import { useState } from 'react';
import { useContactsStore } from '../../../store/contacts-store';
import { ABSENCE_TYPES, ABSENCE_STATUSES } from '../../../data/contact-config';
import { differenceInBusinessDays, parseISO, isValid } from 'date-fns';

function StatBox({ label, value, color = 'var(--text)' }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 13 }}>
      <span style={{ color: 'var(--text2)' }}>{label}:</span>
      <span style={{ fontWeight: 600, color }}>{value}</span>
    </div>
  );
}

export default function AbsenceTab({ contactId }) {
  const absenceRecords    = useContactsStore((s) => s.absenceRecords);
  const addAbsence        = useContactsStore((s) => s.addAbsence);
  const updateAbsenceStatus = useContactsStore((s) => s.updateAbsenceStatus);
  const deleteAbsence     = useContactsStore((s) => s.deleteAbsence);
  const computeVacationStats = useContactsStore((s) => s.computeVacationStats);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ subType: 'annual', startDate: '', endDate: '', note: '' });

  const records = absenceRecords.filter((a) => a.contactId === contactId);
  const stats   = computeVacationStats(contactId);

  const absences = records.filter((a) => a.type === 'absence');
  const absApproved = absences.filter((a) => a.status === 'approved').reduce((s, a) => s + (a.days || 0), 0);
  const absUnapproved = absences.filter((a) => a.status === 'rejected').reduce((s, a) => s + (a.days || 0), 0);
  const absPending = absences.filter((a) => a.status === 'pending').reduce((s, a) => s + (a.days || 0), 0);

  function handleRequestTimeOff() {
    if (!form.startDate || !form.endDate) return;
    let days = 0;
    try {
      const s = parseISO(form.startDate), e = parseISO(form.endDate);
      if (isValid(s) && isValid(e)) days = Math.max(1, differenceInBusinessDays(e, s) + 1);
    } catch {}
    addAbsence({
      contactId, type: 'vacation', subType: form.subType,
      startDate: form.startDate, endDate: form.endDate, days, note: form.note, status: 'pending',
    });
    setForm({ subType: 'annual', startDate: '', endDate: '', note: '' });
    setShowForm(false);
  }

  const statusColor = { pending: '#d97706', approved: '#16a34a', rejected: '#dc2626' };
  const inputStyle = {
    width: '100%', padding: '7px 10px', borderRadius: 7,
    border: '1.5px solid var(--border)', background: 'var(--bg)',
    color: 'var(--text)', fontSize: 13, boxSizing: 'border-box',
  };

  return (
    <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Two-column stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#16a34a', marginBottom: 8 }}>Vacation</div>
          <StatBox label="Available Days" value={stats.available} />
          <StatBox label="Used Days" value={`${stats.used}/${stats.available}`} />
          <StatBox label="Pending Approval" value={stats.pending} />
          <StatBox label="Restart cycle" value="Fri, 1 Jan 2027" />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#dc2626', marginBottom: 8 }}>Absences</div>
          <StatBox label="Days absent" value={absApproved} />
          <StatBox label="Approved" value={absApproved} color="#16a34a" />
          <StatBox label="Unapproved" value={absUnapproved} color="#dc2626" />
          <StatBox label="Pending approval" value={absPending} color="#d97706" />
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button style={{
          flex: 1, padding: '8px 0', borderRadius: 8,
          background: 'var(--text)', color: 'var(--bg)',
          border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer',
        }}>Assign vacation plan</button>
        <button onClick={() => setShowForm((s) => !s)} style={{
          flex: 1, padding: '8px 0', borderRadius: 8,
          background: 'var(--text)', color: 'var(--bg)',
          border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer',
        }}>Request time off</button>
      </div>

      {/* Request form */}
      {showForm && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 14, background: 'var(--bg)', borderRadius: 10, border: '1.5px solid var(--border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 3 }}>Type</div>
              <select style={inputStyle} value={form.subType} onChange={(e) => setForm((f) => ({ ...f, subType: e.target.value }))}>
                {ABSENCE_TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 3 }}>Note</div>
              <input style={inputStyle} value={form.note} onChange={(e) => setForm((f) => ({ ...f, note: e.target.value })) } placeholder="Optional note" />
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 3 }}>Start date</div>
              <input type="date" style={inputStyle} value={form.startDate} onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 3 }}>End date</div>
              <input type="date" style={inputStyle} value={form.endDate} onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))} />
            </div>
          </div>
          <button onClick={handleRequestTimeOff} style={{
            padding: '8px 0', borderRadius: 8, background: 'var(--mod-people)', color: '#fff',
            border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer',
          }}>Submit Request</button>
        </div>
      )}

      {/* Table */}
      {records.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Date', 'Days', 'Type', 'Note', 'Status', ''].map((h) => (
                <th key={h} style={{ padding: '6px 8px', textAlign: 'left', fontWeight: 600, color: 'var(--text3)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map((a) => (
              <tr key={a.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '7px 8px', color: 'var(--text2)' }}>{a.startDate || '—'}</td>
                <td style={{ padding: '7px 8px' }}>{a.days}</td>
                <td style={{ padding: '7px 8px' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 6px', borderRadius: 4,
                    background: `${ABSENCE_TYPES.find((t) => t.id === a.subType)?.color || '#6b7280'}22`,
                    color: ABSENCE_TYPES.find((t) => t.id === a.subType)?.color || '#6b7280',
                  }}>
                    {ABSENCE_TYPES.find((t) => t.id === a.subType)?.label || a.subType}
                  </span>
                </td>
                <td style={{ padding: '7px 8px', color: 'var(--text2)' }}>{a.note || '—'}</td>
                <td style={{ padding: '7px 8px' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: statusColor[a.status] }}>
                    {ABSENCE_STATUSES.find((s) => s.id === a.status)?.label || a.status}
                  </span>
                </td>
                <td style={{ padding: '7px 8px' }}>
                  <button onClick={() => deleteAbsence(a.id)} style={{
                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', fontSize: 11,
                  }}>✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {records.length === 0 && (
        <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text3)', fontSize: 13 }}>
          No absence records yet.
        </div>
      )}
    </div>
  );
}
