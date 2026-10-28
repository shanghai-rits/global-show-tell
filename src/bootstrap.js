import { getStaticPage, redirectToStaticPage } from './data/staticPages';

const target = getStaticPage(window.location.pathname);
if (target) redirectToStaticPage(target);
else import('./main.jsx');
