
// Leaflet testes com a planta

var mymap = L.map('mapid', {
    maxZoom: 24,
    minZoom: 0.5,
    crs: L.CRS.Simple
}).setView([0, 0], 1);

// mymap.setMaxBounds(new L.LatLngBounds([800,-200], [1000,0]));


var imageUrl ='C:/Users/admpdi.UO631M40008566/Documents/Taggen/Parser/planta_baixa/public/js/leaflet.js'
var imageBounds = [[653,0], [0,954]];

L.imageOverlay("http://10.167.1.73:8000/planta/image/", imageBounds).addTo(mymap).bringToBack();


var oReq2 = new XMLHttpRequest(); 
oReq2.onload = function() {
    console.log(JSON.parse(this.response));
    JSON.parse(this.response).forEach(element => {
        L.geoJSON(JSON.parse(element.geom)).addTo(mymap).bindPopup(`${element['nome']}`);
    })
};

// Tenta a requisição numa route /mapa/get_predios/ que retorna os dados dos predios do db
oReq2.open("get", "http://10.167.1.73:8000/planta/get_cells/", true); 
oReq2.send();