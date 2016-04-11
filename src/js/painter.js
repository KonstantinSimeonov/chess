var Picasso = function(CONST, canvas, logic, logger) {
    'use strict';

    var ctx = canvas.getContext('2d'),
        fillStyle,
        sprites = new Image(),
        self = this;

    sprites.src = './imgs/pieces.png';

    function drawTile(x, y, color) {
        
        fillStyle = ctx.fillStyle;
        ctx.fillStyle = CONST[color];
        
        ctx.fillRect(x, y, CONST.tileSize, CONST.tileSize);
        
        ctx.fillStyle = fillStyle;
    }

    function fillBoard() {
        
        var i,
            j,
            isWhite,
            tiles = CONST.tiles;

        for (i = 0; i < tiles; i += 1) {
            for (j = 0; j < tiles; j += 1) {
                isWhite = (i * tiles + j) % 2 === i % 2;
                drawTile(CONST.tileSize * j, CONST.tileSize * i, isWhite ? 'white' : 'black');
            }
        }
    }
    
    let typeMap = {
        king: 1,
        queen: 2,
        knight: 3,
        bishop: 4,
        rook: 5,
        pawn: 7
    };
    
    function drawPiece(x, y, color, type) {

        var offsetX = (typeMap[type] - 1) * 60,
            offsetY = (color === 'white' ? 0 : 1) * 60;

        ctx.drawImage(sprites, offsetX, offsetY, 60, 60, x, y, 35, 35);

        logger.log('drawing a piece');
    }

    function drawPieces() {
        
        var blackRow = 1,
            whiteRow = 6,
            pawn = CONST.pieceTypes.pawn,
            drawData = logic.piecesStartingCoordinates,
            j;

        for (j = 0; j < CONST.tiles; j += 1) {
            drawPiece(j * CONST.tileSize, blackRow * CONST.tileSize, 'black', pawn);
            drawPiece(j * CONST.tileSize, whiteRow * CONST.tileSize, 'white', pawn);
        }

        drawData.forEach(function(info) {

            info.coords.forEach(function(point) {
                drawPiece(point.x * CONST.tileSize, point.y * CONST.tileSize, point.color, info.type);
            });

        });
    }

    self.fillBoard = fillBoard;
    self.drawPiece = drawPiece;
    self.drawTile = drawTile;
    self.drawPieces = drawPieces;

    return self;
};