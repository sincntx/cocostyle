var MainTestLayer = cc.Layer.extend({
    ctor:function () {
        var winSize;
        var toastLabel, toastMenuItem, menu, title;
        var pixelLabel, pixelMenuItem;
        var typingLabel, typingMenuItem;

        this._super();

        winSize = cc.director.getWinSize();

        title = cc.LabelTTF.create("Cocostyle Test List", "Arial", 20);
        title.setPosition(winSize.width / 2, winSize.height - 40);
        title.setColor(cc.color(255, 255, 0, 255));
        this.addChild(title);

        toastLabel = cc.LabelTTF.create("[ csToast ]", "Arial", 18);
        toastMenuItem = cc.MenuItemLabel.create(toastLabel, function() {
            var scene = new csToastTestLayer();
            cc.director.runScene(scene);
        }, this);

        pixelLabel = cc.LabelTTF.create("[ csPixelCollision ]", "Arial", 18);
        pixelMenuItem = cc.MenuItemLabel.create(pixelLabel, function() {
            var scene = new csPixelCollisionTestLayer();
            cc.director.runScene(scene);
        }, this);

        typingLabel = cc.LabelTTF.create("[ csTypingLabel ]", "Arial", 18);
        typingMenuItem = cc.MenuItemLabel.create(typingLabel, function() {
            var scene = new csTypingLabelTestLayer();
            cc.director.runScene(scene);
        }, this);

        menu = cc.Menu.create(toastMenuItem, pixelMenuItem, typingMenuItem);
        menu.alignItemsVerticallyWithPadding(15);
        menu.setPosition(winSize.width / 2, winSize.height / 2);
        this.addChild(menu);

        return true;
    }
});

var MainTestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainTestLayer();
        this.addChild(layer);
    }
});

