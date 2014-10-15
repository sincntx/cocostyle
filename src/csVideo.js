var csVideo = cc.Node.extend({
    video: null,
    ctor: function (url) {
        cc.Node.prototype.ctor.call(this);

        var tmpDOMSprite = this._domInputSprite = new cc.Sprite();
        this.addChild(tmpDOMSprite);

        var tmpVideo = this.video = cc.newElement("video");
        tmpVideo.src = url;
        tmpVideo.load();

        cc.DOM.convert(tmpDOMSprite);
        tmpDOMSprite.dom.appendChild(tmpVideo);
        tmpDOMSprite.canvas.remove();
    }
});
