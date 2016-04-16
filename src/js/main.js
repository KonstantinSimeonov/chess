(function(CONST, Canvas, Painter, Logic, Logger, MoveValidator) {
    'use strict';

    var logger = new Logger('console', CONST.environment),
        canvas = new Canvas(CONST.boardSize, CONST.boardSize),
        logic = new Logic(CONST),
        painter = new Painter(CONST, canvas, logic, logger),
        board = new logic.Board(),
        validator = new MoveValidator(CONST),
        from = {},
        last = {},
        isDragging = false,
        draggedPiece = null;

    painter.fillBoard();
    painter.drawPieces();
    
    function canvasMouseDown(ev) {

        var offX = document.body.scrollLeft,
            offY = document.body.scrollTop,
            coords = utils.coordsToTiles({ x: ev.clientX - offX, y: ev.clientY - offY });
        // console.log(validator.isAttacked(coords, board, 'white'), 'white');
        console.log(validator.isAttacked(coords, board, 'black'), 'black');
        if (board.piece(coords.x, coords.y).is(null)) {
            return;
        }
        
        
        
        // wtf js?
        from.x = coords.x;
        from.y = coords.y;

        last.x = coords.x;
        last.y = coords.y;

        isDragging = true;
        draggedPiece = board[from.y][from.x];
       
    }

    function canvasMouseMove(ev) {

        var offX,
            offY,
            tileColor,
            color,
            type,
            coords,
            x,
            y;

        if (!isDragging || !draggedPiece) {
            return;
        }

        offX = document.body.scrollLeft;
        offY = document.body.scrollTop;
        coords = utils.coordsToTiles({ x: ev.clientX - offX, y: ev.clientY - offY });
        x = last.x * CONST.tileSize;
        y = last.y * CONST.tileSize;

        if (board[last.y][last.x] && !utils.equalAsPoints(from, last)) {

            color = board[last.y][last.x].color;
            type = board[last.y][last.x].type;

            painter.drawPiece(x, y, color, type);
        } else {

            tileColor = ((last.y * CONST.tiles + last.x) % 2 === last.y % 2) ? 'white' : 'black';

            painter.drawTile(x, y, tileColor);
        }

        last.x = coords.x;
        last.y = coords.y;

        painter.drawPiece(coords.x * CONST.tileSize, coords.y * CONST.tileSize, draggedPiece.color, draggedPiece.type);

        isDragging = true;
    }

    function canvasMouseUp(ev) {

        var offX,
            offY,
            to;

        if (!isDragging || !draggedPiece) {
            return;
        }

        offX = document.body.scrollLeft;
        offY = document.body.scrollTop;
        to = utils.coordsToTiles({ x: ev.clientX - offX, y: ev.clientY - offY });
        
        
        
        if (board[to.y][to.x] && board[to.y][to.x].color === draggedPiece.color) {
            painter.drawPiece(from.x * CONST.tileSize, from.y * CONST.tileSize, draggedPiece.color, draggedPiece.type);
            painter.drawPiece(to.x * CONST.tileSize, to.y * CONST.tileSize, board[to.y][to.x].color, board[to.y][to.x].type);
            
        } else {
            painter.drawPiece(to.x * CONST.tileSize, to.y * CONST.tileSize, draggedPiece.color, draggedPiece.type);

            logic.movePiece(from, to, board);
        }

        isDragging = false;
        draggedPiece = null;
    }

    canvas.addEventListener('mousedown', canvasMouseDown);
    canvas.addEventListener('mousemove', canvasMouseMove);
    canvas.addEventListener('mouseup', canvasMouseUp);

} (CONST, Canvas, Picasso, Logic, Logger, MoveValidator));