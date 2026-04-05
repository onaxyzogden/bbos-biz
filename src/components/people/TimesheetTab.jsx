import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useContactsStore } from '../../store/contacts-store';
import { getDisplayName } from '../../data/contact-config';
import AvatarInitials from './AvatarInitials';

function getWeekRange(offset) {
  const now = new Date();
  const day = now.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset + offset * 7);
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  return { start: monday, end: sunday };
}

function formatShortDate(d) {
  return d.toLocaleDateString('en', { day: 'numeric', month: 'short' });
}

function formatDuration(mins) {
  if (!mins || mins <= 0) return '-';
  const h = Math.floor(mins / 60);
  const m = Math.round(mins % 60);
  if (h === 0) return `${m}m`;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export default function TimesheetTab({ employees, onSelectEmployee }) {
  const clockIns = useContactsStore((s) => s.clockIns);

  const [viewMode, setViewMode] = useState('weekly'); // daily | weekly | monthly
  const [weekOffset, setWeekOffset] = useState(0);

  const { start, end } = useMemo(() => getWeekRange(weekOffset), [weekOffset]);

  const periodLabel = useMemo(() => {
    if (viewMode === 'weekly') {
      const s = formatShortDate(start);
      const e = formatShortDate(end);
      return weekOffset === 0
        ? `Current week`
        : `${s} – ${e}`;
    }
    return 'Current period';
  }, [viewMode, weekOffset, start, end]);

  const periodSubLabel = useMemo(() => {
    return `${formatShortDate(start)} – ${formatShortDate(end)}`;
  }, [start, end]);

  // Compute per-employee totals for the selected period
  const rows = useMemo(() => {
    return employees.map((emp) => {
      const empClockIns = clockIns.filter((ci) => {
        if (ci.contactId !== emp.id) return false;
        const d = new Date(ci.clockInTime);
        return d >= start && d <= end;
      });
      const totalMinutes = empClockIns.reduce((sum, ci) => sum + (ci.totalMinutes || 0), 0);
      const lastLocation = empClockIns.length > 0
        ? empClockIns.sort((a, b) => b.clockInTime.localeCompare(a.clockInTime))[0]?.location || '-'
        : '-';
      return { ...emp, totalMinutes, lastLocation, clockInCount: empClockIns.length };
    });
  }, [employees, clockIns, start, end]);

  const toggles = [
    { id: 'daily', label: 'Daily' },
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* View mode toggles */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 2, background: 'var(--bg3)', borderRadius: 8, padding: 2 }}>
          {toggles.map((t) => (
            <button
              key={t.id}
              onClick={() => setViewMode(t.id)}
              style={{
                padding: '6px 16px', borderRadius: 6, fontSize: 13, fontWeight: 500,
                border: 'none', cursor: 'pointer',
                background: viewMode === t.id ? 'var(--surface)' : 'transparent',
                color: viewMode === t.id ? 'var(--text)' : 'var(--text3)',
                boxShadow: viewMode === t.id ? 'var(--shadow-xs)' : 'none',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Week navigator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 'auto' }}>
          <button
            onClick={() => setWeekOffset((o) => o - 1)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', display: 'flex' }}
          >
            <ChevronLeft size={18} />
          </button>
          <div style={{ textAlign: 'center', minWidth: 140 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{periodLabel}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>{periodSubLabel}</div>
          </div>
          <button
            onClick={() => setWeekOffset((o) => o + 1)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', display: 'flex' }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              {['Employee', 'Description', 'Location', 'Period', 'Total work'].map((h) => (
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
                    <td style={{ padding: '10px 12px', color: 'var(--text2)' }}>-</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text2)', textTransform: 'capitalize' }}>
                      {emp.lastLocation !== '-' ? emp.lastLocation : '-'}
                    </td>
                    <td style={{ padding: '10px 12px', color: 'var(--text2)' }}>-</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text)', fontWeight: 600 }}>
                      {formatDuration(emp.totalMinutes)}
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
        <span>Rows per page: {rows.length}</span>
      </div>
    </div>
  );
}
