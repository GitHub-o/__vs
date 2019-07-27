var Waterfall = (function(doc, win) {
  var t = null;
  var Waterfall = function(wrap, opt) {
    this.oWrap = doc.querySelector(wrap);
    this.column = opt.column || 6;
    this.gap = opt.gap || 10;
    this.pages = 0;
    this.curPage = 0;
    this.heightArr = [];
    this.API = opt.url;
    this.oWrap.style.position = 'relative';
    if (!this.API) {
      throw new Error('url未填写');
    }
  };

  Waterfall.prototype = {
    init: function() {
      this.bindEvent();
      this.getImgDatas(this.curPage);
      t = setTimeout(function() {
        win.scroll(0, 0);
        clearTimeout(t);
        t = null;
      }, 400);
    },

    bindEvent: function() {
			var _moreImagDatas = throttle(this.moreImgDatas, 500).bind(this),
					_resetWaterfall = debounce(this.resetWaterfall.bind(this), 500);

			addEvent(win, 'scroll', _moreImagDatas);
			addEvent(win, 'resize', _resetWaterfall);
    },

    moreImgDatas: function() {
      if (getViewPort().h + getScrollOffset().y >= getScrollSize().h) {
        this.curPage++;
        if (this.curPage <= this.pages - 1) {
          this.getImgDatas(this.curPage);
        }
      }
    },

    getImgDatas: function(curPage) {
      var _self = this;
      xhr.ajax({
        url: this.API,
        type: 'POST',
        data: {
          pageNum: curPage
        },
        success: function(data) {
          _self.res = JSON.parse(data.pageData);
          _self.pages = data.pageSize;
					_self.renderImgs(_self.res, curPage);
        }
      });
    },

    renderImgs: function(data, curPage) {
      var _self = this,
        wrapWidth = getStyle(this.oWrap, 'width'),
        liWidth = Math.round(
          (wrapWidth - this.gap * (this.column - 1)) / this.column
        ),
        liHeight,
        oLi,
        oImg,
        minIdx;

      data.jForEach(function(val, idx) {
				liHeight = Math.round((liWidth * val.height) / val.width);
				oLi = doc.createElement('li');
				liStyle = oLi.style;
        liStyle.position = 'absolute';
        liStyle.width = liWidth + 'px';
        liStyle.height = liHeight + 'px';
        oImg = new Image();
        oImg.src = val.img;
        oImg.style.opacity = 0;
        oImg.style.transition = 'opacity 1s';
        oLi.appendChild(oImg);
        _self.oWrap.appendChild(oLi);

        if (_self.column > idx && curPage === 0) {
          liStyle.top = 0;
					liStyle.left = (liWidth + _self.gap) * idx + 'px';
          _self.heightArr.push(liHeight + _self.gap);
        } else {
          minIdx = _self.getArrIdx(_self.heightArr);
          liStyle.left = (liWidth + _self.gap) * minIdx + 'px';
          liStyle.top = _self.heightArr[minIdx] + 'px';
          _self.heightArr[minIdx] += oLi.offsetHeight + _self.gap;
        }
        oImg.style.opacity = 1;
      });
      _self.oWrap.style.height = Math.max.apply(null, _self.heightArr) + 'px';
    },

    getArrIdx: function(arr) {
      return [].indexOf.call(arr, Math.min.apply(null, arr));
		},
		
		resetWaterfall: function() {
			this.oWrap.innerHTML = '';
			this.heightArr = [];
			this.res = [];
			this.curPage = 0;
			this.getImgDatas(this.curPage);
		}
  };

  return Waterfall;
})(document, window);
