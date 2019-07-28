; (function () {
	var oMainMenuList = $get('.J_main-menu-list')[0],
		mainMenuData = JSON.parse($get('#J_main-menu-data').innerHTML),
		mainMenuTpl = $get('#J_main-menu-tpl').innerHTML;

	function init () {
		renderMenuList();
	}

	function renderMenuList () {
		var list = '',
			count;
		mainMenuData.jForEach(function (val) {
			count = 0;
			list += this.replace(/{{(.*?)}}/g, function (node, key) {
				key === 'show' && count++;
				return replaceMainMenuValue(val, count)[key];
			});
		}, mainMenuTpl);
		oMainMenuList.innerHTML = list;
	}

	function replaceMainMenuValue (value, count) {
		return {
			menu_text_1: value.menu_text_1,
			menu_text_2: value.menu_text_2,
			menu_text_3: value.menu_text_3,
			menu_text_4: value.menu_text_4,
			show: count <= value.text_num ? 'show' : ''
		}
	}

	init();
}())

	; (function (win) {
		var PredictedMenu = function (opt) {
			this.oWrap = $get(opt.wrap)[0];
			this.oMainMenu = $get(opt.mainMenu, this.oWrap)[0];
			this.oMainItems = $get(opt.mainItem, this.oMainMenu);
			this.oSubMenu = $get(opt.subMenu, this.oWrap)[0];
			this.oSubItems = $get(opt.subItem, this.oSubMenu);
		}

		var mousePos = [],
			isInSub = false,
			isFirstEnter = true;
		isLeave = false,
			t = null,
			t1 = null,
			t2 = null,
			toDelay = false;

		PredictedMenu.prototype = {
			init: function () {
				this.bindEvent();
			},

			bindEvent: function () {
				var _self = this;

				addEvent(this.oWrap, 'mouseenter', this.enterMenu.bind(this));
				addEvent(this.oWrap, 'mouseleave', this.leaveMenu.bind(this));
				addEvent(this.oSubMenu, 'mouseenter', this.enterSubmenu);
				addEvent(this.oSubMenu, 'mouseleave', this.leaveSubmenu);
				this.oMainItems.jForEach(function (val) {
					addEvent(val, 'mouseenter', _self.enterMianMenu.bind(_self));
				});
			},

			enterMenu: function () {
				this.oSubMenu.className += ' show';
				addEvent(document, 'mousemove', this.mouseMove);
			},

			enterSubmenu: function () {
				isInSub = true;
			},

			mouseMove: function (e) {
				if (!isInSub) {
					var e = e || window.event;
					mousePos.push({
						x: pagePos(e).x,
						y: pagePos(e).y
					});
					mousePos.length > 2 && mousePos.shift();
				}
			},

			enterMianMenu: function (e) {
				var e = e || window.event,
					tar = e.target || e.srcElement,
					idx = [].indexOf.call(this.oMainItems, tar),
					mousePosLen = mousePos.length,
					last = mousePos[mousePosLen - 2] || { x: 0, y: 0 },
					cur = mousePos[mousePosLen - 1] || { x: 0, y: 0 },
					_self = this;

				isLeave = false;
				toDelay = this.doTimeout(cur, last);
				t && clearTimeout(t);
				if (isFirstEnter) {
					_self.showMenuItem(idx);
					isFirstEnter = false;
					return;
				}
				if (toDelay) {
					t = setTimeout(function () {
						if (isInSub) {
							return;
						}
						t1 = setTimeout(function () {
							_self.showMenuItem(idx);
							clearTimeout(t1);
							t1 = null;
						}, 80);
						t = null;
					}, 500);
					return;
				}
				t1 = setTimeout(function () {
					_self.showMenuItem(idx);
					clearTimeout(t1);
					t1 = null;
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
				this.oSubMenu.className = 'J_submenu-list submenu-list';
				this.restoreMenuItems();
				removeEvent(document, 'mousemove', this.mouseMove);
				isLeave = true;
			},

			leaveSubmenu: function () {
				isInSub = false;
			},

			showMenuItem: function (idx) {
				this.restoreMenuItems();
				if (!isLeave) {
					this.oMainItems[idx].className += ' active';
					this.oSubItems[idx].className += ' active';
				}
			},

			restoreMenuItems: function () {
				this.oMainItems.jForEach(function (val) {
					val.className = 'menu-item';
				});
				this.oSubItems.jForEach(function (val) {
					val.className = 'submenu-item';
				});
			}
		}

		win.PredictedMenu = PredictedMenu;
	}(window))