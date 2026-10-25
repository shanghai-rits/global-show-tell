import test from 'node:test';
import assert from 'node:assert/strict';
import { siteNavigation, isNavigationItemCurrent } from '../src/data/navigation.js';

const item = href => siteNavigation.find(link => link.href === href);

test('legacy HTML and canonical URLs select the same navigation item', () => {
  for (const link of siteNavigation) {
    assert.equal(isNavigationItemCurrent(link, link.href + '/'), true);
    for (const alias of link.aliases) assert.equal(isNavigationItemCurrent(link, alias), true);
  }
});

test('project and event detail pages retain their parent navigation', () => {
  assert.equal(isNavigationItemCurrent(item('/showcase'), '/showcase/22'), true);
  assert.equal(isNavigationItemCurrent(item('/events'), '/event/future-lab'), true);
  assert.equal(isNavigationItemCurrent(item('/opencall'), '/submission'), true);
});

test('similarly named paths and home are not false positives', () => {
  assert.equal(isNavigationItemCurrent(item('/events'), '/events-archive'), false);
  assert.equal(isNavigationItemCurrent(item('/showcase'), '/showcase-other'), false);
  assert.equal(isNavigationItemCurrent(item('/events'), '/eventual'), false);
  for (const link of siteNavigation) assert.equal(isNavigationItemCurrent(link, '/'), false);
});

test('all navigation targets are unique local routes', () => {
  assert.equal(new Set(siteNavigation.map(link => link.href)).size, siteNavigation.length);
  for (const link of siteNavigation) assert.match(link.href, /^\/[^/]/);
});
