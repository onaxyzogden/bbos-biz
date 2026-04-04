import { useState } from 'react';
import { useContactsStore } from '../../../store/contacts-store';
import { format } from 'date-fns';

export default function CompanyInfoTab({ company }) {
  const updateCompany = useContactsStore((s) => s.updateCompany);
  const makeClient    = useContactsStore((s) => s.makeClient);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name:        company.name        || '',
    description: company.description || '',
    website:     company.website     || '',
    email:       company.email       || '',
    phone:       company.phone       || '',
    address:     company.address     || '',
  });
  const [industryInput, setIndustryInput] = useState('');

  function handleSave() {
    updateCompany(company.id, form);
    setEditing(false);
  }

  function addIndustry() {
    const trimmed = industryInput.trim();
    if (!trimmed) return;
    const industries = [...(company.industries || [])];
    if (!industries.includes(trimmed)) {
      updateCompany(company.id, { industries: [...industries, trimmed] });
    }
    setIndustryInput('');
  }

  function removeIndustry(ind) {
    updateCompany(company.id, { industries: company.industries.filter((i) => i !== ind) });
  }

  function formatCreatedAt(iso) {
    if (!iso) return '';
    try { return format(new Date(iso), 'MMM d yyyy HH:mm'); } catch { return iso; }
  }

  const inputStyle = {
    width: '100%', padding: '7px 10px', borderRadius: 7,
    border: '1.5px solid var(--border)', background: 'var(--bg)',
    color: 'var(--text)', fontSize: 13, boxSizing: 'border-box',
  };

  return (
    <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Info fields */}
      {editing ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { label: 'Company name', key: 'name' },
            { label: 'Description', key: 'description', multiline: true },
            { label: 'Website', key: 'website' },
            { label: 'Email', key: 'email' },
            { label: 'Phone', key: 'phone' },
            { label: 'Address', key: 'address' },
          ].map(({ label, key, multiline }) => (
            <div key={key}>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 3 }}>{label}</div>
              {multiline ? (
                <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 64 }}
                  value={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} />
              ) : (
                <input style={inputStyle} value={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} />
              )}
            </div>
          ))}
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={handleSave} style={{
              flex: 1, padding: '8px 0', background: 'var(--mod-people)', color: '#fff',
              border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer',
            }}>Save</button>
            <button onClick={() => setEditing(false)} style={{
              flex: 1, padding: '8px 0', background: 'var(--bg3)', color: 'var(--text)',
              border: '1.5px solid var(--border)', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer',
            }}>Cancel</button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 2 }}>Company name</div>
              <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{company.name || '—'}</div>
            </div>
            <button onClick={() => setEditing(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', fontSize: 12 }}>✎</button>
          </div>

          {company.description && (
            <div>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 2 }}>Description</div>
              <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>{company.description}</div>
            </div>
          )}

          {/* Industries */}
          {(company.industries?.length > 0) && (
            <div>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 6 }}>Industries</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {company.industries.map((ind) => (
                  <span key={ind} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '3px 8px', borderRadius: 6, fontSize: 12, fontWeight: 500,
                    background: 'var(--bg3)', color: 'var(--text2)', border: '1px solid var(--border)',
                  }}>
                    {ind}
                    <button onClick={() => removeIndustry(ind)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', padding: 0, lineHeight: 1 }}>×</button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Add industry */}
          <div style={{ display: 'flex', gap: 6 }}>
            <input
              style={{ ...inputStyle, flex: 1 }}
              value={industryInput}
              onChange={(e) => setIndustryInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') addIndustry(); }}
              placeholder="Add industry tag..."
            />
            <button onClick={addIndustry} style={{
              padding: '7px 12px', borderRadius: 7, background: 'var(--bg3)',
              border: '1.5px solid var(--border)', cursor: 'pointer', fontSize: 12, color: 'var(--text2)',
            }}>+ Add</button>
          </div>

          {company.website && (
            <div>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 2 }}>Website</div>
              <a href={company.website} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: 'var(--primary)' }}>{company.website}</a>
            </div>
          )}
        </div>
      )}

      {/* Contacts section */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>Contacts</div>
        {[
          { label: 'E-mail', value: company.email },
          { label: 'Phone',  value: company.phone },
          { label: 'Address', value: company.address },
        ].map(({ label, value }) => value ? (
          <div key={label} style={{ display: 'flex', gap: 16, padding: '5px 0', fontSize: 13 }}>
            <span style={{ color: 'var(--text3)', width: 60, flexShrink: 0 }}>{label}</span>
            <span style={{ color: 'var(--text)', fontWeight: 500 }}>{value}</span>
          </div>
        ) : null)}
      </div>

      {/* Make Client CTA */}
      <button onClick={() => makeClient(company.id)} style={{
        width: '100%', padding: '11px 0', borderRadius: 10,
        background: 'var(--text)', color: 'var(--bg)',
        border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer',
      }}>
        Make Client
      </button>

      {/* Audit trail */}
      {company.createdBy && (
        <div style={{ fontSize: 12, color: 'var(--text3)', textAlign: 'center' }}>
          By <span style={{ color: 'var(--primary)' }}>{company.createdBy}</span> on {formatCreatedAt(company.createdAt)}
        </div>
      )}
    </div>
  );
}
