; (function (doc, win) {
	var oNavList = $get('.J_nav-list')[0],
			oNavItems = $get('.nav-item', oNavList),
			oSearchRow = $get('.J_search-row')[0],
			oSearchInput = $get('#J_search-input'),
			oNoDataRow = $get('.J_no-data-row')[0],
			oCourseList = $get('.J_course-list')[0],
			oPageRow = $get('.J_page-row')[0],
			oPageList = $get('.J_page-list')[0],
			oAllCourseInputs = $get('.J_course-name-input'),
			oAllCourseSpans = $get('.J_course-name'),

			courseListTpl = $get('#J_course-list-tpl').innerHTML,
			pageListTpl = $get('#J_page-list-tpl').innerHTML,

			field = 'manage',
			pageNum = 0,
			id = 0,
			idx = -1;

	var API = {
		getCourseList: 'http://localhost/api_for_study/List/getCourseListForManage',
		searchCourseList: 'http://localhost/api_for_study/List/getSearchListForManage',
		doListItem: 'http://localhost/api_for_study/List/doListItemForManage',
		updateCourse: 'http://localhost/api_for_study/List/updateCourseNameForManage'
	}

	function init () {
		bindEvent();
		getCourseList(field, pageNum);
	}

	function bindEvent () {
		addEvent(oSearchInput, 'input', throttle(searchCourse, 800));
		addEvent(oNavList, 'click', throttle(navListClick, 1000));
		addEvent(oPageList, 'click', pageListClick);
		addEvent(oCourseList, 'click', courseListClick);
	}

	function searchCourse () {
		var kw = trimSpace(this.value),
				kwLen = kw.length;

		if (kwLen > 0) {
			getSearchCourse(kw);
			return;
		}
		noDataRowStatus(true);
	}

	function courseListClick (e) {
		var e = e || win.event,
				tar = e.target || e.srcElement,
				type = tar.getAttribute('data-type');

		if (type) {
			var itemId = tar.getAttribute('data-id');
			switch (type) {
				case 'course-name-input':
					stopBubble(e);
					break;
				case 'remove':
				case 'regain':
					stopBubble(e);
					doListItem({
						type: type,
						pageNum: pageNum,
						itemId: itemId
					});
					break;
				case 'course-name':
					var parent = tar.parentNode,
						oCourseInput = $get('.course-name-input', parent)[0],
						text = tar.innerText,
						textLen = text.length;

					stopBubble(e);
					id = tar.getAttribute('data-id');
					idx = [].indexOf.call(oAllCourseSpans, tar);
					restoreCourseInput(true);
					tar.className += ' hide';
					oCourseInput.className += ' show';
					oCourseInput.focus();
					oCourseInput.value = text;
					oCourseInput.setSelectionRange(0, textLen);
					addEvent(doc, 'click', updateCourse);
					addEvent(doc, 'keyup', updateCourse);
					break;
				default:
					break;
			}
		}
	}

	function updateCourse (e) {
		var e = e || win.event,
				type = e.type,
				newVal = oAllCourseInputs[idx].value,
				text = oAllCourseSpans[idx].innerText,
				c;

		if (newVal !== text) {
			if (type === 'keyup') {
				if (e.keyCode === 13) {
					c = confirm('确定修改该课程');
					c ? submitCourseName(newVal)
						: restoreCourseInput();
				}
				return;
			}
			c = confirm('确定修改该课程');
			c ? submitCourseName(newVal)
				: restoreCourseInput();
		} else {
			if (type === 'keyup') {
				if (e.keyCode === 13) {
					restoreCourseInput();
				}
				return;
			}
			restoreCourseInput();
		}
	}

	function submitCourseName (newVal) {
		xhr.ajax({
			url: API.updateCourse,
			type: 'POST',
			data: {
				itemId: id,
				newVal: newVal
			},
			success: function (data) {
				if (data === 'success') {
					oAllCourseSpans[idx].innerText = newVal;
				}
				oAllCourseSpans[idx].className = 'J_course-name course-name';
				oAllCourseInputs[idx].className = 'J_course-name-input course-name-input';
				id = 0;
				idx = -1;
			},
			error: function () {
				alert('操作失败，请重试');
				id = 0;
				idx = -1;
			}
		})
	}

	function restoreCourseInput () {
		oAllCourseInputs.jForEach(function (val) {
			val.className = 'J_course-name-input course-name-input';
			val.blur();
		});
		oAllCourseSpans.jForEach(function (val) {
			val.className = 'J_course-name course-name';
		});
		if (!arguments[0]) {
			removeEvent(doc, 'click', updateCourse);
			removeEvent(doc, 'keyup', updateCourse);
		}
	}

	function doListItem (data) {
		xhr.ajax({
			url: API.doListItem,
			type: 'POST',
			data: data,
			success: function (data) {
				var res = data.res,
					pages = data.pages;
				renderCourseList(field, res, pageNum, pages);
			}
		})
	}

	function navListClick (e) {
		var e = e || win.event,
				tar = e.target || e.srcElement,
				parent = tar.parentNode,
				className = parent.className;

		stopBubble(e);
		if (className === 'nav-item') {
			field = parent.getAttribute('data-field');
			oNavItems.jForEach(function (val) {
				val.className = 'nav-item';
			});
			parent.className += ' cur';
			navItemOperation(field);
		}
	}

	function navItemOperation (field) {
		if (field === 'search') {
			oCourseList.innerHTML = '';
			pageNum = 0;
			searchRowStatus(true);
			noDataRowStatus(true);
			pageRowStatus(false);
			return;
		}
		getCourseList(field, pageNum);
	}

	function getSearchCourse (keyword) {
		xhr.ajax({
			url: API.searchCourseList,
			type: 'POST',
			data: {
				keyword: keyword
			},
			success: function (data) {
				var res = data.res,
					pages = data.pages;
				renderCourseList(field, res, pageNum, pages);
			},
			error: function () {
				alert('操作失败，请重试');
			}
		})
	}

	function pageListClick (e) {
		var e = e || win.event,
				tar = e.target || e.srcElement,
				parent = tar.parentNode,
				className = parent.className;

		stopBubble(e);
		if (className === 'page-item') {
			var parent = tar.parentNode,
				num = parent.getAttribute('data-page') - 1;

			getCourseList(field, num);
		}
	}

	function getCourseList (field, pageNum) {
		searchRowStatus(false);

		xhr.ajax({
			url: API.getCourseList,
			type: 'POST',
			data: {
				field: field,
				pageNum: pageNum
			},
			success: function (data) {
				var res = data.res,
					pages = data.pages;
				renderCourseList(field, res, pageNum, pages);
			},
			error: function () {
				alert('操作失败，请重试');
			}
		})
	}

	function renderCourseList (field, data, pageNum, pages) {
		if (data && data.length > 0) {
			render({
				data: data,
				tpl: courseListTpl,
				wrap: oCourseList,
				value: replaceCourseValue
			});
			noDataRowStatus(false);
			renderPageList(pages, pageNum);
			return;
		}
		noDataRowStatus(true);
		pageRowStatus(false);
	}

	function renderPageList (pages, pageNum) {
		if (pages && pages > 1) {
			var list = '';
			for (var i = 0; i < pages; i++) {
				list += pageListTpl.replace(/{{(.*?)}}/g, function (node, key) {
					return {
						cur: i === pageNum ? ' cur' : '',
						pageNum: i + 1
					}[key];
				})
			}
			oPageList.innerHTML = list;
			pageRowStatus(true);
			return;
		}
		pageRowStatus(false);
	}

	function replaceCourseValue (value) {
		return {
			id: value.id,
			course: value.course,
			hour: value.hour,
			teacher: value.teacher,
			field: value.field,
			textType: field === 'trash' ? '恢复' : '删除',
			type: field === 'trash' ? 'regain' : 'remove'
		}
	}

	function searchRowStatus (status) {
		if (status) {
			oSearchRow.className += ' show';
			oSearchInput.focus();
		} else {
			oSearchRow.className = 'J_search-row search-row';
			oSearchInput.value = '';
			oSearchInput.blur();
		}
	}

	function noDataRowStatus (status) {
		if (status) {
			oNoDataRow.className = 'J_no-data-row no-data-row show';
			oCourseList.innerHTML = '';
		} else {
			oNoDataRow.className = 'J_no-data-row no-data-row';
		}
	}

	function pageRowStatus (status) {
		if (status) {
			oPageRow.className = 'J_page-row page-row show';
		} else {
			oPageRow.className = 'J_page-row page-row';
			oPageList.innerHTML = '';
		}
	}

	init();
}(document, window))