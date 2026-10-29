import { useCallback, useEffect, useRef, useState } from 'react';

export default function HomeVideo() {
  const videoRef = useRef(null);
  const frameRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [load, setLoad] = useState(false);
  const [playing, setPlaying] = useState(false);
  const playRequested = useRef(false);
  const playAttempt = useRef(0);
  const playVideo = useCallback(() => {
    const video = videoRef.current;
    const attempt = ++playAttempt.current;
    video.play().catch(() => {
      if (attempt !== playAttempt.current) return;
      playRequested.current = false;
      setPlaying(false);
    });
  }, []);
  useEffect(() => {
    if (load && playRequested.current) playVideo();
  }, [load, playVideo]);
  const startPlayback = () => {
    playRequested.current = true;
    setLoad(true);
    // The first render has no source; canplay resumes this request after loading.
    if (videoRef.current.getAttribute('src')) playVideo();
  };
  const pausePlayback = useCallback(() => {
    playRequested.current = false;
    ++playAttempt.current;
    videoRef.current.pause();
  }, []);
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
    const video = videoRef.current;
    const onNativeEnter = () => setFullscreen(true);
    const onNativeExit = () => setFullscreen(false);
    document.addEventListener('fullscreenchange', onFullscreen);
    video.addEventListener('webkitbeginfullscreen', onNativeEnter);
    video.addEventListener('webkitendfullscreen', onNativeExit);
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreen);
      video.removeEventListener('webkitbeginfullscreen', onNativeEnter);
      video.removeEventListener('webkitendfullscreen', onNativeExit);
    };
  }, []);
  useEffect(() => {
    const video = videoRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setLoad(true);
      else pausePlayback();
    }, { threshold: 0.01 });
    observer.observe(video);
    const onVisibility = () => { if (document.hidden) pausePlayback(); };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      pausePlayback();
    };
  }, [pausePlayback]);
  return (
    <section className="home-video-section" aria-label="NYU Global Show and Tell introduction video">
      <div ref={frameRef} className="home-video-frame">
      <video ref={videoRef} src={load ? '/homepage/assets/nyuglobal-show-tell.mp4' : undefined}
        poster="/homepage/assets/nyuglobal-show-tell-poster.png"
        muted={muted} loop playsInline preload="none"
        onCanPlay={() => { if (playRequested.current) playVideo(); }}
        onPlay={() => setPlaying(true)}
        onPause={() => { playRequested.current = false; setPlaying(false); }}
        onError={() => { playRequested.current = false; ++playAttempt.current; setPlaying(false); }}
        onVolumeChange={() => setMuted(videoRef.current.muted)}
        aria-label="NYU Global Show & Tell introduction" />
      <button type="button" className="home-video-toggle"
        aria-label={playing ? 'Pause introduction video' : 'Play introduction video'}
        onMouseEnter={startPlayback}
        onClick={() => { if (videoRef.current.paused) startPlayback(); else pausePlayback(); }} />
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
