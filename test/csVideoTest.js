var csVideoTestLayer = cc.Layer.extend({
    ctor:function () {
        var winSize;
        var label, menuItem, menu, title;
        this._super();

        winSize = cc.director.getWinSize();

        title = new cc.LabelTTF("Cocostyle Video Test", "Arial", 20);
        title.setPosition(winSize.width / 2, winSize.height - 40);
        title.setColor(cc.color(255, 255, 0, 255));
        this.addChild(title);

        label = new cc.LabelTTF("[ Main Menu ]", "Arial", 15);
        menuItem = new cc.MenuItemLabel(label, function() {
            var scene = new MainTestLayer();
            cc.director.runScene(scene);
        }, this);

        menu = new cc.Menu(menuItem);
        menu.x = 0;
        menu.y = 0;
        menuItem.x = winSize.width - 70;
        menuItem.y = 25;
        this.addChild(menu);

        var video = new csVideo('http://www.w3schools.com/html/mov_bbb.mp4');
        video.setPosition(cc.p(winSize.width / 2, winSize.height));
        video.video.play();
        this.addChild(video);

        video.rotation = 100;
        video.runAction( new cc.Sequence( new cc.ScaleTo(0.5, 3), new cc.ScaleTo(0.5, 0.1), new cc.ScaleTo(0.5, 1), new cc.FadeOut(0.5), new cc.FadeIn(0.5), new cc.CallFunc(function(obj) {
            obj.rotation = 0;
        }, this) ) );

        return true;
    }
});

var csVideoTestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new csVideoTestLayer();
        this.addChild(layer);
    }
});
