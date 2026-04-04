import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useContactsStore } from '../../store/contacts-store';
import { useAuthStore } from '../../store/auth-store';
import { LEAD_STAGES, LEAD_SOURCES } from '../../data/contact-config';

const ENTITY_TYPES = ['person', 'company'];
const PERSON_TYPES = ['contact', 'lead', 'client', 'employee'];

export default function AddContactModal({ onClose }) {
  const addContact = useContactsStore((s) => s.addContact);
  const addCompany = useContactsStore((s) => s.addCompany);
  const user = useAuthStore((s) => s.user);

  const [entityType, setEntityType] = useState('person');
  const [contactType, setContactType] = useState('contact');
  const [showMore, setShowMore] = useState(false);

  // Person fields
  const [firstName, setFirstName]   = useState('');
  const [lastName,  setLastName]    = useState('');
  const [email,     setEmail]       = useState('');
  const [phone,     setPhone]       = useState('');
  const [jobTitle,  setJobTitle]    = useState('');
  // Lead extras
  const [leadSource,   setLeadSource]   = useState('email');
  const [leadStatus,   setLeadStatus]   = useState('unassigned');
  const [requestTitle, setRequestTitle] = useState('');
  const [requestDesc,  setRequestDesc]  = useState('');
  const [budget,       setBudget]       = useState('');
  const [informLead,   setInformLead]   = useState(false);
  // Company fields
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [website,     setWebsite]     = useState('');

  const canSubmit = entityType === 'person'
    ? (firstName.trim() || email.trim())
    : companyName.trim();

  function handleSubmit() {
    if (!canSubmit) return;
    const createdBy = user?.name || '';
    if (entityType === 'person') {
      addContact({
        entityType: 'person',
        contactType,
        firstName: firstName.trim(),
        lastName:  lastName.trim(),
        email:     email.trim(),
        phone:     phone.trim(),
        jobTitle:  jobTitle.trim(),
        leadSource:          contactType === 'lead' ? leadSource : '',
        leadStatus:          contactType === 'lead' ? leadStatus : 'unassigned',
        requestTitle:        contactType === 'lead' ? requestTitle.trim() : '',
        requestDescription:  contactType === 'lead' ? requestDesc.trim() : '',
        estimatedBudget:     contactType === 'lead' && budget ? Number(budget) : null,
        createdBy,
      });
    } else {
      addCompany({
        name:        companyName.trim(),
        description: description.trim(),
        website:     website.trim(),
        createdBy,
      });
    }
    onClose();
  }

  const inputStyle = {
    width: '100%', padding: '8px 12px', borderRadius: 8,
    border: '1.5px solid var(--border)', background: 'var(--bg)',
    color: 'var(--text)', fontSize: 13, outline: 'none', boxSizing: 'border-box',
  };
  const labelStyle = { fontSize: 12, fontWeight: 500, color: 'var(--text2)', marginBottom: 4, display: 'block' };

  return createPortal(
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'var(--overlay)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
    }} onClick={onClose}>
      <div
        style={{
          width: 420, height: '100%', background: 'var(--surface)',
          boxShadow: 'var(--shadow-xl)', overflowY: 'auto',
          display: 'flex', flexDirection: 'column',
          animation: 'slideInRight 200ms var(--ease)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: '20px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>Add a New Contact</div>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>Add and manage contacts in your CRM.</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text2)', padding: 4 }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '16px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Entity toggle */}
          <div>
            <label style={labelStyle}>Entity</label>
            <div style={{ display: 'flex', gap: 6 }}>
              {ENTITY_TYPES.map((et) => (
                <button key={et} onClick={() => setEntityType(et)} style={{
                  flex: 1, padding: '7px 0', borderRadius: 8, border: '1.5px solid',
                  borderColor: entityType === et ? 'var(--mod-people)' : 'var(--border)',
                  background: entityType === et ? 'rgba(139,92,246,0.1)' : 'transparent',
                  color: entityType === et ? 'var(--mod-people)' : 'var(--text2)',
                  fontWeight: 600, fontSize: 13, cursor: 'pointer', textTransform: 'capitalize',
                }}>
                  {et}
                </button>
              ))}
            </div>
          </div>

          {entityType === 'person' && (
            <>
              {/* Type toggle */}
              <div>
                <label style={labelStyle}>Type</label>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {PERSON_TYPES.map((t) => (
                    <button key={t} onClick={() => setContactType(t)} style={{
                      padding: '5px 12px', borderRadius: 6, border: '1.5px solid',
                      borderColor: contactType === t ? 'var(--mod-people)' : 'var(--border)',
                      background: contactType === t ? 'rgba(139,92,246,0.1)' : 'transparent',
                      color: contactType === t ? 'var(--mod-people)' : 'var(--text2)',
                      fontWeight: 600, fontSize: 12, cursor: 'pointer', textTransform: 'capitalize',
                    }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Person fields */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={labelStyle}>First name</label>
                  <input style={inputStyle} value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" />
                </div>
                <div>
                  <label style={labelStyle}>Last name</label>
                  <input style={inputStyle} value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input style={inputStyle} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
              </div>

              {/* Show more toggle */}
              <button onClick={() => setShowMore((s) => !s)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--text3)', fontSize: 12, textAlign: 'left', padding: 0,
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span style={{ width: 24, height: 1, background: 'var(--border)', display: 'inline-block' }} />
                Show {showMore ? 'fewer' : 'more'} options
                <span style={{ flex: 1, height: 1, background: 'var(--border)', display: 'inline-block' }} />
              </button>

              {showMore && (
                <>
                  <div>
                    <label style={labelStyle}>Phone number</label>
                    <input style={inputStyle} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" />
                  </div>
                  <div>
                    <label style={labelStyle}>Job title</label>
                    <input style={inputStyle} value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Job title" />
                  </div>
                </>
              )}

              {/* Lead-specific fields */}
              {contactType === 'lead' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, borderTop: '1px solid var(--border)', paddingTop: 12, marginTop: 4 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text3)', textAlign: 'center' }}>Interested in…</div>

                  <div>
                    <label style={labelStyle}>Lead Source</label>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {LEAD_SOURCES.map((ls) => (
                        <button key={ls.id} onClick={() => setLeadSource(ls.id)} style={{
                          flex: 1, padding: '6px 0', borderRadius: 6, border: '1.5px solid',
                          borderColor: leadSource === ls.id ? 'var(--mod-people)' : 'var(--border)',
                          background: leadSource === ls.id ? 'rgba(139,92,246,0.1)' : 'transparent',
                          color: leadSource === ls.id ? 'var(--mod-people)' : 'var(--text2)',
                          fontWeight: 500, fontSize: 12, cursor: 'pointer',
                        }}>
                          {ls.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Request title</label>
                    <input style={inputStyle} value={requestTitle} onChange={(e) => setRequestTitle(e.target.value)} placeholder="Request title" />
                  </div>
                  <div>
                    <label style={labelStyle}>Request description</label>
                    <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 72 }}
                      value={requestDesc} onChange={(e) => setRequestDesc(e.target.value)} placeholder="Request description" />
                  </div>
                  <div>
                    <label style={labelStyle}>Estimated Budget</label>
                    <input style={inputStyle} type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Estimated Budget" />
                  </div>
                  <div>
                    <label style={labelStyle}>Lead status</label>
                    <select style={inputStyle} value={leadStatus} onChange={(e) => setLeadStatus(e.target.value)}>
                      {LEAD_STAGES.map((s) => (
                        <option key={s.id} value={s.id}>{s.label}</option>
                      ))}
                    </select>
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text2)', cursor: 'pointer' }}>
                    <input type="checkbox" checked={informLead} onChange={(e) => setInformLead(e.target.checked)} />
                    Inform the lead that they have been added to CRM
                  </label>
                </div>
              )}
            </>
          )}

          {entityType === 'company' && (
            <>
              <div>
                <label style={labelStyle}>Company name *</label>
                <input style={inputStyle} value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company name" />
              </div>
              <div>
                <label style={labelStyle}>Description</label>
                <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 72 }}
                  value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What does this company do?" />
              </div>
              <div>
                <label style={labelStyle}>Website</label>
                <input style={inputStyle} value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://..." />
              </div>
            </>
          )}
        </div>

        {/* Submit */}
        <div style={{ padding: '0 20px 20px' }}>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            style={{
              width: '100%', padding: '11px 0', borderRadius: 10,
              background: canSubmit ? 'var(--text)' : 'var(--bg4)',
              color: canSubmit ? 'var(--bg)' : 'var(--text3)',
              border: 'none', fontWeight: 600, fontSize: 14, cursor: canSubmit ? 'pointer' : 'not-allowed',
              transition: 'background var(--duration) var(--ease)',
            }}
          >
            Add new contact
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
