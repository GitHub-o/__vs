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
		});
	}, opt.tpl);

	opt.wrap.innerHTML = list;
}

function regTpl() {
	return new RegExp(/{{(.*?)}}/, 'gim');
}


function trimSpace(str) {
	return str.replace(/\s+/g, '');

}

function pagePos(e) {
	var e = e || window.event,
		cleft = getScrollOffset().x,
		ctop = getScrollOffset().y,
		cx = document.documentElement.clientLeft || 0,
		cy = document.documentElement.clientTop || 0;

	return {
		x: e.clientX + cleft - cx,
		y: e.clientY + ctop - cy
	}
}

function getScrollOffset() {
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

function elemPos(elem) {
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

function getStyle(elem, prop) {
	if (window.getComputedStyle) {
		if (prop) {
			return parseInt(window.getComputedStyle(elem, null)[prop]);
		} else {
			return window.getComputedStyle(elem, null);
		}
	} else {
		if (prop) {
			return parseInt(elem.currentStyle[prop]);
		} else {
			return elem.currentStyle;
		}
	}
}

var pointInTriangle = (function () {
	function vec(a, b) {
		return {
			x: b.x - a.x,
			y: b.y - a.y
		}
	}

	function vecProduct(v1, v2) {
		return v1.x * v2.y - v1.y * v2.x;
	}

	function sameSymbols(a, b) {
		return (a ^ b) >= 0;
	}

	return function (opt) {
		var PA = vec(opt.curPoint, opt.lastPoint),
			PB = vec(opt.curPoint, opt.topRightPoint),
			PC = vec(opt.curPoint, opt.bottomRightPoint),
			R1 = vecProduct(PA, PB),
			R2 = vecProduct(PB, PC),
			R3 = vecProduct(PC, PA);

		return sameSymbols(R1, R2) && sameSymbols(R2, R3);
	}
}());