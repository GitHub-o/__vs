Array.prototype.jForEach = function (fn) {
	var arr = this,
		len = arr.length,
		arg = arguments[1] || window,
		item;

	for (var i = 0; i < len; i++) {
		item = arr[i];
		fn.apply(arg, [item, i, arr]);
	}
}

HTMLCollection.prototype.jForEach = function (fn) {
	var arr = this,
		len = arr.length,
		arg2 = arguments[1] || window;

	for (var i = 0; i < len; i++) {
		fn.apply(arg2, [arr[i], i, arr]);
	}
}

function addEvent (elem, type, fn, capture = false) {
	if (elem.addEventListener) {
		addEvent = function (elem, type, fn, capture) {
			elem.addEventListener(type, fn, capture);
		}
	} else if (elem.attachEvent) {
		addEvent = function (elem, type, fn) {
			elem.attachEvent('on' + type, function () {
				fn.call(elem);
			});
		}
	} else {
		addEvent = function (elem, type, fn) {
			elem['on' + type] = fn;
		}
	}

	addEvent(elem, type, fn, capture);
}

var $$ = (function (win, doc) {
  function _doAjax (opt = {}) {
    var o = win.XMLHttpRequest
      ? new XMLHttpRequest
      : new ActiveXObject('Microsoft.XMLHTTP');

    if (!o) {
      throw new Error('您的浏览器不支持发起HTTP请求！~解决办法升级该浏览器~');
    }

    var url = opt.url;

    if (!url) {
      throw new Error('您没有填写URL');
    }

    var type = (opt.type || 'GET').toUpperCase(),
      data = opt.data || null,
      dataType = (opt.dataType || 'JSON').toUpperCase(),
      jsonp = opt.jsonp || 'callback',
      jsonpCB = opt.jsonpCB || 'jQuery' + random() + '_' + new Date(),
      async = opt.async === false ? false : true,
      timeout = opt.timeout || 10000,
      success = opt.success || function () { },
      error = opt.error || function () { },
      complete = opt.complete || function () { },

      t = null;

    if (dataType === 'JSONP' && type !== 'GET') {
      throw new Error('dataType等于JSONP的话，type必须为GET');
    }

    if (dataType === 'JSONP') {
      var oS = doc.createElement('script');
      oS.src = url.indexOf('?') === -1
                ? url + '?' + jsonp + '=' + jsonpCB
                : url + '&' + jsonp + '=' + jsonpCB;
      doc.body.appendChild(oS);
      doc.body.removeChild(oS);
      win[jsonpCB] = function(data) {
        success(data);
      }
      return;
    }

    o.onreadystatechange = function () {
      if (o.readyState === 4) {
        if (o.status >= 200 && o.status < 300 || o.status === 304) {
          switch (dataType) {
            case 'JSON':
              success(JSON.parse(o.responseText));
              break;
            case 'TEXT':
              success(o.responseText);
              break;
            case 'XML':
              success(o.responseXML);
              break;
            default:
              success(JSON.parse(o.responseText));
              break;
          }
        } else {
          error();
        }
        complete();
        clearTimeout(t);
        t = null;
        o = null;
      }
    }

    o.open(type, url, async);
    type === 'POST' && o.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    o.send(type === 'GET' ? null : formatData(data));

    t = setTimeout(function() {
      o.abort();
      complete();
      clearTimeout(t);
      t = null;
      o = null;
    }, timeout);
  }

  function formatData(obj) {
    var str = '';
    for (var prop in obj) {
      str += prop + '=' + obj[prop] + '&';
    }
    return str.replace(/&$/, '');
  }

  function random() {
    var str = '';
    for (var i = 0; i < 20; i++) {
      str += Math.floor(Math.random() * 10);
    }
    return str;
  }

  return {
    ajax (opt) {
      _doAjax(opt);
    },
    post (url, data, success, error) {
      _doAjax({
        url: url,
        type: 'POST',
        data: data,
        success: success,
        error: error
      });
    },
    get (url, success, error) {
      _doAjax({
        url: url,
        type: 'GET',
        success: success,
        error: error
      })
    }
  }
})(window, document);

function render (opt) {
	var list = '';
	opt.data.jForEach(function (val, idx, arr) {
		list += this.replace(/{{(.*?)}}/g, function (node, key) {
			return opt.value(val, idx, arr)[key];
		})
	}, opt.tpl);

	return opt.wrap ? opt.wrap.innerHTML = list : list;
}