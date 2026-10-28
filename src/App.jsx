import { lazy, Suspense, useEffect } from 'react';
import './styles/detail.css';
import SiteLayout from './components/SiteLayout';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { staticPages, getStaticPage, redirectToStaticPage } from './data/staticPages';

const Home = lazy(() => import('./pages/Home'));
const EventDetail = lazy(() => import('./pages/EventDetail.tsx'));
const Showcase = lazy(() => import('./pages/Showcase.tsx'));
const ShowcaseDetail = lazy(() => import('./pages/ShowcaseDetail.tsx'));

function StaticPageRedirect() {
  const { pathname } = useLocation();
  const target = getStaticPage(pathname);
  useEffect(() => { redirectToStaticPage(target); }, [target]);
  return null;
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={<p role="status" className="route-loading">Loading…</p>}>
        <Routes>
          {Object.keys(staticPages).map(path => (
            <Route key={path} path={path} element={<StaticPageRedirect />} />
          ))}
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/showcase" element={<Showcase />} />
            <Route path="/showcase/:id" element={<ShowcaseDetail />} />
            <Route path="/event/:id" element={<EventDetail />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}
