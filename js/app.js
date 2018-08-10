$(document).ready(function(){
	$('.box2').delay('1000').fadeIn('slow')
	$("#controlers input").attr('disabled', true);
	$("#slider_seek").click(function(evt,arg){
		var left = evt.offsetX;
		DZ.player.seek((evt.offsetX/$(this).width()) * 100);
	});
	$("a#mapPop").on("click", function () {
	$('#myModal').modal({ show: true });
  });
});
DZ.init({
	appId  : '8',
	channelUrl : 'https://www.deezer.com/en/playlist/4752912028',
	player : {
		container : 'player',
		cover : true,
		playlist : true,
		width : 300,
		height : 200,
		onload : onPlayerLoaded
	}
});

function event_listener_append() {
	var pre = document.getElementById('event_listener');
	var line = [];
	for (var i = 0; i < arguments.length; i++) {
		line.push(arguments[i]);
	}
	pre.innerHTML += line.join(' ') + "\n";
}
function onPlayerLoaded() {
	$("#controlers input").attr('disabled', false);
	event_listener_append('player_loaded');
	DZ.Event.subscribe('current_track', function(arg){
		event_listener_append('current_track', arg.index, arg.track.title, arg.track.album.title);
	});
	DZ.Event.subscribe('player_position', function(arg){
		event_listener_append('position', arg[0], arg[1]);
		$("#slider_seek").find('.bar').css('width', (100*arg[0]/arg[1]) + '%');
	});
}


var musicIcon = L.icon({
    iconUrl: './assets/music_pin.png',
    iconSize:     [30, 40], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

function loadMap(){
	//Leaflet Map
	var initialCoordinates = [-23.5482751, -46.6350981]; // Sao Paulo
	var initialZoomLevel = 20;

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
