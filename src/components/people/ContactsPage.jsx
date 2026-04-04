import { useState, useMemo } from 'react';
import { useMobile } from '../../hooks/useMobile';
import { useContactsStore } from '../../store/contacts-store';
import { getDisplayName } from '../../data/contact-config';
import ContactsToolbar from './ContactsToolbar';
import ContactCard from './ContactCard';
import ContactsTable from './ContactsTable';
import FloatingFAB from './FloatingFAB';
import AddContactModal from './AddContactModal';
import DetailPanel from './DetailPanel';
import './ContactsPage.css';

export default function ContactsPage() {
  const mobile = useMobile();
  const contacts  = useContactsStore((s) => s.contacts);
  const companies = useContactsStore((s) => s.companies);
  const viewMode  = useContactsStore((s) => s.viewMode);
  const panelOpen = useContactsStore((s) => s.panelOpen);

  const [typeFilter,   setTypeFilter]   = useState('all');
  const [entityFilter, setEntityFilter] = useState('all');
  const [showArchived, setShowArchived] = useState(false);
  const [search,       setSearch]       = useState('');
  const [showAdd,      setShowAdd]      = useState(false);

  // Build unified list: regular contacts + companies as "contacts"
  const allEntries = useMemo(() => {
    const companyEntries = companies.map((co) => ({
      id:          co.id,
      entityType:  'company',
      contactType: 'contact',
      status:      co.status,
      firstName:   co.name,
      lastName:    '',
      displayName: co.name,
      email:       co.email,
      phone:       co.phone,
      avatarColor: co.logoColor,
      jobTitle:    '',
      companyId:   '',
      _isCompany:  true,
      _raw:        co,
    }));
    return [...contacts, ...companyEntries];
  }, [contacts, companies]);

  const filtered = useMemo(() => {
    let list = allEntries;

    // Status filter
    list = list.filter((c) => showArchived ? c.status === 'archived' : c.status !== 'archived');

    // Type filter
    if (typeFilter !== 'all') {
      list = list.filter((c) => c.contactType === typeFilter);
    }

    // Entity filter
    if (entityFilter !== 'all') {
      list = list.filter((c) => c.entityType === entityFilter);
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((c) => {
        const name = getDisplayName(c).toLowerCase();
        return name.includes(q) || (c.email || '').toLowerCase().includes(q) ||
          (c.jobTitle || '').toLowerCase().includes(q);
      });
    }

    return list;
  }, [allEntries, typeFilter, entityFilter, showArchived, search]);

  return (
    <div className="contacts-page">
      <ContactsToolbar
        typeFilter={typeFilter}   setTypeFilter={setTypeFilter}
        entityFilter={entityFilter} setEntityFilter={setEntityFilter}
        showArchived={showArchived} setShowArchived={setShowArchived}
        search={search}           setSearch={setSearch}
        onAddContact={() => setShowAdd(true)}
      />

      <div className="contacts-page__content">
        {filtered.length === 0 ? (
          <div className="contacts-page__empty">
            <p>No contacts found.</p>
            <button className="contacts-page__empty-cta" onClick={() => setShowAdd(true)}>
              + Add a Contact
            </button>
          </div>
        ) : viewMode === 'cards' ? (
          <div className="contacts-grid">
            {filtered.map((c) => (
              <ContactCard
                key={c.id}
                contact={c}
                company={c.companyId ? companies.find((co) => co.id === c.companyId) : null}
              />
            ))}
          </div>
        ) : (
          <ContactsTable contacts={filtered} />
        )}
      </div>

      {mobile && !panelOpen && (
        <FloatingFAB onClick={() => setShowAdd(true)} />
      )}

      {showAdd && <AddContactModal onClose={() => setShowAdd(false)} />}
      {panelOpen && <DetailPanel />}
    </div>
  );
}
