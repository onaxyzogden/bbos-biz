import { useState } from 'react';
import { X, ChevronDown, ChevronRight } from 'lucide-react';
import { useContactsStore } from '../../store/contacts-store';
import { getDisplayName } from '../../data/contact-config';

function EditRow({ label, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '11px 0',
          background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', fontWeight: 500, fontSize: 13,
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--mod-people)', flexShrink: 0 }} />
        <span style={{ flex: 1, textAlign: 'left' }}>{label}</span>
        {open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
      </button>
      {open && <div style={{ paddingBottom: 12 }}>{children}</div>}
    </div>
  );
}

export default function EditSidePanel() {
  const selectedContactId = useContactsStore((s) => s.selectedContactId);
  const contacts          = useContactsStore((s) => s.contacts);
  const companies         = useContactsStore((s) => s.companies);
  const closeEditPanel    = useContactsStore((s) => s.closeEditPanel);
  const updateContact     = useContactsStore((s) => s.updateContact);
  const updateCompany     = useContactsStore((s) => s.updateCompany);
  const archiveContact    = useContactsStore((s) => s.archiveContact);

  const contact = contacts.find((c) => c.id === selectedContactId);
  const company = companies.find((c) => c.id === selectedContactId);
  const entry   = contact || company;
  const isCompany = !!company && !contact;

  const [assocPerson,  setAssocPerson]  = useState('');
  const [assocTitle,   setAssocTitle]   = useState('');

  function save(key, val) {
    if (contact) updateContact(contact.id, { [key]: val });
    else if (company) updateCompany(company.id, { [key]: val });
  }

  const employees = contacts.filter((c) => c.contactType === 'employee');

  const inputStyle = {
    width: '100%', padding: '7px 10px', borderRadius: 7,
    border: '1.5px solid var(--border)', background: 'var(--bg)',
    color: 'var(--text)', fontSize: 13, boxSizing: 'border-box',
  };

  if (!entry) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, right: 480, bottom: 0, width: 300,
      background: 'var(--bg)', borderLeft: '1px solid var(--border)',
      boxShadow: '-4px 0 20px rgba(0,0,0,0.08)',
      overflowY: 'auto', zIndex: 501, padding: '16px 16px',
      animation: 'slideInRight 200ms var(--ease)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>Edit</div>
        <button onClick={closeEditPanel} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)' }}>
          <X size={16} />
        </button>
      </div>

      {/* Search */}
      <input placeholder="Search" style={{ ...inputStyle, marginBottom: 12 }} />

      {/* Person associations */}
      {!isCompany && (
        <EditRow label="Person associations" defaultOpen={true}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <select
              style={inputStyle}
              value={assocPerson}
              onChange={(e) => setAssocPerson(e.target.value)}
            >
              <option value="">Select Person...</option>
              {employees.map((e) => (
                <option key={e.id} value={e.id}>{getDisplayName(e)}</option>
              ))}
            </select>
            <input style={inputStyle} placeholder="Job title" value={assocTitle} onChange={(e) => setAssocTitle(e.target.value)} />
            <button style={{
              padding: '7px 0', background: 'var(--mod-people)', color: '#fff',
              border: 'none', borderRadius: 7, fontWeight: 600, fontSize: 12, cursor: 'pointer',
            }}>Submit</button>
          </div>
        </EditRow>
      )}

      <EditRow label="Archive">
        <button onClick={() => { archiveContact(selectedContactId); closeEditPanel(); }} style={{
          padding: '7px 14px', background: 'var(--danger-bg)', color: 'var(--danger)',
          border: '1px solid var(--danger-border)', borderRadius: 7, cursor: 'pointer', fontSize: 12, fontWeight: 600,
        }}>Archive contact</button>
      </EditRow>

      <EditRow label="Socials">
        <input style={inputStyle} placeholder="LinkedIn URL" />
      </EditRow>

      <EditRow label="Description">
        <textarea
          style={{ ...inputStyle, resize: 'vertical', minHeight: 60 }}
          defaultValue={entry.description || ''}
          onBlur={(e) => save('description', e.target.value)}
        />
      </EditRow>

      <EditRow label="Industry">
        <input style={inputStyle} placeholder="Add industry..." />
      </EditRow>

      <EditRow label="Company name">
        <input style={inputStyle} defaultValue={isCompany ? company.name : contact?.displayName}
          onBlur={(e) => save(isCompany ? 'name' : 'displayName', e.target.value)} />
      </EditRow>

      <EditRow label="Address">
        <input style={inputStyle} placeholder="Street address" defaultValue={entry.address}
          onBlur={(e) => save('address', e.target.value)} />
      </EditRow>

      <EditRow label="Email">
        <input type="email" style={inputStyle} defaultValue={entry.email}
          onBlur={(e) => save('email', e.target.value)} />
      </EditRow>

      <EditRow label="Phone number">
        <input style={inputStyle} defaultValue={entry.phone}
          onBlur={(e) => save('phone', e.target.value)} />
      </EditRow>

      <EditRow label="Website">
        <input style={inputStyle} placeholder="https://..." defaultValue={entry.website || ''}
          onBlur={(e) => save('website', e.target.value)} />
      </EditRow>

      <EditRow label="Logo">
        <div style={{ fontSize: 12, color: 'var(--text3)' }}>Logo upload coming soon.</div>
      </EditRow>

      {isCompany && (
        <>
          <EditRow label="Update Company Tax Number">
            <input style={inputStyle} placeholder="Tax number" />
          </EditRow>
          <EditRow label="Update Company Legal Identification Number">
            <input style={inputStyle} placeholder="Legal ID number" />
          </EditRow>
        </>
      )}
    </div>
  );
}
