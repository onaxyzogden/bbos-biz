import { CheckCircle2, Circle } from 'lucide-react';
import '../../pages/FivePillars.css';

/**
 * Reusable overview card grid — same visual pattern as the Five Pillars page.
 * Reuses FivePillars.css class names (.fp-card, .fp-card__*, etc.).
 *
 * Props:
 *   items       — array of overview objects (same shape as FIVE_PILLARS / OVERVIEW exports)
 *   moduleColor — CSS value string e.g. 'var(--mod-quran)' used as accent colour
 *   grounding   — optional footnote string citing the quran.ai source
 */
function OverviewCard({ item, moduleColor }) {
  return (
    <div className="fp-card">
      {/* Header */}
      <div className="fp-card__header">
        <span className="fp-card__order" style={{ background: moduleColor }}>
          {item.order}
        </span>
        <div className="fp-card__names">
          <div className="fp-card__name">{item.name}</div>
          <div className="fp-card__meaning">{item.meaning}</div>
        </div>
        <span className="fp-card__arabic-name" style={{ color: moduleColor }}>
          {item.arabic}
        </span>
      </div>

      {/* Quranic Ayah */}
      {item.ayahKey && (
        <div className="fp-card__ayah">
          <div className="fp-card__ayah-arabic">{item.ayahArabic}</div>
          <div className="fp-card__ayah-translation">{item.ayahTranslation}</div>
          <div className="fp-card__ayah-ref">
            &mdash; Surah {item.ayahKey} (Abdel Haleem)
          </div>
        </div>
      )}

      {/* Hadith reference (when no Quranic ayah) */}
      {!item.ayahKey && item.hadithText && (
        <div className="fp-card__ayah">
          <div className="fp-card__ayah-translation" style={{ fontStyle: 'normal', fontSize: '0.88rem' }}>
            &ldquo;{item.hadithText}&rdquo;
          </div>
          <div className="fp-card__ayah-ref">&mdash; {item.hadithRef}</div>
        </div>
      )}

      {/* Description */}
      <p className="fp-card__desc">{item.description}</p>

      {/* Conditions + Virtues grid */}
      <div className="fp-card__grid">
        <div>
          <div className="fp-card__section-title">Conditions &amp; Requirements</div>
          <ul className="fp-card__list">
            {item.conditions.map((c, i) => (
              <li key={i} className="fp-card__list-item">
                <Circle size={10} style={{ color: moduleColor }} />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="fp-card__section-title">Virtues &amp; Benefits</div>
          <ul className="fp-card__list">
            {item.virtues.map((v, i) => (
              <li key={i} className="fp-card__list-item">
                <CheckCircle2 size={10} style={{ color: moduleColor }} />
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function OverviewCards({ items, moduleColor, grounding }) {
  return (
    <>
      {/* --fp-accent cascades into .fp-card border-left via FivePillars.css */}
      <div className="fp-cards" style={{ '--fp-accent': moduleColor }}>
        {items.map((item) => (
          <OverviewCard key={item.id} item={item} moduleColor={moduleColor} />
        ))}
      </div>
      {grounding && (
        <p className="fp-grounding">{grounding}</p>
      )}
    </>
  );
}
