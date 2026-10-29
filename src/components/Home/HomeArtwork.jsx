import { useEffect, useRef } from 'react';
import { mountArtwork } from '../../artwork/index.js';
import { useMediaQuery } from './useMediaQuery';

export default function HomeArtwork() {
  const hostRef = useRef(null);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  useEffect(() => {
    if (reducedMotion) return;
    return mountArtwork(hostRef.current, 'home');
  }, [reducedMotion]);
  return <div className="home-artwork" ref={hostRef} aria-hidden="true" />;
}
