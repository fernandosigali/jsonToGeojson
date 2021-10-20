
// Leaflet com imagens teste


var mymap = L.map('mapid', {
    maxZoom: 24,
    minZoom: 1,
    crs: L.CRS.Simple
}).setView([0, 0], 1);

mymap.setMaxBounds(new L.LatLngBounds([-200,1000], [500,-500]));

var imageUrl ='C:/Users/admpdi.UO631M40008566/Documents/Taggen/download.jpg'
var imageBounds = [[250,0], [0,500]];

L.imageOverlay(imageUrl, imageBounds).addTo(mymap);



let btn = document.querySelector(".btn");

// Adiciona a camada de mapa com as funcionalidades (leaflet)
// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { 
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'your.mapbox.access.token'
// }).addTo(mymap);


// Adiciona a funcionalidade de obter os dados do banco de dados e os printa como circulos no mapa. 
// btn.onclick = function(){

//     // Cria a requisição dos pontos
//     var oReq = new XMLHttpRequest(); 

//     oReq.onload = function() {
//         // console.log(JSON.parse(this.response));
        
//         // A requisição é retornada em JSON, por isso o JSON.parse deve ser utilizado. 
//         JSON.parse(this.response).forEach(element => {

//             // Para cada registro do db, desenha um circulo e adiciona o bindPopup com o identificador.
//             let circle = L.circle([element['y'], element['x']], {
//                 color: 'blue',
//                 fillColor: 'blue',
//                 fillOpacity: 1,
//                 radius: 3
//         }).addTo(mymap).bindPopup(`Identificador: ${element['id']}`)
//         })
//     };

//     // Tenta a requisição numa route /mapa/get_pontos/ que retorna os dados dos pontos db
//     oReq.open("get", "http://10.167.1.73:8000/mapa/get_pontos/", true); 
//     oReq.send();
// };



