import { useState } from 'react';
import {
  TrendingUp, TrendingDown, CreditCard, Target, PiggyBank,
  ArrowUpRight, ArrowDownRight, Plus, MoreHorizontal, ChevronDown,
} from 'lucide-react';

/* ─── mock data ─── */
const BALANCE_DATA = [
  { day: 'Sun', savings: 3, income: 8, expenses: 5 },
  { day: 'Mon', savings: 5, income: 12, expenses: 7 },
  { day: 'Tue', savings: 4, income: 10, expenses: 6 },
  { day: 'Wed', savings: 6, income: 18, expenses: 11 },
  { day: 'Thu', savings: 8, income: 14, expenses: 9 },
  { day: 'Fri', savings: 3, income: 9, expenses: 6 },
  { day: 'Sat', savings: 2, income: 7, expenses: 4 },
];

const COST_CATEGORIES = [
  { name: 'Housing', pct: 18, color: '#f59e0b' },
  { name: 'Debt payments', pct: 7, color: '#f97316' },
  { name: 'Food', pct: 6, color: '#fbbf24' },
  { name: 'Transportation', pct: 9, color: '#fcd34d' },
  { name: 'Healthcare', pct: 10, color: '#22c55e' },
  { name: 'Investments', pct: 17, color: '#4ab8a8' },
  { name: 'Other', pct: 33, color: '#94a3b8' },
];

const GOALS = [
  { name: 'Reserve', current: 7000, target: 10000, period: 'This year', timeLeft: 'Left to save 4 months' },
  { name: 'Travel', current: 2500, target: 4000, period: 'Long term', timeLeft: 'Left to save 3 months' },
  { name: 'Car', current: 1600, target: 20000, period: '', timeLeft: 'Left to save 3 years 6 months' },
  { name: 'Real estate', current: 8300, target: 70000, period: '', timeLeft: 'Left to save 5 years 8 months' },
];

const TRANSACTIONS = [
  { name: 'Dividend payout', date: '25 Feb 2025', amount: 1100, type: 'credit', status: 'Completed', color: '#22c55e' },
  { name: 'Corporate subscriptions', date: '25 Feb 2025', amount: 6400, type: 'debit', status: 'Declined', color: '#ef4444' },
  { name: 'Investment in ETF', date: '21 Feb 2025', amount: 900, type: 'debit', status: 'Completed', color: '#8b5cf6' },
  { name: 'Consulting services', date: '21 Feb 2025', amount: 2100, type: 'debit', status: 'Completed', color: '#3b82f6' },
  { name: 'Equipment purchase', date: '20 Feb 2025', amount: 1700, type: 'debit', status: 'Completed', color: '#f97316' },
  { name: 'Client payment', date: '15 Feb 2025', amount: 600, type: 'credit', status: 'Completed', color: '#22c55e' },
];

const QUICK_CONTACTS = [
  { name: 'Davis', bg: '#f59e0b' },
  { name: 'Elli', bg: '#8b5cf6' },
  { name: 'Leo', bg: '#3b82f6' },
  { name: 'Amanda', bg: '#22c55e' },
  { name: 'Ann', bg: '#ec4899' },
  { name: 'Sin', bg: '#f97316' },
];

/* ─── small helpers ─── */
function fmt(n) { return '$' + n.toLocaleString(); }
function pct(current, target) { return Math.min(100, Math.round((current / target) * 100)); }

/* ─── bar chart (pure CSS) ─── */
function BarChart({ data }) {
  const max = Math.max(...data.map((d) => d.income));
  return (
    <div className="md-chart">
      <div className="md-chart-bars">
        {data.map((d) => (
          <div key={d.day} className="md-chart-col">
            <div className="md-chart-stack" style={{ height: '100%' }}>
              <div className="md-bar md-bar-savings" style={{ height: `${(d.savings / max) * 100}%` }} />
              <div className="md-bar md-bar-income" style={{ height: `${(d.income / max) * 100}%` }} />
              <div className="md-bar md-bar-expenses" style={{ height: `${(d.expenses / max) * 100}%` }} />
            </div>
            <span className="md-chart-label">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MoneyDashboard() {
  const [chartPeriod] = useState('7d');

  return (
    <div className="money-dash">
      {/* ── Row 1: Balance overview + Summary cards + My Card ── */}
      <div className="md-row md-row-top">
        {/* Balance overview */}
        <div className="md-card md-card-balance">
          <div className="md-card-head">
            <div>
              <h2 className="md-big-number">$12,450</h2>
              <span className="md-label">Balance overview</span>
            </div>
            <div className="md-legend">
              <span className="md-legend-dot md-dot-savings" /> Savings
              <span className="md-legend-dot md-dot-income" /> Income
              <span className="md-legend-dot md-dot-expenses" /> Expenses
            </div>
          </div>
          <BarChart data={BALANCE_DATA} />
        </div>

        {/* Summary cards */}
        <div className="md-summary-stack">
          <div className="md-card md-summary-item">
            <span className="md-label">Total income</span>
            <h3 className="md-mid-number">$15,000</h3>
            <span className="md-change md-up"><ArrowUpRight size={14} /> 5.1% from last month</span>
          </div>
          <div className="md-card md-summary-item">
            <span className="md-label">Total expenses</span>
            <h3 className="md-mid-number">$6,700</h3>
            <span className="md-change md-down"><ArrowDownRight size={14} /> 15.5% from last month</span>
          </div>
          <div className="md-card md-summary-item">
            <span className="md-label">Saved balance</span>
            <h3 className="md-mid-number">$8,300</h3>
            <span className="md-change md-up"><ArrowUpRight size={14} /> 20.7% from last month</span>
          </div>
        </div>

        {/* My Card */}
        <div className="md-card md-my-card">
          <div className="md-card-head">
            <div>
              <h4 style={{ fontWeight: 600 }}>My card</h4>
              <span className="md-label">Quick actions</span>
            </div>
            <button className="btn btn-ghost" style={{ fontSize: '0.8rem' }}>
              <Plus size={14} /> Add card
            </button>
          </div>
          <div className="md-visa-card">
            <span className="md-visa-label">Debit card</span>
            <span className="md-visa-brand">VISA</span>
            <div className="md-visa-num">**** **** **** 7890</div>
            <div className="md-visa-footer">
              <span>Michael Johnson</span>
              <span>03/30</span>
            </div>
          </div>
          <div className="md-quick-actions">
            <button className="md-action-btn"><PiggyBank size={18} /><span>Top up</span></button>
            <button className="md-action-btn"><ArrowUpRight size={18} /><span>Send</span></button>
            <button className="md-action-btn"><ArrowDownRight size={18} /><span>Request</span></button>
            <button className="md-action-btn"><MoreHorizontal size={18} /><span>More</span></button>
          </div>
          <div className="md-quick-pay">
            <h5>Quick payment</h5>
            <div className="md-contacts-row">
              {QUICK_CONTACTS.map((c) => (
                <div key={c.name} className="md-contact">
                  <div className="md-contact-avatar" style={{ background: c.bg }}>{c.name[0]}</div>
                  <span>{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 2: Spending limit + Budget tips ── */}
      <div className="md-row md-row-mid">
        <div className="md-card md-spending-limit">
          <div className="md-card-head">
            <div>
              <h4 style={{ fontWeight: 600 }}>Monthly spending limit</h4>
              <span className="md-label">Recipient accounts</span>
            </div>
          </div>
          <div className="md-limit-bar">
            <div className="md-limit-fill" style={{ width: '86%' }} />
          </div>
          <div className="md-limit-labels">
            <span>$8,600</span>
            <span>$10,000</span>
          </div>
        </div>
        <div className="md-card md-budget-tips">
          <h4 style={{ fontWeight: 600, marginBottom: 'var(--space-2)' }}>Optimize your budget with these quick tips</h4>
          <p className="md-label" style={{ marginBottom: 'var(--space-3)' }}>
            Start preparing for the 2025 tax season by saving 10-15% for deductions.
          </p>
          <span className="md-link">Read more <ArrowUpRight size={14} /></span>
        </div>
      </div>

      {/* ── Row 3: Cost analysis + Financial health + Goals + Transactions ── */}
      <div className="md-row md-row-bottom">
        {/* Cost analysis */}
        <div className="md-card md-cost">
          <div className="md-card-head">
            <div>
              <h4 style={{ fontWeight: 600 }}>Cost analysis</h4>
              <span className="md-label">Spending overview</span>
            </div>
          </div>
          <h3 className="md-mid-number" style={{ margin: 'var(--space-3) 0' }}>$8,450</h3>
          <div className="md-cost-bars">
            {COST_CATEGORIES.map((c) => (
              <div key={c.name} className="md-cost-row">
                <div className="md-cost-dot" style={{ background: c.color }} />
                <span className="md-cost-name">{c.name}</span>
                <span className="md-cost-pct">{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial health */}
        <div className="md-card md-health">
          <div className="md-card-head">
            <div>
              <h4 style={{ fontWeight: 600 }}>Financial health</h4>
              <span className="md-label">Current status</span>
            </div>
          </div>
          <h3 className="md-mid-number" style={{ margin: 'var(--space-3) 0' }}>$15,780</h3>
          <span className="md-change md-up"><ArrowUpRight size={14} /> 17.5% from last month</span>
          <div className="md-donut-wrap">
            <svg viewBox="0 0 120 120" className="md-donut">
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--bg3)" strokeWidth="14" />
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--mod-money)" strokeWidth="14"
                strokeDasharray={`${75 * 3.14} ${25 * 3.14}`}
                strokeDashoffset="0" strokeLinecap="round"
                transform="rotate(-90 60 60)" />
            </svg>
            <div className="md-donut-label">
              <strong>75%</strong>
              <span>Of monthly income saved</span>
            </div>
          </div>
          <p className="md-label" style={{ marginTop: 'var(--space-3)', fontSize: '0.75rem' }}>
            Based on aggregated transaction metrics over the past 30 days
          </p>
        </div>

        {/* Goal tracker */}
        <div className="md-card md-goals">
          <div className="md-card-head">
            <div>
              <h4 style={{ fontWeight: 600 }}>Goal tracker</h4>
            </div>
            <button className="btn btn-ghost" style={{ fontSize: '0.8rem' }}>
              <Plus size={14} /> Add goals
            </button>
          </div>
          <div className="md-goals-list">
            {GOALS.map((g, i) => (
              <div key={g.name}>
                {g.period && i === 0 && <span className="md-label" style={{ fontSize: '0.7rem', marginBottom: 4, display: 'block' }}>This year</span>}
                {i === 1 && <span className="md-label" style={{ fontSize: '0.7rem', marginTop: 'var(--space-3)', marginBottom: 4, display: 'block' }}>Long term</span>}
                <div className="md-goal-row">
                  <Target size={16} style={{ color: 'var(--mod-money)', flexShrink: 0 }} />
                  <div className="md-goal-info">
                    <div className="md-goal-top">
                      <span style={{ fontWeight: 500 }}>{g.name}</span>
                      <span className="md-label">{fmt(g.current)}/{fmt(g.target)}</span>
                    </div>
                    <div className="md-progress-bar">
                      <div className="md-progress-fill" style={{ width: `${pct(g.current, g.target)}%` }} />
                    </div>
                    <span className="md-label" style={{ fontSize: '0.7rem' }}>{g.timeLeft}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction history */}
        <div className="md-card md-transactions">
          <div className="md-card-head">
            <h4 style={{ fontWeight: 600 }}>Transaction history</h4>
          </div>
          <div className="md-tx-list">
            {TRANSACTIONS.map((t, i) => (
              <div key={i} className="md-tx-row">
                <div className="md-tx-icon" style={{ background: t.color + '18', color: t.color }}>
                  {t.type === 'credit' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                </div>
                <div className="md-tx-info">
                  <span className="md-tx-name">{t.name}</span>
                  <span className="md-label">{t.date}</span>
                </div>
                <div className="md-tx-amount-col">
                  <span className={`md-tx-amount ${t.type === 'credit' ? 'md-up' : ''}`}>
                    {t.type === 'credit' ? '+' : '-'} {fmt(t.amount)}
                  </span>
                  <span className={`md-tx-status ${t.status === 'Declined' ? 'md-declined' : ''}`}>{t.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
