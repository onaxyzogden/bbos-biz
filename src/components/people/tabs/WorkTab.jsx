import { CalendarPlus, Users } from 'lucide-react';

// Stub tasks shown for new employees (onboarding pattern)
const ONBOARDING_TASKS = [
  'Hello, Nice to Meet You!',
  'Complete your employment data',
  'Secure your account',
  'Complete company profile',
];

export default function WorkTab({ contactId }) {
  // Future: read from task-store filtered by assignee === contactId
  return (
    <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Task table */}
      <div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Task name', 'Creator', 'Assignees', 'Due/Done', '🚩', '📎'].map((h) => (
                <th key={h} style={{ padding: '7px 8px', textAlign: 'left', fontWeight: 600, color: 'var(--text3)', fontSize: 12 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ONBOARDING_TASKS.map((task) => (
              <tr key={task} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 8px', color: 'var(--text)', fontWeight: 500 }}>{task}</td>
                <td style={{ padding: '8px 8px' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--mod-people)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#fff', fontSize: 9, fontWeight: 700 }}>SY</span>
                  </div>
                </td>
                <td style={{ padding: '8px 8px', color: 'var(--text2)' }}>—</td>
                <td style={{ padding: '8px 8px', color: 'var(--text2)' }}>0</td>
                <td style={{ padding: '8px 8px', color: 'var(--text2)' }}>0</td>
                <td style={{ padding: '8px 8px', color: 'var(--text2)' }}>0</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Events */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {['Upcoming events', 'Past events'].map((section) => (
          <div key={section} style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ padding: '10px 12px', fontWeight: 600, fontSize: 13, color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>
              {section}
            </div>
            <div style={{ padding: 12, minHeight: 80 }}>
              <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 12 }}>Nothing scheduled.</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '6px 0', border: '1.5px solid var(--border)', borderRadius: 6, background: 'transparent', cursor: 'pointer', fontSize: 11, color: 'var(--text2)', fontWeight: 500 }}>
                  <Users size={11} /> Create meeting
                </button>
                <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '6px 0', border: '1.5px solid var(--border)', borderRadius: 6, background: 'transparent', cursor: 'pointer', fontSize: 11, color: 'var(--text2)', fontWeight: 500 }}>
                  <CalendarPlus size={11} /> Add event
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
