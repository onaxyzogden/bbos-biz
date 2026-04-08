import { useState } from 'react';
import { Sun, Check } from 'lucide-react';
import { useThresholdStore } from '../../store/threshold-store';
import { useSettingsStore } from '../../store/settings-store';
import { MAQASID_PILLARS, getPillarLabel } from '../../data/maqasid';
import DuaSection from './DuaSection';
import IslamicTerm from '../shared/IslamicTerm';
import './NiyyahAct.css';

const PILLAR_GLOSSARY_KEY = {
  faith: 'hifz-al-din',
  life: 'hifz-al-nafs',
  intellect: 'hifz-al-aql',
  family: 'hifz-al-nasl',
  wealth: 'hifz-al-mal',
  environment: 'hifz-al-biah',
  ummah: 'hifz-al-ummah',
};

const MORNING_DUA = {
  title: 'Morning Supplication',
  arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ',
  trans: 'Allāhumma bika aṣbaḥnā wa bika amsaynā wa bika naḥyā wa bika namūtu wa ilayka n-nushūr',
  meaning: 'O Allah, by You we enter the morning and by You we enter the evening; by You we live and by You we die, and to You is the resurrection.',
  source: 'Sunan at-Tirmidhi 3391',
};

const UNIVERSAL_PROMPT = {
  meaning: 'Take a moment to set your intention for today. What matters most? Where will you direct your energy with purpose and clarity?',
};

const STEPS = ['orient', 'focus'];

export default function NiyyahAct() {
  const completeNiyyah = useThresholdStore((s) => s.completeNiyyah);
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const isIslamic = valuesLayer === 'islamic';

  const [step, setStep] = useState(0);
  const [selectedPillars, setSelectedPillars] = useState([]);

  const togglePillar = (id) => {
    setSelectedPillars((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    completeNiyyah(selectedPillars);
  };

  const handleSkip = () => {
    completeNiyyah([]);
  };

  const currentStep = STEPS[step];

  return (
    <div className="niyyah-overlay">
      <div className="niyyah-card">
        {/* Header */}
        <div className="niyyah-header">
          <span className="niyyah-badge">
            {isIslamic ? (
              <><IslamicTerm id="al-rahman">AL-RAHMĀN</IslamicTerm> · <IslamicTerm id="al-rahim">AL-RAHĪM</IslamicTerm></>
            ) : 'DAILY ORIENTATION'}
          </span>
          <h2 className="niyyah-title">
            {isIslamic ? <>Daily <IslamicTerm id="niyyah">Niyyah</IslamicTerm></> : 'Daily Intention'}
          </h2>
          <p className="niyyah-subtitle">
            {isIslamic
              ? 'Orient yourself under divine mercy before entering your work'
              : 'Set your focus before entering your workspace'}
          </p>
        </div>

        {/* Body */}
        <div className="niyyah-body">
          {/* Step indicator */}
          <div className="niyyah-steps">
            {STEPS.map((s, i) => (
              <div
                key={s}
                className={`niyyah-step-dot${
                  i === step ? ' niyyah-step-dot--active' : ''
                }${i < step ? ' niyyah-step-dot--done' : ''}`}
              />
            ))}
          </div>

          {currentStep === 'orient' && (
            <>
              {isIslamic ? (
                <>
                  <div className="niyyah-bismillah">
                    <p className="niyyah-bismillah-ar">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
                    <p className="niyyah-bismillah-en">In the name of Allah, the Most Gracious, the Most Merciful</p>
                  </div>
                  <DuaSection dua={MORNING_DUA} color="var(--accent)" />
                </>
              ) : (
                <div className="niyyah-mindfulness">
                  <p className="niyyah-mindfulness-text">{UNIVERSAL_PROMPT.meaning}</p>
                </div>
              )}
            </>
          )}

          {currentStep === 'focus' && (
            <>
              <p className="niyyah-focus-heading">
                {isIslamic ? "Today's pillar focus" : "Today's focus areas"}
              </p>
              <div className="niyyah-pillars">
                {MAQASID_PILLARS.map((p) => {
                  const selected = selectedPillars.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      className={`niyyah-pillar-btn${selected ? ' niyyah-pillar-btn--selected' : ''}`}
                      onClick={() => togglePillar(p.id)}
                    >
                      <div
                        className="niyyah-pillar-dot"
                        style={{ background: selected ? p.accentColor : p.accentColor + '40' }}
                      />
                      <div>
                        <span className="niyyah-pillar-label">
                          {getPillarLabel(p, valuesLayer)}
                        </span>
                        {isIslamic && (
                          <span className="niyyah-pillar-root">
                            <IslamicTerm id={PILLAR_GLOSSARY_KEY[p.id]}>{p.arabicRoot}</IslamicTerm>
                          </span>
                        )}
                      </div>
                      {selected && <Check size={14} style={{ marginLeft: 'auto', color: 'var(--primary)' }} />}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="niyyah-footer">
          {currentStep === 'orient' ? (
            <button className="niyyah-confirm" onClick={() => setStep(1)}>
              <Sun size={16} />
              {isIslamic ? <><IslamicTerm id="bismillah">Bismillah</IslamicTerm> — Continue</> : 'Continue'}
            </button>
          ) : (
            <>
              <button className="niyyah-skip" onClick={handleSkip}>
                Skip
              </button>
              <button className="niyyah-confirm" onClick={handleConfirm}>
                <Check size={16} />
                {isIslamic ? 'Begin with intention' : 'Set intention'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
