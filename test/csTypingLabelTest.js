var csTypingLabelTestLayer = cc.Layer.extend({
    ctor:function () {
        var winSize;
        var toast;
        var label, menuItem, menu, title;
        this._super();

        winSize = cc.director.getWinSize();

        title = new cc.LabelTTF("Cocostyle Typing Label Test", "Arial", 20);
        title.setPosition(winSize.width / 2, winSize.height - 40);
        title.setColor(cc.color(255, 255, 0, 255));
        this.addChild(title);

        label = new cc.LabelTTF("[ Main Menu ]", "Arial", 15);
        menuItem = new cc.MenuItemLabel(label, function() {
            var scene = new MainTestScene();
            cc.director.runScene(scene);
        }, this);

        menu = new cc.Menu(menuItem);
        menu.x = 0;
        menu.y = 0;
        menuItem.x = winSize.width - 70;
        menuItem.y = 25;
        this.addChild(menu);

        var tlabel = new csTypingLabel("My name is typing label!!!!!", "Arial", 30);
        tlabel.setPosition(winSize.width / 2, winSize.height / 2);
        this.addChild(tlabel);
        tlabel.run(0.05);

        return true;
    }
});

var csTypingLabelTestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new csTypingLabelTestLayer();
        this.addChild(layer);
    }
});

