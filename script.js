let puntos = [];
let poligonoActual = null;
let marcadorInicial = null;

// CAPAS
var light = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
});

var dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '© OpenStreetMap & CartoDB'
});

// MAPA (solo UNA vez)
var map = L.map('map', {
  center: [-34.6037, -58.3816],
  zoom: 13,
  layers: [light] // arranca en light
});

// CONTROL
var baseMaps = {
  "☀️ Light": light,
  "🌙 Dark": dark
};
L.control.layers(baseMaps).addTo(map);

// ICONO
var greenIcon = L.icon({
  iconUrl: 'gordito.jpg',
  shadowUrl: 'leaf-shadow.png',
  iconSize: [38, 95],
  shadowSize: [50, 64],
  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76]
});

// MARCADOR INICIAL
marcadorInicial = L.marker([-34.6037, -58.3816], {icon: greenIcon})
  .addTo(map)
  .bindPopup("Ubicación inicial")
  .openPopup();

// EVENTO CLICK
map.on('click', function(e) {
  puntos.push([e.latlng.lat, e.latlng.lng]);

  if (puntos.length === 4) {
    poligonoActual = L.polygon(puntos, { color: 'blue' }).addTo(map);
  }
});

// BOTÓN RESET
document.getElementById("boton").onclick = function() {
  if (poligonoActual) map.removeLayer(poligonoActual);
  if (marcadorInicial) map.removeLayer(marcadorInicial);
  puntos = [];
};
