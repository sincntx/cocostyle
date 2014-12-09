var csButtonTestLayer = cc.Layer.extend({
    ctor:function () {
        var winSize;
        var label, menuItem, menu, title;
        var btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9, btn10;
        this._super();

        winSize = cc.director.getWinSize();

        title = new cc.LabelTTF("Cocostyle Button Test", "Arial", 20);
        title.setPosition(winSize.width / 2, winSize.height - 40);
        title.setColor(cc.color(255, 255, 0, 255));
        this.addChild(title);

        label = new cc.LabelTTF("[ Main Menu ]", "Arial", 15);
        menuItem = new cc.MenuItemLabel(label, function() {
            var scene = new MainTestLayer();
            cc.director.runScene(scene);
        }, this);

        menu = cc.Menu.create(menuItem);
        menu.x = 0;
        menu.y = 0;
        menuItem.x = winSize.width - 70;
        menuItem.y = 25;
        this.addChild(menu);

        btn1 = new csButton('Go', csButton.style.emptycircle, csButton.size.tiny, csButton.color.red, function() {
            cc.log('click!');
        }, this);

        btn1.x = (winSize.width / 5) * 1 - 100;
        btn1.y = winSize.height - 200;

        this.addChild(btn1);

        btn2 = new csButton('Go', csButton.style.emptycircle, csButton.size.small, csButton.color.blue, function() {
            cc.log('click!');
        }, this);

        btn2.x = (winSize.width / 5) * 2 - 100;
        btn2.y = winSize.height - 200;

        this.addChild(btn2);

        btn3 = new csButton('Go', csButton.style.emptycircle, csButton.size.normal, csButton.color.white, function() {
            cc.log('click!');
        }, this);

        btn3.x = (winSize.width / 5) * 3 - 100;
        btn3.y = winSize.height - 200;

        this.addChild(btn3);

        btn4 = new csButton('Go', csButton.style.emptycircle, csButton.size.large, csButton.color.grey, function() {
            cc.log('click!');
        }, this);

        btn4.x = (winSize.width / 5) * 4 - 100;
        btn4.y = winSize.height - 200;

        this.addChild(btn4);

        btn5 = new csButton('Go', csButton.style.emptycircle, csButton.size.jumbo, csButton.color.purple, function() {
            cc.log('click!');
        }, this);

        btn5.x = (winSize.width / 5) * 5 - 100;
        btn5.y = winSize.height - 200;

        this.addChild(btn5);

        btn6 = new csButton('Go', csButton.style.circle, csButton.size.normal, csButton.color.green, function() {
            cc.log('click!');
        }, this);

        btn6.x = (winSize.width / 5) * 1 - 100;
        btn6.y = winSize.height - 400;

        this.addChild(btn6);

        btn7 = new csButton('Go', csButton.style.emptyrect, csButton.size.normal, csButton.color.red, function() {
            cc.log('click!');
        }, this);

        btn7.x = (winSize.width / 5) * 2 - 100;
        btn7.y = winSize.height - 400;

        this.addChild(btn7);

        btn8 = new csButton('Go', csButton.style.rect, csButton.size.normal, csButton.color.red, function() {
            cc.log('click!');
        }, this);

        btn8.x = (winSize.width / 5) * 3 - 100;
        btn8.y = winSize.height - 400;

        this.addChild(btn8);

        btn9 = new csButton('press me', csButton.style.emptyflat, csButton.size.normal, csButton.color.orange, function() {
            cc.log('click!');
        }, this);

        btn9.x = (winSize.width / 5) * 4 - 100;
        btn9.y = winSize.height - 400;

        this.addChild(btn9);

        btn10 = new csButton('press me', csButton.style.flat, csButton.size.normal, csButton.color.orange, function() {
            cc.log('click!');
        }, this);

        btn10.x = (winSize.width / 5) * 5 - 100;
        btn10.y = winSize.height - 400;

        this.addChild(btn10);

        /*btn11 = new csButton('press me', csButton.style.emptyrounded, csButton.size.normal, csButton.color.green, function() {
            cc.log('click!');
        }, this);

        btn11.x = (winSize.width / 5) * 1 - 100;
        btn11.y = winSize.height - 360;

        this.addChild(btn11);

        btn12 = new csButton('press me', csButton.style.rounded, csButton.size.normal, csButton.color.green, function() {
            cc.log('click!');
        }, this);

        btn12.x = (winSize.width / 5) * 2 - 100;
        btn12.y = winSize.height - 360;

        this.addChild(btn12);*/

        return true;
    }
});

var csButtonTestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new csButtonTestLayer();
        this.addChild(layer);
    }
});
