"use strict"
function crea(){
	localStorage.setItem("bookstore_xml",bookstore);

}
function visualizza(){
	//lettura di una string dal local storage
	let xml = localStorage.getItem("bookstore_xml");
	///*********************INIZIO L ELABORAZIONE************************/////
	//istanzio un DOM parser
	let parser=new DOMParser();
	// tramite il dom parser parsifico la stringa xml
	let xmlDoc=parser.parseFromString(xml,"text/xml");
	//let xmlobject=parser.parseFromString(xml,"text/xml")
	//righe ausiliare per vedere ok
	//let serializer = new XMLSerializer();
	//let aus = serializer.serializeToString(xmlDoc);
	//console.log(aus);
	//accedo alla radice dell albero
	let  root = xmlDoc.documentElement;
	let nLibri = root.children.length;
	//console.log(nLibri);


	let _tbody=document.getElementById("tabLibri");
	//accedo al body e lo ripulisco
	_tbody.innerHTML="";
	//carico i dati nuovi nel tbody
	for (let i = 0;  i < nLibri; i++){
		let libro = root.children[i];

		let titolo="",
			categoria="",
			lingua="",
			autori=""
			,anno="",
			prezzo="";

		if (libro.hasAttribute("category"))
			categoria = libro.getAttribute("category");
		for (let j=0;j<libro.children.length;j++){
			let campo = libro.children[j];
			switch (campo.nodeName) {
				case 'title' :
					titolo = campo.textContent;
					if (campo.hasAttribute("lang"))
						lingua = campo.getAttribute("lang");
					break;

				case 'year' :
					anno = campo.textContent;
					break;

				case 'price' :
					prezzo = campo.textContent;
					break;

				case 'author' :
					if (autori=="")
						autori += campo.textContent;
					else
						autori += " - "+ campo.textContent;
					break;
			}
		}

		//creo la riga e la appendo al dom
		let tr = document.createElement("tr");
		_tbody.appendChild(tr);

		//creo le celle e le appendo al DOM
		let td;

		td = document.createElement("td");
		td.innerHTML = titolo;
		td.style.border=0;
		tr.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = categoria;
		td.style.border=0;
		tr.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = lingua;
		td.style.border=0;
		tr.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = autori;
		td.style.border=0;
		tr.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = anno;
		td.style.border=0;
		tr.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = prezzo;
		td.style.border=0;
		tr.appendChild(td);


	}
}
	