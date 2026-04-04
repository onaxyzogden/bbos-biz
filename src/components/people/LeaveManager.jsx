import { useState, useMemo } from 'react';
import { Plus, CalendarOff, Check, X, Users } from 'lucide-react';
import { usePeopleStore, getInitials } from '../../store/people-store';
import { LEAVE_TYPES } from '../../data/people-departments';

const STATUS_FILTERS = ['all', 'pending', 'approved', 'rejected'];

function countDays(start, end) {
  if (!start || !end) return 0;
  const s = new Date(start), e = new Date(end);
  let count = 0;
  const d = new Date(s);
  while (d <= e) { const dow = d.getDay(); if (dow !== 0 && dow !== 6) count++; d.setDate(d.getDate() + 1); }
  return count;
}

export default function LeaveManager() {
  const employees = usePeopleStore((s) => s.employees);
  const leaveRequests = usePeopleStore((s) => s.leaveRequests);
  const departments = usePeopleStore((s) => s.departments);
  const addLeaveRequest = usePeopleStore((s) => s.addLeaveRequest);
  const deleteLeaveRequest = usePeopleStore((s) => s.deleteLeaveRequest);
  const setLeaveStatus = usePeopleStore((s) => s.setLeaveStatus);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [empId, setEmpId] = useState('');
  const [leaveType, setLeaveType] = useState('annual');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const empMap = useMemo(() => { const m = {}; employees.forEach((e) => { m[e.id] = e; }); return m; }, [employees]);
  const deptMap = useMemo(() => { const m = {}; departments.forEach((d) => { m[d.id] = d; }); return m; }, [departments]);

  const filtered = useMemo(() => {
    return leaveRequests
      .filter((r) => statusFilter === 'all' || r.status === statusFilter)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [leaveRequests, statusFilter]);

  const activeEmps = useMemo(() => employees.filter((e) => e.status === 'active'), [employees]);

  if (employees.length === 0) {
    return <div className="needs-employees"><Users size={40} /><p>Add employees in the Directory tab first.</p></div>;
  }

  const handleAdd = () => {
    if (!empId || !startDate || !endDate) return;
    addLeaveRequest({ employeeId: empId, type: leaveType, startDate, endDate, reason });
    setShowForm(false); setEmpId(''); setStartDate(''); setEndDate(''); setReason('');
  };

  const ltMap = {}; LEAVE_TYPES.forEach((t) => { ltMap[t.id] = t; });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
          {STATUS_FILTERS.map((sf) => (
            <button key={sf} className={`cat-filter-pill ${statusFilter === sf ? 'active' : ''}`}
              onClick={() => setStatusFilter(sf)} style={{ textTransform: 'capitalize' }}>{sf}</button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)} style={{ background: 'var(--mod-people)' }}>
          <Plus size={16} /> Request Leave
        </button>
      </div>

      {filtered.length === 0 && !showForm ? (
        <div className="money-empty">
          <CalendarOff size={40} className="money-empty-icon" />
          <h4>No leave requests</h4>
          <p>Submit a leave request to get started.</p>
        </div>
      ) : (
        <table className="money-table">
          <thead><tr><th>Employee</th><th>Type</th><th>Start</th><th>End</th><th>Days</th><th>Status</th><th style={{ width: 100 }} /></tr></thead>
          <tbody>
            {filtered.map((req) => {
              const emp = empMap[req.employeeId];
              const lt = ltMap[req.type];
              const dept = emp ? deptMap[emp.department] : null;
              const days = countDays(req.startDate, req.endDate);
              return (
                <tr key={req.id}>
                  <td>
                    <div className="emp-name-cell">
                      <div className="emp-avatar" style={{ background: dept?.color || 'var(--text3)' }}>{getInitials(emp?.name)}</div>
                      <span style={{ fontWeight: 500 }}>{emp?.name || 'Unknown'}</span>
                    </div>
                  </td>
                  <td><span className="cat-pill" style={{ background: (lt?.color || '#6b7280') + '15', color: lt?.color || '#6b7280' }}>{lt?.label || req.type}</span></td>
                  <td>{req.startDate ? new Date(req.startDate).toLocaleDateString('en', { month: 'short', day: 'numeric' }) : '—'}</td>
                  <td>{req.endDate ? new Date(req.endDate).toLocaleDateString('en', { month: 'short', day: 'numeric' }) : '—'}</td>
                  <td className="amount">{days}</td>
                  <td><span className={`status-badge status-${req.status}`}>{req.status}</span></td>
                  <td>
                    <div className="row-actions" style={{ opacity: 1 }}>
                      {req.status === 'pending' && <>
                        <button className="row-action-btn" onClick={() => setLeaveStatus(req.id, 'approved')} title="Approve" style={{ color: 'var(--success)' }}><Check size={14} /></button>
                        <button className="row-action-btn danger" onClick={() => setLeaveStatus(req.id, 'rejected')} title="Reject"><X size={14} /></button>
                      </>}
                      <button className="row-action-btn danger" onClick={() => { if (confirm('Delete?')) deleteLeaveRequest(req.id); }} title="Delete">×</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {showForm && (
        <div className="expense-form-overlay">
          <div className="expense-form-modal" style={{ maxWidth: 460 }}>
            <div className="expense-form-header"><h3>Request Leave</h3><button className="expense-form-close" onClick={() => setShowForm(false)}><X size={18} /></button></div>
            <div className="expense-form-body">
              <div className="expense-form-field"><label>Employee *</label><select value={empId} onChange={(e) => setEmpId(e.target.value)}><option value="">Select...</option>{activeEmps.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}</select></div>
              <div className="expense-form-field"><label>Leave Type</label><select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>{LEAVE_TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}</select></div>
              <div className="expense-form-row">
                <div className="expense-form-field" style={{ flex: 1 }}><label>Start Date *</label><input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></div>
                <div className="expense-form-field" style={{ flex: 1 }}><label>End Date *</label><input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} /></div>
              </div>
              {startDate && endDate && <p style={{ fontSize: '0.8rem', color: 'var(--text2)' }}>{countDays(startDate, endDate)} business day(s)</p>}
              <div className="expense-form-field"><label>Reason</label><textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason for leave..." rows={2} /></div>
            </div>
            <div className="expense-form-footer">
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAdd} disabled={!empId || !startDate || !endDate} style={{ background: 'var(--mod-people)', opacity: empId && startDate && endDate ? 1 : 0.4 }}>Submit Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
