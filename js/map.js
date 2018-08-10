//Create personal icon
var musicIcon = L.icon({
    iconUrl: './assets/music_pin.png',
    iconSize:     [30, 40], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

function loadMap(){
	//Leaflet Map
	var initialCoordinates = [-23.5494, -46.6366]; // Sao Paulo
	var initialZoomLevel = 15;

	// create a map in the "map" div, set the view to a given place and zoom
	var map = L.map('map').setView(initialCoordinates, initialZoomLevel);

	// add an OpenStreetMap tile layer
	L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  	attribution: '&copy; Contribuidores do <a href="https://osm.org/copyright">OpenStreetMap</a>'
	}).addTo(map);

	pontosTuristicos.forEach(ponto => {
		let coordinates = [ponto.latitude, ponto.longitude];
		L.marker(coordinates, {icon: musicIcon}).addTo(map).openPopup();
	});
}

loadMap();
