import { useContactsStore } from '../../store/contacts-store';
import HRTab from './tabs/HRTab';
import AbsenceTab from './tabs/AbsenceTab';
import PersonalTab from './tabs/PersonalTab';
import SalaryTab from './tabs/SalaryTab';
import SkillsTab from './tabs/SkillsTab';
import DocsTab from './tabs/DocsTab';
import WorkTab from './tabs/WorkTab';
import ClockInsTab from './tabs/ClockInsTab';
import CompanyInfoTab from './tabs/CompanyInfoTab';
import CompanyPeopleTab from './tabs/CompanyPeopleTab';
import CompanyNotesTab from './tabs/CompanyNotesTab';

const PERSON_TABS = [
  { id: 'hr',        label: 'HR' },
  { id: 'absence',   label: 'Absence' },
  { id: 'personal',  label: 'Personal' },
  { id: 'salary',    label: 'Salary' },
  { id: 'skills',    label: 'Skills' },
  { id: 'docs',      label: 'Docs' },
  { id: 'work',      label: 'Work' },
  { id: 'clockins',  label: 'Clock Ins' },
];

const COMPANY_TABS = [
  { id: 'info',    label: 'Info' },
  { id: 'people',  label: 'People' },
  { id: 'notes',   label: 'Notes' },
];

export default function DetailPanelTabs({ entry }) {
  const detailTab    = useContactsStore((s) => s.detailTab);
  const setDetailTab = useContactsStore((s) => s.setDetailTab);

  const isCompany = entry.entityType === 'company' || entry._isCompany;
  const tabs = isCompany ? COMPANY_TABS : PERSON_TABS;

  const tabStyle = (active) => ({
    padding: '8px 14px',
    background: 'none',
    border: 'none',
    borderBottom: `2px solid ${active ? 'var(--mod-people)' : 'transparent'}`,
    color: active ? 'var(--mod-people)' : 'var(--text2)',
    fontWeight: active ? 600 : 400,
    fontSize: 13,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all var(--duration) var(--ease)',
  });

  function renderTab() {
    const id = entry.id;
    if (isCompany) {
      if (detailTab === 'info')   return <CompanyInfoTab company={entry._raw || entry} />;
      if (detailTab === 'people') return <CompanyPeopleTab companyId={id} />;
      if (detailTab === 'notes')  return <CompanyNotesTab companyId={id} />;
    } else {
      if (detailTab === 'hr')       return <HRTab contactId={id} />;
      if (detailTab === 'absence')  return <AbsenceTab contactId={id} />;
      if (detailTab === 'personal') return <PersonalTab contactId={id} />;
      if (detailTab === 'salary')   return <SalaryTab contactId={id} />;
      if (detailTab === 'skills')   return <SkillsTab />;
      if (detailTab === 'docs')     return <DocsTab contactId={id} />;
      if (detailTab === 'work')     return <WorkTab contactId={id} />;
      if (detailTab === 'clockins') return <ClockInsTab contactId={id} />;
    }
    return null;
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Tab bar */}
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        borderBottom: '1px solid var(--border)',
        padding: '0 20px',
        scrollbarWidth: 'none',
      }}>
        {tabs.map((t) => (
          <button key={t.id} style={tabStyle(detailTab === t.id)} onClick={() => setDetailTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="detail-panel__body">
        {renderTab()}
      </div>
    </div>
  );
}
