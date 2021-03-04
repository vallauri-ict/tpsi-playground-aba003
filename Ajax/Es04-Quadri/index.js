"option strict";

const URL = "http://localhost:3000";

$(function () {
  let _head = $(".head");
  let _info = $(".info");
  let _img = $(".img");
  let _btnPrev = $("button").eq(0);
  let _btnNext = $("button").eq(1);

  _btnPrev.prop("disabled", true);
  let indiceQuadro = 0;
  let quadriArtista;
  let genereQuadriArtista;

  let _wrapperAdd = $(".wrapper").eq(1);

  let request = inviaRichiesta("get", `${URL}/artisti`);
  request.fail(errore);
  request.done(function (artisti) {
    for (const artista of artisti) {
      let lbl = $("<label>");
      lbl.appendTo(_head);

      // rdb.prop("type", "input"); equivalente
      let rdb = $("<input type='radio'>");
      rdb.appendTo(lbl);
      rdb.prop("name", "artista");
      rdb.prop("artista", artista);

      // con text avrebbe preso tutto quello
      // che c'era all interno dell'lbl
      // e l'avrebbe sovrascritto quindi anche
      // radio button

      lbl.append(artista.name);
    }

    let n = generaNumero(0, artisti.length - 1);
    $("input[type='radio']").eq(n).prop("checked", true);
    let idArtista = $("input[type='radio']").eq(n).prop("artista").id;
    inviaRichiestaQuadri(
      idArtista,
      $("input[type='radio']").eq(n).prop("artista").gender
    );
    _wrapperAdd
      .children("h1")
      .text(
        "Inserisci un nuovo quadro di " +
          $("input[type='radio']").eq(n).prop("artista").name
      );
  });

  _head.on("click", "input", function () {
    let idArtista = $(this).prop("artista").id;
    indiceQuadro = 0;
    _btnNext.prop("disabled", false);
    _btnPrev.prop("disabled", true);
    genereQuadriArtista = $(this).prop("artista").gender;
    inviaRichiestaQuadri(idArtista, $(this).prop("artista").gender);
    _wrapperAdd
      .children("h1")
      .text("Inserisci un nuovo quadro di " + $(this).prop("artista").name);
  });

  _btnPrev.on("click", function () {
    indiceQuadro--;
    _btnNext.prop("disabled", false);
    if (indiceQuadro == 0) {
      $(this).prop("disabled", true);
    }
    visualizzaQuadro(genereQuadriArtista, quadriArtista[indiceQuadro]);
  });

  _btnNext.on("click", function () {
    indiceQuadro++;
    _btnPrev.prop("disabled", false);
    if (indiceQuadro == quadriArtista.length - 1) {
      $(this).prop("disabled", true);
    }
    visualizzaQuadro(genereQuadriArtista, quadriArtista[indiceQuadro]);
  });

  function visualizzaQuadro(genere, quadro) {
    _info.empty();
    _img.empty();
    $("<p>")
      .text("ID = " + quadro.id)
      .appendTo(_info);
    $("<p>")
      .text("titolo = " + quadro.title)
      .appendTo(_info);
    $("<p>")
      .text("genere = " + genere)
      .appendTo(_info);
    let imglike = $("<img>").prop("src", "like.jpg").addClass("like");
    $("<p>")
      .text("Like = " + quadro.nLike)
      .appendTo(_info)
      .append(imglike);
    imglike.on("click", function () {
      let request = inviaRichiesta("patch", URL + "/quadri/" + quadro.id, {
        nLike: quadro.nLike + 1,
      });
      request.fail(errore);
      request.done(function (data) {
        visualizzaQuadro(genereQuadriArtista, data);
      });
    });
    if (quadro.img.includes("base64,")) {
      $("<img>").prop("src", `${quadro.img}`).appendTo(_img);
    } else {
      $("<img>").prop("src", `img/${quadro.img}`).appendTo(_img);
    }
  }
  //********************************************************** */
  let _btnSalva = $("#btnSalva");
  let _btnAnnulla = $("#btnAnnulla");
  let RegExpression = /^[a-z ,.'-]+$/;

  _btnSalva.on("click", function () {
    if (RegExpression.test($("#titolo").val()) && $("#titolo").val() != "") {
      var fileName = $("#immagine").prop("files")[0];
      var reader = new FileReader();

      reader.readAsDataURL(fileName);
      reader.onloadend = function () {
        console.log("RESULT", reader.result);
        let idArtista = $("input[type='radio']:checked").prop("artista").id;
        let genderArtista = $("input[type='radio']:checked").prop("artista").gender;
        let json = {
          artist: idArtista,
          title: $("#titolo").val(),
          img: reader.result,
          nLike: 0,
        };
        let request = inviaRichiesta("post", URL + "/quadri", json);
        request.fail(errore);
        request.done(function (data) {
          console.log(data);
          inviaRichiestaQuadri(idArtista,genderArtista);
          $("#titolo").val() != "";
          $("#immagine").prop("files") == "";

        });
      };
    } else if ($("#titolo").val() == "" || $("#immagine").prop("files") == "") {
      alert("Nome del quadro non valido");
    }
  });

  _btnAnnulla.on("click", function () {
    /*$("#titolo").text()="";*/
  });

  function inviaRichiestaQuadri(idArtista, genere) {
    let request = inviaRichiesta("get", `${URL}/quadri/?artist=${idArtista}`);
    request.fail(errore);
    request.done(function (quadri) {
      visualizzaQuadro(genere, quadri[0]);
      quadriArtista = quadri;
    });
  }
});
