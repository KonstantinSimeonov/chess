function Logic(CONST) {
    'use strict';

    var self = this,
        piecesStartingCoordinates,
        Piece;

    piecesStartingCoordinates = (function () {

        var rooks,
            knights,
            bishops,
            kings,
            queens,
            piecesStartingCoordinates;

        rooks = {
            type: CONST.pieceTypes.rook,
            coords: [
                { x: 0, y: 0, color: 'black' },
                { x: 7, y: 0, color: 'black' },
                { x: 0, y: 7, color: 'white' },
                { x: 7, y: 7, color: 'white' }
            ]
        };

        knights = {
            type: CONST.pieceTypes.knight,
            coords: [
                { x: 1, y: 0, color: 'black' },
                { x: 6, y: 0, color: 'black' },
                { x: 1, y: 7, color: 'white' },
                { x: 6, y: 7, color: 'white' }
            ]
        };

        bishops = {
            type: CONST.pieceTypes.bishop,
            coords: [
                { x: 2, y: 0, color: 'black' },
                { x: 5, y: 0, color: 'black' },
                { x: 2, y: 7, color: 'white' },
                { x: 5, y: 7, color: 'white' }
            ]
        };

        kings = {
            type: CONST.pieceTypes.king,
            coords: [
                { x: 4, y: 0, color: 'black' },
                { x: 4, y: 7, color: 'white' }
            ]
        };

        queens = {
            type: CONST.pieceTypes.queen,
            coords: [
                { x: 3, y: 0, color: 'black' },
                { x: 3, y: 7, color: 'white' }
            ]
        };

        piecesStartingCoordinates = [rooks, knights, bishops, kings, queens];

        return piecesStartingCoordinates;
    } ());

    Piece = (function () {

        function Piece(color, type) {

            var self = this;

            self.color = color;
            self.type = type;
        }

        function isInsideBoard(x, y) {
            return (0 <= x && x < CONST.boardSize) && (0 <= y && y < CONST.boardSize);
        }

        Piece.prototype.is = function (color, type) {

            let eqColor = this.color === color,
                eqType = this.type === type;

            return (eqColor && !type) || (eqType && !color) || (eqType && eqColor);
        };
        
        Piece.prototype.nullPiece = new Piece(null, null);

        return Piece;
    } ());

    let Board = (function () {

        function Board() {

            let self = this;

            for (let i = 0; i < CONST.boardSize; i += 1) {
                self[i] = [];
            }

            for (let j = 0; j < CONST.boardSize; j += 1) {
                self[1][j] = new Piece('black', CONST.pieceTypes.pawn);
                self[6][j] = new Piece('white', CONST.pieceTypes.pawn);
            }



            piecesStartingCoordinates.forEach(function (pieceSet) {

                pieceSet.coords.forEach(function (piece) {
                    rows[piece.y][piece.x] = new Piece(piece.color, pieceSet.type);
                });

            });

            return self;
        }
        
        Board.prototype.piece = function (x, y, piece) {
            
            if(piece) {
                // TODO: validation
                
                this[y][x] = piece;
                return piece;
            }
            
            if(this[y] && this[y][x]) {
                return this[y][x];
            }
            
            return Piece.prototype.nullPiece;
        };
        
        return Board;
    } ());

    function movePiece(from, to, field) {

        field[to.y][to.x] = field[from.y][from.x];
        field[from.y][from.x] = null;
    }

    self.Board = Board;
    self.movePiece = movePiece;
    self.piecesStartingCoordinates = piecesStartingCoordinates;

    return self;
}