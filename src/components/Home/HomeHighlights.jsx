import { useState } from 'react';
import { homepageHighlights } from '../../data/homepage';

export default function HomeHighlights() {
  const [active, setActive] = useState(0);
  const goTo = index => setActive(index);
  return (
    <section id="textDiv" className="home-highlights" aria-label="Project and event highlights" aria-roledescription="carousel">
      <div className="home-highlight-track" style={{ transform: `translateX(-${active * 100}%)` }}>
        {homepageHighlights.map((slide, index) => (
          <article className="home-highlight" key={slide.image} aria-label={`${index + 1} of ${homepageHighlights.length}`} aria-roledescription="slide" aria-hidden={index !== active}>
            <img src={`/homepage/assets/${slide.image}`} alt={slide.label} loading="lazy" draggable={false} />
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
      </div>
    </section>
  );
}
