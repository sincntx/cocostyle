var csTypingLabel = cc.LabelTTF.extend({
    _originalString:'',
    _string:'',
    _nowCur:0,
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
        text = ' ';

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
        this.setString(' ');
        this._nowCur  = 0;
    },
    onTyping:function() {
        if(this.getString().length < this._originalString.length) {
            if(this.getString() == ' ') {
                this.setString(this._originalString[this._nowCur]);
            }
            else {
                this.setString(this.getString() + this._originalString[this._nowCur]);
            }
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
    }
});
