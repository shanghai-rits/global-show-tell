export const staticPages = {
  '/opencall': '/src/opencall.html',
  '/submission': '/src/opencall.html',
  '/collaboration': '/src/collaboration.html',
  '/calendar': '/src/calendar.html',
  '/about': '/src/about.html',
  '/events': '/src/events.html',
};

export function getStaticPage(pathname) {
  return staticPages[pathname.replace(/\/+$/, '') || '/'];
}

export function redirectToStaticPage(path) {
  const { search, hash } = window.location;
  window.location.replace(`${path}${search}${hash}`);
}
