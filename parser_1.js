
const fs = require("fs");
const toGeoJSON = require('./dist/parser');

let json_data = fs.readFileSync("main_c_transition.json");
let js_data = JSON.parse(json_data);

const geoJson = toGeoJSON(js_data);
console.log(geoJson);
