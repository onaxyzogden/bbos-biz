import { useMemo } from 'react';
import { usePeopleStore } from '../../store/people-store';
import { useContactsStore } from '../../store/contacts-store';
import { getDisplayName } from '../../data/contact-config';
import AvatarInitials from './AvatarInitials';

function PersonNode({ emp, isRoot }) {
  const displayName = emp.name || [emp.firstName, emp.lastName].filter(Boolean).join(' ') || 'Unnamed';
  const first = emp.firstName || (emp.name || '').split(' ')[0] || '';
  const last = emp.lastName || (emp.name || '').split(' ').slice(1).join(' ') || '';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
      background: isRoot ? 'var(--primary-bg)' : 'var(--surface)',
      border: `1.5px solid ${isRoot ? 'var(--primary)' : 'var(--border)'}`,
      borderRadius: 10, minWidth: 180,
    }}>
      <AvatarInitials firstName={first} lastName={last} color={emp.avatarColor} size={36} />
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{displayName}</div>
        <div style={{ fontSize: 11, color: 'var(--text3)' }}>{emp.role || emp.jobTitle || 'No title'}</div>
      </div>
    </div>
  );
}

export default function OrganizationTab({ employees }) {
  const departments = usePeopleStore((s) => s.departments);
  const hrRecords = useContactsStore((s) => s.hrRecords);

  // Build org tree: group employees by department, show superiors
  const orgData = useMemo(() => {
    const empWithHR = employees.map((emp) => {
      const hr = hrRecords.find((r) => r.contactId === emp.id);
      return {
        ...emp,
        departmentId: hr?.departmentId || emp.department || '',
        superiorId: hr?.superiorId || '',
        positionTitle: hr?.workingPositionTitle || emp.role || '',
      };
    });

    // Find root employees (no superior)
    const roots = empWithHR.filter((e) => !e.superiorId);
    const subordinates = empWithHR.filter((e) => e.superiorId);

    // Group by department
    const byDept = {};
    empWithHR.forEach((e) => {
      const deptId = e.departmentId || '_unassigned';
      if (!byDept[deptId]) byDept[deptId] = [];
      byDept[deptId].push(e);
    });

    return { empWithHR, roots, subordinates, byDept };
  }, [employees, hrRecords]);

  const deptMap = useMemo(() => {
    const m = {};
    departments.forEach((d) => { m[d.id] = d; });
    return m;
  }, [departments]);

  const deptEntries = Object.entries(orgData.byDept).sort((a, b) => {
    const nameA = deptMap[a[0]]?.name || 'Unassigned';
    const nameB = deptMap[b[0]]?.name || 'Unassigned';
    if (a[0] === '_unassigned') return 1;
    if (b[0] === '_unassigned') return -1;
    return nameA.localeCompare(nameB);
  });

  if (employees.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text3)', fontSize: 14 }}>
        No employees to display. Add employees to see the organization chart.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Org chart by department */}
      {deptEntries.map(([deptId, emps]) => {
        const dept = deptMap[deptId];
        const deptName = dept?.name || 'Unassigned';
        const deptColor = dept?.color || 'var(--text3)';

        // Find manager (has subordinates in this dept or is first in list)
        const manager = emps.find((e) =>
          orgData.empWithHR.some((sub) => sub.superiorId === e.id)
        ) || emps[0];
        const members = emps.filter((e) => e.id !== manager?.id);

        return (
          <div key={deptId} style={{
            padding: 20, background: 'var(--bg)', borderRadius: 12,
            border: '1px solid var(--border)',
          }}>
            {/* Department header */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
            }}>
              <div style={{
                width: 12, height: 12, borderRadius: 3,
                background: deptColor,
              }} />
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{deptName}</div>
              <span style={{
                fontSize: 11, fontWeight: 600, color: 'var(--text3)',
                background: 'var(--bg3)', padding: '2px 8px', borderRadius: 10,
              }}>
                {emps.length} {emps.length === 1 ? 'member' : 'members'}
              </span>
            </div>

            {/* Tree */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 4 }}>
              {manager && (
                <PersonNode emp={manager} isRoot />
              )}
              {members.length > 0 && (
                <div style={{ paddingLeft: 32, display: 'flex', flexDirection: 'column', gap: 6, borderLeft: '2px solid var(--border)', marginLeft: 18 }}>
                  {members.map((emp) => (
                    <PersonNode key={emp.id} emp={emp} isRoot={false} />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
