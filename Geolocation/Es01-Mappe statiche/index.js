"use strict";

const url = "https://maps.googleapis.com/maps/api/staticmap";
const key = "";

const params = {
  key: key,
  center: "44.5557763,7.7347183", //"via san michele 68, fossano",,
  location:"44.5557763,7.7347183",
  zoom: 16,
  size: "800x600",

  // maptype viene aggiunto dopo  manualmente
   markers: "color:blue|size:big|label:V|via san michele 68, fossano",
   heading:"60",
   pitch:"7",
   fov:"45",
};
const mapType = ["roadmap", "satellite", "hybrid", "terrain", "streetview"];

window.onload = function () {
  let imgBox = $("#imgBox");
  let btnBox = $("#btnBox");

  for (const item of mapType) {
    let btn = $("<button>");
    btn.text(item);
    btn.appendTo(btnBox);
    btn.on("click", visualizzaMappa);
  }

  function visualizzaMappa() {
    let url;
    if ($(this).text() != "streetview") {
      imgBox.prop("src", url +"?"+ setParams($(this).text()));

    }else{
      url=URL+"/streetview?"+setParams("streetview");
      imgBox.prop("src", url +"?"+ setParams($(this).text()));
    }
  }

  function setParams(maptype) {
    let queryString = "";
    for (const key in params) {
      // se rimane una & al fondo non succede nulla
      queryString += key + "=" + params[key] + "&";
    }
    queryString += "maptype=" + maptype;
    return queryString;
  }
};