class Particle {
  constructor ({ ctx, canvas, x, y, radius, color, velocity }) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.genPos(x, y, radius, color, velocity);
  }

  genPos (x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.defaultColor = color;
    this.velocity = {
      x: (Math.random() - 0.5) * velocity,
      y: (Math.random() - 0.5) * velocity
    };
  }

  draw () {
    const { ctx, x, y, radius, color } = this;

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 5;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  update ({ mouseRange, mouseX, mouseY }) {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    const { radius, canvas, x, y } = this;
    const { width, height } = canvas;
    const xDist = mouseX - x;
    const yDist = mouseY - y;

    if (x + radius > width || x - radius < 0) {
      this.velocity.x = -this.velocity.x;
    } else if (y + radius > height || y - radius < 0) {
      this.velocity.y = -this.velocity.y;
    }

    if (
      xDist < mouseRange &&
      xDist > -mouseRange &&
      yDist < mouseRange &&
      yDist > -mouseRange
    ) {
      this.color = '#fff';
      this.x += 4 * this.velocity.x;
      this.y += 4 * this.velocity.y;
    } else {
      this.color = this.defaultColor;
    }

    this.draw();
  }
}

class Particles {
  constructor (el = document.body, mount = 200, mouseRange = 150) {
    this.el = el;
    this.mount = mount;
    this.colors = ['#3498db', '#1abc9c', '#e74c3c', '#9b59b6'];
    this.particles = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseRange = mouseRange;

    this.init();
  }

  init () {
    this.initCanvas();
    this.genParticles();
    this.animate();
    this.bindEvent();
  }

  bindEvent () {
    window.addEventListener('resize', debounce(this.initCanvasSize.bind(this)), false);
    this.el.addEventListener('click', (e) => this.onClick(e), false);
    this.el.addEventListener('mousemove', (e) => this.onMovemove(e), false);
  }

  animate () {
    const { ctx, particles, canvas, mouseRange, mouseX, mouseY } = this;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((val) => val.update({ mouseRange, mouseX, mouseY }));
    requestAnimationFrame(() => this.animate());
  }

  onClick (e) {
    const { offsetX, offsetY } = e || window.event;
    const { ctx, colors, canvas } = this;
    const particles = [];
    const { random, floor } = Math;

    for (let i = 0; i < 20; i++) {
      const radius = random() * 15;
      const velocity = random() * 20;
      const idx = floor(random() * colors.length);

      particles.push(
        new Particle({
          ctx,
          canvas,
          x: offsetX,
          y: offsetY,
          radius,
          color: colors[idx],
          velocity
        })
      );
    }

    this.particles.push(...particles);
  }

  onMovemove (e) {
    const { offsetX, offsetY } = e || window.event;

    this.mouseX = offsetX;
    this.mouseY = offsetY;
  }

  initCanvas () {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.initCanvasSize();
    this.canvas.style = `
			position: absolute;
			left: 0;
			top: 0;
      z-index: -1;
      background-color: #111;
    `;
    this.el.appendChild(this.canvas);
  }

  initCanvasSize () {
    const { el } = this;
    this.canvas.width = getStyle(el, 'width');
    this.canvas.height = getStyle(el, 'height');
  }

  genParticles () {
    const { ctx, canvas, colors, mount } = this;
    const { width, height } = canvas;
    const { random, floor } = Math;
    const particles = [];

    for (let i = 0; i < mount; i++) {
      const radius = random() * 8;
      const x = random() * width - 2 * radius + radius;
      const y = random() * height - 2 * radius + radius;
      const velocity = random() * 6;
      const idx = floor(random() * colors.length);
      particles.push(
        new Particle({
          ctx,
          canvas,
          x,
          y,
          radius,
          color: colors[idx],
          velocity
        })
      );
    }
    this.particles.push(...particles);
  }
}

function getStyle (elem, prop, type = null) {
  if (window.getComputedStyle) {
    return prop
      ? parseInt(window.getComputedStyle(elem, type)[prop])
      : window.getComputedStyle(elem, null);
  } else {
    return prop ? parseInt(elem.currentStyle[prop]) : elem.currentStyle;
  }
}

function debounce (fn, delay = 500, immediate = false) {
  let res = null,
      t = null;

  function later (args) {
    t = setTimeout(() => {
      res = fn.apply(this, args);
      debounced.onremove();
    }, delay)
  }

  function debounced (...args) {
    if (!t) {
      immediate ? res = fn.apply(this, args) : later.call(this, args);
    } else {
      debounced.onremove();
      later.call(this, args);
    }

    return res;
  }

  debounced.onremove = () => {
    clearTimeout(t);
    t = null;
  }

  return debounced;
}

export default Particles;
