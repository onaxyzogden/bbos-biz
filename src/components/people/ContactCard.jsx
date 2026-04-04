import { MoreHorizontal, Building2 } from 'lucide-react';
import { useContactsStore } from '../../store/contacts-store';
import { getDisplayName } from '../../data/contact-config';
import AvatarInitials from './AvatarInitials';
import TypeBadge from './TypeBadge';
import './ContactCard.css';

export default function ContactCard({ contact, company }) {
  const selectContact = useContactsStore((s) => s.selectContact);
  const selectedContactId = useContactsStore((s) => s.selectedContactId);
  const isSelected = selectedContactId === contact.id;

  const displayName = getDisplayName(contact);
  const isCompany = contact.entityType === 'company';

  return (
    <div
      className={`contact-card ${isSelected ? 'contact-card--selected' : ''}`}
      onClick={() => selectContact(contact.id)}
    >
      <div className="contact-card__header">
        <span className="contact-card__entity-label">
          {isCompany ? 'COMPANY' : 'PERSON'}
        </span>
        <button
          className="contact-card__menu"
          onClick={(e) => e.stopPropagation()}
          title="Options"
        >
          <MoreHorizontal size={14} />
        </button>
      </div>

      <div className="contact-card__body">
        <AvatarInitials
          firstName={contact.firstName || contact.name || displayName}
          lastName={contact.lastName || ''}
          color={contact.avatarColor || '#8b5cf6'}
          size={52}
        />
        <div className="contact-card__name">{displayName}</div>
        {contact.jobTitle && (
          <div className="contact-card__role">{contact.jobTitle}</div>
        )}
      </div>

      <div className="contact-card__footer">
        {company && (
          <span className="contact-card__company-chip">
            <Building2 size={11} />
            {company.name}
          </span>
        )}
        <TypeBadge type={contact.contactType} style={{ marginLeft: 'auto' }} />
      </div>
    </div>
  );
}
