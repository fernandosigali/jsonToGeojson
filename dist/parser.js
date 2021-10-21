function toGeoJSON(doc) {
    const project = getProject(doc);

    const canvasContainer = project["canvasContainer"];
    const geoContainer = project["geometryContainer"];
    const propContainer = project["propertyContainer"];

    const height = canvasContainer["F1"]["height"];
    const width = canvasContainer["F1"]["width"];

    const cells = geoContainer["cellGeometry"];
    const states = geoContainer["stateGeometry"];
    const transitions = geoContainer["transitionGeometry"];

    const polygons = getPolygons(cells, propContainer);
    const points = getPoints(states, propContainer);
    const lineStrings = getLineStrings(transitions, propContainer);

    const result = {
        canvas: {
            height,
            width,
        },
        geo: {
            polygons,
            points,
            lineStrings,
        },
    };

    return result;

    function getProject(doc) {
        for (const key in doc) {
            if (Object.keys(doc[key]).includes("geometryContainer")) {
                return doc[key];
            }
        }
        return undefined;
    }
    function getPolygons(cells, propertyContainer) {
        if (cells.length > 0) {
            let polis = [];
            for (var i in cells) {
                let property = propertyContainer["cellProperties"][i];
                let poli = {
                    geometry: {
                        type: "Polygon",
                        coordinates: [[]],
                    },
                    properties: { name: property.name },
                };
                for (let p of cells[i].points) {
                    poli.geometry.coordinates[0].push([p.point.x, height - p.point.y]);
                }
                polis.push(poli);
            }
            return polis;
        }
    }
    function getPoints(states, propertyContainer) {
        if (states.length > 0) {
            let pts = [];
            for (var i in states) {
                let property = propertyContainer["stateProperties"][i];
                let pt = {
                    geometry: {
                        type: "Point",
                        coordinates: [
                            states[i].point.point.x,
                            height - states[i].point.point.y,
                        ],
                    },
                    properties: { name: property.name },
                };
                pts.push(pt);
            }
            return pts;
        }
    }
    function getLineStrings(transitions, propertyContainer) {
        if (transitions.length > 0) {
            let lines = [];
            for (var i in transitions) {
                let property = propertyContainer["transitionProperties"][i];
                let line = {
                    geometry: {
                        type: "LineString",
                        coordinates: [],
                    },
                    properties: { name: property.name },
                };
                for (let p of transitions[i].points) {
                    line.geometry.coordinates.push([p.point.x, height - p.point.y]);
                }
                lines.push(line);
            }
            return lines;
        }
    }
}

if (typeof exports != "undefined") {
    module.exports = toGeoJSON;
} else {
    var toGeoJSON = toGeoJSON;
}