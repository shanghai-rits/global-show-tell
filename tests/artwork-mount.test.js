import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';

function runtime() {
  const state = { scripts: [], created: 0, removed: 0, stopped: 0, errors: [] };
  class P5 {
    constructor(configure) {
      state.created++;
      configure(this);
      this.setup();
    }
    remove() { state.removed++; }
  }
  const context = vm.createContext({
    window: {},
    document: { createElement: () => ({ remove() {} }), head: { append: script => state.scripts.push(script) } },
    console: { error: (...args) => state.errors.push(args) },
    artworkPresets: { home: {} },
    createArtworkSketch: p => { p.setup = () => {}; },
    observeArtwork: () => () => { state.stopped++; },
  });
  const source = readFileSync(new URL('../src/artwork/index.js', import.meta.url), 'utf8')
    .replace(/^import .*;\n/gm, '').replace('export function mountArtwork', 'function mountArtwork');
  vm.runInContext(source, context);
  return { state, context, P5, mount: () => context.mountArtwork({}, 'home') };
}
const settle = () => new Promise(resolve => setImmediate(resolve));

test('unmount during runtime loading cannot create a leaked canvas', async () => {
  const a = runtime();
  const dispose = a.mount();
  dispose();
  a.context.window.p5 = a.P5;
  a.state.scripts[0].onload();
  await settle();
  assert.equal(a.state.created, 0);
  const cleanup = a.mount();
  await settle();
  assert.equal(a.state.created, 1);
  cleanup(); cleanup();
  assert.equal(a.state.stopped, 1);
  assert.equal(a.state.removed, 1);
});

test('a failed runtime request can be retried on the next mount', async () => {
  const a = runtime();
  a.mount();
  a.state.scripts[0].onerror();
  await settle();
  assert.equal(a.state.errors.length, 1);
  const cleanup = a.mount();
  assert.equal(a.state.scripts.length, 2);
  a.context.window.p5 = a.P5;
  a.state.scripts[1].onload();
  await settle();
  assert.equal(a.state.created, 1);
  cleanup();
});
