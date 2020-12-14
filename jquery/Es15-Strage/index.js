"use strict";

$(document).ready(function () {
  let header = $("#header");
  let main = $("#mainSection");
  let btn;
  header.animate(
    { width: 60 * 15, height: 6 * 15, "font-size": 45, "line-height": 6 * 15 },
    1500,
    generaEleneco
  );

  function generaEleneco() {
    let cont = 0;
    for (const argomenti of elencoDomande) {
      let fieldet = $("<fieldset>");
      fieldet.addClass("fieldset");
      main.append(fieldet);
      let legend = $("<legend>");
      legend.css({ color: "blue", "font-size": "12pt" });
      legend.text(argomenti.argomento);
      fieldet.append(legend);

      for (const domande of argomenti.domande) {
        let p = $("<p>");
        p.prop("id", domande.risposta);
        p.text(domande.domanda);
        fieldet.append(p);

        let radioTrue = $("<input>");
        radioTrue.prop({ type: "radio", name: `opt${cont}`, value: "T" });
        p.append(radioTrue);

        let lblTrue = $("<lable>");
        lblTrue.text("T");
        p.append(lblTrue);

        let radioFalse = $("<input>");
        radioFalse.prop({ type: "radio", name: `opt${cont}`, value: "F" });
        p.append(radioFalse);

        let lblFalse = $("<lable>");
        lblFalse.text("F");
        p.append(lblFalse);

        cont++;
      }
    }
    btn = $("<input>");
    btn.prop({ type: "button", value: "Invia" });
    btn.addClass("invia");
    btn.appendTo(main);
    btn.on("click", controllaPunteggio);
  }

  function controllaPunteggio() {
    let punteggio = 0;
    btn.off("click");
    btn.css({
      backgroundColor: "#ccc",
      color: "#999",
    });

    let fieldsets = main.children("fieldset"); //3

    for (let i = 0; i < fieldsets.length; i++) {
      for (let j = 0; j < fieldsets.eq(i).children("p").length; j++) {
        //10
        let p = fieldsets.eq(i).children("p").eq(j);
        let rispostaUtente = p.children("input[type=radio]:checked").val();
        console.log(rispostaUtente + p.prop("id"));
        if (rispostaUtente!=undefined) {
          if (rispostaUtente == p.prop("id")) {
               punteggio++;
          }else if (rispostaUtente != p.prop("id")){
               punteggio--;
          }
        }
      }
    }
    alert("il tuo punteggio è:" + punteggio);
  }
});

// Una semplice funzione per aggiungere uno 0 davanti ad un numero < 10
function pad(number) {
  return (number < 10 ? "0" : "") + number;
}
