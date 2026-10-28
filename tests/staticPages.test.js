import test from 'node:test';
import assert from 'node:assert/strict';
import { getStaticPage, redirectToStaticPage } from '../src/data/staticPages.js';

test('static routes redirect before React, including aliases and trailing slashes', () => {
  assert.equal(getStaticPage('/about/'), '/src/about.html');
  assert.equal(getStaticPage('/submission'), '/src/opencall.html');
  assert.equal(getStaticPage('/collaboration'), '/src/collaboration.html');
  for (const path of ['/', '/showcase', '/showcase/1', '/event/shanghai-show', '/about-other']) {
    assert.equal(getStaticPage(path), undefined);
  }
});

test('static redirects preserve query strings and anchors', () => {
  let target;
  globalThis.window = { location: { search: '?from=home', hash: '#highlights', replace: url => { target = url; } } };
  try {
    redirectToStaticPage('/src/about.html');
    assert.equal(target, '/src/about.html?from=home#highlights');
  } finally { delete globalThis.window; }
});
