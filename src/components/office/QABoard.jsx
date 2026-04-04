import { useState, useMemo } from 'react';
import { Plus, HelpCircle, CheckCircle2, MessageCircle, X, Send, Trash2 } from 'lucide-react';
import { useOfficeStore } from '../../store/office-store';
import { useAuthStore } from '../../store/auth-store';
import './QABoard.css';

export default function QABoard() {
  const qaItems = useOfficeStore((s) => s.qaItems);
  const addQuestion = useOfficeStore((s) => s.addQuestion);
  const addAnswer = useOfficeStore((s) => s.addAnswer);
  const toggleResolved = useOfficeStore((s) => s.toggleResolved);
  const deleteQuestion = useOfficeStore((s) => s.deleteQuestion);
  const user = useAuthStore((s) => s.user);

  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [selectedQA, setSelectedQA] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  const filtered = useMemo(() => {
    let list = [...qaItems];
    if (filter === 'open') list = list.filter((q) => !q.resolved);
    if (filter === 'resolved') list = list.filter((q) => q.resolved);
    return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [qaItems, filter]);

  const handleAsk = () => {
    if (!newTitle.trim()) return;
    addQuestion({ title: newTitle, body: newBody, author: user?.name || 'You' });
    setShowForm(false); setNewTitle(''); setNewBody('');
  };

  const handleAnswer = () => {
    if (!newAnswer.trim() || !selectedQA) return;
    addAnswer(selectedQA.id, { text: newAnswer, author: user?.name || 'You' });
    setNewAnswer('');
    // Refresh selected
    const updated = useOfficeStore.getState().qaItems.find((q) => q.id === selectedQA.id);
    if (updated) setSelectedQA(updated);
  };

  // Detail view
  if (selectedQA) {
    const qa = qaItems.find((q) => q.id === selectedQA.id) || selectedQA;
    return (
      <div className="qa-detail">
        <button className="btn btn-ghost" onClick={() => setSelectedQA(null)} style={{ fontSize: '0.85rem', marginBottom: 'var(--space-4)' }}>← Back to questions</button>

        <div className="qa-detail-header">
          <div style={{ flex: 1 }}>
            <h3 className="qa-detail-title">{qa.title}</h3>
            <div className="qa-detail-meta">
              Asked by {qa.author} · {new Date(qa.createdAt).toLocaleDateString()} ·
              <span className={qa.resolved ? 'qa-resolved' : 'qa-open'}>{qa.resolved ? ' Resolved' : ' Open'}</span>
            </div>
          </div>
          <button className={`btn ${qa.resolved ? 'btn-ghost' : 'btn-primary'}`}
            onClick={() => toggleResolved(qa.id)}
            style={!qa.resolved ? { background: 'var(--mod-office)', fontSize: '0.8rem' } : { fontSize: '0.8rem' }}>
            <CheckCircle2 size={14} /> {qa.resolved ? 'Reopen' : 'Mark Resolved'}
          </button>
        </div>

        {qa.body && <p className="qa-detail-body">{qa.body}</p>}

        <div className="qa-answers-section">
          <h4>{qa.answers.length} Answer{qa.answers.length !== 1 ? 's' : ''}</h4>
          {qa.answers.map((ans) => (
            <div key={ans.id} className="qa-answer">
              <div className="qa-answer-avatar">{ans.author?.[0]?.toUpperCase() || '?'}</div>
              <div className="qa-answer-content">
                <div className="qa-answer-meta"><strong>{ans.author}</strong> · {new Date(ans.createdAt).toLocaleDateString()}</div>
                <p>{ans.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="qa-answer-input">
          <textarea value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} placeholder="Write your answer..." rows={3} />
          <button className="btn btn-primary" onClick={handleAnswer} disabled={!newAnswer.trim()} style={{ background: 'var(--mod-office)', opacity: newAnswer.trim() ? 1 : 0.4, alignSelf: 'flex-end' }}>
            <Send size={14} /> Post Answer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
          {['all', 'open', 'resolved'].map((f) => (
            <button key={f} className={`cat-filter-pill ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)} style={{ textTransform: 'capitalize' }}>{f}</button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)} style={{ background: 'var(--mod-office)' }}>
          <Plus size={16} /> Ask Question
        </button>
      </div>

      {filtered.length === 0 && !showForm ? (
        <div className="money-empty">
          <HelpCircle size={40} className="money-empty-icon" />
          <h4>No questions yet</h4>
          <p>Ask questions and build your team's knowledge base.</p>
        </div>
      ) : (
        <div className="qa-list">
          {filtered.map((qa) => (
            <div key={qa.id} className="qa-card" onClick={() => setSelectedQA(qa)}>
              <div className="qa-card-status">
                {qa.resolved ? <CheckCircle2 size={16} style={{ color: 'var(--success)' }} /> : <HelpCircle size={16} style={{ color: 'var(--mod-office)' }} />}
              </div>
              <div className="qa-card-content">
                <h4 className="qa-card-title">{qa.title}</h4>
                <div className="qa-card-meta">
                  {qa.author} · {new Date(qa.createdAt).toLocaleDateString()} ·
                  <MessageCircle size={12} /> {qa.answers.length} answer{qa.answers.length !== 1 ? 's' : ''}
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
            <div className="expense-form-header"><h3>Ask a Question</h3><button className="expense-form-close" onClick={() => setShowForm(false)}><X size={18} /></button></div>
            <div className="expense-form-body">
              <div className="expense-form-field"><label>Question *</label><input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="What do you want to know?" autoFocus /></div>
              <div className="expense-form-field"><label>Details</label><textarea value={newBody} onChange={(e) => setNewBody(e.target.value)} placeholder="Provide more context..." rows={4} /></div>
            </div>
            <div className="expense-form-footer">
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAsk} disabled={!newTitle.trim()} style={{ background: 'var(--mod-office)', opacity: newTitle.trim() ? 1 : 0.4 }}>Post Question</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
