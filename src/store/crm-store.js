import { create } from 'zustand';
import { safeGetJSON, safeSet } from '../services/storage';
import { genContactId, genDealId, genActivityId, genPipelineStageId } from '../services/id';

function persistContacts(d) { safeSet('crm_contacts', d); }
function persistDeals(d) { safeSet('crm_deals', d); }
function persistPipeline(d) { safeSet('crm_pipeline', d); }
function persistActivities(d) { safeSet('crm_activities', d); }

const DEFAULT_PIPELINE = [
  { id: 'pip_lead', name: 'Lead', color: '#6b7280' },
  { id: 'pip_qual', name: 'Qualified', color: '#3b82f6' },
  { id: 'pip_prop', name: 'Proposal', color: '#8b5cf6' },
  { id: 'pip_nego', name: 'Negotiation', color: '#f59e0b' },
  { id: 'pip_won', name: 'Won', color: '#22c55e' },
  { id: 'pip_lost', name: 'Lost', color: '#ef4444' },
];

export const CONTACT_TYPES = [
  { id: 'lead', label: 'Lead', color: '#6b7280' },
  { id: 'prospect', label: 'Prospect', color: '#3b82f6' },
  { id: 'client', label: 'Client', color: '#22c55e' },
  { id: 'partner', label: 'Partner', color: '#8b5cf6' },
  { id: 'other', label: 'Other', color: '#6b7280' },
];

export const ACTIVITY_TYPES = [
  { id: 'call', label: 'Call', icon: '📞' },
  { id: 'email', label: 'Email', icon: '✉️' },
  { id: 'meeting', label: 'Meeting', icon: '🤝' },
  { id: 'note', label: 'Note', icon: '📝' },
  { id: 'task', label: 'Task', icon: '✅' },
];

function initPipeline() {
  const stored = safeGetJSON('crm_pipeline', null);
  if (stored) return stored;
  persistPipeline(DEFAULT_PIPELINE);
  return [...DEFAULT_PIPELINE];
}

export const useCRMStore = create((set, get) => ({
  contacts: safeGetJSON('crm_contacts', []),
  deals: safeGetJSON('crm_deals', []),
  pipeline: initPipeline(),
  activities: safeGetJSON('crm_activities', []),

  // ── Contacts ──
  addContact: ({ name, email, phone, company, role, type, tags, notes }) => {
    const contact = {
      id: genContactId(), name: name || '', email: email || '', phone: phone || '',
      company: company || '', role: role || '', type: type || 'lead',
      tags: tags || [], notes: notes || '',
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    };
    set((s) => { const contacts = [...s.contacts, contact]; persistContacts(contacts); return { contacts }; });
    return contact;
  },
  updateContact: (id, updates) => set((s) => {
    const contacts = s.contacts.map((c) => c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c);
    persistContacts(contacts); return { contacts };
  }),
  deleteContact: (id) => set((s) => {
    const contacts = s.contacts.filter((c) => c.id !== id);
    const deals = s.deals.filter((d) => d.contactId !== id);
    const activities = s.activities.filter((a) => a.contactId !== id);
    persistContacts(contacts); persistDeals(deals); persistActivities(activities);
    return { contacts, deals, activities };
  }),

  // ── Deals ──
  addDeal: ({ name, contactId, value, stage, probability, expectedClose, notes }) => {
    const deal = {
      id: genDealId(), name: name || '', contactId: contactId || '',
      value: Number(value) || 0, stage: stage || get().pipeline[0]?.id || '',
      probability: Number(probability) || 50, expectedClose: expectedClose || '',
      notes: notes || '',
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    };
    set((s) => { const deals = [...s.deals, deal]; persistDeals(deals); return { deals }; });
    return deal;
  },
  updateDeal: (id, updates) => set((s) => {
    const deals = s.deals.map((d) => d.id === id ? { ...d, ...updates, updatedAt: new Date().toISOString() } : d);
    persistDeals(deals); return { deals };
  }),
  deleteDeal: (id) => set((s) => {
    const deals = s.deals.filter((d) => d.id !== id);
    persistDeals(deals); return { deals };
  }),
  moveDeal: (dealId, newStage) => set((s) => {
    const deals = s.deals.map((d) => d.id === dealId ? { ...d, stage: newStage, updatedAt: new Date().toISOString() } : d);
    persistDeals(deals); return { deals };
  }),

  // ── Activities ──
  addActivity: ({ contactId, dealId, type, description, date }) => {
    const activity = {
      id: genActivityId(), contactId: contactId || '', dealId: dealId || '',
      type: type || 'note', description: description || '',
      date: date || new Date().toISOString().slice(0, 10),
      createdAt: new Date().toISOString(),
    };
    set((s) => { const activities = [...s.activities, activity]; persistActivities(activities); return { activities }; });
    return activity;
  },
  deleteActivity: (id) => set((s) => {
    const activities = s.activities.filter((a) => a.id !== id);
    persistActivities(activities); return { activities };
  }),
}));

export function formatDealValue(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value || 0);
}
