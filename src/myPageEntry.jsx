import { createRoot } from 'react-dom/client';
import SiteHeader from './components/SiteHeader/SiteHeader';
import BackToTop from './components/BackToTop';
import SiteFooter from './components/SiteFooter';
import { mountArtwork } from './artwork/index.js';

// React owns only this header root. The legacy page's #app stays owned by Vue.
const container = document.getElementById('site-header-root');
if (container) {
  createRoot(container).render(<SiteHeader contentId="app" />);
}

// A separate footer root keeps React outside the legacy Vue-owned #app.
const documentBody = document.getElementById('app');
if (documentBody) {
  const footer = document.createElement('div');
  footer.id = 'site-document-footer';
  documentBody.after(footer);
  createRoot(footer).render(<><BackToTop /><SiteFooter /></>);
}

const artworkHost = document.querySelector('.art-canvas');
if (artworkHost) mountArtwork(artworkHost, document.body.dataset.artwork);
