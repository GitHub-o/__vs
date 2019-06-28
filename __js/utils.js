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

function render(opt) {
	var list = '';
	opt.data.jForEach(function (val, idx, arr) {
		list += this.replace(regTpl(), function (node, key) {
			return opt.value(val, idx, arr)[key];
		})
	}, opt.tpl);

	return opt.wrap ? opt.wrap.innerHTML = list :  list;
}


