import { useState } from 'react';
import { X, Check, Pause } from 'lucide-react';
import { useThresholdStore } from '../../store/threshold-store';
import { MODULES } from '../../data/modules';
import {
  getModuleData, ONGOING_DUA, ISTIRJA, PAUSE_ACKNOWLEDGMENT,
  PAUSE_QUESTIONS, PAUSE_UNIVERSAL, DEFER_CONTENT, DEFER_UNIVERSAL,
} from '../../data/islamic-data';
import { lookupReadinessAyah } from '../../data/work-readiness-ayat';
import { useSettingsStore } from '../../store/settings-store';
import AttributeCard from './AttributeCard';
import DuaSection from './DuaSection';
import ReadinessCheck from './ReadinessCheck';
import './ThresholdModal.css';

// Initial selections — null means not yet answered
const INITIAL_SELECTIONS = { M1: null, M2: null, M3: null, W1: null, W2: null, W3: null };

function buildReadinessKey(selections) {
  return ['M1', 'M2', 'M3', 'W1', 'W2', 'W3']
    .map((k) => (selections[k] === true ? '1' : '0'))
    .join('');
}

function allFilled(selections) {
  return Object.values(selections).every((v) => v !== null);
}

function allYes(selections) {
  return Object.values(selections).every((v) => v === true);
}

function countNotYet(selections, prefix) {
  return Object.entries(selections)
    .filter(([k, v]) => k.startsWith(prefix) && v === false)
    .length;
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
  const [readinessSelections, setReadinessSelections] = useState({ ...INITIAL_SELECTIONS });

  const isOpening = type === 'opening';
  const moduleId = isOpening ? openingModuleId : closingModuleId;

  if (!moduleId) return null;

  const mod = MODULES.find((m) => m.id === moduleId);
  const data = getModuleData(moduleId, valuesLayer);
  const isIslamic = valuesLayer === 'islamic';
  const accentColor = 'var(--accent)';

  // Is this module using interactive readiness? (work module with rows)
  const hasInteractiveReadiness = isOpening && data?.readiness?.rows;

  // Dynamic steps — Pause inserts between Readiness and Confirm when triggered
  const baseSteps = isOpening
    ? ['Dua', 'Attributes', 'Readiness', 'Confirm']
    : ['Dua', 'Attributes', 'Reflection', 'Confirm'];

  const steps = paused
    ? [...baseSteps.slice(0, 3), 'Pause', baseSteps[3]]
    : baseSteps;

  const currentStepName = steps[step];

  // Readiness state derived values
  const readinessFilled = allFilled(readinessSelections);
  const readinessAllYes = allYes(readinessSelections);
  const readinessKey = buildReadinessKey(readinessSelections);
  const muhsinNotYet = countNotYet(readinessSelections, 'M');
  const wakilNotYet = countNotYet(readinessSelections, 'W');

  // Pause button label — matches mockup
  const getPauseLabel = () => {
    if (muhsinNotYet > 0 && wakilNotYet > 0) return 'Not yet aligned with the truth';
    if (muhsinNotYet > 0) return 'Not yet rested in Al-Muhsin';
    if (wakilNotYet > 0) return 'Not yet rested in Al-Wakil';
    return 'Not yet ready';
  };

  const resetState = () => {
    setStep(0);
    setConfirmed(false);
    setPaused(false);
    setShowingDeferScreen(false);
    setReadinessSelections({ ...INITIAL_SELECTIONS });
  };

  const close = () => {
    resetState();
    if (isOpening) setOpeningModuleId(null);
    else setClosingModuleId(null);
  };

  // Close from the defer screen — records the deferral, THEN closes
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
  const prev = () => { if (step > 0) { setStep(step - 1); if (currentStepName === 'Confirm') setConfirmed(false); } };

  const triggerPause = () => {
    if (!paused) { setPaused(true); setStep(3); }
  };

  // "Defer to Later" — show the compassionate defer screen (don't close yet)
  const defer = () => {
    setShowingDeferScreen(true);
  };

  const returnToReadiness = () => { setStep(2); };

  // Handle Next on the Readiness step — auto-trigger pause if any NOT YET
  const handleNext = () => {
    if (currentStepName === 'Readiness' && hasInteractiveReadiness && readinessFilled && !readinessAllYes && !paused) {
      triggerPause();
      return;
    }
    next();
  };

  // Handle readiness row selection
  const handleReadinessSelect = (id, value) => {
    setReadinessSelections((prev) => ({ ...prev, [id]: value }));
  };

  // Can proceed from Readiness step?
  const canAdvanceFromReadiness = hasInteractiveReadiness
    ? readinessFilled && readinessAllYes
    : true;

  const pauseQuestion = isIslamic
    ? (PAUSE_QUESTIONS[moduleId] || PAUSE_QUESTIONS.work)
    : (PAUSE_UNIVERSAL.questions[moduleId] || PAUSE_UNIVERSAL.questions.work);

  // Get the "not yet rested in" guidance for the defer screen
  const deferGuidance = isIslamic
    ? DEFER_CONTENT.getGuidanceQuestion(moduleId)
    : DEFER_UNIVERSAL.getGuidanceQuestion(moduleId);

  const deferAck = isIslamic ? DEFER_CONTENT.acknowledgment : DEFER_UNIVERSAL.acknowledgment;
  const deferHolding = isIslamic ? DEFER_CONTENT.holdingMessage : DEFER_UNIVERSAL.holdingMessage;

  // Look up condition-specific ayah from the matrix
  const pauseAyah = (hasInteractiveReadiness && isIslamic && readinessKey !== '111111')
    ? lookupReadinessAyah(readinessKey)
    : null;

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
                {/* 1. Acknowledgment */}
                <p className="thr-defer-ack">{deferAck}</p>

                {/* 2. One "not yet rested in" item to sit with */}
                {deferGuidance && (
                  <div>
                    <p className="thr-defer-guidance-label">A question to sit with:</p>
                    <p className="thr-defer-guidance">{deferGuidance}</p>
                  </div>
                )}

                {/* 3. Closing practice — tawakkul (Islamic) or reflection (Universal) */}
                {isIslamic ? (
                  <DuaSection dua={ONGOING_DUA} color={accentColor} />
                ) : (
                  <div className="il-mindfulness">
                    <p>{DEFER_UNIVERSAL.reflection}</p>
                  </div>
                )}

                {/* 4. Holding message */}
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

            {/* Header */}
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

            {/* Step indicators */}
            <div className="thr-steps">
              {steps.map((s, i) => (
                <button
                  key={s}
                  className={`thr-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''} ${s === 'Pause' ? 'thr-step-pause' : ''}`}
                  onClick={() => { if (i <= step) setStep(i); }}
                >
                  {s === 'Pause' ? <><Pause size={11} /> Pause</> : s}
                </button>
              ))}
            </div>

            {/* Body */}
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

              {(currentStepName === 'Readiness' || currentStepName === 'Reflection') && data && (
                <div className="thr-step-content fade-in">
                  {isOpening && hasInteractiveReadiness ? (
                    <ReadinessCheck
                      readiness={data.readiness}
                      color={accentColor}
                      interactive={true}
                      selections={readinessSelections}
                      onSelect={handleReadinessSelect}
                    />
                  ) : isOpening ? (
                    <ReadinessCheck readiness={data.readiness} color={accentColor} />
                  ) : (
                    <ReadinessCheck reflection={data.reflection} color={accentColor} />
                  )}
                </div>
              )}

              {currentStepName === 'Pause' && (
                <div className="thr-step-content thr-pause-content fade-in">
                  <p className="thr-pause-ack">
                    {isIslamic ? PAUSE_ACKNOWLEDGMENT : PAUSE_UNIVERSAL.acknowledgment}
                  </p>

                  {/* Condition-specific ayah from readiness matrix */}
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

            {/* Footer */}
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

                  {/* Interactive readiness: show contextual pause button when any NOT YET */}
                  {currentStepName === 'Readiness' && hasInteractiveReadiness && readinessFilled && !readinessAllYes && !paused && (
                    <button className="thr-btn thr-btn-pause" onClick={triggerPause}>
                      {getPauseLabel()}
                    </button>
                  )}

                  {/* Non-interactive readiness: original "I'm not yet ready" button */}
                  {currentStepName === 'Readiness' && !hasInteractiveReadiness && isOpening && !paused && (
                    <button className="thr-btn thr-btn-pause" onClick={triggerPause}>I'm not yet ready</button>
                  )}

                  {/* Interactive readiness hint text */}
                  {currentStepName === 'Readiness' && hasInteractiveReadiness && (
                    <span className={`thr-readiness-hint ${readinessFilled ? (readinessAllYes ? 'thr-readiness-hint--yes' : 'thr-readiness-hint--nyt') : ''}`}>
                      {!readinessFilled
                        ? `${Object.values(readinessSelections).filter((v) => v === null).length} row${Object.values(readinessSelections).filter((v) => v === null).length !== 1 ? 's' : ''} still need a selection.`
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
                      disabled={currentStepName === 'Readiness' && hasInteractiveReadiness && (!readinessFilled || !readinessAllYes)}
                      style={{
                        opacity: (currentStepName === 'Readiness' && hasInteractiveReadiness && (!readinessFilled || !readinessAllYes)) ? 0.4 : 1,
                        cursor: (currentStepName === 'Readiness' && hasInteractiveReadiness && (!readinessFilled || !readinessAllYes)) ? 'not-allowed' : 'pointer',
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
