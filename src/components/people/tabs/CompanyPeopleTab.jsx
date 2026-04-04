import { useState } from 'react';
import { Search } from 'lucide-react';
import { useContactsStore } from '../../../store/contacts-store';
import { getDisplayName } from '../../../data/contact-config';
import AvatarInitials from '../AvatarInitials';

export default function CompanyPeopleTab({ companyId }) {
  const contacts      = useContactsStore((s) => s.contacts);
  const selectContact = useContactsStore((s) => s.selectContact);
  const [search, setSearch] = useState('');

  const associated = contacts.filter((c) => c.companyId === companyId && c.status !== 'archived');
  const filtered = search.trim()
    ? associated.filter((c) => getDisplayName(c).toLowerCase().includes(search.toLowerCase()))
    : associated;

  return (
    <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Search + actions */}
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={13} style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)' }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search"
            style={{
              width: '100%', padding: '7px 10px 7px 28px', boxSizing: 'border-box',
              borderRadius: 8, border: '1.5px solid var(--border)',
              background: 'var(--bg)', color: 'var(--text)', fontSize: 13,
            }}
          />
        </div>
        <button style={{
          padding: '7px 12px', borderRadius: 8, border: '1.5px solid var(--border)',
          background: 'transparent', color: 'var(--text2)', fontSize: 12, cursor: 'pointer', fontWeight: 500,
        }}>Add Association</button>
        <button style={{
          padding: '7px 12px', borderRadius: 8, border: '1.5px solid var(--border)',
          background: 'transparent', color: 'var(--text2)', fontSize: 12, cursor: 'pointer', fontWeight: 500,
        }}>Add Contact</button>
      </div>

      {/* People grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text3)', fontSize: 13 }}>
          No people associated with this company.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {filtered.map((c) => {
            const name = getDisplayName(c);
            return (
              <div
                key={c.id}
                onClick={() => selectContact(c.id)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  padding: 12, borderRadius: 10, border: '1.5px solid var(--border)',
                  cursor: 'pointer', transition: 'border-color var(--duration) var(--ease)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--mod-people)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <AvatarInitials firstName={c.firstName || name} lastName={c.lastName || ''} color={c.avatarColor} size={44} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{name}</div>
                  {c.jobTitle && <div style={{ fontSize: 11, color: 'var(--text3)' }}>{c.jobTitle}</div>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
