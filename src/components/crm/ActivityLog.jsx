import { useState, useMemo } from 'react';
import { Plus, Activity, Trash2, X } from 'lucide-react';
import { useCRMStore, ACTIVITY_TYPES } from '../../store/crm-store';

export default function ActivityLog() {
  const activities = useCRMStore((s) => s.activities);
  const contacts = useCRMStore((s) => s.contacts);
  const deals = useCRMStore((s) => s.deals);
  const addActivity = useCRMStore((s) => s.addActivity);
  const deleteActivity = useCRMStore((s) => s.deleteActivity);
  const [filterType, setFilterType] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [fContactId, setFContactId] = useState('');
  const [fDealId, setFDealId] = useState('');
  const [fType, setFType] = useState('note');
  const [fDesc, setFDesc] = useState('');
  const [fDate, setFDate] = useState(new Date().toISOString().slice(0, 10));

  const contactMap = useMemo(() => { const m = {}; contacts.forEach((c) => { m[c.id] = c; }); return m; }, [contacts]);
  const dealMap = useMemo(() => { const m = {}; deals.forEach((d) => { m[d.id] = d; }); return m; }, [deals]);

  const filtered = useMemo(() => {
    let list = [...activities];
    if (filterType) list = list.filter((a) => a.type === filterType);
    return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [activities, filterType]);

  const handleAdd = () => {
    if (!fDesc.trim()) return;
    addActivity({ contactId: fContactId, dealId: fDealId, type: fType, description: fDesc, date: fDate });
    setShowForm(false); setFDesc(''); setFContactId(''); setFDealId('');
  };

  if (activities.length === 0 && !showForm) {
    return (
      <div className="money-empty">
        <Activity size={40} className="money-empty-icon" />
        <h4>No activities logged</h4>
        <p>Track calls, emails, meetings, and notes with your contacts.</p>
        <button className="btn btn-primary" onClick={() => setShowForm(true)} style={{ background: 'var(--mod-crm)' }}><Plus size={16} /> Log Activity</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
          <button className={`cat-filter-pill ${!filterType ? 'active' : ''}`} onClick={() => setFilterType(null)}>All</button>
          {ACTIVITY_TYPES.map((t) => (
            <button key={t.id} className={`cat-filter-pill ${filterType === t.id ? 'active' : ''}`}
              onClick={() => setFilterType(filterType === t.id ? null : t.id)}>{t.icon} {t.label}</button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)} style={{ background: 'var(--mod-crm)' }}><Plus size={16} /> Log Activity</button>
      </div>

      <table className="money-table">
        <thead><tr><th>Date</th><th>Type</th><th>Description</th><th>Contact</th><th>Deal</th><th style={{ width: 40 }} /></tr></thead>
        <tbody>
          {filtered.map((a) => {
            const at = ACTIVITY_TYPES.find((t) => t.id === a.type);
            const contact = contactMap[a.contactId];
            const deal = dealMap[a.dealId];
            return (
              <tr key={a.id}>
                <td>{new Date(a.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}</td>
                <td><span style={{ fontSize: '0.85rem' }}>{at?.icon} {at?.label || a.type}</span></td>
                <td style={{ maxWidth: 300 }} className="truncate">{a.description}</td>
                <td style={{ color: 'var(--text2)' }}>{contact?.name || '—'}</td>
                <td style={{ color: 'var(--text2)' }}>{deal?.name || '—'}</td>
                <td><button className="row-action-btn danger" onClick={() => deleteActivity(a.id)}><Trash2 size={13} /></button></td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showForm && (
        <div className="expense-form-overlay">
          <div className="expense-form-modal" style={{ maxWidth: 460 }}>
            <div className="expense-form-header"><h3>Log Activity</h3><button className="expense-form-close" onClick={() => setShowForm(false)}><X size={18} /></button></div>
            <div className="expense-form-body">
              <div className="expense-form-row">
                <div className="expense-form-field" style={{ flex: 1 }}>
                  <label>Type</label>
                  <select value={fType} onChange={(e) => setFType(e.target.value)}>{ACTIVITY_TYPES.map((t) => <option key={t.id} value={t.id}>{t.icon} {t.label}</option>)}</select>
                </div>
                <div className="expense-form-field" style={{ flex: 1 }}><label>Date</label><input type="date" value={fDate} onChange={(e) => setFDate(e.target.value)} /></div>
              </div>
              <div className="expense-form-row">
                <div className="expense-form-field" style={{ flex: 1 }}>
                  <label>Contact</label>
                  <select value={fContactId} onChange={(e) => setFContactId(e.target.value)}><option value="">Select...</option>{contacts.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
                </div>
                <div className="expense-form-field" style={{ flex: 1 }}>
                  <label>Deal</label>
                  <select value={fDealId} onChange={(e) => setFDealId(e.target.value)}><option value="">Select...</option>{deals.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}</select>
                </div>
              </div>
              <div className="expense-form-field"><label>Description *</label><textarea value={fDesc} onChange={(e) => setFDesc(e.target.value)} placeholder="What happened?" rows={3} autoFocus /></div>
            </div>
            <div className="expense-form-footer">
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAdd} disabled={!fDesc.trim()} style={{ background: 'var(--mod-crm)', opacity: fDesc.trim() ? 1 : 0.4 }}>Log Activity</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
