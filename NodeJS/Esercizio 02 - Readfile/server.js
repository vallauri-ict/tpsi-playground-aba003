"use strict";

const _http = require("http");
const _url = require("url");
const _fs = require("fs"); //module per accedere al file sistem
const HEADERS = require("./headers.json");
const mime = require("mime");

const PORT = 1337;
let paginaErrore;

var server = _http.createServer(function (req, res) {

  //si deve leggere metodo risorsa e parametri
  let metodo = req.method;
  let url = _url.parse(req.url, true);
  let risorsa = url.pathname;
  let parametri = url.query;

  

  if (risorsa=='/') { //controllare se non si è richiesto niente
      risorsa='/index.html'
  }
  if (!risorsa.startsWith("/api/")) {
      risorsa="./static"+risorsa;
      _fs.readFile(risorsa, function (error,data) { //file da leggere e call back da eseguere
          if (!error) {
              let header = {"Content-Type": mime.getType(risorsa)}
              res.writeHead(200,header);
              res.write(data);
              res.end();
              
          }else{
            res.writeHead(404,HEADERS.html);
            res.write(paginaErrore);
            res.end();
          }
      })

  }else{

  }
  
  res.writeHead(200,HEADERS);
});
server.listen(PORT,function name(params) { //sfutto quest call back per salvare la pagina di errore
paginaErrore =  _fs.readFile("./static/error.html",function (error,data) {
if (!error) {
    paginaErrore=data;
}else{
    paginaErrore="<h1>Pagina 404</h1>";
}
})
});
console.log(`Server avviato correttamente sulla porta ${PORT}`);
