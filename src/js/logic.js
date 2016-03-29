function Logic(CONST) {
    'use strict';

    var self = this,
        piecesStartingCoordinates;

    piecesStartingCoordinates = (function() {

        var rooks,
            knights,
            officers,
            kings,
            queens,
            piecesStartingCoordinates;

        rooks = {
            type: 5,
            coords: [
                { x: 0, y: 0, color: 'black' },
                { x: 7, y: 0, color: 'black' },
                { x: 0, y: 7, color: 'white' },
                { x: 7, y: 7, color: 'white' }
            ]
        };

        knights = {
            type: 3,
            coords: [
                { x: 1, y: 0, color: 'black' },
                { x: 6, y: 0, color: 'black' },
                { x: 1, y: 7, color: 'white' },
                { x: 6, y: 7, color: 'white' }
            ]
        };

        officers = {
            type: 4,
            coords: [
                { x: 2, y: 0, color: 'black' },
                { x: 5, y: 0, color: 'black' },
                { x: 2, y: 7, color: 'white' },
                { x: 5, y: 7, color: 'white' }
            ]
        };

        kings = {
            type: 1,
            coords: [
                { x: 4, y: 0, color: 'black' },
                { x: 4, y: 7, color: 'white' }
            ]
        };

        queens = {
            type: 2,
            coords: [
                { x: 3, y: 0, color: 'black' },
                { x: 3, y: 7, color: 'white' }
            ]
        };

        piecesStartingCoordinates = [rooks, knights, officers, kings, queens];

        return piecesStartingCoordinates;
    } ());

    function Piece(color, type) {

        var self = this;

        self.color = color;
        self.type = type;
    }

    function Board() {

        var rows = [],
            i,
            j;

        for (i = 0; i < CONST.boardSize; i += 1) {
            rows[i] = [];
        }

        for (j = 0; j < CONST.boardSize; j += 1) {
            rows[1][j] = new Piece('black', CONST.pieceTypes.pawn);
            rows[6][j] = new Piece('white', CONST.pieceTypes.pawn);
        }

        piecesStartingCoordinates.forEach(function(pieceSet) {

            pieceSet.coords.forEach(function(piece) {
                rows[piece.y][piece.x] = new Piece(piece.color, pieceSet.type);
            });

        });

        return rows;
    }

    function movePiece(from, to, field) {

        field[to.y][to.x] = field[from.y][from.x];
        field[from.y][from.x] = null;
    }
    
    self.Board = Board;
    self.movePiece = movePiece;
    self.piecesStartingCoordinates = piecesStartingCoordinates;
    
    return self;
};