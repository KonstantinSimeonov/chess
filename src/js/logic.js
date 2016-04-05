function Logic(CONST) {
    'use strict';

    var self = this,
        piecesStartingCoordinates,
        Piece;

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

    Piece = (function() {
        function Piece(color, type) {

            var self = this;

            self.color = color;
            self.type = type;
        }

        let generateMoves = (function() {
            function isInsideBoard(x, y) {
                return (0 <= x && x < CONST.boardSize) && (0 <= y && y < CONST.boardSize);
            }

            function generateMovesPawn(from, board) {
                var moves = [],
                    pawn = board[from.y][from.x],
                    delta = (pawn.color === 'white') ? -1 : 1;
                console.log(pawn, delta);
                if (!board[from.y + delta][from.x]) {
                    moves.push({ x: from.x, y: from.y + delta });
                }

                if (board[from.y + delta][from.x + 1] && board[from.y + delta][from.x + 1].color !== pawn.color) {
                    moves.push({ x: from.x + 1, y: from.y + delta });
                }

                if (board[from.y + delta][from.x - 1] && board[from.y + delta][from.x - 1].color !== pawn.color) {
                    moves.push({ x: from.x - 1, y: from.y + delta });
                }
                console.log(moves);
                return moves;
            }
            
            function generateKnightMoves(from, board) {
                let moves = [],
                    knight = board[from.y][from.x],
                    deltas = [
                        { x: 2, y: 1 },
                        { x: 2, y: -1 },
                        { x: -2, y: 1 },
                        { x: -2, y: -1 },
                        { x: 1, y: 2 },
                        { x: 1, y: -2 },
                        { x: -1, y: 2 },
                        { x: -1, y: -2 },
                    ];
                    
                deltas.forEach(function(delta) {
                    
                    if(!isInsideBoard(from.x + delta.x, from.y + delta.y)) {
                        return;
                    }
                    
                    let pieceAtTile = board[from.y + delta.y][from.x + delta.x],
                        isValidMove =  !pieceAtTile || (pieceAtTile && pieceAtTile.color !== knight.color);
                    
                    if(isValidMove) {
                        moves.push({ x: from.x + delta.x, y: from.y + delta.y });
                    }
                });
                
                return moves;
            }

            function generateLinearMoves(from, board, deltas) {
                let moves = [],
                    piece = board[from.y][from.x];

                deltas.forEach(function(delta) {

                    for (let x = from.x + delta.x, y = from.y + delta.y; isInsideBoard(x, y); x += delta.x, y += delta.y) {

                        if (board[y][x]) {
                            if (board[y][x].color !== piece.color) {
                                moves.push({ x, y });
                            }

                            break;
                        } else {
                            moves.push({ x, y });
                        }
                    }

                });

                return moves;
            }

            const bishopDeltas = [
                { x: 1, y: 1 },
                { x: 1, y: -1 },
                { x: -1, y: 1 },
                { x: -1, y: -1 }
            ];

            const rookDeltas = [
                { x: 1, y: 0 },
                { x: -1, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: -1 }
            ];
            
            const queenDeltas = bishopDeltas.concat(rookDeltas);

            return {
                forPawn: generateMovesPawn,
                forBishop: (from, board) => generateLinearMoves(from, board, bishopDeltas),
                forRook: (from, board) => generateLinearMoves(from, board, rookDeltas),
                forQueen: (from, board) => generateLinearMoves(from, board, queenDeltas),
                forKnight: generateKnightMoves
            };
        } ());

        Piece.prototype.getPawnMoves = generateMoves.forPawn;
        Piece.prototype.getBishopMoves = generateMoves.forBishop;
        Piece.prototype.getQueenMoves = generateMoves.forQueen;
        Piece.prototype.getRookMoves = generateMoves.forRook;
        Piece.prototype.getKnightMoves = generateMoves.forKnight;

        Piece.prototype.canMoveTo = function(from, to, board) {

            var isValidMove = !!this.getPossibleMoves(from, board).filter(function(point) {
                return point.x === to.x && point.y === to.y;
            }).length;

            return isValidMove;
        };

        return Piece;
    } ());

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
}