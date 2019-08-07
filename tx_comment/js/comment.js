var initComment = (function (doc) {
	var oCommentMod = $get('.J_comment-mod')[0],
			oStarsList = $get('.J_stars-list')[0],
			oHoverStars = $get('.J_hover-star', oStarsList),
			oStarTxt = $get('.J_star-txt')[0],
			oSubmitComBtn = $get('.J_submit-comment-btn')[0],
			oCommentTxt = $get('.J_comment-txt')[0],
			oCommentCount = $get('.J_txt-count')[0],
			oMainNavList = $get('.J_main-nav-list')[0],
			oMainNavItems = $get('.main-nav-item', oMainNavList),
			oPageItems = $get('.page-item'),
			oCommentRkList = $get('.J_comment-rank-list')[0],
			oCommentRkItems = $get('.comment-rank-item', oCommentRkList),
			oCommentRkCount = $get('.J_comment-rk-count'),
			oCommentList = $get('.J_comment-list')[0],
			commentListTpl = $get('#J_comment-list-tpl').innerHTML,
			oMesInfo = $get('.J_mes-info')[0],
			oLoading = $get('.loading-wrap')[0],
			oPersent = $get('.J_statics-persent')[0],
			oCommentTotal = $get('.J_comment-total')[0],
			oPageList = $get('.J_page-list')[0],
			oCommentTip = $get('.J_comment-tip')[0],

			isClickStar = false,
			starNum = 5,
			userId = null,
			field = 0,
			page = 0,
			t = null,
			t1 = null;

	var API = {
		getComments: 'http://localhost/api_for_study/Comment/getComments',
		submitComment: 'http://localhost/api_for_study/Comment/submitComment'
	}

	function comModStatus (status) {
		if (status) {
			if (!userId) {
				alert('登录后才可以评论😘');
				return;
			}
			oCommentMod.className += ' show';
		} else {
			oCommentMod.className = 'J_comment-mod comment-mod';
			restoreComMod();
		}
	}

	function mesInfoStatus (status) {
		oMesInfo.className = status ?
			'J_mes-info mes-info' :
			'J_mes-info mes-info hide';
	}

	function restoreItemsClass (items, className) {
		items.jForEach(function (val) {
			val.className = className;
		})
	}

	function docScroll () {
		var oImgs = doc.images;
		imgLazyLoad(oImgs)();
	}

	function mainNavListClick (e) {
		var e = e || window.event,
				tar = e.target || e.srcElement,
				className = tar.className;

		if (className === 'main-nav-item') {
			var idx = [].indexOf.call(oMainNavItems, tar);
			restoreItemsClass(oMainNavItems, 'main-nav-item');
			restoreItemsClass(oPageItems, 'page-item');
			tar.className += ' cur';
			oPageItems[idx].className += ' cur';
		}
	}

	function comRkListClick (e) {
		var e = e || window.event,
				tar = e.target || e.srcElement,
				className = tar.className;

		switch (className) {
			case 'comment-rank-item':
				field = tar.getAttribute('data-field');
				page = 0;
				restoreItemsClass(oCommentRkItems, 'comment-rank-item');
				tar.className += ' cur';
				getComment(field, page);
				break;
			case 'circle':
			case 'comment-rk-txt':
				var oParent = tar.parentNode,
					idx = [].indexOf.call(oCommentRkItems, oParent);

				field = oParent.getAttribute('data-field');
				page = 0;
				restoreItemsClass(oCommentRkItems, 'comment-rank-item');
				oCommentRkItems[idx].className += ' cur';
				getComment(field, page);
				break;
			default:
				break;
		}
	}

	function comModChange () {
		var txt = trimSpace(oCommentTxt.value),
				txtLen = txt.length;

		oCommentCount.innerText = txtLen;
		if (txtLen >= 15) {
			oSubmitComBtn.className += ' submit';
			addEvent(oSubmitComBtn, 'click', submitComment);
			return;
		}
		oSubmitComBtn.className = 'J_submit-comment-btn submit-comment-btn';
		removeEvent(oSubmitComBtn, 'click', submitComment);
	}

	function pageBtnClick (e) {
		var e = e || window.event,
				tar = e.target || e.srcElement,
				className = tar.className;

		switch (className) {
			case 'page-btn':
				page = parseInt(tar.getAttribute('data-page')) - 1;
				getComment(field, page);
				break;
			case 'forward-btn':
				page++;
				getComment(field, page);
				break;
			case 'backward-btn':
				page--;
				getComment(field, page);
				break;
			default:
				break;
		}
	}

	function getComment (field, page) {
		mCookie.get('userId', function (cookie) {
			userId = cookie ? cookie : null;
		});

		xhr.ajax({
			url: API.getComments,
			type: 'POST',
			data: {
				field: field,
				page: page
			},
			success: function (data) {
				oLoading.className += ' show';
				oCommentList.innerHTML = '';
				oPageList.innerHTML = '';
				mesInfoStatus(true);
				renderCommentList(data, page);
			},
			error: function () {
				alert('获取评论列表失败');
			}
		})
	}

	function renderCommentList (data, page) {
		t = setTimeout(function () {
			var res = data.res,
					commentNum = data.num,
					pages = data.pages;

			oLoading.className = 'J_loading-wrap loading-wrap';
			if (res && res.length > 0) {
				setPersent(commentNum);
				mesInfoStatus(false);
				oCommentList.innerHTML = renderListTpl(res);
				oPageList.innerHTML = renderPageList(page + 1, pages);
			} else {
				mesInfoStatus(true);
			}
			clearTimeout(t);
			t = null;
		}, 600);
	}

	function renderListTpl (res) {
		var list = '',
				num,
				count;
		res.jForEach(function (val) {
			count = 0;
			num = val.star_num;
			list += this.replace(/{{(.*?)}}/g, function (node, key) {
				key === 'active' && count++;
				return replaceCommentListValue(val, count, num)[key];
			})
		}, commentListTpl);
		return list;
	}

	function transferTime (time) {
		if (time.length === 10) {
			time += '000';
		}
		var d = new Date(parseInt(time)),
				year = d.getFullYear(),
				month = d.getMonth() + 1,
				date = d.getDate(),
				hours = d.getHours(),
				minutes = d.getMinutes();
		return year + '-' + month + '-' + date + '  ' + hours + ':' + minutes;
	}

	function setPersent (num) {
		num.jForEach(function (val, idx) {
			oCommentRkCount[idx].innerText = val;
		});
		oPersent.innerText = (num[1] / num[0] * 100).toFixed(1) + '%';
		oCommentTotal.innerText = num[0];
	}

	function replaceCommentListValue (value, count, total_num) {
		var add_comment = value.add_comment;

		return {
			avatar: value.avatar ? 'img/' + value.avatar : 'img/pure.jpg',
			nickname: value.nickname ? value.nickname : val.uptime,
			comment: value.comment,
			when: val.uptime,
			uptime: transferTime(value.uptime),
			active: count <= total_num ? 'active' : '',
			show: add_comment ? (add_comment.is_add_comment == 1 ? 'show' : '') : '',
			add_comment: add_comment ? add_comment.comment : '',
			add_uptime: add_comment ? transferTime(add_comment.uptime) : ''
		}
	}

	function submitComment () {
		var comment = trimSpace(oCommentTxt.value);
		xhr.ajax({
			url: API.submitComment,
			type: 'POST',
			data: {
				userId: userId,
				starNum: starNum,
				comment: comment
			},
			success: function (data) {
				if (data.error_code === '10010') {
					alert('已经评论过两次，无法再评论');
				} else if (data.res) {
					oCommentTip.className += ' show';
					t1 = setTimeout(function () {
						oCommentTip.className = 'J_comment-tip comment-tip';
						field = page = 0;
						getComment(field, page);
						clearTimeout(t1);
						t1 = null;
					}, 1500);
				}
				comModStatus(false);
			},
			error: function () {
				alert('评论失败，请重试');
			}
		})
	}

	function restoreComMod () {
		oCommentCount.innerText = 0;
		oCommentTxt.value = '';
		oSubmitComBtn.className = 'J_submit-comment-btn submit-comment-btn';
		oStarTxt.innerText = oHoverStars[4].getAttribute('data-text');
		oHoverStars.jForEach(function (val) {
			val.className = 'fa fa-star J_hover-star active';
		});
		isClickStar = false;
		starNum = 5;
		removeEvent(oSubmitComBtn, 'click', submitComment);
	}

	function setStarNum (e) {
		var e = e || window.event,
				tar = e.target || e.srcElement,
				tagName = tar.tagName.toLowerCase();

		if (tagName === 'i') {
			isClickStar = true;
			renderStarColor(tar);
		}
	}

	function enterStarsList () {
		addEvent(oStarsList, 'mousemove', moveInStarsList);
		addEvent(oStarsList, 'mouseleave', leaveStarsList);
	}

	function moveInStarsList (e) {
		if (isClickStar) {
			return;
		}
		var e = e || window.event,
			tar = e.target || e.srcElement,
			tagName = tar.tagName.toLowerCase();

		if (tagName === 'i') {
			renderStarColor(tar);
		}
	}

	function renderStarColor (tar) {
		var txt = tar.getAttribute('data-text');

		starNum = tar.getAttribute('data-count')
		oStarTxt.innerText = txt;
		oHoverStars.jForEach(function (val, idx) {
			val.className = 'fa fa-star J_hover-star';
			starNum > idx && (val.className += ' active');
		});
	}

	function leaveStarsList () {
		removeEvent(oStarsList, 'mousemove', moveInStarsList);
		removeEvent(oStarsList, 'mouseleave', leaveStarsList);
		if (!isClickStar) {
			oStarTxt.innerText = oHoverStars[4].getAttribute('data-text');
			oHoverStars.jForEach(function (val) {
				val.className = 'fa fa-star J_hover-star active';
			});
		}
	}

	return {
		docScroll: docScroll,
		comModStatus: comModStatus,
		comModChange: comModChange,
		enterStarsList: enterStarsList,
		setStarNum: setStarNum,
		mainNavListClick: mainNavListClick,
		comRkListClick: comRkListClick,
		pageBtnClick: pageBtnClick,
		getComment: getComment
	}

}(document));