import './DuaSection.css';

export default function DuaSection({ dua, color, isUniversal }) {
  if (!dua) return null;

  const accentColor = color || 'var(--accent)';

  return (
    <div className="dua" style={{ borderColor: accentColor + '30', background: accentColor + '08' }}>
      <div className="dua-title" style={{ color: accentColor }}>
        {isUniversal ? 'Mindfulness' : dua.title}
      </div>

      {!isUniversal && dua.arabic && (
        <p className="dua-arabic arabic">{dua.arabic}</p>
      )}

      {!isUniversal && dua.trans && (
        <p className="dua-trans">{dua.trans}</p>
      )}

      <p className="dua-meaning" style={{ borderLeftColor: accentColor + '40' }}>
        {isUniversal ? (dua.meaning || dua) : dua.meaning}
      </p>

      {!isUniversal && dua.source && (
        <p className="dua-source">{dua.source}</p>
      )}
    </div>
  );
}
