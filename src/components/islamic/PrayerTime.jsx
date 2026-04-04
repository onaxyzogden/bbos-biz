import { Clock, MapPin } from 'lucide-react';
import { usePrayerTimes } from '../../hooks/usePrayerTimes';
import './PrayerTime.css';

export default function PrayerTime() {
  const { nextPrayer, loading, error, requestLocation, allPrayers, timings } = usePrayerTimes();

  if (!timings && !loading) {
    return (
      <div className="pt-container">
        <button className="pt-enable" onClick={requestLocation}>
          <MapPin size={14} />
          <span>Enable prayer times</span>
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="pt-container">
        <div className="pt-loading">Loading prayer times...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-container">
        <div className="pt-error">{error}</div>
        <button className="pt-enable" onClick={requestLocation}>
          <MapPin size={14} /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="pt-container">
      {nextPrayer && (
        <div className="pt-next">
          <div className="pt-next-label">
            <Clock size={12} />
            <span>Next Prayer</span>
          </div>
          <div className="pt-next-name">{nextPrayer.name}</div>
          <div className="pt-next-time">
            {nextPrayer.time}
            <span className="pt-countdown">
              {nextPrayer.remaining === 'tomorrow' ? 'tomorrow' : `in ${nextPrayer.remaining}`}
            </span>
          </div>
        </div>
      )}
      <div className="pt-all">
        {allPrayers.map((p) => (
          <div
            key={p.name}
            className={`pt-row ${nextPrayer?.name === p.name ? 'pt-row-next' : ''}`}
          >
            <span className="pt-prayer-name">{p.name}</span>
            <span className="pt-prayer-time">{p.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
