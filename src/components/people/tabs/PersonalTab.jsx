import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useContactsStore } from '../../../store/contacts-store';
import CollapsibleSection from '../CollapsibleSection';

function EditableField({ label, value, fieldKey, onSave }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value || '');

  if (editing) {
    return (
      <div>
        <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 3 }}>{label}</div>
        <div style={{ display: 'flex', gap: 6 }}>
          <input
            autoFocus
            value={val}
            onChange={(e) => setVal(e.target.value)}
            style={{
              flex: 1, padding: '6px 10px', borderRadius: 6,
              border: '1.5px solid var(--mod-people)', background: 'var(--bg)',
              color: 'var(--text)', fontSize: 13,
            }}
          />
          <button onClick={() => { onSave(fieldKey, val); setEditing(false); }} style={{
            padding: '6px 10px', background: 'var(--mod-people)', color: '#fff',
            border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12,
          }}>✓</button>
          <button onClick={() => { setVal(value || ''); setEditing(false); }} style={{
            padding: '6px 10px', background: 'var(--bg3)', color: 'var(--text2)',
            border: '1.5px solid var(--border)', borderRadius: 6, cursor: 'pointer', fontSize: 12,
          }}>✕</button>
        </div>
      </div>
    );
  }

  return (
    <div onClick={() => setEditing(true)} style={{ cursor: 'pointer', padding: '4px 0' }}>
      <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 13, color: value ? 'var(--text)' : 'var(--text3)', fontWeight: value ? 500 : 400 }}>
        {value || 'Not set'}
      </div>
    </div>
  );
}

export default function PersonalTab({ contactId }) {
  const contacts       = useContactsStore((s) => s.contacts);
  const hrRecords      = useContactsStore((s) => s.hrRecords);
  const updateContact  = useContactsStore((s) => s.updateContact);
  const updateHRRecord = useContactsStore((s) => s.updateHRRecord);

  const contact = contacts.find((c) => c.id === contactId);
  const hrRec   = hrRecords.find((r) => r.contactId === contactId);

  function saveContact(key, val) {
    updateContact(contactId, { [key]: val });
  }
  function saveHR(key, val) {
    if (hrRec) updateHRRecord(hrRec.id, { [key]: val });
  }

  if (!contact) return null;

  return (
    <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Basic info */}
      <div style={{ marginBottom: 4 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Basic info</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <EditableField label="First name"    value={contact.firstName}    fieldKey="firstName"    onSave={saveContact} />
          <EditableField label="Gender"        value={contact.gender}       fieldKey="gender"       onSave={saveContact} />
          <EditableField label="Last name"     value={contact.lastName}     fieldKey="lastName"     onSave={saveContact} />
          <EditableField label="Date of birth" value={contact.dob}          fieldKey="dob"          onSave={saveContact} />
        </div>
      </div>

      <div style={{ height: 1, background: 'var(--border)', margin: '8px 0' }} />

      {/* Personal details */}
      <div style={{ marginBottom: 4 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Personal details</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <EditableField label="Hiring date"          value={hrRec?.hiringDate}    fieldKey="hiringDate"   onSave={saveHR} />
          <EditableField label="Nationality"          value={contact.nationality}  fieldKey="nationality"  onSave={saveContact} />
          <EditableField label="Social security number" value={contact.ssn}        fieldKey="ssn"          onSave={saveContact} />
          <EditableField label="Marital status"       value={contact.maritalStatus} fieldKey="maritalStatus" onSave={saveContact} />
          <EditableField label="Children"             value={contact.children?.toString()} fieldKey="children" onSave={(k, v) => saveContact(k, v ? Number(v) : null)} />
        </div>
      </div>

      <div style={{ height: 1, background: 'var(--border)', margin: '8px 0' }} />

      {/* Contact info */}
      <div style={{ marginBottom: 4 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Contact info</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <EditableField label="Address"       value={contact.address}      fieldKey="address"      onSave={saveContact} />
          <EditableField label="Private email" value={contact.privateEmail} fieldKey="privateEmail" onSave={saveContact} />
          <EditableField label="Private phone" value={contact.privatePhone} fieldKey="privatePhone" onSave={saveContact} />
        </div>
      </div>

      <div style={{ height: 1, background: 'var(--border)', margin: '8px 0' }} />

      {/* Emergency contact */}
      <CollapsibleSection title="Emergency contact" rightElement={<Plus size={14} style={{ color: 'var(--text3)' }} />}>
        <div style={{ fontSize: 13, color: 'var(--text3)', paddingLeft: 22 }}>No emergency contact added.</div>
      </CollapsibleSection>

      {/* Signature */}
      <CollapsibleSection title="Signature" rightElement={<Plus size={14} style={{ color: 'var(--text3)' }} />}>
        <div style={{ fontSize: 13, color: 'var(--text3)', paddingLeft: 22 }}>No signature added.</div>
      </CollapsibleSection>
    </div>
  );
}
