var csToastTestLayer = cc.Layer.extend({
    ctor:function () {
        var winSize;
        var toast;
        var label, menuItem, menu, title;
        this._super();

        winSize = cc.director.getWinSize();

        title = new cc.LabelTTF("Cocostyle Toast Test", "Arial", 20);
        title.setPosition(winSize.width / 2, winSize.height - 40);
        title.setColor(cc.color(255, 255, 0, 255));
        this.addChild(title);

        label = new cc.LabelTTF("[ Main Menu ]", "Arial", 15);
        menuItem = new cc.MenuItemLabel(label, function() {
            var scene = new MainTestScene();
            cc.director.runScene(scene);
        }, this);

        menu = cc.Menu.create(menuItem);
        menu.x = 0;
        menu.y = 0;
        menuItem.x = winSize.width - 70;
        menuItem.y = 25;
        this.addChild(menu);

        toast = new csToast();
        toast.set({text : "text",
                backgroundColor : cc.color(50, 50, 50, 255),
                fontFillColor : cc.color(255, 255, 255, 255),
                fontSize : 15,
                fontName : "Arial",
                duration : 2,
                position : cc.p(winSize.width / 2, winSize.height / 2)});
        toast.run(this);

        return true;
    }
});

var csToastTestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new csToastTestLayer();
        this.addChild(layer);
    }
});

