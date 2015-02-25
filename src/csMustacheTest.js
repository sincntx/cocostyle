var csMustacheTestLayer = cc.Layer.extend({
    ctor:function () {
        var winSize;
        var label, menuItem, menu, title;
        var tl1, tl2, tl3;

        this._super();

        winSize = cc.director.getWinSize();

        title = new cc.LabelTTF("Cocostyle Mustache Test", "Arial", 20);
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

        var view = {
            title: "cocostyle",
            getTitle: function () {
                return "cocostyle";
            }
        };
        var m = new csMustache();

        tl1 = new cc.LabelTTF("csMustache.render('{{title}}, {{getTitle}}', view)", "Arial", 15);
        tl1.x = winSize.width / 2;
        tl1.y = winSize.height / 2 + 50;
        this.addChild(tl1);

        tl2 = new cc.LabelTTF("↓", "Arial", 15);
        tl2.x = winSize.width / 2;
        tl2.y = winSize.height / 2;
        this.addChild(tl2);

        tl3 = new cc.LabelTTF("" + m.render("{{title}}, {{getTitle}}", view), "Arial", 15);
        tl3.x = winSize.width / 2;
        tl3.y = winSize.height / 2 - 50;
        this.addChild(tl3);

        return true;
    }
});

var csMustacheTestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new csMustacheTestLayer();
        this.addChild(layer);
    }
});

