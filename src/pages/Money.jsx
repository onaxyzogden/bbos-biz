import { useState } from 'react';
import { Receipt, TrendingUp, FileText, Landmark, Store } from 'lucide-react';
import { useThresholdStore } from '../store/threshold-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import ExpenseList from '../components/money/ExpenseList';
import IncomeTab from '../components/money/IncomeTab';
import ProposalTab from '../components/money/ProposalTab';
import AccountsTab from '../components/money/AccountsTab';
import VendorsTab from '../components/money/VendorsTab';
import PillarHeader from '../components/shared/PillarHeader';
import './Money.css';

const TABS = [
  { id: 'expenses', label: 'Expenses', icon: Receipt },
  { id: 'income', label: 'Income', icon: TrendingUp },
  { id: 'proposal', label: 'Proposal', icon: FileText },
  { id: 'accounts', label: 'Accounts', icon: Landmark },
  { id: 'vendors', label: 'Vendors', icon: Store },
];

export default function Money() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['money']);
  const [activeTab, setActiveTab] = useState('expenses');

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="money" />;
  }

  return (
    <div className="money">
      <PillarHeader moduleId="money" />

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
        {activeTab === 'income' && <IncomeTab />}
        {activeTab === 'proposal' && <ProposalTab />}
        {activeTab === 'accounts' && <AccountsTab />}
        {activeTab === 'vendors' && <VendorsTab />}
      </div>
    </div>
  );
}
