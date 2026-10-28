(() => {
  window.NYUArtworkLifecycle = {
    observe(canvas) {
      let visible = false;
      const sync = () => {
        if (visible && !document.hidden) window.loop();
        else window.noLoop();
      };
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        sync();
      });
      observer.observe(canvas);
      document.addEventListener('visibilitychange', sync);
      const onHide = event => {
        window.noLoop();
        if (!event.persisted) {
          observer.disconnect();
          document.removeEventListener('visibilitychange', sync);
          window.removeEventListener('pageshow', sync);
          window.removeEventListener('pagehide', onHide);
        }
      };
      window.addEventListener('pagehide', onHide);
      window.addEventListener('pageshow', sync);
      sync();
    }
  };
})();
