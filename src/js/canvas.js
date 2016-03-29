var Canvas = function(height, width) {
    'use strict';

    var canvas = document.getElementById('field');
    
    canvas.height = height;
    canvas.width = width;
    
    return canvas;
};