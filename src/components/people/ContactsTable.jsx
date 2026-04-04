import { useContactsStore } from '../../store/contacts-store';
import { getDisplayName } from '../../data/contact-config';
import AvatarInitials from './AvatarInitials';
import TypeBadge from './TypeBadge';

export default function ContactsTable({ contacts }) {
  const selectContact = useContactsStore((s) => s.selectContact);
  const selectedContactId = useContactsStore((s) => s.selectedContactId);
  const companies = useContactsStore((s) => s.companies);

  if (contacts.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text3)' }}>
        No contacts found.
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            {['Name', 'Type', 'Company', 'Email', 'Phone', 'Status'].map((h) => (
              <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: 'var(--text2)', whiteSpace: 'nowrap' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => {
            const company = companies.find((co) => co.id === c.companyId);
            const displayName = getDisplayName(c);
            const isSelected = selectedContactId === c.id;
            return (
              <tr
                key={c.id}
                onClick={() => selectContact(c.id)}
                style={{
                  borderBottom: '1px solid var(--border)',
                  cursor: 'pointer',
                  background: isSelected ? 'rgba(139,92,246,0.06)' : 'transparent',
                  transition: 'background 150ms',
                }}
                onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = 'var(--surface-hover)'; }}
                onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
              >
                <td style={{ padding: '10px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <AvatarInitials
                      firstName={c.firstName || displayName}
                      lastName={c.lastName || ''}
                      color={c.avatarColor || '#8b5cf6'}
                      size={28}
                    />
                    <span style={{ fontWeight: 500, color: 'var(--text)' }}>{displayName}</span>
                  </div>
                </td>
                <td style={{ padding: '10px 12px' }}><TypeBadge type={c.contactType} /></td>
                <td style={{ padding: '10px 12px', color: 'var(--text2)' }}>{company?.name || '—'}</td>
                <td style={{ padding: '10px 12px', color: 'var(--text2)' }}>{c.email || '—'}</td>
                <td style={{ padding: '10px 12px', color: 'var(--text2)' }}>{c.phone || '—'}</td>
                <td style={{ padding: '10px 12px' }}>
                  <span style={{
                    fontSize: 11, fontWeight: 600, padding: '2px 8px',
                    borderRadius: 999, textTransform: 'uppercase',
                    background: c.status === 'active' ? 'rgba(34,197,94,0.12)' : 'rgba(107,114,128,0.12)',
                    color: c.status === 'active' ? '#16a34a' : '#6b7280',
                  }}>
                    {c.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
