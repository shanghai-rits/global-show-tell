import './SiteFooter.css';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <small>© {new Date().getFullYear()} NYU Global Show &amp; Tell</small>
    </footer>
  );
}
