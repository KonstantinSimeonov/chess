var Canvas = function(height, width) {
    'use strict';

    const canvas = document.getElementById('field');
    
    canvas.height = height;
    canvas.width = width;
    
    return canvas;
};