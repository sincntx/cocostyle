var csFAButtonTestLayer = cc.Layer.extend({
    ctor:function () {
        var winSize;
        var menu, title;
        var btn1_1, btn1_2, btn1_3, btn1_4, btn1_5, btn1_6, btn1_7;
        var btn2_1, btn2_2, btn2_3, btn2_4, btn2_5, btn2_6, btn2_7;
        var btn3_1, btn3_2, btn3_3, btn3_4, btn3_5, btn3_6, btn3_7;
        var btn4_1, btn4_2, btn4_3, btn4_4, btn4_5, btn4_6, btn4_7;
        var btn5_1, btn5_2, btn5_3, btn5_4, btn5_5, btn5_6, btn5_7;
        var btn6_1, btn6_2, btn6_3, btn6_4, btn6_5, btn6_6, btn6_7;
        var btn7_1, btn7_2, btn7_3, btn7_4, btn7_5;
        this._super();

        winSize = cc.director.getWinSize();

        title = new cc.LabelTTF("Cocostyle Font Awesome Button Test", "Arial", 20);
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

        btn1_1 = new csFAButton(csFA.icon('fa-adjust'), csButton.style.emptycircle, csButton.size.small, csButton.color.red, function() {
            cc.log('click!');
        }, this);
        btn1_1.x = 100;
        btn1_1.y = winSize.height - 200;
        this.addChild(btn1_1);

        btn1_2 = new csFAButton(csFA.icon('fa-at'), csButton.style.emptycircle, csButton.size.small, csButton.color.blue, function() {
            cc.log('click!');
        }, this);
        btn1_2.x = 150;
        btn1_2.y = winSize.height - 200;
        this.addChild(btn1_2);

        btn1_3 = new csFAButton(csFA.icon('fa-bicycle'), csButton.style.emptycircle, csButton.size.small, csButton.color.white, function() {
            cc.log('click!');
        }, this);
        btn1_3.x = 200;
        btn1_3.y = winSize.height - 200;
        this.addChild(btn1_3);

        btn1_4 = new csFAButton(csFA.icon('fa-anchor'), csButton.style.emptycircle, csButton.size.small, csButton.color.grey, function() {
            cc.log('click!');
        }, this);
        btn1_4.x = 250;
        btn1_4.y = winSize.height - 200;
        this.addChild(btn1_4);

        btn1_5 = new csFAButton(csFA.icon('fa-automobile'), csButton.style.emptycircle, csButton.size.small, csButton.color.purple, function() {
            cc.log('click!');
        }, this);
        btn1_5.x = 300;
        btn1_5.y = winSize.height - 200;
        this.addChild(btn1_5);

        btn1_6 = new csButton(csFA.icon('fa-beer'), csButton.style.emptycircle, csButton.size.small, csButton.color.green, function() {
            cc.log('click!');
        }, this);
        btn1_6.x = 350;
        btn1_6.y = winSize.height - 200;
        this.addChild(btn1_6);

        btn1_7 = new csFAButton(csFA.icon('fa-bell'), csButton.style.emptycircle, csButton.size.small, csButton.color.orange, function() {
            cc.log('click!');
        }, this);
        btn1_7.x = 400;
        btn1_7.y = winSize.height - 200;
        this.addChild(btn1_7);

        btn2_1 = new csFAButton(csFA.icon('fa-ban'), csButton.style.circle, csButton.size.small, csButton.color.red, function() {
            cc.log('click!');
        }, this);
        btn2_1.x = 100;
        btn2_1.y = winSize.height - 270;
        this.addChild(btn2_1);

        btn2_2 = new csFAButton(csFA.icon('fa-archive'), csButton.style.circle, csButton.size.small, csButton.color.blue, function() {
            cc.log('click!');
        }, this);
        btn2_2.x = 150;
        btn2_2.y = winSize.height - 270;
        this.addChild(btn2_2);

        btn2_3 = new csFAButton(csFA.icon('fa-area'), csButton.style.circle, csButton.size.small, csButton.color.white, function() {
            cc.log('click!');
        }, this);
        btn2_3.x = 200;
        btn2_3.y = winSize.height - 270;
        this.addChild(btn2_3);

        btn2_4 = new csFAButton(csFA.icon('fa-bank'), csButton.style.circle, csButton.size.small, csButton.color.grey, function() {
            cc.log('click!');
        }, this);
        btn2_4.x = 250;
        btn2_4.y = winSize.height - 270;
        this.addChild(btn2_4);

        btn2_5 = new csFAButton(csFA.icon('fa-adjust'), csButton.style.circle, csButton.size.small, csButton.color.purple, function() {
            cc.log('click!');
        }, this);
        btn2_5.x = 300;
        btn2_5.y = winSize.height - 270;
        this.addChild(btn2_5);

        btn2_6 = new csFAButton(csFA.icon('fa-bell-o'), csButton.style.circle, csButton.size.small, csButton.color.green, function() {
            cc.log('click!');
        }, this);
        btn2_6.x = 350;
        btn2_6.y = winSize.height - 270;
        this.addChild(btn2_6);

        btn2_7 = new csFAButton(csFA.icon('fa-area-chart'), csButton.style.circle, csButton.size.small, csButton.color.orange, function() {
            cc.log('click!');
        }, this);
        btn2_7.x = 400;
        btn2_7.y = winSize.height - 270;
        this.addChild(btn2_7);

        btn3_1 = new csFAButton(csFA.icon('fa-bar-chart'), csButton.style.emptyrect, csButton.size.small, csButton.color.red, function() {
            cc.log('click!');
        }, this);
        btn3_1.x = 100;
        btn3_1.y = winSize.height - 340;
        this.addChild(btn3_1);

        btn3_2 = new csFAButton(csFA.icon('fa-bell-slash'), csButton.style.emptyrect, csButton.size.small, csButton.color.blue, function() {
            cc.log('click!');
        }, this);
        btn3_2.x = 150;
        btn3_2.y = winSize.height - 340;
        this.addChild(btn3_2);

        btn3_3 = new csFAButton(csFA.icon('fa-arrows-h'), csButton.style.emptyrect, csButton.size.small, csButton.color.white, function() {
            cc.log('click!');
        }, this);
        btn3_3.x = 200;
        btn3_3.y = winSize.height - 340;
        this.addChild(btn3_3);

        btn3_4 = new csFAButton(csFA.icon('fa-bar-chart-o'), csButton.style.emptyrect, csButton.size.small, csButton.color.grey, function() {
            cc.log('click!');
        }, this);
        btn3_4.x = 250;
        btn3_4.y = winSize.height - 340;
        this.addChild(btn3_4);

        btn3_5 = new csFAButton(csFA.icon('fa-adjust'), csButton.style.emptyrect, csButton.size.small, csButton.color.purple, function() {
            cc.log('click!');
        }, this);
        btn3_5.x = 300;
        btn3_5.y = winSize.height - 340;
        this.addChild(btn3_5);

        btn3_6 = new csFAButton(csFA.icon('fa-bell-slash-o'), csButton.style.emptyrect, csButton.size.small, csButton.color.green, function() {
            cc.log('click!');
        }, this);
        btn3_6.x = 350;
        btn3_6.y = winSize.height - 340;
        this.addChild(btn3_6);

        btn3_7 = new csFAButton(csFA.icon('fa-arrows-v'), csButton.style.emptyrect, csButton.size.small, csButton.color.orange, function() {
            cc.log('click!');
        }, this);
        btn3_7.x = 400;
        btn3_7.y = winSize.height - 340;
        this.addChild(btn3_7);

        btn4_1 = new csFAButton(csFA.icon('fa-barcode'), csButton.style.rect, csButton.size.small, csButton.color.red, function() {
            cc.log('click!');
        }, this);
        btn4_1.x = 100;
        btn4_1.y = winSize.height - 410;
        this.addChild(btn4_1);

        btn4_2 = new csFAButton(csFA.icon('fa-binoculars'), csButton.style.rect, csButton.size.small, csButton.color.blue, function() {
            cc.log('click!');
        }, this);
        btn4_2.x = 150;
        btn4_2.y = winSize.height - 410;
        this.addChild(btn4_2);

        btn4_3 = new csFAButton(csFA.icon('fa-asterisk'), csButton.style.rect, csButton.size.small, csButton.color.white, function() {
            cc.log('click!');
        }, this);
        btn4_3.x = 200;
        btn4_3.y = winSize.height - 410;
        this.addChild(btn4_3);

        btn4_4 = new csFAButton(csFA.icon('fa-bars'), csButton.style.rect, csButton.size.small, csButton.color.grey, function() {
            cc.log('click!');
        }, this);
        btn4_4.x = 250;
        btn4_4.y = winSize.height - 410;
        this.addChild(btn4_4);

        btn4_5 = new csFAButton(csFA.icon('fa-adjust'), csButton.style.rect, csButton.size.small, csButton.color.purple, function() {
            cc.log('click!');
        }, this);
        btn4_5.x = 300;
        btn4_5.y = winSize.height - 410;
        this.addChild(btn4_5);

        btn4_6 = new csFAButton(csFA.icon('fa-birthday-cake'), csButton.style.rect, csButton.size.small, csButton.color.green, function() {
            cc.log('click!');
        }, this);
        btn4_6.x = 350;
        btn4_6.y = winSize.height - 410;
        this.addChild(btn4_6);

        btn4_7 = new csFAButton(csFA.icon('fa-adjust'), csButton.style.rect, csButton.size.small, csButton.color.orange, function() {
            cc.log('click!');
        }, this);
        btn4_7.x = 400;
        btn4_7.y = winSize.height - 410;
        this.addChild(btn4_7);

        btn5_1 = new csFAButton(csFA.icon('fa-at'), csButton.style.emptyflat, csButton.size.small, csButton.color.red, function() {
            cc.log('click!');
        }, this);
        btn5_1.x = 100;
        btn5_1.y = winSize.height - 480;
        this.addChild(btn5_1);

        btn5_2 = new csFAButton(csFA.icon('fa-bicycle'), csButton.style.emptyflat, csButton.size.small, csButton.color.blue, function() {
            cc.log('click!');
        }, this);
        btn5_2.x = 200;
        btn5_2.y = winSize.height - 480;
        this.addChild(btn5_2);

        btn5_3 = new csFAButton(csFA.icon('fa-beer'), csButton.style.emptyflat, csButton.size.small, csButton.color.white, function() {
            cc.log('click!');
        }, this);
        btn5_3.x = 300;
        btn5_3.y = winSize.height - 480;
        this.addChild(btn5_3);

        btn5_4 = new csFAButton(csFA.icon('fa-automobile'), csButton.style.emptyflat, csButton.size.small, csButton.color.grey, function() {
            cc.log('click!');
        }, this);
        btn5_4.x = 400;
        btn5_4.y = winSize.height - 480;
        this.addChild(btn5_4);

        btn5_5 = new csFAButton(csFA.icon('fa-ban'), csButton.style.emptyflat, csButton.size.small, csButton.color.purple, function() {
            cc.log('click!');
        }, this);
        btn5_5.x = 500;
        btn5_5.y = winSize.height - 480;
        this.addChild(btn5_5);

        btn5_6 = new csFAButton(csFA.icon('fa-bell'), csButton.style.emptyflat, csButton.size.small, csButton.color.green, function() {
            cc.log('click!');
        }, this);
        btn5_6.x = 600;
        btn5_6.y = winSize.height - 480;
        this.addChild(btn5_6);

        btn5_7 = new csFAButton(csFA.icon('fa-bank'), csButton.style.emptyflat, csButton.size.small, csButton.color.orange, function() {
            cc.log('click!');
        }, this);
        btn5_7.x = 700;
        btn5_7.y = winSize.height - 480;
        this.addChild(btn5_7);

        btn6_1 = new csFAButton(csFA.icon('fa-archive'), csButton.style.flat, csButton.size.small, csButton.color.red, function() {
            cc.log('click!');
        }, this);
        btn6_1.x = 100;
        btn6_1.y = winSize.height - 550;
        this.addChild(btn6_1);

        btn6_2 = new csFAButton(csFA.icon('fa-bell-o'), csButton.style.flat, csButton.size.small, csButton.color.blue, function() {
            cc.log('click!');
        }, this);
        btn6_2.x = 200;
        btn6_2.y = winSize.height - 550;
        this.addChild(btn6_2);

        btn6_3 = new csFAButton(csFA.icon('fa-area-chart'), csButton.style.flat, csButton.size.small, csButton.color.white, function() {
            cc.log('click!');
        }, this);
        btn6_3.x = 300;
        btn6_3.y = winSize.height - 550;
        this.addChild(btn6_3);

        btn6_4 = new csFAButton(csFA.icon('fa-arrows'), csButton.style.flat, csButton.size.small, csButton.color.grey, function() {
            cc.log('click!');
        }, this);
        btn6_4.x = 400;
        btn6_4.y = winSize.height - 550;
        this.addChild(btn6_4);

        btn6_5 = new csFAButton(csFA.icon('fa-bar-chart'), csButton.style.flat, csButton.size.small, csButton.color.purple, function() {
            cc.log('click!');
        }, this);
        btn6_5.x = 500;
        btn6_5.y = winSize.height - 550;
        this.addChild(btn6_5);

        btn6_6 = new csFAButton(csFA.icon('fa-bell-slash'), csButton.style.flat, csButton.size.small, csButton.color.green, function() {
            cc.log('click!');
        }, this);
        btn6_6.x = 600;
        btn6_6.y = winSize.height - 550;
        this.addChild(btn6_6);

        btn6_7 = new csFAButton(csFA.icon('fa-arrows-h'), csButton.style.flat, csButton.size.small, csButton.color.orange, function() {
            cc.log('click!');
        }, this);
        btn6_7.x = 700;
        btn6_7.y = winSize.height - 550;
        this.addChild(btn6_7);

        btn7_1 = new csFAButton(csFA.icon('fa-bar-chart-o'), csButton.style.emptycircle, csButton.size.tiny, csButton.color.red, function() {
            cc.log('click!');
        }, this);
        btn7_1.x = 500;
        btn7_1.y = winSize.height - 200;
        this.addChild(btn7_1);

        btn7_2 = new csFAButton(csFA.icon('fa-bell-slash-o'), csButton.style.emptycircle, csButton.size.small, csButton.color.red, function() {
            cc.log('click!');
        }, this);
        btn7_2.x = 550;
        btn7_2.y = winSize.height - 200;
        this.addChild(btn7_2);

        btn7_3 = new csFAButton(csFA.icon('fa-arrows-v'), csButton.style.emptycircle, csButton.size.normal, csButton.color.red, function() {
            cc.log('click!');
        }, this);
        btn7_3.x = 620;
        btn7_3.y = winSize.height - 200;
        this.addChild(btn7_3);

        btn7_4 = new csFAButton(csFA.icon('fa-barcode'), csButton.style.emptycircle, csButton.size.large, csButton.color.red, function() {
            cc.log('click!');
        }, this);
        btn7_4.x = 720;
        btn7_4.y = winSize.height - 200;
        this.addChild(btn7_4);

        btn7_5 = new csFAButton(csFA.icon('fa-binoculars'), csButton.style.emptycircle, csButton.size.jumbo, csButton.color.red, function() {
            cc.log('click!');
        }, this);
        btn7_5.x = 850;
        btn7_5.y = winSize.height - 200;
        this.addChild(btn7_5);

        return true;
    }
});

var csFAButtonTestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new csFAButtonTestLayer();
        this.addChild(layer);
    }
});