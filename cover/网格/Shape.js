class Shape {
  constructor (el = document.body) {
    this.el = el;
    this.maxGeneration = (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) ? 5 : 6;
    this.frameDuration = 1000 / 60;
    this.duration = 3000;
    this.rotationSpeed = 0.3;
    this.totalIterations = Math.floor(this.duration / this.frameDuration);
    this.maxBaseSize = 100;
    this.baseSizeSpeed = 0.02;
    this.shapes = [];
    this.sizeVariation = 1;
    this.iteration = 0;
    this.animationDirection = 1;
    this.sizeVariationRange = .15;
    this.baseRotation = 0;
    this.baseSize = 50;
    this.c1 = 43;
    this.c1S = 1;
    this.c2 = 205;
    this.c2S = 1;
    this.c3 = 255;
    this.c3S = 1;

    this.init();
  }

  init () {
    this.initCanvas();
    this.initCanvasSize();
    this.show();
    this.bindEvent();
  }

  show () {
    const opts = [0, this.canvas.width / 2, this.canvas.height / 2, this.baseSize, this.baseRotation];
    this.changeColor();
    this.genShapes(...opts);
    this.animate();
    requestAnimationFrame(this.show.bind(this));
  }

  bindEvent () {
    window.addEventListener('resize', debounce(this.initCanvasSize.bind(this)), false);
  }

  initCanvas () {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.initCanvasSize();
    this.canvas.style = `
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    `
    this.el.appendChild(this.canvas);
  }

  initCanvasSize () {
    const { el } = this;
    this.canvas.width = getStyle(el, 'width');
    this.canvas.height = getStyle(el, 'height');
  }

  genPos (x, y, size, rotation) {
    const { sin, cos } = Math;
    const { degToRad } = this;
    this.start = {
      x: x,
      y: y
    };
    this.end = {
      x_1: x + cos(degToRad(rotation)) * size,
      y_1: y + sin(degToRad(rotation)) * size,
      x_2: x + cos(degToRad(rotation + 360 / 3)) * size,
      y_2: y + sin(degToRad(rotation + 360 / 3)) * size,
      x_3:
        x +
        cos(degToRad(rotation + 360 / 3 * 2)) * size,
      y_3:
        y + sin(degToRad(rotation + 360 / 3 * 2)) * size
    };
  }

  genShapes (gen, x, y, size, rotation) {
    this.generation = gen;
    this.size = size;
    this.rotation = -rotation;
    this.genPos(x, y, size, this.rotation);
    const { end } = this;
    if (this.generation < this.maxGeneration) {
      const gen = this.generation + 1,
            newSize = size * this.sizeVariation;

      this.genShapes(gen, end.x_1, end.y_1, newSize, this.rotation);
      this.genShapes(gen, end.x_2, end.y_2, newSize, this.rotation);
      this.genShapes(gen, end.x_3, end.y_3, newSize, this.rotation);
    }
    this.draw();
  }

  draw () {
    const { ctx, start, end,c1,c2,c3 } = this;

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x_1, end.y_1);
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x_2, end.y_2);
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x_3, end.y_3);
    //ctx.closePath();
    ctx.strokeStyle =
      "rgba(" + c1 + "," + c2 + "," + c3 + "," + 1 / this.generation / 5 + ")";
    ctx.stroke();
    //ctx.fill();
  }

  animate () {
    const { ctx, canvas } = this;
    //ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(0,0,0,.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";
    this.iteration++;
    (this.baseSize < this.maxBaseSize) && (this.baseSize += this.baseSizeSpeed);
    this.baseRotation += this.rotationSpeed;
    this.sizeVariation = this.easeInOutSine(
      this.iteration,
      1 - this.sizeVariationRange * this.animationDirection,
      this.sizeVariationRange * 2 * this.animationDirection,
      this.totalIterations
    );
    if (this.iteration >= this.totalIterations) {
      this.iteration = 0;
      this.animationDirection *= -1;
    }
  }

  degToRad (deg) {
    return Math.PI / 180 * deg;
  }

  easeInOutSine (
    currentIteration,
    startValue,
    changeInValue,
    totalIterations
  ) {
    return (
      changeInValue /
      2 *
      (1 - Math.cos(Math.PI * currentIteration / totalIterations)) +
      startValue
    );
  }

  changeColor () {
    const { c1, c2, c3 } = this;
    (c1 == 0 || c1 == 255) && (this.c1S *= -1);
    (c2 == 0 || c2 == 255) && (this.c2S *= -1);
    (c3 == 0 || c3 == 255) && (this.c3S *= -1);
    this.c1 += 1 * this.c1S;
    this.c2 += 1 * this.c2S;
    this.c3 += 1 * this.c3S;
  }
}

function getStyle (el, prop, type = null) {
  if (window.getComputedStyle) {
    return prop ? parseInt(window.getComputedStyle(el, type)[prop])
      : window.getComputedStyle(el);
  } else {
    return prop ? parseInt(el.currentStyle[prop])
      : el.currentStyle;
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


export default Shape;
