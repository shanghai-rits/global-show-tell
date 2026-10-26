import { useEffect, useRef, useState } from 'react';

export default function HomeVideo() {
  const videoRef = useRef(null);
  const frameRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [load, setLoad] = useState(false);
  const [playing, setPlaying] = useState(false);
  const playRequested = useRef(false);
  const startPlayback = () => {
    playRequested.current = true;
    setLoad(true);
    videoRef.current.play().catch(() => {});
  };
  const pausePlayback = () => {
    playRequested.current = false;
    videoRef.current.pause();
  };
  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else {
        videoRef.current.muted = false;
        setMuted(false);
        if (frameRef.current.requestFullscreen) await frameRef.current.requestFullscreen();
        else videoRef.current.webkitEnterFullscreen?.();
      }
    } catch { /* Keep playback available when fullscreen is unavailable. */ }
  };
  useEffect(() => {
    const onFullscreen = () => setFullscreen(document.fullscreenElement === frameRef.current);
    document.addEventListener('fullscreenchange', onFullscreen);
    return () => document.removeEventListener('fullscreenchange', onFullscreen);
  }, []);
  useEffect(() => {
    const video = videoRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setLoad(true);
      else { playRequested.current = false; video.pause(); }
    }, { threshold: 0.01 });
    observer.observe(video);
    const onVisibility = () => { if (document.hidden) { playRequested.current = false; video.pause(); } };
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
      <div ref={frameRef} className="home-video-frame">
      <video ref={videoRef} src={load ? '/homepage/assets/nyuglobal-show-tell.mp4' : undefined}
        muted={muted} loop playsInline preload="none"
        onCanPlay={() => { if (playRequested.current) videoRef.current.play().catch(() => {}); }}
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        aria-label="NYU Global Show & Tell introduction" />
      <button type="button" className="home-video-toggle"
        aria-label={playing ? 'Pause introduction video' : 'Play introduction video'}
        onMouseEnter={startPlayback}
        onClick={() => { if (playRequested.current) pausePlayback(); else startPlayback(); }} />
      <div className="home-video-controls">
        <button type="button" aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
          aria-pressed={!muted} onClick={() => { videoRef.current.muted = !muted; setMuted(!muted); }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M11 4 6 8H3v8h3l5 4Z" />
            {muted ? <path d="m16 9 6 6m0-6-6 6" /> : <><path d="M15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14" /></>}
          </svg>
        </button>
        <button type="button" aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          onClick={toggleFullscreen}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d={fullscreen ? 'M4 9h5V4m11 5h-5V4M4 15h5v5m11-5h-5v5' : 'M9 4H4v5m11-5h5v5M4 15v5h5m11-5v5h-5'} />
          </svg>
        </button>
      </div>
      </div>
    </section>
  );
}
