import { useState, useMemo } from 'react';
import { Plus, Contact, Pencil, Trash2, Search, X } from 'lucide-react';
import { useCRMStore, CONTACT_TYPES } from '../../store/crm-store';

function ContactForm({ contact, onClose }) {
  const addContact = useCRMStore((s) => s.addContact);
  const updateContact = useCRMStore((s) => s.updateContact);
  const isEdit = !!contact;
  const [name, setName] = useState(contact?.name || '');
  const [email, setEmail] = useState(contact?.email || '');
  const [phone, setPhone] = useState(contact?.phone || '');
  const [company, setCompany] = useState(contact?.company || '');
  const [role, setRole] = useState(contact?.role || '');
  const [type, setType] = useState(contact?.type || 'lead');
  const [notes, setNotes] = useState(contact?.notes || '');

  const handleSave = () => {
    if (!name.trim()) return;
    const data = { name, email, phone, company, role, type, notes };
    if (isEdit) updateContact(contact.id, data); else addContact(data);
    onClose();
  };

  return (
    <div className="expense-form-overlay">
      <div className="expense-form-modal" style={{ maxWidth: 480 }}>
        <div className="expense-form-header"><h3>{isEdit ? 'Edit Contact' : 'New Contact'}</h3><button className="expense-form-close" onClick={onClose}><X size={18} /></button></div>
        <div className="expense-form-body">
          <div className="expense-form-row">
            <div className="expense-form-field" style={{ flex: 1 }}><label>Name *</label><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Contact name" autoFocus /></div>
            <div className="expense-form-field" style={{ flex: 1 }}>
              <label>Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>{CONTACT_TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}</select>
            </div>
          </div>
          <div className="expense-form-row">
            <div className="expense-form-field" style={{ flex: 1 }}><label>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@company.com" /></div>
            <div className="expense-form-field" style={{ flex: 1 }}><label>Phone</label><input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" /></div>
          </div>
          <div className="expense-form-row">
            <div className="expense-form-field" style={{ flex: 1 }}><label>Company</label><input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" /></div>
            <div className="expense-form-field" style={{ flex: 1 }}><label>Role</label><input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Job title" /></div>
          </div>
          <div className="expense-form-field"><label>Notes</label><textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes about this contact..." rows={2} /></div>
        </div>
        <div className="expense-form-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={!name.trim()} style={{ background: 'var(--mod-crm)', opacity: name.trim() ? 1 : 0.4 }}>{isEdit ? 'Save' : 'Add Contact'}</button>
        </div>
      </div>
    </div>
  );
}

export default function ContactList() {
  const contacts = useCRMStore((s) => s.contacts);
  const deleteContact = useCRMStore((s) => s.deleteContact);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editContact, setEditContact] = useState(null);

  const filtered = useMemo(() => {
    let list = [...contacts];
    if (search) { const q = search.toLowerCase(); list = list.filter((c) => c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)); }
    if (filterType) list = list.filter((c) => c.type === filterType);
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [contacts, search, filterType]);

  if (contacts.length === 0 && !showForm) {
    return (
      <div className="money-empty">
        <Contact size={40} className="money-empty-icon" />
        <h4>No contacts yet</h4>
        <p>Add your first contact to start building relationships.</p>
        <button className="btn btn-primary" onClick={() => setShowForm(true)} style={{ background: 'var(--mod-crm)' }}><Plus size={16} /> Add Contact</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 260 }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)' }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search contacts..." style={{ width: '100%', paddingLeft: 30, fontSize: '0.85rem', borderRadius: 'var(--radius)' }} />
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)} style={{ background: 'var(--mod-crm)' }}><Plus size={16} /> Add Contact</button>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
        <button className={`cat-filter-pill ${!filterType ? 'active' : ''}`} onClick={() => setFilterType(null)}>All</button>
        {CONTACT_TYPES.map((t) => (
          <button key={t.id} className={`cat-filter-pill ${filterType === t.id ? 'active' : ''}`}
            onClick={() => setFilterType(filterType === t.id ? null : t.id)}
            style={filterType === t.id ? { background: t.color + '18', color: t.color, borderColor: t.color + '40' } : undefined}>{t.label}</button>
        ))}
      </div>

      <table className="money-table">
        <thead><tr><th>Name</th><th>Company</th><th>Email</th><th>Type</th><th style={{ width: 60 }} /></tr></thead>
        <tbody>
          {filtered.map((c) => {
            const ct = CONTACT_TYPES.find((t) => t.id === c.type);
            return (
              <tr key={c.id}>
                <td style={{ fontWeight: 500 }}>{c.name}{c.role && <span style={{ color: 'var(--text3)', fontWeight: 400, marginLeft: 'var(--space-2)', fontSize: '0.8rem' }}>{c.role}</span>}</td>
                <td>{c.company || '—'}</td>
                <td style={{ color: 'var(--text2)' }}>{c.email || '—'}</td>
                <td><span className={`status-badge type-${c.type}`}>{ct?.label || c.type}</span></td>
                <td>
                  <div className="row-actions">
                    <button className="row-action-btn" onClick={() => { setEditContact(c); setShowForm(true); }}><Pencil size={14} /></button>
                    <button className="row-action-btn danger" onClick={() => { if (confirm('Delete this contact and all related deals/activities?')) deleteContact(c.id); }}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p style={{ fontSize: '0.8rem', color: 'var(--text3)', marginTop: 'var(--space-3)' }}>{filtered.length} contact{filtered.length !== 1 ? 's' : ''}</p>

      {showForm && <ContactForm contact={editContact} onClose={() => { setShowForm(false); setEditContact(null); }} />}
    </div>
  );
}
