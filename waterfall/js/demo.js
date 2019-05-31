;(function(doc) {
      var t = null;
      var Waterfall = function(wrap, opt) {
            this.wrap = $get('' + wrap)[0];
            this.column = opt.column || 6;
            this.gap = opt.gap || 10,
            this.pages = 0;
            this.pageNum = 0;
            this.heightArr = [];
            this.API = opt.url;
            this.wrap.style.position = 'relative';
            if(!this.API) {
                  throw new Error('url未填写');
            }
      }

      Waterfall.prototype = {
            init: function() {
                  this.bindEvent();
                  this.getImgDatas(this.pageNum);
                  t = setTimeout(function() {
                        window.scroll(0, 0);
                        clearTimeout(t);
                        t = null;
                  }, 400);
            },

            bindEvent: function() {
                  addEvent(window, 'scroll', throttle(this.moreImgDatas, 500).bind(this));
            },

            moreImgDatas: function() {
                  if(getViewPort().h + getScrollOffset().y >= getScrollSize().h) {
                        this.pageNum++;
                        if(this.pageNum <= this.pages - 1) {
                              this.getImgDatas(this.pageNum);
                        }
                  }
            },

            getImgDatas: function(pageNum) {
                  var _self = this;
                  xhr.ajax({
                        url: this.API,
                        type: 'POST',
                        data: {
                              pageNum: pageNum
                        },
                        success: function(data) {
                              var res = JSON.parse(data.pageData);
                              _self.pages = data.pageSize;
                              _self.renderImgs(res, pageNum);
                        }
                  })
            },

            renderImgs: function(data, pageNum) {
                  var _self = this,
                        wrapWidth = getStyle(this.wrap, 'width'),
                        liWidth = Math.round((wrapWidth - this.gap * (this.column - 1)) / this.column),
                        liHeight,
                        oLi,
                        oImg,
                        minIdx;
                        
                  data.jForEach(function(val, idx) {
                        oLi = doc.createElement('li');
                        liHeight = Math.round(liWidth * val.height / val.width);
                        oLi.style.position = 'absolute';
                        oLi.style.width = liWidth + 'px';
                        oLi.style.height = liHeight + 'px';
                        oImg = new Image();
                        oImg.src = val.img;
                        oImg.style.opacity = 0;
                        oImg.style.transition = 'opacity 1s';
                        oLi.appendChild(oImg);
                        _self.wrap.appendChild(oLi);

                        if(_self.column > idx && pageNum === 0) {
                              oLi.style.top = 0;
                              oLi.style.left = (liWidth + _self.gap) * idx + 'px';
                              _self.heightArr.push(liHeight + _self.gap);
                        }else {
                              minIdx = _self.getArrIdx(_self.heightArr);
                              oLi.style.left = (liWidth + _self.gap) * minIdx + 'px';
                              oLi.style.top = _self.heightArr[minIdx] + 'px';
                              _self.heightArr[minIdx] += oLi.offsetHeight + _self.gap;
                        }
                        oImg.style.opacity = 1;
                  })
                  _self.wrap.style.height = Math.max.apply(null, _self.heightArr) + 'px';
            }, 

            getArrIdx: function(arr) {
                  return [].indexOf.call(arr, Math.min.apply(null, arr));
            }
      }

      window.Waterfall = Waterfall;
} (document))