import { Search, LayoutGrid, Table, Upload, UserPlus } from 'lucide-react';
import { useContactsStore } from '../../store/contacts-store';

const TYPE_FILTERS = [
  { id: 'all',      label: 'All' },
  { id: 'contact',  label: 'Contact' },
  { id: 'lead',     label: 'Lead' },
  { id: 'client',   label: 'Client' },
  { id: 'employee', label: 'Employee' },
];

const ENTITY_FILTERS = [
  { id: 'all',     label: 'All' },
  { id: 'person',  label: 'Person' },
  { id: 'company', label: 'Company' },
];

export default function ContactsToolbar({
  typeFilter, setTypeFilter,
  entityFilter, setEntityFilter,
  showArchived, setShowArchived,
  search, setSearch,
  onAddContact,
}) {
  const viewMode = useContactsStore((s) => s.viewMode);
  const setViewMode = useContactsStore((s) => s.setViewMode);

  const pillStyle = (active) => ({
    padding: '5px 12px',
    borderRadius: 999,
    border: '1.5px solid',
    borderColor: active ? 'var(--mod-people)' : 'var(--border)',
    background: active ? 'rgba(139,92,246,0.1)' : 'transparent',
    color: active ? 'var(--mod-people)' : 'var(--text2)',
    fontWeight: active ? 600 : 400,
    fontSize: 13,
    cursor: 'pointer',
    transition: 'all var(--duration) var(--ease)',
    whiteSpace: 'nowrap',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Row 1: type filters + entity filters + active/archived */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text3)', marginRight: 2 }}>Type:</span>
        {TYPE_FILTERS.map((f) => (
          <button key={f.id} style={pillStyle(typeFilter === f.id)} onClick={() => setTypeFilter(f.id)}>
            {f.label}
          </button>
        ))}
        <div style={{ width: 1, height: 18, background: 'var(--border)', margin: '0 6px' }} />
        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text3)', marginRight: 2 }}>Entity:</span>
        {ENTITY_FILTERS.map((f) => (
          <button key={f.id} style={pillStyle(entityFilter === f.id)} onClick={() => setEntityFilter(f.id)}>
            {f.label}
          </button>
        ))}
        <div style={{ width: 1, height: 18, background: 'var(--border)', margin: '0 6px' }} />
        <button
          style={pillStyle(!showArchived)}
          onClick={() => setShowArchived(false)}
        >Active</button>
        <button
          style={pillStyle(showArchived)}
          onClick={() => setShowArchived(true)}
        >Archived</button>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          <button onClick={onAddContact} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '7px 14px', borderRadius: 8,
            background: 'var(--text)', color: 'var(--bg)',
            border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer',
          }}>
            <UserPlus size={14} />
            + Add a Contact
          </button>
        </div>
      </div>

      {/* Row 2: search + view toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 360 }}>
          <Search size={15} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)' }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contacts..."
            style={{
              width: '100%', padding: '8px 12px 8px 32px',
              borderRadius: 8, border: '1.5px solid var(--border)',
              background: 'var(--bg)', color: 'var(--text)',
              fontSize: 13, outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'var(--text3)' }}>Cards</span>
          <button
            onClick={() => setViewMode('cards')}
            style={{
              padding: 6, borderRadius: 6, border: '1.5px solid var(--border)',
              background: viewMode === 'cards' ? 'var(--bg3)' : 'transparent',
              cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text2)',
            }}
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={() => setViewMode('table')}
            style={{
              padding: 6, borderRadius: 6, border: '1.5px solid var(--border)',
              background: viewMode === 'table' ? 'var(--bg3)' : 'transparent',
              cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text2)',
            }}
          >
            <Table size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
