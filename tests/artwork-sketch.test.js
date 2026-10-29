import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { artworkPresets } from '../src/artwork/presets.js';

class Vector {
  constructor(x, y) { this.x = x; this.y = y; }
  copy() { return new Vector(this.x, this.y); }
  add(v) { this.x += v.x; this.y += v.y; return this; }
  sub(v) { this.x -= v.x; this.y -= v.y; return this; }
  mult(n) { this.x *= n; this.y *= n; return this; }
  dot(v) { return this.x * v.x + this.y * v.y; }
  dist(v) { return Math.hypot(this.x - v.x, this.y - v.y); }
  normalize() { return this.mult(1 / (Math.hypot(this.x, this.y) || 1)); }
}

function sketch(preset, width = 390, height = 180) {
  const host = { clientWidth: width, clientHeight: height };
  const state = { circles: [], fps: null };
  const p = {
    width, height, mouseX: 0, mouseY: 0,
    random: (a, b) => Array.isArray(a) ? a[Math.floor(a.length / 2)] : b === undefined ? a * 0.5 : (a + b) / 2,
    ceil: Math.ceil, floor: Math.floor,
    constrain: (value, low, high) => Math.max(low, Math.min(high, value)),
    dist: (x, y, a, b) => Math.hypot(x - a, y - b),
    createVector: (x, y) => new Vector(x, y),
    createCanvas: (w, h) => { p.width = w; p.height = h; },
    frameRate: value => { state.fps = value; },
    color: value => value,
    drawingContext: { createRadialGradient: (...args) => {
      assert.ok(args.every(Number.isFinite));
      assert.ok(args[2] >= 0 && args[5] >= 0);
      return { addColorStop() {} };
    } },
    noStroke() {}, noFill() {}, fill() {}, stroke() {}, strokeWeight() {}, background() {},
    ellipse: (...args) => { assert.ok(args.every(Number.isFinite)); state.circles.push(args); },
    line: (...args) => assert.ok(args.every(Number.isFinite)),
  };
  const context = vm.createContext({ document: { documentElement: {} }, getComputedStyle: () => ({ getPropertyValue: () => '#ffffff' }) });
  vm.runInContext(readFileSync(new URL('../src/artwork/sketch.js', import.meta.url), 'utf8').replace('export function createArtworkSketch', 'function createArtworkSketch'), context);
  context.createArtworkSketch(p, host, preset);
  p.setup();
  return { p, state, draw: () => { state.circles = []; p.draw(); } };
}

for (const name of ['home', 'about', 'opencall']) {
  test(`${name} preset draws finite geometry at mobile and desktop sizes`, () => {
    for (const [width, height] of [[320, 180], [390, 180], [1280, 320]]) {
      const a = sketch(artworkPresets[name], width, height);
      for (let frame = 0; frame < 60; frame++) a.draw();
      assert.equal(a.state.fps, 30);
      assert.ok(a.state.circles.length >= 4);
      a.p.width = 844; a.p.height = 211;
      a.draw();
    }
  });
}

test('connecting lines support fewer than four circles', () => {
  for (const count of [0, 1, 2, 3, 4, 10]) {
    const a = sketch({ ...artworkPresets.home, responsiveCount: false, circleCount: count, bubbleCount: 0 });
    assert.doesNotThrow(a.draw);
    assert.equal(a.state.circles.length, count + 1);
  }
});

test('artwork instances keep their circle counts independent', () => {
  const a = sketch(artworkPresets.about);
  const b = sketch(artworkPresets.home);
  a.draw(); b.draw(); a.draw();
  assert.equal(a.state.circles.length, 4);
  assert.equal(b.state.circles.length, 18);
});
