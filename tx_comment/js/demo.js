;(function(doc, Hd, Login, Register, Comment) {
	var oUserStatus = $get('.J_user-status')[0],
			oPersisted = $get('.J_persisted')[0],
			authUrl = oPersisted.getAttribute('data-value'),
			oUserStatus = $get('.J_user-status')[0],
			loginInTpl = $get('#J_login-in').innerHTML,
			loginOutTpl = $get('#J_login-out').innerHTML,
			
			oModMask = $get('.J_mod-mask')[0],
			oModeHd = $get('.J_mode-hd')[0],
			oLoginBtn = $get('.J_login-btn')[0],
			oRegisterWrap = $get('.J_register-wrap')[0],
			oAllInputs = $get('input', oModMask),
			oErrorTip = $get('.J_error-tip')[0],

			oOpenComModBtn = $get('.J_open-comment-btn')[0],
			oCloseComModBtn = $get('.J_close-comment-btn')[0],
			oStarsList = $get('.J_stars-list')[0],
			oCommentTxt = $get('.J_comment-txt')[0],
			oCommentRkList = $get('.J_comment-rank-list')[0],
			oMainNavList = $get('.J_main-nav-list')[0],
			oPageList = $get('.J_page-list')[0],

			oImgs = doc.images,

			field = 0,
			page = 0;

	function init() {
		bindEvent();
		checkAuth();
		Comment.getComment(field, page);
		imgLazyLoad(oImgs)();
	}

	function bindEvent() {
		addEvent(oUserStatus, 'click', restoreUserStatus);
		addEvent(oModeHd, 'click', ttLkClick);
		addEvent(oLoginBtn, 'click', Login.submitBtnClick);
		addEvent(oRegisterWrap, 'click', Register.regBdClick);
		oAllInputs.jForEach(function(val) {
					addEvent(val, 'click', hideErrorTip);
		});
		addEvent(doc, 'scroll', throttle(Comment.docScroll, 800));
		addEvent(oOpenComModBtn, 'click', Comment.comModStatus.bind(null, true));
		addEvent(oCloseComModBtn, 'click', Comment.comModStatus.bind(null, false));
		addEvent(oStarsList, 'mouseenter', Comment.enterStarsList);
		addEvent(oStarsList, 'click', Comment.setStarNum);
		addEvent(oCommentTxt, 'input', Comment.comModChange);
		addEvent(oMainNavList, 'click', Comment.mainNavListClick);
		addEvent(oCommentRkList, 'click', Comment.comRkListClick);
		addEvent(oPageList, 'click', Comment.pageBtnClick);
	}

	function ttLkClick(e) {
		var e = e || window.event,
					tar = e.target || e.srcElement,
					className = tar.className;

		if (className === 'tt-lk') {
					var type = tar.getAttribute('data-type');
					oErrorTip.innerText = '';
					type && Hd.headClick();
		} else if (className === 'fa fa-times') {
					oModMask.className = 'J_mod-mask mod-mask';
					oErrorTip.innerText = '';
					Register.restoreModStatus();
		}
	}

	function hideErrorTip() {
		oErrorTip.innerText = '';
	}

	function checkAuth() {
		mCookie.get('auth', function(cookie) {
			if(cookie) {
				xhr.ajax({
					url: authUrl,
					type: 'POST',
					data: {
								auth: cookie
					},
					success: function(data) {
						var code = data.error_code,
									errorInfo = '';
						switch(code) {
							case '1006':
								errorInfo = '登录验证不通过，请重试';
								modStatus(true);
								renderUserStatus(false);
								break;
							case '1007':
								errorInfo = '登录已过期，请重试';
								modStatus(true);
								renderUserStatus(false);
								break;
							case '200':
								renderUserStatus(true);
								modStatus(false);
								break;
							default:
										break;
						}
						oErrorTip.innerText = errorInfo;
					}
				})
			}
		});
	}

	function renderUserStatus(flag) {
		if(flag) {
			mCookie.get('nickname', function(cookie) {
				oUserStatus.innerHTML = loginOutTpl.replace(/{{(.*?)}}/g, decodeURI(cookie));
			});
	}else {
			oUserStatus.innerHTML = loginInTpl;
		}
	}

	function modStatus(status) {
				oModMask.className = status
			 ? 'J_mod-mask mod-mask show login'
			 : 'J_mod-mask mod-mask';
	}

	function restoreUserStatus() {
		Hd.headClick();
		Comment.getComment(field, page);
	}

	init();

} (document, initHeader, initLogin, initRegister, initComment));