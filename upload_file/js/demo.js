; (function (doc) {
	var oOpenModBtn = doc.querySelector('.J_open-mod-btn'),
			oCloseModBtn = doc.querySelector('.J_close-mod-btn'),
			oUploadModMask = doc.querySelector('.J_upload-mask'),
			oUploadArea = doc.querySelector('.J_upload-area'),
			oProgressBar = doc.querySelector('.J_progress-bar'),
			oPersent = doc.querySelector('.J_persent'),
			oFile = doc.querySelector('#J_file'),
			oFileInfo = doc.querySelector('.J_upload-file-info'),
			oFileName = doc.querySelector('.J_file-name'),
			oFileSize = doc.querySelector('.J_file-size'),
			oBtnGroup = doc.querySelector('.J_btn-group'),
			oBtns = oBtnGroup.querySelectorAll('btn'),

			maxSize = 3221225472,
			isUploadFile = true,
			o = null;

	function init () {
		bindEvent();
	}

	function bindEvent () {
		addEvent(oOpenModBtn, 'click', uploadModStatus.bind(null, true));
		addEvent(oCloseModBtn, 'click', uploadModStatus.bind(null, false));
		addEvent(oBtnGroup, 'click', uploadBtnClick);
		addEvent(oFile, 'change', fileChange);
		addEvent(oFile, 'propertychange', fileChange);
	}

	function fileChange () {
		if (this.files.length <= 0) {
			return;
		}
		var file = this.files[0],
			fileLen = file.length,
			fileName = file.name,
			fileSize = file.size,
			type = file.type;

		fileSize = fileSize > 1048576
			? (fileSize / maxSize * 3).toFixed(2) + 'GB'
			: (fileSize / 1024).toFixed(2) + 'KB';

		if (!(/mp4/g).test(type)) {
			alert('上传的文件必须为『mp4』格式');
		} else if (fileLen > 1) {
			alert('每次最多只可上传一个视频');
		} else if (fileSize > maxSize) {
			alert('该视频超过最大限制（3G）');
		} else {
			oFileInfo.className += ' show';
			oBtnGroup.className += ' show';
			oFileName.innerText = fileName;
			oFileSize.innerText = fileSize;
		}
	}

	function uploadBtnClick (e) {
		var e = e || window.event,
				tar = e.target || e.srcElement,
				type = tar.getAttribute('data-type'),
				file = oFile.files[0];
		
		if (!o) {
			o = window.XMLHttpRequest
				? new XMLHttpRequest
				: new ActiveXObject('Microsoft.XMLHTTP');

			o.onabort = function () {
				restoreUploadMod();
			}
		}

		if (type) {
			switch (type) {
				case 'upload':
					uploadFile(o, file, tar);
					break;
				case 'abort':
					o.abort();
					break;
				default:
					break;
			}
		}
	}

	function uploadFile (o, file, tar) {
		if (isUploadFile) {
			var fd = new FormData();

			fd.append('file', file);
			oUploadArea.className = 'J_upload-area upload-area uploading';
			tar.innerText = '上传中…';
			tar.className += ' disabled';
			oBtns[1].className += ' show';
			o.open('POST', 'server/upload.php');
			o.upload.onprogress = function (e) {
				var e = e || window.event,
						persent = (e.loaded / e.total * 100).toFixed(1) + '%';
				oProgressBar.style.width = persent;
				oPersent.innerText = persent;
			}
			o.onload = function () {
				oUploadArea.className = 'J_upload-area upload-area uploading finished';
				tar.innerText = '继续上传';
				tar.className = 'btn upload-btn';
				oBtns[1].className = 'btn abort-btn';
				isUploadFile = false;
			}
			o.send(fd);
		} else {
			oFile.click();
			restoreUploadMod();
		}
	}

	function uploadModStatus (status) {
		if (status) {
			oUploadModMask.className += ' show';
		} else {
			oUploadModMask.className = 'J_upload-mask upload-mask';
			restoreUploadMod();
		}
	}

	function restoreUploadMod () {
		oFileInfo.className = 'J_upload-file-info upload-file-info';
		oBtnGroup.className = 'J_btn-group btn-group';
		oUploadArea.className = 'J_upload-area upload-area btn';
		oFileName.innerText = '';
		oFileSize.innerText = '';
		oPersent.innerText = '0.0%';
		oProgressBar.style.width = 0;
		oBtns[0].innerText = '上传文件';
		oBtns[0].className = 'btn upload-btn';
		oBtns[1].className = 'btn abort-btn';
		isUploadFile = true;
		o && o.abort();
		o = null;
	}

	init();
}(document));