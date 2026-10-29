export function observeArtwork(host, instance) {
  let canvasWidth = host.clientWidth, canvasHeight = host.clientHeight;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false, disposed = false;
  const sync = () => {
    if (disposed) return;
    if (visible && !document.hidden && !reducedMotion.matches) instance.loop();
    else instance.noLoop();
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });
  observer.observe(host);
  const resize = new ResizeObserver(() => {
    const width = host.clientWidth, height = host.clientHeight;
    if (disposed || !width || !height || (width === canvasWidth && height === canvasHeight)) return;
    canvasWidth = width; canvasHeight = height;
    instance.resizeCanvas(width, height);
  });
  resize.observe(host);
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    observer.disconnect();
    resize.disconnect();
    document.removeEventListener('visibilitychange', sync);
    reducedMotion.removeEventListener('change', sync);
    window.removeEventListener('pageshow', sync);
    window.removeEventListener('pagehide', onHide);
    instance.noLoop();
  };
  const onHide = event => {
    instance.noLoop();
    if (!event.persisted) dispose();
  };
  document.addEventListener('visibilitychange', sync);
  reducedMotion.addEventListener('change', sync);
  window.addEventListener('pagehide', onHide);
  window.addEventListener('pageshow', sync);
  sync();
  return dispose;
}
