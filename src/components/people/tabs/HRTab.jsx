import { useState } from 'react';
import { useContactsStore } from '../../../store/contacts-store';
import { EMPLOYMENT_TYPES } from '../../../data/contact-config';
import { differenceInYears, differenceInDays, parseISO, isValid } from 'date-fns';

function StatItem({ value, label }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>{label}</div>
    </div>
  );
}

function Field({ label, value, children }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 2 }}>{label}:</div>
      <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{children || value || 'Not specified'}</div>
    </div>
  );
}

export default function HRTab({ contactId }) {
  const contacts   = useContactsStore((s) => s.contacts);
  const hrRecords  = useContactsStore((s) => s.hrRecords);
  const departments = useContactsStore((s) => s.departments);
  const updateContact   = useContactsStore((s) => s.updateContact);
  const addHRRecord     = useContactsStore((s) => s.addHRRecord);
  const updateHRRecord  = useContactsStore((s) => s.updateHRRecord);

  const contact = contacts.find((c) => c.id === contactId);
  const hrRec   = hrRecords.find((r) => r.contactId === contactId);
  const employees = contacts.filter((c) => c.contactType === 'employee' && c.id !== contactId);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    employmentType:       hrRec?.employmentType       || '',
    hiringDate:           hrRec?.hiringDate           || '',
    departmentId:         hrRec?.departmentId         || '',
    officeLocation:       hrRec?.officeLocation       || '',
    contractEndDate:      hrRec?.contractEndDate      || '',
    superiorId:           hrRec?.superiorId           || '',
    workingPositionTitle: hrRec?.workingPositionTitle || contact?.jobTitle || '',
    backgroundCheckStatus: hrRec?.backgroundCheckStatus || '',
  });

  function handleSave() {
    if (hrRec) {
      updateHRRecord(hrRec.id, form);
    } else {
      addHRRecord({ contactId, ...form });
    }
    setEditing(false);
  }

  // Computed stats
  const hiringDate = hrRec?.hiringDate;
  let yearsWithCompany = '—';
  if (hiringDate) {
    try {
      const d = parseISO(hiringDate);
      if (isValid(d)) yearsWithCompany = differenceInYears(new Date(), d);
    } catch {}
  }

  const dob = contact?.dob;
  let daysUntilBirthday = '—';
  if (dob) {
    try {
      const d = parseISO(dob);
      if (isValid(d)) {
        const today = new Date();
        const next = new Date(today.getFullYear(), d.getMonth(), d.getDate());
        if (next < today) next.setFullYear(today.getFullYear() + 1);
        daysUntilBirthday = differenceInDays(next, today);
      }
    } catch {}
  }

  const dept = departments.find((d) => d.id === (hrRec?.departmentId));
  const superior = employees.find((e) => e.id === hrRec?.superiorId);

  if (editing) {
    const inputStyle = {
      width: '100%', padding: '7px 10px', borderRadius: 7,
      border: '1.5px solid var(--border)', background: 'var(--bg)',
      color: 'var(--text)', fontSize: 13, boxSizing: 'border-box',
    };
    const labelStyle = { fontSize: 11, color: 'var(--text3)', marginBottom: 3, display: 'block' };
    const f = (k) => ({ value: form[k], onChange: (e) => setForm((p) => ({ ...p, [k]: e.target.value })) });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div>
            <label style={labelStyle}>Employment type</label>
            <select style={inputStyle} {...f('employmentType')}>
              <option value="">Not specified</option>
              {EMPLOYMENT_TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Hiring date</label>
            <input type="date" style={inputStyle} {...f('hiringDate')} />
          </div>
          <div>
            <label style={labelStyle}>Department</label>
            <select style={inputStyle} {...f('departmentId')}>
              <option value="">Not specified</option>
              {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Working position title</label>
            <input style={inputStyle} placeholder="e.g. CEO" {...f('workingPositionTitle')} />
          </div>
          <div>
            <label style={labelStyle}>Office</label>
            <input style={inputStyle} placeholder="Office location" {...f('officeLocation')} />
          </div>
          <div>
            <label style={labelStyle}>Contract end date</label>
            <input type="date" style={inputStyle} {...f('contractEndDate')} />
          </div>
          <div>
            <label style={labelStyle}>Add superior</label>
            <select style={inputStyle} {...f('superiorId')}>
              <option value="">No superior</option>
              {employees.map((e) => (
                <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Background check</label>
            <input style={inputStyle} placeholder="Status" {...f('backgroundCheckStatus')} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={handleSave} style={{
            flex: 1, padding: '8px 0', borderRadius: 8,
            background: 'var(--mod-people)', color: '#fff',
            border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer',
          }}>Save</button>
          <button onClick={() => setEditing(false)} style={{
            flex: 1, padding: '8px 0', borderRadius: 8,
            background: 'var(--bg3)', color: 'var(--text)',
            border: '1.5px solid var(--border)', fontWeight: 600, fontSize: 13, cursor: 'pointer',
          }}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Field label="Employment type" value={EMPLOYMENT_TYPES.find((t) => t.id === hrRec?.employmentType)?.label} />
        <Field label="Hiring Date" value={hrRec?.hiringDate || 'Invalid date'} />
        <Field label="Background check" value={hrRec?.backgroundCheckStatus || 'Feature coming soon'} />
        <div />
        <Field label="Department" value={dept?.name} />
        <Field label="Working position title" value={hrRec?.workingPositionTitle || contact?.jobTitle} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 2 }}>Status:</div>
            <span style={{
              fontSize: 13, fontWeight: 600,
              color: contact?.status === 'active' ? '#16a34a' : '#6b7280',
            }}>
              {contact?.status === 'active' ? 'Active' : 'Inactive'}
            </span>
          </div>
          <button
            onClick={() => updateContact(contactId, { status: contact?.status === 'active' ? 'archived' : 'active' })}
            style={{
              padding: '5px 12px', borderRadius: 6, border: 'none', cursor: 'pointer',
              background: contact?.status === 'active' ? 'var(--text)' : 'var(--success)',
              color: '#fff', fontSize: 12, fontWeight: 600,
            }}
          >
            {contact?.status === 'active' ? 'Deactivate' : 'Activate'}
          </button>
        </div>
        <Field label="Office" value={hrRec?.officeLocation} />
        <Field label="Contract end date" value={hrRec?.contractEndDate} />
        <div>
          <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 2 }}>Add superior:</div>
          <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>
            {superior ? `${superior.firstName} ${superior.lastName}` : '—'}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <button onClick={() => setEditing(true)} style={{
          padding: '7px 14px', borderRadius: 7, border: '1.5px solid var(--border)',
          background: 'var(--bg)', color: 'var(--text2)', fontSize: 12, cursor: 'pointer',
        }}>Edit HR Info</button>
        <button style={{
          padding: '7px 14px', borderRadius: 7, border: '1.5px solid var(--border)',
          background: 'var(--bg)', color: 'var(--text2)', fontSize: 12, cursor: 'pointer',
        }}>Change password</button>
      </div>

      {/* Stats footer */}
      <div style={{
        marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)',
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
      }}>
        <StatItem value={0} label="open tasks" />
        <StatItem value={0} label="active projects" />
        <StatItem value={0} label="completed tasks" />
        <StatItem value={yearsWithCompany} label="years with company" />
        <StatItem value={daysUntilBirthday} label="days until birthday" />
        <StatItem value={0} label="completed projects" />
      </div>
    </div>
  );
}
