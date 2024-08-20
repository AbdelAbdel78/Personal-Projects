let origin
const originStartX = 512
const originStartY = 256
let rodLength
let angle
let angleVelocity = 0
let angleAcceleration = 0
let bob
const bobSize = 32
let graviy = 0.98


function setup() {
  createCanvas(1024, 1024);
  origin = createVector(originStartX, originStartY)
  rodLength = 400
  angle = PI/2.5
  bob = createVector()
}

function draw() {
  background(0)

  stroke(255)
  strokeWeight(4)
  fill(128)

  angleAcceleration = -graviy * sin(angle) / rodLength
  angleVelocity += angleAcceleration
  angle += angleVelocity

  bob.x = rodLength * sin(angle) + origin.x
  bob.y = rodLength * cos(angle) + origin.y

  line(origin.x, origin.y, bob.x, bob.y)
  circle(bob.x, bob.y, bobSize)
}
