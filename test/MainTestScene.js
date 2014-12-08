var MainTestLayer = cc.Layer.extend({
    ctor:function () {
        var winSize;
        var menu, title;
        var menuItemList;

        this._super();

        winSize = cc.director.getWinSize();

        title = new cc.LabelTTF("Cocostyle Test List", "Arial", 20);
        title.x = winSize.width / 2;
        title.y = winSize.height - 40;
        title.color = cc.color(255, 255, 0);
        this.addChild(title);

        menuItemList = [];

        menuItemList.push(new cc.MenuItemLabel(new cc.LabelTTF("[ csToast ]", "Arial", 15), function() {
            var scene = new csToastTestLayer();
            cc.director.runScene(scene);
        }, this));

        menuItemList.push(new cc.MenuItemLabel(new cc.LabelTTF("[ csPixelCollision ]", "Arial", 15), function() {
            var scene = new csPixelCollisionTestLayer();
            cc.director.runScene(scene);
        }, this));

        menuItemList.push(new cc.MenuItemLabel(new cc.LabelTTF("[ csTypingLabel ]", "Arial", 15), function() {
            var scene = new csTypingLabelTestLayer();
            cc.director.runScene(scene);
        }, this));

        menuItemList.push(new cc.MenuItemLabel(new cc.LabelTTF("[ csTypingLabelExt ]", "Arial", 15), function() {
            var scene = new csTypingLabelExtTestLayer();
            cc.director.runScene(scene);
        }, this));

        menuItemList.push(new cc.MenuItemLabel(new cc.LabelTTF("[ csLabelTTFExt ]", "Arial", 15), function() {
            var scene = new csLabelTTFExtTestLayer();
            cc.director.runScene(scene);
        }, this));

        menuItemList.push(new cc.MenuItemLabel(new cc.LabelTTF("[ csCrypto ]", "Arial", 15), function() {
            var scene = new csCryptoTestLayer();
            cc.director.runScene(scene);
        }, this));

        menuItemList.push(new cc.MenuItemLabel(new cc.LabelTTF("[ csAlert ]", "Arial", 15), function() {
            var scene = new csAlertTestLayer();
            cc.director.runScene(scene);
        }, this));

        menuItemList.push(new cc.MenuItemLabel(new cc.LabelTTF("[ csVideo ]", "Arial", 15), function() {
            var scene = new csVideoTestLayer();
            cc.director.runScene(scene);
        }, this));

        menuItemList.push(new cc.MenuItemLabel(new cc.LabelTTF("[ csIframe ]", "Arial", 15), function() {
            var scene = new csIframeTestLayer();
            cc.director.runScene(scene);
        }, this));

        menuItemList.push(new cc.MenuItemLabel(new cc.LabelTTF("[ csCanvasAntiAlising ]", "Arial", 15), function() {
            var scene = new csCanvasAntiAlisingTestLayer();
            cc.director.runScene(scene);
        }, this));

        menuItemList.push(new cc.MenuItemLabel(new cc.LabelTTF("[ csValidator ]", "Arial", 15), function() {
            var scene = new csValidatorTestLayer();
            cc.director.runScene(scene);
        }, this));

        menuItemList.push(new cc.MenuItemLabel(new cc.LabelTTF("[ csMoment ]", "Arial", 15), function() {
            var scene = new csMomentTestLayer();
            cc.director.runScene(scene);
        }, this));

        menu = new cc.Menu(menuItemList);
        menu.alignItemsVerticallyWithPadding(10);
        menu.x = winSize.width / 2;
        menu.y = winSize.height / 2;

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
