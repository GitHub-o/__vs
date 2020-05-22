class FireLight {
  constructor (el = document.body, mount = 100) {
    this.el = el;
    this.OPTIONS = {
      AMOUNT: mount,
      UPPER_LIMIT: 20,
      LOWER_LIMIT: 1,
      UPPER_SIZE: 10,
      LOWER_SIZE: 4,
      FRAME_COUNT: 0
    };

    this.init();
  }

  init () {
    this.initCanvas();
    this.genParticles();
    this.draw();
    this.bindEvent();
  }

  bindEvent () {
    window.addEventListener('resize', debounce(this.initCanvasSize.bind(this)), false);
  }

  initCanvas () {
    const { el } = this;

    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
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

  doIt () {
    return Math.random() > 0.5;
  }

  update (p) {
    const { doIt, OPTIONS } = this;
    const { max, min } = Math;
    return doIt() ? max(OPTIONS.LOWER_LIMIT, p - 1) : min(p + 1, OPTIONS.UPPER_LIMIT);
  }

  reset (p) {
    p.x = p.startX;
    p.y = p.startY;
  }

  floored (r) {
    const { floor, random } = Math;
    return floor(random() * r);
  }

  genParticles () {
    const { OPTIONS, floored, canvas, context, doIt } = this;
    const { UPPER_SIZE, LOWER_SIZE, UPPER_LIMIT } = OPTIONS;
    const { width, height } = canvas;
    const { PI, floor, random } = Math;

    const res = new Array(OPTIONS.AMOUNT).fill().map(() => {
      var size = floored(UPPER_SIZE) + LOWER_SIZE;
      var c = document.createElement('canvas');
      var ctx = c.getContext('2d');
      var r = PI / 180 * floored(360);
      var color = 'rgba(255,' + (100 + floor(random() * 70)) + ', 0, ' + random() + ')';
      var xDelayed = doIt();
      var startX = xDelayed ? -(size + floored(width)) : floored(width * 0.25);
      var startY = xDelayed ? size + floored(height * 0.25) + floor(height * 0.75) : height + size + floored(height);
      c.height = size;
      c.width = size;
      context.globalCompositeOperation = 'multiply';
      // ctx.filter = `blur(${Math.random() * size}px)`
      ctx.translate(size / 2, size / 2);
      ctx.rotate(r);
      ctx.translate(-(size / 2), -(size / 2));
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, size, size);

      return {
        x: startX,
        y: startY,
        startY: startY,
        startX: startX,
        c: c,
        r: r,
        vx: floored(UPPER_LIMIT / 4),
        vy: floored(UPPER_LIMIT / 4),
        size: size
      };
    });

    this.particles = res;
  }

  draw () {
    const { context, canvas, doIt, reset, particles, OPTIONS } = this;
    // context.restore()
    let _iteratorNormalCompletion = true;
    let _didIteratorError = false;
    let _iteratorError = undefined;

    try {
      for (let _iterator = particles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        const particle = _step.value;

        context.clearRect(particle.x, particle.y, particle.size, particle.size);
        OPTIONS.FRAME_COUNT++;
        if (particle.y < canvas.height || particle.startX < 0) particle.x += particle.vx;
        if (particle.x > 0 || particle.startY > canvas.height) particle.y -= particle.vy;
        if (OPTIONS.FRAME_COUNT % 11 === 0 && doIt()) particle.vx = this.update(particle.vx);
        if (OPTIONS.FRAME_COUNT % 13 === 0 && doIt()) particle.vy = this.update(particle.vy);
        context.drawImage(particle.c, particle.x, particle.y);
        if (particle.x > canvas.width || particle.y < -particle.size) reset(particle);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    window.requestAnimationFrame(() => this.draw());
  }
}

function getStyle (elem, prop, type = null) {
  if (window.getComputedStyle) {
    return prop ? parseInt(window.getComputedStyle(elem, type)[prop])
      : window.getComputedStyle(elem, null);
  } else {
    return prop ? parseInt(elem.currentStyle[prop])
      : elem.currentStyle;
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


export default FireLight;
