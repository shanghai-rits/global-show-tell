import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';

function artwork({ reducedMotion = false } = {}) {
  const events = new Map();
  const motion = {
    matches: reducedMotion,
    addEventListener: (name, fn) => events.set(`motion:${name}`, fn),
    removeEventListener: name => events.delete(`motion:${name}`),
  };
  const host = { clientWidth: 390, clientHeight: 180 };
  const state = { running: false, observed: null, resized: [], disconnected: false, resizeDisconnected: false };
  let intersect, resize;
  const context = {
    document: { hidden: false, addEventListener: (name, fn) => events.set(name, fn), removeEventListener: name => events.delete(name) },
    window: {
      matchMedia: query => {
        assert.equal(query, '(prefers-reduced-motion: reduce)');
        return motion;
      },
      loop: () => { state.running = true; }, noLoop: () => { state.running = false; },
      resizeCanvas: (width, height) => state.resized.push([width, height]),
      addEventListener: (name, fn) => events.set(name, fn), removeEventListener: name => events.delete(name),
    },
    IntersectionObserver: class {
      constructor(fn) { intersect = fn; }
      observe(target) { state.observed = target; }
      disconnect() { state.disconnected = true; }
    },
    ResizeObserver: class {
      constructor(fn) { resize = fn; }
      observe(target) { assert.equal(target, host); }
      disconnect() { state.resizeDisconnected = true; }
    },
  };
  vm.runInNewContext(readFileSync(new URL('../src/artwork/lifecycle.js', import.meta.url), 'utf8').replace('export function observeArtwork', 'function observeArtwork'), context);
  const dispose = context.observeArtwork(host, context.window);
  return { events, motion, host, state, context, dispose, intersect: value => intersect([{ isIntersecting: value }]), resize: () => resize() };
}

test('artwork observes its host and runs only in an active document', () => {
  const a = artwork();
  assert.equal(a.state.observed, a.host, 'observe the clipped viewport rather than an oversized canvas');
  assert.equal(a.state.running, false);
  a.intersect(true); assert.equal(a.state.running, true);
  a.context.document.hidden = true;
  a.events.get('visibilitychange')(); assert.equal(a.state.running, false);
  a.context.document.hidden = false;
  a.events.get('visibilitychange')(); assert.equal(a.state.running, true);
  a.intersect(false); assert.equal(a.state.running, false);
  a.events.get('pagehide')({ persisted: true });
  assert.equal(a.state.disconnected, false, 'back-forward cache can resume');
  a.intersect(true);
  a.events.get('pageshow')(); assert.equal(a.state.running, true);
  a.events.get('pagehide')({ persisted: false });
  assert.equal(a.state.disconnected, true);
  assert.equal(a.state.resizeDisconnected, true);
  assert.equal(a.events.size, 0);
});

test('canvas resizes to the banner after orientation or viewport changes', () => {
  const a = artwork();
  a.resize();
  assert.deepEqual(a.state.resized, [], 'unchanged dimensions do not trigger redraws');
  a.host.clientWidth = 844;
  a.host.clientHeight = 211;
  a.resize();
  assert.deepEqual(a.state.resized, [[844, 211]]);
  a.resize();
  assert.equal(a.state.resized.length, 1);
  a.host.clientHeight = 0;
  a.resize();
  assert.equal(a.state.resized.length, 1, 'ignore transient zero-size layouts');
});

test('reduced motion prevents looping and responds to preference changes', () => {
  const a = artwork({ reducedMotion: true });
  a.intersect(true);
  assert.equal(a.state.running, false, 'a visible banner remains still when reduced motion is enabled');
  a.motion.matches = false;
  a.events.get('motion:change')();
  assert.equal(a.state.running, true);
  a.motion.matches = true;
  a.events.get('motion:change')();
  assert.equal(a.state.running, false);
  a.intersect(false);
  a.motion.matches = false;
  a.events.get('motion:change')();
  assert.equal(a.state.running, false, 'turning motion back on cannot start an off-screen banner');
  a.intersect(true);
  assert.equal(a.state.running, true);
});

test('unmount cleanup prevents queued observers from restarting an instance', () => {
  const a = artwork();
  a.intersect(true);
  a.dispose();
  a.intersect(true);
  a.host.clientWidth = 844;
  a.resize();
  a.dispose();
  assert.equal(a.state.running, false);
  assert.equal(a.state.resized.length, 0);
  assert.equal(a.events.size, 0);
});
