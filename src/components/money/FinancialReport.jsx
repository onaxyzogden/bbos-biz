import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMoneyStore, formatCurrency, getInvoiceTotal } from '../../store/money-store';
import './FinancialReport.css';

export default function FinancialReport() {
  const expenses = useMoneyStore((s) => s.expenses);
  const invoices = useMoneyStore((s) => s.invoices);
  const categories = useMoneyStore((s) => s.categories);

  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);

  const prefix = `${year}-${String(month).padStart(2, '0')}`;
  const monthLabel = new Date(year, month - 1).toLocaleDateString('en', { month: 'long', year: 'numeric' });

  const prev = () => { if (month === 1) { setMonth(12); setYear(year - 1); } else setMonth(month - 1); };
  const next = () => { if (month === 12) { setMonth(1); setYear(year + 1); } else setMonth(month + 1); };

  const catMap = useMemo(() => { const m = {}; categories.forEach((c) => { m[c.id] = c; }); return m; }, [categories]);

  const breakdown = useMemo(() => {
    const monthExpenses = expenses.filter((e) => e.date?.startsWith(prefix));
    const byCat = {};
    monthExpenses.forEach((e) => {
      const cid = e.categoryId || 'uncategorized';
      byCat[cid] = (byCat[cid] || 0) + (e.amount || 0);
    });
    const entries = Object.entries(byCat).map(([cid, total]) => ({
      categoryId: cid, name: catMap[cid]?.name || 'Uncategorized', color: catMap[cid]?.color || '#6b7280', total,
    })).sort((a, b) => b.total - a.total);
    const maxTotal = Math.max(...entries.map((e) => e.total), 1);
    const totalExpenses = monthExpenses.reduce((s, e) => s + (e.amount || 0), 0);

    const paidInvoices = invoices.filter((inv) => inv.status === 'paid' && inv.paidAt?.startsWith(prefix));
    const totalIncome = paidInvoices.reduce((s, inv) => s + getInvoiceTotal(inv), 0);

    return { entries, maxTotal, totalExpenses, totalIncome, net: totalIncome - totalExpenses };
  }, [expenses, invoices, prefix, catMap]);

  return (
    <div>
      {/* Month selector */}
      <div className="report-month-nav">
        <button className="btn btn-ghost" onClick={prev}><ChevronLeft size={16} /></button>
        <span className="report-month-label">{monthLabel}</span>
        <button className="btn btn-ghost" onClick={next}><ChevronRight size={16} /></button>
      </div>

      {/* Expense breakdown */}
      <div className="report-section">
        <h4 className="report-section-title">Expense Breakdown</h4>
        {breakdown.entries.length === 0 ? (
          <p style={{ color: 'var(--text3)', fontSize: '0.875rem', padding: 'var(--space-4)' }}>No expenses this month.</p>
        ) : (
          <div className="report-bars">
            {breakdown.entries.map((entry) => (
              <div key={entry.categoryId} className="report-bar-row">
                <div className="report-bar-label">
                  <span className="cat-dot" style={{ background: entry.color }} />
                  <span>{entry.name}</span>
                </div>
                <div className="report-bar-track">
                  <div className="report-bar-fill" style={{ width: `${(entry.total / breakdown.maxTotal) * 100}%`, background: entry.color }} />
                </div>
                <span className="amount report-bar-amount">{formatCurrency(entry.total)}</span>
              </div>
            ))}
            <div className="report-bar-total">
              <span>Total Expenses</span>
              <span className="amount" style={{ fontWeight: 700 }}>{formatCurrency(breakdown.totalExpenses)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Income vs Expenses */}
      <div className="report-summary-cards">
        <div className="report-card">
          <p className="report-card-label">Total Income</p>
          <p className="amount amount-positive" style={{ fontSize: '1.5rem', fontWeight: 700 }}>{formatCurrency(breakdown.totalIncome)}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text3)' }}>From paid invoices</p>
        </div>
        <div className="report-card">
          <p className="report-card-label">Total Expenses</p>
          <p className="amount" style={{ fontSize: '1.5rem', fontWeight: 700 }}>{formatCurrency(breakdown.totalExpenses)}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text3)' }}>All categories</p>
        </div>
        <div className="report-card">
          <p className="report-card-label">Net</p>
          <p className={`amount ${breakdown.net >= 0 ? 'amount-positive' : 'amount-negative'}`} style={{ fontSize: '1.5rem', fontWeight: 700 }}>
            {formatCurrency(breakdown.net)}
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text3)' }}>{breakdown.net >= 0 ? 'Profit' : 'Loss'}</p>
        </div>
      </div>
    </div>
  );
}
