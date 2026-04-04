import { useState } from 'react';
import { X } from 'lucide-react';
import { useMoneyStore } from '../../store/money-store';
import { PAYMENT_METHODS } from '../../data/money-categories';
import './ExpenseForm.css';

export default function ExpenseForm({ expense, onClose }) {
  const categories = useMoneyStore((s) => s.categories);
  const addExpense = useMoneyStore((s) => s.addExpense);
  const updateExpense = useMoneyStore((s) => s.updateExpense);

  const isEdit = !!expense;
  const [amount, setAmount] = useState(expense?.amount || '');
  const [categoryId, setCategoryId] = useState(expense?.categoryId || '');
  const [date, setDate] = useState(expense?.date || new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState(expense?.description || '');
  const [payee, setPayee] = useState(expense?.payee || '');
  const [paymentMethod, setPaymentMethod] = useState(expense?.paymentMethod || 'card');
  const [receiptNotes, setReceiptNotes] = useState(expense?.receiptNotes || '');

  const canSave = Number(amount) > 0 && categoryId;

  const handleSave = () => {
    if (!canSave) return;
    const data = { amount: Number(amount), categoryId, date, description, payee, paymentMethod, receiptNotes };
    if (isEdit) updateExpense(expense.id, data);
    else addExpense(data);
    onClose();
  };

  return (
    <div className="expense-form-overlay">
      <div className="expense-form-modal">
        <div className="expense-form-header">
          <h3>{isEdit ? 'Edit Expense' : 'New Expense'}</h3>
          <button className="expense-form-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="expense-form-body">
          <div className="expense-form-row">
            <div className="expense-form-field" style={{ flex: 1 }}>
              <label>Amount *</label>
              <input type="number" step="0.01" min="0" value={amount} onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00" autoFocus />
            </div>
            <div className="expense-form-field" style={{ flex: 1 }}>
              <label>Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>

          <div className="expense-form-field">
            <label>Category *</label>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              <option value="">Select category...</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="expense-form-field">
            <label>Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="What was this expense for?" />
          </div>

          <div className="expense-form-row">
            <div className="expense-form-field" style={{ flex: 1 }}>
              <label>Payee / Vendor</label>
              <input type="text" value={payee} onChange={(e) => setPayee(e.target.value)}
                placeholder="Who was paid?" />
            </div>
            <div className="expense-form-field" style={{ flex: 1 }}>
              <label>Payment Method</label>
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                {PAYMENT_METHODS.map((pm) => (
                  <option key={pm.id} value={pm.id}>{pm.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="expense-form-field">
            <label>Receipt Notes</label>
            <textarea value={receiptNotes} onChange={(e) => setReceiptNotes(e.target.value)}
              placeholder="Any notes about the receipt..." rows={3} />
          </div>
        </div>

        <div className="expense-form-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={!canSave}
            style={{ opacity: canSave ? 1 : 0.4, background: 'var(--mod-money)' }}>
            {isEdit ? 'Save Changes' : 'Add Expense'}
          </button>
        </div>
      </div>
    </div>
  );
}
