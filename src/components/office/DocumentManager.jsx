import { useState, useMemo } from 'react';
import { Plus, Pencil, Trash2, Search, X, Save, Download } from 'lucide-react';
import { useOfficeStore } from '../../store/office-store';
import './DocumentManager.css';

const FILE_TYPES = [
  { id: 'all', label: 'All' },
  { id: 'pdf', label: 'Pdf' },
  { id: 'docx', label: 'Docx' },
  { id: 'xlsx', label: 'Xlsx' },
  { id: 'pptx', label: 'Pptx' },
  { id: 'image', label: 'Image' },
  { id: 'other', label: 'Other' },
];

const FILE_TYPE_COLORS = {
  pdf: '#ef4444',
  docx: '#3b82f6',
  xlsx: '#22c55e',
  pptx: '#f97316',
  image: '#8b5cf6',
  other: '#6b7280',
};

const FILE_TYPE_BADGES = {
  pdf: 'PDF',
  docx: 'DOC',
  xlsx: 'XLS',
  pptx: 'PPT',
  image: 'IMG',
  other: 'FILE',
};

export default function DocumentManager() {
  const documents = useOfficeStore((s) => s.documents);
  const addDocument = useOfficeStore((s) => s.addDocument);
  const updateDocument = useOfficeStore((s) => s.updateDocument);
  const deleteDocument = useOfficeStore((s) => s.deleteDocument);

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [editName, setEditName] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState('');
  const [newFileType, setNewFileType] = useState('other');

  const filtered = useMemo(() => {
    let list = [...documents];
    if (search) { const q = search.toLowerCase(); list = list.filter((d) => d.name.toLowerCase().includes(q) || d.content?.toLowerCase().includes(q)); }
    if (filterType !== 'all') list = list.filter((d) => (d.fileType || 'other') === filterType);
    return list.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }, [documents, search, filterType]);

  const handleNew = () => {
    if (!newName.trim()) return;
    const doc = addDocument({ name: newName, type: 'doc', folder: 'General', fileType: newFileType });
    setSelectedDoc(doc); setEditing(true); setEditContent(''); setEditName(newName);
    setShowNew(false); setNewName(''); setNewFileType('other');
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

  const getDocColor = (doc) => FILE_TYPE_COLORS[doc.fileType || 'other'] || FILE_TYPE_COLORS.other;
  const getDocBadge = (doc) => FILE_TYPE_BADGES[doc.fileType || 'other'] || FILE_TYPE_BADGES.other;

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
          <span className="doc-meta-badge" style={{ background: getDocColor(selectedDoc) }}>{getDocBadge(selectedDoc)}</span>
          <span>Updated {new Date(selectedDoc.updatedAt).toLocaleDateString()}</span>
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
    <div className="doc-manager">
      {/* File type tabs */}
      <div className="doc-type-bar">
        <div className="doc-type-tabs">
          {FILE_TYPES.map(ft => (
            <button key={ft.id} className={`doc-type-tab ${filterType === ft.id ? 'active' : ''}`}
              onClick={() => setFilterType(ft.id)}>
              {ft.label}
            </button>
          ))}
        </div>
        <div className="doc-search-wrap">
          <Search size={14} className="doc-search-icon" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search" className="doc-search" />
        </div>
      </div>

      {filtered.length === 0 && !showNew ? (
        <div className="doc-empty">
          <p>No documents found</p>
          <button className="btn btn-primary" onClick={() => setShowNew(true)} style={{ background: 'var(--mod-office)' }}>
            <Plus size={16} /> Upload Document
          </button>
        </div>
      ) : (
        <div className="doc-grid">
          {filtered.map((doc) => (
            <div key={doc.id} className="doc-card" onClick={() => openDoc(doc)}>
              <div className="doc-card-thumbnail" style={{ background: `${getDocColor(doc)}15` }}>
                <span className="doc-card-badge" style={{ background: getDocColor(doc) }}>{getDocBadge(doc)}</span>
              </div>
              <div className="doc-card-footer">
                <div className="doc-card-name">{doc.name}</div>
                <div className="doc-card-actions">
                  <button className="doc-action-btn" onClick={(e) => { e.stopPropagation(); }} title="Save">
                    <Download size={13} /> Save
                  </button>
                  <button className="doc-action-btn danger" onClick={(e) => { e.stopPropagation(); if (confirm('Delete?')) deleteDocument(doc.id); }} title="Delete">
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FAB to add new doc */}
      <button className="doc-fab" onClick={() => setShowNew(true)} title="Upload document">
        <Plus size={24} />
      </button>

      {showNew && (
        <div className="expense-form-overlay">
          <div className="expense-form-modal" style={{ maxWidth: 400 }}>
            <div className="expense-form-header"><h3>New Document</h3><button className="expense-form-close" onClick={() => setShowNew(false)}><X size={18} /></button></div>
            <div className="expense-form-body">
              <div className="expense-form-field"><label>Name *</label><input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Document name" autoFocus /></div>
              <div className="expense-form-field">
                <label>File Type</label>
                <select value={newFileType} onChange={(e) => setNewFileType(e.target.value)}>
                  {FILE_TYPES.filter(ft => ft.id !== 'all').map(ft => (
                    <option key={ft.id} value={ft.id}>{ft.label}</option>
                  ))}
                </select>
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
