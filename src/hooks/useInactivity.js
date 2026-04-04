import { useEffect, useRef, useCallback } from 'react';

const EVENTS = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
const THROTTLE_MS = 30000; // Only process activity once per 30 seconds

export function useInactivity({ timeoutMs = 20 * 60 * 1000, onInactive, onResume }) {
  const timerRef = useRef(null);
  const isInactiveRef = useRef(false);
  const lastActivityRef = useRef(Date.now());

  const handleActivity = useCallback(() => {
    const now = Date.now();

    // Throttle — ignore rapid-fire events
    if (now - lastActivityRef.current < THROTTLE_MS && !isInactiveRef.current) return;
    lastActivityRef.current = now;

    // If we were inactive, this is a resume
    if (isInactiveRef.current) {
      isInactiveRef.current = false;
      onResume?.();
    }

    // Reset the inactivity timer
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      isInactiveRef.current = true;
      onInactive?.();
    }, timeoutMs);
  }, [timeoutMs, onInactive, onResume]);

  // Handle tab visibility changes
  const handleVisibility = useCallback(() => {
    if (document.visibilityState === 'visible') {
      // Tab became visible — check if we should trigger resume
      const elapsed = Date.now() - lastActivityRef.current;
      if (elapsed >= timeoutMs && !isInactiveRef.current) {
        isInactiveRef.current = true;
        onInactive?.();
      }
      // The next user event will trigger handleActivity → onResume
    }
  }, [timeoutMs, onInactive]);

  useEffect(() => {
    // Start the initial timer
    timerRef.current = setTimeout(() => {
      isInactiveRef.current = true;
      onInactive?.();
    }, timeoutMs);

    // Attach listeners
    EVENTS.forEach((e) => window.addEventListener(e, handleActivity, { passive: true }));
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearTimeout(timerRef.current);
      EVENTS.forEach((e) => window.removeEventListener(e, handleActivity));
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [handleActivity, handleVisibility, timeoutMs, onInactive]);
}
