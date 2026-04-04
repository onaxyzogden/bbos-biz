import { create } from 'zustand';
import { safeGetJSON, safeSet } from '../services/storage';
import { genEmployeeId, genAttendanceId, genLeaveRequestId, genTimeEntryId } from '../services/id';
import { PRESET_DEPARTMENTS, DEFAULT_LEAVE_BALANCE } from '../data/people-departments';

// Persistence helpers
function persistEmployees(data) { safeSet('people_employees', data); }
function persistAttendance(data) { safeSet('people_attendance', data); }
function persistLeaves(data) { safeSet('people_leaves', data); }
function persistTime(data) { safeSet('people_time', data); }
function persistDepartments(data) { safeSet('people_departments', data); }

function initDepartments() {
  const stored = safeGetJSON('people_departments', null);
  if (stored) return stored;
  persistDepartments(PRESET_DEPARTMENTS);
  return [...PRESET_DEPARTMENTS];
}

// Utility
export function getInitials(name) {
  const parts = (name || '').trim().split(/\s+/);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || '?';
  return ((parts[0][0] || '') + (parts[parts.length - 1][0] || '')).toUpperCase() || '?';
}

export const usePeopleStore = create((set, get) => ({
  employees: safeGetJSON('people_employees', []),
  attendance: safeGetJSON('people_attendance', []),
  leaveRequests: safeGetJSON('people_leaves', []),
  timeEntries: safeGetJSON('people_time', []),
  departments: initDepartments(),

  // ── Employees ──
  addEmployee: ({ name, email, phone, role, department, startDate, status, notes, leaveBalance }) => {
    const emp = {
      id: genEmployeeId(),
      name: name || '',
      email: email || '',
      phone: phone || '',
      role: role || '',
      department: department || '',
      startDate: startDate || new Date().toISOString().slice(0, 10),
      status: status || 'active',
      leaveBalance: leaveBalance || { ...DEFAULT_LEAVE_BALANCE },
      notes: notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((s) => { const employees = [...s.employees, emp]; persistEmployees(employees); return { employees }; });
    return emp;
  },

  updateEmployee: (id, updates) => set((s) => {
    const employees = s.employees.map((e) => e.id === id ? { ...e, ...updates, updatedAt: new Date().toISOString() } : e);
    persistEmployees(employees);
    return { employees };
  }),

  deleteEmployee: (id) => set((s) => {
    const employees = s.employees.filter((e) => e.id !== id);
    const attendance = s.attendance.filter((a) => a.employeeId !== id);
    const leaveRequests = s.leaveRequests.filter((r) => r.employeeId !== id);
    const timeEntries = s.timeEntries.filter((t) => t.employeeId !== id);
    persistEmployees(employees); persistAttendance(attendance);
    persistLeaves(leaveRequests); persistTime(timeEntries);
    return { employees, attendance, leaveRequests, timeEntries };
  }),

  // ── Attendance ──
  setDayAttendance: (date, records) => set((s) => {
    let attendance = [...s.attendance];
    for (const rec of records) {
      const idx = attendance.findIndex((a) => a.employeeId === rec.employeeId && a.date === date);
      if (idx >= 0) {
        attendance[idx] = { ...attendance[idx], ...rec, date };
      } else {
        attendance.push({
          id: genAttendanceId(),
          employeeId: rec.employeeId,
          date,
          status: rec.status || 'present',
          checkIn: rec.checkIn || null,
          checkOut: rec.checkOut || null,
          notes: rec.notes || '',
          createdAt: new Date().toISOString(),
        });
      }
    }
    persistAttendance(attendance);
    return { attendance };
  }),

  // ── Leave Requests ──
  addLeaveRequest: ({ employeeId, type, startDate, endDate, reason }) => {
    const req = {
      id: genLeaveRequestId(),
      employeeId, type: type || 'annual',
      startDate: startDate || '', endDate: endDate || '',
      reason: reason || '', status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((s) => { const leaveRequests = [...s.leaveRequests, req]; persistLeaves(leaveRequests); return { leaveRequests }; });
    return req;
  },

  updateLeaveRequest: (id, updates) => set((s) => {
    const leaveRequests = s.leaveRequests.map((r) => r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString() } : r);
    persistLeaves(leaveRequests);
    return { leaveRequests };
  }),

  deleteLeaveRequest: (id) => set((s) => {
    const leaveRequests = s.leaveRequests.filter((r) => r.id !== id);
    persistLeaves(leaveRequests);
    return { leaveRequests };
  }),

  setLeaveStatus: (id, status) => set((s) => {
    const leaveRequests = s.leaveRequests.map((r) => r.id === id ? { ...r, status, updatedAt: new Date().toISOString() } : r);
    persistLeaves(leaveRequests);
    return { leaveRequests };
  }),

  // ── Time Entries ──
  addTimeEntry: ({ employeeId, date, hours, project, description }) => {
    const entry = {
      id: genTimeEntryId(),
      employeeId, date: date || new Date().toISOString().slice(0, 10),
      hours: Number(hours) || 0, project: project || '', description: description || '',
      createdAt: new Date().toISOString(),
    };
    set((s) => { const timeEntries = [...s.timeEntries, entry]; persistTime(timeEntries); return { timeEntries }; });
    return entry;
  },

  updateTimeEntry: (id, updates) => set((s) => {
    const timeEntries = s.timeEntries.map((t) => t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t);
    persistTime(timeEntries);
    return { timeEntries };
  }),

  deleteTimeEntry: (id) => set((s) => {
    const timeEntries = s.timeEntries.filter((t) => t.id !== id);
    persistTime(timeEntries);
    return { timeEntries };
  }),

  // ── Departments ──
  addDepartment: ({ name, color }) => {
    const dept = { id: 'dept_' + Date.now(), name, color: color || '#6b7280', isPreset: false };
    set((s) => { const departments = [...s.departments, dept]; persistDepartments(departments); return { departments }; });
    return dept;
  },

  deleteDepartment: (id) => set((s) => {
    const departments = s.departments.filter((d) => d.id !== id || d.isPreset);
    const employees = s.employees.map((e) => e.department === id ? { ...e, department: '' } : e);
    persistDepartments(departments); persistEmployees(employees);
    return { departments, employees };
  }),
}));
