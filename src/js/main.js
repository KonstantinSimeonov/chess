(function (CONST, Canvas, Painter, Logic, MoveValidator, utils) {
    'use strict';

    function onDocumentReady() {

        const canvas = new Canvas(CONST.boardSize, CONST.boardSize),
            logic = new Logic(CONST),
            painter = new Painter(CONST, canvas, logic),
            board = new logic.Board(CONST),
            validator = new MoveValidator(CONST, utils),
            from = {},
            last = {};

        let isDragging = false,
            draggedPiece = null,
            currentColor = 'white';

        painter.fillBoard();
        painter.drawPieces();

        function canvasMouseDown(ev) {

            const coords = utils.coordsToTiles({ x: ev.layerX, y: ev.layerY });
            
            if (!board.piece(coords.x, coords.y).is(currentColor)) {
                return;
            }

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

            const coords = utils.coordsToTiles({ x: ev.layerX, y: ev.layerY });

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

            const to = utils.coordsToTiles({ x: ev.layerX, y: ev.layerY });

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
                currentColor = utils.invertColor(currentColor);
            }

            isDragging = false;
            draggedPiece = null;
        }

        canvas.addEventListener('mousedown', canvasMouseDown);
        canvas.addEventListener('mousemove', canvasMouseMove);
        canvas.addEventListener('mouseup', canvasMouseUp);

        document.body.className = 'loaded';
    }

    window.addEventListener('load', onDocumentReady, false);

} (CONST, Canvas, Picasso, Logic, MoveValidator, utils));