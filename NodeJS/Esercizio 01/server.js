let _http = require("http");
let _url = require("url");
let HEADERS = require("./headers.json")

let port = 1337;

let server=_http.createServer(function (req, res) {
    
	
	
	
});

// se non si specifica l'indirizzo IP di ascolto il server viene avviato su tutte le interfacce
server.listen(port);
console.log("server in ascolto sulla porta " + port);