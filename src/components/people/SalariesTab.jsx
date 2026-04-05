import { useMemo } from 'react';
import { useContactsStore } from '../../store/contacts-store';
import { getDisplayName, SALARY_TYPES } from '../../data/contact-config';
import AvatarInitials from './AvatarInitials';

function formatCurrency(amount) {
  if (amount == null) return '-';
  return `$${Number(amount).toLocaleString()}`;
}

export default function SalariesTab({ employees, onSelectEmployee }) {
  const salaryRecords = useContactsStore((s) => s.salaryRecords);
  const hrRecords = useContactsStore((s) => s.hrRecords);

  const rows = useMemo(() => {
    return employees.map((emp) => {
      const empSalaries = salaryRecords
        .filter((r) => r.contactId === emp.id)
        .sort((a, b) => (b.effectiveDate || '').localeCompare(a.effectiveDate || ''));
      const currentBase = empSalaries.find((r) => r.type === 'base');
      const hrRec = hrRecords.find((r) => r.contactId === emp.id);

      return {
        ...emp,
        position: hrRec?.workingPositionTitle || emp.role || '',
        hiringDate: hrRec?.hiringDate || '',
        salaryType: currentBase ? 'base' : null,
        salaryAmount: currentBase?.amount || null,
        hasSalaryInfo: empSalaries.length > 0,
      };
    });
  }, [employees, salaryRecords, hrRecords]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              {['Name', 'Position', 'Date', 'Type', 'Salary'].map((h) => (
                <th key={h} style={{
                  padding: '10px 12px', textAlign: 'left', fontWeight: 600,
                  color: 'var(--text3)', fontSize: 12, whiteSpace: 'nowrap',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text3)' }}>
                  No employees found.
                </td>
              </tr>
            ) : (
              rows.map((emp) => {
                const displayName = emp.name || [emp.firstName, emp.lastName].filter(Boolean).join(' ') || 'Unnamed';
                const first = emp.firstName || (emp.name || '').split(' ')[0] || '';
                const last = emp.lastName || (emp.name || '').split(' ').slice(1).join(' ') || '';
                return (
                  <tr
                    key={emp.id}
                    onClick={() => onSelectEmployee(emp.id)}
                    style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background 0.15s' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg3)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = ''}
                  >
                    <td style={{ padding: '10px 12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <AvatarInitials firstName={first} lastName={last} color={emp.avatarColor} size={32} />
                        <span style={{ fontWeight: 500, color: 'var(--text)' }}>{displayName}</span>
                      </div>
                    </td>
                    <td style={{ padding: '10px 12px', color: 'var(--text2)' }}>
                      {emp.position || '-'}
                    </td>
                    <td style={{ padding: '10px 12px', color: 'var(--text2)' }}>
                      {emp.hiringDate || '-'}
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      {emp.hasSalaryInfo ? (
                        <span style={{ fontWeight: 500, color: 'var(--text2)' }}>
                          {SALARY_TYPES.find((t) => t.id === (emp.salaryType || 'base'))?.label || '-'}
                        </span>
                      ) : (
                        <span style={{
                          fontSize: 11, fontWeight: 600, padding: '2px 8px',
                          borderRadius: 4, background: 'var(--bg4)', color: 'var(--text3)',
                        }}>
                          No Info
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '10px 12px', color: 'var(--text)', fontWeight: 600 }}>
                      {emp.salaryAmount != null ? formatCurrency(emp.salaryAmount) : '-'}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
        gap: 16, fontSize: 12, color: 'var(--text3)', paddingTop: 4,
      }}>
        <span>Rows per page: 10</span>
        <span>1–{rows.length} of {rows.length}</span>
      </div>
    </div>
  );
}
