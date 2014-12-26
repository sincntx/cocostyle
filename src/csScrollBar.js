var csScrollBar = cc.Layer.extend({
    _cursorBackground : null,
    _cursorBackgroundSize : 10,
    _cursor : null,
    _cursorSize : 0,
    ctor: function (scroll, backgroundColor, cursorColor) {
        var i, drawNode;

        this._super();

        this._cursorBackground = new cc.LayerColor(backgroundColor);
        this._cursorBackground.width = this._cursorBackgroundSize;
        this._cursorBackground.height = scroll.getContentSize().height;
        this._cursorBackground.y = scroll.y;
        this._cursorBackground.x = scroll.getContentSize().width - this._cursorBackgroundSize;
        this.addChild(this._cursorBackground);

        drawNode = new cc.DrawNode();
        drawNode.drawDot(cc.p(this._cursorBackground.x + this._cursorBackgroundSize / 2, scroll.y), this._cursorBackgroundSize / 2, backgroundColor);
        drawNode.drawDot(cc.p(this._cursorBackground.x + this._cursorBackgroundSize / 2, scroll.getContentSize().height + scroll.y), this._cursorBackgroundSize / 2, backgroundColor);
        this.addChild(drawNode);

        this._cursor = new cc.DrawNode();

        this._cursorSize = this._cursorBackground.height * (scroll.getContentSize().height / scroll.getInnerContainerSize().height);

        for(i = 0; i < this._cursorSize; i++) {
            this._cursor.drawDot(cc.p(this._cursorBackgroundSize / 2, i), this._cursorBackgroundSize / 2, cursorColor);
        }

        this._cursor.x = scroll.getContentSize().width - this._cursorBackgroundSize;;
        this._cursor.y = scroll.y - this._cursorSize + this._cursorBackground.height;
        this._cursor.setContentSize(cc.size(this._cursorBackgroundSize, this._cursorBackgroundSize));
        this.addChild(this._cursor);

        scroll.addEventListener(function(sender) {
            var calPer;
            calPer = 1 / (1 - (sender.getContentSize().height / sender.getInnerContainerSize().height));
            calPer *= -(sender.getInnerContainer().y / sender.getInnerContainerSize().height);
            this._cursor.y = (- this._cursorSize + this._cursorBackground.height) * calPer + sender.y;
        }, this);
    }
});
