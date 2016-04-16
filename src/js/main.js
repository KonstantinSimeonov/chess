(function (CONST, Canvas, Painter, Logic, Logger, MoveValidator, Board) {
    'use strict';

    const logger = new Logger('console', CONST.environment),
        canvas = new Canvas(CONST.boardSize, CONST.boardSize),
        logic = new Logic(CONST),
        painter = new Painter(CONST, canvas, logic, logger),
        board = new logic.Board(CONST),
        validator = new MoveValidator(CONST, utils),
        from = {},
        last = {};

    let isDragging = false,
        draggedPiece = null;

    painter.fillBoard();
    painter.drawPieces();

    function canvasMouseDown(ev) {

        const offX = document.body.scrollLeft,
            offY = document.body.scrollTop,
            coords = utils.coordsToTiles({ x: ev.clientX - offX, y: ev.clientY - offY });

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
        if (!isDragging || !draggedPiece) {
            return;
        }

        const offX = document.body.scrollLeft,
            offY = document.body.scrollTop,
            coords = utils.coordsToTiles({ x: ev.clientX - offX, y: ev.clientY - offY });

        let x = last.x,
            y = last.y,
            type,
            color;

        if (!board.piece(last.x, last.y).is(null) && !utils.equalAsPoints(from, last)) {

            color = board.piece(last.x, last.y).color;
            type = board.piece(last.x, last.y).type;

            painter.drawPiece(x, y, color, type);
        } else {
            painter.drawTile(x, y);
        }

        last.x = coords.x;
        last.y = coords.y;

        painter.drawPiece(coords.x, coords.y, draggedPiece.color, draggedPiece.type);

        isDragging = true;
    }

    function canvasMouseUp(ev) {

        if (!isDragging || !draggedPiece) {
            return;
        }

        const offX = document.body.scrollLeft,
            offY = document.body.scrollTop,
            to = utils.coordsToTiles({ x: ev.clientX - offX, y: ev.clientY - offY });

        if (board.piece(to.x, to.y).is(draggedPiece.color) || !(validator.isValidMove(from, to, board))) {

            painter.drawPiece(from.x, from.y, draggedPiece.color, draggedPiece.type);

            if (!board.piece(to.x, to.y).is(null, null)) {
                painter.drawPiece(to.x, to.y, board.piece(to.x, to.y).color, board.piece(to.x, to.y).type);
            } else {
                painter.drawTile(to.x, to.y);
            }

        } else {
            painter.drawPiece(to.x, to.y, draggedPiece.color, draggedPiece.type);
            board.movePiece(from, to, board);
        }

        isDragging = false;
        draggedPiece = null;
    }

    canvas.addEventListener('mousedown', canvasMouseDown);
    canvas.addEventListener('mousemove', canvasMouseMove);
    canvas.addEventListener('mouseup', canvasMouseUp);

} (CONST, Canvas, Picasso, Logic, Logger, MoveValidator));