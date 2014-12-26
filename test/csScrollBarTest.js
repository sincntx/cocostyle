var csScrollBarTestLayer = cc.Layer.extend({
    ctor:function () {
        var winSize, title;

        this._super();

        winSize = cc.director.getWinSize();

        title = new cc.LabelTTF("Cocostyle ScrollBar Test", "Arial", 20);
        title.setPosition(winSize.width / 2, winSize.height - 40);
        title.setColor(cc.color(255, 255, 0, 255));
        this.addChild(title);

        var menu = new csButton('Main Menu', csButton.style.emptyflat, csButton.size.small, csButton.color.white, function() {
            var scene = new MainTestScene();
            cc.director.runScene(scene);
        }, this);
        menu.x = winSize.width - 70;
        menu.y = 50;
        this.addChild(menu);

        var scrollView = new ccui.ScrollView();
        scrollView.setContentSize(cc.size(winSize.width * 0.8, winSize.height * 0.8));
        scrollView.setInnerContainerSize(cc.size(winSize.width * 0.8, winSize.height * 3.2));
        scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        scrollView.setTouchEnabled(true);
        scrollView.y = 50;
        this.addChild(scrollView);

        var scrollBar = new csScrollBar(scrollView, cc.color(cc.color(50, 50, 50, 255)), cc.color(200, 200, 200, 255));
        this.addChild(scrollBar);

        var logo = new cc.Sprite("res/cocostyle.png");
        logo.x = winSize.width / 2;
        logo.y = scrollView.height / 2;
        scrollView.addChild(logo);

        var logo2 = new cc.Sprite("res/cocostyle.png");
        logo2.x = winSize.width / 2;
        logo2.y = scrollView.getInnerContainerSize().height - 50;
        scrollView.addChild(logo2);

        return true;
    }
});

var csScrollBarTestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new csScrollBarTestLayer();
        this.addChild(layer);
    }
});

