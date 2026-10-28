import './BackToTop.css';
import graphic from './BackToTop.svg?raw';

export default function BackToTop() {
  const backToTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' });
    document.querySelector('#site-content, #app')?.focus({ preventScroll: true });
  };
  return (
    <div className="document-back-to-top">
      <button type="button" aria-label="Back to top" onClick={backToTop}>
        <span aria-hidden="true" dangerouslySetInnerHTML={{ __html: graphic }} />
      </button>
    </div>
  );
}
