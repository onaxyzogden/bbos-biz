import { useState, useMemo } from 'react';
import { Plus, Gauge, Trash2, X } from 'lucide-react';
import { useTechStore } from '../../store/tech-store';

const METRICS = [
  { id: 'page_load', label: 'Page Load Time', unit: 'ms' },
  { id: 'ttfb', label: 'Time to First Byte', unit: 'ms' },
  { id: 'api_latency', label: 'API Latency', unit: 'ms' },
  { id: 'error_rate', label: 'Error Rate', unit: '%' },
  { id: 'cpu_usage', label: 'CPU Usage', unit: '%' },
  { id: 'memory_usage', label: 'Memory Usage', unit: '%' },
  { id: 'custom', label: 'Custom Metric', unit: '' },
];

export default function PerfTracker() {
  const perfEntries = useTechStore((s) => s.perfEntries);
  const addPerfEntry = useTechStore((s) => s.addPerfEntry);
  const deletePerfEntry = useTechStore((s) => s.deletePerfEntry);
  const [showForm, setShowForm] = useState(false);
  const [fMetric, setFMetric] = useState('page_load');
  const [fValue, setFValue] = useState('');
  const [fSource, setFSource] = useState('');
  const [fDate, setFDate] = useState(new Date().toISOString().slice(0, 10));

  const metricMap = useMemo(() => { const m = {}; METRICS.forEach((met) => { m[met.id] = met; }); return m; }, []);

  // Group by metric for summary cards
  const summaries = useMemo(() => {
    const groups = {};
    perfEntries.forEach((e) => {
      if (!groups[e.metric]) groups[e.metric] = [];
      groups[e.metric].push(e);
    });
    return Object.entries(groups).map(([metric, entries]) => {
      const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
      const latest = sorted[0];
      const avg = entries.reduce((s, e) => s + e.value, 0) / entries.length;
      const met = metricMap[metric];
      return { metric, label: met?.label || metric, unit: latest?.unit || met?.unit || '', latest: latest?.value, avg, count: entries.length };
    });
  }, [perfEntries, metricMap]);

  const handleAdd = () => {
    if (!fValue) return;
    const met = metricMap[fMetric];
    addPerfEntry({ metric: fMetric, value: Number(fValue), unit: met?.unit || '', source: fSource, date: fDate });
    setShowForm(false); setFValue(''); setFSource('');
  };

  if (perfEntries.length === 0 && !showForm) {
    return (
      <div className="money-empty">
        <Gauge size={40} className="money-empty-icon" />
        <h4>No performance data</h4>
        <p>Track key metrics like page load times, API latency, and error rates.</p>
        <button className="btn btn-primary" onClick={() => setShowForm(true)} style={{ background: 'var(--mod-tech)' }}>
          <Plus size={16} /> Log Metric
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-4)' }}>
        <button className="btn btn-primary" onClick={() => setShowForm(true)} style={{ background: 'var(--mod-tech)' }}>
          <Plus size={16} /> Log Metric
        </button>
      </div>

      {/* Summary cards */}
      {summaries.length > 0 && (
        <div className="report-summary-cards" style={{ marginBottom: 'var(--space-5)' }}>
          {summaries.map((s) => (
            <div key={s.metric} className="report-card">
              <p className="report-card-label">{s.label}</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{s.latest?.toFixed(1)}<span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--text3)' }}>{s.unit}</span></p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text3)' }}>Avg: {s.avg.toFixed(1)}{s.unit} · {s.count} entries</p>
            </div>
          ))}
        </div>
      )}

      {/* Entries table */}
      <table className="money-table">
        <thead><tr><th>Date</th><th>Metric</th><th style={{ textAlign: 'right' }}>Value</th><th>Source</th><th style={{ width: 40 }} /></tr></thead>
        <tbody>
          {[...perfEntries].sort((a, b) => b.date.localeCompare(a.date)).map((e) => (
            <tr key={e.id}>
              <td>{new Date(e.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}</td>
              <td>{metricMap[e.metric]?.label || e.metric}</td>
              <td style={{ textAlign: 'right' }} className="amount">{e.value}{e.unit}</td>
              <td style={{ color: 'var(--text2)' }}>{e.source || '—'}</td>
              <td><button className="row-action-btn danger" onClick={() => deletePerfEntry(e.id)}><Trash2 size={13} /></button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="expense-form-overlay">
          <div className="expense-form-modal" style={{ maxWidth: 420 }}>
            <div className="expense-form-header"><h3>Log Metric</h3><button className="expense-form-close" onClick={() => setShowForm(false)}><X size={18} /></button></div>
            <div className="expense-form-body">
              <div className="expense-form-field">
                <label>Metric</label>
                <select value={fMetric} onChange={(e) => setFMetric(e.target.value)}>
                  {METRICS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
                </select>
              </div>
              <div className="expense-form-row">
                <div className="expense-form-field" style={{ flex: 1 }}><label>Value *</label><input type="number" step="0.1" value={fValue} onChange={(e) => setFValue(e.target.value)} placeholder="0" autoFocus /></div>
                <div className="expense-form-field" style={{ flex: 1 }}><label>Date</label><input type="date" value={fDate} onChange={(e) => setFDate(e.target.value)} /></div>
              </div>
              <div className="expense-form-field"><label>Source</label><input value={fSource} onChange={(e) => setFSource(e.target.value)} placeholder="e.g., Homepage, API, Server" /></div>
            </div>
            <div className="expense-form-footer">
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAdd} disabled={!fValue} style={{ background: 'var(--mod-tech)', opacity: fValue ? 1 : 0.4 }}>Log Entry</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
