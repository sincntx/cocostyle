var csTypingLabel = cc.LabelTTF.extend({
    _originalString:'',
    _string:'',
    _nowCur:0,
    ctor: function (text, fontName, fontSize, dimensions, hAlignment, vAlignment) {
        cc.LabelTTF.prototype.ctor.call(this);
        this._originalString = text;
        text = ' ';
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
