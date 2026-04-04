import { useState } from 'react';
import { X } from 'lucide-react';
import { usePeopleStore } from '../../store/people-store';
import { EMPLOYEE_STATUSES, DEFAULT_LEAVE_BALANCE } from '../../data/people-departments';

export default function EmployeeForm({ employee, onClose }) {
  const departments = usePeopleStore((s) => s.departments);
  const addEmployee = usePeopleStore((s) => s.addEmployee);
  const updateEmployee = usePeopleStore((s) => s.updateEmployee);
  const isEdit = !!employee;

  const [name, setName] = useState(employee?.name || '');
  const [email, setEmail] = useState(employee?.email || '');
  const [phone, setPhone] = useState(employee?.phone || '');
  const [role, setRole] = useState(employee?.role || '');
  const [department, setDepartment] = useState(employee?.department || '');
  const [startDate, setStartDate] = useState(employee?.startDate || new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState(employee?.status || 'active');
  const [notes, setNotes] = useState(employee?.notes || '');
  const [annual, setAnnual] = useState(employee?.leaveBalance?.annual ?? DEFAULT_LEAVE_BALANCE.annual);
  const [sick, setSick] = useState(employee?.leaveBalance?.sick ?? DEFAULT_LEAVE_BALANCE.sick);
  const [personal, setPersonal] = useState(employee?.leaveBalance?.personal ?? DEFAULT_LEAVE_BALANCE.personal);

  const canSave = name.trim() && role.trim() && department;

  const handleSave = () => {
    if (!canSave) return;
    const data = { name, email, phone, role, department, startDate, status, notes, leaveBalance: { annual: Number(annual), sick: Number(sick), personal: Number(personal) } };
    if (isEdit) updateEmployee(employee.id, data);
    else addEmployee(data);
    onClose();
  };

  return (
    <div className="expense-form-overlay">
      <div className="expense-form-modal">
        <div className="expense-form-header">
          <h3>{isEdit ? 'Edit Employee' : 'New Employee'}</h3>
          <button className="expense-form-close" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="expense-form-body">
          <div className="expense-form-row">
            <div className="expense-form-field" style={{ flex: 1 }}><label>Name *</label><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" autoFocus /></div>
            <div className="expense-form-field" style={{ flex: 1 }}><label>Role *</label><input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Job title" /></div>
          </div>
          <div className="expense-form-row">
            <div className="expense-form-field" style={{ flex: 1 }}><label>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@company.com" /></div>
            <div className="expense-form-field" style={{ flex: 1 }}><label>Phone</label><input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" /></div>
          </div>
          <div className="expense-form-row">
            <div className="expense-form-field" style={{ flex: 1 }}>
              <label>Department *</label>
              <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                <option value="">Select...</option>
                {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div className="expense-form-field" style={{ flex: 1 }}><label>Start Date</label><input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></div>
          </div>
          <div className="expense-form-field">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              {EMPLOYEE_STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>
          <div className="expense-form-field"><label>Notes</label><textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional notes..." rows={2} /></div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text2)', marginBottom: 'var(--space-2)' }}>Annual Leave Balance</label>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <div className="expense-form-field" style={{ flex: 1 }}><label>Annual</label><input type="number" min="0" value={annual} onChange={(e) => setAnnual(e.target.value)} /></div>
              <div className="expense-form-field" style={{ flex: 1 }}><label>Sick</label><input type="number" min="0" value={sick} onChange={(e) => setSick(e.target.value)} /></div>
              <div className="expense-form-field" style={{ flex: 1 }}><label>Personal</label><input type="number" min="0" value={personal} onChange={(e) => setPersonal(e.target.value)} /></div>
            </div>
          </div>
        </div>
        <div className="expense-form-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={!canSave} style={{ opacity: canSave ? 1 : 0.4, background: 'var(--mod-people)' }}>
            {isEdit ? 'Save Changes' : 'Add Employee'}
          </button>
        </div>
      </div>
    </div>
  );
}
