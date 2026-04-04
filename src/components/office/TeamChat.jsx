import { useState, useMemo, useRef, useEffect } from 'react';
import { Plus, Send, Hash, Trash2, MessageSquare } from 'lucide-react';
import { useOfficeStore } from '../../store/office-store';
import { useAuthStore } from '../../store/auth-store';
import './TeamChat.css';

export default function TeamChat() {
  const channels = useOfficeStore((s) => s.channels);
  const messages = useOfficeStore((s) => s.messages);
  const addChannel = useOfficeStore((s) => s.addChannel);
  const deleteChannel = useOfficeStore((s) => s.deleteChannel);
  const addMessage = useOfficeStore((s) => s.addMessage);
  const deleteMessage = useOfficeStore((s) => s.deleteMessage);
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

  return (
    <div className="chat-layout">
      {/* Channel sidebar */}
      <div className="chat-channels">
        <div className="chat-channels-header">
          <span>Channels</span>
          <button className="row-action-btn" onClick={() => setShowNewChannel(true)} title="New channel"><Plus size={14} /></button>
        </div>
        {channels.map((ch) => (
          <button key={ch.id} className={`chat-channel ${activeChannel === ch.id ? 'active' : ''}`}
            onClick={() => setActiveChannel(ch.id)}>
            <Hash size={14} /> {ch.name}
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

      {/* Messages area */}
      <div className="chat-messages-area">
        <div className="chat-messages-header">
          <Hash size={16} style={{ color: 'var(--mod-office)' }} />
          <span className="chat-channel-name">{activeCh?.name || 'Select a channel'}</span>
          {activeCh?.description && <span className="chat-channel-desc">{activeCh.description}</span>}
        </div>

        <div className="chat-messages-body">
          {channelMessages.length === 0 && (
            <div className="chat-empty">
              <MessageSquare size={32} style={{ color: 'var(--text3)' }} />
              <p>No messages yet. Start the conversation.</p>
            </div>
          )}
          {channelMessages.map((msg) => (
            <div key={msg.id} className="chat-message">
              <div className="chat-msg-avatar">{msg.author?.[0]?.toUpperCase() || '?'}</div>
              <div className="chat-msg-content">
                <div className="chat-msg-header">
                  <span className="chat-msg-author">{msg.author}</span>
                  <span className="chat-msg-time">{new Date(msg.createdAt).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="chat-msg-text">{msg.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEnd} />
        </div>

        <div className="chat-input-bar">
          <input value={newMsg} onChange={(e) => setNewMsg(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder={`Message #${activeCh?.name || 'channel'}...`} />
          <button className="chat-send-btn" onClick={handleSend} disabled={!newMsg.trim()}>
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
