var csCryptoTestLayer = cc.Layer.extend({
    ctor:function () {
        var winSize;
        var toast;
        var label, menuItem, menu, title;
        this._super();

        winSize = cc.director.getWinSize();

        title = cc.LabelTTF.create("Cocostyle Crypto Test", "Arial", 20);
        title.setPosition(winSize.width / 2, winSize.height - 40);
        title.setColor(cc.color(255, 255, 0, 255));
        this.addChild(title);

        label = cc.LabelTTF.create("[ Main Menu ]", "Arial", 15);
        menuItem = cc.MenuItemLabel.create(label, function() {
            var scene = new MainTestLayer();
            cc.director.runScene(scene);
        }, this);

        menu = cc.Menu.create(menuItem);
        menu.x = 0;
        menu.y = 0;
        menuItem.x = winSize.width - 70;
        menuItem.y = 25;
        this.addChild(menu);

        var tlabel = cc.LabelTTF.create(csCrypto.md5("My name is typing label!!!!!"), "Arial", 30);
        tlabel.setPosition(winSize.width / 2, winSize.height / 2);
        this.addChild(tlabel);

        var tlabel2 = cc.LabelTTF.create(csCrypto.sha1("My name is typing label!!!!!"), "Arial", 30);
        tlabel2.setPosition(winSize.width / 2, winSize.height / 2 - 100);
        this.addChild(tlabel2);

        return true;
    }
});

var csCryptoTestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new csCryptoTestLayer();
        this.addChild(layer);
    }
});

