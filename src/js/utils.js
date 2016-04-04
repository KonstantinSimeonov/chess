var utils = (function (CONST) {
    'use strict';
    
    function coordsToTiles(coords) {
        return { x:  coords.x / CONST.tileSize | 0, y: coords.y / CONST.tileSize | 0 };
    }
    
    function equalAsPoints(pointA, pointB) {
        return (pointA.x === pointB.x) && (pointA.y === pointB.y);
    }
    
    return {
        coordsToTiles,
        equalAsPoints
    };
} (CONST));