import { useState } from 'react';
import { Users, Briefcase, Kanban, UserPlus } from 'lucide-react';
import { useThresholdStore } from '../store/threshold-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import ContactsPage from '../components/people/ContactsPage';
import HRPage from '../components/people/HRPage';
import SalesPipelinePage from '../components/people/SalesPipelinePage';
import RecruitmentPage from '../components/people/RecruitmentPage';
import PillarHeader from '../components/shared/PillarHeader';
import './People.css';

const SECTIONS = [
  { id: 'contacts',  label: 'Contacts',        icon: Users },
  { id: 'hr',        label: 'Human Resources',  icon: Briefcase },
  { id: 'pipeline',  label: 'Sales Pipeline',   icon: Kanban },
  { id: 'recruit',   label: 'Recruitment',       icon: UserPlus },
];

export default function People() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['people']);
  const [activeSection, setActiveSection] = useState('contacts');

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="people" />;
  }

  return (
    <div className="people">
      <PillarHeader moduleId="people" />
      <div className="people-tabs">
        {SECTIONS.map((sec) => {
          const Icon = sec.icon;
          return (
            <button
              key={sec.id}
              className={`people-tab ${activeSection === sec.id ? 'active' : ''}`}
              onClick={() => setActiveSection(sec.id)}
            >
              <Icon size={15} /> {sec.label}
            </button>
          );
        })}
      </div>

      {activeSection === 'contacts' && <ContactsPage />}
      {activeSection === 'hr' && <HRPage />}
      {activeSection === 'pipeline' && <SalesPipelinePage />}
      {activeSection === 'recruit' && <RecruitmentPage />}
    </div>
  );
}
