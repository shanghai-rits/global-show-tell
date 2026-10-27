import Navbar from '../Navbar/Navbar';
import './SiteHeader.css';

interface SiteHeaderProps {
  contentId?: string;
}

export default function SiteHeader({ contentId = 'site-content' }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <a className="site-skip-link" href={`#${contentId}`}>Skip to content</a>
      <Navbar />
    </header>
  );
}
