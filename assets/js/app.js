function initMap() {
	var laboratoriaChile = {lat: -33.419004, lng: -70.641716};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 17,
		center: laboratoriaChile
	});
/*	var marcadorLaboratoria = new google.maps.Marker({
		position: laboratoriaChile,
		map: map
	}); */
	var inputPartida = document.getElementById('punto-partida');
	var inputDestino = document.getElementById('punto-destino');

	new google.maps.places.Autocomplete(inputPartida);
	new google.maps.places.Autocomplete(inputDestino);

	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;

	var calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
		directionsService.route({
			origin: inputPartida.value,
			destination: inputDestino.value,
			travelMode: 'DRIVING'
		}, function(response, status) {
			if (status === 'OK') {
				directionsDisplay.setDirections(response);
			}else {
				window.alert('No encontramos una ruta.');
			}
		});
	}

	directionsDisplay.setMap(map);

	var trazarRuta = function () {
		calculateAndDisplayRoute(directionsService, directionsDisplay);
	}

	document.getElementById('trazar-ruta').addEventListener('click', trazarRuta);
}

function findMe() {
	var map = document.getElementById('map');
	if(navigator.geolocation) {
		//map.innerHTML() = '<p>Tu navegador soporta Geolocalización uwu</p>';
		console.log('tu navegador soporta Geolocalización uwu');
	} else {
		//map.innerHTML() = '<p>Tu navegador soporta Geolocalización uwu</p>';
		console.log('tu navegador no soporta Geolocalización uwu');
	}

	function localitation(position) {
		var map = document.getElementById('map');
		console.log(position);
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		var yourPlace = {lat: latitude, lng: longitude};
		console.log(yourPlace);
		var mapOnDiv = new google.maps.Map(map, {
			zoom: 15,
			center: yourPlace
		});
		var marker = new google.maps.Marker({
			position: yourPlace,
			map: mapOnDiv
		});
	}
	function error() {
		alert('No podemos encontrar tu ubicación');
	}
	navigator.geolocation.getCurrentPosition(localitation, error);
}

document.getElementsByClassName('find-me')[0].addEventListener('click', findMe);

