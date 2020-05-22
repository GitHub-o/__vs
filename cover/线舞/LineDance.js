class LineDance {
  constructor (el = document.body, mount = 400) {
    this.el = el;
    this.TAU = Math.PI * 2;
    this.PARTICLE_COUNT = mount;

    this.init();
  }

  init () {
    this.initCanvas();
    this.initDistance();
    this.gen();
    this.animate();
    this.bindEvent();
  }

  bindEvent () {
    const { el } = this;

    el.addEventListener('mousemove', (e) => this.onMouseMove(e), false);
    window.addEventListener('resize', debounce(this.resetCanvasSize.bind(this)), false);
  }

  initDistance () {
    const { width } = this.canvas;
    this.CONNECT_DISTANCE = width * 0.05;
    this.FORCE_DISTANCE = width * 0.1;
  }

  onMouseMove (e) {
    const { FORCE_DISTANCE, particles, distance, angle, lerp } = this;
    const { offsetX, offsetY } = e;

    particles.forEach(p => {
      const dist = distance(offsetX, offsetY, p.x, p.y);

      if (dist < FORCE_DISTANCE && dist > 0) {
        p.angle = angle(offsetX, offsetY, p.x, p.y);
        const force = (FORCE_DISTANCE - dist) * 0.1;
        p.speed = lerp(p.speed, force, 0.2);
      }
    });
  }

  animate () {
    this.time = new Date();
    this.update();
    this.render();
    window.requestAnimationFrame(() => this.animate());
  };

  initCanvas () {
    const { el } = this;

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style = `
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      background-color: #111;
    `;
    this.resetCanvasSize();
    el.appendChild(this.canvas);
  }

  resetCanvasSize () {
    const { el } = this;

    this.canvas.width = getStyle(el, 'width');
    this.canvas.height = getStyle(el, 'height');
  }

  r = (n = 1) => Math.random() * n;

  particlePrototype () {
    const { TAU, CONNECT_DISTANCE, canvas, r } = this;
    const { width, height } = canvas;

    return {
      x: width * 0.5 + Math.cos(r(TAU)) * r(width * 0.5),
      y: height * 0.5 + Math.sin(r(TAU)) * r(height * 0.5),
      angle: r(TAU),
      speed: r(0.15),
      normalSpeed: r(0.15),
      oscAmplitudeX: r(2),
      oscSpeedX: 0.001 + r(0.008),
      oscAmplitudeY: r(2),
      oscSpeedY: 0.001 + r(0.008),
      connectDistance: r(CONNECT_DISTANCE),
      color: {
        r: Math.round(200 + r(55)),
        g: Math.round(150 + r(105)),
        b: Math.round(200 + r(55))
      }
    }
  }

  lerp = (start, end, amt) => (1 - amt) * start + amt * end;

  distance (x1, y1, x2, y2) {
    const a = x1 - x2;
    const b = y1 - y2;
    return Math.sqrt(a * a + b * b);
  };

  angle (cx, cy, ex, ey) {
    return Math.atan2(ey - cy, ex - cx);
  }

  gen () {
    this.particles = Array.from({ length: this.PARTICLE_COUNT }, () => this.particlePrototype())
  }

  update () {
    const { time, particles, lerp, canvas, r } = this;
    const { width, height } = canvas;
    const { cos, sin, PI, max, min } = Math;

    particles.forEach(p1 => {
      p1.x += (cos(p1.angle) + cos(time * p1.oscSpeedX) * p1.oscAmplitudeX) * p1.speed;
      p1.y += (sin(p1.angle) + cos(time * p1.oscSpeedY) * p1.oscAmplitudeY) * p1.speed;

      p1.speed = lerp(p1.speed, p1.normalSpeed, 0.1);

      if (p1.x > width || p1.x < 0) {
        p1.angle = PI - p1.angle;
      }
      if (p1.y > height || p1.y < 0) {
        p1.angle = -p1.angle;
      }

      if (r() < 0.005)
        p1.oscAmplitudeX = r(2);
      if (r() < 0.005)
        p1.oscSpeedX = 0.001 + r(0.008);
      if (r() < 0.005)
        p1.oscAmplitudeY = r(2);
      if (r() < 0.005)
        p1.oscSpeedY = 0.001 + r(0.008);

      p1.x = max(-0.01, min(p1.x, width + 0.01));
      p1.y = max(-0.01, min(p1.y, height + 0.01));
    });
  }

  render () {
    const { ctx, canvas, particles, distance, lerp, time } = this;
    const { width, height } = canvas;
    const { floor, sin } = Math;

    ctx.clearRect(0, 0, width, height);
    particles.map(p1 => {
      particles.
        filter(p2 => {
          if (p1 == p2)
            return false;
          if (distance(p1.x, p1.y, p2.x, p2.y) > p1.connectDistance)
            return false;
          return true;
        }).
        map(p2 => {
          const dist = distance(p1.x, p1.y, p2.x, p2.y);
          p1.speed = lerp(p1.speed, p1.speed + 0.05 / p1.connectDistance * dist, 0.2);
          return {
            p1,
            p2,
            color: p1.color,
            opacity: floor(100 / p1.connectDistance * (p1.connectDistance - dist)) / 100
          };

        }).
        forEach((line, i) => {
          const colorSwing = sin(time * line.p1.oscSpeedX);
          ctx.beginPath();
          ctx.globalAlpha = line.opacity;
          ctx.moveTo(line.p1.x, line.p1.y);
          ctx.lineTo(line.p2.x, line.p2.y);
          ctx.strokeStyle = `rgb(
            ${floor(line.color.r * colorSwing) },
            ${floor(line.color.g * 0.5 + line.color.g * 0.5 * colorSwing) },
            ${line.color.b }
          )`;
          ctx.lineWidth = line.opacity * 4;
          ctx.stroke();
          ctx.closePath();
        });
    });
  };
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

export default LineDance;
