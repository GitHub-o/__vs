;
(function () {
	var listTpl = $get('#J_list-tpl').innerHTML,
			oSearchInputs = $get('input'),
			oSearchLists = $get('.search-list');

	function init () {
		bindEvent();
	}

	function bindEvent () {
		oSearchInputs.jForEach(function (val) {
			addEvent(val, 'input', debounce(searchKwChange, 500, false).bind(val));
		})
	}

	function searchKwChange () {
		var kw = trimSpace(this.value),
				kwLen = kw.length,
				oParent = this.parentNode.parentNode,
				thisList = $get('.search-list', oParent)[0];

		if (kwLen > 0) {
			thisList.className = 'search-list show';
			getSearchList(kw, this);
			return;
		}
		thisList.className = 'search-list';
		thisList.innerHTML = '';
	}

	function getSearchList (keyword, tar) {
		var idx = [].indexOf.call(oSearchInputs, tar),
				url = tar.getAttribute('data-url'),
				jsonp = tar.getAttribute('data-jsonp') || 'callback',
				lk = tar.getAttribute('data-lk'),
				id = tar.id,
				res,
				list = '';

		xhr.ajax({
			url: url + keyword,
			dataType: 'JSONP',
			jsonp: jsonp,
			success: function (data) {
				switch (id) {
					case 'J_tb-search':
						res = data.result;
						fn = function (value, keyword) {
							return {
								txt: setKwStyle(value[0], keyword),
								lk: lk + keyword
							}
						}
						break;
					case 'J_ht-search':
						res = data.data;
						fn = function (value) {
							return {
								txt: value.year + ' ' + setKwStyle(value.title, ''),
								lk: value.link
							}
						}
						break;
					case 'J_id-search':
						if (data.ckeck) {
							res = [{ addr: data.addr, date: data.date, sex: data.sex }];
							fn = function (value) {
								return {
									txt: setKwStyle(value.addr, '') + ' ' + value.date + ' ' + value.sex
								}
							}
						}
						break;
					case 'J_yd-search':
						res = data.translation;
						fn = function (value) {
							return {
								txt: value
							}
						}
						break;
					case 'J_bd-search':
						res = data.s;
						fn = function (value, keyword) {
							return {
								txt: setKwStyle(value, keyword),
								lk: lk + value
							};
						}
						break;
					case 'J_music-search':
						res = data.song_list;
						fn = function (value) {
							return {
								txt: setKwStyle(value.title, '') + ' ' + value.author
							}
						}
						break;
					default:
						break;
				}
				if (res) {
					res.jForEach(function (val) {
						list += this.replace(/{{(.*?)}}/g, function (node, key) {
							return fn(val, keyword)[key];
						});
					}, listTpl);
					oSearchLists[idx].innerHTML = list;
					res = '';
				}
			}
		})
	}

	function setKwStyle (value, kw) {
		return kw + '<span style="font-weight: bold">' + value.replace(kw, '') + '</span>';
	}

	init();
}())