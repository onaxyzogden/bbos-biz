import { useState, useMemo } from 'react';
import { Plus, Receipt, Pencil, Trash2, Settings2 } from 'lucide-react';
import { useMoneyStore, formatCurrency } from '../../store/money-store';
import ExpenseForm from './ExpenseForm';
import './ExpenseList.css';

export default function ExpenseList() {
  const expenses = useMoneyStore((s) => s.expenses);
  const categories = useMoneyStore((s) => s.categories);
  const deleteExpense = useMoneyStore((s) => s.deleteExpense);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [sortKey, setSortKey] = useState('date');
  const [sortDir, setSortDir] = useState('desc');
  const [filterCat, setFilterCat] = useState(null);

  const catMap = useMemo(() => {
    const m = {};
    categories.forEach((c) => { m[c.id] = c; });
    return m;
  }, [categories]);

  const filtered = useMemo(() => {
    let list = [...expenses];
    if (filterCat) list = list.filter((e) => e.categoryId === filterCat);
    list.sort((a, b) => {
      let av = a[sortKey], bv = b[sortKey];
      if (sortKey === 'amount') { av = Number(av); bv = Number(bv); }
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return list;
  }, [expenses, filterCat, sortKey, sortDir]);

  const monthlyTotal = useMemo(() =>
    filtered.reduce((sum, e) => sum + (e.amount || 0), 0),
  [filtered]);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const handleEdit = (expense) => { setEditingExpense(expense); setShowForm(true); };
  const handleDelete = (id) => { if (confirm('Delete this expense?')) deleteExpense(id); };
  const closeForm = () => { setShowForm(false); setEditingExpense(null); };

  if (expenses.length === 0 && !showForm) {
    return (
      <div className="money-empty">
        <Receipt size={40} className="money-empty-icon" />
        <h4>No expenses yet</h4>
        <p>Track your business expenses to understand where money goes.</p>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <Plus size={16} /> Add First Expense
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <button
            className={`cat-filter-pill ${!filterCat ? 'active' : ''}`}
            onClick={() => setFilterCat(null)}
          >All</button>
          {categories.map((c) => (
            <button
              key={c.id}
              className={`cat-filter-pill ${filterCat === c.id ? 'active' : ''}`}
              onClick={() => setFilterCat(filterCat === c.id ? null : c.id)}
              style={filterCat === c.id ? { background: c.color + '18', color: c.color, borderColor: c.color + '40' } : undefined}
            >
              <span className="cat-dot" style={{ background: c.color }} />
              {c.name}
            </button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <Plus size={16} /> Add Expense
        </button>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table className="money-table">
          <thead>
            <tr>
              <th onClick={() => toggleSort('date')}>Date {sortKey === 'date' ? (sortDir === 'asc' ? '↑' : '↓') : ''}</th>
              <th onClick={() => toggleSort('description')}>Description</th>
              <th>Category</th>
              <th onClick={() => toggleSort('payee')}>Payee</th>
              <th onClick={() => toggleSort('amount')} style={{ textAlign: 'right' }}>Amount</th>
              <th style={{ width: 60 }} />
            </tr>
          </thead>
          <tbody>
            {filtered.map((exp) => {
              const cat = catMap[exp.categoryId];
              return (
                <tr key={exp.id}>
                  <td>{new Date(exp.date).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td style={{ maxWidth: 200 }} className="truncate">{exp.description || '—'}</td>
                  <td>
                    {cat ? (
                      <span className="cat-pill" style={{ background: cat.color + '15', color: cat.color }}>
                        <span className="cat-dot" style={{ background: cat.color }} />
                        {cat.name}
                      </span>
                    ) : '—'}
                  </td>
                  <td>{exp.payee || '—'}</td>
                  <td style={{ textAlign: 'right' }}>
                    <span className="amount">{formatCurrency(exp.amount)}</span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button className="row-action-btn" onClick={() => handleEdit(exp)} title="Edit">
                        <Pencil size={14} />
                      </button>
                      <button className="row-action-btn danger" onClick={() => handleDelete(exp.id)} title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text2)' }}>
                Total ({filtered.length} expense{filtered.length !== 1 ? 's' : ''})
              </td>
              <td style={{ textAlign: 'right' }}>
                <span className="amount" style={{ fontWeight: 700 }}>{formatCurrency(monthlyTotal)}</span>
              </td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Form modal */}
      {showForm && (
        <ExpenseForm expense={editingExpense} onClose={closeForm} />
      )}
    </div>
  );
}
