import { useState, useEffect, useRef } from 'react';
import { useSettingsStore } from '../../store/settings-store';
import { PRESENCE_CONFIG } from '../../data/islamic-data';
import './PrayerOverlay.css';

export default function PrayerOverlay({ prayerName, prayerTimeMs, onDismiss }) {
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const isIslamic = valuesLayer === 'islamic';

  // Real-time clock — ticks every second
  const [now, setNow] = useState(Date.now());

  // Keep onDismiss in a ref so the interval never needs to be recreated
  const onDismissRef = useRef(onDismiss);
  useEffect(() => { onDismissRef.current = onDismiss; }, [onDismiss]);

  // Stable interval — set up once on mount, never restarts
  useEffect(() => {
    const interval = setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (prayerTimeMs) {
        const windowEnd = prayerTimeMs + PRESENCE_CONFIG.PRAYER_TRAIL_MS;
        if (t >= windowEnd) {
          clearInterval(interval);
          onDismissRef.current?.();
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []); // intentionally stable — immune to re-renders and prop changes

  // Derived from real time — always accurate, no drift
  const beforePrayer = prayerTimeMs ? now < prayerTimeMs : false;
  const displayMs = prayerTimeMs
    ? beforePrayer
      ? Math.max(0, prayerTimeMs - now)                                   // approaching: time TO prayer
      : Math.max(0, prayerTimeMs + PRESENCE_CONFIG.PRAYER_TRAIL_MS - now) // prayer: time until return to work
    : 0;

  const mins = Math.floor(displayMs / 60000);
  const secs = Math.floor((displayMs % 60000) / 1000);
  const timeStr = `${mins}:${String(secs).padStart(2, '0')}`;

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
