(function(doc) {
  var [
    dir,
    timer,
    foodX,
    foodY,
    sumScore,
    score,
    rFoodX,
    rFoodY,
    rScore,
    t,
    btnFlag,
    isStart,
    level,
    speed,
    hs,
    isBreakStr
  ] = [
    'Right',
    null,
    null,
    null,
    0,
    0,
    null,
    null,
    0,
    null,
    false,
    false,
    'level_1',
    400,
    '--',
    ''
  ];

  var colorArr = ['#f10', '#3c3', '#9f6', '#ff0', '#060', '#000', '#603'],
    scoreArr = [
      { title: '分数：', text: 0, class: 'J_score' },
      { title: '长度：', text: 0, class: 'J_len' },
      { title: '最高分：', text: '--', class: 'J_heightest-score' }
    ],
    promptArr = [
      { bgColor: colorArr[0], text: ' ‹ 得分 +10 ›' },
      { bgColor: colorArr[1], text: ' ‹ 得分 +30 ›' },
      { bgColor: colorArr[2], text: ' ‹ 得分 +50 ›' },
      { bgColor: colorArr[3], text: ' ‹ 得分 +100 ›' },
      { bgColor: colorArr[4], text: ' ‹ 得分 -30 ›' },
      { bgColor: colorArr[5], text: ' ‹ 得分 -50 ›' }
    ];

  var Snake = function(el, opt = {}) {
    this.el = doc.querySelector(el);
    this.wrapW = opt.wrapWidth || 800;
    this.wrapH = opt.wrapHeight || 500;
    this.minW = 700;
    this.minH = 350;
    this.border = '5px solid #000';
    this.ctxWidth = this.wrapW * 0.75;
    this.canvasBgColor = opt.canvasBgColor || '#f0f0f0';
    this.boardBgColor = opt.boardBgColor || '#cff';
    this.bodyLen = opt.bodyLength || 2;
    this.initLen = this.bodyLen;
    this.bodyArr = [];
    this.barrierObj = {};
    this.barrierArr = [];
    this.bodyBgColor = opt.bodyBgColor || '#06f';
    this.headerBgColor = opt.headerBgColor || '#00f';
    this.size = opt.size || 20;
    this.context = '';
  };

  Snake.prototype = {
    init: function() {
      this.createPanel();
      this.getElement();
      this.initBarrier();
      this.barrierArr = this.barrierObj[level];
      this.drawBarrier(this.barrierArr);
      this.getLocalStorage();
      this.bindEvent();
    },

    bindEvent: function() {
      addEvent(doc, 'keydown', this.keyDown.bind(this));
      addEvent(this.oLevel, 'change', this.selectLevel.bind(this));
      addEvent(this.oSpeed, 'change', this.selectSpeed);
      addEvent(this.oStartBtn, 'click', this.startBtnClick.bind(this));
      addEvent(this.oResetBtn, 'click', this.resetBtnClick.bind(this));
    },

    createPanel: function() {
      var frag = doc.createDocumentFragment(),
        oWrap = document.createElement('div');

      oWrap.style.cssText =
        '\
										position: relative; \
										border: ' +
        this.border +
        '; \
										width: ' +
        this.wrapW +
        'px; \
										min-width: ' +
        this.minW +
        'px;\
										height:' +
        this.wrapH +
        'px;\
										min-height: ' +
        this.minH +
        'px;\
										box-sizing: content-box;\
							';

      oWrap.innerHTML +=
        this.createBoard() + this.createBtnControl() + this.createTip();
      this.createCanvas(frag);
      oWrap.appendChild(frag);
      this.el.appendChild(oWrap);
    },

    createCanvas: function(frag) {
      var canvas = doc.createElement('canvas');

      this.context = canvas.getContext('2d');

      canvas.style.backgroundColor = this.canvasBgColor;
      canvas.width = this.ctxWidth;
      canvas.height = this.wrapH;
      frag.appendChild(canvas);
    },

    scoreStr: function() {
      var list = '';
      scoreArr.jForEach(function(val) {
        list +=
          '<li style="height: 45px;\
																								line-height: 45px;">' +
          val.title +
          ' \
																			<span class="' +
          val.class +
          '"> \
																						' +
          val.text +
          '\
																			</span>\
																</li>';
      });
      return '<div>' + list + '</div>';
    },

    promptStr: function() {
      var list = '';
      promptArr.jForEach(function(val) {
        list +=
          '<li style="line-height: 35px">\
																			<span style="display: inline-block; \
																														width: 25px; \
																														height: 25px; \
																														vertical-align: middle; \
																														background-color:' +
          val.bgColor +
          '">\
																			</span>\
																			' +
          val.text +
          '\
																</li>';
      });
      return '<div style="margin-top: 30px">' + list + '</div>';
    },

    createBoard: function() {
      var tip =
        '<p style="margin-top: 15px; color: #999; font-size: 12px; font-weight: normal; line-height: 20px">~ 限时奖励的分数会随着关卡的难度而翻倍 ~</p>';

      return (
        '<div style="width: ' +
        this.wrapW * 0.25 +
        'px;\
																						height: 100%;\
																						float: right;\
																						padding: 20px 13px 20px;\
																						background-color: ' +
        this.boardBgColor +
        ';\
																						border-left: ' +
        this.border +
        ';\
																						box-sizing: border-box;\
																						font-size: 20px;\
																						font-weight: bold;\
																						">\
																						' +
        this.scoreStr() +
        '\
																						' +
        this.promptStr() +
        '\
																						' +
        tip +
        '\
													</div>'
      );
    },

    createBtnControl: function() {
      return (
        '<div style="position: absolute; \
																							left: 0; \
																							bottom: -80px; \
																							width: 100%; \
																							font-size: 20px; \
																							text-align: center">\
																			' +
        this.controlStr() +
        '\
													</div>'
      );
    },

    createTip: function() {
      return '<p style="display: none;\
																					position: absolute; \
																					top: 50%;\
																					left: 40%;\
																					padding: 20px;\
																					background-color: #0ff;\
																					font-size: 20px;\
																					font-weight: bold;\
																					transform: translate(-50%, -50%);\
																					line-height: 35px\
																					" class="J_tip"\
													></p>';
    },

    controlStr: function() {
      return '<div style="display: inline-block; margin-right: 15px; padding: 10px; background-color: #fff; border: 2px  dashed #bbb;">\
																<span>模式选择：</span>\
																<select class="J_level" style="padding: 7px 15px; border: none; border-bottom: 1px outset">\
																			<option value="level_1">• 极简</option>\
																			<option value="level_2">• 简</option>\
																			<option value="level_3">• 简 +</option>\
																			<option value="level_4">• 简 ++</option>\
																			<option value="level_5">• 简 +++</option>\
																</select>\
																</div>\
																<div style="display: inline-block; margin-right: 15px; padding: 10px; background-color: #fff; border: 2px  dashed #bbb; ">\
																			<span>速度选择：</span>\
																			<select class="J_speed" style="padding: 7px 15px; border: none; border-bottom: 1px outset">\
																						<option value="400">﹒ 极慢</option>\
																						<option value="300">﹒ 慢</option>\
																						<option value="200">﹒ 快</option>\
																						<option value="100">﹒ 快 +</option>\
																			</select>\
																</div>\
																<button class="J_start" style="width: 65px; height: 65px; margin-right: 15px; background-color: #ececec; border: 3px inset #fcc; border-radius: 50%; font-size: 20px; outline:none";>开始</button>\
																<button class="J_reset" style="width: 65px; height: 65px; margin-right: 15px; background-color: #ececef; border: 3px outset #fcc; border-radius: 50%; font-size: 20px; outline:none";>重玩</button>\
																</div>';
    },

    getElement: function() {
      var el = this.el;
      this.oScore = el.querySelector('.J_score');
      this.oLen = el.querySelector('.J_len');
      this.oHScore = el.querySelector('.J_heightest-score');
      this.oLevel = el.querySelector('.J_level');
      this.oSpeed = el.querySelector('.J_speed');
      this.oStartBtn = el.querySelector('.J_start');
      this.oResetBtn = el.querySelector('.J_reset');
      this.oTip = el.querySelector('.J_tip');
    },

    initBarrier: function() {
      var arr = ['level_1', 'level_2', 'level_3', 'level_4', 'level_5'],
        barrierObj = this.barrierObj,
        size = this.size,
        i,
        x,
        y;
      arr.jForEach(function(val) {
        barrierObj[val] = [];
        switch (val) {
          case 'level_1':
            break;
          case 'level_2':
            for (i = 0; i < 10; i++) {
              x = 120;
              y = 160;
              barrierObj[val].push(
                { x: x, y: y + size * i },
                { x: 240, y: y + size * i },
                { x: 360, y: y + size * i },
                { x: 480, y: y + size * i }
              );
            }
            break;
          case 'level_3':
            for (i = 0; i < 7; i++) {
              x = 40;
              y = 160;
              barrierObj[val].push(
                { x: x + size * i, y: y - size * i },
                { x: x + size * i, y: 180 - size * i },
                { x: x + size * i, y: 320 + size * i },
                { x: x + size * i, y: 300 + size * i },
                { x: 420 + size * i, y: 40 + size * i },
                { x: 400 + size * i, y: 40 + size * i },
                { x: 420 + size * i, y: 440 - size * i },
                { x: 400 + size * i, y: 440 - size * i }
              );
            }
            break;
          case 'level_4':
            for (i = 0; i < 11; i++) {
              y = 20;
              x = 20;
              barrierObj[val].push(
                { x: x + size * i, y: y + size * i },
                { x: 40 + size * i, y: y + size * i },
                { x: 560 - size * i, y: 460 - size * i },
                { x: 540 - size * i, y: 460 - size * i },
                { x: x + size * i, y: 460 - size * i },
                { x: 40 + size * i, y: 460 - size * i },
                { x: 560 - size * i, y: y + size * i },
                { x: 540 - size * i, y: y + size * i }
              );
            }
            break;
          case 'level_5':
            for (i = 1; i < 10; i++) {
              x = 580;
              y = 240;
              barrierObj[val].push(
                { x: x - size * i, y: y + size * i },
                { x: 560 - size * i, y: y + size * i },
                { x: x - size * i, y: y - size * i },
                { x: 560 - size * i, y: y - size * i },
                { x: 460 - size * i, y: y + size * i },
                { x: 440 - size * i, y: y + size * i },
                { x: 460 - size * i, y: y - size * i },
                { x: 440 - size * i, y: y - size * i },
                { x: 340 - size * i, y: y + size * i },
                { x: 340 - size * i, y: y - size * i },
                { x: 320 - size * i, y: y + size * i },
                { x: 320 - size * i, y: y - size * i },
                { x: 220 - size * i, y: y + size * i },
                { x: 220 - size * i, y: y - size * i },
                { x: 200 - size * i, y: y + size * i },
                { x: 200 - size * i, y: y - size * i }
              );
            }
            break;
          default:
            break;
        }
      });
    },

    drawBarrier: function(arr) {
      var len = arr.length,
        size = this.size,
        context = this.context,
        item;

      context.beginPath();
      context.fillStyle = colorArr[6];
      for (var i = 0; i < len; i++) {
        item = arr[i];
        context.fillRect(item.x, item.y, size, size);
      }
    },

    selectLevel: function() {
      this.context.clearRect(0, 0, this.ctxWidth, this.wrapH);
      level = this.oLevel.value;
      this.barrierArr = this.barrierObj[level];
      this.drawBarrier(this.barrierArr);
    },

    selectSpeed: function() {
      speed = this.value;
    },

    startBtnClick: function() {
      if (!isStart) {
        this.initBody(this.initLen);
        this.bodyGo();
        this.makeFood();
        this.oStartBtn.innerText = '暂停';
        this.oLevel.style.cursor = 'not-allowed';
        this.oSpeed.style.cursor = 'not-allowed';
        this.oLen.innerText = this.bodyArr.length;
        this.oLevel.disabled = true;
        this.oSpeed.disabled = true;
        isStart = true;
        btnFlag = false;
      } else {
        if (btnFlag) {
          this.bodyGo();
          this.oStartBtn.innerText = '暂停';
          btnFlag = false;
        } else {
          clearInterval(timer);
          this.oStartBtn.innerText = '继续';
          timer = null;
          btnFlag = true;
        }
      }
    },

    resetBtnClick: function() {
      var context = this.context;

      timer && clearInterval(timer);
      context.clearRect(0, 0, this.ctxWidth, this.wrapH);
      [
        dir,
        timer,
        foodX,
        foodY,
        sumScore,
        score,
        rFoodX,
        rFoodY,
        rScore,
        t,
        btnFlag,
        isStart,
        isBreakStr
      ] = [
        'Right',
        null,
        null,
        null,
        0,
        0,
        null,
        null,
        0,
        null,
        false,
        false,
        ''
      ];
      this.bodyArr = [];
      this.oStartBtn.innerText = '开始';
      this.oTip.style.display = 'none';
      this.oLevel.style.cursor = 'default';
      this.oSpeed.style.cursor = 'default';
      this.oStartBtn.style.cursor = 'default';
      this.oScore.innerText = 0;
      this.oLen.innerText = 0;
      this.oLevel.disabled = false;
      this.oSpeed.disabled = false;
      this.oStartBtn.disabled = false;
      this.drawBarrier(this.barrierArr);
      context = null;
    },

    initBody: function(len) {
      for (var i = 0; i < len; i++) {
        this.bodyArr.push({
          x: i * 20,
          y: 0
        });
      }
      this.drawBody(this.bodyArr, len);
      i = null;
    },

    drawBody: function(arr, len) {
      var context = this.context,
        size = this.size,
        hdBgColor = this.headerBgColor,
        bodyBgColor = this.bodyBgColor;

      context.beginPath();
      arr.jForEach(function(val, idx) {
        context.fillStyle = idx == len - 1 ? hdBgColor : bodyBgColor;
        context.fillRect(val.x, val.y, size, size);
      });
    },

    clearSomething: function(arr) {
      var len = arr.length,
        size = this.size,
        context = this.context,
        item;

      for (var i = 0; i < len; i++) {
        item = arr[i];
        context.clearRect(item.x, item.y, size, size);
      }
    },

    bodyGo: function() {
      timer = setInterval(this.run.bind(this), speed);
    },

    run: function() {
      var bodyArr = this.bodyArr,
        bodyLen = bodyArr.length,
        head = bodyArr[bodyLen - 1],
        barrierArr = this.barrierArr,
        barrierLen = this.barrierArr.length;

      this.clearSomething(bodyArr);

      for (var i = 0; i < bodyLen; i++) {
        if (i === bodyLen - 1) {
          this.setDir(head);
        } else {
          bodyArr[i].x = bodyArr[i + 1].x;
          bodyArr[i].y = bodyArr[i + 1].y;
        }
      }
      this.drawBody(bodyArr, bodyLen);
      this.eateFood(bodyArr, bodyLen);
      this.headInSomething(bodyArr, bodyLen);
      this.headInSomething(barrierArr, barrierLen);
    },

    setDir: function(head) {
      var ctxW = this.ctxWidth,
        ctxH = this.wrapH,
        size = this.size;

      switch (dir) {
        case 'Left':
          head.x = head.x <= 0 ? ctxW - size : head.x - size;
          break;
        case 'Right':
          head.x = head.x >= ctxW - size ? 0 : head.x + size;
          break;
        case 'Up':
          head.y = head.y <= 0 ? ctxH - size : head.y - size;
          break;
        case 'Down':
          head.y = head.y >= ctxH - size ? 0 : head.y + size;
          break;
        default:
          break;
      }
    },

    keyDown: function(e) {
      var e = e || window.event,
        code = e.keyCode;

      this.operateDir(code);
    },

    operateDir: function(keyCode) {
      switch (keyCode) {
        case 37:
          if (dir !== 'Left' && dir !== 'Right') {
            dir = 'Left';
          }
          break;
        case 39:
          if (dir !== 'Left' && dir !== 'Right') {
            dir = 'Right';
          }
          break;
        case 38:
          if (dir !== 'Up' && dir !== 'Down') {
            dir = 'Up';
          }
          break;
        case 40:
          if (dir !== 'Up' && dir !== 'Down') {
            dir = 'Down';
          }
          break;
      }
    },

    makeFood: function() {
      var context = this.context,
        size = this.size,
        rand = Math.random(),
        isReward = Math.random(),
        pos = this.setFoodPos(this.barrierArr),
        idx;

      if (rand > 0 && rand <= 0.6) {
        idx = 0;
        score = 10;
      } else if (rand > 0.6 && rand <= 0.8) {
        idx = 1;
        score = 30;
      } else if (rand > 0.8 && rand <= 0.98) {
        idx = 2;
        score = 50;
      } else {
        idx = 3;
        score = 100;
      }
      foodX = pos.x;
      foodY = pos.y;
      context.beginPath();
      context.fillStyle = colorArr[idx];
      context.fillRect(foodX, foodY, size, size);

      if (!rFoodX && !rFoodY) {
        if (isReward >= 0.2 && isReward <= 0.8) {
          var randRF = Math.random(),
            posR = this.setFoodPos(this.barrierArr),
            i;

          if (randRF > 0 && randRF <= 0.16) {
            i = 0;
            rScore = 10;
          } else if (randRF > 0.16 && randRF <= 0.32) {
            i = 1;
            rScore = 30;
          } else if (randRF > 0.48 && randRF <= 0.64) {
            i = 2;
            rScore = 50;
          } else if (randRF >= 0.64 && randRF < 0.8) {
            i = 3;
            rScore = 100;
          } else if (randRF >= 0.8 && randRF < 0.9) {
            i = 4;
            rScore = -30;
          } else {
            i = 5;
            rScore = -50;
          }

          rScore *= level.slice(-1);
          rFoodX = posR.x;
          rFoodY = posR.y;

          context.beginPath();
          context.fillStyle = colorArr[i];
          context.fillRect(rFoodX, rFoodY, size, size);
        }
      }

      if (rFoodX && rFoodY) {
        t = setTimeout(function() {
          if (rFoodX && rFoodY) {
            context.clearRect(rFoodX, rFoodY, size, size);
            rFoodX = rFoodY = null;
          }
          clearTimeout(t);
          t = null;
        }, 7000);
      }

      if (!foodX && !foodY) {
        var _self = this;
        setTimeout(function() {
          !foodX && !foodY && _self.makeFood();
        }, 500);
      }
    },

    setFoodPos: function(barrierArr) {
      var size = this.size,
        x = Math.floor((this.ctxWidth / size) * Math.random()) * size,
        y = Math.floor((this.wrapH / size) * Math.random()) * size,
        len = barrierArr.length,
        item;

      for (var i = 0; i < len; i++) {
        item = barrierArr[i];
        if (item.x == x && item.y == y) {
          return this.setFoodPos(barrierArr);
        }
      }
      return {
        x: x,
        y: y
      };
    },

    eateFood: function(arr, len) {
      var size = this.size,
        oScore = this.oScore,
        oLen = this.oLen,
        item,
        x,
        y;

      for (var i = 0; i < len; i++) {
        item = arr[i];
        if (item.x == foodX && item.y == foodY) {
          if (arr[0].y == arr[1].y) {
            y = arr[0].y;
            if (arr[0].x < arr[1].x) {
              x = arr[0].x - size;
            } else if (arr[0].x > arr[1].x) {
              x = arr[0] + size;
            }
          } else if (arr[0].x == arr[1].x) {
            x = arr[0].x;
            if (arr[0].y < arr[1].y) {
              y = arr[0].y - size;
            } else if (arr[0].y > arr[1].y) {
              y = arr[0].y + size;
            }
          }
          this.bodyArr.unshift({
            x: x,
            y: y
          });
          foodX = foodY = null;
          sumScore += score;
          oScore.innerText = sumScore;
          oLen.innerText = this.bodyArr.length;
          this.makeFood();
          this.setLocalStorage(sumScore);
          this.oHScore.innerText = hs;
        }

        if (item.x == rFoodX && item.y == rFoodY) {
          sumScore += rScore;
          oScore.innerText = sumScore;
          this.setLocalStorage(sumScore);
          this.oHScore.innerText = hs;
          clearTimeout(t);
          t = rFoodX = rFoodY = null;
        }
      }
    },

    headInSomething: function(arr, len) {
      var bodyArr = this.bodyArr,
        bodyLen = bodyArr.length,
        headX = bodyArr[bodyLen - 1].x,
        headY = bodyArr[bodyLen - 1].y,
        item;

      for (var i = 0; i < len - 1; i++) {
        item = arr[i];
        if (item.x == headX && item.y == headY) {
          clearInterval(timer);
          timer = null;
          this.oTip.innerHTML = this.tipString(bodyLen);
          this.oTip.style.display = 'block';
          this.oStartBtn.disabled = 'true';
          this.oStartBtn.style.cursor = 'not-allowed';
        }
      }
    },

    tipString: function(len) {
      return `
										游戏结束 </br>
										${isBreakStr}
										您的得分为：${this.oScore.innerText} </br>
										长度为：${len}
							`;
    },

    setLocalStorage: function(score) {
      if (hs == '--' && score > 0) {
        hs = score;
        isBreakStr = '恭喜，破纪录啦 </br>';
        localStorage.setItem('h-score', hs);
      } else if (hs < score) {
        hs = score;
        isBreakStr = '恭喜，破纪录啦 </br>';
        localStorage.setItem('h-score', hs);
      }
    },

    getLocalStorage: function() {
      var c = localStorage.getItem('h-score');
      c && (hs = c);
      this.oHScore.innerText = hs;
      c = null;
    }
  };

  window.Snake = Snake;
})(document);
