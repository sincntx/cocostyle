var csSpriteMask = cc.Sprite.extend({
    ctor:function(image, style, size) {
        this._super();

        var stencil = new cc.DrawNode();
        stencil.x = 0;
        stencil.y = 0;

        switch(style) {
            case csSpriteMask.style.circle:
                stencil.drawCircle(cc.p(0, 0), size / 4, 0, 360, false, size / 2, cc.color(0, 0, 0, 255));
                break;
            case csSpriteMask.style.rect:
                stencil.drawRect(cc.p(-size / 2, -size / 2), cc.p(size / 2, size / 2), cc.color(0, 0, 0, 255), 0);
        }

        var clipper = new cc.ClippingNode();
        clipper.anchorX = 0.5;
        clipper.anchorY = 0.5;
        clipper.stencil = stencil;
        this.addChild(clipper);

        var content = new cc.Sprite(image);
        content.x = 0;
        content.y = 0;
        clipper.addChild(content);
    }
});

csSpriteMask.style = { circle : 0, rect : 1 };