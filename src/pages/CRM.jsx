import { useState } from 'react';
import { Contact, Kanban, Activity, StickyNote } from 'lucide-react';
import { useThresholdStore } from '../store/threshold-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import ContactList from '../components/crm/ContactList';
import DealPipeline from '../components/crm/DealPipeline';
import ActivityLog from '../components/crm/ActivityLog';
import NotesView from '../components/crm/NotesView';
import './CRM.css';

const TABS = [
  { id: 'contacts', label: 'Contacts', icon: Contact },
  { id: 'pipeline', label: 'Pipeline', icon: Kanban },
  { id: 'activities', label: 'Activities', icon: Activity },
  { id: 'notes', label: 'Notes', icon: StickyNote },
];

export default function CRM() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['crm']);
  const [activeTab, setActiveTab] = useState('contacts');

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="crm" />;
  }

  return (
    <div className="crm-mod">
      <div className="crm-header"><h2>CRM</h2></div>
      <div className="crm-tabs">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} className={`crm-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}>
              <Icon size={15} /> {tab.label}
            </button>
          );
        })}
      </div>
      <div className="crm-content">
        {activeTab === 'contacts' && <ContactList />}
        {activeTab === 'pipeline' && <DealPipeline />}
        {activeTab === 'activities' && <ActivityLog />}
        {activeTab === 'notes' && <NotesView />}
      </div>
    </div>
  );
}
