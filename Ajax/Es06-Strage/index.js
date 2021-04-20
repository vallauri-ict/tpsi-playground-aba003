"use strict";

$(document).ready(function () {
  let _login = $("#login");
  let _test = $("#test");
  let voto = 0;
  let _txtUsr = $("#usr");
  let _txtPwd = $("#pwd");
  let _btnLogin = $("#btnLogin");
  let _lblErrore = $("#lblErrore");
  let currentUser = "";
  let registrazione = $("#registrazione");

  let formRegistrati = $("#formRegistrati");
  let _txtUsrRegistrazione = $("#usrRegistrazione");
  let _txtPwdRegistrazione = $("#pwdRegistrazione");
  let _txtPwdConferma = $("#pwdRegistrazioneConferma");

  let _btnRegistrati = $("#btnRegistrati");
  var regex = /^[a-zA-Z0-9_-]{5,15}$/;
  let btnReset = $("#resetpw");
  let _txtRipristinausr = $("#usrRipristina");
  let _txtRipristinapwd = $("#pwdRipristina");
  let _txtRipristinapwdconferma = $("#pwdconfermaripristino");
  let btnConfermaCambioPwd = $("#btnConfermapwd");
  let formRipristina = $("#formRipristina");
  /* ******************************* */
  _login.show();
  _test.hide();
  _lblErrore.hide();
  formRegistrati.hide();
  formRipristina.hide();

  registrazione.click(function () {
    _login.hide();
    formRegistrati.show();
    _txtUsrRegistrazione.val("");
    _txtPwdConferma.val("");
    _txtPwdRegistrazione.val("");
  });
  _btnRegistrati.click(function () {
    if (_txtUsrRegistrazione.val().length > 0) {
      let request = inviaRichiesta(
        "get",
        `/studenti?user=${_txtUsrRegistrazione.val()}`
      );
      request.fail(errore);
      request.done(function (userName) {
        console.log(userName);
        if (userName.length > 0) {
          alert("Nome utente non disponibile");
          _txtUsrRegistrazione.css({ color: "red" });
        } else {
          _txtUsrRegistrazione.css({ color: "green" });
        }
      });
    }
    if (
      regex.test(_txtPwdRegistrazione.val()) &&
      regex.test(_txtPwdConferma.val()) &&
      _txtPwdConferma.val() == _txtPwdRegistrazione.val()
    ) {
      _txtUsrRegistrazione.css({ color: "green" });
      _txtPwdRegistrazione.css({ color: "green" });
      _txtPwdConferma.css({ color: "green" });
      let request = inviaRichiesta("get", "/studenti");
      request.fail(errore);
      request.done(function (studenti) {
        let request = inviaRichiesta("post", "/studenti", {
          id: studenti.length + 1,
          user: _txtUsrRegistrazione.val(),
          pwd: _txtPwdRegistrazione.val(),
          voto: 0,
        });
        request.fail(errore);
        request.done(function name(params) {
          alert("Dati inseriti correttamente");
          formRegistrati.hide();
          _login.show();
        });
      });
    } else {
      alert("Password errate o non valide");
    }
  });

  _txtUsrRegistrazione.on("keyup", function () {
    _txtUsrRegistrazione.css({ color: "gray" });
  });

  btnReset.click(function () {
    _login.hide();
    formRipristina.show();
    _txtRipristinapwd.val("");
    _txtRipristinausr.val("");
    _txtRipristinapwdconferma.val("");
  });
  btnConfermaCambioPwd.click(function name(params) {
    let user = _txtRipristinausr.val();
    let password = _txtRipristinapwd.val();
    let newpassword = _txtRipristinapwdconferma.val();
    let request = inviaRichiesta(
      "GET",
      `/studenti?user=${user}&pwd=${password}`
    );
    request.fail(errore);
    request.done(function (user) {
      if (user.length == 0) {
        alert("Username non esistente");
      } else if (password == newpassword) {
        alert("La password nuova non può essere uguale alla precedente");
      } else if (
        password != newpassword &&
        user.length > 0 &&
        regex.test(_txtRipristinapwdconferma.val())
      ) {
        currentUser = user;
        let request = inviaRichiesta("patch", `/studenti/${user[0].id}`, {
          pwd: newpassword,
        });
        request.fail(errore);
        request.done(function name(params) {
          alert("Password cambiata correttamente");
          formRipristina.hide();
          _login.show();
        });
      } else {
        alert("Nuova password mancante o errata");
      }
    });
  });
  _btnLogin.click(function () {
    let password = _txtPwd.val();
    let user = _txtUsr.val();
    let request = inviaRichiesta(
      "GET",
      `/studenti?user=${user}&pwd=${password}`
    );
    request.fail(errore);
    request.done(function (user) {
      if (user.length == 0) {
        _lblErrore.show(200);
      } else {
        alert("Benvenuto " + user[0].user);
        currentUser = user;
        caricadomande();
      }
    });
  });

  function caricadomande() {
    _login.hide();
    _test.show();
    let request = inviaRichiesta("get", "/domande");
    request.fail(errore);
    request.done(function (domande) {
      for (const question of domande) {
        let divDomanda = $("<div>");
        divDomanda.appendTo(_test);

        let domanda = $("<div>");
        domanda.text(question.domanda);
        domanda.appendTo(divDomanda);
        let style = {
          color: "blue",
          "font-size": "20px",
        };
        domanda.css(style);
        let br = $("<br>");
        br.appendTo(divDomanda);
        let request = inviaRichiesta(
          "get",
          `/risposte?codDomanda=${question.id}`
        );
        request.fail(errore);
        request.done(function (answers) {
          for (const answear of answers) {
            let radio = $("<input>");
            radio.prop("type", "radio");
            radio.prop("name", `opt${answear.codDomanda}`);
            radio.prop("radio", answear);
            radio.appendTo(divDomanda);
            let span = $("<span>");
            span.text(answear.risposta);
            span.appendTo(divDomanda);
            let br = $("<br>");
            br.appendTo(divDomanda);
          }
        });
      }
      let br = $("<br>");
      br.appendTo(_test);
      let button = $("<button>");
      button.text("Verifica");
      button.appendTo(_test);
      button.click(function () {
        let opts = $("input[type=radio]:checked");
        for (const opt of opts) {
          if ($(opt).prop("radio").correct == true) {
            voto++;
            $(opt).next().css({ color: "green" });
          } else {
            $(opt).next().css({ color: "red" });
          }
        }

        let request = inviaRichiesta(
          "patch",
          `/studenti/${currentUser[0].id}`,
          { voto: voto }
        );
        request.fail(errore);
        request.done(function () {
          alert(`Il tuo voto è: ${voto}`);
          button.prop("disabled", true);
        });
      });
    });
  }
});
