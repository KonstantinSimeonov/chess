function Logic(CONST) {
    'use strict';

    const self = this;

    const piecesStartingCoordinates = (function () {

        const rooks = {
            type: CONST.pieceTypes.rook,
            coords: [
                { x: 0, y: 0, color: 'black' },
                { x: 7, y: 0, color: 'black' },
                { x: 0, y: 7, color: 'white' },
                { x: 7, y: 7, color: 'white' }
            ]
        },
            knights = {
                type: CONST.pieceTypes.knight,
                coords: [
                    { x: 1, y: 0, color: 'black' },
                    { x: 6, y: 0, color: 'black' },
                    { x: 1, y: 7, color: 'white' },
                    { x: 6, y: 7, color: 'white' }
                ]
            },
            bishops = {
                type: CONST.pieceTypes.bishop,
                coords: [
                    { x: 2, y: 0, color: 'black' },
                    { x: 5, y: 0, color: 'black' },
                    { x: 2, y: 7, color: 'white' },
                    { x: 5, y: 7, color: 'white' }
                ]
            },
            kings = {
                type: CONST.pieceTypes.king,
                coords: [
                    { x: 4, y: 0, color: 'black' },
                    { x: 4, y: 7, color: 'white' }
                ]
            },
            queens = {
                type: CONST.pieceTypes.queen,
                coords: [
                    { x: 3, y: 0, color: 'black' },
                    { x: 3, y: 7, color: 'white' }
                ]
            };

        return [rooks, knights, bishops, kings, queens];
    } ());

    const Piece = (function () {

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

            if (eqColor && (type === undefined)) {
                return true;
            }

            if (eqType && (color === undefined)) {
                return true;
            }

            return eqType && eqColor;
        };

        Piece.prototype.nullPiece = new Piece(null, null);

        return Piece;
    } ());

    const Board = (function () {

        function Board() {

            const self = this;

            for (let i = 0; i < CONST.tiles; i += 1) {
                self[i] = [];
            }

            for (let j = 0; j < CONST.tiles; j += 1) {
                self[1][j] = new Piece('black', CONST.pieceTypes.pawn);
                self[6][j] = new Piece('white', CONST.pieceTypes.pawn);
            }

            piecesStartingCoordinates.forEach(function (pieceSet) {

                pieceSet.coords.forEach(function (piece) {
                    self[piece.y][piece.x] = new Piece(piece.color, pieceSet.type);
                });

            });

            return self;
        }

        Board.prototype.piece = function (x, y, piece) {

            const self = this;

            if (piece) {
                // TODO: validation
                
                self[y][x] = piece;
                return piece;
            }

            if (self[y] && self[y][x]) {
                return self[y][x];
            }

            return Piece.prototype.nullPiece;
        };

        return Board;
    } ());

    function movePiece(from, to, board) {

        board.piece(to.x, to.y, board.piece(from.x, from.y));
        board.piece(from.x, from.y, Piece.prototype.nullPiece);
    }

    self.Board = Board;
    self.movePiece = movePiece;
    self.piecesStartingCoordinates = piecesStartingCoordinates;

    return self;
}