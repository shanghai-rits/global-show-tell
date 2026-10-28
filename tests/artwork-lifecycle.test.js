import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';

test('legacy artwork runs only while visible and the document is active', () => {
  const events = new Map();
  let observe, running, disconnected = false;
  const context = {
    document: { hidden: false, addEventListener: (name, fn) => events.set(name, fn), removeEventListener: name => events.delete(name) },
    window: {
      loop: () => { running = true; }, noLoop: () => { running = false; },
      addEventListener: (name, fn) => events.set(name, fn), removeEventListener: name => events.delete(name),
    },
    IntersectionObserver: class {
      constructor(fn) { observe = fn; }
      observe() {} disconnect() { disconnected = true; }
    },
  };
  vm.runInNewContext(readFileSync(new URL('../public/scripts/artwork-lifecycle.js', import.meta.url), 'utf8'), context);
  context.window.NYUArtworkLifecycle.observe({});
  assert.equal(running, false);
  observe([{ isIntersecting: true }]); assert.equal(running, true);
  context.document.hidden = true;
  events.get('visibilitychange')(); assert.equal(running, false);
  context.document.hidden = false;
  events.get('visibilitychange')(); assert.equal(running, true);
  observe([{ isIntersecting: false }]); assert.equal(running, false);
  events.get('pagehide')({ persisted: true });
  assert.equal(disconnected, false, 'back-forward cache can resume');
  observe([{ isIntersecting: true }]);
  events.get('pageshow')(); assert.equal(running, true);
  events.get('pagehide')({ persisted: false });
  assert.equal(disconnected, true);
  assert.equal(events.size, 0);
});
