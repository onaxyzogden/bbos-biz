import { Kanban, Wallet, Users, Building2, Shield, CheckCircle2, Clock, Circle } from 'lucide-react';
import './ModuleHealthCard.css';

const ICON_MAP = { Kanban, Wallet, Users, Building2, Shield };

export default function ModuleHealthCard({ module, ceremonyComplete, isDeferred, taskCount }) {
  const Icon = ICON_MAP[module.icon];

  return (
    <div className="mod-health-card" style={{ borderTopColor: module.color }}>
      <div className="mhc-header">
        {Icon && <Icon size={18} style={{ color: module.color }} />}
        <span className="mhc-name">{module.name}</span>
      </div>

      {module.ready ? (
        <div className="mhc-body">
          <div className={`mhc-status ${ceremonyComplete ? 'mhc-status-done' : isDeferred ? 'mhc-status-deferred' : 'mhc-status-pending'}`}>
            {ceremonyComplete ? (
              <><CheckCircle2 size={14} /> Opening complete</>
            ) : isDeferred ? (
              <><Clock size={14} /> Deferred</>
            ) : (
              <><Circle size={14} /> Not started</>
            )}
          </div>
          {taskCount != null && (
            <div className="mhc-metric">{taskCount} task{taskCount !== 1 ? 's' : ''}</div>
          )}
        </div>
      ) : (
        <div className="mhc-coming-soon">Coming Soon</div>
      )}
    </div>
  );
}
