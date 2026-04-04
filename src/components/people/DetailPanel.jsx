import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useContactsStore } from '../../store/contacts-store';
import { getDisplayName } from '../../data/contact-config';
import DetailPanelHeader from './DetailPanelHeader';
import DetailPanelTabs from './DetailPanelTabs';
import './DetailPanel.css';

export default function DetailPanel() {
  const selectedContactId = useContactsStore((s) => s.selectedContactId);
  const contacts   = useContactsStore((s) => s.contacts);
  const companies  = useContactsStore((s) => s.companies);
  const closePanel = useContactsStore((s) => s.closePanel);

  // Look up either a contact or a company entry
  const contact = contacts.find((c) => c.id === selectedContactId) || null;
  const company = companies.find((c) => c.id === selectedContactId) || null;
  const entry   = contact || (company ? { ...company, entityType: 'company', _isCompany: true } : null);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closePanel(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [closePanel]);

  if (!entry) return null;

  const displayName = getDisplayName(entry);

  return createPortal(
    <div className="detail-panel-overlay" onClick={closePanel}>
      <div className="detail-panel" onClick={(e) => e.stopPropagation()}>
        <DetailPanelHeader entry={entry} displayName={displayName} onClose={closePanel} />
        <DetailPanelTabs entry={entry} />
      </div>
    </div>,
    document.body
  );
}
