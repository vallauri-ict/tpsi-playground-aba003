"option strict";

const URL = "http://localhost:3000";

$(function () {
  let _head = $(".head");
  let _info = $(".info");
  let _img = $(".img");
  let _btnPrev = $("button").eq(0);
  let _btnNext = $("button").eq(1);
  _btnPrev.prop("disabled", true);
  let posQuadro=0;

  let _wrapperAdd = $(".wrapper").eq(1);
  let request = inviaRichiesta("get", URL + "/artisti");
  request.fail(errore);
  request.done(function (artisti) {
    for (const artista of artisti) {
      let lbl = $("<label>");
      lbl.appendTo(_head);

      let rdb = $("<input type='radio'>");
      // rdb.prop type equivalente
      rdb.appendTo(lbl);
      rdb.prop("name", "artisti"); //cosi sono esclusivi
      rdb.prop("artista", artista);
      lbl.append(artista.name);
    }
    let n = generaNumero(0, artisti.length - 1);
    posQuadro=n;
    $("input[type='radio']").eq(n).prop("checked", true); //va scritto senza spazi se no fa la caca
    let idArtista = $("input[type='radio']")
      .eq(n)
      .prop("checked", true)
      .prop("artista").id;
    inviaRichiestaQuadri(idArtista);
  });

  function inviaRichiestaQuadri(idArtista, genere) {
    let request = inviaRichiesta("get", URL + "/quadri?artist=" + idArtista); //vado a prendere i quadri dove artis è uguale all' id dell artista corrente
    request.fail(errore);
    request.done(function (quadri, gender) {
      visualizzaQuadro(gender, quadri[0]);
    });
  }
  _head.on("click", "input", function () {
    _info.empty();
    _img.empty();
    let id = $(this).prop("artista").id;
    inviaRichiesta(idArtista, $(this).gender);
  });

  _btnPrev.on("click",function(){
      posQuadro--;
      if (posQuadro==0) {
        $(this).prop("disable",true);
        visualizzaQuadro(quadri)
      }
  })
  function visualizzaQuadro(genere, quadro) {
    _info.html = "";
    $("<p>")
      .text("ID = " + quadro.id)
      .appendTo(_info);
    $("<p>")
      .text("titolo = " + quadro.id)
      .appendTo(_info);
    $("<p>")
      .text("genere = " + genere)
      .appendTo(_info);
    let imglike = $("<img>").prop("src", "like.jpg").addClass("like");
    $("<p>")
      .text("Like = " + quadro.nLike)
      .appendTo(_info)
      .append(imglike);
    $("<img>").prop("src", `img/${quadro.img}`).appendTo(_img);
  }
});
