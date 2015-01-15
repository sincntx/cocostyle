var csSpriteMaskTestLayer = cc.Layer.extend({
    ctor:function () {
        var winSize;
        var menu, title;
        this._super();

        winSize = cc.director.getWinSize();

        title = new cc.LabelTTF("Cocostyle Sprite Mask Test", "Arial", 20);
        title.setPosition(winSize.width / 2, winSize.height - 40);
        title.setColor(cc.color(255, 255, 0, 255));
        this.addChild(title);

        menu = new csButton('Main Menu', csButton.style.emptyflat, csButton.size.small, csButton.color.white, function() {
            var scene = new MainTestScene();
            cc.director.runScene(scene);
        }, this);
        menu.x = winSize.width - 70;
        menu.y = 50;
        this.addChild(menu);

        var sprite1 = new cc.Sprite("res/HelloWorld.png");
        sprite1.x = 200;
        sprite1.y = winSize.height / 2;
        sprite1.scale = 0.3;
        this.addChild(sprite1);

        var sprite2 = new csSpriteMask("res/HelloWorld.png", csSpriteMask.style.circle, 360);
        sprite2.x = winSize.width / 2;
        sprite2.y = winSize.height / 2;
        sprite2.scale = 0.3;
        this.addChild(sprite2);

        var sprite3 = new csSpriteMask("res/HelloWorld.png", csSpriteMask.style.rect, 360);
        sprite3.x = winSize.width / 2 + 200;
        sprite3.y = winSize.height / 2;
        sprite3.scale = 0.3;
        this.addChild(sprite3);

        return true;
    }
});

var csSpriteMaskTestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new csSpriteMaskTestLayer();
        this.addChild(layer);
    }
});