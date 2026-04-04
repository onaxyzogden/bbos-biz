import { Kanban, Wallet, Users, Building2, Shield } from 'lucide-react';
import { useThresholdStore } from '../../store/threshold-store';
import { useSettingsStore } from '../../store/settings-store';
import { MODULES } from '../../data/modules';
import './CeremonyGate.css';

const ICON_MAP = { Kanban, Wallet, Users, Building2, Shield };

export default function CeremonyGate({ moduleId }) {
  const setOpeningModuleId = useThresholdStore((s) => s.setOpeningModuleId);
  const deferred = useThresholdStore((s) => s.deferred);
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);

  const mod = MODULES.find((m) => m.id === moduleId);
  const Icon = mod ? ICON_MAP[mod.icon] : null;
  const isIslamic = valuesLayer === 'islamic';
  const isDeferred = !!deferred[moduleId];

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
    </div>
  );
}
