import { useEffect, useRef, useState } from 'react';

export default function HomeVideo() {
  const videoRef = useRef(null);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const video = videoRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setLoad(true);
      else video.pause();
    }, { threshold: 0.01 });
    observer.observe(video);
    const onVisibility = () => { if (document.hidden) video.pause(); };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      video.pause();
    };
  }, []);
  return (
    <section className="home-video-section" aria-labelledby="home-video-title">
      <h2 id="home-video-title">&quot; Global Learning,<br />Artificial Intelligence,<br />&amp; Interactivity &quot;</h2>
      <video ref={videoRef} src={load ? '/homepage/assets/nyuglobal-show-tell.mp4' : undefined}
        poster="/homepage/assets/carousel-bg2.png" controls playsInline preload="none" aria-label="NYU Global Show & Tell introduction" />
    </section>
  );
}
