import { useState } from 'react';
import { X, Check, Pause } from 'lucide-react';
import { useThresholdStore } from '../../store/threshold-store';
import { MODULES } from '../../data/modules';
import {
  getModuleData, ONGOING_DUA, ISTIRJA, PAUSE_ACKNOWLEDGMENT,
  PAUSE_QUESTIONS, PAUSE_UNIVERSAL, DEFER_CONTENT, DEFER_UNIVERSAL,
} from '../../data/islamic-data';
import { lookupReadinessAyahByKey } from '../../data/readiness-ayat-router';
import { getPillarForModule } from '../../data/maqasid';
import { getStage } from '../../data/bbos-pipeline';
import { getBbosStageIslamic } from '../../data/bbos-stage-islamic';
import { useSettingsStore } from '../../store/settings-store';
import AttributeCard from './AttributeCard';
import DuaSection from './DuaSection';
import ReadinessCheck from './ReadinessCheck';
import IslamicTerm from '../shared/IslamicTerm';
import './ThresholdModal.css';

// ── Row-aware helpers ────────────────────────────────────────────────────────

function buildReadinessKey(rows, selections) {
  return rows.map((r) => (selections[r.id] === true ? '1' : '0')).join('');
}

function allFilled(rows, selections) {
  return rows.every((r) => selections[r.id] !== null && selections[r.id] !== undefined);
}

function allYes(rows, selections) {
  return rows.every((r) => selections[r.id] === true);
}

// ── Pause label — derived from unique attribute names in the NOT YET rows ────

function getPauseLabel(rows, selections) {
  const notYetAttrs = [...new Set(
    rows.filter((r) => selections[r.id] === false).map((r) => r.attr)
  )];
  if (notYetAttrs.length === 0) return 'Not yet ready';
  if (notYetAttrs.length === 1) return `Not yet rested in ${notYetAttrs[0]}`;
  return 'Not yet aligned with the threshold';
}

export default function ThresholdModal({ type }) {
  const openingModuleId = useThresholdStore((s) => s.openingModuleId);
  const closingModuleId = useThresholdStore((s) => s.closingModuleId);
  const setOpeningModuleId = useThresholdStore((s) => s.setOpeningModuleId);
  const setClosingModuleId = useThresholdStore((s) => s.setClosingModuleId);
  const completeOpening = useThresholdStore((s) => s.completeOpening);
  const completeClosing = useThresholdStore((s) => s.completeClosing);
  const deferOpening = useThresholdStore((s) => s.deferOpening);
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);

  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [showingDeferScreen, setShowingDeferScreen] = useState(false);
  // Keyed by row id (dynamic per module — starts empty, keys added on selection)
  const [readinessSelections, setReadinessSelections] = useState({});

  const isOpening = type === 'opening';
  const moduleId = isOpening ? openingModuleId : closingModuleId;

  if (!moduleId) return null;

  // Detect BBOS stage ceremony keys (e.g. 'bbos:FND')
  const isBbosStage = moduleId?.startsWith('bbos:');
  const bbosStageId = isBbosStage ? moduleId.slice(5) : null;
  const bbosStageObj = bbosStageId ? getStage(bbosStageId) : null;
  const bbosStageData = bbosStageId ? getBbosStageIslamic(bbosStageId) : null;

  const mod = isBbosStage ? null : MODULES.find((m) => m.id === moduleId);
  const data = isBbosStage ? bbosStageData : getModuleData(moduleId, valuesLayer);
  const isIslamic = valuesLayer === 'islamic';
  const accentColor = 'var(--accent)';

  // ── Pillar fallback for readiness rows ──────────────────────────────────────
  // If the module has its own rows, use them.
  // Otherwise fall back to pillar-level rows (e.g. opening a faith sub-module).
  // For BBOS stages, use the 'work' module's pillar.
  const pillar = isBbosStage ? getPillarForModule('work') : getPillarForModule(moduleId);
  const pillarData = pillar ? getModuleData(pillar.id, valuesLayer) : null;
  const readinessRows = data?.readiness?.rows ?? pillarData?.readiness?.rows ?? [];
  const effectiveReadinessData = readinessRows.length > 0
    ? (data?.readiness?.rows ? data.readiness : pillarData?.readiness)
    : data?.readiness;

  // Is this module using interactive readiness? (has rows)
  const hasInteractiveReadiness = isOpening && readinessRows.length > 0;

  // ── Readiness key and derived state ─────────────────────────────────────────
  const readinessFilled = hasInteractiveReadiness && allFilled(readinessRows, readinessSelections);
  const readinessAllYes = hasInteractiveReadiness && allYes(readinessRows, readinessSelections);
  const readinessKey = hasInteractiveReadiness ? buildReadinessKey(readinessRows, readinessSelections) : '111111';

  // ── Ayat lookup via pillar's readinessAyatKey ────────────────────────────────
  const readinessAyatKey = pillar?.readinessAyatKey;
  const pauseAyah = (hasInteractiveReadiness && isIslamic && readinessKey !== '111111')
    ? lookupReadinessAyahByKey(readinessAyatKey, readinessKey)
    : null;

  // Dynamic steps — Pause inserts between Readiness and Confirm when triggered
  const baseSteps = isOpening
    ? ['Dua', 'Attributes', 'Readiness', 'Confirm']
    : ['Dua', 'Attributes', 'Reflection', 'Confirm'];

  const steps = paused
    ? [...baseSteps.slice(0, 3), 'Pause', baseSteps[3]]
    : baseSteps;

  const currentStepName = steps[step];

  const resetState = () => {
    setStep(0);
    setConfirmed(false);
    setPaused(false);
    setShowingDeferScreen(false);
    setReadinessSelections({});
  };

  const close = () => {
    resetState();
    if (isOpening) setOpeningModuleId(null);
    else setClosingModuleId(null);
  };

  const closeDeferScreen = () => {
    if (isOpening) deferOpening(moduleId);
    resetState();
    if (isOpening) setOpeningModuleId(null);
    else setClosingModuleId(null);
  };

  const complete = () => {
    if (!confirmed) return;
    if (isOpening) completeOpening(moduleId);
    else completeClosing(moduleId);
    resetState();
  };

  const next = () => { if (step < steps.length - 1) setStep(step + 1); };
  const prev = () => {
    if (step > 0) {
      if (currentStepName === 'Pause') { setPaused(false); setStep(2); return; }
      if (currentStepName === 'Confirm') setConfirmed(false);
      setStep(step - 1);
    }
  };

  const triggerPause = () => {
    setPaused(true);
    setStep(3);
  };

  const defer = () => { setShowingDeferScreen(true); };
  const returnToReadiness = () => { setPaused(false); setStep(2); };

  const handleNext = () => {
    if (currentStepName === 'Readiness' && hasInteractiveReadiness && readinessFilled && !readinessAllYes) {
      triggerPause();
      return;
    }
    next();
  };

  const handleReadinessSelect = (id, value) => {
    setReadinessSelections((prev) => ({ ...prev, [id]: value }));
  };

  const canAdvanceFromReadiness = hasInteractiveReadiness ? readinessFilled && readinessAllYes : true;

  const pauseQuestion = isIslamic
    ? (PAUSE_QUESTIONS[moduleId] || PAUSE_QUESTIONS.work)
    : (PAUSE_UNIVERSAL.questions[moduleId] || PAUSE_UNIVERSAL.questions.work);

  const deferGuidance = isIslamic
    ? DEFER_CONTENT.getGuidanceQuestion(moduleId)
    : DEFER_UNIVERSAL.getGuidanceQuestion(moduleId);

  const deferAck = isIslamic ? DEFER_CONTENT.acknowledgment : DEFER_UNIVERSAL.acknowledgment;
  const deferHolding = isIslamic ? DEFER_CONTENT.holdingMessage : DEFER_UNIVERSAL.holdingMessage;

  // Count unanswered rows for hint text
  const unfilledCount = readinessRows.filter(
    (r) => readinessSelections[r.id] === null || readinessSelections[r.id] === undefined
  ).length;

  return (
    <div className="thr-overlay">
      <div className="thr-modal">

        {/* ══════════════════════════════════════════════ */}
        {/* DEFER SCREEN — compassionate off-ramp         */}
        {/* ══════════════════════════════════════════════ */}
        {showingDeferScreen ? (
          <>
            <div className="thr-header">
              <div>
                <span className="thr-module-badge">{mod?.name || 'Module'}</span>
                <h2 className="thr-title">Threshold Deferred</h2>
              </div>
              <button className="thr-close" onClick={closeDeferScreen}>
                <X size={18} />
              </button>
            </div>

            <div className="thr-body">
              <div className="thr-defer-content fade-in">
                <p className="thr-defer-ack">{deferAck}</p>

                {deferGuidance && (
                  <div>
                    <p className="thr-defer-guidance-label">A question to sit with:</p>
                    <p className="thr-defer-guidance">{deferGuidance}</p>
                  </div>
                )}

                {isIslamic ? (
                  <DuaSection dua={ONGOING_DUA} color={accentColor} />
                ) : (
                  <div className="il-mindfulness">
                    <p>{DEFER_UNIVERSAL.reflection}</p>
                  </div>
                )}

                <p className="thr-defer-holding">{deferHolding}</p>
              </div>
            </div>

            <div className="thr-footer thr-defer-footer">
              <button className="thr-btn thr-btn-ghost" onClick={closeDeferScreen}>
                Close
              </button>
            </div>
          </>
        ) : (
          <>
            {/* ══════════════════════════════════════════════ */}
            {/* NORMAL CEREMONY FLOW                          */}
            {/* ══════════════════════════════════════════════ */}

            <div className="thr-header">
              <div>
                <span className="thr-module-badge">{mod?.name || 'Module'}</span>
                <h2 className="thr-title">
                  {isOpening ? 'Opening Threshold' : 'Closing Threshold'}
                </h2>
              </div>
              <button className="thr-close" onClick={close}>
                <X size={18} />
              </button>
            </div>

            <div className="thr-steps">
              {steps.map((s, i) => (
                <button
                  key={s}
                  className={`thr-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''} ${s === 'Pause' ? 'thr-step-pause' : ''}`}
                  onClick={() => { if (i <= step) setStep(i); }}
                >
                  {s === 'Pause'
                    ? <><Pause size={11} /> Pause</>
                    : s === 'Dua' && isIslamic
                      ? <IslamicTerm id="dua">Dua</IslamicTerm>
                      : s
                  }
                </button>
              ))}
            </div>

            <div className="thr-body">
              {currentStepName === 'Dua' && data && (
                <div className="thr-step-content fade-in">
                  {isIslamic ? (
                    <DuaSection dua={isOpening ? data.dua : (data.dua || ONGOING_DUA)} color={accentColor} />
                  ) : (
                    <div className="il-mindfulness">
                      <p>{isOpening ? data.mindfulness : 'Take a moment to reflect on your session and what you accomplished.'}</p>
                    </div>
                  )}
                </div>
              )}

              {currentStepName === 'Attributes' && data && (
                <div className="thr-step-content fade-in">
                  {isIslamic
                    ? data.attrs?.map((attr, i) => <AttributeCard key={i} attr={attr} color={accentColor} />)
                    : data.principles?.map((p, i) => <AttributeCard key={i} attr={p} color={accentColor} />)
                  }
                </div>
              )}

              {(currentStepName === 'Readiness' || currentStepName === 'Reflection') && (
                <div className="thr-step-content fade-in">
                  {isOpening && hasInteractiveReadiness ? (
                    <ReadinessCheck
                      readiness={effectiveReadinessData}
                      color={accentColor}
                      interactive={true}
                      selections={readinessSelections}
                      onSelect={handleReadinessSelect}
                    />
                  ) : isOpening ? (
                    <ReadinessCheck readiness={data?.readiness} color={accentColor} />
                  ) : (
                    <ReadinessCheck reflection={data?.reflection} color={accentColor} />
                  )}
                </div>
              )}

              {currentStepName === 'Pause' && (
                <div className="thr-step-content thr-pause-content fade-in">
                  <p className="thr-pause-ack">
                    {isIslamic ? PAUSE_ACKNOWLEDGMENT : PAUSE_UNIVERSAL.acknowledgment}
                  </p>

                  {pauseAyah && (
                    <div className="thr-pause-ayah">
                      <p className="thr-pause-ayah-framing">{pauseAyah.framing}</p>
                      <div className="dua" style={{ borderColor: 'var(--border2)', background: 'var(--bg)' }}>
                        <p className="dua-arabic arabic">{pauseAyah.arabic}</p>
                        <p className="dua-trans">{pauseAyah.transliteration}</p>
                        <p className="dua-meaning" style={{ borderLeftColor: 'var(--border2)' }}>
                          {pauseAyah.translation}
                        </p>
                        <p className="dua-source">{pauseAyah.source}</p>
                      </div>
                    </div>
                  )}

                  {isIslamic ? (
                    <div className="thr-pause-istirja">
                      <div className="dua" style={{ borderColor: 'var(--border2)', background: 'var(--bg)' }}>
                        <p className="dua-arabic arabic">{ISTIRJA.arabic}</p>
                        <p className="dua-trans">{ISTIRJA.trans}</p>
                        <p className="dua-meaning" style={{ borderLeftColor: 'var(--border2)' }}>{ISTIRJA.meaning}</p>
                        <p className="dua-source">{ISTIRJA.source}</p>
                      </div>
                      <p className="thr-pause-note">{ISTIRJA.note}</p>
                    </div>
                  ) : (
                    <div className="il-mindfulness"><p>{PAUSE_UNIVERSAL.reflection}</p></div>
                  )}
                  <p className="thr-pause-question">{pauseQuestion}</p>
                </div>
              )}

              {currentStepName === 'Confirm' && (
                <div className="thr-step-content fade-in">
                  <div className="thr-confirm-box">
                    <label className="thr-confirm-label">
                      <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="thr-checkbox" />
                      <span>
                        {isIslamic
                          ? `I have read the ${isOpening ? 'opening' : 'closing'} dua, reviewed the governing attributes, and completed the ${isOpening ? 'readiness check' : 'reflection'} for ${mod?.name || 'this module'}.`
                          : `I have set my intention, reviewed the guiding principles, and completed the ${isOpening ? 'readiness check' : 'reflection'} for ${mod?.name || 'this module'}.`
                        }
                      </span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div className="thr-footer">
              {currentStepName === 'Pause' ? (
                <>
                  <button className="thr-btn thr-btn-ghost" onClick={defer}>Defer to Later</button>
                  <div style={{ flex: 1 }} />
                  <button className="thr-btn thr-btn-primary" onClick={returnToReadiness}>I'm Ready Now</button>
                </>
              ) : (
                <>
                  {step > 0 && (
                    <button className="thr-btn thr-btn-ghost" onClick={prev}>Previous</button>
                  )}

                  {currentStepName === 'Readiness' && hasInteractiveReadiness && readinessFilled && !readinessAllYes && !paused && (
                    <button className="thr-btn thr-btn-pause" onClick={triggerPause}>
                      {getPauseLabel(readinessRows, readinessSelections)}
                    </button>
                  )}

                  {currentStepName === 'Readiness' && !hasInteractiveReadiness && isOpening && !paused && (
                    <button className="thr-btn thr-btn-pause" onClick={triggerPause}>I'm not yet ready</button>
                  )}

                  {currentStepName === 'Readiness' && hasInteractiveReadiness && (
                    <span className={`thr-readiness-hint ${readinessFilled ? (readinessAllYes ? 'thr-readiness-hint--yes' : 'thr-readiness-hint--nyt') : ''}`}>
                      {!readinessFilled
                        ? `${unfilledCount} row${unfilledCount !== 1 ? 's' : ''} still need a selection.`
                        : readinessAllYes
                          ? 'All conditions confirmed. You may proceed.'
                          : ''
                      }
                    </span>
                  )}

                  <div style={{ flex: 1 }} />
                  {currentStepName === 'Confirm' ? (
                    <button className="thr-btn thr-btn-primary thr-btn-confirm" onClick={complete} disabled={!confirmed} style={{ opacity: confirmed ? 1 : 0.4 }}>
                      <Check size={16} /> {isOpening ? 'Begin Module' : 'Complete Session'}
                    </button>
                  ) : currentStepName !== 'Pause' && (
                    <button
                      className="thr-btn thr-btn-primary"
                      onClick={handleNext}
                      disabled={currentStepName === 'Readiness' && hasInteractiveReadiness && !readinessFilled}
                      style={{
                        opacity: (currentStepName === 'Readiness' && hasInteractiveReadiness && !readinessFilled) ? 0.4 : 1,
                        cursor: (currentStepName === 'Readiness' && hasInteractiveReadiness && !readinessFilled) ? 'not-allowed' : 'pointer',
                      }}
                    >
                      Next
                    </button>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
