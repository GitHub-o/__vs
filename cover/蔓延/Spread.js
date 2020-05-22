class Spread {
  constructor (el = document.body) {
    this.el = el;
    this.elWidth = getStyle(el, 'width');
    this.elHeight = getStyle(el, 'height');
    this.canvas = {};
    this.ctx = {};
    this.particles = [];
    this.hover = false;
    this.mouse = {};
    this.tick = 0;
    this.init();
  }

  init () {
    this.initConf();
    this.initCanvas();
    this.bindEvent();
  }

  bindEvent () {
    window.addEventListener("resize", debounce(this.onResize.bind(this)), false);
    this.el.addEventListener("mousemove", this.onMouseMove.bind(this), false);
    this.el.addEventListener("mouseout", this.onMouseMove.bind(this), false);
  }

  initConf () {
    const { PI, abs, random } = Math;
    const rand = n => n * random();
    this.config = {
      HALF_PI: 0.5 * PI,
      TAU: 2 * PI,
      TO_RAD: PI / 180,
      rand: n => n * random(),
      randRange: n => n - rand(2 * n),
      fadeIn: (t, m) => t / m,
      fadeOut: (t, m) => (m - t) / m,
      fadeInOut: (t, m) => {
        let hm = 0.5 * m;
        return abs((t + hm) % m - hm) / hm;
      }
    }
  }

  initCanvas () {
    const _self = this;
    this.canvas = {
      a: document.createElement('canvas'),
      b: document.createElement('canvas')
    };

    this.ctx = {
      a: _self.canvas.a.getContext('2d'),
      b: _self.canvas.b.getContext('2d')
    };

    this.canvas.b.style = `
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    `;

    this.el.appendChild(this.canvas.b);
    this.onResize();
    this.draw();
  }

  onResize () {
    this.elWidth = getStyle(this.el, 'width');
    this.elHeight = getStyle(this.el, 'height');
    this.canvas.a.width = this.canvas.b.width = this.elWidth;
    this.canvas.a.height = this.canvas.b.height = this.elHeight;
  }

  onMouseMove (e) {
    this.hover = e.type === 'mousemove';

    if (this.hover) {
      const { offsetX, offsetY } = e;
      this.mouse.x = offsetX;
      this.mouse.y = offsetY;
    }
  }

  getParticle (x, y) {
    const { ctx, config: { TO_RAD, rand, randRange, fadeInOut } } = this;
    const { round, cos, sin, floor } = Math;

    return {
      position: { x, y },
      size: 2 + rand(20),
      speed: 2 + rand(5),
      direction: floor(rand(6)) * 60 * TO_RAD,
      turnDirection: randRange(1) * 0.1,
      directionChangeRate: 20 + round(rand(10)),
      hue: rand(90) + 180,
      ttl: 100 + rand(50),
      life: 0,
      destroy: false,

      update () {
        this.destroy = this.life++ > this.ttl;
        this.direction += this.life % this.directionChangeRate === 0 && round(randRange(1)) * 60 * TO_RAD;
        this.velocity = fadeInOut(this.life, this.ttl) * this.speed;
        this.position.x += cos(this.direction) * this.velocity;
        this.position.y += sin(this.direction) * this.velocity;
      },
      draw () {
        this.update();

        ctx.a.beginPath();
        ctx.a.lineWidth = 2;
        ctx.a.strokeStyle = `hsla(${ this.hue },100%,50%,${ fadeInOut(this.life, this.ttl) })`;
        ctx.a.strokeRect(this.position.x - 0.5 * this.size, this.position.y - 0.5 * this.size, this.size, this.size);
        ctx.a.closePath();
      }
    };
  }

  draw () {
    this.tick++;
    const { tick, ctx, canvas, particles, hover, elWidth, elHeight, } = this;
    const { cos, sin } = Math;
    ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);

    if (!hover) {
      this.mouse.x = elWidth * 0.5 + cos(tick * 0.05) * 200;
      this.mouse.y = elHeight * 0.5 + sin(tick * 0.05) * 200;
    }

    tick % 2 === 0 && particles.push(this.getParticle(this.mouse.x, this.mouse.y));
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].draw();
      particles[i].destroy && particles.splice(i, 1);
    }

    ctx.b.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.b.fillRect(0, 0, canvas.b.width, canvas.b.height);
    ctx.b.save();
    ctx.b.globalCompositeOperation = "lighter";
    ctx.b.filter = "blur(8px)";
    ctx.b.drawImage(canvas.a, 0, 0, canvas.b.width, canvas.b.height);
    ctx.b.restore();
    ctx.b.save();
    ctx.b.globalCompositeOperation = "lighter";
    ctx.b.drawImage(canvas.a, 0, 0, canvas.b.width, canvas.b.height);
    ctx.b.restore();

    window.requestAnimationFrame(this.draw.bind(this));
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

export default Spread;
