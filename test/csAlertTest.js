var csAlertTestLayer = cc.Layer.extend({
    ctor:function () {
        var winSize;
        var alert;
        var label, menuItem, menu, title;
        this._super();

        winSize = cc.director.getWinSize();

        title = new cc.LabelTTF("Cocostyle Alert Test", "Arial", 20);
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

        alert = new csAlert('this is alert!', function() {
            this.removeFromParent();
        });

        this.addChild(alert);

        return true;
    }
});

var csAlertTestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new csAlertTestLayer();
        this.addChild(layer);
    }
});
