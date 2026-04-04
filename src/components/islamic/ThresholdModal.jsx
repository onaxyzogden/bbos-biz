import { useState } from 'react';
import { X, Check, Pause } from 'lucide-react';
import { useThresholdStore } from '../../store/threshold-store';
import { MODULES } from '../../data/modules';
import {
  getModuleData, ONGOING_DUA, ISTIRJA, PAUSE_ACKNOWLEDGMENT,
  PAUSE_QUESTIONS, PAUSE_UNIVERSAL, DEFER_CONTENT, DEFER_UNIVERSAL,
} from '../../data/islamic-data';
import { useSettingsStore } from '../../store/settings-store';
import AttributeCard from './AttributeCard';
import DuaSection from './DuaSection';
import ReadinessCheck from './ReadinessCheck';
import './ThresholdModal.css';

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

  const isOpening = type === 'opening';
  const moduleId = isOpening ? openingModuleId : closingModuleId;

  if (!moduleId) return null;

  const mod = MODULES.find((m) => m.id === moduleId);
  const data = getModuleData(moduleId, valuesLayer);
  const isIslamic = valuesLayer === 'islamic';
  const accentColor = 'var(--accent)';

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

  const pauseQuestion = isIslamic
    ? (PAUSE_QUESTIONS[moduleId] || PAUSE_QUESTIONS.work)
    : (PAUSE_UNIVERSAL.questions[moduleId] || PAUSE_UNIVERSAL.questions.work);

  // Get the "not yet rested in" guidance for the defer screen
  const deferGuidance = isIslamic
    ? DEFER_CONTENT.getGuidanceQuestion(moduleId)
    : DEFER_UNIVERSAL.getGuidanceQuestion(moduleId);

  const deferAck = isIslamic ? DEFER_CONTENT.acknowledgment : DEFER_UNIVERSAL.acknowledgment;
  const deferHolding = isIslamic ? DEFER_CONTENT.holdingMessage : DEFER_UNIVERSAL.holdingMessage;

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
                  {isOpening
                    ? <ReadinessCheck readiness={data.readiness} color={accentColor} />
                    : <ReadinessCheck reflection={data.reflection} color={accentColor} />
                  }
                </div>
              )}

              {currentStepName === 'Pause' && (
                <div className="thr-step-content thr-pause-content fade-in">
                  <p className="thr-pause-ack">
                    {isIslamic ? PAUSE_ACKNOWLEDGMENT : PAUSE_UNIVERSAL.acknowledgment}
                  </p>
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
                  {(currentStepName === 'Readiness' || currentStepName === 'Reflection') && isOpening && !paused && (
                    <button className="thr-btn thr-btn-pause" onClick={triggerPause}>I'm not yet ready</button>
                  )}
                  <div style={{ flex: 1 }} />
                  {currentStepName === 'Confirm' ? (
                    <button className="thr-btn thr-btn-primary thr-btn-confirm" onClick={complete} disabled={!confirmed} style={{ opacity: confirmed ? 1 : 0.4 }}>
                      <Check size={16} /> {isOpening ? 'Begin Module' : 'Complete Session'}
                    </button>
                  ) : currentStepName !== 'Pause' && (
                    <button className="thr-btn thr-btn-primary" onClick={next}>Next</button>
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
