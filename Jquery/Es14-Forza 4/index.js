const RIGHE = 6;
const COLONNE = 7;
const GIALLO = "rgb(255, 255, 0)";
const ROSSO = "rgb(255, 0, 0)";
const GRIGIO = "rgb(187, 187, 187)";

let turno = GIALLO; //turno corrente nonchè iniziale

$(document).ready(function () {
  let wrapper = $("#wrapper");
  let header = $("#header");

  //creazione pedine intestazione
  for (let i = 0; i < COLONNE; i++) {
    let pedina = $("<div>");
    pedina.addClass("pedina");
    pedina.appendTo(header);
    pedina.hover(
      //con la funzione hover possiamo gestire sia la callbacck di mouseover che di mouseout
      function () {
        $(this).css("backgroundColor", turno);
        //dentro le function è sempre meglio usare this
        //perchè siamo sicuri che si riferisca all'oggetto selezionato
      },
      function () {
        $(this).css("backgroundColor", GRIGIO);
      }
    );
  }

  //creazione pedine wrapper
  for (let i = 0; i < RIGHE; i++) {
    for (let j = 0; j < COLONNE; j++) {
      let pedina = $("<div>");
      pedina.addClass("pedina");
      pedina.appendTo(wrapper);
      pedina.prop("id", `btn-${i}-${j}`);
    }
  }

  header.on("mouseenter", "div", function () {
    $(this).css("backgroundColor", turno);
  });

  header.on("mouseleave", "div", function () {
    $(this).css("backgroundColor", GRIGIO);
  });

  header.on("click", "div", down);

  function down() {
    //restituisce l'indice di $(this) all'interno di header
    let colonna = header.children("div").index($(this));
    let riga = RIGHE - 1; //posizione prima cella libera di default
    for (let i = 0; i < RIGHE; i++) {
      let p = $(`#btn-${i}-${colonna}`);
      if (p.css("backgroundColor") != GRIGIO) {
        riga = i - 1;
        break;
      }
    }
    //se cè una cella libera faccio questo
    if (riga != -1) {
      let pedina = $("<div>");
      pedina.appendTo(wrapper);
      pedina.addClass("pedina");
      pedina.css({
        backgroundColor: turno,
        position: "absolute",
        left: colonna * 60 + 5,
        top: "-60px",
      });
      header.off("click");
      $(this).trigger("mouseenter");
      pedina.animate(
        {
          top: riga * 60 + 5,
        },
        200 * (riga + 1),
        function () {
          let _turno = turno;
          if (turno == GIALLO) {
            turno = ROSSO;
          } else {
            turno = GIALLO;
          }
          $(`#btn-${riga}-${colonna}`).css({ backgroundColor: _turno });

          header.on("click", "div", down);
        }
      ); //+1 perchè
    } else {
      alert("celaccia non valida");
    }
  }
});
