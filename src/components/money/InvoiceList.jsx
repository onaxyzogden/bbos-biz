import { useState, useMemo } from 'react';
import { Plus, FileSpreadsheet, Pencil, Trash2, Check, Send, Eye } from 'lucide-react';
import { useMoneyStore, formatCurrency, getInvoiceTotal } from '../../store/money-store';
import { genLineItemId } from '../../services/id';
import './InvoiceList.css';

const STATUS_FILTERS = ['all', 'draft', 'sent', 'paid', 'overdue'];

function InvoiceForm({ invoice, onClose }) {
  const addInvoice = useMoneyStore((s) => s.addInvoice);
  const updateInvoice = useMoneyStore((s) => s.updateInvoice);
  const isEdit = !!invoice;

  const [clientName, setClientName] = useState(invoice?.clientName || '');
  const [clientEmail, setClientEmail] = useState(invoice?.clientEmail || '');
  const [date, setDate] = useState(invoice?.date || new Date().toISOString().slice(0, 10));
  const [dueDate, setDueDate] = useState(invoice?.dueDate || '');
  const [notes, setNotes] = useState(invoice?.notes || '');
  const [lineItems, setLineItems] = useState(
    invoice?.lineItems?.length > 0
      ? invoice.lineItems
      : [{ id: genLineItemId(), description: '', quantity: 1, unitPrice: 0 }]
  );

  const total = lineItems.reduce((sum, li) => sum + (li.quantity || 0) * (li.unitPrice || 0), 0);

  const addLine = () => setLineItems([...lineItems, { id: genLineItemId(), description: '', quantity: 1, unitPrice: 0 }]);
  const removeLine = (id) => { if (lineItems.length > 1) setLineItems(lineItems.filter((li) => li.id !== id)); };
  const updateLine = (id, field, value) => setLineItems(lineItems.map((li) => li.id === id ? { ...li, [field]: value } : li));

  const handleSave = (status) => {
    const data = { clientName, clientEmail, date, dueDate, lineItems, notes };
    if (isEdit) {
      updateInvoice(invoice.id, { ...data, status: status || invoice.status });
    } else {
      const inv = addInvoice(data);
      if (status === 'sent') {
        useMoneyStore.getState().setInvoiceStatus(inv.id, 'sent');
      }
    }
    onClose();
  };

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-5)' }}>
        <h3>{isEdit ? 'Edit Invoice' : 'New Invoice'}</h3>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
        <div className="expense-form-field"><label>Client Name *</label><input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Client name" /></div>
        <div className="expense-form-field"><label>Client Email</label><input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="client@email.com" /></div>
        <div className="expense-form-field"><label>Invoice Date</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div>
        <div className="expense-form-field"><label>Due Date *</label><input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /></div>
      </div>

      <h4 style={{ marginBottom: 'var(--space-3)', fontSize: '0.9rem' }}>Line Items</h4>
      <table className="money-table" style={{ marginBottom: 'var(--space-3)' }}>
        <thead><tr><th>Description</th><th style={{ width: 80 }}>Qty</th><th style={{ width: 120 }}>Unit Price</th><th style={{ width: 100, textAlign: 'right' }}>Total</th><th style={{ width: 40 }} /></tr></thead>
        <tbody>
          {lineItems.map((li) => (
            <tr key={li.id}>
              <td><input value={li.description} onChange={(e) => updateLine(li.id, 'description', e.target.value)} placeholder="Item description" style={{ width: '100%', border: 'none', background: 'transparent', padding: 'var(--space-1)' }} /></td>
              <td><input type="number" min="1" value={li.quantity} onChange={(e) => updateLine(li.id, 'quantity', Number(e.target.value))} style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }} /></td>
              <td><input type="number" step="0.01" min="0" value={li.unitPrice} onChange={(e) => updateLine(li.id, 'unitPrice', Number(e.target.value))} style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'right' }} /></td>
              <td style={{ textAlign: 'right' }} className="amount">{formatCurrency((li.quantity || 0) * (li.unitPrice || 0))}</td>
              <td><button className="row-action-btn danger" onClick={() => removeLine(li.id)}>×</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-ghost" onClick={addLine} style={{ fontSize: '0.8rem', marginBottom: 'var(--space-4)' }}><Plus size={14} /> Add Line Item</button>

      <div style={{ textAlign: 'right', marginBottom: 'var(--space-4)', fontSize: '1.2rem', fontWeight: 700 }}>
        Total: <span className="amount">{formatCurrency(total)}</span>
      </div>

      <div className="expense-form-field" style={{ marginBottom: 'var(--space-5)' }}><label>Notes</label><textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional notes..." rows={2} /></div>

      <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }}>
        <button className="btn btn-secondary" onClick={() => handleSave('draft')} disabled={!clientName || !dueDate}>Save as Draft</button>
        <button className="btn btn-primary" onClick={() => handleSave('sent')} disabled={!clientName || !dueDate} style={{ background: 'var(--mod-money)' }}>
          <Send size={14} /> Save & Send
        </button>
      </div>
    </div>
  );
}

export default function InvoiceList() {
  const invoices = useMoneyStore((s) => s.invoices);
  const deleteInvoice = useMoneyStore((s) => s.deleteInvoice);
  const setInvoiceStatus = useMoneyStore((s) => s.setInvoiceStatus);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);

  const filtered = useMemo(() => {
    const now = new Date().toISOString().slice(0, 10);
    return invoices
      .map((inv) => ({
        ...inv,
        displayStatus: inv.status === 'sent' && inv.dueDate < now ? 'overdue' : inv.status,
      }))
      .filter((inv) => statusFilter === 'all' || inv.displayStatus === statusFilter)
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [invoices, statusFilter]);

  if (showForm || editingInvoice) {
    return <InvoiceForm invoice={editingInvoice} onClose={() => { setShowForm(false); setEditingInvoice(null); }} />;
  }

  if (invoices.length === 0) {
    return (
      <div className="money-empty">
        <FileSpreadsheet size={40} className="money-empty-icon" />
        <h4>No invoices yet</h4>
        <p>Create invoices to track income from clients.</p>
        <button className="btn btn-primary" onClick={() => setShowForm(true)} style={{ background: 'var(--mod-money)' }}>
          <Plus size={16} /> Create Invoice
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
          {STATUS_FILTERS.map((sf) => (
            <button key={sf} className={`cat-filter-pill ${statusFilter === sf ? 'active' : ''}`}
              onClick={() => setStatusFilter(sf)} style={{ textTransform: 'capitalize' }}>{sf}</button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)} style={{ background: 'var(--mod-money)' }}>
          <Plus size={16} /> New Invoice
        </button>
      </div>

      <table className="money-table">
        <thead><tr><th>Invoice #</th><th>Client</th><th>Date</th><th>Due Date</th><th style={{ textAlign: 'right' }}>Total</th><th>Status</th><th style={{ width: 100 }} /></tr></thead>
        <tbody>
          {filtered.map((inv) => (
            <tr key={inv.id}>
              <td style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 500 }}>{inv.number}</td>
              <td>{inv.clientName || '—'}</td>
              <td>{new Date(inv.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}</td>
              <td>{inv.dueDate ? new Date(inv.dueDate).toLocaleDateString('en', { month: 'short', day: 'numeric' }) : '—'}</td>
              <td style={{ textAlign: 'right' }} className="amount">{formatCurrency(getInvoiceTotal(inv))}</td>
              <td><span className={`status-badge status-${inv.displayStatus}`}>{inv.displayStatus}</span></td>
              <td>
                <div className="row-actions" style={{ opacity: 1 }}>
                  {inv.status === 'draft' && <button className="row-action-btn" onClick={() => setInvoiceStatus(inv.id, 'sent')} title="Mark Sent"><Send size={14} /></button>}
                  {(inv.status === 'sent' || inv.displayStatus === 'overdue') && <button className="row-action-btn" onClick={() => setInvoiceStatus(inv.id, 'paid')} title="Mark Paid"><Check size={14} /></button>}
                  <button className="row-action-btn" onClick={() => setEditingInvoice(inv)} title="Edit"><Pencil size={14} /></button>
                  <button className="row-action-btn danger" onClick={() => { if (confirm('Delete this invoice?')) deleteInvoice(inv.id); }} title="Delete"><Trash2 size={14} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
