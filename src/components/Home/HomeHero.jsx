import { useEffect, useRef } from 'react';
import { siteNavigation } from '../../data/navigation';
import HomeArtwork from './HomeArtwork';
import './HomeHero.css';

export default function HomeHero() {
  const heroRef = useRef(null);
  useEffect(() => {
    const hero = heroRef.current;
    const resize = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      hero.style.setProperty('--sqrt-line', `${Math.hypot(width, height)}px`);
      hero.style.setProperty('--width-line', `${width}px`);
      hero.style.setProperty('--height-line', `${height}px`);
      hero.style.setProperty('--ultra-wide', width / height > 2 ? '0.8' : '1');
    });
    resize.observe(hero);
    return () => resize.disconnect();
  }, []);

  return (
    <section className="home-hero" ref={heroRef} aria-labelledby="home-title">
      <div className="home-campus-bar" aria-label="NYU global campuses">
        <img src="/homepage/assets/NYU_Short_RGB_White.png.png" alt="NYU New York" />
        <img src="/homepage/assets/shanghai_white.png.png" alt="NYU Shanghai" />
        <img src="/homepage/assets/abudhabi_white.png.png" alt="NYU Abu Dhabi" />
      </div>
      <div className="first-circle" aria-hidden="true" />
      <div className="second-circle" aria-hidden="true" />
      <div className="last-text">
        <HomeArtwork />
        <div className="main-title">
          <h1 id="home-title" className="home-sr-only">NYU Global Show &amp; Tell</h1>
          <div className="home-title-art" aria-hidden="true">
            <picture>
              <source media="(max-width: 640px)" srcSet="/homepage/assets/title-homepage-phone.svg" />
              <img src="/homepage/assets/tell2-line-bg-svg.svg" alt="" />
            </picture>
            <img className="home-desktop-title-line" src="/homepage/assets/tell1-line-bg-svg.svg" alt="" />
          </div>
        </div>
        <div className="main-menu">
          <nav className="home-links" aria-label="Explore Global Show & Tell">
            {siteNavigation.map((item, index) => (
              <a key={item.href} className={`home-link item${index + 1}`} href={item.href}>{item.label}</a>
            ))}
          </nav>
        </div>
      </div>
      <div className="fade-blur-container" aria-hidden="true" />
    </section>
  );
}
