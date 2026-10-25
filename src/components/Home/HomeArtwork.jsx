import { useEffect, useRef } from 'react';
import { homeArtwork } from './homepageSketch';
import { useMediaQuery } from './useMediaQuery';

let p5Ready;
function loadP5() {
  if (window.p5) return Promise.resolve(window.p5);
  if (!p5Ready) {
    p5Ready = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = '/homepage/p5.js';
      script.onload = () => resolve(window.p5);
      script.onerror = () => {
        script.remove();
        p5Ready = undefined;
        reject(new Error('Unable to load homepage artwork'));
      };
      document.head.append(script);
    });
  }
  return p5Ready;
}

export default function HomeArtwork() {
  const hostRef = useRef(null);
  const desktop = useMediaQuery('(min-width: 641px)');
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    if (!desktop || reducedMotion) return;
    const host = hostRef.current;
    let disposed = false;
    let instance;
    let resize;
    let visible = false;
    const sync = () => {
      if (!instance) return;
      if (visible && !document.hidden) instance.loop();
      else instance.noLoop();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(host);
    document.addEventListener('visibilitychange', sync);
    loadP5().then(P5 => {
      if (disposed) return;
      instance = new P5(p => homeArtwork(p, host), host);
      resize = new ResizeObserver(() => {
        if (instance?.canvas) instance.resizeCanvas(host.clientWidth, host.clientHeight);
      });
      resize.observe(host);
      sync();
    }).catch(() => {
      // The static artwork remains visible if the optional animation cannot load.
    });
    return () => {
      disposed = true;
      observer.disconnect();
      resize?.disconnect();
      document.removeEventListener('visibilitychange', sync);
      instance?.remove();
    };
  }, [desktop, reducedMotion]);

  return <div className="home-artwork" ref={hostRef} aria-hidden="true" />;
}
