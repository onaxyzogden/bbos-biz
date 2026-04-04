import { useState, useMemo } from 'react';
import { Plus, Layers, Pencil, Trash2, X, ExternalLink } from 'lucide-react';
import { useTechStore, STACK_CATEGORIES } from '../../store/tech-store';
import { formatCurrency } from '../../store/money-store';

export default function StackOverview() {
  const stackItems = useTechStore((s) => s.stackItems);
  const addStackItem = useTechStore((s) => s.addStackItem);
  const updateStackItem = useTechStore((s) => s.updateStackItem);
  const deleteStackItem = useTechStore((s) => s.deleteStackItem);
  const [filterCat, setFilterCat] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [fName, setFName] = useState('');
  const [fCat, setFCat] = useState('saas');
  const [fVersion, setFVersion] = useState('');
  const [fUrl, setFUrl] = useState('');
  const [fCost, setFCost] = useState('');
  const [fNotes, setFNotes] = useState('');

  const catMap = useMemo(() => { const m = {}; STACK_CATEGORIES.forEach((c) => { m[c.id] = c; }); return m; }, []);

  const filtered = useMemo(() => {
    let list = [...stackItems];
    if (filterCat) list = list.filter((i) => i.category === filterCat);
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [stackItems, filterCat]);

  const totalMonthlyCost = useMemo(() => stackItems.reduce((s, i) => s + (i.cost || 0), 0), [stackItems]);

  const openForm = (item) => {
    if (item) {
      setEditItem(item); setFName(item.name); setFCat(item.category);
      setFVersion(item.version); setFUrl(item.url); setFCost(String(item.cost || '')); setFNotes(item.notes);
    } else {
      setEditItem(null); setFName(''); setFCat('saas'); setFVersion(''); setFUrl(''); setFCost(''); setFNotes('');
    }
    setShowForm(true);
  };

  const handleSave = () => {
    if (!fName.trim()) return;
    const data = { name: fName, category: fCat, version: fVersion, url: fUrl, cost: Number(fCost) || 0, notes: fNotes };
    if (editItem) updateStackItem(editItem.id, data);
    else addStackItem(data);
    setShowForm(false); setEditItem(null);
  };

  if (stackItems.length === 0 && !showForm) {
    return (
      <div className="money-empty">
        <Layers size={40} className="money-empty-icon" />
        <h4>No tech stack items</h4>
        <p>Document your tools, services, and infrastructure.</p>
        <button className="btn btn-primary" onClick={() => openForm(null)} style={{ background: 'var(--mod-tech)' }}>
          <Plus size={16} /> Add Tool
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <button className={`cat-filter-pill ${!filterCat ? 'active' : ''}`} onClick={() => setFilterCat(null)}>All</button>
          {STACK_CATEGORIES.map((c) => (
            <button key={c.id} className={`cat-filter-pill ${filterCat === c.id ? 'active' : ''}`}
              onClick={() => setFilterCat(filterCat === c.id ? null : c.id)}
              style={filterCat === c.id ? { background: c.color + '18', color: c.color, borderColor: c.color + '40' } : undefined}>
              {c.label}
            </button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => openForm(null)} style={{ background: 'var(--mod-tech)' }}>
          <Plus size={16} /> Add Tool
        </button>
      </div>

      {totalMonthlyCost > 0 && (
        <div style={{ marginBottom: 'var(--space-4)', fontSize: '0.85rem', color: 'var(--text2)' }}>
          Total monthly cost: <span className="amount" style={{ fontWeight: 700 }}>{formatCurrency(totalMonthlyCost)}</span> · {stackItems.length} tool{stackItems.length !== 1 ? 's' : ''}
        </div>
      )}

      <table className="money-table">
        <thead><tr><th>Tool</th><th>Category</th><th>Version</th><th style={{ textAlign: 'right' }}>Cost/mo</th><th style={{ width: 80 }} /></tr></thead>
        <tbody>
          {filtered.map((item) => {
            const cat = catMap[item.category];
            return (
              <tr key={item.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span style={{ fontWeight: 600 }}>{item.name}</span>
                    {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text3)' }} onClick={(e) => e.stopPropagation()}><ExternalLink size={12} /></a>}
                  </div>
                </td>
                <td><span className="cat-pill" style={{ background: (cat?.color || '#6b7280') + '15', color: cat?.color || '#6b7280' }}>{cat?.label || item.category}</span></td>
                <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: 'var(--text2)' }}>{item.version || '—'}</td>
                <td style={{ textAlign: 'right' }} className="amount">{item.cost > 0 ? formatCurrency(item.cost) : 'Free'}</td>
                <td>
                  <div className="row-actions">
                    <button className="row-action-btn" onClick={() => openForm(item)}><Pencil size={13} /></button>
                    <button className="row-action-btn danger" onClick={() => { if (confirm('Delete?')) deleteStackItem(item.id); }}><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showForm && (
        <div className="expense-form-overlay">
          <div className="expense-form-modal" style={{ maxWidth: 460 }}>
            <div className="expense-form-header"><h3>{editItem ? 'Edit Tool' : 'Add Tool'}</h3><button className="expense-form-close" onClick={() => setShowForm(false)}><X size={18} /></button></div>
            <div className="expense-form-body">
              <div className="expense-form-field"><label>Name *</label><input value={fName} onChange={(e) => setFName(e.target.value)} placeholder="e.g., Vercel, PostgreSQL" autoFocus /></div>
              <div className="expense-form-row">
                <div className="expense-form-field" style={{ flex: 1 }}>
                  <label>Category</label>
                  <select value={fCat} onChange={(e) => setFCat(e.target.value)}>
                    {STACK_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
                <div className="expense-form-field" style={{ flex: 1 }}><label>Version</label><input value={fVersion} onChange={(e) => setFVersion(e.target.value)} placeholder="v2.1.0" /></div>
              </div>
              <div className="expense-form-row">
                <div className="expense-form-field" style={{ flex: 1 }}><label>URL</label><input value={fUrl} onChange={(e) => setFUrl(e.target.value)} placeholder="https://..." /></div>
                <div className="expense-form-field" style={{ flex: 1 }}><label>Monthly Cost</label><input type="number" step="1" min="0" value={fCost} onChange={(e) => setFCost(e.target.value)} placeholder="0" /></div>
              </div>
              <div className="expense-form-field"><label>Notes</label><textarea value={fNotes} onChange={(e) => setFNotes(e.target.value)} placeholder="What is this used for?" rows={2} /></div>
            </div>
            <div className="expense-form-footer">
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave} disabled={!fName.trim()} style={{ background: 'var(--mod-tech)', opacity: fName.trim() ? 1 : 0.4 }}>{editItem ? 'Save' : 'Add Tool'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
