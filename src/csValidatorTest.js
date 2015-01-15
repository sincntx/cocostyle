var csValidatorTestLayer = cc.Layer.extend({
    ctor:function () {
        var winSize;
        var label, menuItem, title, menu;
        this._super();

        winSize = cc.director.getWinSize();

        title = new cc.LabelTTF("Cocostyle csValidator Test", "Arial", 20);
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

        var email1Label, email2Label, vMenuItemArray, vMenu;
        var url1Label, url2Label;

        vMenuItemArray = [];

        email1Label = new cc.LabelTTF("sincntx@gmail.com", "Arial", 15);
        vMenuItemArray.push(new cc.MenuItemLabel(email1Label, function(sender) {
            var v = new csValidator();
            sender.string = v.isEmail(sender.string);
        }, this));

        email2Label = new cc.LabelTTF("sincntx2/gmail.com", "Arial", 15);
        vMenuItemArray.push(new cc.MenuItemLabel(email2Label, function(sender) {
            var v = new csValidator();
            sender.string = v.isEmail(sender.string);
        }, this));

        url1Label = new cc.LabelTTF("http://cocos2d-x.org", "Arial", 15);
        vMenuItemArray.push(new cc.MenuItemLabel(url1Label, function(sender) {
            var v = new csValidator();
            sender.string = v.isURL(sender.string);
        }, this));

        url2Label = new cc.LabelTTF("htt://cocos2d-x.org", "Arial", 15);
        vMenuItemArray.push(new cc.MenuItemLabel(url2Label, function(sender) {
            var v = new csValidator();
            sender.string = v.isURL(sender.string);
        }, this));

        vMenu = new cc.Menu(vMenuItemArray);
        vMenu.alignItemsVerticallyWithPadding(15);
        vMenu.x = winSize.width / 2;
        vMenu.y = winSize.height / 2;

        this.addChild(vMenu);

        return true;
    }
});

var csValidatorTestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new csValidatorTestScene();
        this.addChild(layer);
    }
});

