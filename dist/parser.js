function toGeoJSON(doc) {
    const project = getProject(doc);

    const canvasContainer = project.canvasContainer;
    const geoContainer = project.geometryContainer;
    const propContainer = project.propertyContainer;

    const height = canvasContainer.F1.height;
    const width = canvasContainer.F1.width;

    const cells = geoContainer.cellGeometry;
    const states = geoContainer.stateGeometry;
    const transitions = geoContainer.transitionGeometry;

    const cellProps = propertyContainer.cellProperties;
    const stateProps = propertyContainer.stateProperties
    const transitionProps = propertyContainer.transitionProperties;

    const polygons = getPolygons(cells, cellProps, height);
    const points = getPoints(states, stateProps, height);
    const lineStrings = getLineStrings(transitions, transitionProps, height);

    const result = {
        canvas: { height, width },
        geo: { polygons, points, lineStrings }
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
    function getPolygons(cells, cellProps, height) {
        if (cells.length < 1) return [];
        return cells.map((c, idx) => getPolygon(c, cellProps[idx].name, height));
    }
    function getPoints(states, stateProps, height) {
        if (states.length < 1) return [];
        return states.map((s, idx) => getPoint(s, stateProps[idx].name, height));
    }
    function getLineStrings(transitions, transitionProps, height) {
        if (transitions.length < 1) return [];
        return transitions.map((t, idx) => getLineString(t, transitionProps[idx].name, height));
    }
    function getPolygon(cell, name, height) {
        const coordinates = [
            cell.points.map(p => [p.point.x, Number(height - p.point.y)])
        ];
        return {
            geometry: getPolygonGeoJSON(coordinates),
            properties: { name },
        };
    }
    function getPoint(state, name, height) {
        const coordinates = [
            state.point.point.x, Number(height - state.point.point.y)
        ];
        return {
            geometry: getPointGeoJSON(coordinates),
            properties: { name }
        }
    }
    function getLineString(transition, name, height) {
        const coordinates = [
            transition.points.map(p => [p.point.x, Number(height - p.point.y)])
        ];
        return {
            geometry: getLineStringGeoJSON(coordinates),
            properties: { name },
        }
    }
    function getPolygonGeoJSON(coordinates) {
        return { type: "Polygon", coordinates };
    }
    function getPointGeoJSON(coordinates) {
        return { type: "Point", coordinates };
    }
    function getLineStringGeoJSON(coordinates) {
        return { type: "LineString", coordinates };
    }
}

if (typeof exports != "undefined") {
    module.exports = toGeoJSON;
} else {
    var toGeoJSON = toGeoJSON;
}