import { useState, useMemo } from 'react';
import { Plus, ShieldAlert, Check, Eye, Trash2, X } from 'lucide-react';
import { useTechStore, ALERT_SEVERITIES } from '../../store/tech-store';

const FILTERS = ['all', 'active', 'acknowledged', 'resolved'];

export default function SecurityAlerts() {
  const alerts = useTechStore((s) => s.alerts);
  const addAlert = useTechStore((s) => s.addAlert);
  const acknowledgeAlert = useTechStore((s) => s.acknowledgeAlert);
  const resolveAlert = useTechStore((s) => s.resolveAlert);
  const deleteAlert = useTechStore((s) => s.deleteAlert);
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [fTitle, setFTitle] = useState('');
  const [fDesc, setFDesc] = useState('');
  const [fSeverity, setFSeverity] = useState('info');
  const [fSource, setFSource] = useState('');

  const filtered = useMemo(() =>
    alerts.filter((a) => filter === 'all' || a.status === filter).sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  [alerts, filter]);

  const handleAdd = () => {
    if (!fTitle.trim()) return;
    addAlert({ title: fTitle, description: fDesc, severity: fSeverity, source: fSource });
    setShowForm(false); setFTitle(''); setFDesc(''); setFSource('');
  };

  const activeCount = alerts.filter((a) => a.status === 'active').length;
  const criticalCount = alerts.filter((a) => a.status === 'active' && a.severity === 'critical').length;

  if (alerts.length === 0 && !showForm) {
    return (
      <div className="money-empty">
        <ShieldAlert size={40} className="money-empty-icon" />
        <h4>No security alerts</h4>
        <p>Track security incidents and vulnerability alerts.</p>
        <button className="btn btn-primary" onClick={() => setShowForm(true)} style={{ background: 'var(--mod-tech)' }}>
          <Plus size={16} /> Create Alert
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Summary bar */}
      {activeCount > 0 && (
        <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)', padding: 'var(--space-3) var(--space-4)', background: criticalCount > 0 ? 'var(--danger-bg)' : 'var(--warning-bg)', borderRadius: 'var(--radius)', border: `1px solid ${criticalCount > 0 ? 'var(--danger-border)' : 'var(--warning-border)'}` }}>
          <ShieldAlert size={16} style={{ color: criticalCount > 0 ? 'var(--danger)' : 'var(--warning)' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{activeCount} active alert{activeCount !== 1 ? 's' : ''}{criticalCount > 0 ? ` (${criticalCount} critical)` : ''}</span>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
          {FILTERS.map((f) => (
            <button key={f} className={`cat-filter-pill ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)} style={{ textTransform: 'capitalize' }}>{f}</button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)} style={{ background: 'var(--mod-tech)' }}>
          <Plus size={16} /> New Alert
        </button>
      </div>

      <table className="money-table">
        <thead><tr><th>Severity</th><th>Title</th><th>Source</th><th>Created</th><th>Status</th><th style={{ width: 100 }} /></tr></thead>
        <tbody>
          {filtered.map((alert) => (
            <tr key={alert.id}>
              <td><span className={`status-badge severity-${alert.severity}`}>{alert.severity}</span></td>
              <td style={{ fontWeight: 500 }}>{alert.title}</td>
              <td style={{ color: 'var(--text2)' }}>{alert.source || '—'}</td>
              <td>{new Date(alert.createdAt).toLocaleDateString('en', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
              <td><span className={`status-badge status-${alert.status}`}>{alert.status}</span></td>
              <td>
                <div className="row-actions" style={{ opacity: 1 }}>
                  {alert.status === 'active' && <button className="row-action-btn" onClick={() => acknowledgeAlert(alert.id)} title="Acknowledge"><Eye size={13} /></button>}
                  {(alert.status === 'active' || alert.status === 'acknowledged') && <button className="row-action-btn" onClick={() => resolveAlert(alert.id)} title="Resolve"><Check size={13} /></button>}
                  <button className="row-action-btn danger" onClick={() => { if (confirm('Delete?')) deleteAlert(alert.id); }}><Trash2 size={13} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="expense-form-overlay">
          <div className="expense-form-modal" style={{ maxWidth: 460 }}>
            <div className="expense-form-header"><h3>New Alert</h3><button className="expense-form-close" onClick={() => setShowForm(false)}><X size={18} /></button></div>
            <div className="expense-form-body">
              <div className="expense-form-field"><label>Title *</label><input value={fTitle} onChange={(e) => setFTitle(e.target.value)} placeholder="Alert title" autoFocus /></div>
              <div className="expense-form-row">
                <div className="expense-form-field" style={{ flex: 1 }}>
                  <label>Severity</label>
                  <select value={fSeverity} onChange={(e) => setFSeverity(e.target.value)}>
                    {ALERT_SEVERITIES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                </div>
                <div className="expense-form-field" style={{ flex: 1 }}><label>Source</label><input value={fSource} onChange={(e) => setFSource(e.target.value)} placeholder="e.g., Server, API" /></div>
              </div>
              <div className="expense-form-field"><label>Description</label><textarea value={fDesc} onChange={(e) => setFDesc(e.target.value)} placeholder="Details..." rows={3} /></div>
            </div>
            <div className="expense-form-footer">
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAdd} disabled={!fTitle.trim()} style={{ background: 'var(--mod-tech)', opacity: fTitle.trim() ? 1 : 0.4 }}>Create Alert</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
