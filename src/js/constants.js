const CONST = (function() {
    'use strict';
    
    const boardSize = 400,
          tilesCount = 8;
    
    const consts = {
        black: '#3F92FF',
        white: '#FFFFFF',
        red: '#E84F68',
        tiles: tilesCount,
        boardSize: boardSize,
        tileSize: boardSize / tilesCount,
        pieceTypes: {
            king: 'king',
            queen: 'queen',
            knight: 'knight',
            bishop: 'bishop',
            rook: 'rook',
            pawn: 'pawn',
        },
        environment: 'development',
        spriteSrc: './imgs/pieces.png'
    };

    Object.freeze(consts);

    return consts;
} ());