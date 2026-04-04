import { X } from 'lucide-react';
import { useSettingsStore } from '../../store/settings-store';
import './PrayerWarning.css';

export default function PrayerWarning({ prayerName, minutesUntilLock, onDismiss }) {
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const isIslamic = valuesLayer === 'islamic';
  const mins = Math.max(1, minutesUntilLock || 0);

  return (
    <div className="prayer-warning">
      <div className="prayer-warning-content">
        <span className="prayer-warning-text">
          {isIslamic
            ? `${prayerName} in ${mins}m \u2014 screen will pause for prayer`
            : `Break in ${mins}m`
          }
        </span>
        <button className="prayer-warning-dismiss" onClick={onDismiss} title="Dismiss">
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
