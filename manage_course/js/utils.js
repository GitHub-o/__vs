HTMLCollection.prototype.jForEach = function (fn) {
    var arr = this,
          len = arr.length,
          arg2 = arguments[1] || window;

    for (var i = 0; i < len; i++) {
          fn.apply(arg2, [arr[i], i, arr]);
    }
}

HTMLCollection.prototype.jFilter = function (fn) {
    var arr = this,
          len = this.length,
          arg2 = arguments[1] || window,
          newArr = [],
          item;

    for (var i = 0; i < len; i++) {
          item = deepClone(arr[i], {});
          fn.apply(arg2, [item, i, arr]) ? newArr.push(item) : '';
    }
    return newArr;
}

Array.prototype.jForEach = function (fn) {
    var arr = this,
          len = arr.length,
          arg2 = arguments[1] || window;

    for (var i = 0; i < len; i++) {
          fn.apply(arg2, [arr[i], i, arr]);
    }
}

Array.prototype.jFilter = function (fn) {
    var arr = this,
          len = this.length,
          arg = arguments[1] || window,
          newArr = [],
          item;

    for (var i = 0; i < len; i++) {
          item = deepClone(arr[i], {});
          fn.apply(arg, [item, i, arr]) ? newArr.push(item) : '';
    }
    return newArr;
}

function debounce(fn, time, triggleNow) {
    var t = null,
          res;

    function debounced() {
          var _self = this,
                args = arguments;

          if (t) {
                clearTimeout(t);
          }
          if (triggleNow) {
                var exec = !t;

                t = setTimeout(function () {
                      t = null;
                }, time);

                if (exec) {
                      res = fn.apply(_self, args);
                }
          } else {
                t = setTimeout(function () {
                      res = fn.apply(_self, args);
                }, time);
          }
          return res;
    }
    debounced.remove = function () {
          clearTimeout(t);
          t = null;
    }
    return debounced;
}


function $get(target, parent) {
    var _f = target.charAt(0),
          rTarget = target.replace(_f, ''),
          args2 = parent || document;

    switch (_f) {
          case '.':
                return args2.getElementsByClassName(rTarget);
                break;
          case '#':
                return args2.getElementById(rTarget);
                break;
          default:
                return args2.getElementsByTagName(target);
                break;
    }
}


function addEvent(elem, type, fn, capture) {
    if (elem.addEventListener) {
          addEvent = function (elem, type, fn, capture) {
                var capture = capture || false;
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

function removeEvent(elem, type, fn, capture) {
    if (elem.addEventListener) {
          removeEvent = function (elem, type, fn, capture) {
                var capture = capture || false;
                elem.removeEventListener(type, fn, capture);
          }
    } else if (elem.attachEvent) {
          removeEvent = function (elem, type, fn) {
                elem.detachEvent('on' + type, function () {
                      fn.call(elem);
                })
          }
    } else {
          removeEvent = function (elem, type, fn) {
                elem['on' + type] = null;
          }
    }

    removeEvent(elem, type, fn, capture);
}

function render(opt, fn) {
    var list = '';

    opt.data.jForEach(function (val, idx, arr) {
          list += this.replace(regTpl(), function (node, key) {
                return fn(val, idx, arr)[key];
          })
    }, opt.tpl);

    opt.wrap.innerHTML = list;
}

function regTpl() {
    return new RegExp(/{{(.*?)}}/, 'gim');
}


function trimIllegal(reg) {
    this.value = this.value.replace(reg, '');
}


function deepClone(origin, target) {
    var target = target || {},
          toStr = Object.prototype.toString,
          arrStr = '[object Array]';

    for (var prop in origin) {
          if (origin.hasOwnProperty(prop)) {
                if ((origin[prop]) !== null && typeof (origin[prop]) == 'object') {
                      target[prop] = toStr.call(origin[prop]) === arrStr ? [] : {};
                      deepClone(origin[prop], target[prop]);
                } else {
                      target[prop] = origin[prop];
                }
          }
    }
    return target;
}


function showStatusAnimation(status, wrap, showAnimation, time) {
    var [t, t1, t2] = [null, null, null];
    time = time || '1s';
    wrap.style.animation = showAnimation + ' ' + time;
    time = parseInt(time) * 1000;

    t = setTimeout(function () {
          if (status == 'none') {
                t2 = setTimeout(function () {
                      wrap.style.display = status;
                      clearTimeout(t2);
                }, .7 * time);
          } else {
                wrap.style.display = status;
          }
          t1 = setTimeout(function () {
                wrap.style.animation = '';
                clearTimeout(t1);
          }, .8 * time);
          clearTimeout(t);
    }, .1 * time);
}

var xhr = (function (doc) {
	function _doAjax(opt) {
		var o = window.XMLHttpRequest ?
			new XMLHttpRequest() :
			new ActiveXObject('Microsoft.XMLHTTP');

		if (!o) {
			throw (new Error('您的浏览器不支持异步发起HTTP请求'));
		}

		var opt = opt || {},
			url = opt.url,
			type = (opt.type || 'GET').toUpperCase(),
			dataType = (opt.dataType || 'JSON').toUpperCase(),
			async = opt.async === false ? false : true,
			jsonp = opt.jsonp || 'cb',
			jsonpCallback = opt.jsonpCallback || 'jQuery' + randomNum(),
			data = opt.data || null,
			timeout = opt.timeout || 30000,
			error = opt.error || function () {},
			success = opt.success || function () {},
			complete = opt.compelet || function () {},

			t = null;

		if (!url) {
			throw (new Error('您没有填写URL'));
		}

		if(dataType === 'JSONP' && type !== 'GET') {
			throw new Error('数据类型为"JSONP"的话，请求方式必须为"GET"或者不设置');
		}

		if(dataType === 'JSONP') {
			var oScript = doc.createElement('script');
			oScript.src = url.indexOf('?') === -1
					    ? url + '?' + jsonp + '=' + jsonpCallback
					    : url + '&' + jsonp + '=' + jsonpCallback;
			doc.body.appendChild(oScript);
			doc.body.removeChild(oScript);
			window[jsonpCallback] = function(data) {
				success(data);
			}
			return;
		}

		o.onreadystatechange = function () {
			if (o.readyState === 4) {
				if ((o.status >= 200 && o.status < 300) || o.status === 304) {
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
		o.send(type === 'GET' ? null : formatDatas(data));

		t = setTimeout(function () {
			complete();
			o.abort();
			clearTimeout(t);
			t = null;
			o = null;
		}, timeout);
	}

	function formatDatas(obj) {
		var str = '';
		for (key in obj) {
			str += key + '=' + obj[key] + '&';
		}
		return str.replace(/&$/, '');
	}

	function randomNum() {
		var res = '';
		for(var i = 0; i < 20; i++) {
			res += Math.floor((Math.random() * 10)); 
		}
		return res + '_' + new Date().getTime();
	}

	return {
		ajax: function (opt) {
			_doAjax(opt);
		},

		post: function (url, data, successCB) {
			_doAjax({
				url: url,
				type: 'POST',
				data: data,
				success: successCB
			})
		},

		get: function (url, successCB) {
			_doAjax({
				url: url,
				type: 'GET',
				success: successCB
			})
		}
	}
}(document))

function trimSpace(str) {
	return str.replace(/\s+/g, '');

}


function throttle(fn, delay) {
	var t = null,
		firstTime = new Date().getTime();

	return function () {
		var _self = this,
			args = arguments,
			curTime = new Date().getTime();

		clearTimeout(t);

		if (curTime - firstTime >= delay) {
			fn.apply(_self, args);
			firstTime = curTime;
		} else {
			t = setTimeout(function () {
				fn.apply(_self, args);
			}, delay);
		}
	}
}

function stopBubble(e) {
	if (e.stopPropagation) {
		e.stopPropagation();
	} else {
		e.cancelBubble = true;
	}
}