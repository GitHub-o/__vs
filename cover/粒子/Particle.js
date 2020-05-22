class Part {
  constructor ({ deg, rad, x, y, size }) {
    this.deg = deg;
    this.rad = rad;
    this.x = x;
    this.y = y;
    this.color = 'rgb(' + Math.floor(Math.random() * 130) + ',' + Math.floor(Math.random() * 50) + ',' + Math.floor(Math.random() * 100) + ')';
    this.size = size;
  }

  animate ({ bounds, mx, my, flow, canvas, midX, midY, end, ctx }) {
    const { PI, cos, sin, floor, random } = Math;
    const p = this;
    const radi = PI / 180 * p.deg;

    p.distX = midX + p.rad * cos(radi);
    p.distY = midY + p.rad * sin(radi) * 0.4;

    if (mx && my) {
      const react = floor((bounds * 0.5) + random() * (bounds * 0.9));
      if (p.distX - mx > 0 &&
        p.distX - mx < bounds &&
        p.distY - my > 0 &&
        p.distY - my < bounds) {
        p.distX += react;
        p.distY += react;
      } else if (p.distX - mx > 0 &&
        p.distX - mx < bounds &&
        p.distY - my < 0 &&
        p.distY - my > -bounds) {
        p.distX += react;
        p.distY -= react;
      } else if (p.distX - mx < 0 &&
        p.distX - mx > -bounds &&
        p.distY - my > 0 &&
        p.distY - my < bounds) {
        p.distX -= react;
        p.distY += react;
      } else if (p.distX - mx < 0 &&
        p.distX - mx > -bounds &&
        p.distY - my < 0 &&
        p.distY - my > -bounds) {
        p.distY -= react;
        p.distY -= react;
      }
    }
    p.x += ((p.distX - p.x) / flow);
    p.y += ((p.distY - p.y) / flow);

    this.draw({ end, ctx, canvas });
  }

  draw ({ end, ctx, canvas }) {
    const { height } = canvas;
    const p = this;

    var x = p.x;
    var y = p.y;
    var s = p.size * (p.y * 1.5 / height);
    if (s < 0.1) {
      s = 0;
    }

    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(x, y, s, 0, end, true);
    ctx.fill();
    ctx.closePath();

    let vary = 0;

    if (p.size < 2) {
      vary = 4;
    } else if (p.size < 3) {
      vary = 3;
    } else if (p.size < 4) {
      vary = 2;
    } else {
      vary = 1;
    }
    vary *= (p.y / (height * 0.9));

    p.deg += vary;
    p.deg = p.deg % 360;
  }
}

class Particle {
  constructor (el = document.body, mount = 650) {
    this.el = el;
    this.mount = mount;
    this.num = mount;
    this.parts = [];
    this.begin = 50;
    this.repeat = 20;
    this.end = Math.PI * 2;
    this.force = null;
    this.msdn = false;

    this.init();
  }

  init () {
    this.initCanvas();
    this.genPart();
    this.run();
    this.bindEvent();
  }

  bindEvent () {
    this.el.addEventListener('mousemove', (e) => this.onMouseMove(e), false);
    window.addEventListener('resize', debounce(this.initCanvasSize.bind(this)), false)
  }

  onMouseMove (e) {
    const { offsetX, offsetY } = e;

    this.msX = offsetX;
    this.msY = offsetY;
  }

  initCanvas () {
    const { el } = this;

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style = `
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    `;
    this.initCanvasSize();
    el.appendChild(this.canvas);
  }

  initCanvasSize () {
    const { el } = this;

    this.canvas.width = getStyle(el, 'width');
    this.canvas.height = getStyle(el, 'height');

    const { canvas, begin } = this;
    const { width, height } = canvas;

    this.midX = width / 2;
    this.midY = height / 2;
    this.force = Math.max(width, height) * 0.09;
    this.flow = begin;
  }

  genPart () {
    const { num, canvas, repeat, parts } = this;
    const { width, height } = canvas;
    const {floor, random} = Math;
    let n = num;

    while (n--) {
      const deg = floor(random() * 360);
      const rad = floor(random() * width * 0.5);
      const x = floor(random() * width);
      const y = floor(random() * height);
      const color = 'rgb(' + floor(random() * 130) + ',' + floor(random() * 50) + ',' + floor(random() * 100) + ')';
      const size = 1 + floor(random() * (rad * 0.055));
      const p = new Part({ deg, rad, x, y, size, color });
      parts.push(p);
    }

    const int = setInterval(() => {
      this.flow--;
      if (this.flow === repeat) clearInterval(int);
    }, 20);
  }

  go () {
    const { ctx, canvas, msX, end, msY, midX, midY, flow, force, msdn, parts } = this;
    const { width, height } = canvas;

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'hsla(242, 30%, 5%, .55)';
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter';

    var mx = msX;
    var my = msY;
    var bounds = force;
    if (msdn) {
      bounds = force * 2;
    }

    parts.forEach(val => val.animate({ ctx, midX, midY, end, bounds, mx, my, flow, canvas }));
  }

  run () {
    this.go();
    window.requestAnimationFrame(() => this.run());
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


export default Particle;
