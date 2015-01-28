var csFATestLayer = cc.Layer.extend({
    ctor:function () {
        var winSize;
        var menu, title;
        this._super();

        winSize = cc.director.getWinSize();

        title = new cc.LabelTTF("Cocostyle Font Awesome Test", "Arial", 20);
        title.setPosition(winSize.width / 2, winSize.height - 40);
        title.setColor(cc.color(255, 255, 0, 255));
        this.addChild(title);

        menu = new csButton('Main Menu', csButton.style.emptyflat, csButton.size.small, csButton.color.white, function() {
            var scene = new MainTestScene();
            cc.director.runScene(scene);
        }, this);
        menu.x = winSize.width - 70;
        menu.y = 50;
        this.addChild(menu);

        var iconList = [csFA.icon('fa-adjust'), csFA.icon('fa-anchor'), csFA.icon('fa-archive'), csFA.icon('fa-area-chart'), csFA.icon('fa-arrows'), csFA.icon('fa-arrows-h'), csFA.icon('fa-arrows-v'), csFA.icon('fa-asterisk')];
        var l = new csFA(iconList.join(" "), 30);
        l.x = winSize.width / 2;
        l.y = winSize.height / 2;
        this.addChild(l);

        var iconList2 = [csFA.icon('fa-at'), csFA.icon('fa-automobile'), csFA.icon('fa-ban'), csFA.icon('fa-bank'), csFA.icon('fa-bar-chart'), csFA.icon('fa-bar-chart-o'), csFA.icon('fa-barcode'), csFA.icon('fa-bars')];
        var l2 = new csFA(iconList2.join(" "), 15);
        l2.x = winSize.width / 2;
        l2.y = winSize.height / 2 + 100;
        this.addChild(l2);

        var iconList3 = [csFA.icon('fa-bicycle'), csFA.icon('fa-beer'), csFA.icon('fa-bell'), csFA.icon('fa-bell-o'), csFA.icon('fa-bell-slash'), csFA.icon('fa-bell-slash-o'), csFA.icon('fa-binoculars'), csFA.icon('fa-birthday-cake')];
        var l3 = new csFA(iconList3.join(" "), 20);
        l3.setColor(csFA.color.blue)
        l3.x = winSize.width / 2;
        l3.y = winSize.height / 2 - 100;
        this.addChild(l3);

        return true;
    }
});

var csFATestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new csFATestLayer();
        this.addChild(layer);
    }
});