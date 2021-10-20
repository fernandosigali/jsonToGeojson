
let fs = require('fs')

let json_data = fs.readFileSync('parser_json_geojson/main.json')
let js_data = JSON.parse(json_data);

let cells = js_data['ic1cf5b6-b863-38b4-56c9-918af9253ae5']['geometryContainer']['cellGeometry']
let polis = [];

for(var i in cells){
    let poli = [];
    for(let p of cells[i].points){
        poli.push(p.point);
    }
    polis.push(poli);
}

console.log(polis)

let states = js_data['ic1cf5b6-b863-38b4-56c9-918af9253ae5']['geometryContainer']['stateGeometry'];
let pts = [];

for(var state of states){
    pts.push([state.point.point]);
}

console.log(pts);