"use strict"

$(document).ready(function(){
	let header =$("#header")
	let button = header.children("input")
	let partenza = header.find("input").eq(0)
	let arrivo = header.find("input").eq(1)
	let wrapper = $("#wrapper") 
	let map =  wrapper.children(".map")[0]     // js
	let panel= wrapper.children(".panel")[0]   // js
	let msg =  wrapper.children(".msg") 


	button.on("click", function(){
		if (partenza.val() == "" || arrivo.val() == "") 
			alert("Prego compilare i campi di partenza e arrivo")
		else{	

			let geocoder = new google.maps.Geocoder();
			geocoder.geocode({'address':partenza.val()},function(resultStart,status){
				if(status!=google.maps.GeocoderStatus.OK)
					alert("Stringa immessa non valida");
				else
				{
					geocoder.geocode({'address':arrivo.val()},function(resultArrivo,status){
						if(status!=google.maps.GeocoderStatus.OK)
							alert("Stringa immessa non valida");
						else
						{
							let coordStart = resultStart[0].geometry.location;
							let coordArrivo = resultArrivo[0].geometry.location; 
							visualizzaPercorso(coordStart,coordArrivo);
						}
					})
				}
			})
		}
	})

	function visualizzaPercorso(start,arrive)
	{
		let directionsService = new google.maps.DirectionsService();
		let percorso = {
			"origin": start,
			"destination": arrive,
			"travelMode": google.maps.TravelMode.DRIVING, // default
			"provideRouteAlternatives":true,
		}; 

		directionsService.route(percorso, function(routes,status){
			if (status == google.maps.DirectionsStatus.OK) {
				let mapOptions = {
					"center":start,
					"zoom":16,
					//"mapTypeId": google.maps.MapTypeId.HYBRID
				}
				let directionsRenderer;
				let mappa = new google.maps.Map(map, mapOptions);
				for(let i=0; i < routes.routes.length; i++)
				{
					let color = "rgb(127,127,127)";
					if(i == 0)
					{
						color = "blue";
					}
					let renderOptions = {
						polylineOptions: {
						strokeColor : color,
						strokeWeight : 6,
						zIndex : 100 - i
						}
					}
					directionsRenderer = new google.maps.DirectionsRenderer();
					directionsRenderer.setMap(mappa);
					directionsRenderer.setRouteIndex(i);
					directionsRenderer.setDirections(routes);
				}
				console.log(routes)

			   // Pannello contenente tutte le indicazioni sul percorso
				directionsRenderer.setPanel(panel);
				let distanza = routes.routes[0].legs[0].distance.text;
				let tempo = routes.routes[0].legs[0].duration.text;
				msg.html("Distanza: " + distanza + "</br>Tempo di percorrenza: " + tempo);
			}
			else
			{
				alert("Percorso non valido!");
			}		   
		});
	}
});
