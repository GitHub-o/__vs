;(function(doc) {
      var Snake = function(el, opt) {
            this.el = $get(el)[0];
            this.wrapW = opt.wrapW || 800;
            this.wrapH = opt.wrapH || 500;
            this.border = '5px solid #000';
            this.canvasBgColor = opt.canvasBgColor || '#f0f0f0';
            this.boardBgColor = opt.boardBgColor || '#cff';
            this.bodyLen = opt.bodyLen || 2;
            this.bodyArr = [];
            this.bodyBgColor = opt.bodyBgColor || '#06f';
            this.headerBgColor = opt.headerBgColor || '#00f';
            this.size = opt.size || 20;
            this.context = '';
      }

      Snake.prototype = {
            init: function() {
                  this.createPanel();
                  this.initBody();
                  this.bindEvent();
            },

            bindEvent: function() {
            },

            createPanel: function() {
                  var frag = doc.createDocumentFragment(),
                        oWrap = document.createElement('div');

                  oWrap.style.border = this.border;
                  oWrap.style.height = this.wrapH + 'px';
                  oWrap.style.boxSizing = 'content-box';
                  this.createCanvas(frag);
                  this.createBoard(frag);
                  oWrap.appendChild(frag);
                  this.el.appendChild(oWrap);
            },

            createCanvas: function(frag) {
                  var canvas = doc.createElement('canvas');

                  this.context = canvas.getContext('2d');

                  canvas.style.backgroundColor = this.canvasBgColor;
                  canvas.width = this.wrapW * .7625;
                  canvas.height = this.wrapH;
                  frag.appendChild(canvas);
            },

            createBoard: function(frag) {
                  var _frag = doc.createDocumentFragment(),
                        oBoard = doc.createElement('div'),
                        oScoreWrap = doc.createElement('div'),
                        oPromptWrap = doc.createElement('div'),
                        item;
                        
                  var scoreArr = [
                              {title: '分数：', text: 0, class: 'score'},
                              {title: '长度：', text: 0, class: 'len'},
                              {title: '最高分：', text: 0, class: 'heightest-score'}
                        ],
                        promptArr = [
                              {bgColor: '#f33', text: ' ‹ 得分 +10 ›'},
                              {bgColor: '#3c3', text: ' ‹ 得分 +30 ›'},
                              {bgColor: '#9f6', text: ' ‹ 得分 +50 ›'},
                              {bgColor: '#ff0', text: ' ‹ 得分 +100 ›'},
                              {bgColor: '#060', text: ' ‹ 得分 -30 ›'},
                              {bgColor: '#000', text: ' ‹ 得分 -50 ›'}
                        ]

                  scoreArr.jForEach(function(val) {
                        item = doc.createElement('div');
                        item.style.height = '45px';
                        item.style.lingHeight = '45px';
                        item.innerHTML = val.title + '<span class"' + val.class + '">' + val.text + '</span>';
                        _frag.appendChild(item);
                  });
                  oScoreWrap.appendChild(_frag);
                  _frag = doc.createDocumentFragment();
                  promptArr.jForEach(function(val) {
                        item = doc.createElement('div');
                        item.style.lineHeight = '35px';
                        item.innerHTML = '<span style="display: inline-block; width: 25px; height: 25px; vertical-align: middle; background-color:' + val.bgColor + '"></span>' + val.text;
                        _frag.appendChild(item);
                  })
                  oPromptWrap.style.marginTop = '30px';
                  oPromptWrap.appendChild(_frag);
                  _frag = doc.createDocumentFragment();
                  oBoard.style.display = 'none';
                  oBoard.style.width = this.wrapW  * .2375 + 'px';
                  oBoard.style.overflow = 'hidden';
                  oBoard.style.height = '100%';
                  oBoard.style.padding = '20px 13px 20px';
                  oBoard.style.backgroundColor = this.boardBgColor;
                  oBoard.style.borderLeft = this.border;
                  oBoard.style.fontSize = '20px';
                  oBoard.style.fontWeight = 'bold';
                  oBoard.style.display = 'inline-block';
                  oBoard.appendChild(oScoreWrap);
                  oBoard.appendChild(oPromptWrap);
                  frag.appendChild(oBoard);
            },

            initBody: function() {
                  var len = this.bodyLen,
                        context = this.context,
                        size = this.size,
                        hdBgColor = this.headerBgColor,
                        bodyBgColor = this.bodyBgColor;

                  for(var i = 0; i < len; i++) {
                        this.bodyArr.push({
                              x: i * 20,
                              y: 0
                        })
                  }
                  context.beginPath();
                  this.bodyArr.jForEach(function(val, idx) {
                        context.fillStyle = idx == len - 1 ? hdBgColor : bodyBgColor;
                        context.fillRect(val.x, val.y, size, size);
                  })
            }
      }

      window.Snake = Snake
} (document))