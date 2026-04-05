import { useState } from 'react';
import { X, ChevronDown, BookOpen, Play, Square } from 'lucide-react';
import { useAppStore } from '../../store/app-store';
import { useSettingsStore } from '../../store/settings-store';
import { useThresholdStore } from '../../store/threshold-store';
import { useMobile } from '../../hooks/useMobile';
import { MODULES } from '../../data/modules';
import { getModuleData, ONGOING_DUA, ONGOING_UNIVERSAL } from '../../data/islamic-data';
import { getPillarForModule, getPillarLabel } from '../../data/maqasid';
import AttributeCard from './AttributeCard';
import DuaSection from './DuaSection';
import ReadinessCheck from './ReadinessCheck';
import PrayerTime from './PrayerTime';
import './IslamicPanel.css';

// Collapsible section block — ported from bbos-v4 IslamicLayer
function ILSection({ label, glyph = '\u29C1', color, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="il-block">
      <button className="il-block-toggle" onClick={() => setOpen(!open)}>
        <span className="il-block-glyph" style={{ color: color || 'var(--accent)' }}>{glyph}</span>
        <span className="il-block-label">{label}</span>
        <ChevronDown
          size={14}
          className="il-block-chevron"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      {open && <div className="il-block-body">{children}</div>}
    </div>
  );
}

export default function IslamicPanel() {
  const activeModule = useAppStore((s) => s.activeModule);
  const toggleIslamicPanel = useAppStore((s) => s.toggleIslamicPanel);
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const setValuesLayer = useSettingsStore((s) => s.setValuesLayer);
  const setOpeningModuleId = useThresholdStore((s) => s.setOpeningModuleId);
  const setClosingModuleId = useThresholdStore((s) => s.setClosingModuleId);
  const completedOpening = useThresholdStore((s) => s.completedOpening);
  const completedClosing = useThresholdStore((s) => s.completedClosing);
  const mobile = useMobile();

  const mod = MODULES.find((m) => m.id === activeModule);
  const data = getModuleData(activeModule, valuesLayer);
  const isIslamic = valuesLayer === 'islamic';
  const accentColor = 'var(--accent)';
  const hasOpenedModule = !!completedOpening[activeModule];
  const hasClosedModule = !!completedClosing[activeModule];

  const panelContent = (
    <aside className={`il ${mobile ? 'il-mobile' : ''}`}>
      {/* Header */}
      <div className="il-header">
        <div className="il-header-left">
          <BookOpen size={16} style={{ color: accentColor }} />
          <span className="il-header-title">
            {isIslamic ? 'Islamic Layer' : 'Values Layer'}
          </span>
        </div>
        <div className="il-header-actions">
          <button
            className={`il-toggle-btn ${isIslamic ? 'active' : ''}`}
            onClick={() => setValuesLayer(isIslamic ? 'universal' : 'islamic')}
            title={`Switch to ${isIslamic ? 'Universal' : 'Islamic'} values`}
          >
            {isIslamic ? 'Islamic' : 'Universal'}
          </button>
          <button className="il-close" onClick={toggleIslamicPanel} title="Close panel">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Prayer Times — only in Islamic mode */}
      {isIslamic && <PrayerTime />}

      {/* Pillar context */}
      {(() => {
        const pillar = getPillarForModule(activeModule);
        if (!pillar) return null;
        return (
          <div className="il-pillar-context" style={{ borderLeftColor: pillar.accentColor }}>
            <span className="il-pillar-label">{getPillarLabel(pillar, valuesLayer)}</span>
            <span className="il-pillar-root">
              {isIslamic ? pillar.arabicRoot : pillar.rootAction}
            </span>
            {isIslamic && <span className="il-pillar-ar arabic">{pillar.arabicRootAr}</span>}
          </div>
        );
      })()}

      {/* Module context badge */}
      {mod && (
        <div className="il-module-badge">
          <div className="il-module-name">{mod.name}</div>
          {isIslamic && mod.attrs && (
            <>
              <div className="il-module-attrs">{mod.attrs}</div>
              {mod.attrs_ar && <div className="il-module-attrs-ar arabic">{mod.attrs_ar}</div>}
            </>
          )}
          {!isIslamic && (
            <div className="il-module-attrs" style={{ color: 'var(--text3)' }}>
              {data?.principles?.map((p) => p.name).join(' · ') || 'Principles'}
            </div>
          )}
        </div>
      )}

      {/* Threshold ceremony buttons */}
      <div className="il-threshold-btns">
        <button
          className={`il-thr-btn ${hasOpenedModule ? 'il-thr-done' : ''}`}
          onClick={() => setOpeningModuleId(activeModule)}
          title={hasOpenedModule ? 'Opening completed — click to redo' : 'Begin the opening ceremony'}
        >
          <Play size={13} />
          {hasOpenedModule ? 'Opened' : isIslamic ? 'Begin Module' : 'Set Intention'}
        </button>
        <button
          className={`il-thr-btn ${hasClosedModule ? 'il-thr-done' : ''}`}
          onClick={() => setClosingModuleId(activeModule)}
          title={hasClosedModule ? 'Closing completed — click to redo' : 'Close the session'}
        >
          <Square size={11} />
          {hasClosedModule ? 'Closed' : isIslamic ? 'Close Session' : 'Reflect & Close'}
        </button>
      </div>

      {/* Content sections */}
      <div className="il-content">
        {data && (
          <>
            {/* Opening Dua / Mindfulness */}
            <ILSection
              label={isIslamic ? 'Opening Dua' : 'Set Intention'}
              glyph={isIslamic ? '\u29C1' : '\u25CB'}
              color={accentColor}
              defaultOpen={true}
            >
              {isIslamic ? (
                <DuaSection dua={data.dua} color={accentColor} />
              ) : (
                <div className="il-mindfulness">
                  <p>{data.mindfulness}</p>
                </div>
              )}
            </ILSection>

            {/* Governing Attributes / Principles */}
            <ILSection
              label={isIslamic ? 'Governing Attributes' : 'Guiding Principles'}
              glyph={isIslamic ? '\u29C1' : '\u25CB'}
              color={accentColor}
              defaultOpen={true}
            >
              {isIslamic
                ? data.attrs?.map((attr, i) => (
                    <AttributeCard key={i} attr={attr} color={accentColor} />
                  ))
                : data.principles?.map((p, i) => (
                    <AttributeCard key={i} attr={p} color={accentColor} />
                  ))
              }
            </ILSection>

            {/* Readiness Check */}
            <ILSection
              label="Readiness Check"
              glyph={isIslamic ? '\u29C1' : '\u25CB'}
              color={accentColor}
            >
              <ReadinessCheck readiness={data.readiness} color={accentColor} />
            </ILSection>

            <div className="il-divider" />

            {/* During Work */}
            <ILSection
              label={isIslamic ? 'During Work \u00B7 Tawakkul' : 'During Work \u00B7 Presence'}
              glyph={isIslamic ? '\u29C1' : '\u25CB'}
              color={accentColor}
            >
              {isIslamic ? (
                <DuaSection dua={ONGOING_DUA} color={accentColor} />
              ) : (
                <div className="il-mindfulness">
                  <p>{ONGOING_UNIVERSAL.meaning}</p>
                </div>
              )}
            </ILSection>

            <div className="il-divider" />

            {/* Reflection */}
            <ILSection
              label="Reflection"
              glyph={isIslamic ? '\u29C1' : '\u25CB'}
              color={accentColor}
            >
              <ReadinessCheck reflection={data.reflection} color={accentColor} />
            </ILSection>
          </>
        )}

        {!data && (
          <div className="il-empty">
            <p>No content available for this module.</p>
          </div>
        )}
      </div>
    </aside>
  );

  if (mobile) {
    return (
      <div className="il-mobile-overlay" onClick={toggleIslamicPanel}>
        <div onClick={(e) => e.stopPropagation()}>
          {panelContent}
        </div>
      </div>
    );
  }

  return panelContent;
}
