import { useState } from 'react';
import { Activity, ShieldAlert, Gauge, Layers } from 'lucide-react';
import { useThresholdStore } from '../store/threshold-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import UptimeMonitor from '../components/tech/UptimeMonitor';
import SecurityAlerts from '../components/tech/SecurityAlerts';
import PerfTracker from '../components/tech/PerfTracker';
import StackOverview from '../components/tech/StackOverview';
import './Tech.css';

const TABS = [
  { id: 'monitoring', label: 'Monitoring', icon: Activity },
  { id: 'security', label: 'Security', icon: ShieldAlert },
  { id: 'performance', label: 'Performance', icon: Gauge },
  { id: 'stack', label: 'Tech Stack', icon: Layers },
];

export default function Tech() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['tech']);
  const [activeTab, setActiveTab] = useState('monitoring');

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="tech" />;
  }

  return (
    <div className="tech-mod">
      <div className="tech-header"><h2>Tech</h2></div>
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
        {activeTab === 'monitoring' && <UptimeMonitor />}
        {activeTab === 'security' && <SecurityAlerts />}
        {activeTab === 'performance' && <PerfTracker />}
        {activeTab === 'stack' && <StackOverview />}
      </div>
    </div>
  );
}
