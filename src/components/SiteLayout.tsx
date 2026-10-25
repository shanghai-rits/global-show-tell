import { Outlet } from 'react-router-dom';
import SiteHeader from './SiteHeader/SiteHeader';

export default function SiteLayout() {
  return (
    <>
      <SiteHeader />
      <main id="site-content" tabIndex={-1}>
        <Outlet />
      </main>
    </>
  );
}
