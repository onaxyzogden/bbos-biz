import { useState, useMemo } from 'react';
import { Plus, CheckCircle2, MessageCircle, X, Send, Trash2, Search } from 'lucide-react';
import { useOfficeStore } from '../../store/office-store';
import { useAuthStore } from '../../store/auth-store';
import './Forum.css';

export default function Forum() {
  const qaItems = useOfficeStore((s) => s.qaItems);
  const addQuestion = useOfficeStore((s) => s.addQuestion);
  const addAnswer = useOfficeStore((s) => s.addAnswer);
  const toggleResolved = useOfficeStore((s) => s.toggleResolved);
  const deleteQuestion = useOfficeStore((s) => s.deleteQuestion);
  const user = useAuthStore((s) => s.user);

  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedQA, setSelectedQA] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  const filtered = useMemo(() => {
    let list = [...qaItems];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((item) => item.title.toLowerCase().includes(q) || item.body.toLowerCase().includes(q));
    }
    return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [qaItems, search]);

  const handleAsk = () => {
    if (!newTitle.trim()) return;
    addQuestion({ title: newTitle, body: newBody, author: user?.name || 'You' });
    setShowForm(false); setNewTitle(''); setNewBody('');
  };

  const handleAnswer = () => {
    if (!newAnswer.trim() || !selectedQA) return;
    addAnswer(selectedQA.id, { text: newAnswer, author: user?.name || 'You' });
    setNewAnswer('');
    const updated = useOfficeStore.getState().qaItems.find((q) => q.id === selectedQA.id);
    if (updated) setSelectedQA(updated);
  };

  if (selectedQA) {
    const qa = qaItems.find((q) => q.id === selectedQA.id) || selectedQA;
    return (
      <div className="forum-detail">
        <button className="btn btn-ghost" onClick={() => setSelectedQA(null)} style={{ fontSize: '0.85rem', marginBottom: 'var(--space-4)' }}>← Back to discussions</button>

        <div className="forum-detail-header">
          <div style={{ flex: 1 }}>
            <h3 className="forum-detail-title">{qa.title}</h3>
            <div className="forum-detail-meta">
              Started by {qa.author} &middot; {new Date(qa.createdAt).toLocaleDateString()} &middot;
              <span className={qa.resolved ? 'forum-resolved' : 'forum-open'}>{qa.resolved ? ' Resolved' : ' Open'}</span>
            </div>
          </div>
          <button className={`btn ${qa.resolved ? 'btn-ghost' : 'btn-primary'}`}
            onClick={() => toggleResolved(qa.id)}
            style={!qa.resolved ? { background: 'var(--mod-office)', fontSize: '0.8rem' } : { fontSize: '0.8rem' }}>
            <CheckCircle2 size={14} /> {qa.resolved ? 'Reopen' : 'Mark Resolved'}
          </button>
        </div>

        {qa.body && <p className="forum-detail-body">{qa.body}</p>}

        <div className="forum-answers-section">
          <h4>{qa.answers.length} Repl{qa.answers.length !== 1 ? 'ies' : 'y'}</h4>
          {qa.answers.map((ans) => (
            <div key={ans.id} className="forum-answer">
              <div className="forum-answer-avatar">{ans.author?.[0]?.toUpperCase() || '?'}</div>
              <div className="forum-answer-content">
                <div className="forum-answer-meta"><strong>{ans.author}</strong> &middot; {new Date(ans.createdAt).toLocaleDateString()}</div>
                <p>{ans.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="forum-answer-input">
          <textarea value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} placeholder="Write a reply..." rows={3} />
          <button className="btn btn-primary" onClick={handleAnswer} disabled={!newAnswer.trim()} style={{ background: 'var(--mod-office)', opacity: newAnswer.trim() ? 1 : 0.4, alignSelf: 'flex-end' }}>
            <Send size={14} /> Post Reply
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="forum">
      <div className="forum-header">
        <h3>Forum</h3>
        <p className="forum-subtitle">Q&A section to uncover insights on our company culture, policies, and more.</p>
      </div>

      <div className="forum-controls">
        <button className="btn btn-primary forum-new-btn" onClick={() => setShowForm(true)}>
          <Plus size={16} /> Start a Discussion
        </button>
        <div className="forum-search-wrap">
          <Search size={14} className="forum-search-icon" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search" className="forum-search" />
        </div>
      </div>

      {filtered.length === 0 && !showForm ? (
        <div className="forum-empty">No data available</div>
      ) : (
        <div className="forum-list">
          {filtered.map((qa) => (
            <div key={qa.id} className="forum-card" onClick={() => setSelectedQA(qa)}>
              <div className="forum-card-status">
                {qa.resolved ? <CheckCircle2 size={16} style={{ color: 'var(--success)' }} /> : <MessageCircle size={16} style={{ color: 'var(--mod-office)' }} />}
              </div>
              <div className="forum-card-content">
                <h4 className="forum-card-title">{qa.title}</h4>
                <div className="forum-card-meta">
                  {qa.author} &middot; {new Date(qa.createdAt).toLocaleDateString()} &middot;
                  <MessageCircle size={12} /> {qa.answers.length} repl{qa.answers.length !== 1 ? 'ies' : 'y'}
                </div>
              </div>
              <button className="row-action-btn danger" onClick={(e) => { e.stopPropagation(); if (confirm('Delete?')) deleteQuestion(qa.id); }}><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="expense-form-overlay">
          <div className="expense-form-modal" style={{ maxWidth: 500 }}>
            <div className="expense-form-header"><h3>Start a Discussion</h3><button className="expense-form-close" onClick={() => setShowForm(false)}><X size={18} /></button></div>
            <div className="expense-form-body">
              <div className="expense-form-field"><label>Topic *</label><input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="What do you want to discuss?" autoFocus /></div>
              <div className="expense-form-field"><label>Details</label><textarea value={newBody} onChange={(e) => setNewBody(e.target.value)} placeholder="Provide more context..." rows={4} /></div>
            </div>
            <div className="expense-form-footer">
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAsk} disabled={!newTitle.trim()} style={{ background: 'var(--mod-office)', opacity: newTitle.trim() ? 1 : 0.4 }}>Start Discussion</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
