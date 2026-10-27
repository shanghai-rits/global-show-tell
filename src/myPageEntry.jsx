import { createRoot } from 'react-dom/client';
import SiteHeader from './components/SiteHeader/SiteHeader';

// React owns only this header root. The legacy page's #app stays owned by Vue.
const container = document.getElementById('site-header-root');
if (container) {
  createRoot(container).render(<SiteHeader contentId="app" />);
}
