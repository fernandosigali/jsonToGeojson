
let fs = require("fs");

let json_data = fs.readFileSync("main_c_transition.json");
let js_data = JSON.parse(json_data);


let height = js_data["ic1cf5b6-b863-38b4-56c9-918af9253ae5"]["canvasContainer"]["F1"]["height"];
let cells = js_data["ic1cf5b6-b863-38b4-56c9-918af9253ae5"]["geometryContainer"]["cellGeometry"];
if (cells.length > 0){

    let polis = [];
    for(var i in cells){
        let property = js_data["ic1cf5b6-b863-38b4-56c9-918af9253ae5"]["propertyContainer"]["cellProperties"][i];
        let poli = {
                geometry: {
                    type: "Polygon",    
                    coordinates: [[]],
                },
                properties: {name: property.name},
            };
        for(let p of cells[i].points){
            poli.geometry.coordinates[0].push([p.point.x, height - p.point.y]);
        }
        polis.push(poli);
    }
    console.log(polis);
    fs.writeFileSync('polis.json',JSON.stringify(polis));
}


let states = js_data["ic1cf5b6-b863-38b4-56c9-918af9253ae5"]["geometryContainer"]["stateGeometry"];
if (states.length > 0){

    let pts = [];
    for(var i in states){
        let property = js_data["ic1cf5b6-b863-38b4-56c9-918af9253ae5"]["propertyContainer"]["stateProperties"][i];
        let pt = {
            geometry: {
                type: "Point",
                coordinates: [states[i].point.point.x, height - states[i].point.point.y],
            },
            properties: {name: property.name}
        }
        pts.push(pt);
    }
    console.log(pts);
}


let transitions = js_data["ic1cf5b6-b863-38b4-56c9-918af9253ae5"]["geometryContainer"]["transitionGeometry"];
if (transitions.length > 0){

    let lines = [];
    for(var i in transitions){
        let property = js_data["ic1cf5b6-b863-38b4-56c9-918af9253ae5"]["propertyContainer"]["transitionProperties"][i];
        let line = {
            geometry: {
                type: "LineString",    
                coordinates: [],
            },
            properties: {name: property.name}
            };
        for(let p of transitions[i].points){
            line.geometry.coordinates.push([p.point.x, height - p.point.y]);
        }
        lines.push(line);
        }
    console.log(lines)
}


