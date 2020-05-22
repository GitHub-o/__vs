class Segment {
  constructor (parent, l, a, first) {
    this.first = first;
    if (first) {
      this.pos = {
        x: parent.x,
        y: parent.y
      };
    } else {
      this.pos = {
        x: parent.nextPos.x,
        y: parent.nextPos.y
      };
    }
    this.l = l;
    this.ang = a;
    this.nextPos = {
      x: this.pos.x + this.l * Math.cos(this.ang),
      y: this.pos.y + this.l * Math.sin(this.ang)
    };
  }
  update (t) {
    this.ang = Math.atan2(t.y - this.pos.y, t.x - this.pos.x);
    this.pos.x = t.x + this.l * Math.cos(this.ang - Math.PI);
    this.pos.y = t.y + this.l * Math.sin(this.ang - Math.PI);
    this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
    this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
  }
  fallback (t) {
    this.pos.x = t.x;
    this.pos.y = t.y;
    this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
    this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
  }
  show (c) {
    c.lineTo(this.nextPos.x, this.nextPos.y);
  }
}

class Tentacle {
  constructor (x, y, l, n, a) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.n = n;
    this.t = {};
    this.rand = Math.random();
    this.segments = [new Segment(this, this.l / this.n, 0, true)];
    for (let i = 1; i < this.n; i++) {
      this.segments.push(
        new Segment(this.segments[i - 1], this.l / this.n, 0, false)
      );
    }
  }
  move (last_target, target) {
    this.angle = Math.atan2(target.y - this.y, target.x - this.x);
    this.dt = dist(last_target.x, last_target.y, target.x, target.y) + 5;
    this.t = {
      x: target.x - 0.8 * this.dt * Math.cos(this.angle),
      y: target.y - 0.8 * this.dt * Math.sin(this.angle)
    };

    if (this.t.x) {
      this.segments[this.n - 1].update(this.t);
    } else {
      this.segments[this.n - 1].update(target);
    }

    for (let i = this.n - 2; i >= 0; i--) {
      this.segments[i].update(this.segments[i + 1].pos);
    }

    if (
      dist(this.x, this.y, target.x, target.y) <=
      this.l + dist(last_target.x, last_target.y, target.x, target.y)
    ) {
      this.segments[0].fallback({ x: this.x, y: this.y });
      for (let i = 1; i < this.n; i++) {
        this.segments[i].fallback(this.segments[i - 1].nextPos);
      }
    }
  }

  show (c, target) {
    if (dist(this.x, this.y, target.x, target.y) <= this.l) {
      c.globalCompositeOperation = 'color-dodge';
      c.beginPath();
      c.lineTo(this.x, this.y);
      for (let i = 0; i < this.n; i++) {
        this.segments[i].show(c);
      }
      c.strokeStyle =
        'hsl(' +
        (this.rand * 60 + 180) +
        ',100%,' +
        (this.rand * 60 + 25) +
        '%)';
      c.lineWidth = this.rand * 2;
      c.lineCap = 'round';
      c.lineJoin = 'round';
      c.stroke();
      c.globalCompositeOperation = 'source-over';
    }
  }
  show2 (c, target) {
    c.beginPath();
    if (dist(this.x, this.y, target.x, target.y) <= this.l) {
      c.arc(this.x, this.y, 2 * this.rand + 1, 0, 2 * Math.PI);
      c.fillStyle = 'white';
    } else {
      c.arc(this.x, this.y, this.rand * 2, 0, 2 * Math.PI);
      c.fillStyle = 'darkcyan';
    }
    c.fill();
  }
}

class Crawler {
  constructor (el = document.body) {
    this.el = el;
    this.mouse = { x: false, y: false };
    this.last_mouse = {};
    this.maxl = 300;
    this.minl = 50;
    this.n = 30;
    this.numt = 500;
    this.tent = [];
    this.clicked = false;
    this.target = { x: 0, y: 0 };
    this.last_target = {};
    this.t = 0;
    this.q = 10;

    this.init();
  }

  init () {
    this.initCanvas();
    this.genTentacle();
    this.animate();
    this.bindEvent();
  }

  bindEvent () {
    this.mouseMoveEvent = (e) => this.onMouseMove(e);
    this.el.addEventListener('mouseenter', (e) => this.onMouseEnter(e), false);
    window.addEventListener('resize', debounce(this.onResize.bind(this)), false);
  }

  onMouseEnter () {
    document.addEventListener('mousemove', this.mouseMoveEvent, false);
    this.el.addEventListener('mouseleave', (e) => this.onMouseLeave(e), false);
  }

  onMouseMove (e) {
    const { offsetX, offsetY } = e;

    this.mouse.x = offsetX;
    this.mouse.y = offsetY;
  }

  onMouseLeave () {
    this.mouse.x = false;
    this.mouse.y = false;
    document.removeEventListener('mousemove', this.mouseMoveEvent, false);
  }

  onResize () {
    this.initCanvasSize();
    this.tent = [];
    this.genTentacle();
  }

  animate () {
    const { canvas, ctx } = this;
    const { width, height } = canvas;

    ctx.clearRect(0, 0, width, height);
    this.show();
    window.requestAnimationFrame(() => this.animate());
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
      background-color: #000;
    `;
    this.initCanvasSize();
    el.appendChild(this.canvas);
  }

  initCanvasSize () {
    const { el } = this;

    this.canvas.width = getStyle(el, 'width');
    this.canvas.height = getStyle(el, 'height');
  }

  genTentacle () {
    const { canvas, maxl, minl, numt, n, tent } = this;
    const { width, height } = canvas;

    for (let i = 0; i < numt; i++) {
      tent.push(
        new Tentacle(
          Math.random() * width,
          Math.random() * height,
          Math.random() * (maxl - minl) + minl,
          n,
          Math.random() * 2 * Math.PI
        )
      );
    }
  }

  show () {
    const { target, mouse, canvas, q, t } = this;
    const { width, height } = canvas;

    if (mouse.x) {
      this.target.errx = mouse.x - target.x;
      this.target.erry = mouse.y - target.y;
    } else {
      this.target.errx =
        width / 2 +
        ((height / 2 - q) * Math.sqrt(2) * Math.cos(t)) /
        (Math.pow(Math.sin(t), 2) + 1) -
        this.target.x;
      this.target.erry =
        height / 2 +
        ((height / 2 - q) * Math.sqrt(2) * Math.cos(t) * Math.sin(t)) /
        (Math.pow(Math.sin(t), 2) + 1) -
        this.target.y;
    }

    this.target.x += this.target.errx / 10;
    this.target.y += this.target.erry / 10;

    this.t += 0.01;
    this.draw();
  }

  draw () {
    const { target, ctx, last_target, numt, tent } = this;

    ctx.beginPath();
    ctx.arc(
      target.x,
      target.y,
      dist(last_target.x, last_target.y, target.x, target.y) + 5,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = 'hsl(210,100%,80%)';
    ctx.fill();

    for (let i = 0; i < numt; i++) {
      tent[i].move(last_target, this.target);
      tent[i].show2(ctx, this.target);
    }
    for (let i = 0; i < numt; i++) {
      tent[i].show(ctx, this.target);
    }

    this.last_target.x = this.target.x;
    this.last_target.y = this.target.y;
  }
}

function dist (p1x, p1y, p2x, p2y) {
  return Math.sqrt(Math.pow(p2x - p1x, 2) + Math.pow(p2y - p1y, 2));
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


export default Crawler;
