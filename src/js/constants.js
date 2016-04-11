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
            king: 'king',
            queen: 'queen',
            knight: 'knight',
            bishop: 'bishop',
            rook: 'rook',
            pawn: 'pawn',
        },
        environment: 'development'
    };

    Object.freeze(consts);

    return consts;
} ());