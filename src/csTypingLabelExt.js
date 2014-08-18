var csTypingLabelExt = cc.LabelTTF.extend({
    _originalString:'',
    _nowCur:0,
    _fontStyle: "normal",
    ctor: function (text, fontName, fontSize, dimensions, hAlignment, vAlignment) {
        cc.LabelTTF.prototype.ctor.call(this);

        this._dimensions = cc.size(0, 0);
        this._hAlignment = cc.TEXT_ALIGNMENT_LEFT;
        this._vAlignment = cc.VERTICAL_TEXT_ALIGNMENT_TOP;
        this._opacityModifyRGB = false;
        this._fontStyleStr = "";
        this._fontName = "Arial";
        this._isMultiLine = false;

        this._shadowEnabled = false;
        this._shadowOffset = cc.p(0, 0);
        this._shadowOpacity = 0;
        this._shadowBlur = 0;
        this._shadowColorStr = "rgba(128, 128, 128, 0.5)";

        this._strokeEnabled = false;
        this._strokeColor = cc.color(255, 255, 255, 255);
        this._strokeSize = 0;
        this._strokeColorStr = "";

        this._textFillColor = cc.color(255, 255, 255, 255);
        this._fillColorStr = "rgba(255,255,255,1)";
        this._strokeShadowOffsetX = 0;
        this._strokeShadowOffsetY = 0;
        this._needUpdateTexture = false;

        this._lineWidths = [];

        this._originalString = text;
        text = '';

        this._setColorsString();

        if (fontName && fontName instanceof cc.FontDefinition) {
            this.initWithStringAndTextDefinition(text, fontName);
        }
        else {
            cc.LabelTTF.prototype.initWithString.call(this, text, fontName, fontSize, dimensions, hAlignment, vAlignment);
        }
    },
    run:function(duration) {
        this.schedule(this.onTyping, duration);
    },
    stop:function() {
        this.unschedule(this.onTyping);
    },
    renew:function() {
        this.setString('');
        this._nowCur  = 0;
    },
    onTyping:function() {
        if(this.getString().length < this._originalString.length) {
            this.setString(this.getString() + this._originalString[this._nowCur]);
            this._nowCur++;
        }
        else {
            this.stop();
        }
    },
    getOriginalString:function() {
        return this._originalString;
    },
    setOriginalString:function(string) {
        this._originalString = string;
    },
    _measureConfig: function () {
        this._getLabelContext().font = this._fontStyle + " " + this._fontStyleStr;
    },
    _drawTTFInCanvas: function (context) {
        if (!context)
            return;
        var locStrokeShadowOffsetX = this._strokeShadowOffsetX, locStrokeShadowOffsetY = this._strokeShadowOffsetY;
        var locContentSizeHeight = this._contentSize.height - locStrokeShadowOffsetY, locVAlignment = this._vAlignment, locHAlignment = this._hAlignment,
            locFontHeight = this._fontClientHeight, locStrokeSize = this._strokeSize;
        var fontStyleStr = this._fontStyle + " " + this._fontStyleStr;

        context.setTransform(1, 0, 0, 1, 0 + locStrokeShadowOffsetX * 0.5, locContentSizeHeight + locStrokeShadowOffsetY * 0.5);

        //this is fillText for canvas
        if (context.font != fontStyleStr)
            context.font = fontStyleStr;
        context.fillStyle = this._fillColorStr;

        var xOffset = 0, yOffset = 0;
        //stroke style setup
        var locStrokeEnabled = this._strokeEnabled;
        if (locStrokeEnabled) {
            context.lineWidth = locStrokeSize * 2;
            context.strokeStyle = this._strokeColorStr;
        }

        //shadow style setup
        if (this._shadowEnabled) {
            var locShadowOffset = this._shadowOffset;
            context.shadowColor = this._shadowColorStr;
            context.shadowOffsetX = locShadowOffset.x;
            context.shadowOffsetY = -locShadowOffset.y;
            context.shadowBlur = this._shadowBlur;
        }

        context.textBaseline = cc.LabelTTF._textBaseline[locVAlignment];
        context.textAlign = cc.LabelTTF._textAlign[locHAlignment];

        var locContentWidth = this._contentSize.width - locStrokeShadowOffsetX;
        if (locHAlignment === cc.TEXT_ALIGNMENT_RIGHT)
            xOffset += locContentWidth;
        else if (locHAlignment === cc.TEXT_ALIGNMENT_CENTER)
            xOffset += locContentWidth / 2;
        else
            xOffset += 0;
        if (this._isMultiLine) {
            var locStrLen = this._strings.length;
            if (locVAlignment === cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM)
                yOffset = locFontHeight + locContentSizeHeight - locFontHeight * locStrLen;
            else if (locVAlignment === cc.VERTICAL_TEXT_ALIGNMENT_CENTER)
                yOffset = locFontHeight / 2 + (locContentSizeHeight - locFontHeight * locStrLen) / 2;

            for (var i = 0; i < locStrLen; i++) {
                var line = this._strings[i];
                var tmpOffsetY = -locContentSizeHeight + (locFontHeight * i) + yOffset;
                if (locStrokeEnabled)
                    context.strokeText(line, xOffset, tmpOffsetY);
                context.fillText(line, xOffset, tmpOffsetY);
            }
        } else {
            if (locVAlignment === cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM) {
                if (locStrokeEnabled)
                    context.strokeText(this._string, xOffset, yOffset);
                context.fillText(this._string, xOffset, yOffset);
            } else if (locVAlignment === cc.VERTICAL_TEXT_ALIGNMENT_TOP) {
                yOffset -= locContentSizeHeight;
                if (locStrokeEnabled)
                    context.strokeText(this._string, xOffset, yOffset);
                context.fillText(this._string, xOffset, yOffset);
            } else {
                yOffset -= locContentSizeHeight * 0.5;
                if (locStrokeEnabled)
                    context.strokeText(this._string, xOffset, yOffset);
                context.fillText(this._string, xOffset, yOffset);
            }
        }
    },
    _updateTexture: function () {
        var locContext = this._getLabelContext(), locLabelCanvas = this._labelCanvas;
        var locContentSize = this._contentSize;

        if (this._string.length === 0) {
            locLabelCanvas.width = 1;
            locLabelCanvas.height = locContentSize.height;
            this.setTextureRect(cc.rect(0, 0, 1, locContentSize.height));
            return true;
        }

        //set size for labelCanvas
        locContext.font = this._fontStyle + " " + this._fontStyleStr;
        this._updateTTF();
        var width = locContentSize.width, height = locContentSize.height;
        var flag = locLabelCanvas.width == width && locLabelCanvas.height == height;
        locLabelCanvas.width = width;
        locLabelCanvas.height = height;
        if (flag) locContext.clearRect(0, 0, width, height);

        //draw text to labelCanvas
        this._drawTTFInCanvas(locContext);
        this._texture && this._texture.handleLoadedTexture();

        this.setTextureRect(cc.rect(0, 0, width, height));
        return true;
    },
    /**
     * return font style of cc.LabelTTF
     * @return {String}
     */
    getFontStyle: function () {
        return this._fontStyle;
    },

    /**
     * set font style of cc.LabelTTF
     * @param {String} fontStyle
     */
    setFontStyle: function (fontStyle) {
        if (this._fontStyle !== fontStyle) {
            this._fontStyle = fontStyle;
            // Force update
            this._needUpdateTexture = true;
        }
    }
});
