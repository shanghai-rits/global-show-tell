// Existing homepage artwork, isolated from page globals.
export function homeArtwork(p, host) {
let artColors = {};
class GradientCircle {
  constructor() {
    this.startX = p.random(10, p.width - 10);
    this.startY = p.random(10, p.height - 10);
    this.r = p.random(40, 200);
    this.startR = 0;
    this.endX = this.startX;
    this.endY = this.startY;
    this.endR = this.r;
    this.colorLayer = p.ceil(p.random(2, 7));
    this.colorOffset = [];
    this.gradientColor = [];
    this.velocity = p.createVector(0, 0); // Add velocity for repulsive force
  }
  setColors() {
    //set offset
    if (this.colorLayer > 2) {
      for (let i = 0; i < this.colorLayer - 2; i++) {
        this.colorOffset.push(p.random(0, 1));
      }
    }
    this.colorOffset.push(0);
    this.colorOffset.push(1);
    this.colorOffset.sort((a, b) => a - b);

    //set colors
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
    // Update position based on velocity
    this.startX += this.velocity.x;
    this.startY += this.velocity.y;
    this.endX = this.startX;
    this.endY = this.startY;

    // Bounce off edges
    if (this.startX > p.width - this.r || this.startX < this.r) {
      this.velocity.x *= -1; // Reverse horizontal velocity
      this.startX = p.constrain(this.startX, this.r, p.width - this.r); // Keep within bounds
    }
    if (this.startY > p.height - this.r || this.startY < this.r) {
      this.velocity.y *= -1; // Reverse vertical velocity
      this.startY = p.constrain(this.startY, this.r, p.height - this.r); // Keep within bounds
    }

    // Dampen the velocity over time
    this.velocity.mult(0.9);
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
    this.r = p.random(30, 50);
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
    this.forceRadius = 100; //radius of force sphere
  }
  applyForce(force) {
    this.acceleration.add(force);
  }
  checkCollision(circle) {
    let distance = p.dist(this.x, this.y, circle.startX, circle.startY);
    return distance < this.r + circle.r;
  }
  updateBallAppearance() {
    let action = p.floor(p.random(4)); // Randomly choose an action (0-3)
    switch (action) {
      case 0:
        // Add a color layer
        if (this.colorLayer < 5) {
          // Limit the number of layers
          this.colorLayer++;
          this.colorOffset.splice(1, 0, p.random(0.2, 0.8)); // Add a new offset
          let palette = p.random([colorPalette_1, colorPalette_2]);
          let index = p.floor(p.random(palette.length));
          this.gradientColor.splice(1, 0, palette[index]); // Add a new color
        }
        break;
      case 1: {
        // Change a color
        let palette = p.random([colorPalette_1, colorPalette_2]);
        let index = p.floor(p.random(palette.length));
        let colorIndex = p.floor(p.random(this.gradientColor.length));
        this.gradientColor[colorIndex] = palette[index];
        break;
      }
      case 2:
        // Change the size of the ball
        this.r += p.random(-2, 2.1); // Randomize size
        break;
      case 3:
        // Do nothing
        break;
    }
  }
  update() {
    //mouse interaction - force sphere collision
    let mouseForceSphere = p.createVector(p.mouseX, p.mouseY);
    let ballPos = p.createVector(this.x, this.y);
    let distance = mouseForceSphere.dist(ballPos);
    if (distance < this.forceRadius && distance > 0) {
      let pushDirection = p.constructor.Vector.sub(mouseForceSphere, ballPos).normalize();
      this.velocity.x += pushDirection.x * 0.7;
      this.velocity.y += pushDirection.y * 0.7;
    }
    this.applyForce(this.gravity); //Apply gravity every frame

    this.velocity.add(this.acceleration);
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.acceleration.mult(0); //reset acceleration

    //bounce off walls
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

    //bounce off gradient circles
    for (let i = 0; i < gradientCircle.length; i++) {
      if (this.checkCollision(gradientCircle[i])) {
        let collisionNormal = p.createVector(this.x - gradientCircle[i].startX, this.y - gradientCircle[i].startY).normalize();
        let relativeVelocity = this.velocity.dot(collisionNormal);
        if (relativeVelocity < 0) {
          this.velocity.sub(collisionNormal.mult(2 * relativeVelocity));
          this.velocity.mult(-0.9); //damping

          // Update ball appearance
          this.updateBallAppearance();

          // Apply repulsive force to the gradient circle
          let repulsiveForce = collisionNormal.mult(-0.09); // Adjust strength as needed
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
    this.r = p.random(3, 40); // Random size
    this.velocity = p.createVector(p.random(-1, 1), p.random(-1, 1)); // Random movement
  }
  update() {
    // Move the bubble
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    // Wrap around the edges of the canvas
    if (this.x > p.width + this.r) this.x = -this.r;
    if (this.x < -this.r) this.x = p.width + this.r;
    if (this.y > p.height + this.r) this.y = -this.r;
    if (this.y < -this.r) this.y = p.height + this.r;
  }
  show() {
    p.noFill();
    p.stroke(artColors['color-surface']); // White outline
    p.strokeWeight(1);
    p.ellipse(this.x, this.y, this.r * 2);
  }
}

// Function to draw connecting lines between gradient circles
function drawConnectingLines() {
  p.stroke(artColors['color-surface']); // White lines
  p.strokeWeight(1);
  let margin = 6; // Margin between lines and circles

  // Connect some gradient circles
  for (let i = 0; i < gradientCircle.length; i++) {
    for (let j = i + 1; j < 4; j++) {
      let d = p.dist(gradientCircle[i].startX, gradientCircle[i].startY, gradientCircle[j].startX, gradientCircle[j].startY);
      let dMin = gradientCircle[i].r + gradientCircle[j].r + 50;
      let dMax = gradientCircle[i].r + gradientCircle[j].r + 450;
      // Randomly decide whether to connect two circles
      if (d > dMin && d < dMax) {
        let x1 = gradientCircle[i].startX;
        let y1 = gradientCircle[i].startY;
        let x2 = gradientCircle[j].startX;
        let y2 = gradientCircle[j].startY;

        // Calculate direction vector
        let dir = p.createVector(x2 - x1, y2 - y1).normalize();

        // Start and end points with margin
        let startX = x1 + dir.x * (gradientCircle[i].r + margin);
        let startY = y1 + dir.y * (gradientCircle[i].r + margin);
        let endX = x2 - dir.x * (gradientCircle[j].r + margin);
        let endY = y2 - dir.y * (gradientCircle[j].r + margin);

        // Draw the line
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
let gradientCount = 10; // Number of gradient circles
let bubbles = [];
let bubbleCount = 7; // Number of bubbles

p.setup = function () {
  const theme = getComputedStyle(document.documentElement);
  artColors = Object.fromEntries(["color-surface", "color-art-lime", "color-surface-a0", "canvas-yellow", "color-art-chartreuse", "color-art-green", "color-art-leaf", "color-art-purple", "color-art-pink", "color-art-cyan", "canvas-yellow-a0", "color-body"].map(name => [name, theme.getPropertyValue('--' + name).trim()]));
  p.createCanvas(host.clientWidth, host.clientHeight);
  p.frameRate(12);
  colorPalette_1 = [p.color(artColors['canvas-yellow']), p.color(artColors['color-art-lime']), p.color(artColors['color-art-chartreuse']), p.color(artColors['color-art-green'])];
  colorPalette_2 = [p.color(artColors['color-art-leaf']), p.color(artColors['color-art-purple']), p.color(artColors['color-art-pink']), p.color(artColors['color-art-cyan'])];
  colorPaletteOutter = [p.color(artColors['canvas-yellow-a0']), p.color(artColors['color-surface-a0'])];
  ball = new Ball();
  for (let i = 0; i < gradientCount; i++) {
    gradientCircle.push(new GradientCircle());
    gradientCircle[i].setColors();
  }

  // Create bubbles
  for (let i = 0; i < bubbleCount; i++) {
    bubbles.push(new Bubble());
  }
};
p.draw = function () {
  p.background(artColors['canvas-yellow']);

  // Draw connecting lines between gradient circles
  drawConnectingLines();
  for (let i = 0; i < gradientCount; i++) {
    gradientCircle[i].update(); // Update gradient circle position
    gradientCircle[i].show();
  }

  // Update and show bubbles
  for (let bubble of bubbles) {
    bubble.update();
    bubble.show();
  }
  ball.update();
  ball.show();
};
}
