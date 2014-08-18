var MainTestLayer = cc.Layer.extend({
    ctor:function () {
        var winSize;
        var toastLabel, toastMenuItem, menu, title;
        var pixelLabel, pixelMenuItem;
        var typingLabel, typingMenuItem;
        var typingExtLabel, typingExtMenuItem;
        var labelEXTLabel, labelEXTMenuItem;
        var cryptoLabel, cryptoMenuItem;

        this._super();

        winSize = cc.director.getWinSize();

        title = new cc.LabelTTF("Cocostyle Test List", "Arial", 20);
        title.setPosition(winSize.width / 2, winSize.height - 40);
        title.setColor(cc.color(255, 255, 0, 255));
        this.addChild(title);

        toastLabel = new cc.LabelTTF("[ csToast ]", "Arial", 18);
        toastMenuItem = new cc.MenuItemLabel(toastLabel, function() {
            var scene = new csToastTestLayer();
            cc.director.runScene(scene);
        }, this);

        pixelLabel = new cc.LabelTTF("[ csPixelCollision ]", "Arial", 18);
        pixelMenuItem = new cc.MenuItemLabel(pixelLabel, function() {
            var scene = new csPixelCollisionTestLayer();
            cc.director.runScene(scene);
        }, this);

        typingLabel = new cc.LabelTTF("[ csTypingLabel ]", "Arial", 18);
        typingMenuItem = new cc.MenuItemLabel(typingLabel, function() {
            var scene = new csTypingLabelTestLayer();
            cc.director.runScene(scene);
        }, this);

        typingExtLabel = new cc.LabelTTF("[ csTypingLabelExt ]", "Arial", 18);
        typingExtMenuItem = new cc.MenuItemLabel(typingExtLabel, function() {
            var scene = new csTypingLabelExtTestLayer();
            cc.director.runScene(scene);
        }, this);

        labelEXTLabel = new cc.LabelTTF("[ csLabelTTFExt ]", "Arial", 18);
        labelEXTMenuItem = new cc.MenuItemLabel(labelEXTLabel, function() {
            var scene = new csLabelTTFExtTestLayer();
            cc.director.runScene(scene);
        }, this);

        cryptoLabel = new cc.LabelTTF("[ csCrypto ]", "Arial", 18);
        cryptoMenuItem = new cc.MenuItemLabel(cryptoLabel, function() {
            var scene = new csCryptoTestLayer();
            cc.director.runScene(scene);
        }, this);

        menu = new cc.Menu(toastMenuItem, pixelMenuItem, typingMenuItem, typingExtMenuItem, labelEXTMenuItem, cryptoMenuItem);
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

