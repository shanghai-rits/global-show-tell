import { Outlet, useLocation } from 'react-router-dom';
import SiteHeader from './SiteHeader/SiteHeader';
import BackToTop from './BackToTop';
import SiteFooter from './SiteFooter';

export default function SiteLayout() {
  const { pathname } = useLocation();
  const isDocument = pathname.startsWith('/event/') || pathname.startsWith('/showcase/');
  return (
    <>
      <SiteHeader />
      <main id="site-content" tabIndex={-1}>
        <Outlet />
      </main>
      {isDocument && <BackToTop />}
      <SiteFooter />
    </>
  );
}
