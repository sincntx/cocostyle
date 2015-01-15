var csAlert = cc.Layer.extend({
    ctor:function(msg, callback) {
        var winSize = cc.director.getWinSize();
        var backgroundChild, labelChild, closeChild, closeMenuItem;
        var menu;

        this._super();

        backgroundChild = new cc.LayerColor(cc.color(50, 50, 50, 255));

        labelChild = new cc.LabelTTF(msg, "Arial", 15);

        backgroundChild.width = labelChild.getContentSize().width + (winSize.width / 15);
        backgroundChild.height = labelChild.getContentSize().height + (winSize.height / 15);
        backgroundChild.setPosition(cc.p(backgroundChild.width / -2, backgroundChild.height / -2));

        closeChild = new cc.LabelTTF("X", "Arial", 10);
        closeChild.setColor(cc.color(200, 200, 200, 255));
        closeMenuItem = new cc.MenuItemLabel(closeChild, callback, this);

        menu = new cc.Menu(closeMenuItem);
        menu.setPosition((backgroundChild.width / 2) - 10, (backgroundChild.height / 2) - 10);

        this.addChild(backgroundChild);
        this.addChild(labelChild);
        this.addChild(menu);

        this.setPosition(winSize.width / 2, winSize.height / 2);
    }
});
