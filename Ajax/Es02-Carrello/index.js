"use strict";
 
$(document).ready(function () {
	let wrapper = $('#elencoArticoli');
	let details =$(".details")

    $.ajax({
	   "url": "http://localhost:3000/fotocamere",  
       "timeout": 5000,    
	   "success": visualizza,
	   "error": errore
	})
});


function visualizza (data) {
	console.log(data);
}



/* **************************************************** */

function errore(jqXHR, textStatus, str_error){
	if(jqXHR.status==0)
	   alert("connection refused or server timeout");
	else if (jqXHR.status == 200)
	   alert("Errore Formattazione dati\n" + jqXHR.responseText);
	else
	   alert("Server Error: "+jqXHR.status+ " - " +jqXHR.responseText);
}

