/*
 * error.name 的6种错误信息:
 *  1. EvalError: eval() 的使用与定义不一致
 *  2. RangeError: 数值越界
 *  3. ReferenceError: 非法或不能识别的引用数值 *
 *  4. SyntaxError: 发生语法解析错误 *
 *  5. TypeError: 操作数类型错误
 *  6. URIError: URI处理函数使用不当(地址发生错误)
 */






//-------------------------HTMLCollection----------------------------------------------------------->>



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


HTMLCollection.prototype.jMap = function (fn) {
	var arr = this,
		len = arr.length,
		arg2 = arguments[1] || window,
		newArr = [],
		item;

	for (var i = 0; i < len; i++) {
		item = deepClone(arr[i], {});
		newArr.push(fn.apply(arg2, [item, i, arr]));
	}
	return newArr;
}


HTMLCollection.prototype.jEvery = function (fn) {
	var arr = this,
		len = arr.length,
		arg2 = arguments[1] || window,
		res = true,
		item;
	for (var i = 0; i < len; i++) {
		item = arr[i];
		if (!fn.apply(arg2, [item, i, arr])) {
			return res = false;
		};
	}
	return res;
}


HTMLCollection.prototype.jSome = function (fn) {
	var arr = this,
		len = arr.length,
		arg2 = arguments[1] || window,
		res = false,
		item;
	for (var i = 0; i < len; i++) {
		item = arr[i];
		if (fn.apply(arg2, [item, i, arr])) {
			return res = true;
		}
	}
	return res;
}


HTMLCollection.prototype.jReduce = function (fn, initialValue) {
	var arr = this,
		len = arr.length,
		arg3 = args3 || window,
		item;
	for (var i = 0; i < len; i++) {
		item = deepClone(arr[i]);
		initialValue = fn.apply(arg3, [initialValue, item, i, arr]);
	}
	return initialValue;
}


HTMLCollection.prototype.jReduceRight = function (fn, initialValue) {
	var arr = this,
		len = arr.length,
		arg3 = arguments[2] || window,
		item;
	for (var i = len - 1; i > 0; i--) {
		item = deepClone(arr[i]);
		initialValue = fn.apply(arg3, [initialValue, item, i, arr]);
	}
	return initialValue;
}









//-------------------------Array-------------------------------------------------------------------->>



// 封装 数组去重
Array.prototype.unique = function () {
	var arr = [],
		temp = {},
		len = this.length;

	for (var i = 0; i < len; i++) {
		if (!temp.hasOwnProperty(this[i])) {
			temp[this[i]] = this[i];
			arr.push(this[i]);
		}
	}
	return arr;
}

// 查询出现的次数
Array.prototype.jq = function() {
      var len = this.length,
            temp = {};
      for(var i = 0; i < len; i++) {
            if(!temp.hasOwnProperty(this[i])) {
                  temp[this[i]] = 1;
            }else {
                  temp[this[i]]++;
            }
      }
      return temp;
}


// 封装 forEach
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


// 封装 filter (筛选/过滤函数)
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


// 封装 map
Array.prototype.jMap = function (fn) {
	var arr = this,
		len = arr.length,
		arg = arguments[1] || window,
		newArr = [],
		item;

	for (var i = 0; i < len; i++) {
		item = deepClone(arr[i], {});
		newArr.push(fn.apply(arg, [item, i, arr]));
	}
	return newArr;
}


// 封装 every
Array.prototype.jEvery = function (fn) {
	var arr = this,
		len = arr.length,
		arg2 = arguments[1] || window,
		res = true,
		item;
	for (var i = 0; i < len; i++) {
		item = deepClone(arr[i]);
		if (!fn.apply(arg2, [item, i, arr])) {
			return res = false;
		};
	}
	return res;
}


// 封装 some
Array.prototype.jSome = function (fn) {
	var arr = this,
		len = arr.length,
		arg2 = arguments[1] || window,
		res = false,
		item;
	for (var i = 0; i < len; i++) {
		item = deepClone(arr[i]);
		if (fn.apply(arg2, [item, i, arr])) {
			return res = true;
		}
	}
	return res;
}


// 封装 reduce (归纳函数)
Array.prototype.jReduce = function (fn, initialValue) {
	var arr = this,
		len = arr.length,
		arg3 = arguments[2] || window,
		item;
	for (var i = 0; i < len; i++) {
		item = deepClone(arr[i]);
		initialValue = fn.apply(arg3, [initialValue, item, i, arr]);
	}
	return initialValue;
}


// 封装 reduceRight (归纳函数)
Array.prototype.jReduceRight = function (fn, initialValue) {
	var arr = this,
		len = arr.length,
		arg3 = arguments[2] || window,
		item;
	for (var i = len - 1; i > 0; i--) {
		item = deepClone(arr[i]);
		initialValue = fn.apply(arg3, [initialValue, item, i, arr]);
	}
	return initialValue;
}


// 扁平化数组
Array.prototype.flatten = function () {
	var _self = this,
		toStr = {}.toString;

	return _self.reduce(function (prev, cur) {
		return prev.concat(
			toStr.call(cur) === '[object Array]' ?
			cur.flatten() :
			cur
		);
	}, []);
}




//-----------------------String--------------------------------------------------------------------->>




// 字符串去重
String.prototype.unique = function () {
	var str = '',
		temp = {},
		len = this.length;

	for (var i = 0; i < len; i++) {
		if (!temp.hasOwnProperty(this[i])) {
			temp[this[i]] = this[i];
			str += this[i];
		}
	}
	return str;
}

//查询出现字符 
String.prototype.jq = function () {
	var temp = {},
		str = this,
		len = str.length;

	for (var i = 0; i < len; i++) {
		if (!temp.hasOwnProperty(str[i])) {
			temp[str[i]] = 1;
		} else {
			temp[str[i]]++;
		}
	}
	return temp;
}

//---------------------Element---------------------------------------------------------------------->>


// 封装 hasChildren
Element.prototype.hasChildren = function () {
	var child = this.childNodes,
		len = child.length,
		childItem;

	for (var i = 0; i < len; i++) {
		childItem = child[i];
		if (childItem.nodeType == 1) {
			return true;
		}
	}
	return false;
}


// 封装 Children
Element.prototype.jChildren = function (idx) {
	var child = this.childNodes,
		len = child.length,
		nodeLen = 0,
		childItem,
		temp = [];

	for (var i = 0; i < len; i++) {
		childItem = child[i];
		if (childItem.nodeType == 1) {
			nodeLen++;
			temp.push(childItem);
		}
	}

	if (Math.abs(idx) > Math.abs(nodeLen)) {
		return undefined;
	} else if (idx < 0) {
		idx += nodeLen;
	}
	return idx >= 0 ? temp[idx] : temp;
}


// 封装 insertAfter
Element.prototype.insertAfter = function (node, beforeNode) {
	var AfterNode = beforeNode.nextElementSibling;

	if (AfterNode) {
		this.insertBefore(node, AfterNode);
	} else {
		this.appendChild(node);
	}
}


// 逆序元素节点
Element.prototype.reverseChildren = function () {
	var child = this.childNodes,
		len = child.length;

	while (len--) {
		this.appendChild(child[len]);
	}
}

// 封装getElementsByClassName
Document.prototype.getClassName =
	Element.prototype.getClassName =
	function (className) {
		var allDoms = document.getElementsByTagName('*'),
			allDomsLen = allDoms.length,
			allDomItem,
			finalArr = [];

		for (var i = 0; i < allDomsLen; i++) {
			allDomItem = allDoms[i];
			var temp = trimSpace(allDomItem.className).trim().split(' '),
				tempLen = temp.length,
				tempItem;

			for (var j = 0; j < tempLen; j++) {
				tempItem = temp[j];
				if (tempItem === className) {
					finalArr.push(allDomItem);
					break;
				}
			}
		}
		return finalArr;

		function trimSpace(tar) {
			return tar.replace(/\s+/g, ' ');
		}
	}



//--------------------Advanced Function------------------------------------------------------------>>


/**
 * 组合函数  --> 组合多个功能函数
 */
function compose() {
	var args = [].slice.call(arguments);

	return function (initialVal) {
		return args.reduceRight(function (res, cb) {
			return cb(res);
		}, initialVal);
	}
}


/**
 * 柯里化函数  --> 将一个多参数函数转成多个单参数的函数（单个多元函数 --> 多个单元函数）
 * @param {分步所执行的函数} fn 
 * @param {函数的形参个数} len 
 */
function curry(fn, len) {
	var len = len || fn.length;

	var func = function (fn) {
		var args = [].slice.call(arguments, 1);

		return function () {
			var newArgs = args.concat([].slice.call(arguments));
			return fn.apply(this, newArgs);
		}
	}

	return function () {
		var arrLen = arguments.length;

		if (arrLen < len) {
			var formatedArr = [fn].concat([].slice.call(arguments));
			return curry(func.apply(this, formatedArr), len - arrLen);
		} else {
			return fn.apply(this, arguments);
		}
	}
}



/**
 * 惰性函数  --> 函数内部改写自身
 */



/**
 * 记忆/缓存函数  --> 具有缓存池的函数
 * @param {具有记忆的函数} fn 
 */
function memorize(fn) {
	var cache = {};

	return function () {
		var key = [].join.call(arguments, ',');

		return cache[key] = cache[key] || fn.apply(this, arguments);
	}
}



/**
 * 防抖函数  --> n秒内只要触发事件就会重新计时，事件处理函数永远不能被执行
 * @param {具有防抖的函数} fn 
 * @param {time秒内频繁触发不执行} time 
 * @param {首次是否延迟执行} triggleNow 
 */
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



/**
 * 节流函数  --> 事件被触发n秒内只执行一次
 * @param {具有节流的函数} fn 
 * @param {delay秒内只执行一次} delay 
 */
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



//-----------------------Function------------------------------------------------------------------->>




/**     
 * 偏函数   --> 固定一个函数的一个或多个参数（n元函数 --> n - x 元函数）
 */
Function.prototype.partial = function () {
	var args = [].slice.call(arguments, 1),
		_self = this;

	return function () {
		var newArgs = args.concat([].slice.call(arguments));

		return _self.apply(this, newArgs);
	}
}




//----------------------Fn-------------------------------------------------------------------------->>


/**
 * 封装 $ 获取元素
 * @param {目标元素} target 
 * @param {父级元素} parent
 */
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


/**
 * 数据分类函数
 * @param {以何分类} fields 
 * @param {要分类数据} datas 
 */
function sortDatas(fields, datas) {
	var cache = {};

	/**
	 * @param {映射的字段} mapping_field
	 * @param {以seperator为分隔符的复合分类} seperator
	 */
	return function (mapping_field, seperator) {
		fields.jForEach(function (field) {
			var _key = field.id;

			cache[_key] = [];
			datas.jForEach(function (elem) {
				var mapping_val = elem[mapping_field];
				if (!seperator) {
					if (_key == mapping_val) {
						cache[_key].push(elem);
					}
				} else {
					var _arr = mapping_val.split(seperator);
					_arr.jForEach(function (val) {
						if (val == _key) {
							cache[_key].push(elem);
						}
					});
				}
			});
		});
		return cache;
	}
}



/**
 * 封装AJAX
 */
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



/**
 * 跨域domain
 */
var ajaxDomain = (function (doc) {
	function createIframe(frameId, frameUrl) {
		var frame = doc.createElement('iframe');
		frame.src = frameUrl;
		frame.id = frameId;
		frame.style.display = 'none';

		return frame;
	}

	return function (opt) {
		doc.domain = opt.basicDomain;
		var frame = createIframe(opt.frameId, opt.frameUrl);

		frame.onload = function () {
			var $$ = doc.getElementById(opt.frameId).contentWindow.xhr;
			$$.ajax({
				url: opt.url,
				type: opt.type,
				dataType: opt.dataType,
				data: opt.data,
				success: opt.success,
				error: opt.error
			})
		}
		doc.body.appendChild(frame);
	}
})(document);



/**
 * 拖拽函数
 * @param {点击可拖拽的元素} elem 
 * @param {外层的父级元素} elemWrap
 * @param {双击elem所显示的元素} dbClickWrap
 * @param {右键菜单所显示的元素} menuClickWrap
 * @param {双击elem元素所显示元素展示的动画} showAnimation
 */
function drag(elem, elemWrap, dbClickWrap, menuClickWrap, showAnimation) {
	var args = arguments[1] || arguments[0],
		args1 = arguments[0],
		args3 = arguments[2],
		args4 = arguments[3],
		args5 = arguments[4],
		disX,
		disY,
		[cbTime, ceTime, counter, t] = [null, null, 0, null];

	if (args4) {
		var mWidth = getStyle(args4, 'width'),
			mHeight = getStyle(args4, 'height'),
			wWidth = getViewPortOffset().w,
			wHeight = getViewPortOffset().h,
			maxW = wWidth - mWidth,
			maxH = wHeight - mHeight;
	}
	addEvent(args1, 'mousedown', mouseDown);

	function mouseDown(e) {
		var e = e || window.event,
			btnCode = e.button,
			x = pagePos(e).x,
			y = pagePos(e).y,
			mLeft,
			mTop;

		if (btnCode === 0) {
			disX = x - getStyle(args, 'left');
			disY = y - getStyle(args, 'top');

			addEvent(document, 'mousemove', mouseMove);
			addEvent(document, 'mouseup', mouseUp);
		} else if (btnCode === 2) {
			if (args4) {
				if (x >= maxW) {
					mLeft = x - mWidth;
				} else {
					mLeft = x;
				}
				if (y >= maxH) {
					mTop = y - mHeight;
				} else {
					mTop = y;
				}
				args4.style.left = mLeft + 'px';
				args4.style.top = mTop + 'px';
				args4.style.display = 'block';
			}
		}
		stopBubble(e);
		stopHandler(e);

	}

	function mouseMove(e) {
		var e = e || window.event,
			x = pagePos(e).x - disX,
			y = pagePos(e).y - disY,
			maxX = getViewPortOffset().w - getStyle(args, 'width'),
			maxY = getViewPortOffset().h - getStyle(args, 'height');
		args4 ? args4.style.display = 'none' : '';
		if (x < 0) {
			x = 0;
		} else if (x >= maxX) {
			x = maxX - 1;
		}

		if (y < 0) {
			y = 0;
		} else if (y >= maxY) {
			y = maxY - 1;
		}

		args.style.left = x + 'px';
		args.style.top = y + 'px';
	}

	function mouseUp() {
		if (args3) {
			var res;
			counter++;
			if (counter == 1) {
				cbTime = new Date().getTime();
			}
			if (counter == 2) {
				ceTime = new Date().getTime();
			}
			res = ceTime - cbTime;
			if (cbTime && ceTime && res < 300) {
				args5 ? showStatusAnimation('block', args3, args5) : args3.style.display = 'block';
			}
			t = setTimeout(function () {
				cbTime = ceTime = counter = 0;
				clearTimeout(t);
			}, 500);
		}
		removeEvent(document, 'mousemove', mouseMove);
		removeEvent(document, 'mouseup', mouseUp);
	}
}


/**
 * 元素显示/隐藏的动画
 * @param {元素显示的状态} status 
 * @param {元素} wrap 
 * @param {元素显示时的动画} showAnimation 
 * @param {动画时间} time
 */
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
	}, .4 * time);
}


//up\right\down\left 元素移动
function move(elem, speed) {
	speed = speed || 15;
	addEvent(document, 'keydown', function () {
		var e = e || window.event,
			code = e.keyCode,
			Left = getStyle(elem, 'left'),
			Top = getStyle(elem, 'top');

		switch (code) {
			case 37:
				elem.style.left = Left - speed + 'px';
				break;
			case 39:
				elem.style.left = Left + speed + 'px';
				break;
			case 38:
				elem.style.top = Top - speed + 'px';
				break;
			case 40:
				elem.style.top = Top + speed + 'px';
				break;
			default:
				break;
		}
	})
}


/**
 * 封装事件绑定
 * @param {元素} elem 
 * @param {事件类型} type 
 * @param {执行函数} fn 
 * @param {是否捕获} capture 
 */
// function addEvent(elem, type, fn, capture) {
//     if (elem.addEventListener) {
//         elem.addEventListener(type, fn, capture);
//     } else if (elem.attachEvent) {
//         elem.attachEvent('on' + type, function () {
//             fn.call(elem);
//         })
//     } else {
//         elem['on' + type] = fn;
//     }
// }
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


/**
 * 封装事件解绑
 * @param {元素} elem 
 * @param {事件类型} type 
 * @param {执行函数} fn 
 * @param {是否捕获} capture
 */
// function removeEvent(elem, type, fn, capture) {
//     if (elem.addEventListener) {
//         elem.removeEventListener(type, fn, capture);
//     } else if (elem.attachEvent) {
//         elem.detachEvent('on' + type, function() {
//             fn.call(elem);
//         });
//     } else {
//         elem['on' + type] = null;
//     }
// }
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


/**
 * 封装事件冒泡函数：
 * IE：cancelBubble
 * Firefox：stopPropagation
 */
function stopBubble(e) {
	if (e.stopPropagation) {
		e.stopPropagation();
	} else {
		e.cancelBubble = true;
	}
}


/**
 * 封装阻止元素的默认行为函数
 * IE：returnValue
 * DOM：preventDefault
 */
function stopHandler(e) {
	if (e.preventDefault) {
		e.preventDefault(); //非IE
	} else {
		e.returnValue = false; //针对IE
	}
}


// 返回e元素的第n层祖先元素节点  
function retParent(elem, n) {
	while (elem && n--) {
		elem = elem.parentElement;
	}
	return elem;
}


// 返回元素e的第n个兄弟元素节点, n正 ,返回 nextSibling; n负,返回 previousSibling
function retSibling(e, n) {
	while (e && n) {
		if (n > 0) {
			// if (e.nextElementSibling) {
			//     e = e.nextElementSibling;
			// } else {
			//     for (e = e.nextSibling; e && e.nodeType != 1; e = e.nextSibling);
			// }
			e = e.nextSibling;
			while (e && e.nodeType !== 1) {
				e = e.nextSibling;
			}
			n--;
		} else {
			// if (e.previousElementSibling) {
			//     e = e.previousElementSibling;
			// } else {
			//     for (e = e.previousSibling; e && e.nodeType != 1; e = e.previousSibling);
			// }
			e = e.previousSibling;
			while (e && e.nodeType !== 1) {
				e = e.previousSibling;
			}
			n++;
		}
	}
	return e;
}


// 获取元素相对于文档的位置
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


// 获取鼠标位置
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


// 返回该元素下的所有元素节点
function retAllChildren(node) {
	var child = node.childNodes,
		len = child.length,
		item;

	for (var i = 0; i < len; i++) {
		item = child[i];
		if (item.nodeType == 1) {
			retAllChildren(item);
		}
	}

	if (node && node.nodeType == 1) {
		console.log(node)
	}
}


// 求取滚动条的纵横距离
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


// 封装可视区窗口大小
function getViewPort() {
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


// 获取文档的总大小
function getScrollSize() {
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


// 封装文档解析完毕函数
function domReady(fn) {
	if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', function () {
			document.removeEventListener('DOMContentLoaded', arguments.callee, false);
			fn();
		}, false);
	} else if (document.attachEvent) {
		document.attachEvent('onreadystatechange', function () {
			if (this.readyState === 'complete') {
				document.attachEvent('onreadystatechange', arguments.callee);
				fn();
			}
		});
	}

	if (document.documentElement.doScroll && typeof (window.frameElement) === 'undefined') {
		try {
			document.documentElement.doScroll('left');
		} catch (e) {
			return setTimeOut(arguments.callee, 20);
		}
		fn();
	}
}


/**
 * 获取元素CSS 样式属性
 * @param {元素} elem 
 * @param {属性} prop 
 */
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


/**
 * 获取或者设置CSS的属性
 * @param {元素} elem 
 * @param {属性名} attr 
 * @param {属性值} value 
 */
function css(elem, attr, value) {
	//获取CSS的数值  
	if (arguments.length == 2) {
		return getStyle(elem, attr);
	}
	//设置CSS的数值  
	if (arguments.length == 3) {
		elem.style[attr] = value;
	}
}

// 图片懒加载
function imgLazyLoad(images) {
	var imageItem,
		n = 0;

	return function () {
		var cHeight = document.documentElement.clientHeight,
			sTop = document.body.scrollTop || document.documentElement.scrollTop,
			imagesLen = images.length,
			imageTop,
			src;

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


// 封装求取字符串长度
function retByteslen(target) {
	var count,
		len,
		count = len = target.length;
	for (var i = 0; i < len; i++) {
		if (target.charCodeAt(i) > 255) {
			count++;
		}
	}
	return count;
}


// render渲染模板
function render(opt, fn) {
	var list = '';
	opt.data.jForEach(function (val, idx, arr) {
		list += this.replace(regTpl(), function (node, key) {
			return fn(val, idx, arr)[key];
		})
	}, opt.tpl);

	opt.wrap.innerHTML = list;
}


// 替换模板正则
function regTpl() {
	return new RegExp(/{{(.*?)}}/, 'gim');
}

// 去除空格
function trimSpace(str) {
	return str.replace(/\s+/g, '');
}

/**
 * 去除非法字符
 * @param {相关正则表达式} reg 
 */
function trimIllegal(reg) {
	this.value = this.value.replace(reg, '');
}

function ajaxReturn(opt) {
	$.ajax({
		url: opt.url,
		type: 'POST',
		dataType: 'JSON',
		data: opt.data,
		timeout: 100000,
		success: opt.success,
		error: opt.error
	});
}


/**
 * 圣杯模式
 * @param {模板} Origin 
 * @param {对象} Target 
 */
var inherit = (function () {
	function Buffer() {}
	return function (Origin, Target) {
		Buffer.prototype = Origin.prototype;
		Target.prototype = new Buffer();
		Target.prototype.constructor = Target;
		Target.prototype.uber = Origin;
	}
}())



/**
 *  封装克隆对象
 *  遍历对象    for (var prop in )
 *  1. 判断是不是原始值 typeof object
 *  2. 判断是数组还是对象 toString instanceof constructor
 *  3. 建立相应的数组或对象
 *   递归
 * @param {模板} origin 
 * @param {对象} target 
 */
function deepClone(origin, target) {
	var target = target || {},
		toStr = Object.prototype.toString,
		arrStr = '[object Array]';

	for (var prop in origin) {
		if (origin.hasOwnProperty(prop)) {
			if ((origin[prop]) !== null && typeof (origin[prop]) === 'object') {
				target[prop] = toStr.call(origin[prop]) === arrStr ? [] : {};
				deepClone(origin[prop], target[prop]);
			} else {
				target[prop] = origin[prop];
			}
		}
	}
	return target;
}


// 封装 typeof返回类型
function type(target) {
	// 1.区分原始值,引用值
	// 2.区分引用值: 数组, 对象, 包装类
	var res = typeof (target),
		toStr = Object.prototype.toString,
		temp = {
			'[object Array]': 'array',
			'[object Object]': 'object',
			'[object Date]': 'date',
			'[object RegExp]': 'regExp',
			'[object Number]': 'object - number',
			'[object String]': 'object - string',
			'[object Boolean]': 'object - boolean'
		};

	if (target === null) {
		return 'null';
	} else if (res == 'object') {
		var str = toStr.call(target);
		return temp[str];
	} else {
		return res;
	}
}

/**
 * 判断浏览器的类型
 */
function checkBrowser() {
	var nVer = navigator.appVersion,
		nAgt = navigator.userAgent,
		browser = navigator.appName,
		version = '' + parseFloat(navigator.appVersion),
		majorVersion,
		nameOffset,
		verOffset,
		ix,
		network = 'unknown';

	// Opera浏览器（老版本）
	if ((verOffset = nAgt.indexOf('Opera')) != -1) {
		browser = 'Opera';
		version = nAgt.substring(verOffset + 6);
		if ((verOffset = nAgt.indexOf('Version')) != -1) {
			version = nAgt.substring(verOffset + 8);
		}
	}
	// Opera浏览器（新版本）
	if ((verOffset = nAgt.indexOf('OPR')) != -1) {
		browser = 'Opera';
		version = nAgt.substring(verOffset + 4);
	}
	// IE浏览器
	else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
		browser = 'Microsoft Internet Explorer';
		version = nAgt.substring(verOffset + 5);
	}
	// Chrome浏览器
	else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
		browser = 'Chrome';
		version = nAgt.substring(verOffset + 7);
	}
	// Safari浏览器
	else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
		browser = 'Safari';
		version = nAgt.substring(verOffset + 7);
		if ((verOffset = nAgt.indexOf('Version')) != -1) {
			version = nAgt.substring(verOffset + 8);
		}
	}
	// Firefox浏览器
	else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
		browser = 'Firefox';
		version = nAgt.substring(verOffset + 8);
	}
	// IE11+浏览器
	else if (nAgt.indexOf('Trident/') != -1) {
		browser = 'Microsoft Internet Explorer';
		version = nAgt.substring(nAgt.indexOf('rv:') + 3);
	}
	// 微信浏览器
	else if (nAgt.indexOf('NetType/') != -1) {
		browser = 'WeiXin';
		if (nAgt.indexOf('NetType/WIFI') != -1) {
			network = 'WIFI';
		} else if (nAgt.indexOf('NetType/2G') != -1) {
			network = '2G';
		} else if (nAgt.indexOf('NetType/3G+') != -1) {
			network = '3G+';
		}
		verOffset = nAgt.lastIndexOf('/')
		version = nAgt.substring(verOffset + 1);
		if (browser.toLowerCase() == browser.toUpperCase()) {
			browser = navigator.appName;
		}
	}
	//其他浏览器
	else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
		browser = nAgt.substring(nameOffset, verOffset);
		version = nAgt.substring(verOffset + 1);
		if (browser.toLowerCase() == browser.toUpperCase()) {
			browser = navigator.appName;
		}
	}

	//版本字符串整理
	if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
	if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
	if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);
	majorVersion = parseInt('' + version, 10);
	if (isNaN(majorVersion)) {
		version = '' + parseFloat(navigator.appVersion);
		majorVersion = parseInt(navigator.appVersion, 10);
	}

	//移动版本
	var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

	//系统探测
	var os = '';
	var clientStrings = [{
			s: 'Windows 10',
			r: /(Windows 10.0|Windows NT 10.0)/
		},
		{
			s: 'Windows 8.1',
			r: /(Windows 8.1|Windows NT 6.3)/
		},
		{
			s: 'Windows 8',
			r: /(Windows 8|Windows NT 6.2)/
		},
		{
			s: 'Windows 7',
			r: /(Windows 7|Windows NT 6.1)/
		},
		{
			s: 'Windows Vista',
			r: /Windows NT 6.0/
		},
		{
			s: 'Windows Server 2003',
			r: /Windows NT 5.2/
		},
		{
			s: 'Windows XP',
			r: /(Windows NT 5.1|Windows XP)/
		},
		{
			s: 'Windows 2000',
			r: /(Windows NT 5.0|Windows 2000)/
		},
		{
			s: 'Windows ME',
			r: /(Win 9x 4.90|Windows ME)/
		},
		{
			s: 'Windows 98',
			r: /(Windows 98|Win98)/
		},
		{
			s: 'Windows 95',
			r: /(Windows 95|Win95|Windows_95)/
		},
		{
			s: 'Windows NT 4.0',
			r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
		},
		{
			s: 'Windows CE',
			r: /Windows CE/
		},
		{
			s: 'Windows 3.11',
			r: /Win16/
		},
		{
			s: 'Android',
			r: /Android/
		},
		{
			s: 'Open BSD',
			r: /OpenBSD/
		},
		{
			s: 'Sun OS',
			r: /SunOS/
		},
		{
			s: 'Linux',
			r: /(Linux|X11)/
		},
		{
			s: 'iOS',
			r: /(iPhone|iPad|iPod)/
		},
		{
			s: 'Mac OS X',
			r: /Mac OS X/
		},
		{
			s: 'Mac OS',
			r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
		},
		{
			s: 'QNX',
			r: /QNX/
		},
		{
			s: 'UNIX',
			r: /UNIX/
		},
		{
			s: 'BeOS',
			r: /BeOS/
		},
		{
			s: 'OS/2',
			r: /OS\/2/
		},
		{
			s: 'Search Bot',
			r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
		}
	];
	for (var id in clientStrings) {
		var cs = clientStrings[id];
		if (cs.r.test(nAgt)) {
			os = cs.s;
			break;
		}
	}
	var osVersion = '';
	if (/Windows/.test(os)) {
		osVersion = /Windows (.*)/.exec(os)[1];
		os = 'Windows';
	}
	switch (os) {
		case 'Mac OS X':
			osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
			break;
		case 'Android':
			osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
			break;
		case 'iOS':
			osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
			osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
			break;
	}

	//返回数据集合
	return {
		//操作系统
		os: os,
		//操作系统版本
		osVersion: osVersion ? osVersion : 'unknown',
		//是否移动端访问
		mobile: mobile,
		//浏览器类型
		browser: browser,
		//浏览器版本
		browserVersion: version,
		//浏览器major版本
		browserMajorVersion: majorVersion
	};

}

/**
 * 判断网络状况4G/3G/2G/2G-
 */
function networkType() {
	var type = navigator.connection.effectiveType;
	switch (type) {
		case 'slow-2g':
			return '2G-';
			break;
		case '2g':
			return '2G';
			break;
		case '3g':
			return '3G';
			break;
		case '4g':
			return '4G';
			break;
		default:
			break;
	}
}


/**
 * JS异步加载
 * @param {资源} url 
 * @param {回调函数} callback 
 */
function loadScript(url, callback) {
	var script = document.createElement('script');
	script.src = "text/javascript";
	if (script.readyState) {
		script.onreadystatechange = function () {
			if (script.readyState == 'complete' || script.readyState == 'loaded') {
				tools[callback](); // callback();       
			}
		}
	} else {
		script.onload = function () { // safari chrome firefox 
			tools[callback](); // callback();
		}
	}
	script.src = url;
	document.head.appendChild(script);
}



/**
 * 异步&动态创建script
 */
(function () {
	function async_load() {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.async = true;
		script.src = 'tools.js'
		document.body.appendChild(script);
	}

	if (window.attachEvent) {
		window.attachEvent('onload', async_load);
	} else {
		window.addEventListener('onload', async_load, false);
	}

}())



/**
 * cookie 写/删/读  操作
 */
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


/**
 * 判断该点是否在△内
 */
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