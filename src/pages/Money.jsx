import { useState } from 'react';
import { Wallet, Receipt, PiggyBank, BarChart3, FileSpreadsheet } from 'lucide-react';
import { useThresholdStore } from '../store/threshold-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import ExpenseList from '../components/money/ExpenseList';
import InvoiceList from '../components/money/InvoiceList';
import BudgetView from '../components/money/BudgetView';
import FinancialReport from '../components/money/FinancialReport';
import PnLView from '../components/money/PnLView';
import './Money.css';

const TABS = [
  { id: 'expenses', label: 'Expenses', icon: Receipt },
  { id: 'invoices', label: 'Invoices', icon: FileSpreadsheet },
  { id: 'budgets', label: 'Budgets', icon: PiggyBank },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'pnl', label: 'P&L', icon: Wallet },
];

export default function Money() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['money']);
  const [activeTab, setActiveTab] = useState('expenses');

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="money" />;
  }

  return (
    <div className="money">
      <div className="money-header">
        <h2>Money</h2>
      </div>

      <div className="money-tabs">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`money-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={15} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="money-content">
        {activeTab === 'expenses' && <ExpenseList />}
        {activeTab === 'invoices' && <InvoiceList />}
        {activeTab === 'budgets' && <BudgetView />}
        {activeTab === 'reports' && <FinancialReport />}
        {activeTab === 'pnl' && <PnLView />}
      </div>
    </div>
  );
}
