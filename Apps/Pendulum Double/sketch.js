let length1Slider, length2Slider, mass1Slider, mass2Slider, gravitySlider, dampingSlider;
let pendulum;

function setup() {
  createCanvas(1000, 1000);

  // Create sliders
  length1Slider = createSlider(50, 300, 200, 1); // Length of rod 1
  length1Slider.position(10, 10);
  length1Slider.style('width', '150px');

  length2Slider = createSlider(50, 300, 200, 1); // Length of rod 2
  length2Slider.position(10, 40);
  length2Slider.style('width', '150px');

  mass1Slider = createSlider(10, 100, 40, 1); // Mass of bob 1
  mass1Slider.position(10, 70);
  mass1Slider.style('width', '150px');

  mass2Slider = createSlider(10, 100, 40, 1); // Mass of bob 2
  mass2Slider.position(10, 100);
  mass2Slider.style('width', '150px');

  gravitySlider = createSlider(0.1, 2, 1, 0.01); // Gravity
  gravitySlider.position(10, 130);
  gravitySlider.style('width', '150px');

  dampingSlider = createSlider(0.9, 1, 1, 0.01); // Damping factor
  dampingSlider.position(10, 160);
  dampingSlider.style('width', '150px');

  // Initialize the double pendulum
  pendulum = new DoublePendulum(width / 2, 200);
}

function draw() {
  background(220);

  // Update pendulum properties based on slider values
  pendulum.length1 = length1Slider.value();
  pendulum.length2 = length2Slider.value();
  pendulum.mass1 = mass1Slider.value();
  pendulum.mass2 = mass2Slider.value();
  pendulum.gravity = gravitySlider.value();
  pendulum.damping = dampingSlider.value();

  // Display slider values
  fill(0);
  textSize(16);
  text('Rod 1 Length: ' + length1Slider.value() + ' px', 170, 25);
  text('Rod 2 Length: ' + length2Slider.value() + ' px', 170, 55);
  text('Bob 1 Mass: ' + mass1Slider.value(), 170, 85);
  text('Bob 2 Mass: ' + mass2Slider.value(), 170, 115);
  text('Gravity: ' + gravitySlider.value().toFixed(2), 170, 145);
  text('Damping: ' + dampingSlider.value().toFixed(2), 170, 175);

  // Update and display the double pendulum
  pendulum.update();
  pendulum.display();
}

// Double Pendulum class definition
class DoublePendulum {
  constructor(x, y) {
    this.origin = createVector(x, y);
    this.length1 = 200; // Length of rod 1
    this.length2 = 200; // Length of rod 2
    this.mass1 = 40; // Mass of bob 1
    this.mass2 = 40; // Mass of bob 2
    this.angle1 = PI / 2 * 0.98; // Initial angle for rod 1
    this.angle2 = PI * 0.98; // Initial angle for rod 2
    this.angularVelocity1 = 0;
    this.angularVelocity2 = 0;
    this.angularAcceleration1 = 0;
    this.angularAcceleration2 = 0;
    this.gravity = 1;
    this.damping = 1;
    this.trail = [];
  }

  update() {
    let num1 = -this.gravity * (2 * this.mass1 + this.mass2) * sin(this.angle1);
    let num2 = -this.mass2 * this.gravity * sin(this.angle1 - 2 * this.angle2);
    let num3 = -2 * sin(this.angle1 - this.angle2) * this.mass2;
    let num4 = this.angularVelocity2 * this.angularVelocity2 * this.length2 + this.angularVelocity1 * this.angularVelocity1 * this.length1 * cos(this.angle1 - this.angle2);
    let den = this.length1 * (2 * this.mass1 + this.mass2 - this.mass2 * cos(2 * this.angle1 - 2 * this.angle2));
    this.angularAcceleration1 = (num1 + num2 + num3 * num4) / den;

    num1 = 2 * sin(this.angle1 - this.angle2);
    num2 = (this.angularVelocity1 * this.angularVelocity1 * this.length1 * (this.mass1 + this.mass2));
    num3 = this.gravity * (this.mass1 + this.mass2) * cos(this.angle1);
    num4 = this.angularVelocity2 * this.angularVelocity2 * this.length2 * this.mass2 * cos(this.angle1 - this.angle2);
    den = this.length2 * (2 * this.mass1 + this.mass2 - this.mass2 * cos(2 * this.angle1 - 2 * this.angle2));
    this.angularAcceleration2 = (num1 * (num2 + num3 + num4)) / den;

    this.angularVelocity1 += this.angularAcceleration1;
    this.angularVelocity2 += this.angularAcceleration2;
    this.angularVelocity1 *= this.damping;
    this.angularVelocity2 *= this.damping;
    this.angle1 += this.angularVelocity1;
    this.angle2 += this.angularVelocity2;

    // Update the trail
    let x2 = this.origin.x + this.length1 * sin(this.angle1) + this.length2 * sin(this.angle2);
    let y2 = this.origin.y + this.length1 * cos(this.angle1) + this.length2 * cos(this.angle2);
    this.trail.push(createVector(x2, y2));

    // Limit the trail length
    if (this.trail.length > 1000) {
      this.trail.splice(0, 1);
    }
  }

  display() {
    // Calculate positions of the bobs
    let x1 = this.origin.x + this.length1 * sin(this.angle1);
    let y1 = this.origin.y + this.length1 * cos(this.angle1);
    let x2 = x1 + this.length2 * sin(this.angle2);
    let y2 = y1 + this.length2 * cos(this.angle2);

    // Draw the trail
    noFill();
    stroke(150, 100, 250, 150);
    beginShape();
    for (let i = 0; i < this.trail.length; i++) {
      vertex(this.trail[i].x, this.trail[i].y);
    }
    endShape();

    // Draw rods
    stroke(0);
    line(this.origin.x, this.origin.y, x1, y1);
    line(x1, y1, x2, y2);

    // Draw bobs
    fill(127);
    ellipse(x1, y1, this.mass1, this.mass1);
    ellipse(x2, y2, this.mass2, this.mass2);
  }
}