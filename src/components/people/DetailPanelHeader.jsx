import { X, Mail, Edit2 } from 'lucide-react';
import { useContactsStore } from '../../store/contacts-store';
import AvatarInitials from './AvatarInitials';
import TypeBadge from './TypeBadge';

export default function DetailPanelHeader({ entry, displayName, onClose }) {
  const openEditPanel  = useContactsStore((s) => s.openEditPanel);
  const editPanelOpen  = useContactsStore((s) => s.editPanelOpen);
  const closeEditPanel = useContactsStore((s) => s.closeEditPanel);

  const isCompany = entry.entityType === 'company' || entry._isCompany;

  return (
    <div style={{
      padding: '16px 20px',
      background: 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0.03) 100%)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}>
      {/* Close button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
        <button
          onClick={editPanelOpen ? closeEditPanel : openEditPanel}
          title="Edit"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', padding: 4, borderRadius: 6 }}
        >
          <Edit2 size={15} />
        </button>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', padding: 4, borderRadius: 6 }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Avatar + identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <AvatarInitials
          firstName={entry.firstName || displayName}
          lastName={entry.lastName || ''}
          color={entry.avatarColor || entry.logoColor || '#8b5cf6'}
          size={52}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 17, color: 'var(--text)', lineHeight: 1.2 }}>
            {displayName}
          </div>
          {entry.jobTitle && (
            <div style={{ fontSize: 13, color: 'var(--text2)', marginTop: 2 }}>{entry.jobTitle}</div>
          )}
          {!isCompany && (
            <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2, fontFamily: 'var(--font-mono, monospace)' }}>
              ID: {entry.id}
            </div>
          )}
        </div>
        {!isCompany && <TypeBadge type={entry.contactType} />}
        {isCompany && (
          <span style={{
            fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999,
            background: 'rgba(139,92,246,0.1)', color: 'var(--mod-people)',
          }}>Contact</span>
        )}
      </div>

      {/* Contact info row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        {entry.email && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text2)' }}>
            <Mail size={12} />
            {entry.email}
          </span>
        )}
        {entry.phone && (
          <span style={{ fontSize: 12, color: 'var(--text2)' }}>📞 {entry.phone}</span>
        )}
      </div>
    </div>
  );
}
