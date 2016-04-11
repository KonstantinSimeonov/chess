var MoveValidator = function (CONST) {
    'use strict';

    let self = this;

    function isInsideBoard(x, y) {
        return (0 <= x && x < CONST.boardSize) && (0 <= y && y < CONST.boardSize);
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
    ];

    const pawnDeltas = [
        { x: 1, y: 1 },
        { x: -1, y: 1 }
    ];

    const rookDeltas = [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: 0, y: -1 },
    ];

    const bishopDeltas = [
        { x: 1, y: 1 },
        { x: 1, y: -1 },
        { x: -1, y: 1 },
        { x: -1, y: -1 },
    ];

    const kingDeltas = [
        { x: 1, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: -1 },
        { x: -1, y: 1 },
        { x: -1, y: 0 },
        { x: -1, y: -1 },
        { x: 0, y: 1 },
        { x: 0, y: -1 },
    ];

    function attackedByPawn(tile, board, color) {
        let y = tile.y + (color === 'white' ? -1 : 1),
            xLeft = tile.x - 1,
            xRight = tile.x + 1;
        
        if(isInsideBoard(xLeft, y) && board[y][xLeft] && board[y][xLeft].color === color && board[y][xLeft].type === 1) {
            return true;
        } 
        
        if(isInsideBoard(xLeft, y) && board[y][xRight] && board[y][xRight].color === color && board[y][xRight].type === 1) {
            return true;
        } 
    }

    self.isAttacked = x => true;

    return self;
};