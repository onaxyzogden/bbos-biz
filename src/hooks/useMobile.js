import { useState, useEffect } from 'react';

const BREAKPOINT = 768;

export function useMobile() {
  const [mobile, setMobile] = useState(window.innerWidth < BREAKPOINT);

  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < BREAKPOINT);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return mobile;
}
