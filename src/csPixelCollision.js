csPixelCollision = function(sprite1, sprite2) {
    var x, y, x2, y2;
    var w, h, w2, h2;
    var xMin, yMin, xMax, yMax;
    var xDiff, yDiff;
    var pixels, pixels2;
    var incX, incY;

    x  = Math.round( sprite1.x );
    y  = Math.round( sprite1.y );
    x2 = Math.round( sprite2.x );
    y2 = Math.round( sprite2.y );

    w  = sprite1.width,
    h  = sprite1.height,
    w2 = sprite2.width,
    h2 = sprite2.height ;

    x  -= ( w/2 + 0.5) << 0
    y  -= ( h/2 + 0.5) << 0
    x2 -= (w2/2 + 0.5) << 0
    y2 -= (h2/2 + 0.5) << 0

    xMin = Math.max( x, x2 ),
    yMin = Math.max( y, y2 ),
    xMax = Math.min( x+w, x2+w2 ),
    yMax = Math.min( y+h, y2+h2 );

    xDiff = xMax - xMin,
    yDiff = yMax - yMin;

    var canvas = cc.newElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = w;
    canvas.height = h;
    ctx.clearRect(0, 0, w, h);
    var image = new Image();
    image.src = sprite1.getTexture().url;
    ctx.drawImage(image, 0, 0);
    pixels = ctx.getImageData(0, 0, w, h).data;

    canvas.width = w2;
    canvas.height = h2;
    ctx.clearRect(0, 0, w2, h2);
    image = new Image();
    image.src = sprite2.getTexture().url;
    ctx.drawImage(image, 0, 0);
    pixels2 = ctx.getImageData(0, 0, w2, h2).data;

    if ( xDiff < 4 && yDiff < 4 ) {
        for ( var pixelX = xMin; pixelX < xMax; pixelX++ ) {
            for ( var pixelY = yMin; pixelY < yMax; pixelY++ ) {
                if (
                    ( pixels [ ((pixelX-x ) + (pixelY-y )*w )*4 + 3 ] !== 0 ) &&
                    ( pixels2[ ((pixelX-x2) + (pixelY-y2)*w2)*4 + 3 ] !== 0 )
                    ) {
                    return true;
                }
            }
        }
    } else {
        incX = xDiff / 3.0,
        incY = yDiff / 3.0;

        incX = (~~incX === incX) ? incX : (incX+1 | 0);
        incY = (~~incY === incY) ? incY : (incY+1 | 0);

        for ( var offsetY = 0; offsetY < incY; offsetY++ ) {
            for ( var offsetX = 0; offsetX < incX; offsetX++ ) {
                for ( var pixelY = yMin+offsetY; pixelY < yMax; pixelY += incY ) {
                    for ( var pixelX = xMin+offsetX; pixelX < xMax; pixelX += incX ) {
                        if (
                            ( pixels [ ((pixelX-x ) + (pixelY-y )*w )*4 + 3 ] !== 0 ) &&
                            ( pixels2[ ((pixelX-x2) + (pixelY-y2)*w2)*4 + 3 ] !== 0 )
                            ) {
                            return true;
                        }
                    }
                }
            }
        }
    }

    return false;
};
