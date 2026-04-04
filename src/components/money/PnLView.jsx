import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMoneyStore, formatCurrency, getInvoiceTotal } from '../../store/money-store';
import './PnLView.css';

export default function PnLView() {
  const expenses = useMoneyStore((s) => s.expenses);
  const invoices = useMoneyStore((s) => s.invoices);
  const categories = useMoneyStore((s) => s.categories);

  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [showYTD, setShowYTD] = useState(false);

  const catMap = useMemo(() => { const m = {}; categories.forEach((c) => { m[c.id] = c; }); return m; }, [categories]);

  const monthLabel = new Date(year, month - 1).toLocaleDateString('en', { month: 'long', year: 'numeric' });
  const prev = () => { if (month === 1) { setMonth(12); setYear(year - 1); } else setMonth(month - 1); };
  const next = () => { if (month === 12) { setMonth(1); setYear(year + 1); } else setMonth(month + 1); };

  // Single month P&L
  const monthPnL = useMemo(() => {
    const prefix = `${year}-${String(month).padStart(2, '0')}`;
    const monthExp = expenses.filter((e) => e.date?.startsWith(prefix));
    const paidInv = invoices.filter((inv) => inv.status === 'paid' && inv.paidAt?.startsWith(prefix));
    const income = paidInv.reduce((s, inv) => s + getInvoiceTotal(inv), 0);

    // Group expenses by category
    const byCat = {};
    monthExp.forEach((e) => {
      const cid = e.categoryId || 'other';
      byCat[cid] = (byCat[cid] || 0) + (e.amount || 0);
    });
    const expenseLines = Object.entries(byCat).map(([cid, total]) => ({
      name: catMap[cid]?.name || 'Other', total,
    })).sort((a, b) => b.total - a.total);
    const totalExpenses = monthExp.reduce((s, e) => s + (e.amount || 0), 0);

    return { income, expenseLines, totalExpenses, profit: income - totalExpenses };
  }, [expenses, invoices, year, month, catMap]);

  // YTD data
  const ytdData = useMemo(() => {
    if (!showYTD) return null;
    const months = [];
    let ytdIncome = 0, ytdExpenses = 0;
    for (let m = 1; m <= month; m++) {
      const prefix = `${year}-${String(m).padStart(2, '0')}`;
      const mExp = expenses.filter((e) => e.date?.startsWith(prefix)).reduce((s, e) => s + (e.amount || 0), 0);
      const mInc = invoices.filter((inv) => inv.status === 'paid' && inv.paidAt?.startsWith(prefix)).reduce((s, inv) => s + getInvoiceTotal(inv), 0);
      ytdIncome += mInc;
      ytdExpenses += mExp;
      months.push({
        label: new Date(year, m - 1).toLocaleDateString('en', { month: 'short' }),
        income: mInc, expenses: mExp, net: mInc - mExp,
      });
    }
    return { months, ytdIncome, ytdExpenses, ytdProfit: ytdIncome - ytdExpenses };
  }, [showYTD, expenses, invoices, year, month]);

  return (
    <div>
      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <div className="report-month-nav" style={{ margin: 0 }}>
          <button className="btn btn-ghost" onClick={prev}><ChevronLeft size={16} /></button>
          <span className="report-month-label">{monthLabel}</span>
          <button className="btn btn-ghost" onClick={next}><ChevronRight size={16} /></button>
        </div>
        <button
          className={`btn ${showYTD ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setShowYTD(!showYTD)}
          style={showYTD ? { background: 'var(--mod-money)' } : undefined}
        >
          Year to Date
        </button>
      </div>

      {/* P&L Statement */}
      <div className="pnl-statement">
        <h3 className="pnl-title">Profit & Loss Statement</h3>
        <p className="pnl-period">{showYTD ? `January — ${monthLabel}` : monthLabel}</p>

        {/* Income */}
        <div className="pnl-section">
          <div className="pnl-section-header">INCOME</div>
          <div className="pnl-line">
            <span>Paid Invoices</span>
            <span className="amount">{formatCurrency(showYTD ? ytdData?.ytdIncome : monthPnL.income)}</span>
          </div>
          <div className="pnl-line pnl-total">
            <span>Total Income</span>
            <span className="amount amount-positive">{formatCurrency(showYTD ? ytdData?.ytdIncome : monthPnL.income)}</span>
          </div>
        </div>

        {/* Expenses */}
        <div className="pnl-section">
          <div className="pnl-section-header">EXPENSES</div>
          {!showYTD && monthPnL.expenseLines.map((line, i) => (
            <div key={i} className="pnl-line">
              <span>{line.name}</span>
              <span className="amount">{formatCurrency(line.total)}</span>
            </div>
          ))}
          {!showYTD && monthPnL.expenseLines.length === 0 && (
            <div className="pnl-line" style={{ color: 'var(--text3)' }}>
              <span>No expenses</span><span className="amount">$0.00</span>
            </div>
          )}
          {showYTD && (
            <div className="pnl-line">
              <span>All Expenses (YTD)</span>
              <span className="amount">{formatCurrency(ytdData?.ytdExpenses)}</span>
            </div>
          )}
          <div className="pnl-line pnl-total">
            <span>Total Expenses</span>
            <span className="amount">{formatCurrency(showYTD ? ytdData?.ytdExpenses : monthPnL.totalExpenses)}</span>
          </div>
        </div>

        {/* Net */}
        <div className="pnl-net">
          <span>NET {(showYTD ? ytdData?.ytdProfit : monthPnL.profit) >= 0 ? 'PROFIT' : 'LOSS'}</span>
          <span className={`amount ${(showYTD ? ytdData?.ytdProfit : monthPnL.profit) >= 0 ? 'amount-positive' : 'amount-negative'}`}>
            {formatCurrency(showYTD ? ytdData?.ytdProfit : monthPnL.profit)}
          </span>
        </div>
      </div>

      {/* YTD Monthly Breakdown */}
      {showYTD && ytdData && (
        <div style={{ marginTop: 'var(--space-5)' }}>
          <h4 style={{ marginBottom: 'var(--space-3)', fontSize: '0.9rem' }}>Monthly Breakdown</h4>
          <table className="money-table">
            <thead>
              <tr><th>Month</th><th style={{ textAlign: 'right' }}>Income</th><th style={{ textAlign: 'right' }}>Expenses</th><th style={{ textAlign: 'right' }}>Net</th></tr>
            </thead>
            <tbody>
              {ytdData.months.map((m, i) => (
                <tr key={i}>
                  <td>{m.label}</td>
                  <td style={{ textAlign: 'right' }} className="amount amount-positive">{formatCurrency(m.income)}</td>
                  <td style={{ textAlign: 'right' }} className="amount">{formatCurrency(m.expenses)}</td>
                  <td style={{ textAlign: 'right' }} className={`amount ${m.net >= 0 ? 'amount-positive' : 'amount-negative'}`}>{formatCurrency(m.net)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ fontWeight: 700 }}>
                <td>YTD Total</td>
                <td style={{ textAlign: 'right' }} className="amount amount-positive">{formatCurrency(ytdData.ytdIncome)}</td>
                <td style={{ textAlign: 'right' }} className="amount">{formatCurrency(ytdData.ytdExpenses)}</td>
                <td style={{ textAlign: 'right' }} className={`amount ${ytdData.ytdProfit >= 0 ? 'amount-positive' : 'amount-negative'}`}>{formatCurrency(ytdData.ytdProfit)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}
