import { create } from 'zustand';
import { safeGetJSON, safeSet } from '../services/storage';
import { genChannelId, genMessageId, genEventId, genDocumentId, genQAId, genAnswerId } from '../services/id';

function persistChannels(d) { safeSet('office_channels', d); }
function persistMessages(d) { safeSet('office_messages', d); }
function persistEvents(d) { safeSet('office_events', d); }
function persistDocuments(d) { safeSet('office_documents', d); }
function persistQA(d) { safeSet('office_qa', d); }

const DEFAULT_CHANNELS = [
  { id: 'chn_general', name: 'General', description: 'Company-wide announcements and discussion', isDefault: true, createdAt: new Date().toISOString() },
  { id: 'chn_random', name: 'Random', description: 'Off-topic conversations', isDefault: true, createdAt: new Date().toISOString() },
];

function initChannels() {
  const stored = safeGetJSON('office_channels', null);
  if (stored) return stored;
  persistChannels(DEFAULT_CHANNELS);
  return [...DEFAULT_CHANNELS];
}

export const useOfficeStore = create((set, get) => ({
  channels: initChannels(),
  messages: safeGetJSON('office_messages', []),
  events: safeGetJSON('office_events', []),
  documents: safeGetJSON('office_documents', []),
  qaItems: safeGetJSON('office_qa', []),

  // ── Channels ──
  addChannel: ({ name, description }) => {
    const ch = { id: genChannelId(), name: name || 'New Channel', description: description || '', isDefault: false, createdAt: new Date().toISOString() };
    set((s) => { const channels = [...s.channels, ch]; persistChannels(channels); return { channels }; });
    return ch;
  },
  deleteChannel: (id) => set((s) => {
    const channels = s.channels.filter((c) => c.id !== id || c.isDefault);
    const messages = s.messages.filter((m) => m.channelId !== id);
    persistChannels(channels); persistMessages(messages);
    return { channels, messages };
  }),

  // ── Messages ──
  addMessage: ({ channelId, text, author }) => {
    const msg = { id: genMessageId(), channelId, text: text || '', author: author || 'You', createdAt: new Date().toISOString() };
    set((s) => { const messages = [...s.messages, msg]; persistMessages(messages); return { messages }; });
    return msg;
  },
  deleteMessage: (id) => set((s) => {
    const messages = s.messages.filter((m) => m.id !== id);
    persistMessages(messages); return { messages };
  }),

  // ── Events ──
  addEvent: ({ title, date, startTime, endTime, description, location }) => {
    const evt = {
      id: genEventId(), title: title || '', date: date || new Date().toISOString().slice(0, 10),
      startTime: startTime || '09:00', endTime: endTime || '10:00',
      description: description || '', location: location || '',
      createdAt: new Date().toISOString(),
    };
    set((s) => { const events = [...s.events, evt]; persistEvents(events); return { events }; });
    return evt;
  },
  updateEvent: (id, updates) => set((s) => {
    const events = s.events.map((e) => e.id === id ? { ...e, ...updates } : e);
    persistEvents(events); return { events };
  }),
  deleteEvent: (id) => set((s) => {
    const events = s.events.filter((e) => e.id !== id);
    persistEvents(events); return { events };
  }),

  // ── Documents ──
  addDocument: ({ name, type, content, folder }) => {
    const doc = {
      id: genDocumentId(), name: name || 'Untitled', type: type || 'note',
      content: content || '', folder: folder || 'General',
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    };
    set((s) => { const documents = [...s.documents, doc]; persistDocuments(documents); return { documents }; });
    return doc;
  },
  updateDocument: (id, updates) => set((s) => {
    const documents = s.documents.map((d) => d.id === id ? { ...d, ...updates, updatedAt: new Date().toISOString() } : d);
    persistDocuments(documents); return { documents };
  }),
  deleteDocument: (id) => set((s) => {
    const documents = s.documents.filter((d) => d.id !== id);
    persistDocuments(documents); return { documents };
  }),

  // ── Q&A ──
  addQuestion: ({ title, body, author }) => {
    const qa = {
      id: genQAId(), title: title || '', body: body || '', author: author || 'You',
      answers: [], resolved: false,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    };
    set((s) => { const qaItems = [...s.qaItems, qa]; persistQA(qaItems); return { qaItems }; });
    return qa;
  },
  addAnswer: (qaId, { text, author }) => set((s) => {
    const qaItems = s.qaItems.map((q) => {
      if (q.id !== qaId) return q;
      return { ...q, answers: [...q.answers, { id: genAnswerId(), text, author: author || 'You', createdAt: new Date().toISOString() }], updatedAt: new Date().toISOString() };
    });
    persistQA(qaItems); return { qaItems };
  }),
  toggleResolved: (qaId) => set((s) => {
    const qaItems = s.qaItems.map((q) => q.id === qaId ? { ...q, resolved: !q.resolved, updatedAt: new Date().toISOString() } : q);
    persistQA(qaItems); return { qaItems };
  }),
  deleteQuestion: (id) => set((s) => {
    const qaItems = s.qaItems.filter((q) => q.id !== id);
    persistQA(qaItems); return { qaItems };
  }),
}));
