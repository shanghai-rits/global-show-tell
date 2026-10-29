const base = {
  circleRadius: [40, 200],
  fitCircles: false,
  fitMovingCircles: true,
  ballRadius: [30, 50],
  forceRadius: 100,
  mouseForce: 0.7 * (12 / 30),
  responsiveCount: false,
  circleCount: 10,
  bubbleCount: 7,
  paletteAccent: 'color-surface',
};

export const artworkPresets = {
  home: { ...base, fitCircles: true, fitMovingCircles: false, paletteAccent: 'color-art-green' },
  about: {
    ...base,
    circleRadius: [30, 160],
    fitCircles: true,
    ballRadius: [40, 65],
    forceRadius: 120,
    mouseForce: 0.8,
    responsiveCount: true,
  },
  opencall: { ...base },
};
