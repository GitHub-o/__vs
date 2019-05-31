;(function() {
      var oOpenModBtn = $get('.J_open-mod-btn')[0],
            oCloseModBtn = $get('.J_close-mod-btn')[0],
            oUploadModMask = $get('.J_upload-mask')[0],
            oUploadArea = $get('.J_upload-area')[0],
            oProgressBar = $get('.J_progress-bar')[0],
            oPersent = $get('.J_persent')[0],
            oFile = $get('#J_file'),
            oFileInfo = $get('.J_upload-file-info')[0],
            oFileName = $get('.J_file-name')[0],
            oFileSize = $get('.J_file-size')[0],
            oBtnGroup = $get('.J_btn-group')[0],
            oBtns = $get('button', oBtnGroup),

            maxSize = 3221225472,
            isUploadFile = true;

      function init() {
            bindEvent();
      }

      function bindEvent() {
            addEvent(oOpenModBtn, 'click', uploadModStatus.bind(null, true));
            addEvent(oCloseModBtn, 'click', uploadModStatus.bind(null, false));
            addEvent(oBtnGroup, 'click', uploadBtnClick);
            addEvent(oFile, 'change', fileChange);
            addEvent(oFile, 'propertychange', fileChange);
      }

      function fileChange() {
            if(this.files.length <= 0) {
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

            if(!(/mp4/g).test(type)) {
                  alert('上传的文件必须为『mp4』格式');
                  return;
            }else if(fileLen > 1) {
                  alert('每次最多只可上传一个视频');
                  return;
            }else if(fileSize > maxSize) {
                  alert('该视频超过最大限制（3G）');
                  return;
            }else {
                  oFileInfo.className += ' show';
                  oBtnGroup.className += ' show';
                  oFileName.innerText = fileName;
                  oFileSize.innerText = fileSize;
            }
      }

      function uploadBtnClick(e) {
            var e = e || window.event,
                  tar = e.target || e.srcElement,
                  type = tar.getAttribute('data-type'),
                  file = oFile.files[0];

            if(type) {
                  switch(type) {
                        case 'upload':
                              if(isUploadFile) {
                                    uploadFile(file, tar);
                              }else {
                                    oFile.click();
                                    restoreUploadMod();
                              }
                              break;
                        case 'abort':
                              break;
                        default:
                              break;
                  }
            }
      }

      function uploadFile(file, tar) {
            var fd = new FormData(),
                  o = window.XMLHttpRequest
                     ? new window.XMLHttpRequest()
                     : new ActiveXObject('Microsoft.XMLHTTP');

            isUploadFile = false;
            fd.append('file', file);
            oUploadArea.className = 'J_upload-area upload-area uploading';
            tar.innerText = '上传中…';
            o.open('POST', 'server/upload.php');
            o.upload.onprogress = function(e) {
                  var e = e || window.event,
                        persent = (e.loaded / e.total * 100).toFixed(1) + '%';
                  oProgressBar.style.width = persent;
                  oPersent.innerText = persent;
            }
            o.onload = function() {
                  oUploadArea.className = 'J_upload-area upload-area uploading finished';
                  tar.innerText = '继续上传';
            }
            o.send(fd);
      }

      function uploadModStatus(status) {
            if(status) {
                  oUploadModMask.className += ' show';
            }else {
                  oUploadModMask.className = 'J_upload-mask upload-mask';
                  restoreUploadMod();
            }
      }

      function restoreUploadMod() {
            oFileInfo.className = 'J_upload-file-info upload-file-info';
            oBtnGroup.className = 'J_btn-group btn-group';
            oUploadArea.className = 'J_upload-area upload-area btn';
            oFileName.innerText = '';
            oFileSize.innerText = '';
            oPersent.innerText = '0.0%';
            oProgressBar.style.width = 0;
            oBtns[0].innerText = '上传文件';
            isUploadFile = true;
      }

      init();
} ())