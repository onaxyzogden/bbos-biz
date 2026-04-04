import { useState, useMemo } from 'react';
import { Plus, Clock, ChevronLeft, ChevronRight, X, Users } from 'lucide-react';
import { usePeopleStore, getInitials } from '../../store/people-store';

function getMonday(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return d.toISOString().slice(0, 10);
}

function getWeekDates(mondayStr) {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(mondayStr + 'T12:00:00');
    d.setDate(d.getDate() + i);
    dates.push({ date: d.toISOString().slice(0, 10), label: d.toLocaleDateString('en', { weekday: 'short', day: 'numeric' }) });
  }
  return dates;
}

export default function TimeTracker() {
  const employees = usePeopleStore((s) => s.employees);
  const timeEntries = usePeopleStore((s) => s.timeEntries);
  const departments = usePeopleStore((s) => s.departments);
  const addTimeEntry = usePeopleStore((s) => s.addTimeEntry);
  const deleteTimeEntry = usePeopleStore((s) => s.deleteTimeEntry);

  const [view, setView] = useState('weekly');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [showForm, setShowForm] = useState(false);
  const [fEmpId, setFEmpId] = useState('');
  const [fDate, setFDate] = useState(selectedDate);
  const [fHours, setFHours] = useState('');
  const [fProject, setFProject] = useState('');
  const [fDesc, setFDesc] = useState('');

  const activeEmps = useMemo(() => employees.filter((e) => e.status === 'active'), [employees]);
  const deptMap = useMemo(() => { const m = {}; departments.forEach((d) => { m[d.id] = d; }); return m; }, [departments]);

  const monday = getMonday(selectedDate);
  const weekDates = useMemo(() => getWeekDates(monday), [monday]);

  // Weekly matrix: { [empId]: { [date]: totalHours } }
  const weeklyMatrix = useMemo(() => {
    const matrix = {};
    activeEmps.forEach((emp) => { matrix[emp.id] = {}; weekDates.forEach((wd) => { matrix[emp.id][wd.date] = 0; }); });
    timeEntries.forEach((te) => {
      if (matrix[te.employeeId] && matrix[te.employeeId][te.date] !== undefined) {
        matrix[te.employeeId][te.date] += (te.hours || 0);
      }
    });
    return matrix;
  }, [activeEmps, timeEntries, weekDates]);

  const changeWeek = (offset) => {
    const d = new Date(monday + 'T12:00:00');
    d.setDate(d.getDate() + offset * 7);
    setSelectedDate(d.toISOString().slice(0, 10));
  };

  if (employees.length === 0) {
    return <div className="needs-employees"><Users size={40} /><p>Add employees in the Directory tab first.</p></div>;
  }

  const handleAdd = () => {
    if (!fEmpId || !fHours) return;
    addTimeEntry({ employeeId: fEmpId, date: fDate, hours: Number(fHours), project: fProject, description: fDesc });
    setShowForm(false); setFEmpId(''); setFHours(''); setFProject(''); setFDesc('');
  };

  const weekLabel = `${new Date(weekDates[0].date + 'T12:00:00').toLocaleDateString('en', { month: 'short', day: 'numeric' })} — ${new Date(weekDates[6].date + 'T12:00:00').toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}`;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <button className="btn btn-ghost" onClick={() => changeWeek(-1)}><ChevronLeft size={16} /></button>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.95rem', minWidth: 220, textAlign: 'center' }}>{weekLabel}</span>
          <button className="btn btn-ghost" onClick={() => changeWeek(1)}><ChevronRight size={16} /></button>
        </div>
        <button className="btn btn-primary" onClick={() => { setFDate(selectedDate); setShowForm(true); }} style={{ background: 'var(--mod-people)' }}>
          <Plus size={16} /> Log Time
        </button>
      </div>

      {/* Weekly Matrix */}
      <div style={{ overflowX: 'auto' }}>
        <table className="money-table">
          <thead>
            <tr>
              <th>Employee</th>
              {weekDates.map((wd) => <th key={wd.date} style={{ textAlign: 'center', minWidth: 60 }}>{wd.label}</th>)}
              <th style={{ textAlign: 'center' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {activeEmps.map((emp) => {
              const dept = deptMap[emp.department];
              const empWeek = weeklyMatrix[emp.id] || {};
              const total = Object.values(empWeek).reduce((s, h) => s + h, 0);
              return (
                <tr key={emp.id}>
                  <td>
                    <div className="emp-name-cell">
                      <div className="emp-avatar" style={{ background: dept?.color || 'var(--text3)', width: 26, height: 26, fontSize: '0.6rem' }}>{getInitials(emp.name)}</div>
                      <span style={{ fontWeight: 500, fontSize: '0.85rem' }}>{emp.name}</span>
                    </div>
                  </td>
                  {weekDates.map((wd) => {
                    const hrs = empWeek[wd.date] || 0;
                    return (
                      <td key={wd.date} style={{ textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: hrs > 0 ? 'var(--text)' : 'var(--text3)' }}>
                        {hrs > 0 ? hrs.toFixed(1) : '—'}
                      </td>
                    );
                  })}
                  <td style={{ textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '0.85rem' }}>{total > 0 ? total.toFixed(1) : '—'}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td style={{ fontWeight: 600, fontSize: '0.8rem' }}>Daily Total</td>
              {weekDates.map((wd) => {
                const dayTotal = activeEmps.reduce((s, emp) => s + (weeklyMatrix[emp.id]?.[wd.date] || 0), 0);
                return <td key={wd.date} style={{ textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: '0.8rem' }}>{dayTotal > 0 ? dayTotal.toFixed(1) : '—'}</td>;
              })}
              <td style={{ textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '0.9rem' }}>
                {activeEmps.reduce((s, emp) => s + Object.values(weeklyMatrix[emp.id] || {}).reduce((ss, h) => ss + h, 0), 0).toFixed(1)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {showForm && (
        <div className="expense-form-overlay">
          <div className="expense-form-modal" style={{ maxWidth: 420 }}>
            <div className="expense-form-header"><h3>Log Time</h3><button className="expense-form-close" onClick={() => setShowForm(false)}><X size={18} /></button></div>
            <div className="expense-form-body">
              <div className="expense-form-field"><label>Employee *</label><select value={fEmpId} onChange={(e) => setFEmpId(e.target.value)}><option value="">Select...</option>{activeEmps.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}</select></div>
              <div className="expense-form-row">
                <div className="expense-form-field" style={{ flex: 1 }}><label>Date</label><input type="date" value={fDate} onChange={(e) => setFDate(e.target.value)} /></div>
                <div className="expense-form-field" style={{ flex: 1 }}><label>Hours *</label><input type="number" step="0.25" min="0.25" max="24" value={fHours} onChange={(e) => setFHours(e.target.value)} placeholder="8" /></div>
              </div>
              <div className="expense-form-field"><label>Project</label><input value={fProject} onChange={(e) => setFProject(e.target.value)} placeholder="Project name (optional)" /></div>
              <div className="expense-form-field"><label>Description</label><textarea value={fDesc} onChange={(e) => setFDesc(e.target.value)} placeholder="What was worked on..." rows={2} /></div>
            </div>
            <div className="expense-form-footer">
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAdd} disabled={!fEmpId || !fHours} style={{ background: 'var(--mod-people)', opacity: fEmpId && fHours ? 1 : 0.4 }}>Log Time</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
