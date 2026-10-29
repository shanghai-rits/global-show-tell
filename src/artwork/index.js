import { createArtworkSketch } from './sketch.js';
import { artworkPresets } from './presets.js';
import { observeArtwork } from './lifecycle.js';

let p5Ready;
function loadP5() {
  if (window.p5) return Promise.resolve(window.p5);
  if (!p5Ready) {
    p5Ready = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = '/scripts/vendor/p5.js';
      script.onload = () => resolve(window.p5);
      script.onerror = () => {
        script.remove();
        p5Ready = undefined;
        reject(new Error('Unable to load artwork runtime'));
      };
      document.head.append(script);
    });
  }
  return p5Ready;
}

export function mountArtwork(host, presetName) {
  const preset = artworkPresets[presetName];
  if (!preset) throw new Error(`Unknown artwork preset: ${presetName}`);
  let disposed = false, instance, stopObserving;
  loadP5().then(P5 => {
    if (disposed) return;
    instance = new P5(p => {
      createArtworkSketch(p, host, preset);
      const setup = p.setup;
      p.setup = () => {
        if (disposed) return;
        setup();
        stopObserving = observeArtwork(host, p);
      };
    }, host);
  }).catch(error => console.error('Unable to start artwork:', error));
  return () => {
    if (disposed) return;
    disposed = true;
    stopObserving?.();
    instance?.remove();
  };
}
