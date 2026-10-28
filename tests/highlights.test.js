import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';

function gallery() {
  const pendingImages = [], frames = [], timers = [], callbacks = {};
  let preloadCount = 0;
  const context = {
    window: { matchMedia: () => ({ matches: false }) },
    document: { hidden: false },
    Image: class { set src(value) { this.url = value; pendingImages.push(this); preloadCount++; } },
    Vue: {
      ref: value => ({ value }), nextTick: async () => {},
      onMounted: fn => { callbacks.mount = fn; },
      onUnmounted: fn => { callbacks.unmount = fn; },
    },
    setInterval: fn => { callbacks.rotate = fn; return 1; }, clearInterval: () => {},
    requestAnimationFrame: fn => { frames.push(fn); return frames.length; }, cancelAnimationFrame: () => {},
    setTimeout: fn => { timers.push(fn); return timers.length; }, clearTimeout: () => {},
  };
  vm.runInNewContext(readFileSync(new URL('../public/scripts/highlights.js', import.meta.url), 'utf8'), context);
  const state = context.window.NYUHighlights.setup({ count: 6 });
  callbacks.mount();
  return { context, state, callbacks, frames, timers, pendingImages, preloads: () => preloadCount,
    finishImages: () => pendingImages.splice(0).forEach(img => img.onload()) };
}

test('slow image loading allows only one pending rotation', async () => {
  const g = gallery();
  const first = g.callbacks.rotate();
  await g.callbacks.rotate();
  assert.equal(g.preloads(), 6);
  g.finishImages();
  await first;
  await g.callbacks.rotate();
  assert.equal(g.preloads(), 6, 'scheduled fade remains locked');
  g.frames.shift()();
  g.timers.shift()();
  const next = g.callbacks.rotate();
  assert.equal(g.preloads(), 12, 'next rotation works after the fade');
  g.finishImages(); await next;
});

test('opening a preview while preloading cancels the pending rotation', async () => {
  const g = gallery();
  const previous = g.state.displayedImages.value;
  const rotation = g.callbacks.rotate();
  g.state.preview.value = { src: 'preview.jpg' };
  g.finishImages(); await rotation;
  assert.equal(g.state.displayedImages.value, previous);
  assert.equal(g.frames.length, 0);
  assert.equal(g.state.crossFading.value, false);
});

test('hidden and unmounted galleries do not start a loaded transition', async () => {
  for (const pause of [g => { g.context.document.hidden = true; }, g => g.callbacks.unmount()]) {
    const g = gallery();
    const rotation = g.callbacks.rotate();
    pause(g);
    g.finishImages(); await rotation;
    assert.equal(g.frames.length, 0);
  }
});
