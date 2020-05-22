class Star {
  constructor (x, y, radius, size, color) {
    this.radians = Math.random() * (Math.PI * 2);
    this.x = x + Math.cos(this.radians) * radius;
    this.y = y + Math.sin(this.radians) * radius;
    this.radius = radius;
    this.color = color;
    this.size = size;

    this.last = { x: x, y: y };
    this.alpha = 0;
    this.temp = 0;
  }

  update (ctx) {
    const lastPos = { x: this.x, y: this.y };

    if (this.temp > 1) {
      this.alpha -= 0.008;
    } else {
      this.temp += 0.008;
      this.alpha += 0.008;
    }

    if (this.alpha <= 0) this.alpha = 0;

    this.radians += Math.random() * 0.05;
    this.x = this.last.x + Math.cos(this.radians) * this.radius;
    this.y = this.last.y + Math.sin(this.radians) * this.radius;
    this.draw({ lastPos, ctx });
  }

  draw ({ lastPos, ctx }) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.size;
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(this.x, this.y);
    ctx.globalAlpha = this.alpha;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}

class Group {
  constructor (x, y, num, canvas) {
    this.colors = ['#D9EAF9', '#32B7F4', '#2E49E0', '#182098'];
    this.stars = [];

    this.genStars(x, y, num, canvas);
  }

  genStars (x, y, num, canvas) {
    const { random } = Math;
    const { minMax } = this;
    const moreRand = minMax(100, canvas.width);

    for (var i = 0; i < num; i++) {
      this.stars.push(
        new Star(x, y, random() * moreRand, random() * 5, this.getRandomColor())
      );
    }
  }

  update (ctx) {
    this.stars.forEach((star) => star.update(ctx));
  }

  getRandomColor () {
    const { colors } = this;
    var idx = parseInt(Math.random() * colors.length);
    return colors[idx];
  }

  minMax (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

class Rotation {
  constructor (el = document.body, mount = 100) {
    this.el = el;
    this.mount = mount;
    this.groups = [];
    this.addedGroups = [];
    this.delay = 1500;

    this.init();
  }

  init () {
    this.initCanvas();
    this.genGroup();
    this.animate();
    this.bindEvent();
  }

  bindEvent () {
    this.el.addEventListener('mousedown', (e) => this.onMouseDown(e), false);
    window.addEventListener('resize', debounce(this.initCanvasSize.bind(this)), false);
  }

  onMouseDown (e) {
    const { canvas, addedGroups, mount } = this;
    const { offsetX, offsetY } = e;

    addedGroups.push(new Group(offsetX, offsetY, mount, canvas));
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
      background-color: #111;
    `;
    this.initCanvasSize();
    el.appendChild(this.canvas);
  }

  initCanvasSize () {
    const { el } = this;
    this.canvas.width = getStyle(el, 'width');
    this.canvas.height = getStyle(el, 'height');
  }

  genGroup () {
    const { groups, canvas, mount, delay } = this;

    groups.push(new Group(canvas.width / 2, canvas.height / 2, mount, canvas));
    this.timer = setInterval(() => {
      const posX = Math.random() * canvas.width;
      const posY = Math.random() * canvas.height;

      groups.push(new Group(posX, posY, mount, canvas));
      if (groups.length > 8) {
        groups.splice(0, 1);
      }
    }, delay);
  }

  animate () {
    const { ctx, canvas, groups, addedGroups } = this;

    requestAnimationFrame(() => this.animate());
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(0, 0, 0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    groups.forEach((s) => s.update(ctx));
    addedGroups.forEach((s) => s.update(ctx));
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

export default Rotation;
