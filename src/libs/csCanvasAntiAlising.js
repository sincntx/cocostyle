var csCanvasAntiAlising = function(antiAlising) {
    cc._renderContext.webkitImageSmoothingEnabled = antiAlising;
    cc._renderContext.mozImageSmoothingEnabled = antiAlising;
    cc._renderContext.imageSmoothingEnabled = antiAlising;
};
