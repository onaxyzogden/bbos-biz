import { useState } from 'react';

export default function CompanyNotesTab({ companyId }) {
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(true);

  function handleChange(e) {
    setNotes(e.target.value);
    setSaved(false);
  }

  function handleSave() {
    // Future: persist to a notes store keyed by companyId
    setSaved(true);
  }

  return (
    <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <textarea
        value={notes}
        onChange={handleChange}
        placeholder="Add notes about this company..."
        style={{
          width: '100%', minHeight: 200, padding: '12px 14px',
          borderRadius: 10, border: '1.5px solid var(--border)',
          background: 'var(--bg)', color: 'var(--text)',
          fontSize: 13, resize: 'vertical', lineHeight: 1.6,
          boxSizing: 'border-box', outline: 'none',
        }}
      />
      {!saved && (
        <button onClick={handleSave} style={{
          alignSelf: 'flex-end', padding: '7px 16px', borderRadius: 8,
          background: 'var(--mod-people)', color: '#fff',
          border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer',
        }}>Save</button>
      )}
    </div>
  );
}
