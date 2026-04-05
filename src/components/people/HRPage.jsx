import { useState, useMemo } from 'react';
import { Search, UserPlus, Building } from 'lucide-react';
import { usePeopleStore } from '../../store/people-store';
import { useContactsStore } from '../../store/contacts-store';
import { EMPLOYMENT_TYPES, getDisplayName } from '../../data/contact-config';
import { EMPLOYEE_STATUSES } from '../../data/people-departments';
import EmployeeCard from './EmployeeCard';
import AddEmployeeModal from './AddEmployeeModal';
import AddDepartmentModal from './AddDepartmentModal';
import DetailPanel from './DetailPanel';
import TimesheetTab from './TimesheetTab';
import SalariesTab from './SalariesTab';
import StatsTab from './StatsTab';
import OrganizationTab from './OrganizationTab';
import './HRPage.css';

const HR_TABS = [
  { id: 'employees',    label: 'Employees' },
  { id: 'timesheet',    label: 'Timesheet' },
  { id: 'salaries',     label: 'Salaries' },
  { id: 'stats',        label: 'Stats' },
  { id: 'organization', label: 'Organization' },
];

export default function HRPage() {
  const peopleEmployees = usePeopleStore((s) => s.employees);
  const departments     = usePeopleStore((s) => s.departments);
  const contacts        = useContactsStore((s) => s.contacts);
  const selectContact   = useContactsStore((s) => s.selectContact);
  const panelOpen       = useContactsStore((s) => s.panelOpen);

  // Merge people-store employees + contacts-store employee-type contacts
  const employees = useMemo(() => {
    const fromPeople = peopleEmployees.map((e) => ({
      ...e,
      _source: 'people',
    }));
    const fromContacts = contacts
      .filter((c) => c.contactType === 'employee' && c.status !== 'archived')
      .map((c) => ({
        id: c.id,
        name: getDisplayName(c),
        email: c.email || '',
        phone: c.phone || '',
        role: c.jobTitle || '',
        department: c.departmentId || '',
        employmentType: c.employmentType || 'full_time',
        startDate: c.startDate || c.createdAt?.slice(0, 10) || '',
        status: c.status === 'active' ? 'active' : c.status || 'active',
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
        avatarColor: c.avatarColor,
        firstName: c.firstName,
        lastName: c.lastName,
        _source: 'contacts',
      }));
    // Deduplicate by id
    const seen = new Set();
    const merged = [];
    for (const e of [...fromPeople, ...fromContacts]) {
      if (!seen.has(e.id)) {
        seen.add(e.id);
        merged.push(e);
      }
    }
    return merged;
  }, [peopleEmployees, contacts]);

  const [activeTab, setActiveTab]   = useState('employees');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deptFilter, setDeptFilter] = useState('all');
  const [search, setSearch]         = useState('');
  const [showAddEmp, setShowAddEmp] = useState(false);
  const [showAddDept, setShowAddDept] = useState(false);

  // Stats
  const activeEmps = employees.filter((e) => e.status === 'active');
  const ftCount = activeEmps.filter((e) => e.employmentType === 'full_time' || !e.employmentType).length;
  const ptCount = activeEmps.filter((e) => e.employmentType === 'part_time').length;
  const contractCount = activeEmps.filter((e) => e.employmentType === 'contract').length;

  const deptMap = useMemo(() => {
    const m = {};
    departments.forEach((d) => { m[d.id] = d; });
    return m;
  }, [departments]);

  const filtered = useMemo(() => {
    let list = employees;

    if (typeFilter !== 'all') {
      list = list.filter((e) => (e.employmentType || 'full_time') === typeFilter);
    }
    if (statusFilter !== 'all') {
      list = list.filter((e) => e.status === statusFilter);
    }
    if (deptFilter !== 'all') {
      list = list.filter((e) => e.department === deptFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((e) =>
        (e.name || '').toLowerCase().includes(q) ||
        (e.email || '').toLowerCase().includes(q) ||
        (e.role || '').toLowerCase().includes(q)
      );
    }
    return list;
  }, [employees, typeFilter, statusFilter, deptFilter, search]);

  // Unique departments that have employees
  const usedDepts = useMemo(() => {
    const ids = new Set(employees.map((e) => e.department).filter(Boolean));
    return departments.filter((d) => ids.has(d.id));
  }, [employees, departments]);

  const handleSelectEmployee = (id) => {
    selectContact(id);
  };

  return (
    <div className="hr-page">
      {/* Stats Banner */}
      <div className="hr-stats-banner">
        <div className="hr-stat">
          <span className="hr-stat__value">{employees.length}</span>
          <span className="hr-stat__label">Total Headcount</span>
        </div>
        <div className="hr-stat">
          <span className="hr-stat__value">{ftCount}</span>
          <span className="hr-stat__label">Full Time</span>
        </div>
        <div className="hr-stat">
          <span className="hr-stat__value">{ptCount}</span>
          <span className="hr-stat__label">Part Time</span>
        </div>
        <div className="hr-stat">
          <span className="hr-stat__value">{contractCount}</span>
          <span className="hr-stat__label">Contract</span>
        </div>
        <div className="hr-stat">
          <span className="hr-stat__value">{departments.length}</span>
          <span className="hr-stat__label">Departments</span>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="hr-subtabs">
        {HR_TABS.map((tab) => (
          <button
            key={tab.id}
            className={`hr-subtab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}

        <div className="hr-subtabs__actions">
          <div className="hr-search">
            <Search size={14} className="hr-search__icon" />
            <input
              className="hr-search__input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
            />
          </div>
          <button className="hr-action-btn" onClick={() => setShowAddEmp(true)}>
            <UserPlus size={14} /> + Add an Employee
          </button>
          <button className="hr-action-btn hr-action-btn--secondary" onClick={() => setShowAddDept(true)}>
            <Building size={14} /> + Add Department
          </button>
        </div>
      </div>

      {/* Employees tab content */}
      {activeTab === 'employees' && (
        <div className="hr-employees-layout">
          {/* Sidebar filters */}
          <aside className="hr-filters">
            <div className="hr-filter-group">
              <div className="hr-filter-group__title">By Type</div>
              <label className="hr-filter-radio">
                <input type="radio" name="type" checked={typeFilter === 'all'} onChange={() => setTypeFilter('all')} />
                All
              </label>
              {EMPLOYMENT_TYPES.map((t) => (
                <label key={t.id} className="hr-filter-radio">
                  <input type="radio" name="type" checked={typeFilter === t.id} onChange={() => setTypeFilter(t.id)} />
                  {t.label}
                </label>
              ))}
            </div>

            <div className="hr-filter-group">
              <div className="hr-filter-group__title">By Status</div>
              <label className="hr-filter-radio">
                <input type="radio" name="status" checked={statusFilter === 'all'} onChange={() => setStatusFilter('all')} />
                All
              </label>
              {EMPLOYEE_STATUSES.map((s) => (
                <label key={s.id} className="hr-filter-radio">
                  <input type="radio" name="status" checked={statusFilter === s.id} onChange={() => setStatusFilter(s.id)} />
                  {s.label}
                </label>
              ))}
            </div>

            {usedDepts.length > 0 && (
              <div className="hr-filter-group">
                <div className="hr-filter-group__title">By Department</div>
                <label className="hr-filter-radio">
                  <input type="radio" name="dept" checked={deptFilter === 'all'} onChange={() => setDeptFilter('all')} />
                  All
                </label>
                {usedDepts.map((d) => (
                  <label key={d.id} className="hr-filter-radio">
                    <input type="radio" name="dept" checked={deptFilter === d.id} onChange={() => setDeptFilter(d.id)} />
                    {d.name}
                  </label>
                ))}
              </div>
            )}
          </aside>

          {/* Employee grid */}
          <div className="hr-employees-grid">
            {filtered.length === 0 ? (
              <div className="hr-empty">
                <p>No employees found.</p>
                <button className="hr-empty__cta" onClick={() => setShowAddEmp(true)}>
                  + Add an Employee
                </button>
              </div>
            ) : (
              filtered.map((emp) => (
                <EmployeeCard
                  key={emp.id}
                  employee={emp}
                  department={deptMap[emp.department]}
                  onClick={() => handleSelectEmployee(emp.id)}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* Timesheet tab */}
      {activeTab === 'timesheet' && (
        <TimesheetTab employees={employees} onSelectEmployee={handleSelectEmployee} />
      )}

      {/* Salaries tab */}
      {activeTab === 'salaries' && (
        <SalariesTab employees={employees} onSelectEmployee={handleSelectEmployee} />
      )}

      {/* Stats tab */}
      {activeTab === 'stats' && (
        <StatsTab employees={employees} />
      )}

      {/* Organization tab */}
      {activeTab === 'organization' && (
        <OrganizationTab employees={employees} />
      )}

      {showAddEmp && <AddEmployeeModal onClose={() => setShowAddEmp(false)} />}
      {showAddDept && <AddDepartmentModal onClose={() => setShowAddDept(false)} />}
      {panelOpen && <DetailPanel />}
    </div>
  );
}
