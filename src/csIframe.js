var csIframe = cc.Node.extend({
    _iframe: null,
    _domSprite: null,
    ctor: function (url) {
        cc.Node.prototype.ctor.call(this);

        var tmpDOMSprite = this._domSprite = new cc.Sprite();
        tmpDOMSprite.draw = function () {
        };
        this.addChild(tmpDOMSprite);

        var tmpIframe = this._iframe = cc.newElement("iframe");
        tmpIframe.src = url;

        cc.DOM.convert(tmpDOMSprite);
        this.dom.appendChild(tmpIframe);
        tmpDOMSprite.canvas.remove();
    }
});
