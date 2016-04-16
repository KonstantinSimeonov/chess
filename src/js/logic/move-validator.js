var MoveValidator = function (CONST, utils) {
    'use strict';

    const self = this;

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
                attackedFromRight = board.piece(xRight, y).is(color, CONST.pieceTypes.pawn),
                pawns = [];

            if (attackedFromLeft) {
                pawns.push({ x: xLeft, y: y });
            }

            if (attackedFromRight) {
                pawns.push({ x: xRight, y: y });
            }

            return pawns;
        },

        byKing: function (tile, board, color) {
            const kings = kingDeltas
                .filter(delta => board
                                    .piece(tile.x + delta.x, tile.y + delta.y)
                                    .is(color, CONST.pieceTypes.king));

            return kings.map(delta => { return { x: tile.x + delta.x, y: tile.y + delta.y }; });
        },
        byKnight: function (tile, board, color) {
            const knights = knightDeltas
                                    .filter(delta => board
                                                        .piece(tile.x + delta.x, tile.y + delta.y)
                                                        .is(color, CONST.pieceTypes.knight));
                
            return knights.map(delta => { return { x: tile.x + delta.x, y: tile.y + delta.y }; });
        },

        byBishop: function (tile, board, color) {
            const oppositeColor = invertColor(color),
                bishops = [];

            bishopDeltas.forEach(function (delta) {
                let x = tile.x,
                    y = tile.y;

                while (!board.piece(x, y).is(null) && !board.piece(x, y).is(oppositeColor)) {
                    x += delta.x;
                    y += delta.y;

                    if (board.piece(x, y).is(color, CONST.pieceTypes.bishop) ||
                        board.piece(x, y).is(color, CONST.pieceTypes.queen)) {
                        bishops.push({ x, y });
                        return;
                    }
                }
            });

            return bishops;
        },
        byRook: function (tile, board, color) {
            const oppositeColor = invertColor(color),
                rooks = [];

            rookDeltas.forEach(function (delta) {
                let x = tile.x,
                    y = tile.y;

                while (!board.piece(x, y).is(null) && !board.piece(x, y).is(oppositeColor)) {
                    x += delta.x;
                    y += delta.y;

                    if (board.piece(x, y).is(color, CONST.pieceTypes.rook) ||
                        board.piece(x, y).is(color, CONST.pieceTypes.queen)) {
                        rooks.push({ x, y });
                        return;
                    }
                }
            });

            return rooks;
        }

    };

    self.isAttacked = function (tile, board, color) {

        const byPawn = attacked.byPawn(tile, board, color),
            byKing = attacked.byKing(tile, board, color),
            byKnight = attacked.byKnight(tile, board, color),
            byBishop = attacked.byBishop(tile, board, color),
            byRook = attacked.byRook(tile, board, color);

        return byPawn.concat(byKing, byKnight, byBishop, byRook);
    };

    function canMovePawnTo(from, to, board) {
        let pawn = board.piece(from.x, from.y);
        let deltaPawn = ((pawn.color === 'white') ? -1 : 1);

        if ((to.y - from.y) !== deltaPawn) {
            return false;
        }

        if ((from.x === to.x)) {
            return true;
        } else if (from.x === (to.x - 1)) {
            return board.piece(to.x - 1, to.y).is(invertColor(pawn));
        } else if (from.x === (to.x + 1)) {
            return board.piece(to.x + 1, to.y).is(invertColor(pawn));
        }

        return false;
    }

    self.isValidMove = function (from, to, board) {

        const color = board.piece(from.x, from.y).color,
            oppositeColor = invertColor(color);

        let result = true;

        if (board.piece(from.x, from.y).is(undefined, CONST.pieceTypes.pawn)) {
            result = canMovePawnTo(from, to, board);
        } else {
            result = self.isAttacked(to, board, color).some(tile => utils.equalAsPoints(tile, from));
        }

        if (result) {
            board.movePiece(from, to);

            const kingLocation = board.coordinatesOf(color, CONST.pieceTypes.king),
                piecesAttackingKing = self.isAttacked(kingLocation, board, oppositeColor);
            console.log(piecesAttackingKing);

            result = !piecesAttackingKing.length;

            board.movePiece(to, from);
        }

        return result;
    };

    return self;
};