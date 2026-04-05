import { useState } from 'react';
import { LayoutDashboard, Plug, Globe, ShieldAlert, Mail } from 'lucide-react';
import { useThresholdStore } from '../store/threshold-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import TechOverview from '../components/tech/TechOverview';
import IntegrationsTab from '../components/tech/IntegrationsTab';
import WebsitesTab from '../components/tech/WebsitesTab';
import DarkWebTab from '../components/tech/DarkWebTab';
import EmailCampaignsTab from '../components/tech/EmailCampaignsTab';
import PillarHeader from '../components/shared/PillarHeader';
import './Tech.css';

const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'integrations', label: 'Integrations', icon: Plug },
  { id: 'websites', label: 'Websites', icon: Globe },
  { id: 'darkweb', label: 'Dark Web Check', icon: ShieldAlert },
  { id: 'campaigns', label: 'Email Campaigns', icon: Mail },
];

export default function Tech() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['tech']);
  const [activeTab, setActiveTab] = useState('overview');

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="tech" />;
  }

  return (
    <div className="tech-mod">
      <PillarHeader moduleId="tech" />
      <div className="tech-tabs">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} className={`tech-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}>
              <Icon size={15} /> {tab.label}
            </button>
          );
        })}
      </div>
      <div className="tech-content">
        {activeTab === 'overview' && <TechOverview onNavigate={setActiveTab} />}
        {activeTab === 'integrations' && <IntegrationsTab />}
        {activeTab === 'websites' && <WebsitesTab />}
        {activeTab === 'darkweb' && <DarkWebTab />}
        {activeTab === 'campaigns' && <EmailCampaignsTab />}
      </div>
    </div>
  );
}
