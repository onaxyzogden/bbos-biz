import { create } from 'zustand';
import { safeGetJSON, safeSet, safeRemove } from '../services/storage';
import { genExpenseId, genInvoiceId, genCategoryId, genBudgetId, genLineItemId } from '../services/id';
import { PRESET_CATEGORIES } from '../data/money-categories';

// Persistence helpers
function persistExpenses(expenses) { safeSet('expenses', expenses); }
function persistInvoices(invoices) { safeSet('invoices', invoices); }
function persistCategories(categories) { safeSet('categories', categories); }
function persistBudgets(budgets) { safeSet('budgets', budgets); }
function persistCounter(n) { safeSet('inv_counter', n); }

// Initialize categories — presets on first load
function initCategories() {
  const stored = safeGetJSON('categories', null);
  if (stored) return stored;
  persistCategories(PRESET_CATEGORIES);
  return [...PRESET_CATEGORIES];
}

// Utility
export function getInvoiceTotal(invoice) {
  return (invoice?.lineItems || []).reduce((sum, li) => sum + (li.quantity || 0) * (li.unitPrice || 0), 0);
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount || 0);
}

export const useMoneyStore = create((set, get) => ({
  expenses: safeGetJSON('expenses', []),
  invoices: safeGetJSON('invoices', []),
  categories: initCategories(),
  budgets: safeGetJSON('budgets', []),
  invoiceCounter: Number(safeGetJSON('inv_counter', 0)) || 0,

  // ── Expenses ──
  addExpense: ({ amount, categoryId, date, description, payee, paymentMethod, receiptNotes }) => {
    const expense = {
      id: genExpenseId(),
      amount: Number(amount) || 0,
      categoryId: categoryId || '',
      date: date || new Date().toISOString().slice(0, 10),
      description: description || '',
      payee: payee || '',
      paymentMethod: paymentMethod || 'other',
      receiptNotes: receiptNotes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((s) => {
      const expenses = [...s.expenses, expense];
      persistExpenses(expenses);
      return { expenses };
    });
    return expense;
  },

  updateExpense: (id, updates) => set((s) => {
    const expenses = s.expenses.map((e) =>
      e.id === id ? { ...e, ...updates, updatedAt: new Date().toISOString() } : e
    );
    persistExpenses(expenses);
    return { expenses };
  }),

  deleteExpense: (id) => set((s) => {
    const expenses = s.expenses.filter((e) => e.id !== id);
    persistExpenses(expenses);
    return { expenses };
  }),

  // ── Invoices ──
  addInvoice: ({ clientName, clientEmail, date, dueDate, lineItems, notes }) => {
    const counter = get().invoiceCounter + 1;
    const invoice = {
      id: genInvoiceId(),
      number: 'INV-' + String(counter).padStart(3, '0'),
      clientName: clientName || '',
      clientEmail: clientEmail || '',
      date: date || new Date().toISOString().slice(0, 10),
      dueDate: dueDate || '',
      status: 'draft',
      lineItems: (lineItems || []).map((li) => ({
        id: li.id || genLineItemId(),
        description: li.description || '',
        quantity: Number(li.quantity) || 0,
        unitPrice: Number(li.unitPrice) || 0,
      })),
      notes: notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      paidAt: null,
    };
    persistCounter(counter);
    set((s) => {
      const invoices = [...s.invoices, invoice];
      persistInvoices(invoices);
      return { invoices, invoiceCounter: counter };
    });
    return invoice;
  },

  updateInvoice: (id, updates) => set((s) => {
    const invoices = s.invoices.map((inv) =>
      inv.id === id ? { ...inv, ...updates, updatedAt: new Date().toISOString() } : inv
    );
    persistInvoices(invoices);
    return { invoices };
  }),

  deleteInvoice: (id) => set((s) => {
    const invoices = s.invoices.filter((inv) => inv.id !== id);
    persistInvoices(invoices);
    return { invoices };
  }),

  setInvoiceStatus: (id, status) => set((s) => {
    const invoices = s.invoices.map((inv) => {
      if (inv.id !== id) return inv;
      return {
        ...inv,
        status,
        paidAt: status === 'paid' ? new Date().toISOString() : inv.paidAt,
        updatedAt: new Date().toISOString(),
      };
    });
    persistInvoices(invoices);
    return { invoices };
  }),

  // ── Categories ──
  addCategory: ({ name, color }) => {
    const cat = {
      id: genCategoryId(),
      name: name || 'New Category',
      color: color || '#6b7280',
      isPreset: false,
    };
    set((s) => {
      const categories = [...s.categories, cat];
      persistCategories(categories);
      return { categories };
    });
    return cat;
  },

  updateCategory: (id, updates) => set((s) => {
    const categories = s.categories.map((c) =>
      c.id === id && !c.isPreset ? { ...c, ...updates } : c
    );
    persistCategories(categories);
    return { categories };
  }),

  deleteCategory: (id) => set((s) => {
    const categories = s.categories.filter((c) => c.id !== id || c.isPreset);
    persistCategories(categories);
    return { categories };
  }),

  // ── Budgets ──
  addBudget: ({ categoryId, monthlyLimit }) => {
    const budget = {
      id: genBudgetId(),
      categoryId,
      monthlyLimit: Number(monthlyLimit) || 0,
      createdAt: new Date().toISOString(),
    };
    set((s) => {
      const budgets = [...s.budgets, budget];
      persistBudgets(budgets);
      return { budgets };
    });
    return budget;
  },

  updateBudget: (id, updates) => set((s) => {
    const budgets = s.budgets.map((b) =>
      b.id === id ? { ...b, ...updates } : b
    );
    persistBudgets(budgets);
    return { budgets };
  }),

  deleteBudget: (id) => set((s) => {
    const budgets = s.budgets.filter((b) => b.id !== id);
    persistBudgets(budgets);
    return { budgets };
  }),

  // ── Report getters ──
  getMonthlyExpenses: (year, month) => {
    const prefix = `${year}-${String(month).padStart(2, '0')}`;
    return get().expenses.filter((e) => e.date?.startsWith(prefix));
  },

  getPnL: (year, month) => {
    const prefix = `${year}-${String(month).padStart(2, '0')}`;
    const expenses = get().expenses.filter((e) => e.date?.startsWith(prefix));
    const paidInvoices = get().invoices.filter((inv) =>
      inv.status === 'paid' && inv.paidAt?.startsWith(prefix)
    );
    const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
    const totalIncome = paidInvoices.reduce((sum, inv) => sum + getInvoiceTotal(inv), 0);
    return { income: totalIncome, expenses: totalExpenses, profit: totalIncome - totalExpenses };
  },
}));
