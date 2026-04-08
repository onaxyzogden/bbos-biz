import { create } from 'zustand';
import { safeGetJSON, safeSet } from '../services/storage';
import { genExpenseId, genInvoiceId, genCategoryId, genBudgetId, genLineItemId, genVendorId, genAccountId, genIncomeId, genAssetId } from '../services/id';
import { PRESET_CATEGORIES } from '../data/money-categories';

// Persistence helpers
function persistExpenses(expenses) { safeSet('expenses', expenses); }
function persistInvoices(invoices) { safeSet('invoices', invoices); }
function persistCategories(categories) { safeSet('categories', categories); }
function persistBudgets(budgets) { safeSet('budgets', budgets); }
function persistCounter(n) { safeSet('inv_counter', n); }
function persistVendors(vendors) { safeSet('money_vendors', vendors); }
function persistAccounts(accounts) { safeSet('money_accounts', accounts); }
function persistIncomes(incomes) { safeSet('money_incomes', incomes); }
function persistAssets(assets) { safeSet('money_assets', assets); }

// Initialize categories — presets on first load
function initCategories() {
  const stored = safeGetJSON('categories', null);
  if (stored) return stored;
  persistCategories(PRESET_CATEGORIES);
  return [...PRESET_CATEGORIES];
}

// Utility
export function getInvoiceTotal(invoice) {
  return (invoice?.lineItems || []).reduce((sum, li) => {
    const qty = li.quantity || 0;
    const price = li.unitPrice || 0;
    const discount = li.discount || 0;
    const tax = li.tax || 0;
    const base = qty * price;
    const afterDiscount = base * (1 - discount / 100);
    return sum + afterDiscount * (1 + tax / 100);
  }, 0);
}

export function formatCurrency(amount, currency = 'CAD') {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency }).format(amount || 0);
}

export const useMoneyStore = create((set, get) => ({
  expenses: safeGetJSON('expenses', []),
  invoices: safeGetJSON('invoices', []),
  categories: initCategories(),
  budgets: safeGetJSON('budgets', []),
  invoiceCounter: Number(safeGetJSON('inv_counter', 0)) || 0,
  vendors: safeGetJSON('money_vendors', []),
  accounts: safeGetJSON('money_accounts', []),
  incomes: safeGetJSON('money_incomes', []),
  assets: safeGetJSON('money_assets', []),

  // ── Expenses ──
  addExpense: (data) => {
    const expense = {
      id: genExpenseId(),
      amount: Number(data.amount) || 0,
      categoryId: data.categoryId || '',
      date: data.date || new Date().toISOString().slice(0, 10),
      description: data.description || '',
      vendorId: data.vendorId || '',
      payee: data.payee || '',
      paymentMethod: data.paymentMethod || 'other',
      note: data.note || data.receiptNotes || '',
      status: data.status || 'unpaid',
      dueDate: data.dueDate || '',
      datePaid: data.datePaid || null,
      currency: data.currency || 'CAD',
      tags: data.tags || [],
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

  markExpensePaid: (id) => set((s) => {
    const expenses = s.expenses.map((e) =>
      e.id === id ? { ...e, status: 'paid', datePaid: new Date().toISOString().slice(0, 10), updatedAt: new Date().toISOString() } : e
    );
    persistExpenses(expenses);
    return { expenses };
  }),

  markExpenseUnpaid: (id) => set((s) => {
    const expenses = s.expenses.map((e) =>
      e.id === id ? { ...e, status: 'unpaid', datePaid: null, updatedAt: new Date().toISOString() } : e
    );
    persistExpenses(expenses);
    return { expenses };
  }),

  // ── Invoices ──
  addInvoice: (data) => {
    const counter = get().invoiceCounter + 1;
    const invoice = {
      id: genInvoiceId(),
      number: 'INV-' + String(counter).padStart(3, '0'),
      clientName: data.clientName || '',
      clientEmail: data.clientEmail || '',
      date: data.date || new Date().toISOString().slice(0, 10),
      dueDate: data.dueDate || '',
      turnoverDate: data.turnoverDate || '',
      status: data.status || 'draft',
      lineItems: (data.lineItems || []).map((li) => ({
        id: li.id || genLineItemId(),
        description: li.description || '',
        quantity: Number(li.quantity) || 0,
        unitPrice: Number(li.unitPrice) || 0,
        discount: Number(li.discount) || 0,
        tax: Number(li.tax) || 0,
      })),
      notes: data.notes || '',
      currency: data.currency || 'CAD',
      language: data.language || 'en',
      discountTotal: Number(data.discountTotal) || 0,
      paymentAccountId: data.paymentAccountId || '',
      paymentNote: data.paymentNote || '',
      isRecurring: data.isRecurring || false,
      termsAndConditions: data.termsAndConditions || '',
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

  // ── Vendors ──
  addVendor: ({ name, website }) => {
    const vendor = {
      id: genVendorId(),
      name: name || '',
      website: website || '',
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    set((s) => {
      const vendors = [...s.vendors, vendor];
      persistVendors(vendors);
      return { vendors };
    });
    return vendor;
  },

  updateVendor: (id, updates) => set((s) => {
    const vendors = s.vendors.map((v) =>
      v.id === id ? { ...v, ...updates, updatedAt: new Date().toISOString() } : v
    );
    persistVendors(vendors);
    return { vendors };
  }),

  deleteVendor: (id) => set((s) => {
    const vendors = s.vendors.filter((v) => v.id !== id);
    persistVendors(vendors);
    return { vendors };
  }),

  // ── Accounts ──
  addAccount: (data) => {
    const account = {
      id: genAccountId(),
      bankName: data.bankName || '',
      accountNumber: data.accountNumber || '',
      currency: data.currency || 'CAD',
      currentBalance: Number(data.currentBalance) || 0,
      availableBalance: Number(data.availableBalance) || 0,
      reservedBalance: Number(data.reservedBalance) || 0,
      iban: data.iban || '',
      swift: data.swift || '',
      dateOpened: data.dateOpened || '',
      isPayroll: data.isPayroll || false,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    set((s) => {
      const accounts = [...s.accounts, account];
      persistAccounts(accounts);
      return { accounts };
    });
    return account;
  },

  updateAccount: (id, updates) => set((s) => {
    const accounts = s.accounts.map((a) =>
      a.id === id ? { ...a, ...updates, updatedAt: new Date().toISOString() } : a
    );
    persistAccounts(accounts);
    return { accounts };
  }),

  deleteAccount: (id) => set((s) => {
    const accounts = s.accounts.filter((a) => a.id !== id);
    persistAccounts(accounts);
    return { accounts };
  }),

  // ── Incomes ──
  addIncome: (data) => {
    const income = {
      id: genIncomeId(),
      fromType: data.fromType || 'client',
      fromName: data.fromName || '',
      amount: Number(data.amount) || 0,
      currency: data.currency || 'CAD',
      date: data.date || new Date().toISOString().slice(0, 10),
      accountId: data.accountId || '',
      description: data.description || '',
      createdAt: new Date().toISOString(),
    };
    set((s) => {
      const incomes = [...s.incomes, income];
      persistIncomes(incomes);
      return { incomes };
    });
    return income;
  },

  updateIncome: (id, updates) => set((s) => {
    const incomes = s.incomes.map((i) =>
      i.id === id ? { ...i, ...updates, updatedAt: new Date().toISOString() } : i
    );
    persistIncomes(incomes);
    return { incomes };
  }),

  deleteIncome: (id) => set((s) => {
    const incomes = s.incomes.filter((i) => i.id !== id);
    persistIncomes(incomes);
    return { incomes };
  }),

  // ── Assets ──
  addAsset: (data) => {
    const asset = {
      id: genAssetId(),
      name: data.name || '',
      category: data.category || 'Other',
      purchaseDate: data.purchaseDate || '',
      purchasePrice: Number(data.purchasePrice) || 0,
      currentValue: Number(data.currentValue) || 0,
      currency: data.currency || 'CAD',
      notes: data.notes || '',
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    set((s) => {
      const assets = [...s.assets, asset];
      persistAssets(assets);
      return { assets };
    });
    return asset;
  },

  updateAsset: (id, updates) => set((s) => {
    const assets = s.assets.map((a) =>
      a.id === id ? { ...a, ...updates, updatedAt: new Date().toISOString() } : a
    );
    persistAssets(assets);
    return { assets };
  }),

  deleteAsset: (id) => set((s) => {
    const assets = s.assets.filter((a) => a.id !== id);
    persistAssets(assets);
    return { assets };
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
