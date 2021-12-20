const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight; 
})

const mouse = {
  x: undefined,
  y: undefined,
}

canvas.addEventListener('click', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;

})

canvas.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;

})

function drawCircle() {
  ctx.fillStyle = 'blue';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2)
  ctx.fill();
}

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle();
  requestAnimationFrame(animate);
}

animate();