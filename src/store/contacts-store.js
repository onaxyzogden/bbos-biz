import { create } from 'zustand';
import { safeGetJSON, safeSet } from '../services/storage';
import {
  genContactId, genCompanyId, genHRId, genAbsenceId,
  genClockInId, genSalaryId, genContactDocId,
} from '../services/id';
import { getAvatarColor, getDisplayName } from '../data/contact-config';
import { PRESET_DEPARTMENTS } from '../data/people-departments';

// ── Persistence helpers ──
const p = (key, val) => safeSet(key, val);

function initDepartments() {
  const stored = safeGetJSON('contacts_departments', null);
  if (stored) return stored;
  const depts = [...PRESET_DEPARTMENTS];
  p('contacts_departments', depts);
  return depts;
}

// ── Store ──
export const useContactsStore = create((set, get) => ({
  // Data
  contacts:      safeGetJSON('contacts_v2', []),
  companies:     safeGetJSON('contacts_companies', []),
  hrRecords:     safeGetJSON('contacts_hr', []),
  absenceRecords: safeGetJSON('contacts_absence', []),
  clockIns:      safeGetJSON('contacts_clockins', []),
  salaryRecords: safeGetJSON('contacts_salary', []),
  docRecords:    safeGetJSON('contacts_docs', []),
  departments:   initDepartments(),

  // UI state (ephemeral — not persisted)
  selectedContactId: null,
  detailTab: 'hr',
  panelOpen: false,
  editPanelOpen: false,
  viewMode: 'cards',
  clockInModalOpen: false,

  // ── UI Actions ──
  selectContact: (id) => set({ selectedContactId: id, panelOpen: !!id, detailTab: 'hr', editPanelOpen: false }),
  closePanel: () => set({ panelOpen: false, selectedContactId: null, editPanelOpen: false }),
  setDetailTab: (tab) => set({ detailTab: tab }),
  setViewMode: (mode) => set({ viewMode: mode }),
  openEditPanel: () => set({ editPanelOpen: true }),
  closeEditPanel: () => set({ editPanelOpen: false }),
  openClockInModal: () => set({ clockInModalOpen: true }),
  closeClockInModal: () => set({ clockInModalOpen: false }),

  // ── Contacts ──
  addContact: (data) => {
    const now = new Date().toISOString();
    const contact = {
      id: genContactId(),
      entityType:  data.entityType  || 'person',
      contactType: data.contactType || 'contact',
      status:      data.status      || 'active',
      firstName:   data.firstName   || '',
      lastName:    data.lastName    || '',
      displayName: data.displayName || '',
      gender:      data.gender      || '',
      dob:         data.dob         || '',
      nationality:    data.nationality    || '',
      maritalStatus:  data.maritalStatus  || '',
      ssn:            data.ssn            || '',
      children:       data.children       || null,
      email:         data.email       || '',
      phone:         data.phone       || '',
      privateEmail:  data.privateEmail || '',
      privatePhone:  data.privatePhone || '',
      address:       data.address     || '',
      companyId:  data.companyId  || '',
      jobTitle:   data.jobTitle   || '',
      avatarColor: getAvatarColor(genContactId()),
      // Lead fields
      leadSource:          data.leadSource          || '',
      leadStatus:          data.leadStatus          || 'unassigned',
      requestTitle:        data.requestTitle        || '',
      requestDescription:  data.requestDescription  || '',
      estimatedBudget:     data.estimatedBudget     || null,
      createdAt:  now,
      updatedAt:  now,
      createdBy:  data.createdBy || '',
    };
    set((s) => {
      const contacts = [...s.contacts, contact];
      p('contacts_v2', contacts);
      return { contacts };
    });
    return contact;
  },

  updateContact: (id, updates) => set((s) => {
    const contacts = s.contacts.map((c) =>
      c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
    );
    p('contacts_v2', contacts);
    return { contacts };
  }),

  deleteContact: (id) => set((s) => {
    const contacts     = s.contacts.filter((c) => c.id !== id);
    const hrRecords    = s.hrRecords.filter((r) => r.contactId !== id);
    const absenceRecords = s.absenceRecords.filter((a) => a.contactId !== id);
    const clockIns     = s.clockIns.filter((ci) => ci.contactId !== id);
    const salaryRecords = s.salaryRecords.filter((s2) => s2.contactId !== id);
    const docRecords   = s.docRecords.filter((d) => d.contactId !== id);
    p('contacts_v2', contacts);
    p('contacts_hr', hrRecords);
    p('contacts_absence', absenceRecords);
    p('contacts_clockins', clockIns);
    p('contacts_salary', salaryRecords);
    p('contacts_docs', docRecords);
    return { contacts, hrRecords, absenceRecords, clockIns, salaryRecords, docRecords };
  }),

  archiveContact: (id) => set((s) => {
    const contacts = s.contacts.map((c) =>
      c.id === id ? { ...c, status: 'archived', updatedAt: new Date().toISOString() } : c
    );
    p('contacts_v2', contacts);
    return { contacts };
  }),

  // ── Companies ──
  addCompany: (data) => {
    const now = new Date().toISOString();
    const company = {
      id:          genCompanyId(),
      name:        data.name        || '',
      description: data.description || '',
      industries:  data.industries  || [],
      website:     data.website     || '',
      email:       data.email       || '',
      phone:       data.phone       || '',
      address:     data.address     || '',
      logoColor:   data.logoColor   || getAvatarColor(genCompanyId()),
      status:      'active',
      createdAt:   now,
      updatedAt:   now,
      createdBy:   data.createdBy   || '',
    };
    set((s) => {
      const companies = [...s.companies, company];
      p('contacts_companies', companies);
      return { companies };
    });
    return company;
  },

  updateCompany: (id, updates) => set((s) => {
    const companies = s.companies.map((c) =>
      c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
    );
    p('contacts_companies', companies);
    return { companies };
  }),

  deleteCompany: (id) => set((s) => {
    const companies = s.companies.filter((c) => c.id !== id);
    // Clear companyId from associated contacts
    const contacts = s.contacts.map((c) =>
      c.companyId === id ? { ...c, companyId: '', updatedAt: new Date().toISOString() } : c
    );
    p('contacts_companies', companies);
    p('contacts_v2', contacts);
    return { companies, contacts };
  }),

  makeClient: (companyId) => set((s) => {
    const contacts = s.contacts.map((c) =>
      c.companyId === companyId
        ? { ...c, contactType: 'client', updatedAt: new Date().toISOString() }
        : c
    );
    p('contacts_v2', contacts);
    return { contacts };
  }),

  // ── HR Records ──
  addHRRecord: (data) => {
    const now = new Date().toISOString();
    const record = {
      id:                   genHRId(),
      contactId:            data.contactId            || '',
      employmentType:       data.employmentType       || '',
      hiringDate:           data.hiringDate           || '',
      departmentId:         data.departmentId         || '',
      officeLocation:       data.officeLocation       || '',
      contractEndDate:      data.contractEndDate      || '',
      superiorId:           data.superiorId           || '',
      workingPositionTitle: data.workingPositionTitle || '',
      backgroundCheckStatus: data.backgroundCheckStatus || '',
      createdAt: now,
      updatedAt: now,
    };
    set((s) => {
      const hrRecords = [...s.hrRecords, record];
      p('contacts_hr', hrRecords);
      return { hrRecords };
    });
    return record;
  },

  updateHRRecord: (id, updates) => set((s) => {
    const hrRecords = s.hrRecords.map((r) =>
      r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString() } : r
    );
    p('contacts_hr', hrRecords);
    return { hrRecords };
  }),

  // ── Absence Records ──
  addAbsence: (data) => {
    const now = new Date().toISOString();
    const record = {
      id:              genAbsenceId(),
      contactId:       data.contactId       || '',
      type:            data.type            || 'vacation',
      subType:         data.subType         || 'annual',
      startDate:       data.startDate       || '',
      endDate:         data.endDate         || '',
      days:            data.days            || 0,
      note:            data.note            || '',
      status:          data.status          || 'pending',
      restartCycleDate: data.restartCycleDate || '',
      vacationDaysTotal: data.vacationDaysTotal || 20,
      createdAt:  now,
      createdBy:  data.createdBy || '',
    };
    set((s) => {
      const absenceRecords = [...s.absenceRecords, record];
      p('contacts_absence', absenceRecords);
      return { absenceRecords };
    });
    return record;
  },

  updateAbsenceStatus: (id, status) => set((s) => {
    const absenceRecords = s.absenceRecords.map((a) =>
      a.id === id ? { ...a, status } : a
    );
    p('contacts_absence', absenceRecords);
    return { absenceRecords };
  }),

  deleteAbsence: (id) => set((s) => {
    const absenceRecords = s.absenceRecords.filter((a) => a.id !== id);
    p('contacts_absence', absenceRecords);
    return { absenceRecords };
  }),

  // ── Clock-In Records ──
  addClockIn: (data) => {
    const record = {
      id:           genClockInId(),
      contactId:    data.contactId    || '',
      clockInTime:  data.clockInTime  || new Date().toISOString(),
      clockOutTime: data.clockOutTime || null,
      location:     data.location     || 'office',
      description:  data.description  || '',
      breaks:        [],
      totalMinutes: null,
      createdAt:    new Date().toISOString(),
    };
    set((s) => {
      const clockIns = [...s.clockIns, record];
      p('contacts_clockins', clockIns);
      return { clockIns };
    });
    return record;
  },

  clockOut: (id) => set((s) => {
    const clockOutTime = new Date().toISOString();
    const clockIns = s.clockIns.map((ci) => {
      if (ci.id !== id) return ci;
      const startMs = new Date(ci.clockInTime).getTime();
      const endMs   = new Date(clockOutTime).getTime();
      const totalMinutes = Math.round((endMs - startMs) / 60000);
      return { ...ci, clockOutTime, totalMinutes };
    });
    p('contacts_clockins', clockIns);
    return { clockIns };
  }),

  deleteClockIn: (id) => set((s) => {
    const clockIns = s.clockIns.filter((ci) => ci.id !== id);
    p('contacts_clockins', clockIns);
    return { clockIns };
  }),

  // ── Salary Records ──
  addSalary: (data) => {
    const record = {
      id:            genSalaryId(),
      contactId:     data.contactId     || '',
      amount:        data.amount        || 0,
      currency:      data.currency      || 'USD',
      effectiveDate: data.effectiveDate || new Date().toISOString().slice(0, 10),
      type:          data.type          || 'base',
      note:          data.note          || '',
      bankName:      data.bankName      || '',
      bankAccount:   data.bankAccount   || '',
      createdAt:     new Date().toISOString(),
    };
    set((s) => {
      const salaryRecords = [...s.salaryRecords, record];
      p('contacts_salary', salaryRecords);
      return { salaryRecords };
    });
    return record;
  },

  updateSalary: (id, updates) => set((s) => {
    const salaryRecords = s.salaryRecords.map((r) =>
      r.id === id ? { ...r, ...updates } : r
    );
    p('contacts_salary', salaryRecords);
    return { salaryRecords };
  }),

  deleteSalary: (id) => set((s) => {
    const salaryRecords = s.salaryRecords.filter((r) => r.id !== id);
    p('contacts_salary', salaryRecords);
    return { salaryRecords };
  }),

  // ── Document Records ──
  addDoc: (data) => {
    const record = {
      id:        genContactDocId(),
      contactId: data.contactId || '',
      name:      data.name      || '',
      addedDate: data.addedDate || new Date().toISOString().slice(0, 10),
      status:    data.status    || 'pending',
      createdAt: new Date().toISOString(),
      createdBy: data.createdBy || '',
    };
    set((s) => {
      const docRecords = [...s.docRecords, record];
      p('contacts_docs', docRecords);
      return { docRecords };
    });
    return record;
  },

  updateDoc: (id, updates) => set((s) => {
    const docRecords = s.docRecords.map((d) =>
      d.id === id ? { ...d, ...updates } : d
    );
    p('contacts_docs', docRecords);
    return { docRecords };
  }),

  deleteDoc: (id) => set((s) => {
    const docRecords = s.docRecords.filter((d) => d.id !== id);
    p('contacts_docs', docRecords);
    return { docRecords };
  }),

  // ── Departments ──
  addDepartment: ({ name, color }) => {
    const dept = { id: 'dept_' + Date.now(), name, color: color || '#6b7280', isPreset: false };
    set((s) => {
      const departments = [...s.departments, dept];
      p('contacts_departments', departments);
      return { departments };
    });
    return dept;
  },

  // ── Computed Helpers (not stored in Zustand but available as getters) ──
  getContactById: (id) => get().contacts.find((c) => c.id === id) || null,
  getCompanyById: (id) => get().companies.find((c) => c.id === id) || null,
  getHRRecord: (contactId) => get().hrRecords.find((r) => r.contactId === contactId) || null,
  getContactAbsences: (contactId) => get().absenceRecords.filter((a) => a.contactId === contactId),
  getContactClockIns: (contactId) => get().clockIns.filter((ci) => ci.contactId === contactId),
  getContactSalaries: (contactId) => get().salaryRecords.filter((r) => r.contactId === contactId),
  getContactDocs: (contactId) => get().docRecords.filter((d) => d.contactId === contactId),
  getActiveClockIn: (contactId) =>
    get().clockIns.find((ci) => ci.contactId === contactId && !ci.clockOutTime) || null,
  getCompanyContacts: (companyId) =>
    get().contacts.filter((c) => c.companyId === companyId && c.status === 'active'),

  computeVacationStats: (contactId) => {
    const absences = get().absenceRecords.filter(
      (a) => a.contactId === contactId && a.type === 'vacation'
    );
    const available = 20; // default plan
    const usedApproved = absences
      .filter((a) => a.status === 'approved')
      .reduce((sum, a) => sum + (a.days || 0), 0);
    const pending = absences
      .filter((a) => a.status === 'pending')
      .reduce((sum, a) => sum + (a.days || 0), 0);
    const used = usedApproved;
    return { available, used, pending, remaining: Math.max(0, available - used) };
  },
}));
