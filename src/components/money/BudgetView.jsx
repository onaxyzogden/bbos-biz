import { useState, useMemo } from 'react';
import { Plus, PiggyBank, AlertTriangle, Pencil, Trash2 } from 'lucide-react';
import { useMoneyStore, formatCurrency } from '../../store/money-store';
import './BudgetView.css';

export default function BudgetView() {
  const budgets = useMoneyStore((s) => s.budgets);
  const expenses = useMoneyStore((s) => s.expenses);
  const categories = useMoneyStore((s) => s.categories);
  const addBudget = useMoneyStore((s) => s.addBudget);
  const updateBudget = useMoneyStore((s) => s.updateBudget);
  const deleteBudget = useMoneyStore((s) => s.deleteBudget);
  const [showAdd, setShowAdd] = useState(false);
  const [newCatId, setNewCatId] = useState('');
  const [newLimit, setNewLimit] = useState('');

  const currentMonth = new Date().toISOString().slice(0, 7);

  const catMap = useMemo(() => {
    const m = {};
    categories.forEach((c) => { m[c.id] = c; });
    return m;
  }, [categories]);

  const spentByCategory = useMemo(() => {
    const m = {};
    expenses.filter((e) => e.date?.startsWith(currentMonth)).forEach((e) => {
      m[e.categoryId] = (m[e.categoryId] || 0) + (e.amount || 0);
    });
    return m;
  }, [expenses, currentMonth]);

  const budgetedCatIds = useMemo(() => new Set(budgets.map((b) => b.categoryId)), [budgets]);
  const unbududgetedCats = useMemo(() => categories.filter((c) => !budgetedCatIds.has(c.id)), [categories, budgetedCatIds]);

  const handleAdd = () => {
    if (!newCatId || !newLimit) return;
    addBudget({ categoryId: newCatId, monthlyLimit: Number(newLimit) });
    setNewCatId(''); setNewLimit(''); setShowAdd(false);
  };

  if (budgets.length === 0 && !showAdd) {
    return (
      <div className="money-empty">
        <PiggyBank size={40} className="money-empty-icon" />
        <h4>No budgets set</h4>
        <p>Set spending limits per category to track where your money goes.</p>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)} style={{ background: 'var(--mod-money)' }}>
          <Plus size={16} /> Add Budget
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
        <p style={{ color: 'var(--text2)', fontSize: '0.875rem' }}>{new Date().toLocaleDateString('en', { month: 'long', year: 'numeric' })}</p>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)} style={{ background: 'var(--mod-money)' }}>
          <Plus size={16} /> Add Budget
        </button>
      </div>

      <div className="budget-grid">
        {budgets.map((b) => {
          const cat = catMap[b.categoryId];
          const spent = spentByCategory[b.categoryId] || 0;
          const pct = b.monthlyLimit > 0 ? (spent / b.monthlyLimit) * 100 : 0;
          const level = pct >= 100 ? 'over' : pct >= 75 ? 'warn' : 'ok';
          return (
            <div key={b.id} className={`budget-card budget-${level}`} style={{ borderTopColor: cat?.color || 'var(--border)' }}>
              <div className="budget-header">
                <span className="budget-cat-name">{cat?.name || 'Unknown'}</span>
                <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
                  <button className="row-action-btn" onClick={() => {
                    const newLim = prompt('New monthly limit:', b.monthlyLimit);
                    if (newLim) updateBudget(b.id, { monthlyLimit: Number(newLim) });
                  }}><Pencil size={12} /></button>
                  <button className="row-action-btn danger" onClick={() => { if (confirm('Delete this budget?')) deleteBudget(b.id); }}><Trash2 size={12} /></button>
                </div>
              </div>
              <div className="budget-bar-track">
                <div className="budget-bar-fill" style={{ width: `${Math.min(pct, 100)}%`, background: cat?.color || 'var(--primary)' }} />
              </div>
              <div className="budget-amounts">
                <span className="amount">{formatCurrency(spent)}</span>
                <span style={{ color: 'var(--text3)' }}>/ {formatCurrency(b.monthlyLimit)}</span>
              </div>
              {level === 'over' && (
                <div className="budget-over-warning">
                  <AlertTriangle size={12} /> Over by {formatCurrency(spent - b.monthlyLimit)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showAdd && (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', marginTop: 'var(--space-4)', maxWidth: 400 }}>
          <h4 style={{ marginBottom: 'var(--space-3)', fontSize: '0.95rem' }}>Add Budget</h4>
          <div className="expense-form-field" style={{ marginBottom: 'var(--space-3)' }}>
            <label>Category</label>
            <select value={newCatId} onChange={(e) => setNewCatId(e.target.value)}>
              <option value="">Select...</option>
              {unbududgetedCats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="expense-form-field" style={{ marginBottom: 'var(--space-4)' }}>
            <label>Monthly Limit</label>
            <input type="number" min="0" step="100" value={newLimit} onChange={(e) => setNewLimit(e.target.value)} placeholder="1000" />
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end' }}>
            <button className="btn btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleAdd} disabled={!newCatId || !newLimit} style={{ background: 'var(--mod-money)' }}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}
