let puntos = [];
let poligonoActual = null;
let marcadorInicial = null;

var map = L.map('map').setView([-34.6037, -58.3816], 13);

var greenIcon = L.icon({
    iconUrl: 'gordito.jpg',
    shadowUrl: 'leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution: 'OpenStreetMap'
}).addTo(map);

marcadorInicial = L.marker([-34.6037, -58.3816], {icon: greenIcon}).addTo(map)
   .addTo(map)
   .bindPopup("Ubicación inicial")
   .openPopup();

map.on('click', function(e) {
   puntos.push([e.latlng.lat, e.latlng.lng]);

   if (puntos.length === 4) {
       poligonoActual = L.polygon(puntos, { color: 'blue' }).addTo(map);
   }
});

document.getElementById("boton").onclick = function() {
   if (poligonoActual) map.removeLayer(poligonoActual);
   if (marcadorInicial) map.removeLayer(marcadorInicial);
   puntos = [];
};
