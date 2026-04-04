import './AttributeCard.css';

export default function AttributeCard({ attr, color }) {
  if (!attr) return null;

  return (
    <div className="attr-card" style={{ borderLeftColor: (color || 'var(--accent)') + '66' }}>
      <div className="attr-card-header">
        <span className="attr-card-name" style={{ color: (color || 'var(--accent)') + 'dd' }}>
          {attr.name}
        </span>
        {attr.name_ar && (
          <span className="attr-card-name-ar arabic">{attr.name_ar}</span>
        )}
        <span className="attr-card-title">{attr.title}</span>
      </div>
      <p className="attr-card-body">{attr.body}</p>
    </div>
  );
}
