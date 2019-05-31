var initHeader = (function () {
      var oModeMask = $get('.J_mod-mask')[0],
            oModeTtLk = $get('.tt-lk'),
            
            t = null;

      function headClick(e) {
            var e = e || window.event,
                  tar = e.target || e.srcElement,
                  type = tar.getAttribute('data-type');

            type && modStatus(type);
      }

      function modStatus(type) {
            oModeTtLk.jForEach(function (val) {
                  val.className = 'tt-lk';
            });
            switch (type) {
                  case 'login':
                        oModeMask.className = 'J_mod-mask mod-mask show login';
                        oModeTtLk[0].className += ' cur';
                        break;
                  case 'register':
                        oModeMask.className = 'J_mod-mask mod-mask show register';
                        oModeTtLk[1].className += ' cur';
                        break;
                  default:
                        break;
            }
      }

      return {
            headClick: headClick,
            modStatus: modStatus
      }
}());

var initLogin = (function () {
      var oErrorTip = $get('.J_error-tip')[0],
            loginUrl = $get('#J_login-form').action,
            oAdmin = $get('#J_admin'),
            oPwd = $get('#J_password'),
            oPersisted = $get('.J_persisted')[0],

            t = null,
            t1 = null;

      function restoreLoginModStatus() {
            oAdmin.value = oPwd.value = '';
            oPersisted.checked = false;
      }

      function submitBtnClick() {
            var adminVal = trimSpace(oAdmin.value),
                  pwdVal = trimSpace(oPwd.value);

            if (adminVal.length < 6 || adminVal.length > 20) {
                  oErrorTip.innerText = '用户名长度为 6-20 位';
                  return;
            } else if (pwdVal.length < 6 || pwdVal.length > 20) {
                  oErrorTip.innerText = '密码长度为 6-20 位';
                  return;
            } else {
                  submitLoginForm({
                        username: adminVal,
                        password: pwdVal,
                        isPersistedLogin: oPersisted.checked
                  });
            }
      }

      function submitLoginForm(data) {
            xhr.ajax({
                  url: loginUrl,
                  type: 'POST',
                  data: data,
                  success: function (data) {
                        var code = data.error_code,
                              errorInfo = '';
                        switch (code) {
                              case '1001':
                                    errorInfo = '用户名长度为6-20位';
                                    break;
                              case '1002':
                                    errorInfo = '密码长度为6-20位';
                                    break;
                              case '1003':
                                    errorInfo = '用户名不存在';
                                    break;
                              case '1004':
                                    errorInfo = '密码不正确';
                                    break;
                              case '1005':
                                    errorInfo = '登录失败，请重试';
                                    break;
                              case '200':
                                    errorInfo = '登录成功';
                                    oErrorTip.className += ' success';
                                    t = setTimeout(function() {
                                          location.reload();
                                          clearTimeout(t);
                                          t = null;
                                          t1 = setTimeout(function() {
                                                oErrorTip.className = 'J_error-tip error-tip';
                                                clearTimeout(t1);
                                                t1 = null;
                                          }, 300);
                                    }, 500);
                                    break;
                        }
                        oErrorTip.innerText = errorInfo;
                  }
            })
      }

      return {
            restoreLoginModStatus: restoreLoginModStatus,
            submitBtnClick: submitBtnClick
      }
}());

var initRegister = (function (Login) {
      var oErrorTip = $get('.J_error-tip')[0],
            registerUrl = $get('#J_register-form').action,
            oHandphone = $get('#J_handphone'),
            oSPwd = $get('#J_spassword'),
            oHpcode = $get('#J_hdcode'),
            oImgcode = $get('#J_imgcode'),
            oHpcodeBtn = $get('.J_hdcode-btn')[0],
            oImgcodeBtn = $get('.J_imgcode-btn')[0],
            sendHpcodeUrl = oHpcodeBtn.value,

            isSend = true,
            s = 60,
            os = 60,
            t = null,
            timer = null,
            t1 = null;

      function regBdClick(e) {
            var e = e || window.event,
                  tar = e.target || e.srcElement,
                  type = tar.getAttribute('data-type');

            type && multiOperation(type);
      }

      function multiOperation(type) {
            switch (type) {
                  case 'send-hpcode':
                        var val = trimSpace(oHandphone.value),
                              valLen = val.length;
                        if (valLen !== 11) {
                              oErrorTip.innerText = '手机号长度为11位';
                              return;
                        } else {
                              if (isSend) {
                                    oHpcodeBtn.innerHTML = '<i class="fa fa-spin fa-spinner"></i>';
                                    sencode(val);
                              }
                        }
                        break;
                  case 'imgcode':
                        refreshImgcode(oImgcodeBtn);
                        break;
                  case 'register':
                        var hpVal = trimSpace(oHandphone.value),
                              sPwdVal = trimSpace(oSPwd.value),
                              hpcodeVal = trimSpace(oHpcode.value),
                              imgcodeVal = trimSpace(oImgcode.value);

                        if (hpVal.length < 6 || hpVal.length > 20) {
                              oErrorTip.innerText = '手机号长度为 6- 20 位';
                              return;
                        } else if (!phoneNumberCheck(hpVal)) {
                              oErrorTip.innerText = '手机号不存在';
                              return;
                        } else if (sPwdVal.length < 6 || sPwdVal.length > 20) {
                              oErrorTip.innerText = '密码长度为 6- 20 位';
                              return;
                        } else if (hpcodeVal.length !== 6) {
                              oErrorTip.innerText = '短信验证码长度为 6 位';
                              return;
                        } else if (!digitCheck(hpcodeVal)) {
                              oErrorTip.innerText = '短信验证码为数字';
                              return;
                        } else if (imgcodeVal.length !== 4) {
                              oErrorTip.innerText = '图片验证码长度为 4 位';
                              return;
                        } else if (!alphabetCheck(imgcodeVal)) {
                              oErrorTip.innerText = '图片验证码为字母';
                              return;
                        } else {
                              submitRegisterForm({
                                    pNumber: hpVal,
                                    password: sPwdVal,
                                    telcode: hpcodeVal,
                                    passcode: imgcodeVal
                              });
                        }
                        break;
                  default:
                        break;
            }
      }

      function countDown() {
            if (s <= 0) {
                  restoreSendcodeStatus();
            } else {
                  s--;
                  oHpcodeBtn.innerHTML = '重新发送（' + s + ')';
                  oHpcodeBtn.className = 'J_hdcode-btn fr disabled';
                  isSend = false;
            }
      }

      function restoreSendcodeStatus() {
            oHpcodeBtn.innerHTML = '获取验证码';
            oHpcodeBtn.className = 'J_hdcode-btn fr';
            s = os;
            isSend = true;
            clearInterval(timer);
            timer = null;
      }

      function restoreModStatus() {
            restoreSendcodeStatus();
            Login.restoreLoginModStatus();
            oHandphone.value = oSPwd.value = oHpcode.value = oImgcode = '';
      }

      function submitRegisterForm(data) {
            xhr.ajax({
                  url: registerUrl,
                  type: 'POST',
                  data: data,
                  success: function (data) {
                        var code = data.error_code,
                              errorInfo = '';
                        switch (code) {
                              case '1008':
                                    errorInfo = '手机号格式不正确';
                                    break;
                              case '1009':
                                    errorInfo = '图片验证码不正确';
                                    break;
                              case '1010':
                                    errorInfo = '与接收验证码的手机号不一致';
                                    break;
                              case '1011':
                                    errorInfo = '手机验证码不正确';
                                    break;
                              case '1012':
                                    errorInfo = '密码长度不正确';
                                    break;
                              case '1014':
                                    errorInfo = '注册失败，请重试';
                                    break;
                              case '200':
                                    errorInfo = '注册成功';
                                    oErrorTip.className += ' success';
                                    t = setTimeout(function () {
                                          location.reload();
                                          clearTimeout(t);
                                          t = null;
                                          t1 = setTimeout(function() {
                                                oErrorTip.className = 'J_error-tip error-tip';
                                                clearTimeout(t1);
                                                t1 = null;
                                          }, 300);
                                    }, 500);
                                    return;
                                    break;
                              default:
                                    break;
                        }
                        oErrorTip.innerText = errorInfo;
                        refreshImgcode(oImgcodeBtn);
                  }
            });
      }

      function sencode(val) {
            xhr.ajax({
                  url: sendHpcodeUrl,
                  type: 'POST',
                  data: {
                        pNumber: val
                  },
                  success: function (data) {
                        var code = data.error_code,
                              errorInfo = '';
                        switch (code) {
                              case '1008':
                                    errorInfo = '手机号格式不正确';
                                    break;
                              case '1013':
                                    errorInfo = '验证码发送失败';
                                    break;
                              case '200':
                                    errorInfo = '验证码发送成功';
                                    timer = setInterval(countDown, 1000);
                                    break;
                        }
                        oErrorTip.innerText = errorInfo;
                  }
            })
      }

      function refreshImgcode(img) {
            var url = img.src;
            img.src = url.indexOf('?') ?
                  url.replace(/\?.*/g, '') + '?rand=' + Math.random() :
                  url + '?rand=' + Math.random();
      }

      return {
            regBdClick: regBdClick,
            restoreModStatus: restoreModStatus
      }

}(initLogin))