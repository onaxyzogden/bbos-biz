import { useState } from 'react';
import { Kanban, Wallet, Users, Building2, Shield, Activity, BrainCircuit, Sparkles, Library, Lightbulb, Wrench, Heart, Baby, Handshake, Home, PiggyBank, Scale, Gift, Droplets, Recycle, TreeDeciduous, ShoppingBag, TreePine } from 'lucide-react';
import { useThresholdStore } from '../../store/threshold-store';
import { useSettingsStore } from '../../store/settings-store';
import { MODULES } from '../../data/modules';
import { getStage } from '../../data/bbos-pipeline';
import './CeremonyGate.css';

const ICON_MAP = { Kanban, Wallet, Users, Building2, Shield, Activity, BrainCircuit, Sparkles, Library, Lightbulb, Wrench, Heart, Baby, Handshake, Home, PiggyBank, Scale, Gift, Droplets, Recycle, TreeDeciduous, ShoppingBag, TreePine };

export default function CeremonyGate({ moduleId }) {
  const setOpeningModuleId = useThresholdStore((s) => s.setOpeningModuleId);
  const completeOpening = useThresholdStore((s) => s.completeOpening);
  const deferred = useThresholdStore((s) => s.deferred);
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);

  const isBbosGate = moduleId?.startsWith('bbos:');
  const bbosGateStage = isBbosGate ? getStage(moduleId.slice(5)) : null;
  const mod = isBbosGate ? null : MODULES.find((m) => m.id === moduleId);
  const Icon = mod ? ICON_MAP[mod.icon] : null;
  const isIslamic = valuesLayer === 'islamic';
  const isDeferred = !!deferred[moduleId];

  if (showSkipConfirm) {
    return (
      <div className="ceremony-gate">
        {Icon && (
          <div className="ceremony-gate-icon">
            <Icon size={36} style={{ color: 'var(--accent)' }} />
          </div>
        )}

        <h2 className="ceremony-gate-title">Are you sure you want to skip this part?</h2>

        <p className="ceremony-gate-sub">
          You can return to this anytime by clicking the Opening Threshold button on the right sidebar.
        </p>

        <div className="ceremony-gate-actions">
          <button
            className="btn btn-primary ceremony-gate-btn"
            onClick={() => completeOpening(moduleId)}
          >
            Yes, let&rsquo;s dive right in
          </button>
          <button
            className="btn btn-secondary ceremony-gate-btn"
            onClick={() => setShowSkipConfirm(false)}
          >
            Actually, let me ground myself first
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ceremony-gate">
      {Icon && (
        <div className="ceremony-gate-icon">
          <Icon size={36} style={{ color: 'var(--accent)' }} />
        </div>
      )}

      <h2 className="ceremony-gate-title">
        {isDeferred
          ? (isIslamic
            ? `You deferred this module\u2019s opening. When you are ready, the threshold is here.`
            : `You deferred setting your intention. When you are ready, it is here.`)
          : (isIslamic
            ? `This module begins with an opening threshold`
            : `This module begins with setting an intention`)
        }
      </h2>

      <p className="ceremony-gate-sub">
        {isIslamic
          ? 'The opening is not a barrier \u2014 it is a beginning. A deliberate pause to ground your work in its governing attributes before engaging.'
          : 'The opening is not a barrier \u2014 it is a beginning. A deliberate pause to set your intention and align your values before engaging.'
        }
      </p>

      <button
        className={isDeferred ? 'btn btn-secondary ceremony-gate-btn' : 'btn btn-primary ceremony-gate-btn'}
        onClick={() => setOpeningModuleId(moduleId)}
      >
        {isDeferred
          ? (isIslamic ? 'Return to Opening' : 'Return to Set Intention')
          : (isIslamic ? 'Begin Opening' : 'Set Intention')
        }
      </button>

      <button
        className="btn btn-ghost ceremony-gate-skip"
        onClick={() => setShowSkipConfirm(true)}
      >
        Skip
      </button>
    </div>
  );
}
