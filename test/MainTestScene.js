var MainTestLayer = cc.Layer.extend({
    ctor:function () {
        var winSize;
        var toastLabel, toastMenuItem, menu, title;
        var pixelLabel, pixelMenuItem;
        var typingLabel, typingMenuItem;
        var typingExtLabel, typingExtMenuItem;
        var labelEXTLabel, labelEXTMenuItem;
        var cryptoLabel, cryptoMenuItem;
        var alertLabel, alertMenuItem;
        var videoLabel, videoMenuItem;
        var iframeLabel, iframeMenuItem;
        var caaLabel, caaMenuItem;
        var validatorLabel, validatorMenuItem;

        this._super();

        winSize = cc.director.getWinSize();

        title = new cc.LabelTTF("Cocostyle Test List", "Arial", 20);
        title.x = winSize.width / 2;
        title.y = winSize.height - 40;
        title.color = cc.color(255, 255, 0);
        this.addChild(title);

        toastLabel = new cc.LabelTTF("[ csToast ]", "Arial", 15);
        toastMenuItem = new cc.MenuItemLabel(toastLabel, function() {
            var scene = new csToastTestLayer();
            cc.director.runScene(scene);
        }, this);

        pixelLabel = new cc.LabelTTF("[ csPixelCollision ]", "Arial", 15);
        pixelMenuItem = new cc.MenuItemLabel(pixelLabel, function() {
            var scene = new csPixelCollisionTestLayer();
            cc.director.runScene(scene);
        }, this);

        typingLabel = new cc.LabelTTF("[ csTypingLabel ]", "Arial", 15);
        typingMenuItem = new cc.MenuItemLabel(typingLabel, function() {
            var scene = new csTypingLabelTestLayer();
            cc.director.runScene(scene);
        }, this);

        typingExtLabel = new cc.LabelTTF("[ csTypingLabelExt ]", "Arial", 15);
        typingExtMenuItem = new cc.MenuItemLabel(typingExtLabel, function() {
            var scene = new csTypingLabelExtTestLayer();
            cc.director.runScene(scene);
        }, this);

        labelEXTLabel = new cc.LabelTTF("[ csLabelTTFExt ]", "Arial", 15);
        labelEXTMenuItem = new cc.MenuItemLabel(labelEXTLabel, function() {
            var scene = new csLabelTTFExtTestLayer();
            cc.director.runScene(scene);
        }, this);

        cryptoLabel = new cc.LabelTTF("[ csCrypto ]", "Arial", 15);
        cryptoMenuItem = new cc.MenuItemLabel(cryptoLabel, function() {
            var scene = new csCryptoTestLayer();
            cc.director.runScene(scene);
        }, this);

        alertLabel = new cc.LabelTTF("[ csAlert ]", "Arial", 15);
        alertMenuItem = new cc.MenuItemLabel(alertLabel, function() {
            var scene = new csAlertTestLayer();
            cc.director.runScene(scene);
        }, this);

        videoLabel = new cc.LabelTTF("[ csVideo ]", "Arial", 15);
        videoMenuItem = new cc.MenuItemLabel(videoLabel, function() {
            var scene = new csVideoTestLayer();
            cc.director.runScene(scene);
        }, this);

        iframeLabel = new cc.LabelTTF("[ csIframe ]", "Arial", 15);
        iframeMenuItem = new cc.MenuItemLabel(iframeLabel, function() {
            var scene = new csIframeTestLayer();
            cc.director.runScene(scene);
        }, this);

        caaLabel = new cc.LabelTTF("[ csCanvasAntiAlising ]", "Arial", 15);
        caaMenuItem = new cc.MenuItemLabel(caaLabel, function() {
            var scene = new csCanvasAntiAlisingTestLayer();
            cc.director.runScene(scene);
        }, this);

        validatorLabel = new cc.LabelTTF("[ csValidator ]", "Arial", 15);
        validatorMenuItem = new cc.MenuItemLabel(validatorLabel, function() {
            var scene = new csValidatorTestLayer();
            cc.director.runScene(scene);
        }, this);

        menu = new cc.Menu(toastMenuItem, pixelMenuItem, typingMenuItem, typingExtMenuItem, labelEXTMenuItem, cryptoMenuItem, alertMenuItem, videoMenuItem, iframeMenuItem, caaMenuItem, validatorMenuItem);
        menu.alignItemsVerticallyWithPadding(15);
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

