import { useState, useEffect, useCallback } from 'react';
import { safeGetJSON, safeSet } from '../services/storage';

const PRAYER_NAMES = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

function parseTimeToDate(timeStr, today) {
  const [h, m] = timeStr.split(':').map(Number);
  const d = new Date(today);
  d.setHours(h, m, 0, 0);
  return d;
}

function getActivePrayer(timings, { leadMs = 5 * 60 * 1000, trailMs = 10 * 60 * 1000 } = {}) {
  if (!timings) return null;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const totalWindowMs = leadMs + trailMs;

  for (const name of PRAYER_NAMES) {
    const timeStr = timings[name];
    if (!timeStr) continue;
    const clean = timeStr.replace(/\s*\(.*\)/, '');
    const prayerTime = parseTimeToDate(clean, today);
    const diff = now - prayerTime;
    // Active window: from leadMs before prayer to trailMs after prayer
    // diff < 0 means prayer hasn't happened yet; diff > 0 means it has
    // Window: -leadMs <= diff <= trailMs
    if (diff >= -leadMs && diff <= trailMs) {
      const windowStart = prayerTime.getTime() - leadMs;
      const msRemaining = (windowStart + totalWindowMs) - now.getTime();
      return { name, msRemaining: Math.max(0, msRemaining) };
    }
  }
  return null;
}

function getNextPrayer(timings) {
  if (!timings) return null;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  for (const name of PRAYER_NAMES) {
    const timeStr = timings[name];
    if (!timeStr) continue;
    const clean = timeStr.replace(/\s*\(.*\)/, ''); // remove timezone annotation
    const prayerTime = parseTimeToDate(clean, today);
    if (prayerTime > now) {
      const diffMs = prayerTime - now;
      const diffMin = Math.floor(diffMs / 60000);
      const hours = Math.floor(diffMin / 60);
      const mins = diffMin % 60;
      return {
        name,
        time: clean,
        remaining: hours > 0 ? `${hours}h ${mins}m` : `${mins}m`,
        remainingMs: diffMs,
      };
    }
  }

  // All prayers passed — next is tomorrow's Fajr
  return {
    name: 'Fajr',
    time: timings.Fajr?.replace(/\s*\(.*\)/, '') || '',
    remaining: 'tomorrow',
    remainingMs: null,
  };
}

export function usePrayerTimes() {
  const [timings, setTimings] = useState(safeGetJSON('prayer_timings', null));
  const [nextPrayer, setNextPrayer] = useState(null);
  const [activePrayer, setActivePrayer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cityName, setCityName] = useState(safeGetJSON('prayer_city', null));

  const fetchTimings = useCallback(async (lat, lng) => {
    try {
      setLoading(true);
      setError(null);
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      const url = `https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}?latitude=${lat}&longitude=${lng}&method=2`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch prayer times');
      const data = await res.json();
      const t = data?.data?.timings;
      if (t) {
        setTimings(t);
        safeSet('prayer_timings', t);
        safeSet('prayer_date', `${yyyy}-${mm}-${dd}`);
        safeSet('prayer_coords', { lat, lng });
      }
      // Reverse geocode for city name (Nominatim, free, no key)
      try {
        const geo = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
          { headers: { 'Accept-Language': 'en' } }
        );
        const geoData = await geo.json();
        const city = geoData?.address?.city
          || geoData?.address?.town
          || geoData?.address?.village
          || geoData?.address?.county
          || '';
        const country = geoData?.address?.country_code?.toUpperCase() || '';
        const fullName = city && country ? `${city}, ${country}` : city || country || '';
        if (fullName) {
          setCityName(fullName);
          safeSet('prayer_city', fullName);
        }
      } catch { /* city name is cosmetic — silently ignore */ }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchTimings(pos.coords.latitude, pos.coords.longitude),
      (err) => setError('Location access denied'),
      { timeout: 10000 }
    );
  }, [fetchTimings]);

  // On mount: check if we have cached timings for today
  useEffect(() => {
    const cached = safeGetJSON('prayer_timings', null);
    const cachedDate = safeGetJSON('prayer_date', null);
    const coords = safeGetJSON('prayer_coords', null);
    const cachedCity = safeGetJSON('prayer_city', null);
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    if (cachedCity) setCityName(cachedCity);

    if (cached && cachedDate === todayStr) {
      setTimings(cached);
    } else if (coords) {
      // Refresh for today
      fetchTimings(coords.lat, coords.lng);
    }
  }, []);

  // Memoized update — recalculates activePrayer and nextPrayer from current timings
  const update = useCallback(() => {
    setNextPrayer(getNextPrayer(timings));
    setActivePrayer(getActivePrayer(timings));
  }, [timings]);

  // Poll every 30 seconds as a safety net
  useEffect(() => {
    if (!timings) return;
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, [timings, update]);

  // Immediately recheck when the tab becomes visible (screen wake / tab switch)
  useEffect(() => {
    if (!timings) return;
    const handleVisibility = () => {
      if (!document.hidden) update();
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [timings, update]);

  // Precision timer: fire exactly when the next prayer window opens
  useEffect(() => {
    if (!nextPrayer?.remainingMs) return;
    const LEAD_MS = 5 * 60 * 1000;
    const msUntilWindow = nextPrayer.remainingMs - LEAD_MS;
    // Skip if already in the window, or prayer is more than 4 hours away
    if (msUntilWindow <= 0 || msUntilWindow > 4 * 60 * 60 * 1000) return;
    const t = setTimeout(() => update(), msUntilWindow + 500);
    return () => clearTimeout(t);
  }, [nextPrayer?.remainingMs, update]);

  return {
    timings,
    nextPrayer,
    activePrayer,
    loading,
    error,
    requestLocation,
    cityName,
    allPrayers: timings
      ? PRAYER_NAMES.map((n) => ({ name: n, time: timings[n]?.replace(/\s*\(.*\)/, '') || '' }))
      : [],
  };
}
