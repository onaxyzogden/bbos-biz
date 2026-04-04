import './ReadinessCheck.css';

function RCColumn({ title, items, colorClass }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <div className={`rc-col-title ${colorClass}`}>{title}</div>
      {items.map((item, i) => (
        <div key={i} className={`rc-item ${colorClass}`}>{item}</div>
      ))}
    </div>
  );
}

function RCSection({ label, data, color }) {
  if (!data) return null;
  return (
    <div className="rc-section">
      {data.frame && <p className="rc-frame">{data.frame}</p>}
      <div className="rc-grid">
        <RCColumn title="At Peace When" items={data.governing} colorClass="rc-at-peace" />
        <RCColumn title="Not Yet Rested In" items={data.notYet} colorClass="rc-not-rested" />
      </div>
    </div>
  );
}

export default function ReadinessCheck({ readiness, reflection, color }) {
  if (!readiness && !reflection) return null;

  return (
    <div className="rc-wrap">
      {readiness && <RCSection label="Readiness" data={readiness} color={color} />}
      {reflection && (
        <>
          {readiness && <div style={{ height: 'var(--space-3)' }} />}
          <RCSection label="Reflection" data={reflection} color={color} />
        </>
      )}
    </div>
  );
}
