"Use strict";
let utenti = [
  { user: "pippo", pwd: "pwdPippo" },
  { user: "pluto", pwd: "pwdPluto" },
  { user: "minnie", pwd: "pwdMinnie" },
];
$(document).ready(function () {
  //puntatore alle lbl di stato
  let lblUser = $("#msgUser");
  let lblPw = $("#msgPwd");

  //puntatore ai txt input
  let txtUser = $("#txtUser");
  let txtPw = $("#txtPwd");

  let posPw = 0;
  let posUser;

  let okUser = false;
  let okPw = false;

  let regEx = /^(?=.*[A-Za-z])[A-Za-z\d]{8,}$/;
  
  //controllo mediante l' evento change la validità dello user
  txtUser.change(function () {
    posUser = 0;
    okUser = false;
    if (txtUser.val() != "" && txtUser.val() != null) {
      for (const item of utenti) {
        if (txtUser.val() == item.user) {
          okUser = true;
          posUser++;
          break;
        } else {
          posUser++;
        }
      }
    }
    if (okUser) {
      lblUser.text("OK").css({ color: "green" }).hide().fadeIn(1000);
      txtUser.removeClass();
      txtUser.addClass("ok");
    } else {
      lblUser.text("Utente errato").css({ color: "red" }).hide().fadeIn(1000);
      txtUser.removeClass();
      txtUser.addClass("nok");
    }
  });

  //assicuto che ci sia l'over sui campi
  txtUser.hover(
    function () {
      $(this).addClass("over");
    },
    function () {
      $(this).removeClass("over");
    }
  );

  txtPw.hover(
    function () {
      $(this).addClass("over");
    },
    function () {
      $(this).removeClass("over");
    }
  );

  txtPw.change(function () {
    posPw = 0;
    okPw = false;
    if (txtPw.val() != "" && txtPw.val() != null) {
      if (regEx.test(txtPw.val())) {
        for (const item of utenti) {
          if (txtPw.val() == item.pwd) {
            okPw = true;
            posPw++;
            break;
          } else {
            posPw++;
          }
        }
      }
    }

    if (okPw == true && okUser == true && posPw == posUser) {
      lblPw.text("OK").css({ color: "green" }).hide().fadeIn(1000);
      lblPw.removeClass();
      lblPw.addClass("ok");
    } else {
      lblPw.text("Utente errato").css({ color: "red" }).hide().fadeIn(1000);
      lblPw.removeClass();
      lblPw.addClass("nok");
    }
  });
});
