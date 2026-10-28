import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import HomeHero from '../components/Home/HomeHero';
import HomeVideo from '../components/Home/HomeVideo';
import HomeHighlights from '../components/Home/HomeHighlights';
import { homepagePresenters } from '../data/homepage';
import './Home.css';

export default function Home() {
  useEffect(() => {
    if (!window.location.hash) return;
    const frame = requestAnimationFrame(() => {
      try {
        document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView();
      } catch { /* Ignore malformed legacy fragments. */ }
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <div className="home-page">
      <Helmet><title>NYU Global SHOW &amp; TELL</title><meta name="description" content="NYU Global Show & Tell celebrates creativity and community through a global showcase of student works exploring artificial intelligence and interactive media." /></Helmet>
      <HomeHero />
      <HomeVideo />
      <section id="middlePage" className="home-introduction" aria-labelledby="home-introduction-title">
        <div>
          <h2 id="home-introduction-title">Global Learning,<br />Artificial Intelligence,<br />&amp; Interactivity</h2>
          <p>NYU Global Show &amp; Tell is a festival that celebrates creativity and community through a global showcase of student works that emerge within NYU&apos;s global network.</p>
          <p>In a world where knowledge once spread through ancient wayfarers, we explore how artificial intelligence mediates global learning and multidisciplinary collaborations through student works that bring together artificial intelligence and interactive media.</p>
          <p><a href="https://www.nyu.edu/academics/interdisciplinary-initiatives/goddard-impact-awards.html" target="_blank" rel="noreferrer">NYU Goddard Impact Group Award</a> supported this initiative.</p>
        </div>
        <div className="home-presenters">
          <h3>Presented to you by <span>(Alphabetical order)</span></h3>
          <ul>{homepagePresenters.map(item => <li key={item.label}>{item.href ? <a href={item.href} target="_blank" rel="noreferrer">{item.label}</a> : <span>{item.label}</span>}</li>)}</ul>
        </div>
      </section>
      <HomeHighlights />
    </div>
  );
}
