import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useContactsStore } from '../../../store/contacts-store';
import { DOC_STATUSES } from '../../../data/contact-config';

export default function DocsTab({ contactId }) {
  const docRecords = useContactsStore((s) => s.docRecords);
  const addDoc     = useContactsStore((s) => s.addDoc);
  const updateDoc  = useContactsStore((s) => s.updateDoc);
  const deleteDoc  = useContactsStore((s) => s.deleteDoc);
  const user       = { name: 'You' }; // fallback

  const docs = docRecords.filter((d) => d.contactId === contactId);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', status: 'pending' });

  function handleCreate() {
    if (!form.name.trim()) return;
    addDoc({ contactId, name: form.name.trim(), status: form.status, addedDate: new Date().toISOString().slice(0, 10), createdBy: user?.name || '' });
    setForm({ name: '', status: 'pending' });
    setShowForm(false);
  }

  const statusColor = { pending: '#d97706', approved: '#16a34a', expired: '#dc2626' };
  const inputStyle = {
    width: '100%', padding: '7px 10px', borderRadius: 7,
    border: '1.5px solid var(--border)', background: 'var(--bg)',
    color: 'var(--text)', fontSize: 13, boxSizing: 'border-box',
  };

  return (
    <div style={{ paddingTop: 16 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Employee Documents</div>
        <button onClick={() => setShowForm((s) => !s)} style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '7px 14px', borderRadius: 8,
          background: 'var(--text)', color: 'var(--bg)',
          border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer',
        }}>
          <Plus size={13} /> Create new
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14, padding: 12, background: 'var(--bg)', borderRadius: 10, border: '1.5px solid var(--border)' }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 3 }}>Document name *</div>
            <input style={inputStyle} placeholder="e.g. Employment Contract" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 3 }}>Status</div>
            <select style={inputStyle} value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}>
              {DOC_STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={handleCreate} style={{
              flex: 1, padding: '8px 0', background: 'var(--mod-people)', color: '#fff',
              border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13,
            }}>Add Document</button>
            <button onClick={() => setShowForm(false)} style={{
              flex: 1, padding: '8px 0', background: 'var(--bg3)', color: 'var(--text2)',
              border: '1.5px solid var(--border)', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13,
            }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Folder indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', background: 'var(--bg3)', borderRadius: 8, marginBottom: 10, fontSize: 13, color: 'var(--text2)' }}>
        📁 Employee Docs
      </div>

      {/* Table */}
      {docs.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Name', 'Added Date', 'Status', 'Action'].map((h) => (
                <th key={h} style={{ padding: '7px 8px', textAlign: 'left', fontWeight: 600, color: 'var(--text3)', fontSize: 12 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {docs.map((d) => (
              <tr key={d.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 8px', color: 'var(--text)', fontWeight: 500 }}>{d.name}</td>
                <td style={{ padding: '8px 8px', color: 'var(--text2)' }}>{d.addedDate}</td>
                <td style={{ padding: '8px 8px' }}>
                  <select
                    value={d.status}
                    onChange={(e) => updateDoc(d.id, { status: e.target.value })}
                    style={{
                      padding: '2px 6px', borderRadius: 4, border: 'none',
                      background: `${statusColor[d.status]}22`,
                      color: statusColor[d.status], fontSize: 11, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    {DOC_STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                </td>
                <td style={{ padding: '8px 8px' }}>
                  <button onClick={() => deleteDoc(d.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)' }}>
                    <Trash2 size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text3)', fontSize: 13 }}>
          No documents added yet. Click "Create new" to add one.
        </div>
      )}
    </div>
  );
}
