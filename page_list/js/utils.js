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

/**
 * 渲染翻页列表
 * @param {当前页} curPage
 * @param {总页数} pages
 */
var renderPageList = (function () {
	var list = '';

	function pageBtnTpl (type, num, cur, pages) {
		switch (type) {
			case 'btn':
				return num === cur
					? '<span class="cur-page">' + num + '</span>'
					: '<a class="page-btn" data-page=' + num + '>' + num + '</a>';
				break;
			case 'points':
				return '<span class="points">…</span>';
			case 'backward':
				return cur === 1
					? '<span class="disabled-btn">&lt;</span>'
					: '<a class="backward-btn">&lt;</a>';
			case 'forward':
				return cur === pages
					? '<span class="disabled-btn">&gt;</span>'
					: '<a class="forward-btn">&gt;</a>';
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