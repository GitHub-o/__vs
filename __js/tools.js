/*
 * error.name 的6种错误信息:
 *  1. EvalError: eval() 的使用与定义不一致
 *  2. RangeError: 数值越界
 *  3. ReferenceError: 非法或不能识别的引用数值
 *  4. SyntaxError: 发生语法解析错误
 *  5. TypeError: 操作数据类型错误
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
		item = {}.toString.call(item) === '[object Object]' ?
			deepClone(arr[i]) :
			arr[i];
		fn.apply(arg2, [item, i, arr]) && newArr.push(item);
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
		item = {}.toString.call(item) === '[object Object]' ?
			deepClone(arr[i]) :
			arr[i];
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
		item = {}.toString.call(item) === '[object Object]' ?
			deepClone(arr[i]) :
			arr[i];
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
		item = {}.toString.call(item) === '[object Object]' ?
			deepClone(arr[i]) :
			arr[i];
		if (fn.apply(arg2, [item, i, arr])) {
			return res = true;
		}
	}
	return res;
}


HTMLCollection.prototype.jReduce = function (fn, initialValue) {
	var arr = this,
			len = arr.length,
			arg3 = arguments[2] || window,
			item;
	for (var i = 0; i < len; i++) {
		item = {}.toString.call(item) === '[object Object]' ?
			deepClone(arr[i]) :
			arr[i];
		initialValue = fn.apply(arg3, [initialValue, item, i, arr]);
	}
	return initialValue;
}


HTMLCollection.prototype.jReduceRight = function (fn, initialValue) {
	var arr = this,
			len = arr.length,
			arg3 = arguments[2] || window,
			item;
	for (var i = len - 1; i >= 0; i--) {
		item = {}.toString.call(item) === '[object Object]' ?
			deepClone(arr[i]) :
			arr[i];
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
Array.prototype.jq = function () {
	var len = this.length,
			temp = {};
	for (var i = 0; i < len; i++) {
		if (!temp.hasOwnProperty(this[i])) {
			temp[this[i]] = 1;
		} else {
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
		item = {}.toString.call(item) === '[object Object]' ?
			deepClone(arr[i]) :
			arr[i];
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
		item = {}.toString.call(item) === '[object Object]' ?
			deepClone(arr[i]) :
			arr[i];
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
		item = {}.toString.call(item) === '[object Object]' ?
			deepClone(arr[i]) :
			arr[i];
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
		item = {}.toString.call(item) === '[object Object]' ?
			deepClone(arr[i]) :
			arr[i];
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
		item = {}.toString.call(item) === '[object Object]' ?
			deepClone(arr[i]) :
			arr[i];
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
	for (var i = len - 1; i >= 0; i--) {
		item = arr[i];
		if ({}.toString.call(item) === '[object Object]') {
			item = deepClone(arr[i]);
		}
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


Array.prototype.bubbleSort1 = function () {
	var len = this.length,
			temp;

	for (var i = 0; i < len - 1; i++) {
		for (var j = 0; j < len - i - 1; j++) {
			if (this[j] > this[j + 1]) {
				temp = this[j + 1];
				this[j + 1] = this[j];
				this[j] = temp;
			}
		}
	}
	return this;
};

Array.prototype.bubbleSort2 = function () {
	var j = this.length - 1;
	while (j > 0) {
		var pos = 0,
			temp;
		for (var i = 0; i < j; i++) {
			if (this[i] > this[i + 1]) {
				pos = i;
				temp = this[i];
				this[i] = this[i + 1];
				this[i + 1] = temp;
			}
		}
		j = pos;
	}
	return this;
};

Array.prototype.selectionSort = function () {
	var len = this.length,
			temp,
			minIdx;
	for (var i = 0; i < len - 1; i++) {
		minIdx = i;
		for (var j = i + 1; j < len; j++) {
			if (this[minIdx] > this[j]) {
				minIdx = j;
			}
		}
		temp = this[i];
		this[i] = this[minIdx];
		this[minIdx] = temp;
	}
	return this;
};

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


// 封装 该节点下的元素节点Children
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


// 返回该元素下的所有元素节点
Element.prototype.allChildren = function (childrenArr = []) {
	var child = this.childNodes,
			len = child.length,
			item;

	for (var i = 0; i < len; i++) {
		item = child[i];
		if (item.nodeType == 1) {
			childrenArr && childrenArr.push(item)
			item.allChildren(childrenArr);
		}
	}
	return childrenArr;
}

// 返回e元素的第n层祖先元素节点  
Element.prototype.parent = function (n) {
	var elem = this;
	while (elem && n--) {
		elem = elem.parentElement;
	}
	return elem;
}

// 返回元素e的第n个兄弟元素节点, n正 ,返回 nextSibling; n负,返回 previousSibling
Element.prototype.sibling = function (n) {
	var elem = this;
	while (elem && n) {
		if (n > 0) {
			// if (leme.nextElementSibling) {
			//     e = e.nextElementSibling;
			// } else {
			//     for (e = e.nextSibling; e && e.nodeType != 1; e = e.nextSibling);
			// }
			elem = elem.nextSibling;
			while (elem && elem.nodeType !== 1) {
				elem = elem.nextSibling;
			}
			n--;
		} else {
			// if (e.previousElementSibling) {
			//     e = e.previousElementSibling;
			// } else {
			//     for (e = e.previousSibling; e && e.nodeType != 1; e = e.previousSibling);
			// }
			elem = elem.previousSibling;
			while (elem && elem.nodeType !== 1) {
				elem = elem.previousSibling;
			}
			n++;
		}
	}
	return elem;
}

/**
 * 拖拽函数
 * @param {点击的元素} opt.elem 
 * @param {双击所显示的元素} opt.dblWrap
 * @param {右键所显示的元素} opt.menuWrap
 */
Element.prototype.drag = function (opt = {}) {
	var dragWrap = opt.dragWrap || this,
			elem = this,
			dblWrap = opt.dblWrap,
			menuWrap = opt.menuWrap,
			wWidth = getClientPort().w,
			wHeight = getClientPort().h,
			callbackTime = null,
			ceTime = null,
			t = null,
			counter = 0;
			disX,
			disY;

	if (menuWrap) {
		var mWidth = getStyle(menuWrap, 'width'),
			mHeight = getStyle(menuWrap, 'height'),
			maxW = wWidth - mWidth,
			maxH = wHeight - mHeight;
		addEvent(menuWrap, 'click', stopEvent);
	}
	addEvent(elem, 'mousedown', mouseDown);
	addEvent(elem, 'contextmenu', stopEvent);
	addEvent(dragWrap, 'contextmenu', stopEvent);

	function mouseDown (e) {
		var e = e || window.event,
			btnCode = e.button,
			x = pagePos(e).x,
			y = pagePos(e).y,
			mLeft,
			mTop;

		stopEvent(e);

		if (btnCode === 0) {
			disX = x - getStyle(dragWrap, 'left');
			disY = y - getStyle(dragWrap, 'top');

			addEvent(document, 'mousemove', mouseMove);
			addEvent(document, 'mouseup', mouseUp);
		} else if (btnCode === 2) {
			if (menuWrap) {
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
				menuWrap.style.left = mLeft + 'px';
				menuWrap.style.top = mTop + 'px';
				menuWrap.style.display = 'block';
				addEvent(document, 'click', hideMenu);
				addEvent(menuWrap, 'contextmenu', stopEvent);
			}
		}
	}

	function mouseMove (e) {
		var e = e || window.event,
			x = pagePos(e).x - disX,
			y = pagePos(e).y - disY,
			maxX = wWidth - getStyle(dragWrap, 'width') - 1,
			maxY = wHeight - getStyle(dragWrap, 'height') - 1;
		if (menuWrap) {
			menuWrap.style.display = 'none'
			removeEvent(document, 'click', hideMenu);
			removeEvent(menuWrap, 'contextmenu', stopEvent);
		}
		if (x < 0) {
			x = 0;
		} else if (x >= maxX) {
			x = maxX;
		}

		if (y < 0) {
			y = 0;
		} else if (y >= maxY) {
			y = maxY;
		}

		dragWrap.style.left = x + 'px';
		dragWrap.style.top = y + 'px';
	}

	function mouseUp () {
		if (dblWrap) {
			var res;
			counter++;
			if (counter == 1) {
				callbackTime = new Date().getTime();
			}
			if (counter == 2) {
				ceTime = new Date().getTime();
			}
			res = ceTime - callbackTime;
			if (callbackTime && ceTime && res < 300) {
				dblWrap.style.display = 'block';
			}
			t = setTimeout(function () {
				callbackTime = ceTime = counter = 0;
				clearTimeout(t);
			}, 500);
		}
		removeEvent(document, 'mousemove', mouseMove);
		removeEvent(document, 'mouseup', mouseUp);
	}

	function stopEvent (e) {
		var e = e || window.event;
		preventDefault(e);
		cancelBubble(e);
	}

	function hideMenu () {
		menuWrap.style.display = 'none'
	}
}

/**
 * 元素显示/隐藏的动画
 * @param {元素显示的状态 - none/block} opt.status 
 * @param {过渡动画} opt.animation 
 * @param {动画时间 - ms} opt.duration 
 */
Element.prototype.showStatusAnimation = function (opt = {}) {
	var t = null,
			t1 = null,
			t2 = null,
			status = opt.status,
			duration = opt.duration || 1000,
			elem = this,
			animation = opt.animation;

	elem.style.animation = animation + ' ' + duration / 1000 + 's';

	t = setTimeout(function () {
		if (status == 'none') {
			t2 = setTimeout(function () {
				elem.style.display = status;
				clearTimeout(t2);
				t2 = null;
			}, .7 * duration);
		} else {
			elem.style.display = status;
		}
		t1 = setTimeout(function () {
			elem.style.animation = '';
			clearTimeout(t1);
			t1 = null;
		}, .8 * duration);
		clearTimeout(t);
		t = null;
	}, .4 * duration);
}

/**
 * 判断鼠标相对于元素的位置
 * @param {事件源} e 
 * @param {左侧} left
 * @param {上部} top
 * @param {右侧} right
 * @param {底部} bottom
 */
Element.prototype.getDirection = function (e) {
	var e = e || window.event,
			elem = this,
			elemWidth = getStyle(elem, 'width'),
			elemHeight = getStyle(elem, 'height'),
			x = (pagePos(e).x - elemPos(elem).left - elemWidth / 2) * (elemWidth > elemHeight ? elemHeight / elemWidth : 1),
			y = (pagePos(e).y - elemPos(elem).top - elemHeight / 2) * (elemHeight > elemWidth ? elemWidth / elemHeight : 1),
			angle = (Math.atan2(y, x) * 180 / Math.PI) + 180,
			num = (Math.round(angle / 90) + 3) % 4;

	function _getDir (type, callback) {
		var dir;
		switch (num) {
			case 0:
				dir = 'top';
				break;
			case 1:
				dir = 'right';
				break;
			case 2:
				dir = 'bottom';
				break;
			case 3:
				dir = 'left';
				break;
			default:
				break;
		}
		if (type === dir) {
			callback.call(elem);
		}
	}

	return {
		left: function (callback) {
			_getDir('left', callback);
			return this;
		},

		top: function (callback) {
			_getDir('top', callback);
			return this;
		},

		right: function (callback) {
			_getDir('right', callback);
			return this;
		},

		bottom: function (callback) {
			_getDir('bottom', callback);
			return this;
		}
	}
}


/**
 * 弹性运动
 * @param {元素属性} opt.attr
 * @param {元素弹性变换后的位置} opt.target
 * @param {弹性系数} opt.k
 * @param {摩擦阻力系数} opt.z
 * @param {运动结束后的回调函数} callback
 */
Element.prototype.elasticMove = function (opt = {}, callback) {
	var elem = this,
			attr = opt.attr || 'left',
			target = opt.target === 0 ? 0 : opt.target || 250,
			k = opt.k || .7,
			z = opt.z || .7,
			flexLen = target,
			step = 0,
			cur;

	if (!elem.timer) {
		elem.timer = {};
	} else if (elem.timer[attr]) {
		clearInterval(elem.timer[attr]);
	}

	elem.timer[attr] = setInterval(function () {
		cur = getStyle(elem, attr);
		flexLen = target - cur;
		step += flexLen * k;
		step *= z;
		elem.style[attr] = cur + step + 'px';

		if (Math.round(flexLen) === 0 && Math.round(step) === 0) {
			elem.style[attr] = target + 'px';
			clearInterval(elem.timer[attr]);
			elem.timer[attr] = null;
			typeof (callback) === 'function' && callback();
		}
	}, 1000 / 60);
}

/**
 * 重力运动
 * @param {最大活动高度} opt.activeHeight
 * @param {最大活动宽度} opt.activeWidth
 * @param {垂直方向上的步数} opt.stepY
 * @param {水平方向上的步数} opt.stepX
 * @param {最大碰撞次数} opt.maxCount
 * @param {每次碰撞的耗能} opt.z
 * @param {运动结束后的回调函数} callback
 */
Element.prototype.gravityMove = function (opt = {}, callback) {
	var elem = this,
			activeHeight = (opt.activeHeight === 0 ? 0 : getClientPort().h) - getStyle(elem, 'height'),
			activeWidth = (opt.activeWidth === 0 ? 0 : getClientPort().w) - getStyle(elem, 'width'),
			z = opt.z || .7,
			stepX = opt.stepX || 0,
			stepY = opt.stepY || 2,
			maxCount = opt.maxCount || 10,
			x = 0,
			y = 0,
			curTop,
			curLeft,
			count = 0;

	if (elem.timer) {
		clearInterval(elem.timer);
	}

	elem.timer = setInterval(function () {
		curTop = getStyle(elem, 'top');
		curLeft = getStyle(elem, 'left');

		y += stepY;
		x += stepX;

		if (curTop + y > activeHeight) {
			count++;
			y = -y * z;
			elem.style.top = activeHeight + 'px';
			if (count === maxCount) {
				clearInterval(elem.timer);
				elem.timer = null;
				typeof (callback) === 'function' && callback();
			}
		}


		if (curLeft + x > activeWidth) {
			count++;
			x = -x * z;
			if (count === maxCount) {
				clearInterval(elem.timer);
				elem.timer = null;
			}
		}

		elem.style.top = curTop + y + 'px';
		elem.style.left = curLeft + x + 'px';
	}, 1000 / 60)
};


/**
 * @param {css属性} opt
 * @param {运动时长} duration
 * @param {运动结束后的回调函数} callback
 */
Element.prototype.startMove = function (opt = {}, duration = 1000, callback) {
	var elem = this,
			speed = 100,
			step;

	if (elem.timer) {
		clearInterval(elem.timer);
	}

	elem.timer = setInterval(function () {
		var flag = true;
		for (var prop in opt) {
			var curProp = getStyle(elem, prop);

			step = (opt[prop] - curProp) / duration * speed;

			if (prop == 'opacity') {
				step *= 10
				elem.style[prop] = curProp + step;
			} else {
				step = step > 0 ? Math.ceil(step) : Math.floor(step);
				elem.style[prop] = curProp + step + 'px';
			}

			if (curProp + step !== opt[prop]) {
				flag = false;
			}
		}

		if (flag) {
			clearInterval(elem.timer);
			elem.timer = null;
			typeof (callback) == 'function' && callback();
		}
	}, 30)
}

/**
 * 移动端触屏事件的封装
 * @param {轻触} tap 
 * @param {长按} longtap 
 * @param {左滑} slideleft 
 * @param {右滑} slideright 
 * @param {上滑} slideup 
 * @param {下滑} slidedown 
 * @param {触发的最小值} activeRange
 */
Element.prototype.touch = function (activeRange = 100) {
	var elem = this;

	function tap (callback) {
		elem.addEventListener('touchstart', fn, false);
		elem.addEventListener('touchend', fn, false);

		var bTime, eTime;

		function fn (e) {
			e.preventDefault();

			switch (e.type) {
				case 'touchstart':
					bTime = new Date().getTime();
					break;
				case 'touchend':
					eTime = new Date().getTime();

					if (eTime - bTime < 500) {
						callback.call(elem, e);
					}
					break;
				default:
					break;
			}
		}
		return this;
	}

	function longtap (callback) {
		elem.addEventListener('touchstart', fn, false);
		elem.addEventListener('touchmove', fn, false);
		elem.addEventListener('touchend', fn, false);

		var t = null;

		function fn (e) {
			e.preventDefault();
			t && clearTimeout(t);

			switch (e.type) {
				case 'touchstart':
					t = setTimeout(function () {
						callback.call(elem, e);
						clearTimeout(t);
						t = null;
					}, 500);
					break;
				case 'touchmove':
				case 'touchend':
					clearTimeout(t);
					break;
				default:
					break;
			}
		}
		return this;
	}

	function _slide (type, callback) {
		elem.addEventListener('touchstart', fn, false);
		elem.addEventListener('touchend', fn, false);

		var bX, bY, eX, eY;

		function fn (e) {
			var touch = e.changedTouches[0];
			e.preventDefault();

			switch (e.type) {
				case 'touchstart':
					bX = touch.pageX;
					bY = touch.pageY;
					break;
				case 'touchend':
					eX = touch.pageX;
					eY = touch.pageY;
					_slideDir(e, eX - bX, eY - bY);
					break;
				default:
					break;
			}
		}

		function _slideDir (e, x, y) {
			switch (type) {
				case 'left':
					if (x > activeRange && Math.abs(y) < 30) {
						callback.call(elem, e);
					}
					break;
				case 'up':
					if (Math.abs(x) < 30 && -y > activeRange) {
						callback.call(elem, e);
					}
					break;
				case 'right':
					if (-x > activeRange && Math.abs(y) < 30) {
						callback.call(elem, e);
					}
					break;
				case 'down':
					if (Math.abs(x) < 30 && y > activeRange) {
						callback.call(elem, e);
					}
					break;
			}
		}
	}

	function slideleft (callback) {
		_slide('left', callback);
		return this;
	}
	function slideright (callback) {
		_slide('right', callback);
		return this;
	}
	function slideup (callback) {
		_slide('up', callback);
		return this;
	}
	function slidedown (callback) {
		_slide('down', callback);
		return this;
	}

	return {
		tap: tap,
		longtap: longtap,
		slideleft: slideleft,
		slideright: slideright,
		slideup: slideup,
		slidedown: slidedown
	};
};

// 封装getElementsByClassName
// Document.prototype.getElementsByClassName =
// 	Element.prototype.getElementsByClassName =
// 	document.getElementsByClassName || 
// 	function (className) {
// 		var allDoms = document.getElementsByTagName('*'),
// 			allDomsLen = allDoms.length,
// 			allDomItem,
// 			finalArr = [];

// 		for (var i = 0; i < allDomsLen; i++) {
// 			allDomItem = allDoms[i];
// 			var temp = trimSpace(allDomItem.className).trim().split(' '),
// 				tempLen = temp.length,
// 				tempItem;

// 			for (var j = 0; j < tempLen; j++) {
// 				tempItem = temp[j];
// 				if (tempItem === className) {
// 					finalArr.push(allDomItem);
// 					break;
// 				}
// 			}
// 		}
// 		return finalArr;

// 		function trimSpace (tar) {
// 			return tar.replace(/\s+/g, ' ');
// 		}
// 	}



//--------------------Advanced Function------------------------------------------------------------>>


/**
 * 组合函数  --> 组合多个功能函数
 */
function compose () {
	var args = [].slice.call(arguments);

	return function (initialVal) {
		return args.jReduceRight(function (res, callback) {
			return callback(res);
		}, initialVal);
	}
}


/**
 * 柯里化函数  --> 将一个多参数函数转成多个单参数的函数（一个n元函数 --> n个一元函数）
 * @param {分步所执行的函数} fn 
 */
// function curry (fn, len) {
// 	var len = len || fn.length;

// 	var func = function (fn) {
// 		var args = [].slice.call(arguments, 1);

// 		return function () {
// 			var newArgs = args.concat([].slice.call(arguments));
// 			return fn.apply(this, newArgs);
// 		}
// 	}

// 	return function () {
// 		var arrLen = arguments.length;

// 		if (arrLen < len) {
// 			var formatedArr = [fn].concat([].slice.call(arguments));
// 			return curry(func.apply(this, formatedArr), len - arrLen);
// 		} else {
// 			return fn.apply(this, arguments);
// 		}
// 	}
// }
function curry (fn) {
  var totalLen = fn.length,
      args = [].slice.call(arguments, 1);

    var func = function () {
      var len = arguments.length;

    if (len < totalLen) {
      return function () {
        args = args.concat([].slice.call(arguments));
        return func.apply(this, args);
      }
    } else {
      return fn.apply(this, args);
    }
  }
  return func();
}



/**
 * 惰性函数  --> 函数内部改写自身
 */



/**
 * 记忆/缓存函数  --> 具有缓存池的函数
 * 														上次的计算结果缓存起来，当下次调用时，如果遇到相同的参数，就直接返回缓存中的数据。
 * @param {具有记忆的函数} fn 
 */
function memorize (fn) {
	var cache = {};

	return function () {
		var key = [].join.call(arguments, ',');

		return cache[key] = cache[key] || fn.apply(this, arguments);
	}
}



/**
 * 防抖函数  --> 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
 * @param {具有防抖的函数} fn 
 * @param {time秒内频繁触发不执行 - ms} wait
 * @param {立即执行} immediate 
 */
function debounce (fn, wait = 800, immediate = false) {
	var timeout,
			res;

	function later (args) {
		return setTimeout(function () {
			timeout = null;
			if (!immediate) {
				res = fn.apply(this, args);
			}
		}.bind(this), wait);
	}

	var debounced = function () {
		if (!timeout) {
			timeout = later(arguments);
			if (immediate) {
				res = fn.apply(this, arguments);
			}

		} else {
			clearTimeout(timeout);
			timeout = later(arguments);
		}
		return res;
	}

	debounced.remove = function () {
		clearTimeout(timeout);
		timeout = null;
	}

	return debounced;
}



/**
 * 节流函数  --> n秒内，事件被触发只执行一次
 * 										规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。
 * @param {具有节流的函数} fn 
 * @param {delay秒内触发 - ms} delay 
 */
function throttle (fn, delay = 1000) {
	var t = null,
			firstTime = new Date().getTime(),
			res;

	return function () {
		var _self = this,
			args = arguments,
			curTime = new Date().getTime();

		t && clearTimeout(t);

		if (curTime - firstTime >= delay) {
			res = fn.apply(_self, args);
			firstTime = curTime;
		} else {
			t = setTimeout(function () {
				res = fn.apply(_self, args);
			}, delay);
		}
		return res;
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
 * 数据分类函数
 * @param {分类字段} fields 
 * @param {数据 - array} datas 
 * @param {映射的字段 - string} mapping_field
 * @param {分隔符 - string} seperator
 */
function sortDatas (fields, datas) {
	var cache = {};

	return function (mapping_field, seperator = ',') {
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
function removeEvent (elem, type, fn, capture) {
	if (elem.addEventListener) {
		removeEvent = function (elem, type, fn, capture = false) {
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
function cancelBubble (e) {
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
function preventDefault (e) {
	if (e.preventDefault) {
		e.preventDefault();
	} else {
		e.returnValue = false;
	}
}


// 获取元素相对于文档的位置
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


// 获取鼠标位置
function pagePos (e) {
	var e = e || window.event,
			sTop = window.pageYOffset || document.body.scrollTop + document.documentElement.scrollTop,
			sLeft = window.pageXOffset || document.body.scrollLeft + document.documentElement.scrollLeft,
			cTop = document.documentElement.clientTop || 0,
			cLeft = document.documentElement.clientLeft || 0;

	return {
		x: e.clientX + sLeft - cLeft,
		y: e.clientY + sTop - cTop
	}
}


// 求取滚动条的纵横距离
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


// 封装可视区窗口大小
function getClientPort () {
	if (window.innerWidth) {
		return {
			w: window.innerWidth,
			h: window.innerHeight
		}
	} else if (document.compatMode == "BackCompat") {
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


// 获取文档的总大小
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


// 封装文档解析完毕函数
function domReady (fn) {
	if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', function () {
			document.removeEventListener('DOMContentLoaded', arguments.callee, false);
			fn();
		}, false);
	} else if (document.attachEvent) {
		document.attachEvent('onreadystatechange', function () {
			if (this.readyState === 'complete') {
				document.detachEvent('onreadystatechange', arguments.callee);
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
 * @param {伪元素 before/after} type
 */
function getStyle (elem, prop, type = null) {
	if (window.getComputedStyle) {
		if (prop) {
			return parseInt(window.getComputedStyle(elem, type)[prop]);
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
 * 
 * @param {元素} opt.elem 
 * @param {渐变时间 ms} opt.duration
 * @param {透明度（0~1）} opt.opacity 
 */
function fadeIn (opt = {}) {
	var o = null,
			timer = null,
			elemStyle = opt.elem.style,
			duration = opt.duration || 500,
			opacity = opt.opacity || 1;

	clearInterval(timer);
	o = elemStyle.opacity = getStyle(opt.elem, 'opacity');

	timer = setInterval(function () {
		if (o >= opacity) {
			elemStyle.opacity = opacity;
			clearInterval(timer);
		} else {
			o += opacity / duration * 30;
			elemStyle.opacity = o;
		}
	}, 30);
}


/**
 * 
 * @param {元素} opt.elem 
 * @param {渐变时间 ms} opt.duration
 * @param {透明度（0~1）} opt.opacity 
 */
function fadeOut (opt = {}) {
	var o = null,
			timer = null,
			elemStyle = opt.elem.style,
			duration = opt.duration || 500,
			opacity = opt.opacity || 0,
			c = null;

	clearInterval(timer);
	c = o = elemStyle.opacity = getStyle(opt.elem, 'opacity');

	timer = setInterval(function () {
		if (o <= opacity) {
			elemStyle.opacity = opacity;
			clearInterval(timer);
		} else {
			o -= (c - opacity) / duration * 30;
			elemStyle.opacity = o;
		}
	}, 30);
}


// 封装求取字符串长度
function retByteslen (target) {
	var count = target.length,
			len = count;
	for (var i = 0; i < len; i++) {
		if (target.charCodeAt(i) > 255) {
			count++;
		}
	}
	return count;
}

/**
 * 渲染模板
 * @param {元素 - dom} opt.wrap
 * @param {数据 - array} opt.data
 * @param {字符串模板 - string} opt.tpl
 * @param {替换的变量 - object} opt.value
 */
function render (opt) {
	var list = '';
	opt.data.jForEach(function (val, idx, arr) {
		list += this.replace(regTpl(), function (node, key) {
			return opt.value(val, idx, arr)[key];
		})
	}, opt.tpl);

	return opt.wrap ? opt.wrap.innerHTML = list : list;
}


// 替换模板正则
function regTpl () {
	return new RegExp(/{{(.*?)}}/, 'gim');
}

// 去除空格
function trimSpace (str) {
	return str.replace(/\s+/g, '');
}


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
function deepClone (origin, target) {
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
function type (target) {
	// 1.区分原始值,引用值
	// 2.区分引用值: 数组, 对象, 包装类
	if (target === null) {
		return 'null';
	}

	var type = typeof (target);
	temp = {
		'[object Array]': 'array',
		'[object Object]': 'object',
		'[object Date]': 'date',
		'[object RegExp]': 'regExp',
		'[object Number]': 'object_number',
		'[object String]': 'object_string',
		'[object Boolean]': 'object_boolean'
	};

	return type === 'object' ? temp[{}.toString.call(target)] : type;
}

/**
 * 判断浏览器的类型
 */
function checkBrowser () {
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
function networkType () {
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
 * 
 * @param {对象} obj 
 * @param {参数} params 
 */
function parse (obj, params) {
	if (typeof params === 'string') {
		if (!(/\.|\[.+\]/g).test(params)) {
			return obj[params];
		}
		params = params.replace(/\]\[/g, '.')
			.replace(/\[/g, '.')
			.replace(/\]/g, '.')
			.replace(/\.$/, '')
			.split('.');
	} else if (params.length === 1) {
		return obj[params];
	}
	obj = obj[params[0]];
	params.shift();
	return parse(obj, params);
}

/**
 * 异步加载并执行回调函数
 * @param {资源} url 
 * @param {回调函数} callback 
 */
function async_load_func (url, callback) {
	var oS = document.createElement('script');
	oS.type = 'text/javascript';
	oS.async = true;

	if (oS.readyState) {
		oS.onreadystatechange = function () {
			if (oS.readyState == 'complete' || oS.readyState == 'loaded') {
				return parse(window, callback)();
			}
		}
	} else {
		oS.onload = function () { // safari chrome firefox 
			return parse(window, callback)();
		}
	}
	oS.src = url;
	document.head.appendChild(oS);
}


/**
 * 异步加载脚本
 * @param {地址} url
 */
function async_load (url) {
	var oS = document.createElement('script');
	oS.type = 'text/javascript';
	oS.async = true;
	oS.src = url;
	document.head.appendChild(oS);
}

/**
 * 获取URL参数的值
 * @param {} value
 */
function getUrlParam(value) {
  var reg = new RegExp("(^|&)" + value + "=([^&]*)(&|$)", "i")
      r = window.location.search.substr(1).match(reg);
	if(r != null) {
		return(r[2]);
	}
}


/**
 * 字符串一行
 */
function oneLine(template, ...expressions) {
  let str =  template.reduce((prev, cur, idx) => {
    return prev + expressions[idx - 1] + cur;
  })
  return str.replace(/\n\s*/g, ' ').trim();
}


/**
 * ES6模板语法
 */
function template(template, ...expressions) {
  let result = template.reduce((prev, cur, idx) => {
    let expression = expressions[idx - 1];
    if (Array.isArray(expression)) {
      expression = expression.join('');
    }
    return prev + expression + cur;
  });
  const match = result.match(/^[^\S\n]*(?=\S)/gm)
        indent = match && Math.min(...match.map(el => el.length));

  if (indent) {
      const regexp = new RegExp(`^.{${indent}}`, 'gm');
      result =  result.replace(regexp, '');
  }

  return result.trim();
}


//------------------------------------------------------------------------------------------------>>

/**
 * 放大镜
 * @param {元素} elem
 * @param {放大模式 - 'inner/outer'} opt.mode
 * @param {图片地址 -string} opt.imgUrl
 * @param {放大图片地址 -string} opt.magnifierImgUrl
 * @param {放大因数 - number} opt.scale
 * @param {放大镜宽度 - number} opt.magnifierWidth
 * @param {放大镜高度 - number} opt.magnifierHeight
 * @param {外部图片宽度} opt.outerWidth
 * @param {外部图片高度} opt.outerHeight
 * @param {以图片右上方为原点，外部图片left -number} opt.outerTop
 * @param {以图片右上方为原点，外部图片top -number} opt.outerLeft
 */
var Magnifier = (function (doc, win) {
	var Magnifier = function (elem, opt = {}) {
		if (!opt.imgUrl) {
			throw new Error('图片地址未填写！')
		}
		this.elem = doc.querySelector(elem);
		this.elemWidth = getStyle(this.elem, 'width');
		this.elemHeight = getStyle(this.elem, 'height');
		this.mode = opt.mode || 'inner';
		this.scale = opt.scale || 1.5;
		this.imgUrl = opt.imgUrl;
		this.magnifierImgUrl = opt.magnifierImgUrl || opt.imgUrl;
		this.opt = opt;
    this._moveWrap = this.moveWrap.bind(this);
    this._leaveWrap = this.leaveWrap.bind(this);
	}

	Magnifier.prototype = {
		init: function () {
			this.bindEvent();
			this.initMode();
			this.getElement();
		},

		initMode: function () {
			if (this.mode === 'inner') {
				this.magnifierWidth = (this.opt.magnifierWidth || 200) / this.scale;
				this.magnifierHeight = (this.opt.magnifierHeight || 200) / this.scale;
			} else {
				this.magnifierWidth = this.opt.magnifierWidth || 180;
				this.magnifierHeight = this.opt.magnifierHeight || 180;
				this.outerTop = this.opt.outerTop || 0;
				this.outerLeft = (this.opt.outerLeft || 20) + this.elemWidth;
				this.outerWidth = this.opt.outerWidth || 300;
				this.outerHeight = this.opt.outerHeight || 300;
			}
			this.maxX = this.elemWidth - this.magnifierWidth;
      this.maxY = this.elemHeight - this.magnifierHeight;
      this.hMagW = this.magnifierWidth / 2,
      this.hMagH = this.magnifierHeight / 2,
			this.createElement();
		},

		createElement: function () {
			let html = '<div class="J_myMagnifierWrap" \
                  style="position: relative;\
                  width: ' + this.elemWidth + 'px; \
                  height: ' + this.elemHeight + 'px; ">\
                  <img style="display:block; height: 100%" \
                  src="' + this.imgUrl + '" />\
                  <span class="J_myMagnifier" \
                  style="display: none; position: absolute; top: 0; left: 0; box-shadow: 0 0 8px 1px #ccc; cursor: move; overflow: hidden; \
                  width: ' + this.magnifierWidth + 'px; \
                  height: ' + this.magnifierHeight + 'px; ">\
                  <img class="J_myAbsImg" \
                  style="position: absolute; top: 0; left: 0; \
                  width: ' + this.elemWidth + 'px; \
                  height: ' + this.elemHeight + 'px"\
                  src="'+ this.imgUrl + '" />\
                  </span>\
                  </div>';
      this.elem.innerHTML = html;
		},

		getElement: function () {
      this.oMagnifierWrap = this.elem.querySelector('.J_myMagnifierWrap');
			this.oMagnifier = this.elem.querySelector('.J_myMagnifier');
			this.oAbsImg = this.elem.querySelector('.J_myAbsImg');
			if (this.mode === 'outer') {
        var oDiv = doc.createElement('div');

        oDiv.className = 'J_myOuterWrap';
        oDiv.style.cssText = 'display: none;position: absolute; border: 1px solid #ccc; overflow: hidden;\
          top:' + this.outerTop + 'px; \
          left:' + this.outerLeft + 'px; \
          width: ' + this.outerWidth + 'px; \
          height: ' + this.outerHeight + 'px; \
          ';
        this.oMagnifier.style.backgroundColor = 'rgba(0, 0, 0, .4)';
        this.oMagnifier.style.boxShadow = 'none';
        this.oAbsImg.style.width = this.elemWidth * this.scale + 'px';
        this.oAbsImg.style.height = this.elemHeight * this.scale + 'px';
        this.width = this.elemWidth * this.scale - this.outerWidth;
        this.height = this.elemHeight * this.scale - this.outerHeight;
        oDiv.appendChild(this.oAbsImg);
        this.oMagnifierWrap.appendChild(oDiv);
        this.oOuterWrap = this.elem.querySelector('.J_myOuterWrap');
			}
		},

		bindEvent: function () {
			addEvent(this.elem, 'mouseenter', this.enterWrap.bind(this));
		},

		magnifierStatus: function (status) {
			if (this.mode === 'inner') {
        this.oMagnifier.style.display = status ? 'block' : 'none';
			} else {
				if (status) {
					this.oMagnifier.style.display = 'block';
					this.oOuterWrap.style.display = 'block';
				} else {
					this.oMagnifier.style.display = 'none';
					this.oOuterWrap.style.display = 'none';
				}
			}
    },
    
		enterWrap: function () {
      addEvent(this.elem, 'mousemove', this._moveWrap);
			addEvent(this.elem, 'mouseleave', this._leaveWrap);
      this.magnifierStatus(true);
		},

		moveWrap: function (e) {
			var e = e || win.event,
          x = pagePos(e).x - elemPos(this.elem).left - this.hMagW,
          y = pagePos(e).y - elemPos(this.elem).top - this.hMagH;
          // x = e.offsetX - this.hMagW,
          // y = e.offsetY - this.hMagH;

			if (x <= 0) {
				x = 0;
			} else if (x >= this.maxX) {
				x = this.maxX;
			}

			if (y <= 0) {
				y = 0;
			} else if (y >= this.maxY) {
				y = this.maxY;
			}

			if (this.mode === 'inner') {
        this.oMagnifier.style.transform = 'translate(' + x + 'px, ' + y + 'px) scale(' + this.scale + ')';
        this.oAbsImg.style.transform = 'translate(-' + x + 'px, -' + y + 'px)';
			} else {
        this.oMagnifier.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        this.oAbsImg.style.transform = '\
          translate(\
            -' + (x / this.maxX * this.width) + 'px, \
            -' + (y / this.maxY * this.height) + 'px\
          )';
      }
		},

		leaveWrap: function () {
			removeEvent(this.elem, 'mousemove', this._moveWrap);
			removeEvent(this.elem, 'mouseleave', this._leaveWrap);
      this.magnifierStatus(false);
		}
	}

	return Magnifier;
})(document, window);


/**
 * @param {元素} wrap
 * @param {主菜单的类名} mainMenu
 * @param {主菜单子项的类名} mainItem
 * @param {子菜单的类名} subMenu
 * @param {子菜单子项的类名} subItem
 * @param {移入主菜单子项新增的类名} mainItemShow
 * @param {移入主菜单，子菜单新增的类名} subMenuShow
 * @param {移入主菜单子项，子菜单子项新增的类名} subItemShow
 */
var PredictedMenu = (function (win, doc) {
	var PredictedMenu = function (wrap, opt) {
		this.oWrap = doc.querySelector(wrap);
		this.oMainMenu = this.oWrap.getElementsByClassName(opt.mainMenu)[0];
		this.oMainItems = this.oWrap.getElementsByClassName(opt.mainItem);
		this.oSubMenu = this.oWrap.getElementsByClassName(opt.subMenu)[0];
		this.oSubItems = this.oWrap.getElementsByClassName(opt.subItem);
		this.mainItem = opt.mainItem;
		this.subItem = opt.subItem;
		this.subMenu = opt.subMenu;
		this.mainItemShow = opt.mainItemShow || 'cur';
		this.subItemShow = opt.subItemShow || 'active';
		this.subMenuShow = opt.subMenuShow || 'show';

		this.mousePos = [];
		this.isInSub = false;
		this.isFirstEnter = true;
		this.isLeave = false;
		this.t = null;
		this.t1 = null;
		this.toDelay = false;

		this._mouseMove = this.mouseMove.bind(this);
		this._leaveMenu = this.leaveMenu.bind(this);
		this._leaveSubmenu = this.leaveSubmenu.bind(this);
	}

	PredictedMenu.prototype = {
		init: function () {
			this.bindEvent();
		},

		bindEvent: function () {
			var _self = this;

			addEvent(this.oWrap, 'mouseenter', this.enterMenu.bind(this));
			addEvent(this.oSubMenu, 'mouseenter', this.enterSubmenu.bind(this));
			this.oMainItems.jForEach(function (val) {
				addEvent(val, 'mouseenter', _self.enterMianMenu.bind(_self));
			});
		},

		enterMenu: function () {
			this.oSubMenu.className += ' ' + this.subMenuShow;
			addEvent(doc, 'mousemove', this._mouseMove);
			addEvent(this.oWrap, 'mouseleave', this._leaveMenu);
		},

		enterSubmenu: function () {
			this.isInSub = true;
			addEvent(this.oSubMenu, 'mouseleave', this._leaveSubmenu);
		},

		mouseMove: function (e) {
			if (!this.isInSub) {
				var e = e || win.event;
				this.mousePos.push({
					x: pagePos(e).x,
					y: pagePos(e).y
				});
				this.mousePos.length > 2 && this.mousePos.shift();
			}
		},

		enterMianMenu: function (e) {
			var e = e || win.event,
					tar = e.target || e.srcElement,
					idx = [].indexOf.call(this.oMainItems, tar),
					mousePosLen = this.mousePos.length,
					last = this.mousePos[mousePosLen - 2] || { x: 0, y: 0 },
					cur = this.mousePos[mousePosLen - 1] || { x: 0, y: 0 },
					_self = this;

			this.isLeave = false;
			this.toDelay = this.doTimeout(cur, last);
			this.t && clearTimeout(this.t);
			if (this.isFirstEnter) {
				_self.showMenuItem(idx);
				this.isFirstEnter = false;
				return;
			}
			if (this.toDelay) {
				this.t = setTimeout(function () {
					if (!_self.isInSub) {
						_self.t1 = setTimeout(function () {
							_self.showMenuItem(idx);
							clearTimeout(_self.t1);
							_self.t1 = null;
						}, 80);
						_self.t = null;
					}
				}, 500);
				return;
			}
			this.t1 = setTimeout(function () {
				_self.showMenuItem(idx);
				clearTimeout(this.t1);
				this.t1 = null;
			}, 80);
		},

		doTimeout: function (cur, last) {
			var menuTop = elemPos(this.oWrap).top,
					menuLeft = elemPos(this.oWrap).left,
					menuW = getStyle(this.oWrap, 'width'),
					menuH = getStyle(this.oWrap, 'height');

			return pointInTriangle({
				topRightPoint: { x: menuLeft + menuW, y: menuTop },
				bottomRightPoint: { x: menuLeft + menuW, y: menuTop + menuH },
				lastPoint: last,
				curPoint: cur
			})
		},

		leaveMenu: function () {
			this.oSubMenu.className = this.subMenu;
			this.restoreMenuItems();
			removeEvent(doc, 'mousemove', this._mouseMove);
			removeEvent(this.oWrap, 'mouseleave', this._leaveMenu);
			this.isLeave = true;
		},

		leaveSubmenu: function () {
			this.isInSub = false;
			removeEvent(this.oSubMenu, 'mouseleave', this._leaveSubmenu);
		},

		showMenuItem: function (idx) {
			this.restoreMenuItems();
			if (!this.isLeave) {
				this.oMainItems[idx].className += ' ' + this.mainItemShow;
				this.oSubItems[idx].className += ' ' + this.subItemShow;
			}
		},

		restoreMenuItems: function () {
			var _self = this;
			this.oMainItems.jForEach(function (val) {
				val.className = _self.mainItem;
			});
			this.oSubItems.jForEach(function (val) {
				val.className = _self.subItem;
			});
		}
	}

	return PredictedMenu;
}(window, document))


/**
 * 五子棋
 * @param {元素} wrap
 * @param {两条线的间隔 - number} opt.gap
 * @param {棋子半径 - numebr} opt.radius
 */
var Gomoku = (function (doc) {
  var Gomoku = function (wrap, opt = {}) {
    this.wrap = doc.querySelector(wrap);
    this.oCanvas = doc.createElement('canvas');
    this.gap = opt.gap || 40;
    this.hGap = this.gap / 2;
    this.radius = opt.radius || 16;
    this.column = 15;
    this.size = this.gap * this.column;

    this.allChesses = [];
    this.existChesses = [];
    this.winsCount = 0;
    this.wins = [];
    this.myWins = [];
    this.computerWins = [];
    this.player = 1;

    this._moveFocus = throttle(this.moveFocus.bind(this), 300);
    this._leaveCanvas = this.leaveCanvas.bind(this);
  }

  Gomoku.prototype = {
    init: function () {
      this.initChess();
      this.bindEvent();
    },

    initChess: function () {
      this.oCanvas.width = this.size;
      this.oCanvas.height = this.size;
      this.oCanvas.style.cssText = 'background-color: #dab488; box-shadow: 0 0 4px 2px #ccc';
      this.wrap.appendChild(this.oCanvas);
      this.context = this.oCanvas.getContext('2d');
      this.makeBoard();
      this.computedArrs();
    },

    makeBoard: function () {
      this.context.clearRect(0, 0, this.size, this.size);
      this.context.beginPath();
      this.context.lineWidth = 1;
      this.context.strokeStyle = '#333';
      
      for (var i = 0; i < 15; i++) {
        this.context.moveTo(this.hGap + i * this.gap, this.hGap);
        this.context.lineTo(this.hGap + i * this.gap, this.size - this.hGap);
        this.context.moveTo(this.hGap, this.hGap + i * this.gap);
        this.context.lineTo(this.size - this.hGap, this.hGap + i * this.gap);
        this.context.stroke();
      }
    },

    computedArrs: function () {
      for (var i = 0; i < this.column; i++) {
        this.allChesses[i] = [];
        this.wins[i] = [];
        for (var j = 0; j < this.column; j++) {
          this.allChesses[i][j] = 0;
          this.wins[i][j] = [];
        }
      }

      this.ComputedWins();

      for (var k = 0; k < this.winsCount; k++) {
        this.myWins[k] = 0;
        this.computerWins[k] = 0;
      }
    },

    ComputedWins: function () {
      for (var i = 0; i < this.column; i++) {
        for (var j = 0; j < this.column - 4; j++) {
          for (var k = 0; k < 5; k++) {
            this.wins[i][j + k][this.winsCount] = true;
          }
          this.winsCount++;
        }
      }

      for (i = 0; i < this.column; i++) {
        for (j = 0; j < this.column - 4; j++) {
          for (k = 0; k < 5; k++) {
            this.wins[j + k][i][this.winsCount] = true;
          }
          this.winsCount++;
        }
      }

      for (i = 0; i < this.column - 4; i++) {
        for (j = 0; j < this.column - 4; j++) {
          for (k = 0; k < 5; k++) {
            this.wins[i + k][j + k][this.winsCount] = true;
          }
          this.winsCount++;
        }
      }

      for (i = this.column - 1; i >= 4; i--) {
        for (j = 0; j < this.column - 4; j++) {
          for (k = 0; k < 5; k++) {
            this.wins[i - k][j + k][this.winsCount] = true;
          }
          this.winsCount++;
        }
      }
    },

    bindEvent: function () {
      addEvent(this.oCanvas, 'click', this.canvasClick.bind(this));
      addEvent(this.oCanvas, 'mouseenter', this.enterCanvas.bind(this));
    },

    canvasClick: function (e) {
      var e = e || window.event,
          i = Math.floor(e.offsetX / this.gap),
          j = Math.floor(e.offsetY / this.gap);

          if (this.allChesses[j][i]) {
            return;
          }

          this.player = 1;
          this.dropChess(i, j);
          this.player = 2;
          this.t = setTimeout(function () {
            this.dropChess();
            clearTimeout(this.t);
          }.bind(this), 200);
    },

    dropChess: function (i, j) {
      switch (this.player) {
        case 1:
          this.makeChess(i * this.gap + this.hGap, j * this.gap + this.hGap, this.player);
          this.existChesses.push({x: i, y: j, player: this.player});
          this.allChesses[j][i] = this.player;
          this.checkWin(i, j, this.myWins);
          break;
        case 2:
          this.computerAI();
          break;
        default:
          break;
			}
			var flag = this.allChesses.jEvery(function (val) {
				if (val === 0) {
					return false;
				}
			});
			if (flag) {
				this.resetAllChess();
			}
    },

    computerAI: function (){
      var myScore = [],
          computerScore = [],
          max = 0
          u = 0,
          v = 0;
    
      for (var i = 0; i < this.column; i++){
        myScore[i] = [];
        computerScore[i] = [];
        for (var j = 0; j < this.column; j++){
          myScore[i][j] = 0;
          computerScore[i][j] = 0;
          if(this.allChesses[j][i] == 0){
            for (var k = 0; k < this.winsCount; k++){
              if(this.wins[i][j][k]){
                switch(this.myWins[k]){
                  case 1: myScore[i][j] += 200;
                    break;
                  case 2: myScore[i][j] += 500;
                    break;
                  case 3: myScore[i][j] += 2000;
                    break;
                  case 4: myScore[i][j] += 10000;
                    break;
                  default:
                    break;
                }
    
                switch(this.computerWins[k]){
                  case 1: computerScore[i][j] += 220;
                    break;
                  case 2: computerScore[i][j] += 520;
                    break;
                  case 3: computerScore[i][j] += 2200;
                    break;
                  case 4: computerScore[i][j] += 20000;
                    break;
                  default:
                    break;
                }
              }
            }

            if (myScore[i][j] > max){
              max = myScore[i][j];
              u = i;
              v = j;
            } else if(myScore[i][j] == max){
              if (computerScore[i][j] > computerScore[u][v]){
                u = i;
                v = j;
              }
            }

            //进攻
    
            if (computerScore[i][j] > max){
              max = computerScore[i][j];
              u = i;
              v = j;
            } else if (computerScore[i][j] == max){
              if (myScore[i][j] > myScore[u][v]){
                u = i;
                v = j;
              }
            }
          }
        }
      }
    
      this.makeChess(u * this.gap + this.hGap, v * this.gap + this.hGap, this.player);
      this.existChesses.push({x: u, y: v, player: this.player});
      this.allChesses[v][u] = this.player;
      this.checkWin(u, v, this.computerWins);
    },

    makeChess: function (x, y, player) {
      var grd = this.context.createRadialGradient(x - 3, y, 10, x + 6, y - 4, 0),
          startColor = '',
          endColor = '',
          strokeColor = '';

      if (player == 1) {
        startColor = '#0a0a0a';
        endColor = '#636766';
        strokeColor = '#333';
      } else if (player == 2) {
        startColor = '#d1d1d1';
        endColor = '#f9f9f9';
        strokeColor = '#ccc';
      }
      grd.addColorStop(0, startColor);
      grd.addColorStop(1, endColor);
      this.context.fillStyle = grd;
      this.context.strokeStyle = strokeColor;
      this.context.beginPath();
      this.context.arc(x, y, this.radius, 0, Math.PI * 2, false);
      this.context.fill();
      this.context.stroke();
    },

    checkWin: function (u, v, arr) {
      for(var k = 0; k < this.winsCount; k++){
        if(this.wins[u][v][k]){
          arr[k]++;
          if(arr[k] == 5){
            alert((this.player === 1 ? '~ You' : '~ Computer') + ' Win!');
            this.resetAllChess();
          }
        }
      }
    },

    resetAllChess: function () {
      this.allChesses = [];
      this.existChesses = [];
      this.winsCount = 0;
      this.wins = [];
      this.myWins = [];
      this.computerWins = [];
      this.player = 1;

      this.initBoard();
      this.computedArrs();
    },

    enterCanvas: function () {
      addEvent(this.oCanvas, 'mousemove', this._moveFocus);
      addEvent(this.oCanvas, 'mouseleave', this._leaveCanvas);
    },

    moveFocus: function (e) {
      var e = e || window.event,
          i = Math.floor(e.offsetX / this.gap),
          j = Math.floor(e.offsetY / this.gap);

      this.renderChess();
      if (!this.allChesses[j][i]) {
        this.context.beginPath();
        this.context.strokeStyle = '#f00';
        this.context.lineWidth = 5;
        this.context.lineCap = 'round';
        
        this.context.moveTo(i * this.gap + this.hGap - 12, j * this.gap + this.hGap);
        this.context.lineTo(i * this.gap + this.hGap + 12, j * this.gap + this.hGap);
        this.context.moveTo(i * this.gap + this.hGap, j * this.gap + this.hGap - 12);
        this.context.lineTo(i * this.gap + this.hGap, j * this.gap + this.hGap + 12);
        this.context.stroke();
      }
    },

    renderChess: function () {
      this.makeBoard();
      var len = this.existChesses.length,
          item = null;

      for (var i = 0; i < len; i++) {
        item = this.existChesses[i];
        this.makeChess(item.x * this.gap + this.hGap, item.y * this.gap + this.hGap, item.player);
      }
    },

    leaveCanvas: function () {
      removeEvent(this.oCanvas, 'mousemove', this._moveFocus);
      removeEvent(this.oCanvas, 'mouseleave', this._leaveCanvas);
      this.t = setTimeout(function () {
        this.renderChess();
        clearTimeout(this.t);
      }.bind(this), 300);
    }
  }

  return Gomoku;
})(document)



/**
 * 图片瀑布流
 * @param {元素} wrap
 * @param {地址} opt.url
 * @param {列数} opt.column
 * @param {图片间隙} opt.gap
 * @param {无限瀑布流} opt.infinity
 */
var Waterfall = (function(doc, win) {
  var t = null;
  var Waterfall = function(wrap, opt) {
    this.oWrap = doc.querySelector(wrap);
    this.column = opt.column || 6;
    this.gap = opt.gap || 10;
    this.API = opt.url;
    this.infinity = opt.infinity || false;

    this.pages = 0;
    this.curPage = 0;
    this.cache = [];
    this.idx = 0;
    this.heightArr = [];
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
        } else if (this.infinity){
          this.renderImgs(this.cache[this.idx]);
          this.idx = this.idx === this.pages - 1
                   ? 0
                   : this.idx + 1;
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
          var res = JSON.parse(data.pageData);
          _self.pages = data.pageSize;
          _self.renderImgs(res, curPage);
          _self.infinity && _self.cache.push(res);
        }
      });
    },

    renderImgs: function(data, curPage) {
      var _self = this,
					wrapWidth = getStyle(this.oWrap, 'width'),
					liWidth = Math.round(
						(wrapWidth - this.gap * (this.column - 1)) / this.column
					),
					liHeight = 0,
					oLi = null,
					oImg = null,
					minIdx = 0;

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
      this.curPage = 0;
      this.cache = [];
      this.idx = 0;
			this.getImgDatas(this.curPage);
		}
  };

  return Waterfall;
})(document, window);



/**
 * 渲染页脚
 * @param {dom} wrap
 * @param {当前页} opt.curPage
 * @param {总页数} opt.pages
 * @param {回调函数} opr.callback
 */
var PageList = (function (doc) {
	var PageList = function (wrap, opt) {
		this.wrap = doc.querySelector(wrap);
		this.curPage = opt.curPage || 1;
		this.pages = opt.pages || 0;
		this.callback = opt.callback || function () { };
	}

	PageList.prototype = {
		init: function () {
			this.initPageList();
			this.bindEvent();
		},

		initPageList: function () {
			var oDiv = doc.createElement('div');
			oDiv.className = 'page-list J_pageList';
			oDiv.innerHTML = this.renderPageList(this.curPage, this.pages);
			this.wrap.appendChild(oDiv);
			this.elem = doc.querySelector('.J_pageList');
		},

		bindEvent: function () {
			addEvent(this.elem, 'click', this.pageListClick.bind(this));
		},
		

		pageListClick: function (e) {
			var e = e || window.event,
					tar = e.target || e.srcElement,
					className = tar.className,
					curPage = this.curPage,
					pages = this.pages;
	
			if (className) {
				switch (className) {
					case 'page-btn':
						curPage = parseInt(tar.getAttribute('data-page'));
						this.elem.innerHTML = this.renderPageList(curPage, pages);
						this.callback && this.callback({curPage, pages});
						break;
					case 'backward-btn':
						curPage--;
						this.elem.innerHTML = this.renderPageList(curPage, pages);
						this.callback && this.callback({curPage, pages});
						break;
					case 'forward-btn':
						curPage++;
						this.elem.innerHTML = this.renderPageList(curPage, pages);
						this.callback && this.callback({curPage, pages});
						break;
					default:
						break;
				}
				this.curPage = curPage;
				this.pages = pages;
			}
		},

		makeBtns: function (start, end, curPage) {
			var list = '';
			for (var i = start; i <= end; i++) {
				list += this.pageBtnTpl('btn', i, curPage);
			}
			return list;
		},

		pageBtnTpl: function (type, num, cur, pages) {
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
		},

		renderPageList: function (curPage, pages) {
			if (pages <= 0) {
				return '';
			}

			if (pages == 1) {
				return this.pageBtnTpl('btn', 1, 1, 1);
			}

			var btnGroup = this.pageBtnTpl('backward', '', curPage);
			if (pages > 8) {
				if (curPage < 3) {
					btnGroup += this.makeBtns(1, 3, curPage) +
						this.pageBtnTpl('points') +
						this.makeBtns(pages - 1, pages, curPage);
				} else if (curPage >= 3 && curPage < 5) {
					btnGroup += this.makeBtns(1, curPage + 1, curPage) +
						this.pageBtnTpl('points') +
						this.makeBtns(pages - 1, pages, curPage);
				} else if (curPage == 5) {
					btnGroup += this.makeBtns(1, 2, curPage) +
						this.pageBtnTpl('points') +
						this.makeBtns(curPage - 1, curPage + 1, curPage) +
						this.pageBtnTpl('points') +
						this.makeBtns(pages - 1, pages, curPage);
				} else if (curPage >= 6 && curPage < pages - 4) {
					btnGroup += this.makeBtns(1, 2, curPage) +
						this.pageBtnTpl('points') +
						this.makeBtns(curPage - 2, curPage + 2, curPage) +
						this.pageBtnTpl('points') +
						this.makeBtns(pages - 1, pages, curPage);
				} else if (curPage == pages - 4) {
					btnGroup += this.makeBtns(1, 2, curPage) +
						this.pageBtnTpl('points') +
						this.makeBtns(curPage - 1, curPage + 1, curPage) +
						this.pageBtnTpl('points') +
						this.makeBtns(pages - 1, pages, curPage);
				} else if (curPage >= pages - 3 && curPage <= pages - 2) {
					btnGroup += this.makeBtns(1, 2, curPage) +
						this.pageBtnTpl('points') +
						this.makeBtns(curPage - 1, pages, curPage);
				} else if (curPage > pages - 2 && curPage <= pages) {
					btnGroup += this.makeBtns(1, 2, curPage) +
						this.pageBtnTpl('points') +
						this.makeBtns(pages - 2, pages, curPage);
				}
			} else {
				btnGroup += this.makeBtns(1, pages, curPage);
			}
			return btnGroup += this.pageBtnTpl('forward', '', curPage, pages);
		}
	}

	return PageList;
}(document));


/**
 * 圣杯模式
 * @param {模板} Origin 
 * @param {对象} Target 
 */
var inherit = (function () {
	function Buffer () { }
	return function (Origin, Target) {
		Buffer.prototype = Origin.prototype;
		Target.prototype = new Buffer();
		Target.prototype.constructor = Target;
		Target.prototype.uber = Origin.prototype;
		return Target;
	}
}());


/**
 * 图片懒加载
 * @param {图片元素集合} images
 */
var imgLazyLoad = (function (win, doc) {
	var imageItem = null,
			imagesLen = 0,
			cHeight = 0,
			sTop = 0,
			imageTop = 0,
			src = null,
			n = 0;

	return function (images) {
		imagesLen = images.length,
			cHeight = win.innerHeight || doc.documentElement.clientHeight || doc.body.clientHeight,
			sTop = win.pageYOffset || doc.body.scrollTop || doc.documentElement.scrollTop;

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
})(window, document);


/**
 * 封装AJAX
 * @param {xhr请求的url} opt.url
 * @param {xhr请求的方式} opt.type
 * @param {xhr同/异步} opt.async
 * @param {xhr返回的数据类型} opt.dataType
 * @param {xhr请求的数据} opt.data
 * @param {xhr的成功的回调} opt.success
 * @param {xhr的失败的回调} opt.error
 * @param {xhr的完成的回调} opt.complete
 */
var xhr = (function (doc, win) {
  var doAjax = function (opt) {
    var o = win.XMLHttpRequest
          ? new XMLHttpRequest
          : new ActiveXObject('Microsoft.XMLHTTP');
    if (!o) {
      throw new Error('您的浏览器暂不支持发起HTTP请求，请升级！');
    }

    var url = opt.url,
        type = (opt.type || 'GET').toUpperCase(),
        dataType = (opt.dataType || 'JSON').toUpperCase(),
        data = opt.data || null,
        jsonp = opt.jsonp || 'callback',
        jsonpCB = opt.jsonpCB || 'jQuery' + random() + '_' + new Date().getTime(),
        async = opt.async === false ? false : true,
        success = opt.success || function () {},
        error = opt.error || function () {},
        complete = opt.complete || function () {},
        timeout = opt.timoeut || 30000,

        timer = null;

      if (!url) {
        throw new Error('您没有填写URL！');
      }

      if (dataType === 'JSONP') {
        if (type !== 'GET') {
          console.warn('请求方式已修改为 type="GET"');
          type = 'GET';
        }
        var oS = doc.createElement('script');
        oS.src = url.indexOf('?') === -1
               ? url + '?' + jsonp + '=' + jsonpCB
               : url + '&' + jsonp + '=' + jsonpCB;

        doc.body.appendChild(oS);
        doc.body.removeChild(oS);
        win[jsonpCB] = function (data) {
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
          clearTimeout(timer);
          timer = null;
          o = null;
        }
			}
			
      o.open(type, url, async);
      type === 'POST' && o.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      o.send(type === 'POST' ? formatData(data) : null);

      timer = setTimeout(function () {
        o.abort();
        complete();
        clearTimeout(timer);
        timer = null;
        o = null;
      }, timeout);
  }

  function formatData (data) {
    var str = '';
    for (var prop in data) {
      str += prop + '=' + data[prop] + '&';
    }
    return str.replace(/&$/, '');
  }

  function random () {
    var str = '';
    for (var i = 0; i < 20; i ++) {
      str += Math.floor(Math.random() * 10);
    }
    return str;
  }

  return {
    ajax: function (opt) {
      doAjax(opt);
    },

    post: function (url, data, success) {
      doAjax({
        url: url,
        data: data,
        success: success
      })
    },

    get: function (url, success) {
      doAjax({
        url: url,
        success: success
      })
    }
  }
})(document, window);


/**
 * 跨域 domain + iframe
 * @param {基础域名} opt.baseDomain
 * @param {iframe的id值} opt.frameId
 * @param {ifrmae的url} opt.frameUrl
 * @param {xhr请求的url} opt.url
 * @param {xhr请求的方式} opt.type
 * @param {xhr同/异步} opt.async
 * @param {xhr返回的数据类型} opt.dataType
 * @param {xhr请求的数据} opt.data
 * @param {成功的回调} opt.success
 * @param {失败的回调} opt.error
 */
var ajaxDomain = (function (doc) {
	function createIframe (frameId, frameUrl) {
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
				async: opt.async,
				type: opt.type,
				dataType: opt.dataType,
				data: opt.data,
				success: opt.success,
				error: opt.error,
				complete: opt.complete
			})
		}
		doc.body.appendChild(frame);
	}
})(document);

/**
 * 跨域 window.name + iframe
 * @param {iframe的url} opt.iframeUrl
 * @param {跳转location} opt.location
 * @param {回调函数} opt.callback
 */
var xhrWindowName = (function (doc) {
  var flag = false,
      t = null;
  var getDatas = function (opt) {
    if (flag) {
      flag = false;
      opt.callback(JSON.parse(iframe.contentWindow.name));
    } else {
      flag = true;
      t = setTimeout(function () {
        iframe.contentWindow.location = opt.location;
        clearTimeout(t);
        t = null;
      }, 500);
    }
  }

  return function (opt) {
    var iframe = doc.createElement('iframe');
    iframe.src = opt.frameUrl;
    doc.body.appendChild(iframe);
    if (iframe.attachEvent) {
      iframe.attachEvent('onload', function () {
        getDatas(opt);
      });
    } else {
      iframe.onload = function () {
        getDatas(opt);
      };
    }
  }
})(document);


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

		get: function (key, callback) {
			var cookieStr = document.cookie;

			if (cookieStr) {
				var cookieArr = cookieStr.split('; '),
						item = null,
						tempArr = [];
				for (var prop in cookieArr) {
					if (cookieArr.hasOwnProperty(prop)) {
						item = cookieArr[prop];
						tempArr = item.split('=');
						if (tempArr[0] == key) {
							callback(tempArr[1]);
							return this;
						}
					}
				}
			}
			callback(undefined);
			return this;
		}
	}
}());


/**
 * 判断该点是否在△内
 */
var pointInTriangle = (function () {
	function vec (a, b) {
		return {
			x: b.x - a.x,
			y: b.y - a.y
		}
	}

	function vecProduct (v1, v2) {
		return v1.x * v2.y - v1.y * v2.x;
	}

	function sameSymbols (a, b) {
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




/**
 * let
 * 1、同一作用域下不可重复声明
 * 2、声明不会被提升，暂时性死区
 * 3、只在该作用域下生效
 */


/**
 * 箭头函数 =>
 * 1、this指向由外层作用域决定，this指向固化
 * 2、=> 不能作为构造函数来使用
 * 3、没有arguments对象，rest运算符代替
 * 4、在generator函数中，yield命令不能生效
 */



/**
 * Object.keys() 遍历自身可枚举、非Symbol属性键名，并返回返回一个数组
 * Object.values() 遍历自身可枚举、非Symbol属性键值，并返回一个数组
 * Object.entries() 遍历自身可枚举、非Symbol属性，并返回一个类数组
 * Object.getOwnPropertySymbols() 遍历自身Symbol属性，并返回一个数组
 * Object.assign() 合并（浅拷贝）非继承、可枚举的属性（含Symbol属性）
 * for in 遍历自身及继承的可枚举、非Symbol属性
 * for of 遍历迭代对象
 * JSON.stringify() 遍历自身可枚举属性
 */


/**
 * 拷贝对象
 * 1、深度克隆
 * 2、圣杯模式
 * 3、JSON.parse/JSON.stringify
 */



/**
 * 引起回流的因素：
 * 1、DOM节点的增删
 * 2、DOM节点位置
 * 3、DOM节点的尺寸
 * 4、DOM节点的显示与否（display）
 * 5、页面初始渲染
 * 6、向浏览器请求样式信息（client getComputedStyle currentStyle offset scroll）
 */