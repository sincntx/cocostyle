var csCanvasAntiAlisingTestLayer = cc.Layer.extend({
    ctor:function () {
        var winSize;
        var label, menuItem, menu, title;
        this._super();

        winSize = cc.director.getWinSize();

        title = new cc.LabelTTF("Cocostyle csCanvasAntiAlisingLayer Test", "Arial", 20);
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

        var s1 = new cc.Sprite("res/grossini.png");
        s1.x = winSize.width / 2 - 100;
        s1.y = winSize.height / 2;
        s1.scale = 3;
        this.addChild(s1);

        var s2 = new cc.Sprite("res/grossini.png");
        s2.x = winSize.width / 2 + 100;
        s2.y = winSize.height / 2;
        s2.scale = 3;

        this.addChild(s2);

        var trueLabel, falseLabel, trueMenuItem, falseMenuItem, caaMenu;

        trueLabel = new cc.LabelTTF("true", "Arial", 15);
        trueMenuItem = new cc.MenuItemLabel(trueLabel, function() {
            csCanvasAntiAlising(true);

        }, this);

        falseLabel = new cc.LabelTTF("false", "Arial", 15);
        falseMenuItem = new cc.MenuItemLabel(falseLabel, function() {
            csCanvasAntiAlising(false);

        }, this);

        caaMenu = new cc.Menu(trueMenuItem, falseMenuItem);
        caaMenu.alignItemsVerticallyWithPadding(15);
        caaMenu.x = winSize.width / 2;
        caaMenu.y = winSize.height / 2 + 50;

        this.addChild(caaMenu);

        return true;
    }
});

var csCanvasAntiAlisingTestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new csCanvasAntiAlisingTestScene();
        this.addChild(layer);
    }
});

