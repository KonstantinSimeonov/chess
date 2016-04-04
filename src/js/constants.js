var CONST = (function() {
    'use strict';
    
    var consts = {
        black: '#3F92FF',
        white: '#FFFFFF',
        red: '#E84F68',
        tiles: 8,
        boardSize: 300,
        tileSize: 300 / 8,
        pieceTypes: {
            king: 1,
            queen: 2,
            knight: 3,
            officer: 4,
            rook: 5,
            pawn: 7,
        },
        environment: 'development'
    };

    Object.freeze(consts);

    return consts;
} ());