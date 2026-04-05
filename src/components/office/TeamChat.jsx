import { useState, useMemo, useRef, useEffect } from 'react';
import { Plus, Send, Hash, Trash2, MessageSquare, Users, Bold, Italic, Underline, Strikethrough, Link, Mic, Video, Smile, Paperclip, Lock, ListTodo, StickyNote, Search } from 'lucide-react';
import { useOfficeStore } from '../../store/office-store';
import { useAuthStore } from '../../store/auth-store';
import './TeamChat.css';

export default function TeamChat() {
  const channels = useOfficeStore((s) => s.channels);
  const messages = useOfficeStore((s) => s.messages);
  const addChannel = useOfficeStore((s) => s.addChannel);
  const deleteChannel = useOfficeStore((s) => s.deleteChannel);
  const addMessage = useOfficeStore((s) => s.addMessage);
  const user = useAuthStore((s) => s.user);

  const [activeChannel, setActiveChannel] = useState(channels[0]?.id || '');
  const [newMsg, setNewMsg] = useState('');
  const [showNewChannel, setShowNewChannel] = useState(false);
  const [newChName, setNewChName] = useState('');
  const messagesEnd = useRef(null);

  const channelMessages = useMemo(() =>
    messages.filter((m) => m.channelId === activeChannel).sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
  [messages, activeChannel]);

  useEffect(() => { messagesEnd.current?.scrollIntoView({ behavior: 'smooth' }); }, [channelMessages.length]);

  const handleSend = () => {
    if (!newMsg.trim()) return;
    addMessage({ channelId: activeChannel, text: newMsg.trim(), author: user?.name || 'You' });
    setNewMsg('');
  };

  const handleNewChannel = () => {
    if (!newChName.trim()) return;
    const ch = addChannel({ name: newChName.trim() });
    setActiveChannel(ch.id);
    setNewChName(''); setShowNewChannel(false);
  };

  const activeCh = channels.find((c) => c.id === activeChannel);
  const userInitials = user?.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'YA';

  return (
    <div className="chat-layout">
      {/* Left sidebar */}
      <div className="chat-sidebar">
        <div className="chat-sidebar-search">
          <Search size={14} />
          <span>Search</span>
        </div>

        <div className="chat-section">
          <div className="chat-section-header">
            <span>CHANNELS</span>
            <span className="chat-badge">{channels.length}</span>
            <button className="chat-section-action" onClick={() => setShowNewChannel(true)} title="New channel"><Plus size={14} /></button>
          </div>
          {channels.map((ch) => (
            <button key={ch.id} className={`chat-channel ${activeChannel === ch.id ? 'active' : ''}`}
              onClick={() => setActiveChannel(ch.id)}>
              <div className="chat-channel-icon"><Hash size={13} /></div>
              <span className="chat-channel-label">{ch.name}</span>
              <div className="chat-channel-avatars">
                <span className="chat-mini-avatar">{userInitials}</span>
              </div>
            </button>
          ))}
          {showNewChannel && (
            <div style={{ padding: 'var(--space-2)' }}>
              <input value={newChName} onChange={(e) => setNewChName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleNewChannel(); if (e.key === 'Escape') setShowNewChannel(false); }}
                placeholder="Channel name..." autoFocus
                style={{ width: '100%', fontSize: '0.8rem', padding: 'var(--space-1) var(--space-2)' }} />
            </div>
          )}
        </div>

        <div className="chat-section">
          <div className="chat-section-header">
            <span>GROUPS</span>
            <span className="chat-badge">0</span>
            <button className="chat-section-action" title="New group"><Plus size={14} /></button>
          </div>
        </div>

        <div className="chat-section chat-section-bottom">
          <div className="chat-section-header">
            <span>DIRECT MESSAGES</span>
            <span className="chat-badge">0</span>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="chat-messages-area">
        <div className="chat-messages-header">
          <div className="chat-messages-header-left">
            <span className="chat-channel-title">#{activeCh?.name || 'Select a channel'}</span>
            <Search size={14} style={{ color: 'var(--text3)', cursor: 'pointer' }} />
          </div>
          <div className="chat-messages-header-right">
            <div className="chat-header-avatars">
              <span className="chat-header-avatar">{userInitials}</span>
              <span className="chat-header-avatar" style={{ background: 'var(--primary)' }}>{userInitials}</span>
            </div>
          </div>
        </div>

        <div className="chat-messages-body">
          {channelMessages.length === 0 && (
            <div className="chat-empty">
              <MessageSquare size={32} style={{ color: 'var(--text3)' }} />
              <p>No messages yet. Start the conversation.</p>
            </div>
          )}
          {channelMessages.map((msg) => {
            const date = new Date(msg.createdAt);
            const dateStr = date.toLocaleDateString('en', { month: 'long', day: 'numeric', year: 'numeric' });
            return (
              <div key={msg.id} className="chat-message">
                <div className="chat-msg-avatar">{msg.author?.[0]?.toUpperCase() || '?'}</div>
                <div className="chat-msg-content">
                  <div className="chat-msg-header">
                    <span className="chat-msg-author">{msg.author}</span>
                    <span className="chat-msg-time">{date.toLocaleString('en', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                  </div>
                  <p className="chat-msg-text">{msg.text}</p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEnd} />
        </div>

        <div className="chat-input-section">
          <div className="chat-input-label">Create meeting</div>
          <div className="chat-rich-toolbar">
            <button className="chat-toolbar-btn" title="Bold"><Bold size={15} /></button>
            <button className="chat-toolbar-btn" title="Italic"><Italic size={15} /></button>
            <button className="chat-toolbar-btn" title="Underline"><Underline size={15} /></button>
            <button className="chat-toolbar-btn" title="Strikethrough"><Strikethrough size={15} /></button>
            <button className="chat-toolbar-btn" title="Link"><Link size={15} /></button>
            <button className="chat-toolbar-btn" title="Voice"><Mic size={15} /></button>
            <button className="chat-toolbar-btn" title="Video"><Video size={15} /></button>
            <button className="chat-toolbar-btn" title="Emoji"><Smile size={15} /></button>
            <button className="chat-toolbar-btn" title="Attach"><Paperclip size={15} /></button>
          </div>
          <div className="chat-input-bar">
            <input value={newMsg} onChange={(e) => setNewMsg(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Start typing here..." />
            <button className="chat-send-btn" onClick={handleSend} disabled={!newMsg.trim()}>
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Right sidebar — channel details */}
      <div className="chat-detail-sidebar">
        <div className="chat-detail-section">
          <div className="chat-detail-label">Channel</div>
          <h3 className="chat-detail-name">#{activeCh?.name || 'Channel'}</h3>
        </div>

        <div className="chat-detail-actions">
          <button className="chat-detail-action-btn">
            <ListTodo size={14} /> Open tasks
            <span className="chat-detail-action-badge">0</span>
          </button>
          <button className="chat-detail-action-btn">
            <StickyNote size={14} /> Notes
            <span className="chat-detail-action-badge"><Lock size={10} /></span>
          </button>
          <button className="chat-detail-action-btn">
            <Lock size={14} /> Safe Box
            <span className="chat-detail-action-badge"><Lock size={10} /></span>
          </button>
        </div>

        <div className="chat-detail-info">
          <div className="chat-detail-row">
            <span className="chat-detail-row-label">Created on</span>
            <span className="chat-detail-row-value">
              {activeCh ? new Date(activeCh.createdAt).toLocaleDateString('en', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }) : '—'}
            </span>
          </div>
        </div>

        <div className="chat-detail-section">
          <div className="chat-detail-section-header">
            <span>Attachments</span>
            <span className="chat-badge">0</span>
          </div>
        </div>

        <div className="chat-detail-section">
          <div className="chat-detail-section-header">
            <span>Participants</span>
          </div>
          <div className="chat-detail-participants">
            <span className="chat-participant-avatar">{userInitials}</span>
            <span className="chat-participant-avatar" style={{ background: 'var(--primary)' }}>{userInitials}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
