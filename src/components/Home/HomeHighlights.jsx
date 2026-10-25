import { useCallback, useEffect, useRef, useState } from 'react';
import { homepageHighlights } from '../../data/homepage';
import { useMediaQuery } from './useMediaQuery';

export default function HomeHighlights() {
  const trackRef = useRef(null);
  const activeRef = useRef(0);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const [visible, setVisible] = useState(false);
  const goTo = useCallback(index => {
    const track = trackRef.current;
    track.scrollTo({ left: track.clientWidth * index, behavior: reducedMotion ? 'instant' : 'smooth' });
  }, [reducedMotion]);
  useEffect(() => {
    const track = trackRef.current;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(track);
    const resize = new ResizeObserver(() => {
      track.scrollTo({ left: track.clientWidth * activeRef.current, behavior: 'instant' });
    });
    resize.observe(track);
    return () => { observer.disconnect(); resize.disconnect(); };
  }, []);
  useEffect(() => {
    if (paused || engaged || !visible || reducedMotion) return;
    const timer = setInterval(() => {
      if (!document.hidden) goTo((active + 1) % homepageHighlights.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [active, paused, engaged, visible, reducedMotion, goTo]);

  return (
    <section id="textDiv" className="home-highlights" aria-label="Project and event highlights" aria-roledescription="carousel"
      onMouseEnter={() => setEngaged(true)} onMouseLeave={() => setEngaged(false)}
      onFocusCapture={() => setPaused(true)}>
      <div className="home-highlight-track" ref={trackRef}
        onScroll={event => {
          activeRef.current = Math.max(0, Math.min(homepageHighlights.length - 1,
            Math.round(event.currentTarget.scrollLeft / event.currentTarget.clientWidth)));
          setActive(activeRef.current);
        }}>
        {homepageHighlights.map((slide, index) => (
          <article className="home-highlight" key={slide.image} aria-label={`${index + 1} of ${homepageHighlights.length}`} aria-roledescription="slide">
            <img src={`/homepage/assets/${slide.image}`} alt={slide.label} loading="lazy" />
            <div className="home-highlight-caption">
              <p>{slide.label}</p>
              <a href={slide.href} tabIndex={index === active ? 0 : -1}>{slide.title} <span aria-hidden="true">→</span></a>
            </div>
          </article>
        ))}
      </div>
      <div className="home-carousel-controls">
        <button type="button" aria-label="Previous highlight" onClick={() => goTo((active - 1 + homepageHighlights.length) % homepageHighlights.length)}>←</button>
        <span>{active + 1} / {homepageHighlights.length}</span>
        <button type="button" aria-label="Next highlight" onClick={() => goTo((active + 1) % homepageHighlights.length)}>→</button>
        {!reducedMotion && <button type="button" aria-label={paused ? 'Play highlights' : 'Pause highlights'} onClick={() => setPaused(!paused)}>{paused ? 'Play' : 'Pause'}</button>}
      </div>
    </section>
  );
}
