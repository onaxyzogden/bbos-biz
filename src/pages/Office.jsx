import { useState } from 'react';
import { MessageSquare, Calendar, FileText, HelpCircle } from 'lucide-react';
import { useThresholdStore } from '../store/threshold-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import TeamChat from '../components/office/TeamChat';
import CalendarView from '../components/office/CalendarView';
import DocumentManager from '../components/office/DocumentManager';
import QABoard from '../components/office/QABoard';
import './Office.css';

const TABS = [
  { id: 'chat', label: 'Chat', icon: MessageSquare },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'qa', label: 'Q&A', icon: HelpCircle },
];

export default function Office() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['office']);
  const [activeTab, setActiveTab] = useState('chat');

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="office" />;
  }

  return (
    <div className="office">
      <div className="office-header"><h2>Office</h2></div>
      <div className="office-tabs">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} className={`office-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}>
              <Icon size={15} /> {tab.label}
            </button>
          );
        })}
      </div>
      <div className="office-content">
        {activeTab === 'chat' && <TeamChat />}
        {activeTab === 'calendar' && <CalendarView />}
        {activeTab === 'documents' && <DocumentManager />}
        {activeTab === 'qa' && <QABoard />}
      </div>
    </div>
  );
}
