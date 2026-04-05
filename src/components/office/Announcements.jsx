import { useState, useMemo } from 'react';
import { Plus, Search, Trash2, X } from 'lucide-react';
import { useOfficeStore } from '../../store/office-store';
import { useAuthStore } from '../../store/auth-store';
import './Announcements.css';

export default function Announcements() {
  const announcements = useOfficeStore((s) => s.announcements);
  const addAnnouncement = useOfficeStore((s) => s.addAnnouncement);
  const deleteAnnouncement = useOfficeStore((s) => s.deleteAnnouncement);
  const user = useAuthStore((s) => s.user);

  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');

  const filtered = useMemo(() => {
    let list = [...announcements];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((a) => a.title.toLowerCase().includes(q) || a.body.toLowerCase().includes(q));
    }
    return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [announcements, search]);

  const handleCreate = () => {
    if (!newTitle.trim()) return;
    addAnnouncement({ title: newTitle, body: newBody, author: user?.name || 'You' });
    setShowForm(false); setNewTitle(''); setNewBody('');
  };

  return (
    <div className="announcements">
      <div className="ann-header">
        <h3>Company Announcements</h3>
        <p className="ann-subtitle">Updates that keep the whole team informed. From major wins to policy changes, share things that the whole team must know.</p>
      </div>

      <div className="ann-controls">
        <div className="ann-search-wrap">
          <Search size={14} className="ann-search-icon" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search" className="ann-search" />
        </div>
        <button className="btn btn-primary ann-new-btn" onClick={() => setShowForm(true)}>
          New announcement
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="ann-empty">No data available</div>
      ) : (
        <div className="ann-list">
          {filtered.map((ann) => (
            <div key={ann.id} className="ann-card">
              <div className="ann-card-content">
                <h4 className="ann-card-title">{ann.title}</h4>
                {ann.body && <p className="ann-card-body">{ann.body}</p>}
                <div className="ann-card-meta">
                  {ann.author} &middot; {new Date(ann.createdAt).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
              <button className="row-action-btn danger" onClick={() => { if (confirm('Delete this announcement?')) deleteAnnouncement(ann.id); }}>
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="expense-form-overlay">
          <div className="expense-form-modal" style={{ maxWidth: 500 }}>
            <div className="expense-form-header"><h3>New Announcement</h3><button className="expense-form-close" onClick={() => setShowForm(false)}><X size={18} /></button></div>
            <div className="expense-form-body">
              <div className="expense-form-field"><label>Title *</label><input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Announcement title" autoFocus /></div>
              <div className="expense-form-field"><label>Body</label><textarea value={newBody} onChange={(e) => setNewBody(e.target.value)} placeholder="Share the details..." rows={5} /></div>
            </div>
            <div className="expense-form-footer">
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleCreate} disabled={!newTitle.trim()} style={{ background: 'var(--mod-office)', opacity: newTitle.trim() ? 1 : 0.4 }}>Publish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
