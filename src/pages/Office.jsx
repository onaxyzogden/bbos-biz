import { useState } from 'react';
import { useThresholdStore } from '../store/threshold-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import TeamChat from '../components/office/TeamChat';
import CalendarView from '../components/office/CalendarView';
import Announcements from '../components/office/Announcements';
import Forum from '../components/office/Forum';
import DocumentManager from '../components/office/DocumentManager';
import './Office.css';

const TABS = [
  { id: 'chat', label: 'Chat' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'announcements', label: 'Announcements' },
  { id: 'forum', label: 'Forum' },
  { id: 'documents', label: 'Documents' },
];

export default function Office() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['office']);
  const [activeTab, setActiveTab] = useState('chat');

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="office" />;
  }

  return (
    <div className="office">
      <div className="office-tabs">
        {TABS.map((tab) => (
          <button key={tab.id} className={`office-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="office-content">
        {activeTab === 'chat' && <TeamChat />}
        {activeTab === 'calendar' && <CalendarView />}
        {activeTab === 'announcements' && <Announcements />}
        {activeTab === 'forum' && <Forum />}
        {activeTab === 'documents' && <DocumentManager />}
      </div>
    </div>
  );
}
