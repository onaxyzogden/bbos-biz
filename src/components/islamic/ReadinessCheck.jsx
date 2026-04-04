import './ReadinessCheck.css';

// ── Display-only column (original behavior) ──
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

// ── Interactive attribute card (matches mockup) ──
function RCInteractiveCard({ rows, attrName, attrAr, attrTitle, attrFrame, selections, onSelect }) {
  const filledCount = rows.filter((r) => selections[r.id] != null).length;
  const allYes = rows.every((r) => selections[r.id] === true);
  const allFilled = filledCount === rows.length;

  const statusText = allFilled && allYes
    ? '\u2713 confirmed'
    : `${filledCount} / ${rows.length}`;

  const statusClass = allFilled
    ? allYes ? 'rc-i-status--yes' : 'rc-i-status--nyt'
    : '';

  const cardClass = `rc-i-card${allFilled ? (allYes ? ' rc-i-card--yes' : ' rc-i-card--nyt') : ''}`;

  return (
    <div className={cardClass}>
      <div className="rc-i-header">
        <span className="rc-i-attr-name">{attrName}</span>
        {attrAr && <span className="rc-i-attr-ar">{attrAr}</span>}
        {attrTitle && <span className="rc-i-attr-title">{attrTitle}</span>}
        <span className={`rc-i-status ${statusClass}`}>{statusText}</span>
      </div>
      {attrFrame && <p className="rc-i-frame">{attrFrame}</p>}

      <div className="rc-i-col-headers">
        <div className="rc-i-col-label rc-i-col-label--yes">YES WHEN</div>
        <div className="rc-i-col-label rc-i-col-label--nyt">NOT YET WHEN</div>
      </div>

      <div className="rc-i-rows">
        {rows.map((row) => {
          const val = selections[row.id];
          return (
            <div key={row.id} className="rc-i-row">
              <button
                type="button"
                className={`rc-i-cell rc-i-cell--yes${val === true ? ' chosen' : ''}${val === false ? ' dimmed' : ''}`}
                onClick={() => onSelect(row.id, true)}
                aria-pressed={val === true}
              >
                {row.governing}
              </button>
              <button
                type="button"
                className={`rc-i-cell rc-i-cell--nyt${val === false ? ' chosen' : ''}${val === true ? ' dimmed' : ''}`}
                onClick={() => onSelect(row.id, false)}
                aria-pressed={val === false}
              >
                {row.notYet}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Interactive readiness check (6-row, two attribute cards) ──
function RCInteractive({ rows, selections, onSelect }) {
  // Group rows by attribute — first row with attr_ar/attrTitle carries card header info
  const groups = [];
  let current = null;

  for (const row of rows) {
    if (row.attr_ar || row.attrTitle || !current || row.attr !== current.attrName) {
      current = {
        attrName: row.attr,
        attrAr: row.attr_ar || null,
        attrTitle: row.attrTitle || null,
        attrFrame: row.attrFrame || null,
        rows: [],
      };
      groups.push(current);
    }
    current.rows.push(row);
  }

  return (
    <div className="rc-i-wrap">
      <p className="rc-i-instructions">For each row, select the condition that is true for you right now.</p>
      {groups.map((group, i) => (
        <RCInteractiveCard
          key={i}
          rows={group.rows}
          attrName={group.attrName}
          attrAr={group.attrAr}
          attrTitle={group.attrTitle}
          attrFrame={group.attrFrame}
          selections={selections}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default function ReadinessCheck({ readiness, reflection, color, interactive, selections, onSelect }) {
  // Interactive mode — used when rows structure exists and interactive is requested
  if (interactive && readiness?.rows && selections && onSelect) {
    return <RCInteractive rows={readiness.rows} selections={selections} onSelect={onSelect} />;
  }

  // Display-only mode (original behavior)
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
