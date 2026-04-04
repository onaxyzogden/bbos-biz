import { useState } from 'react';
import { Plus, Activity, RefreshCw, Trash2, Globe, X } from 'lucide-react';
import { useTechStore, MONITOR_STATUSES } from '../../store/tech-store';
import './UptimeMonitor.css';

export default function UptimeMonitor() {
  const monitors = useTechStore((s) => s.monitors);
  const addMonitor = useTechStore((s) => s.addMonitor);
  const deleteMonitor = useTechStore((s) => s.deleteMonitor);
  const checkMonitor = useTechStore((s) => s.checkMonitor);
  const [showForm, setShowForm] = useState(false);
  const [fName, setFName] = useState('');
  const [fUrl, setFUrl] = useState('');

  const handleAdd = () => {
    if (!fName.trim() || !fUrl.trim()) return;
    const mon = addMonitor({ name: fName, url: fUrl });
    checkMonitor(mon.id);
    setShowForm(false); setFName(''); setFUrl('');
  };

  const checkAll = () => { monitors.forEach((m) => checkMonitor(m.id)); };

  if (monitors.length === 0 && !showForm) {
    return (
      <div className="money-empty">
        <Activity size={40} className="money-empty-icon" />
        <h4>No monitors set up</h4>
        <p>Add URLs to monitor their uptime and response time.</p>
        <button className="btn btn-primary" onClick={() => setShowForm(true)} style={{ background: 'var(--mod-tech)' }}>
          <Plus size={16} /> Add Monitor
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <button className="btn btn-ghost" onClick={checkAll} style={{ fontSize: '0.85rem' }}>
          <RefreshCw size={14} /> Check All
        </button>
        <button className="btn btn-primary" onClick={() => setShowForm(true)} style={{ background: 'var(--mod-tech)' }}>
          <Plus size={16} /> Add Monitor
        </button>
      </div>

      <div className="monitor-grid">
        {monitors.map((mon) => {
          const statusMeta = MONITOR_STATUSES.find((s) => s.id === mon.status);
          return (
            <div key={mon.id} className="monitor-card">
              <div className="monitor-card-header">
                <div className="monitor-status-dot" style={{ background: statusMeta?.color || '#6b7280' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="monitor-name">{mon.name}</div>
                  <div className="monitor-url">{mon.url}</div>
                </div>
                <span className={`status-badge status-${mon.status}`}>{statusMeta?.label || 'Unknown'}</span>
              </div>
              <div className="monitor-metrics">
                {mon.responseTime != null && (
                  <div className="monitor-metric">
                    <span className="monitor-metric-label">Response</span>
                    <span className="monitor-metric-value amount">{mon.responseTime}ms</span>
                  </div>
                )}
                <div className="monitor-metric">
                  <span className="monitor-metric-label">Last Check</span>
                  <span className="monitor-metric-value">{mon.lastChecked ? new Date(mon.lastChecked).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }) : '—'}</span>
                </div>
              </div>
              <div className="monitor-actions">
                <button className="row-action-btn" onClick={() => checkMonitor(mon.id)} title="Check now"><RefreshCw size={13} /></button>
                <button className="row-action-btn danger" onClick={() => { if (confirm('Delete?')) deleteMonitor(mon.id); }}><Trash2 size={13} /></button>
              </div>
            </div>
          );
        })}
      </div>

      {showForm && (
        <div className="expense-form-overlay">
          <div className="expense-form-modal" style={{ maxWidth: 420 }}>
            <div className="expense-form-header"><h3>Add Monitor</h3><button className="expense-form-close" onClick={() => setShowForm(false)}><X size={18} /></button></div>
            <div className="expense-form-body">
              <div className="expense-form-field"><label>Name *</label><input value={fName} onChange={(e) => setFName(e.target.value)} placeholder="My Website" autoFocus /></div>
              <div className="expense-form-field"><label>URL *</label><input value={fUrl} onChange={(e) => setFUrl(e.target.value)} placeholder="https://example.com" /></div>
            </div>
            <div className="expense-form-footer">
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAdd} disabled={!fName.trim() || !fUrl.trim()} style={{ background: 'var(--mod-tech)', opacity: fName.trim() && fUrl.trim() ? 1 : 0.4 }}>Add Monitor</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
