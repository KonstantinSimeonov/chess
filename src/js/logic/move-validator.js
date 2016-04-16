var MoveValidator = function (CONST) {
    'use strict';

    let self = this;

    function invertColor(color) {
        if (color === 'white') {
            return 'black';
        }

        return 'white';
    }

    const knightDeltas = [
        { x: 1, y: -2 },
        { x: 1, y: 2 },
        { x: -1, y: -2 },
        { x: -1, y: 2 },
        { x: 2, y: 1 },
        { x: 2, y: -1 },
        { x: -2, y: 1 },
        { x: -2, y: -2 }
    ],
        rookDeltas = [
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: -1, y: 0 },
            { x: 0, y: -1 },
        ],
        bishopDeltas = [
            { x: 1, y: 1 },
            { x: 1, y: -1 },
            { x: -1, y: 1 },
            { x: -1, y: -1 },
        ],
        kingDeltas = [
            { x: 1, y: 1 },
            { x: 1, y: 0 },
            { x: 1, y: -1 },
            { x: -1, y: 1 },
            { x: -1, y: 0 },
            { x: -1, y: -1 },
            { x: 0, y: 1 },
            { x: 0, y: -1 },
        ];

    const attacked = {
        byPawn: function (tile, board, color) {
            const y = tile.y + ((color === 'white') ? 1 : -1),
                xLeft = tile.x - 1,
                xRight = tile.x + 1,
                attackedFromLeft = board.piece(xLeft, y).is(color, CONST.pieceTypes.pawn),
                attackedFromRight = board.piece(xRight, y).is(color, CONST.pieceTypes.pawn);

            return attackedFromLeft || attackedFromRight;
        },

        byKing: (tile, board, color) => kingDeltas.some(delta => board
            .piece(tile.x + delta.x, tile.y + delta.y)
            .is(color, CONST.pieceTypes.king)),

        byKnight: (tile, board, color) => knightDeltas.some(delta => board
            .piece(tile.x + delta.x, tile.y + delta.y)
            .is(color, CONST.pieceTypes.knight)),

        byBishop: function (tile, board, color) {
            const oppositeColor = invertColor(color);

            const attacked = bishopDeltas.some(function (delta) {
                let x = tile.x,
                    y = tile.y;

                while (!board.piece(x, y).is(null) && !board.piece(x, y).is(oppositeColor)) {
                    x += delta.x;
                    y += delta.y;

                    if (board.piece(x, y).is(color, CONST.pieceTypes.bishop) ||
                        board.piece(x, y).is(color, CONST.pieceTypes.queen)) {
                        return true;
                    }
                }

                return false;
            });

            return attacked;
        },
        byRook: function (tile, board, color) {
            const oppositeColor = invertColor(color);

            const attacked = rookDeltas.some(function (delta) {
                let x = tile.x,
                    y = tile.y;

                while (!board.piece(x, y).is(null) && !board.piece(x, y).is(oppositeColor)) {
                    x += delta.x;
                    y += delta.y;

                    if (board.piece(x, y).is(color, CONST.pieceTypes.rook) ||
                        board.piece(x, y).is(color, CONST.pieceTypes.queen)) {
                        return true;
                    }
                }
            });

            return attacked;
        }

    };

    self.isAttacked = function (tile, board, color) {

        const byPawn = attacked.byPawn(tile, board, color),
            byKing = attacked.byKing(tile, board, color),
            byKnight = attacked.byKnight(tile, board, color),
            byBishop = attacked.byBishop(tile, board, color),
            byRook = attacked.byRook(tile, board, color);

        return [byPawn, byKnight, byKing, byRook, byBishop].some(x => x);
    };

    return self;
};