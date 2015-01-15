var csVerbalExpressionsTestLayer = cc.Layer.extend({
    ctor:function () {
        var winSize;
        var label, menuItem, menu, title;
        var tl1, tl2;

        this._super();

        winSize = cc.director.getWinSize();

        title = new cc.LabelTTF("Cocostyle VerbalExpressions Test", "Arial", 20);
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

        var tester = csVerbalExpressions()
            .startOfLine()
            .then( "http" )
            .maybe( "s" )
            .then( "://" )
            .maybe( "www." )
            .anythingBut( " " )
            .endOfLine();

        var testMe = "https://www.google.com";

        tl1 = new cc.LabelTTF(tester.test(testMe), "Arial", 15);
        tl1.x = winSize.width / 2;
        tl1.y = winSize.height / 2 - 10;
        this.addChild(tl1);

        var result = csVerbalExpressions().find( "red" ).replace( "We have a red house", "blue" );

        tl2 = new cc.LabelTTF(result, "Arial", 15);
        tl2.x = winSize.width / 2;
        tl2.y = winSize.height / 2 + 10;
        this.addChild(tl2);

        return true;
    }
});

var csVerbalExpressionsTestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new csVerbalExpressionsTestLayer();
        this.addChild(layer);
    }
});

