import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Save, Users } from 'lucide-react';
import { usePeopleStore, getInitials } from '../../store/people-store';
import { ATTENDANCE_STATUSES } from '../../data/people-departments';
import './AttendanceView.css';

export default function AttendanceView() {
  const employees = usePeopleStore((s) => s.employees);
  const attendance = usePeopleStore((s) => s.attendance);
  const departments = usePeopleStore((s) => s.departments);
  const setDayAttendance = usePeopleStore((s) => s.setDayAttendance);

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [localRecords, setLocalRecords] = useState(null);
  const [saved, setSaved] = useState(false);

  const activeEmps = useMemo(() => employees.filter((e) => e.status === 'active'), [employees]);
  const deptMap = useMemo(() => { const m = {}; departments.forEach((d) => { m[d.id] = d; }); return m; }, [departments]);

  const dayRecords = useMemo(() => {
    return activeEmps.map((emp) => {
      const existing = attendance.find((a) => a.employeeId === emp.id && a.date === selectedDate);
      return {
        employeeId: emp.id, name: emp.name, department: emp.department,
        status: existing?.status || 'present',
        checkIn: existing?.checkIn || '',
        checkOut: existing?.checkOut || '',
        notes: existing?.notes || '',
      };
    });
  }, [activeEmps, attendance, selectedDate]);

  const records = localRecords || dayRecords;

  const updateRecord = (empId, field, value) => {
    setSaved(false);
    setLocalRecords((prev) => (prev || dayRecords).map((r) => r.employeeId === empId ? { ...r, [field]: value } : r));
  };

  const markAll = (newStatus) => {
    setSaved(false);
    setLocalRecords((localRecords || dayRecords).map((r) => ({ ...r, status: newStatus })));
  };

  // Reset local when date changes
  const changeDate = (offset) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + offset);
    setSelectedDate(d.toISOString().slice(0, 10));
    setLocalRecords(null);
    setSaved(false);
  };

  const handleSave = () => {
    setDayAttendance(selectedDate, records);
    setSaved(true);
    setLocalRecords(null);
  };

  if (activeEmps.length === 0) {
    return <div className="needs-employees"><Users size={40} /><p>Add employees in the Directory tab first.</p></div>;
  }

  const dateLabel = new Date(selectedDate + 'T12:00:00').toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div>
      <div className="att-date-nav">
        <button className="btn btn-ghost" onClick={() => changeDate(-1)}><ChevronLeft size={16} /></button>
        <span className="att-date-label">{dateLabel}</span>
        <button className="btn btn-ghost" onClick={() => changeDate(1)}><ChevronRight size={16} /></button>
        <button className="btn btn-ghost" onClick={() => { setSelectedDate(new Date().toISOString().slice(0, 10)); setLocalRecords(null); }} style={{ marginLeft: 'var(--space-2)', fontSize: '0.8rem' }}>Today</button>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
        <button className="btn btn-ghost" onClick={() => markAll('present')} style={{ fontSize: '0.8rem' }}>Mark All Present</button>
        <button className="btn btn-ghost" onClick={() => markAll('absent')} style={{ fontSize: '0.8rem' }}>Mark All Absent</button>
      </div>

      <table className="money-table">
        <thead><tr><th>Employee</th><th style={{ width: 130 }}>Status</th><th style={{ width: 100 }}>Check In</th><th style={{ width: 100 }}>Check Out</th><th>Notes</th></tr></thead>
        <tbody>
          {records.map((rec) => {
            const dept = deptMap[rec.department];
            return (
              <tr key={rec.employeeId}>
                <td>
                  <div className="emp-name-cell">
                    <div className="emp-avatar" style={{ background: dept?.color || 'var(--text3)' }}>{getInitials(rec.name)}</div>
                    <span style={{ fontWeight: 500 }}>{rec.name}</span>
                  </div>
                </td>
                <td>
                  <select value={rec.status} onChange={(e) => updateRecord(rec.employeeId, 'status', e.target.value)}
                    style={{ fontSize: '0.8rem', padding: '4px 8px', borderRadius: 'var(--radius-sm)', width: '100%' }}>
                    {ATTENDANCE_STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                </td>
                <td><input type="time" value={rec.checkIn} onChange={(e) => updateRecord(rec.employeeId, 'checkIn', e.target.value)} style={{ fontSize: '0.8rem', padding: '4px', width: '100%' }} /></td>
                <td><input type="time" value={rec.checkOut} onChange={(e) => updateRecord(rec.employeeId, 'checkOut', e.target.value)} style={{ fontSize: '0.8rem', padding: '4px', width: '100%' }} /></td>
                <td><input value={rec.notes} onChange={(e) => updateRecord(rec.employeeId, 'notes', e.target.value)} placeholder="Notes..." style={{ fontSize: '0.8rem', padding: '4px 8px', width: '100%', border: 'none', background: 'transparent' }} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-4)', gap: 'var(--space-2)' }}>
        {saved && <span style={{ color: 'var(--success)', fontSize: '0.85rem', alignSelf: 'center' }}>Saved ✓</span>}
        <button className="btn btn-primary" onClick={handleSave} style={{ background: 'var(--mod-people)' }}>
          <Save size={16} /> Save Day
        </button>
      </div>
    </div>
  );
}
