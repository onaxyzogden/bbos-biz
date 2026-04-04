import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { usePeopleStore, getInitials } from '../../store/people-store';
import { ATTENDANCE_STATUSES } from '../../data/people-departments';

export default function TeamInsights() {
  const employees = usePeopleStore((s) => s.employees);
  const attendance = usePeopleStore((s) => s.attendance);
  const timeEntries = usePeopleStore((s) => s.timeEntries);
  const departments = usePeopleStore((s) => s.departments);

  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const prefix = `${year}-${String(month).padStart(2, '0')}`;
  const monthLabel = new Date(year, month - 1).toLocaleDateString('en', { month: 'long', year: 'numeric' });

  const prev = () => { if (month === 1) { setMonth(12); setYear(year - 1); } else setMonth(month - 1); };
  const next = () => { if (month === 12) { setMonth(1); setYear(year + 1); } else setMonth(month + 1); };

  const activeEmps = useMemo(() => employees.filter((e) => e.status === 'active'), [employees]);
  const deptMap = useMemo(() => { const m = {}; departments.forEach((d) => { m[d.id] = d; }); return m; }, [departments]);

  const monthAttendance = useMemo(() => attendance.filter((a) => a.date?.startsWith(prefix)), [attendance, prefix]);
  const monthTime = useMemo(() => timeEntries.filter((t) => t.date?.startsWith(prefix)), [timeEntries, prefix]);

  // Summary stats
  const totalActive = activeEmps.length;
  const attendanceRate = useMemo(() => {
    if (monthAttendance.length === 0) return '—';
    const presentLike = monthAttendance.filter((a) => a.status === 'present' || a.status === 'late' || a.status === 'half-day').length;
    return Math.round((presentLike / monthAttendance.length) * 100) + '%';
  }, [monthAttendance]);

  const avgHoursWeek = useMemo(() => {
    if (activeEmps.length === 0 || monthTime.length === 0) return '—';
    const totalHours = monthTime.reduce((s, t) => s + (t.hours || 0), 0);
    const weeks = 4.33; // approximate weeks in a month
    return (totalHours / activeEmps.length / weeks).toFixed(1);
  }, [activeEmps, monthTime]);

  // Attendance breakdown
  const attBreakdown = useMemo(() => {
    const counts = {};
    ATTENDANCE_STATUSES.forEach((s) => { counts[s.id] = 0; });
    monthAttendance.forEach((a) => { if (counts[a.status] !== undefined) counts[a.status]++; });
    const max = Math.max(...Object.values(counts), 1);
    return ATTENDANCE_STATUSES.map((s) => ({ ...s, count: counts[s.id] || 0, pct: ((counts[s.id] || 0) / max) * 100 }));
  }, [monthAttendance]);

  // Department headcount
  const deptBreakdown = useMemo(() => {
    const counts = {};
    activeEmps.forEach((e) => { counts[e.department] = (counts[e.department] || 0) + 1; });
    const max = Math.max(...Object.values(counts), 1);
    return Object.entries(counts).map(([deptId, count]) => {
      const dept = deptMap[deptId];
      return { name: dept?.name || 'Other', color: dept?.color || '#6b7280', count, pct: (count / max) * 100 };
    }).sort((a, b) => b.count - a.count);
  }, [activeEmps, deptMap]);

  // Top contributors by hours
  const topContributors = useMemo(() => {
    const byEmp = {};
    monthTime.forEach((t) => { byEmp[t.employeeId] = (byEmp[t.employeeId] || 0) + (t.hours || 0); });
    return Object.entries(byEmp)
      .map(([empId, hours]) => ({ emp: employees.find((e) => e.id === empId), hours }))
      .filter((e) => e.emp)
      .sort((a, b) => b.hours - a.hours)
      .slice(0, 5);
  }, [monthTime, employees]);

  if (employees.length === 0) {
    return <div className="needs-employees"><Users size={40} /><p>Add employees in the Directory tab first.</p></div>;
  }

  return (
    <div>
      {/* Month nav */}
      <div className="report-month-nav">
        <button className="btn btn-ghost" onClick={prev}><ChevronLeft size={16} /></button>
        <span className="report-month-label">{monthLabel}</span>
        <button className="btn btn-ghost" onClick={next}><ChevronRight size={16} /></button>
      </div>

      {/* Summary cards */}
      <div className="report-summary-cards" style={{ marginBottom: 'var(--space-5)' }}>
        {[
          { label: 'Active Employees', value: totalActive },
          { label: 'Attendance Rate', value: attendanceRate },
          { label: 'Avg Hours/Week', value: avgHoursWeek },
          { label: 'Team Size', value: employees.length },
        ].map((s, i) => (
          <div key={i} className="report-card">
            <p className="report-card-label">{s.label}</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Attendance breakdown */}
      <div className="report-section" style={{ marginBottom: 'var(--space-5)' }}>
        <h4 className="report-section-title">Attendance Breakdown</h4>
        <div className="report-bars">
          {attBreakdown.map((s) => (
            <div key={s.id} className="report-bar-row">
              <div className="report-bar-label"><span className="cat-dot" style={{ background: s.color }} /><span>{s.label}</span></div>
              <div className="report-bar-track"><div className="report-bar-fill" style={{ width: `${s.pct}%`, background: s.color }} /></div>
              <span className="amount report-bar-amount">{s.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Department breakdown */}
      <div className="report-section" style={{ marginBottom: 'var(--space-5)' }}>
        <h4 className="report-section-title">Department Headcount</h4>
        <div className="report-bars">
          {deptBreakdown.map((d, i) => (
            <div key={i} className="report-bar-row">
              <div className="report-bar-label"><span className="cat-dot" style={{ background: d.color }} /><span>{d.name}</span></div>
              <div className="report-bar-track"><div className="report-bar-fill" style={{ width: `${d.pct}%`, background: d.color }} /></div>
              <span className="amount report-bar-amount">{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top contributors */}
      {topContributors.length > 0 && (
        <div className="report-section">
          <h4 className="report-section-title">Top Contributors (Hours)</h4>
          <table className="money-table">
            <thead><tr><th>#</th><th>Employee</th><th style={{ textAlign: 'right' }}>Hours</th></tr></thead>
            <tbody>
              {topContributors.map((c, i) => {
                const dept = deptMap[c.emp.department];
                return (
                  <tr key={c.emp.id}>
                    <td style={{ fontWeight: 600, color: 'var(--text3)', width: 30 }}>{i + 1}</td>
                    <td>
                      <div className="emp-name-cell">
                        <div className="emp-avatar" style={{ background: dept?.color || 'var(--text3)', width: 26, height: 26, fontSize: '0.6rem' }}>{getInitials(c.emp.name)}</div>
                        <span style={{ fontWeight: 500 }}>{c.emp.name}</span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }} className="amount">{c.hours.toFixed(1)}h</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
