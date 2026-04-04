import { useState, useEffect } from 'react';
import { useSettingsStore } from '../../store/settings-store';
import { PRESENCE_CONFIG } from '../../data/islamic-data';
import './PrayerOverlay.css';

const DEFAULT_DURATION = PRESENCE_CONFIG.PRAYER_LEAD_MS + PRESENCE_CONFIG.PRAYER_TRAIL_MS;

export default function PrayerOverlay({ prayerName, initialMs, onDismiss }) {
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const isIslamic = valuesLayer === 'islamic';
  const [remaining, setRemaining] = useState(initialMs || DEFAULT_DURATION);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((prev) => {
        const next = prev - 1000;
        if (next <= 0) {
          clearInterval(interval);
          onDismiss();
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [onDismiss]);

  const mins = Math.floor(remaining / 60000);
  const secs = Math.floor((remaining % 60000) / 1000);
  const timeStr = `${mins}:${String(secs).padStart(2, '0')}`;

  // Determine if we're before or after prayer time
  const beforePrayer = remaining > PRESENCE_CONFIG.PRAYER_TRAIL_MS;

  return (
    <div className="prayer-overlay">
      <div className="prayer-content">
        {isIslamic ? (
          <>
            <p className="prayer-basmala arabic">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
            <h1 className="prayer-name">{prayerName}</h1>
            <p className="prayer-prompt">
              {beforePrayer ? 'Prayer time is approaching.' : 'It is time for prayer.'}
            </p>
          </>
        ) : (
          <>
            <h1 className="prayer-name-universal">Time for a Break</h1>
            <p className="prayer-prompt">Take a moment to stretch, breathe, and rest your eyes.</p>
          </>
        )}

        <div className="prayer-countdown">{timeStr}</div>

        <button className="prayer-dismiss" onClick={onDismiss}>
          Return to work
        </button>
      </div>
    </div>
  );
}
