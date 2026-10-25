// Canonical links and legacy aliases shared by React and embedded HTML headers.
export const siteNavigation = [
  { href: '/showcase', label: 'Online Showcase', aliases: [] },
  { href: '/events', label: 'Events and Activities', aliases: ['/src/events.html'], detailPrefix: '/event' },
  { href: '/calendar', label: 'Programme Calendar', aliases: ['/src/calendar.html'] },
  { href: '/about', label: 'About', aliases: ['/src/about.html', '/src/about-old.html'] },
  { href: '/opencall', label: 'Open Call (Closed)', aliases: ['/submission', '/src/opencall.html'] },
];

export function isNavigationItemCurrent(item, pathname) {
  const current = pathname.replace(/\/+$/, '') || '/';
  return current === item.href
    || current.startsWith(item.href + '/')
    || item.aliases.includes(current)
    || Boolean(item.detailPrefix && current.startsWith(item.detailPrefix + '/'));
}
