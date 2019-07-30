;(function(win, doc) {
  var Linkage = function(elem, opt = {}) {
    this.elem = typeof elem === 'string' && doc.querySelector(elem);
    this.res = {};
    this.callback = opt.callback || function() {};
    this.selectWidth = opt.selectWidth || '100px';
    this.selectHeight = opt.selectHeight || '30px';
    this.selectMargin = opt.selectMargin || '0 3px';
  }

  Linkage.prototype = {
    init: function() {
      this.getData();
      this._initLinkage();
      this.getElement();
      this._initDropdown(this.data, 'province');
      this.bindEvent();
    },

    bindEvent: function() {
      addEvent(this.oSelectWrap, 'click', this.selectClick.bind(this));
      addEvent(doc, 'click', this.hideDropdown.bind(this), true);
    },

    getData: function() {
      var _self = this;
      $$.ajax({
        url: './data/data.json',
        async: false,
        success (data) {
          _self.data = data;
        }
      });
    },

    _initLinkage: function() {
      this.province_tpl = '<li class="dd-item" data-option="{{name}}" data-code="{{code}}"><a href="javascript:;" style="display: block; height: 28px; line-height: 28px; color: #424242; text-decoration: none; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;" data-field="province_lk" class="lk">{{name}}</a></li>';
      this.city_tpl = '<li class="dd-item" data-option="{{name}}" data-code="{{code}}"><a href="javascript:;" style="display: block; height: 28px; line-height: 28px; color: #424242; text-decoration: none; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;" data-field="city_lk" class="lk">{{name}}</a></li>';
      this.area_tpl = '<li class="dd-item" data-option="{{name}}" data-code="{{code}}"><a href="javascript:;" style="display: block; height: 28px; line-height: 28px; color: #424242; text-decoration: none; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;" data-field="area_lk" class="lk">{{name}}</a></li>';
      var str = '<div class="J_select-wrap" style="font-size: 16px; color: #424242">\
                      <div class="J_select" style="float: left; position: relative; border: 1px solid #ddd; border-radius: 6px; text-align:center;\
                                                                width: ' + this.selectWidth + '; height: ' + this.selectHeight + '; margin: ' + this.selectMargin + '">\
                        <a href="javascript:;" data-field="province" style="display: block; height: 100%; line-height: 30px; color: #424242; text-decoration: none; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;" class="lk">选择省</a>\
                        <ul class="J_dropdown J_dd_province" style="display: none; position: absolute; top: 35px; left: 0; width: 100%; max-height: 300px; margin: 0; padding: 0; list-style: none; background-color: #fff; border: 1px solid #ddd; box-sizing: border-box; border-radius: 6px; overflow: auto"></ul>\
                      </div>\
                      <div class="J_select" style="float: left; position: relative; border: 1px solid #ddd; border-radius: 6px; text-align:center;\
                                                      width: ' + this.selectWidth + '; height: ' + this.selectHeight + '; margin: ' + this.selectMargin + '">\
                        <a href="javascript:;" data-field="city" style="display: block;  height: 100%; line-height: 30px; color: #424242; text-decoration: none; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;" class="lk">选择市</a>\
                        <ul class="J_dropdown J_dd_city" style="display: none; position: absolute; top: 35px; left: 0; width: 100%; max-height: 300px; margin: 0; padding: 0; list-style: none; background-color: #fff; border: 1px solid #ddd; box-sizing: border-box; border-radius: 6px; overflow: auto"></ul>\
                      </div>\
                      <div class="J_select" style="float: left; position: relative; border: 1px solid #ddd; border-radius: 6px; text-align:center;\
                                                      width: ' + this.selectWidth + '; height: ' + this.selectHeight + '; margin: ' + this.selectMargin + '">\
                        <a href="javascript:;" data-field="area" style="display: block; height: 100%; line-height: 30px; color: #424242; text-decoration: none; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;" class="lk">选择区/县</a>\
                        <ul class="J_dropdown J_dd_area" style="display: none; position: absolute; top: 35px; left: 0; width: 100%; max-height: 300px; margin: 0; padding: 0; list-style: none; background-color: #fff; border: 1px solid #ddd; box-sizing: border-box; border-radius: 6px; overflow: auto"></ul>\
                      </div>\
                      <p style="clear: both"></p>\
                    </div>';
      
      this.elem.innerHTML = str;
    },

    getElement: function() {
      this.oSelectWrap = this.elem.querySelector('.J_select-wrap');
      this.oSelect = this.elem.getElementsByClassName('J_select');
      this.oProvince = this.oSelect[0].getElementsByClassName('lk')[0];
      this.oCity = this.oSelect[1].getElementsByClassName('lk')[0];
      this.oArea = this.oSelect[2].getElementsByClassName('lk')[0];
      this.oDropdown = this.elem.getElementsByClassName('J_dropdown');
      this.oDdProvince = this.elem.getElementsByClassName('J_dd_province')[0];
      this.oDdCity = this.elem.getElementsByClassName('J_dd_city')[0];
      this.oDdArea = this.elem.getElementsByClassName('J_dd_area')[0];
      this.oDdProvinceLks = this.oDdProvince.getElementsByClassName('lk');
      this.province_idx = -1;
      this.city_idx = -1;
      this.area_idx = -1;
    },

    selectClick: function(e) {
      var e = e || window.event,
          tar = e.target || e.srcElement,
          className = tar.className;

      if (className === 'lk') {
        var field = tar.getAttribute('data-field');
        switch (field) {
          case 'province':
            this.oDdProvince.style.display = 'block';
            break;
          case 'city':
            if (this.res.province) {
              this.oDdCity.style.display = 'block';
              this.oDdCityLks = this.oDdCity.getElementsByClassName('lk');
            }
            break;
          case 'area':
            if (this.res.city) {
              this.oDdArea.style.display = 'block';
              this.oDdAreaLks = this.oDdArea.getElementsByClassName('lk');
            }
            break;
          case 'province_lk':
            if (this.res.province && this.res.province !== tar.innerText) {
              this.res.province = this.res.city = '';
              this.oCity.innerText = '选择市';
              this.oArea.innerText = '选择区/县';
            }

            if (this.province_idx > -1) {
              var style = this.oDdProvinceLks[this.province_idx].style;
              style.color = '#424242';
              style.backgroundColor = '';
              style.fontWeight = '';
            }
            style = tar.style;
            this.province_idx = [].indexOf.call(this.oDdProvinceLks, tar);
            style.color = '#eee';
            style.backgroundColor = '#32C9FF';
            style.fontWeight = 'bold';
            
            this.oProvince.innerText = tar.innerText;
            this.res.province = tar.innerText;
            this._initDropdown(this.data, 'city');
            break;
          case 'city_lk':
            if (this.res.area && this.res.area !== tar.innerText) {
              this.res.area = '';
              this.oArea.innerText = '选择区/县';
            }

            if (this.city_idx > -1) {
              var style = this.oDdCityLks[this.city_idx].style;
              style.color = '#424242';
              style.backgroundColor = '';
              style.fontWeight = '';
            }

            this.city_idx = [].indexOf.call(this.oDdCityLks, tar);
            style = tar.style;
            style.color = '#eee';
            style.backgroundColor = '#32C9FF';
            style.fontWeight = 'bold';
            this.oCity.innerText = tar.innerText;
            this.res.city = tar.innerText;
            this._initDropdown(this.data, 'area');
            break;
          case 'area_lk':
            if (this.area_idx > -1) {
              var style = this.oDdAreaLks[this.area_idx].style;
              style.color = '#424242';
              style.backgroundColor = '';
              style.fontWeight = '';
            }
            this.area_idx = [].indexOf.call(this.oDdAreaLks, tar);
            style = tar.style;
            style.color = '#eee';
            style.backgroundColor = '#32C9FF';
            style.fontWeight = 'bold';
            this.oArea.innerText = tar.innerText;
            this.res.area = tar.innerText;
            this.callback(this.res);
            break;
          default:
            break;
        }
      }

    },

    _initDropdown: function(data, field) {
      var wrap,
          tpl,
          city,
          area
          _self = this;
      switch (field) {
        case 'province':
          wrap = this.oDdProvince;
          tpl = this.province_tpl;
          break;
        case 'city':
          wrap = this.oDdCity;
          tpl = this.city_tpl;

          data.forEach(function(val) {
            if (val.name == _self.res.province) {
              city = val.city;
            }
          });
          data = city;
          break;
        case 'area':
          wrap = this.oDdArea;
          tpl = this.area_tpl;
          data.forEach(function(val) {
            if (val.name === _self.res.province) {
              val.city.forEach(function(elem) {
                if (elem.name === _self.res.city) {
                  area = elem.area;
                }
              })
            }
          })
          data = area;
          break;
        default:
          return;
      }
      render({
        wrap: wrap,
        tpl: tpl,
        data: data,
        value: this.replaceName
      })
    },

    replaceName: function(value) {
      return {
        name: value.name,
        code: value.code
      }
    },

    hideDropdown: function() {
      this.oDropdown.jForEach(function(val) {
        val.style.display = 'none';
      })
    }
  }

  win.Linkage = Linkage;

})(window, document);