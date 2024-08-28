let pendulum;
let lengthSlider;
let gravitySlider;
let massSlider;
let dampingSlider;

function setup() {
  createCanvas(800, 600);

  // Create sliders
  lengthSlider = createSlider(50, 300, 200, 1); // Length slider
  lengthSlider.position(10, 10);
  lengthSlider.style('width', '150px');

  gravitySlider = createSlider(0.1, 2, 1, 0.01); // Gravity slider
  gravitySlider.position(10, 40);
  gravitySlider.style('width', '150px');

  dampingSlider = createSlider(0.9, 1, 1, 0.01); // Damping slider
  dampingSlider.position(10, 70);
  dampingSlider.style('width', '150px');

  massSlider = createSlider(10, 100, 40, 1); // Mass slider
  massSlider.position(10, 100);
  massSlider.style('width', '150px');

  // Initialize the pendulum
  pendulum = new Pendulum(width / 2, 100, lengthSlider.value(), massSlider.value());
}

function draw() {
  background(220);

  // Update pendulum properties based on slider values
  pendulum.length = lengthSlider.value();
  pendulum.gravity = gravitySlider.value();
  pendulum.damping = dampingSlider.value();
  pendulum.mass = massSlider.value();

  // Display the current slider values
  fill(0);
  textSize(16);
  text('Rod Length: ' + lengthSlider.value() + ' px', 170, 25);
  text('Gravity: ' + gravitySlider.value().toFixed(2), 170, 55);
  text('Damping: ' + dampingSlider.value().toFixed(2), 170, 85);
  text('Mass: ' + massSlider.value() + ' (size of bob)', 170, 115);

  // Update and display the pendulum
  pendulum.update();
  pendulum.display();

  // Display the current angular acceleration, angular velocity, and angle
  text('Angular Acceleration: ' + pendulum.angularAcceleration.toFixed(4) + ' rad/s²', 10, height - 60);
  text('Angular Velocity: ' + pendulum.angularVelocity.toFixed(4) + ' rad/s', 10, height - 40);
  text('Angle: ' + pendulum.angle.toFixed(4) + ' rad', 10, height - 20);
}

// Pendulum class definition
class Pendulum {
  constructor(x, y, length, mass) {
    this.origin = createVector(x, y); // Origin point of the pendulum (top of the rod)
    this.length = length; // Length of the rod (this will be modified by the slider)
    this.mass = mass; // Mass of the pendulum bob (only affects visual size)
    this.angle = PI / 4; // Initial angle (45 degrees)
    this.angularVelocity = 0; // Initial angular velocity
    this.angularAcceleration = 0; // Initial angular acceleration
    this.gravity = 1; // Gravity (this will be modified by the slider)
    this.damping = 0.99; // Damping factor (this will be modified by the slider)
  }

  update() {
    // Calculate the angular acceleration based on the current angle and gravity
    this.angularAcceleration = (-1 * this.gravity / this.length) * sin(this.angle);

    // Update angular velocity and angle
    this.angularVelocity += this.angularAcceleration;
    this.angle += this.angularVelocity;

    // Apply damping to the angular velocity
    this.angularVelocity *= this.damping;
  }

  display() {
    // Calculate the position of the pendulum bob
    let x = this.origin.x + this.length * sin(this.angle);
    let y = this.origin.y + this.length * cos(this.angle);

    // Draw the rod
    stroke(0);
    line(this.origin.x, this.origin.y, x, y);

    // Draw the pendulum bob with size based on mass
    fill(127);
    ellipse(x, y, this.mass, this.mass);
  }
}