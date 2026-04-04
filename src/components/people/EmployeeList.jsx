import { useState, useMemo } from 'react';
import { Plus, Users, Pencil, Trash2, Search } from 'lucide-react';
import { usePeopleStore, getInitials } from '../../store/people-store';
import EmployeeForm from './EmployeeForm';

export default function EmployeeList() {
  const employees = usePeopleStore((s) => s.employees);
  const departments = usePeopleStore((s) => s.departments);
  const deleteEmployee = usePeopleStore((s) => s.deleteEmployee);
  const [showForm, setShowForm] = useState(false);
  const [editingEmp, setEditingEmp] = useState(null);
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState(null);
  const [filterStatus, setFilterStatus] = useState(null);

  const deptMap = useMemo(() => { const m = {}; departments.forEach((d) => { m[d.id] = d; }); return m; }, [departments]);

  const filtered = useMemo(() => {
    let list = [...employees];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((e) => e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) || e.role.toLowerCase().includes(q));
    }
    if (filterDept) list = list.filter((e) => e.department === filterDept);
    if (filterStatus) list = list.filter((e) => e.status === filterStatus);
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [employees, search, filterDept, filterStatus]);

  const closeForm = () => { setShowForm(false); setEditingEmp(null); };

  if (employees.length === 0 && !showForm) {
    return (
      <div className="money-empty">
        <Users size={40} className="money-empty-icon" />
        <h4>No team members yet</h4>
        <p>Add your first employee to start managing your team.</p>
        <button className="btn btn-primary" onClick={() => setShowForm(true)} style={{ background: 'var(--mod-people)' }}>
          <Plus size={16} /> Add First Employee
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', flex: 1, minWidth: 200 }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: 260 }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)' }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search employees..."
              style={{ width: '100%', paddingLeft: 30, fontSize: '0.85rem', borderRadius: 'var(--radius)' }} />
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)} style={{ background: 'var(--mod-people)' }}>
          <Plus size={16} /> Add Employee
        </button>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
        <button className={`cat-filter-pill ${!filterDept && !filterStatus ? 'active' : ''}`}
          onClick={() => { setFilterDept(null); setFilterStatus(null); }}>All</button>
        {departments.slice(0, 6).map((d) => (
          <button key={d.id} className={`cat-filter-pill ${filterDept === d.id ? 'active' : ''}`}
            onClick={() => setFilterDept(filterDept === d.id ? null : d.id)}
            style={filterDept === d.id ? { background: d.color + '18', color: d.color, borderColor: d.color + '40' } : undefined}>
            <span className="cat-dot" style={{ background: d.color }} />{d.name}
          </button>
        ))}
      </div>

      <table className="money-table">
        <thead>
          <tr><th>Employee</th><th>Role</th><th>Department</th><th>Start Date</th><th>Status</th><th style={{ width: 60 }} /></tr>
        </thead>
        <tbody>
          {filtered.map((emp) => {
            const dept = deptMap[emp.department];
            return (
              <tr key={emp.id}>
                <td>
                  <div className="emp-name-cell">
                    <div className="emp-avatar" style={{ background: dept?.color || 'var(--text3)' }}>{getInitials(emp.name)}</div>
                    <div className="emp-name-text"><span>{emp.name}</span><span>{emp.email}</span></div>
                  </div>
                </td>
                <td>{emp.role || '—'}</td>
                <td>{dept ? <span className="cat-pill" style={{ background: dept.color + '15', color: dept.color }}><span className="cat-dot" style={{ background: dept.color }} />{dept.name}</span> : '—'}</td>
                <td>{emp.startDate ? new Date(emp.startDate).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}</td>
                <td><span className={`status-badge status-${emp.status}`}>{emp.status}</span></td>
                <td>
                  <div className="row-actions">
                    <button className="row-action-btn" onClick={() => { setEditingEmp(emp); setShowForm(true); }}><Pencil size={14} /></button>
                    <button className="row-action-btn danger" onClick={() => { if (confirm('Delete this employee?')) deleteEmployee(emp.id); }}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p style={{ fontSize: '0.8rem', color: 'var(--text3)', marginTop: 'var(--space-3)' }}>{filtered.length} employee{filtered.length !== 1 ? 's' : ''}</p>

      {showForm && <EmployeeForm employee={editingEmp} onClose={closeForm} />}
    </div>
  );
}
