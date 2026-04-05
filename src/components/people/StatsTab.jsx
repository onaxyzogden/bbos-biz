import { useMemo } from 'react';
import { useContactsStore } from '../../store/contacts-store';
import { usePeopleStore } from '../../store/people-store';
import { EMPLOYMENT_TYPES } from '../../data/contact-config';

function StatCard({ label, value, sub, color }) {
  return (
    <div style={{
      padding: 20, background: 'var(--surface)', borderRadius: 12,
      border: '1px solid var(--border)', textAlign: 'center',
    }}>
      <div style={{ fontSize: 28, fontWeight: 700, color: color || 'var(--text)', fontFamily: "'Space Grotesk', sans-serif" }}>
        {value}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function BarRow({ label, value, max, color }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 0' }}>
      <div style={{ width: 120, fontSize: 13, color: 'var(--text2)', flexShrink: 0 }}>{label}</div>
      <div style={{ flex: 1, height: 10, borderRadius: 5, background: 'var(--bg4)', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', borderRadius: 5, background: color || 'var(--mod-people)' }} />
      </div>
      <div style={{ width: 30, fontSize: 13, fontWeight: 600, color: 'var(--text)', textAlign: 'right' }}>{value}</div>
    </div>
  );
}

export default function StatsTab({ employees }) {
  const clockIns = useContactsStore((s) => s.clockIns);
  const salaryRecords = useContactsStore((s) => s.salaryRecords);
  const absenceRecords = useContactsStore((s) => s.absenceRecords);
  const departments = usePeopleStore((s) => s.departments);
  const hrRecords = useContactsStore((s) => s.hrRecords);

  const stats = useMemo(() => {
    const active = employees.filter((e) => e.status === 'active');
    const inactive = employees.filter((e) => e.status !== 'active');

    // By employment type
    const byType = {};
    EMPLOYMENT_TYPES.forEach((t) => { byType[t.id] = 0; });
    employees.forEach((e) => {
      const key = e.employmentType || 'full_time';
      byType[key] = (byType[key] || 0) + 1;
    });

    // By department
    const byDept = {};
    employees.forEach((e) => {
      const deptId = e.department || e.departmentId;
      if (deptId) {
        const dept = departments.find((d) => d.id === deptId);
        const name = dept?.name || deptId;
        byDept[name] = (byDept[name] || 0) + 1;
      }
    });

    // Clock-in stats
    const totalClockIns = clockIns.length;
    const completedClockIns = clockIns.filter((ci) => ci.totalMinutes != null);
    const avgWorkMinutes = completedClockIns.length
      ? Math.round(completedClockIns.reduce((s, ci) => s + ci.totalMinutes, 0) / completedClockIns.length)
      : 0;

    // Salary stats
    const baseSalaries = salaryRecords.filter((r) => r.type === 'base');
    const avgSalary = baseSalaries.length
      ? Math.round(baseSalaries.reduce((s, r) => s + r.amount, 0) / baseSalaries.length)
      : 0;
    const totalPayroll = baseSalaries.reduce((s, r) => s + r.amount, 0);

    // Absence stats
    const approvedAbsences = absenceRecords.filter((a) => a.status === 'approved');
    const totalAbsenceDays = approvedAbsences.reduce((s, a) => s + (a.days || 0), 0);

    return {
      total: employees.length,
      active: active.length,
      inactive: inactive.length,
      byType,
      byDept,
      totalClockIns,
      avgWorkMinutes,
      avgSalary,
      totalPayroll,
      totalAbsenceDays,
    };
  }, [employees, clockIns, salaryRecords, absenceRecords, departments]);

  const maxByType = Math.max(...Object.values(stats.byType), 1);
  const maxByDept = Math.max(...Object.values(stats.byDept), 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Overview cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
        <StatCard label="Total Employees" value={stats.total} />
        <StatCard label="Active" value={stats.active} color="#16a34a" />
        <StatCard label="Inactive" value={stats.inactive} color="#6b7280" />
        <StatCard label="Total Clock Ins" value={stats.totalClockIns} />
        <StatCard label="Avg Work Time" value={stats.avgWorkMinutes > 0 ? `${Math.floor(stats.avgWorkMinutes / 60)}h ${stats.avgWorkMinutes % 60}m` : '0h'} />
        <StatCard label="Absence Days" value={stats.totalAbsenceDays} sub="approved" />
      </div>

      {/* By employment type */}
      <div style={{
        padding: 20, background: 'var(--surface)', borderRadius: 12,
        border: '1px solid var(--border)',
      }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
          By Employment Type
        </div>
        {EMPLOYMENT_TYPES.map((t) => (
          <BarRow key={t.id} label={t.label} value={stats.byType[t.id] || 0} max={maxByType} />
        ))}
      </div>

      {/* By department */}
      {Object.keys(stats.byDept).length > 0 && (
        <div style={{
          padding: 20, background: 'var(--surface)', borderRadius: 12,
          border: '1px solid var(--border)',
        }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
            By Department
          </div>
          {Object.entries(stats.byDept)
            .sort((a, b) => b[1] - a[1])
            .map(([name, count]) => (
              <BarRow key={name} label={name} value={count} max={maxByDept} color="var(--accent)" />
            ))
          }
        </div>
      )}

      {/* Salary overview */}
      <div style={{
        padding: 20, background: 'var(--surface)', borderRadius: 12,
        border: '1px solid var(--border)',
      }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
          Salary Overview
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Avg. Base Salary</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginTop: 4 }}>
              {stats.avgSalary > 0 ? `$${stats.avgSalary.toLocaleString()}` : 'No data'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Total Payroll</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginTop: 4 }}>
              {stats.totalPayroll > 0 ? `$${stats.totalPayroll.toLocaleString()}` : 'No data'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
