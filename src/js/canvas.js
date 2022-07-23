import utils, { randomIntFromRange, randomColor } from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

let gravity = 1
let friction = 0.99
const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

window.addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

canvas.addEventListener('click', () => {
  init()
})

// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    if (this.y + this.radius + this.dy > canvas.height ) {
      this.dy = (-this.dy) * friction
    } else {
      this.dy += gravity
    }

    if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius + this.dx < 0) {
      this.dx = -this.dx
    }

    this.x += this.dx
    this.y += this.dy

    this.draw()
  }
}

// Implementation
let balls
function init() {
  balls = []
  
  for (let i = 0; i < 100; i++) {
    let ball = new Ball(randomIntFromRange(0,innerWidth-50), randomIntFromRange(0,innerHeight),randomIntFromRange(-2,2), randomIntFromRange(0,3), randomIntFromRange(10,50), randomColor(colors))
    balls.push(ball)
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)

  c.clearRect(0, 0, canvas.width, canvas.height)

  balls.forEach(ball => {
   ball.update()
  })
}

init()
animate()
