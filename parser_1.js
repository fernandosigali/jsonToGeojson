
let fs = require("fs");
let pg = require("pg");

// Conexão com o banco de dados
conn = new pg.Client({
    host: "localhost",
    database: "editor_geometries",
    user: "testes",
    password: "testes",
    port: "5432"
}
);
conn.connect();

async function insert(table_name, obj){
    console.log(`INSERT INTO ${table_name} (name, geom) VALUES ('${obj.properties.name}', ST_GeomFromGeoJSON('${JSON.stringify(obj.geometry)}'))`);
    await conn.query(
        `INSERT INTO ${table_name} (name, geom) VALUES ('${obj.properties.name}', ST_GeomFromGeoJSON('${JSON.stringify(obj.geometry)}'))`
    );
}

let json_data = fs.readFileSync("main_c_transition.json");
let js_data = JSON.parse(json_data);

let cells = js_data["ic1cf5b6-b863-38b4-56c9-918af9253ae5"]["geometryContainer"]["cellGeometry"];
if (cells.length > 0){
    // Query para db
    conn.query(
        `CREATE TABLE IF NOT EXISTS cells (
            name VARCHAR,
            geom geometry(Polygon)
            )`
    );
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
            poli.geometry.coordinates[0].push([p.point.x, p.point.y]);
        }
        insert('cells', poli);
        polis.push(poli);
    }
    console.log(polis);
}


let states = js_data["ic1cf5b6-b863-38b4-56c9-918af9253ae5"]["geometryContainer"]["stateGeometry"];
if (states.length > 0){
    
    conn.query(
        `CREATE TABLE IF NOT EXISTS states (
            name VARCHAR,
            geom geometry(Point)
            )`
    );

    let pts = [];
    for(var i in states){
        let property = js_data["ic1cf5b6-b863-38b4-56c9-918af9253ae5"]["propertyContainer"]["stateProperties"][i];
        let pt = {
            geometry: {
                type: "Point",
                coordinates: [states[i].point.point.x, states[i].point.point.y],
            },
            properties: {name: property.name}
        }
        insert('states', pt);
        pts.push(pt);
    }
    console.log(pts);
}


let transitions = js_data["ic1cf5b6-b863-38b4-56c9-918af9253ae5"]["geometryContainer"]["transitionGeometry"];
if (transitions.length > 0){
    
    
    conn.query(
        `CREATE TABLE IF NOT EXISTS transitions (
            name VARCHAR,
            geom geometry(LineString)
            )`
    );

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
            line.geometry.coordinates.push([p.point.x, p.point.y]);
        }
        insert('transitions', line);
        lines.push(line);
        }
    console.log(lines)
}
