export function createArtworkSketch(p, host, preset) {
  let artColors = {};
  // Preserve the original 12 FPS pace at a fixed 30 FPS.
  const ARTWORK_SPEED_RATIO = 12 / 30;
  class GradientCircle {
    constructor() {
      this.startX = p.random(10, p.width - 10);
      this.startY = p.random(10, p.height - 10);
      const maximumRadius = preset.fitCircles
        ? Math.min(preset.circleRadius[1], p.width * 0.4, p.height * 0.4)
        : preset.circleRadius[1];
      this.r = p.random(preset.circleRadius[0], maximumRadius);
      this.startR = 0;
      this.endX = this.startX;
      this.endY = this.startY;
      this.endR = this.r;
      this.colorLayer = p.ceil(p.random(2, 7));
      this.colorOffset = [];
      this.gradientColor = [];
      this.velocity = p.createVector(0, 0);
    }
    setColors() {
      if (this.colorLayer > 2) {
        for (let i = 0; i < this.colorLayer - 2; i++) {
          this.colorOffset.push(p.random(0, 1));
        }
      }
      this.colorOffset.push(0);
      this.colorOffset.push(1);
      this.colorOffset.sort((a, b) => a - b);

      for (let i = 0; i < this.colorLayer - 1; i++) {
        let dice = p.random(0, 4);
        if (dice > 1) {
          let index = p.ceil(p.random(0, colorPalette_1.length - 1));
          this.gradientColor.push(colorPalette_1[index]);
        } else {
          let index = p.ceil(p.random(0, colorPalette_2.length - 1));
          this.gradientColor.push(colorPalette_2[index]);
        }
      }
      let index = p.ceil(p.random(0, colorPaletteOutter.length - 1));
      this.gradientColor.push(colorPaletteOutter[index]);
    }
    applyForce(force) {
      this.velocity.add(force);
    }
    update() {
      if (preset.fitMovingCircles) this.r = Math.min(this.r, p.width * 0.4, p.height * 0.4);

      this.startX += this.velocity.x * ARTWORK_SPEED_RATIO;
      this.startY += this.velocity.y * ARTWORK_SPEED_RATIO;
      this.endX = this.startX;
      this.endY = this.startY;

      if (this.startX > p.width - this.r || this.startX < this.r) {
        this.velocity.x *= -1;
        this.startX = p.constrain(this.startX, this.r, p.width - this.r);
      }
      if (this.startY > p.height - this.r || this.startY < this.r) {
        this.velocity.y *= -1;
        this.startY = p.constrain(this.startY, this.r, p.height - this.r);
      }

      this.velocity.mult(0.9 ** ARTWORK_SPEED_RATIO);
    }
    show() {
      p.noStroke();
      p.fill(artColors['color-body']);
      let gradient = p.drawingContext.createRadialGradient(this.startX, this.startY, this.startR, this.endX, this.endY, this.endR);
      for (let i = 0; i < this.colorLayer; i++) {
        gradient.addColorStop(this.colorOffset[i], this.gradientColor[i]);
      }
      p.drawingContext.fillStyle = gradient;
      p.ellipse(this.startX, this.startY, this.r * 2, this.r * 2);
    }
  }
  class Ball {
    constructor() {
      this.x = p.width / 2;
      this.y = 100;
      this.r = p.random(...preset.ballRadius);
      this.colorLayer = 2;
      this.colorOffset = [];
      this.colorOffset.push(1);
      this.colorOffset.push(0.5);
      this.colorOffset.push(0);
      this.gradientColor = [];
      this.gradientColor.push(p.color(artColors['color-surface']));
      this.gradientColor.push(p.color(artColors['color-art-lime']));
      this.gradientColor.push(p.color(artColors['color-surface-a0']));
      this.velocity = p.createVector(0, 0);
      this.acceleration = p.createVector(0, 0);
      this.gravity = p.createVector(0, 0.2);
      this.forceRadius = preset.forceRadius;
    }
    applyForce(force) {
      this.acceleration.add(force);
    }
    checkCollision(circle) {
      let distance = p.dist(this.x, this.y, circle.startX, circle.startY);
      return distance < this.r + circle.r;
    }
    updateBallAppearance() {
      let action = p.floor(p.random(4));
      switch (action) {
        case 0:

          if (this.colorLayer < 5) {
            this.colorLayer++;
            this.colorOffset.splice(1, 0, p.random(0.2, 0.8));
            let palette = p.random([colorPalette_1, colorPalette_2]);
            let index = p.floor(p.random(palette.length));
            this.gradientColor.splice(1, 0, palette[index]);
          }
          break;
        case 1: {
          let palette = p.random([colorPalette_1, colorPalette_2]);
          let index = p.floor(p.random(palette.length));
          let colorIndex = p.floor(p.random(this.gradientColor.length));
          this.gradientColor[colorIndex] = palette[index];
          break;
        }
        case 2:

          this.r += p.random(-2, 2.1);
          break;
        case 3:

          break;
      }
    }
    update() {
      let mouseForceSphere = p.createVector(p.mouseX, p.mouseY);
      let ballPos = p.createVector(this.x, this.y);
      let distance = mouseForceSphere.dist(ballPos);
      if (distance < this.forceRadius && distance > 0) {
        let pushDirection = mouseForceSphere.copy().sub(ballPos).normalize();
        this.velocity.x += pushDirection.x * preset.mouseForce;
        this.velocity.y += pushDirection.y * preset.mouseForce;
      }
      this.applyForce(this.gravity);

      this.velocity.add(this.acceleration.copy().mult(ARTWORK_SPEED_RATIO));
      this.x += this.velocity.x * ARTWORK_SPEED_RATIO;
      this.y += this.velocity.y * ARTWORK_SPEED_RATIO;
      this.acceleration.mult(0);

      if (this.x > p.width - this.r) {
        this.x = p.width - this.r;
        this.velocity.x *= -0.9;
      }
      if (this.x < this.r) {
        this.x = this.r;
        this.velocity.x *= -0.9;
      }
      if (this.y > p.height - this.r) {
        this.y = p.height - this.r;
        this.velocity.y *= -0.9;
        this.gravity = p.createVector(0, -0.12);
      }
      if (this.y < this.r) {
        this.velocity.y *= -0.9;
        this.gravity = p.createVector(0, 0.12);
      }

      for (let i = 0; i < gradientCircle.length; i++) {
        if (this.checkCollision(gradientCircle[i])) {
          let collisionNormal = p.createVector(this.x - gradientCircle[i].startX, this.y - gradientCircle[i].startY).normalize();
          let relativeVelocity = this.velocity.dot(collisionNormal);
          if (relativeVelocity < 0) {
            this.velocity.sub(collisionNormal.mult(2 * relativeVelocity));
            this.velocity.mult(-0.9);

            this.updateBallAppearance();

            let repulsiveForce = collisionNormal.mult(-0.09);
            gradientCircle[i].applyForce(repulsiveForce);
          }
        }
      }
    }
    show() {
      p.noStroke();
      p.fill(artColors['color-body']);
      let gradient = p.drawingContext.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
      for (let i = 0; i < this.colorLayer; i++) {
        gradient.addColorStop(this.colorOffset[i], this.gradientColor[i]);
      }
      p.drawingContext.fillStyle = gradient;
      p.ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }
  }
  class Bubble {
    constructor() {
      this.x = p.random(p.width);
      this.y = p.random(p.height);
      this.r = p.random(3, 40);
      this.velocity = p.createVector(p.random(-1, 1), p.random(-1, 1));
    }
    update() {
      this.x += this.velocity.x * ARTWORK_SPEED_RATIO;
      this.y += this.velocity.y * ARTWORK_SPEED_RATIO;

      if (this.x > p.width + this.r) this.x = -this.r;
      if (this.x < -this.r) this.x = p.width + this.r;
      if (this.y > p.height + this.r) this.y = -this.r;
      if (this.y < -this.r) this.y = p.height + this.r;
    }
    show() {
      p.noFill();
      p.stroke(artColors['color-surface']);
      p.strokeWeight(1);
      p.ellipse(this.x, this.y, this.r * 2);
    }
  }

  function drawConnectingLines() {
    p.stroke(artColors['color-surface']);
    p.strokeWeight(1);
    let margin = 6;

    for (let i = 0; i < gradientCircle.length; i++) {
      for (let j = i + 1; j < Math.min(4, gradientCircle.length); j++) {
        let d = p.dist(gradientCircle[i].startX, gradientCircle[i].startY, gradientCircle[j].startX, gradientCircle[j].startY);
        let dMin = gradientCircle[i].r + gradientCircle[j].r + 50;
        let dMax = gradientCircle[i].r + gradientCircle[j].r + 450;

        if (d > dMin && d < dMax) {
          let x1 = gradientCircle[i].startX;
          let y1 = gradientCircle[i].startY;
          let x2 = gradientCircle[j].startX;
          let y2 = gradientCircle[j].startY;

          let dir = p.createVector(x2 - x1, y2 - y1).normalize();

          let startX = x1 + dir.x * (gradientCircle[i].r + margin);
          let startY = y1 + dir.y * (gradientCircle[i].r + margin);
          let endX = x2 - dir.x * (gradientCircle[j].r + margin);
          let endY = y2 - dir.y * (gradientCircle[j].r + margin);

          p.line(startX, startY, endX, endY);
        }
      }
    }
  }
  let colorPalette_1 = [];
  let colorPalette_2 = [];
  let colorPaletteOutter = [];
  let ball;
  let gradientCircle = [];
  let gradientCount;
  let bubbles = [];
  let bubbleCount;

  p.setup = function () {
    const theme = getComputedStyle(document.documentElement);
    artColors = Object.fromEntries(["color-surface", "color-art-lime", "color-surface-a0", "canvas-yellow", "color-art-chartreuse", "color-art-green", "color-art-leaf", "color-art-purple", "color-art-pink", "color-art-cyan", "canvas-yellow-a0", "color-body"].map(name => [name, theme.getPropertyValue('--' + name).trim()]));
    p.createCanvas(host.clientWidth, host.clientHeight);
    p.frameRate(30);
    colorPalette_1 = [p.color(artColors['canvas-yellow']), p.color(artColors['color-art-lime']), p.color(artColors['color-art-chartreuse']), p.color(artColors[preset.paletteAccent])];
    colorPalette_2 = [p.color(artColors['color-art-leaf']), p.color(artColors['color-art-purple']), p.color(artColors['color-art-pink']), p.color(artColors['color-art-cyan'])];
    colorPaletteOutter = [p.color(artColors['canvas-yellow-a0']), p.color(artColors['color-surface-a0'])];
    gradientCount = preset.responsiveCount ? Math.max(2, Math.floor(p.width / 150)) : preset.circleCount;
    bubbleCount = preset.responsiveCount ? Math.floor(gradientCount * 0.7) : preset.bubbleCount;
    ball = new Ball();
    for (let i = 0; i < gradientCount; i++) {
      gradientCircle.push(new GradientCircle());
      gradientCircle[i].setColors();
    }

    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push(new Bubble());
    }
  };
  p.draw = function () {
    p.background(artColors['canvas-yellow']);

    drawConnectingLines();
    for (let i = 0; i < gradientCount; i++) {
      gradientCircle[i].update();
      gradientCircle[i].show();
    }

    for (let bubble of bubbles) {
      bubble.update();
      bubble.show();
    }
    ball.update();
    ball.show();
  };
}
