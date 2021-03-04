"use strict";

$(document).ready(function () {
  let _login = $("#login");
  let _test = $("#test");

  let _txtUsr = $("#usr");
  let _txtPwd = $("#pwd");
  let _btnLogin = $("#btnLogin");
  let _lblErrore = $("#lblErrore");

  let _domande = $(".domande");

  /* ******************************* */

  _login.show();
  _test.hide();
  _lblErrore.hide();

  _btnLogin.on("click", function () {
    let request = inviaRichiesta("get", "/studenti");
    request.fail(errore);
    request.done(function (students) {
      for (const student of students) {
        if (_txtUsr.val() == student.user && _txtPwd.val() == student.pwd) {
          _login.hide();
          _test.show();
          setTimeout(function () {
            alert(`Benvenuto ${_txtUsr.val()}`, 1000);
          }, 100);
        } else {
          _lblErrore.fadeIn(600);
        }
      }
    });
  });

  _lblErrore.children("button").on("click", function () {
    _lblErrore.fadeOut(600);
  });
});
