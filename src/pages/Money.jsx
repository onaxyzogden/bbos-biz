import { useState } from 'react';
import { LayoutDashboard, Receipt, TrendingUp, FileText, Landmark, Store, Package } from 'lucide-react';
import { useThresholdStore } from '../store/threshold-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import MoneyDashboard from '../components/money/MoneyDashboard';
import ExpenseList from '../components/money/ExpenseList';
import IncomeTab from '../components/money/IncomeTab';
import ProposalTab from '../components/money/ProposalTab';
import AccountsTab from '../components/money/AccountsTab';
import VendorsTab from '../components/money/VendorsTab';
import AssetsTab from '../components/money/AssetsTab';
import PillarHeader from '../components/shared/PillarHeader';
import '../components/money/MoneyDashboard.css';
import './Money.css';

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'income', label: 'Income', icon: TrendingUp },
  { id: 'expenses', label: 'Expenses', icon: Receipt },
  { id: 'proposal', label: 'Proposal', icon: FileText },
  { id: 'accounts', label: 'Accounts', icon: Landmark },
  { id: 'vendors', label: 'Vendors', icon: Store },
  { id: 'assets', label: 'Assets', icon: Package },
];

export default function Money({ embedded = false }) {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['money']);
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!embedded && !hasCompletedOpening) {
    return <CeremonyGate moduleId="money" />;
  }

  return (
    <div className="money">
      {!embedded && <PillarHeader moduleId="money" />}

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
        {activeTab === 'dashboard' && <MoneyDashboard />}
        {activeTab === 'expenses' && <ExpenseList />}
        {activeTab === 'income' && <IncomeTab />}
        {activeTab === 'proposal' && <ProposalTab />}
        {activeTab === 'accounts' && <AccountsTab />}
        {activeTab === 'vendors' && <VendorsTab />}
        {activeTab === 'assets' && <AssetsTab />}
      </div>
    </div>
  );
}
