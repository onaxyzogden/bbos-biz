import { useState, useMemo } from 'react';
import { Plus, FileText, Folder, Pencil, Trash2, Search, X, Save } from 'lucide-react';
import { useOfficeStore } from '../../store/office-store';
import './DocumentManager.css';

const DOC_TYPES = [
  { id: 'note', label: 'Note', icon: '📝' },
  { id: 'doc', label: 'Document', icon: '📄' },
  { id: 'template', label: 'Template', icon: '📋' },
  { id: 'policy', label: 'Policy', icon: '📜' },
];

export default function DocumentManager() {
  const documents = useOfficeStore((s) => s.documents);
  const addDocument = useOfficeStore((s) => s.addDocument);
  const updateDocument = useOfficeStore((s) => s.updateDocument);
  const deleteDocument = useOfficeStore((s) => s.deleteDocument);

  const [search, setSearch] = useState('');
  const [filterFolder, setFilterFolder] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [editName, setEditName] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('note');
  const [newFolder, setNewFolder] = useState('General');

  const folders = useMemo(() => {
    const set = new Set(documents.map((d) => d.folder));
    set.add('General');
    return [...set].sort();
  }, [documents]);

  const filtered = useMemo(() => {
    let list = [...documents];
    if (search) { const q = search.toLowerCase(); list = list.filter((d) => d.name.toLowerCase().includes(q) || d.content.toLowerCase().includes(q)); }
    if (filterFolder) list = list.filter((d) => d.folder === filterFolder);
    return list.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }, [documents, search, filterFolder]);

  const handleNew = () => {
    if (!newName.trim()) return;
    const doc = addDocument({ name: newName, type: newType, folder: newFolder });
    setSelectedDoc(doc); setEditing(true); setEditContent(''); setEditName(newName);
    setShowNew(false); setNewName('');
  };

  const handleSave = () => {
    if (selectedDoc) {
      updateDocument(selectedDoc.id, { name: editName, content: editContent });
      setSelectedDoc({ ...selectedDoc, name: editName, content: editContent });
    }
    setEditing(false);
  };

  const openDoc = (doc) => {
    setSelectedDoc(doc); setEditName(doc.name); setEditContent(doc.content); setEditing(false);
  };

  if (selectedDoc) {
    return (
      <div className="doc-viewer">
        <div className="doc-viewer-header">
          <button className="btn btn-ghost" onClick={() => setSelectedDoc(null)} style={{ fontSize: '0.8rem' }}>← Back</button>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            {editing ? (
              <input value={editName} onChange={(e) => setEditName(e.target.value)}
                style={{ fontWeight: 600, fontSize: '1rem', border: 'none', borderBottom: '2px solid var(--mod-office)', background: 'transparent', outline: 'none', flex: 1 }} />
            ) : (
              <h3 style={{ fontSize: '1rem' }}>{selectedDoc.name}</h3>
            )}
          </div>
          {editing ? (
            <button className="btn btn-primary" onClick={handleSave} style={{ background: 'var(--mod-office)', fontSize: '0.85rem' }}><Save size={14} /> Save</button>
          ) : (
            <button className="btn btn-ghost" onClick={() => setEditing(true)} style={{ fontSize: '0.85rem' }}><Pencil size={14} /> Edit</button>
          )}
        </div>
        <div className="doc-meta">
          <span>{selectedDoc.folder}</span> · <span>{DOC_TYPES.find((t) => t.id === selectedDoc.type)?.label || selectedDoc.type}</span> · <span>Updated {new Date(selectedDoc.updatedAt).toLocaleDateString()}</span>
        </div>
        {editing ? (
          <textarea className="doc-editor" value={editContent} onChange={(e) => setEditContent(e.target.value)} placeholder="Start writing..." autoFocus />
        ) : (
          <div className="doc-content">{selectedDoc.content || <span style={{ color: 'var(--text3)', fontStyle: 'italic' }}>Empty document. Click Edit to start writing.</span>}</div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', gap: 'var(--space-3)' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 260 }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)' }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search documents..."
            style={{ width: '100%', paddingLeft: 30, fontSize: '0.85rem', borderRadius: 'var(--radius)' }} />
        </div>
        <button className="btn btn-primary" onClick={() => setShowNew(true)} style={{ background: 'var(--mod-office)' }}>
          <Plus size={16} /> New Document
        </button>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
        <button className={`cat-filter-pill ${!filterFolder ? 'active' : ''}`} onClick={() => setFilterFolder(null)}>All</button>
        {folders.map((f) => (
          <button key={f} className={`cat-filter-pill ${filterFolder === f ? 'active' : ''}`} onClick={() => setFilterFolder(filterFolder === f ? null : f)}>
            <Folder size={12} /> {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 && !showNew ? (
        <div className="money-empty">
          <FileText size={40} className="money-empty-icon" />
          <h4>No documents yet</h4>
          <p>Create notes, docs, and templates for your team.</p>
          <button className="btn btn-primary" onClick={() => setShowNew(true)} style={{ background: 'var(--mod-office)' }}>
            <Plus size={16} /> Create Document
          </button>
        </div>
      ) : (
        <div className="doc-grid">
          {filtered.map((doc) => (
            <div key={doc.id} className="doc-card" onClick={() => openDoc(doc)}>
              <div className="doc-card-icon">{DOC_TYPES.find((t) => t.id === doc.type)?.icon || '📄'}</div>
              <div className="doc-card-name">{doc.name}</div>
              <div className="doc-card-meta">{doc.folder} · {new Date(doc.updatedAt).toLocaleDateString('en', { month: 'short', day: 'numeric' })}</div>
              <button className="row-action-btn danger doc-card-delete" onClick={(e) => { e.stopPropagation(); if (confirm('Delete?')) deleteDocument(doc.id); }}><Trash2 size={12} /></button>
            </div>
          ))}
        </div>
      )}

      {showNew && (
        <div className="expense-form-overlay">
          <div className="expense-form-modal" style={{ maxWidth: 400 }}>
            <div className="expense-form-header"><h3>New Document</h3><button className="expense-form-close" onClick={() => setShowNew(false)}><X size={18} /></button></div>
            <div className="expense-form-body">
              <div className="expense-form-field"><label>Name *</label><input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Document name" autoFocus /></div>
              <div className="expense-form-row">
                <div className="expense-form-field" style={{ flex: 1 }}>
                  <label>Type</label>
                  <select value={newType} onChange={(e) => setNewType(e.target.value)}>
                    {DOC_TYPES.map((t) => <option key={t.id} value={t.id}>{t.icon} {t.label}</option>)}
                  </select>
                </div>
                <div className="expense-form-field" style={{ flex: 1 }}><label>Folder</label><input value={newFolder} onChange={(e) => setNewFolder(e.target.value)} placeholder="General" /></div>
              </div>
            </div>
            <div className="expense-form-footer">
              <button className="btn btn-ghost" onClick={() => setShowNew(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleNew} disabled={!newName.trim()} style={{ background: 'var(--mod-office)', opacity: newName.trim() ? 1 : 0.4 }}>Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
