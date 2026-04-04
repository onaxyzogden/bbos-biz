export default function SkillsTab() {
  return (
    <div style={{ paddingTop: 32, display: 'flex', justifyContent: 'center' }}>
      <div style={{
        maxWidth: 300, padding: 32, borderRadius: 16,
        background: 'var(--bg3)', textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: 'var(--bg4)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24,
        }}>
          ⏳
        </div>
        <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>Skills in progress</div>
        <div style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.5 }}>
          This teammate has no detected skills yet. As they complete more tasks, their strengths will appear here automatically.
        </div>
      </div>
    </div>
  );
}
