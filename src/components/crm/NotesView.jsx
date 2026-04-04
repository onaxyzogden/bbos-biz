import { useState, useMemo } from 'react';
import { Plus, StickyNote, Send } from 'lucide-react';
import { useCRMStore, ACTIVITY_TYPES } from '../../store/crm-store';
import { useAuthStore } from '../../store/auth-store';

export default function NotesView() {
  const contacts = useCRMStore((s) => s.contacts);
  const activities = useCRMStore((s) => s.activities);
  const addActivity = useCRMStore((s) => s.addActivity);
  const user = useAuthStore((s) => s.user);
  const [selectedContact, setSelectedContact] = useState(null);
  const [newNote, setNewNote] = useState('');

  const contactNotes = useMemo(() => {
    if (!selectedContact) return [];
    return activities
      .filter((a) => a.contactId === selectedContact && a.type === 'note')
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [activities, selectedContact]);

  const handleAddNote = () => {
    if (!newNote.trim() || !selectedContact) return;
    addActivity({ contactId: selectedContact, type: 'note', description: newNote.trim(), date: new Date().toISOString().slice(0, 10) });
    setNewNote('');
  };

  if (contacts.length === 0) {
    return (
      <div className="money-empty">
        <StickyNote size={40} className="money-empty-icon" />
        <h4>No contacts yet</h4>
        <p>Add contacts first, then you can attach notes to them.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 'var(--space-4)', minHeight: 400 }}>
      {/* Contact list */}
      <div style={{ background: 'var(--bg3)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <div style={{ padding: 'var(--space-3)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Contacts</div>
        {contacts.map((c) => {
          const noteCount = activities.filter((a) => a.contactId === c.id && a.type === 'note').length;
          return (
            <button key={c.id} onClick={() => setSelectedContact(c.id)}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                width: '100%', padding: 'var(--space-2) var(--space-3)', border: 'none',
                background: selectedContact === c.id ? 'var(--surface)' : 'transparent',
                color: selectedContact === c.id ? 'var(--mod-crm)' : 'var(--text2)',
                fontWeight: selectedContact === c.id ? 600 : 400,
                fontSize: '0.85rem', cursor: 'pointer', textAlign: 'left',
                transition: 'all var(--duration) var(--ease)',
              }}>
              <span>{c.name}</span>
              {noteCount > 0 && <span style={{ fontSize: '0.7rem', background: 'var(--bg4)', padding: '0 5px', borderRadius: 'var(--radius-full)', color: 'var(--text3)' }}>{noteCount}</span>}
            </button>
          );
        })}
      </div>

      {/* Notes area */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {!selectedContact ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, color: 'var(--text3)', fontSize: '0.9rem' }}>
            Select a contact to view notes
          </div>
        ) : (
          <>
            <h4 style={{ marginBottom: 'var(--space-4)', fontSize: '0.95rem' }}>
              Notes for {contacts.find((c) => c.id === selectedContact)?.name}
            </h4>

            <div style={{ flex: 1, overflowY: 'auto', marginBottom: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {contactNotes.length === 0 && (
                <p style={{ color: 'var(--text3)', fontSize: '0.85rem' }}>No notes yet for this contact.</p>
              )}
              {contactNotes.map((note) => (
                <div key={note.id} style={{ padding: 'var(--space-3) var(--space-4)', background: 'var(--bg)', borderRadius: 'var(--radius)', borderLeft: '3px solid var(--mod-crm)' }}>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.6, marginBottom: 'var(--space-1)' }}>{note.description}</p>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text3)' }}>{new Date(note.createdAt).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <textarea value={newNote} onChange={(e) => setNewNote(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAddNote(); } }}
                placeholder="Add a note..." rows={2}
                style={{ flex: 1, padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius)', fontSize: '0.85rem', resize: 'none' }} />
              <button className="btn btn-primary" onClick={handleAddNote} disabled={!newNote.trim()}
                style={{ background: 'var(--mod-crm)', opacity: newNote.trim() ? 1 : 0.4, alignSelf: 'flex-end', padding: 'var(--space-2) var(--space-4)' }}>
                <Send size={14} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
