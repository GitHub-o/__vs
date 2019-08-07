HTMLCollection.prototype.jForEach = function (fn) {
	var arr = this,
			len = arr.length,
			arg2 = arguments[1] || window;

	for (var i = 0; i < len; i++) {
		fn.apply(arg2, [arr[i], i, arr]);
	}
}

Array.prototype.jForEach = function (fn) {
	var arr = this,
			len = arr.length,
			arg2 = arguments[1] || window;

	for (var i = 0; i < len; i++) {
		fn.apply(arg2, [arr[i], i, arr]);
	}
}

function debounce (fn, time, triggleNow) {
	var t = null,
			res;

	function debounced () {
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

function $get (target, parent) {
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

function addEvent (elem, type, fn, capture) {
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

function removeEvent (elem, type, fn, capture) {
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

var renderPageList = (function () {
	var list = '';

	function pageBtnTpl (type, num, cur, pages) {
		switch (type) {
			case 'btn':
				return num === cur ?
					'<span class="cur-page">' + num + '</span>' :
					'<a class="page-btn" data-page=' + num + '>' + num + '</a>';
				break;
			case 'points':
				return '<span class="points">…</span>';
			case 'backward':
				return cur === 1 ?
					'<span class="disabled-btn">&lt;</span>' :
					'<a class="backward-btn">&lt;</a>';
			case 'forward':
				return cur === pages ?
					'<span class="disabled-btn">&gt;</span>' :
					'<a class="forward-btn">&gt;</a>';
				break;
			default:
				break;
		}
	}

	function renderPageList (curPage, pages) {
		if (pages <= 1) {
			return '';
		}
		var btnGroup = pageBtnTpl('backward', '', curPage);
		if (pages > 8) {
			if (curPage < 3) {
				btnGroup += makeBtns(1, 3, curPage) +
					pageBtnTpl('points') +
					makeBtns(pages - 1, pages, curPage);
			} else if (curPage >= 3 && curPage < 5) {
				btnGroup += makeBtns(1, curPage + 1, curPage) +
					pageBtnTpl('points') +
					makeBtns(pages - 1, pages, curPage);
			} else if (curPage == 5) {
				btnGroup += makeBtns(1, 2, curPage) +
					pageBtnTpl('points') +
					makeBtns(curPage - 1, curPage + 1, curPage) +
					pageBtnTpl('points') +
					makeBtns(pages - 1, pages, curPage);
			} else if (curPage >= 6 && curPage < pages - 4) {
				btnGroup += makeBtns(1, 2, curPage) +
					pageBtnTpl('points') +
					makeBtns(curPage - 2, curPage + 2, curPage) +
					pageBtnTpl('points') +
					makeBtns(pages - 1, pages, curPage);
			} else if (curPage == pages - 4) {
				btnGroup += makeBtns(1, 2, curPage) +
					pageBtnTpl('points') +
					makeBtns(curPage - 1, curPage + 1, curPage) +
					pageBtnTpl('points') +
					makeBtns(pages - 1, pages, curPage);
			} else if (curPage >= pages - 3 && curPage <= pages - 2) {
				btnGroup += makeBtns(1, 2, curPage) +
					pageBtnTpl('points') +
					makeBtns(curPage - 1, pages, curPage);
			} else if (curPage > pages - 2 && curPage <= pages) {
				btnGroup += makeBtns(1, 2, curPage) +
					pageBtnTpl('points') +
					makeBtns(pages - 2, pages, curPage);
			}
		} else {
			btnGroup += makeBtns(1, pages, curPage);
		}
		return btnGroup += pageBtnTpl('forward', '', curPage, pages);
	}

	function makeBtns (start, end, curPage) {
		list = '';
		for (var i = start; i <= end; i++) {
			list += pageBtnTpl('btn', i, curPage);
		}
		return list;
	}

	return renderPageList;
}())

var xhr = (function (doc) {
	function _doAjax (opt) {
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
			error = opt.error || function () { },
			success = opt.success || function () { },
			complete = opt.compelet || function () { },

			t = null;

		if (!url) {
			throw (new Error('您没有填写URL'));
		}

		if (dataType === 'JSONP' && type !== 'GET') {
			throw new Error('数据类型为"JSONP"的话，请求方式必须为"GET"或者不设置');
		}

		if (dataType === 'JSONP') {
			var oScript = doc.createElement('script');
			oScript.src = url.indexOf('?') === -1
				? url + '?' + jsonp + '=' + jsonpCallback
				: url + '&' + jsonp + '=' + jsonpCallback;
			doc.body.appendChild(oScript);
			doc.body.removeChild(oScript);
			window[jsonpCallback] = function (data) {
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

	function formatDatas (obj) {
		var str = '';
		for (key in obj) {
			str += key + '=' + obj[key] + '&';
		}
		return str.replace(/&$/, '');
	}

	function randomNum () {
		var res = '';
		for (var i = 0; i < 20; i++) {
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

function trimSpace (str) {
	return str.replace(/\s+/g, '');

}

function throttle (fn, delay) {
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

function stopBubble (e) {
	if (e.stopPropagation) {
		e.stopPropagation();
	} else {
		e.cancelBubble = true;
	}
}

function imgLazyLoad (images) {
	var imageItem,
			n;

	return function () {
		var cHeight = document.documentElement.clientHeight,
			sTop = document.body.scrollTop || document.documentElement.scrollTop,
			imagesLen = images.length,
			imageTop,
			src;

		n = 0;
		for (var i = n; i < imagesLen; i++) {
			imageItem = images[i];
			imageTop = elemPos(imageItem).top;
			if (imageTop < cHeight + sTop) {
				src = imageItem.getAttribute('data-src');
				if (src) {
					imageItem.src = src;
					imageItem.removeAttribute('data-src');
					n++;
				}
			}
		}
	}
}

function elemPos (elem) {
	var elemParent = elem.offsetParent,
			elemLeft = elem.offsetLeft,
			elemTop = elem.offsetTop;

	while (elemParent) {
		elemLeft += elemParent.offsetLeft;
		elemTop += elemParent.offsetTop;
		elemParent = elemParent.offsetParent;
	}

	return {
		top: elemTop,
		left: elemLeft
	}
}

function getScrollOffset () {
	if (window.pageXOffset) {
		return {
			x: window.pageXOffset,
			y: window.pageYOffset
		}
	} else {
		return {
			x: document.body.scrollLeft + document.documentElement.scrollLeft,
			y: document.body.scrollTop + document.documentElement.scrollTop
		}
	}
}

function getViewPort () {
	if (window.innerWidth) {
		return {
			w: window.innerWidth,
			h: window.innerHeight
		}
	} else {
		if (document.compatMode == "BackCompat") {
			return {
				w: document.body.clientWidth,
				h: document.body.clientHeight
			}
		} else {
			return {
				w: document.documentElement.clientWidth,
				h: document.documentElement.clientHeight
			}
		}
	}
}

function getScrollSize () {
	if (document.body.scrollHeight) {
		return {
			w: document.body.scrollWidth,
			h: document.body.scrollHeight
		}
	} else {
		return {
			w: document.documentElement.scrollWidth,
			h: document.documentElement.scrollHeight
		}
	}
}

var mCookie = (function () {
	return {
		set: function (key, value, time) {
			var args;
			args = arguments[3] ? 'max-age' :
				'expires';
			document.cookie = key + '=' + value + '; ' + args + '=' + time;
			return this;
		},

		delete: function (key) {
			this.set(key, '', -1);
		},

		get: function (key, cb) {
			var cookieStr = document.cookie;

			if (cookieStr) {
				var cookieArr = cookieStr.split('; '),
					item,
					tempArr;
				for (var prop in cookieArr) {
					item = cookieArr[prop];
					if (typeof (item) === 'string') {
						tempArr = item.split('=');
						if (tempArr[0] == key) {
							cb(tempArr[1]);
							return this;
						}
					}
				}
			}
			cb(undefined);
			return this;
		}
	}
}());


function phoneNumberCheck (str) {
	return (/^(\(\+86\))?(13[0-9]|14[57]|15[012356789]|17[03678]|18[0-9])\d{8}$/).test(str);
}

function digitCheck (str) {
	return (/\d{6}/).test(str);
}

function alphabetCheck (num) {
	return (/[A-z]{4}/).test(num);
}