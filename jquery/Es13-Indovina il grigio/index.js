$(document).ready(function () {
  let cont = 0;
  let wrapper = $("#wrapper");
  let btnControlla = $("#btnOk");
  let JsonWrapperCss = {
    height: "70px",
    width: "600px",
    padding: "0px",
    margin: "50px auto",
    "background-color": "#ff9",
    float: "left",
  };
  wrapper.css(JsonWrapperCss);
  creaDiv();
  wrapper.on("mouseover", "div", vediColore);
  wrapper.on("mouseout", "div", nascondiColore);
  btnControlla.on("click", controllaGiusto);

  function creaDiv() {
    for (let i = 0; i < 9; i++) {
      let div = $("<div>");
      div.addClass("box");
      div.appendTo(wrapper);
      div.text(i + 1);
      let n = generaNumero(0, 255);
      div.css({ backgroundColor: `rgb(${n},${n},${n})` });
      div.prop("id", n);
    }
  }

  
  function vediColore() {
    wrapper.off("mouseover", "div");
    let p = $("#tooltip");
    p.text($(this).prop("id")).hide().fadeIn(1000);
    wrapper.on("click", "div", vediColore);
  }
  function nascondiColore() {
    wrapper.off("mouseout", "div");
    let p = $("#tooltip");
    p.text("").hide().fadeIn(1000);
    wrapper.on("mouseout", "div", nascondiColore);
  }

  function controllaGiusto() {
    let txtPos = $("#txtPosizione").val();
    let txtVal = $("#txtColore").val();

    let divs = wrapper.children("div");

    console.log(divs);
    for (let i = 0; i < divs.length; i++) {
      if (txtPos == i + 1) {
        if (parseInt(divs.eq(i).prop("id")) == txtVal) {
          cont++;
          alert("giusto");
          divs.eq(i).css({ backgroundColor: "#FF9", border: "none" });
          divs.eq(i).text("");
          $("#txtPosizione").val("");
          $("#txtColore").val("");
          $("#txtColore").css({ backgroundColor: "" });
          break;
        } else if (txtVal > parseInt(divs.eq(i).prop("id"))) {
          $("#txtColore").css({ backgroundColor: "blue" });
          alert("troppo grande");
        } else {
          $("#txtColore").css({ backgroundColor: "red" });
          alert("troppo piccolo");
        }
      }
    }
    if (cont==9) {
        alert("Hai vinto Bravo!!");
    }
  }
  function generaNumero(min, max) {
    return Math.floor((max - min + 1) * Math.random() + min);
  }
});
