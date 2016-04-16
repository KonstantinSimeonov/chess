var Picasso = function(CONST, canvas, logic, logger) {
    'use strict';

    let ctx = canvas.getContext('2d'),
        fillStyle,
        sprites = new Image(),
        self = this;

    sprites.src = CONST.spriteSrc;

    function drawTile(x, y) {
        const color = ((y * CONST.tiles + x) % 2 === y % 2) ? 'white' : 'black';
        fillStyle = ctx.fillStyle;
        ctx.fillStyle = CONST[color];
        
        ctx.fillRect(x * CONST.tileSize, y * CONST.tileSize, CONST.tileSize, CONST.tileSize);
        
        ctx.fillStyle = fillStyle;
    }

    function fillBoard() {
        
        let i,
            j,
            isWhite,
            tiles = CONST.tiles;

        for (i = 0; i < tiles; i += 1) {
            for (j = 0; j < tiles; j += 1) {
                isWhite = (i * tiles + j) % 2 === i % 2;
                drawTile(j, i, isWhite ? 'white' : 'black');
            }
        }
    }
    
    const typeMap = {
        king: 1,
        queen: 2,
        knight: 3,
        bishop: 4,
        rook: 5,
        pawn: 7
    };
    
    function drawPiece(x, y, color, type) {
        
        const offsetX = (typeMap[type] - 1) * 60,
            offsetY = (color === 'white' ? 0 : 1) * 60;

        ctx.drawImage(sprites, offsetX, offsetY, 60, 60, x * CONST.tileSize, y * CONST.tileSize, 35, 35);
    }

    function drawPieces() {
        
        const blackRow = 1,
            whiteRow = 6,
            pawn = CONST.pieceTypes.pawn,
            drawData = logic.piecesStartingCoordinates;
            
        for (let x = 0; x < CONST.tiles; x += 1) {
            drawPiece(x, blackRow, 'black', pawn);
            drawPiece(x, whiteRow, 'white', pawn);
        }

        drawData.forEach(function(info) {

            info.coords.forEach(function(point) {
                drawPiece(point.x, point.y, point.color, info.type);
            });

        });
    }

    self.fillBoard = fillBoard;
    self.drawPiece = drawPiece;
    self.drawTile = drawTile;
    self.drawPieces = drawPieces;

    return self;
};