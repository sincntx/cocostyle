var MainTestLayer = cc.Layer.extend({
    menuItemList : null,
    GAP : 180,
    ctor:function () {
        var winSize, title, i, btn, label, scene;

        this._super();

        winSize = cc.director.getWinSize();

        title = new cc.Sprite("res/cocostyle.png");
        title.scale = 0.7;
        title.x = 150;
        title.y = winSize.height - 50;
        this.addChild(title);

        this.menuItemList = [{title:'csButton',scene:'csButton',desc:'a simple and beautiful button.'},
            {title:'csToast',scene:'csToast',desc:'a quick little message.'},
            {title:'csAlert',scene:'csAlert',desc:'a simple alert window.'},
            {title:'csTypingLabel',scene:'csTypingLabel',desc:'a label with typing effect.'},
            {title:'csPixelCol',scene:'csPixelCollision',desc:'pixel collision detection.'},
            {title:'csCrypto',scene:'csCrypto',desc:'MD5, SHA1, SHA256, AES and etc.'},
            {title:'csAntiAlising',scene:'csCanvasAntiAlising',desc:'anti alising on canvas.'},
            {title:'csValidator',scene:'csValidator',desc:'validate email, url, credit card number and etc.'},
            {title:'csMoment',scene:'csMoment',desc:'parse, validate, manipulate, and display dates.'},
            {title:'csVExpressions',scene:'csVerbalExpressions',desc:'helps to construct difficult regular expressions.'},
            {title:'csScrollBar',scene:'csScrollBar',desc:'ccui.ScrollView adds scroll bar and cursor.'},
            {title:'csSpriteMask',scene:'csSpriteMask',desc:'simple way to mask a cc.Sprite.'},
            {title:'csFA',scene:'csFA',desc:'simple way to use Font Awesome'},
            {title:'csFAButton',scene:'csFAButton',desc:'simple way to use Font Awesome with csButton'},
            {title:'csMustache',scene:'csMustache',desc:'simple way to use Mustache'},
            {title:'csNumeral',scene:'csNumeral',desc:'simple way to use Numeral'}
        ];

        var scrollView = new ccui.ScrollView();
        scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        scrollView.setTouchEnabled(true);
        scrollView.setContentSize(cc.size(winSize.width, winSize.height));
        scrollView.setInnerContainerSize(cc.size(scrollView.width, this.menuItemList.length * this.GAP));
        this.addChild(scrollView);

        for(i = 0;i < this.menuItemList.length;i++) {
            btn = new csButton(this.menuItemList[i].title, csButton.style.emptycircle, csButton.size.large, csButton.color.orange, function(sender) {
                var scene;

                switch(sender.parent.scene) {
                    case 'csButton':
                        scene = new csButtonTestScene();
                        break;
                    case 'csToast':
                        scene = new csToastTestScene();
                        break;
                    case 'csAlert':
                        scene = new csAlertTestScene();
                        break;
                    case 'csTypingLabel':
                        scene = new csTypingLabelTestScene();
                        break;
                    case 'csPixelCollision':
                        scene = new csPixelCollisionTestScene();
                        break;
                    case 'csCrypto':
                        scene = new csCryptoTestScene();
                        break;
                    case 'csCanvasAntiAlising':
                        scene = new csCanvasAntiAlisingTestScene();
                        break;
                    case 'csValidator':
                        scene = new csValidatorTestScene();
                        break;
                    case 'csMoment':
                        scene = new csMomentTestScene();
                        break;
                    case 'csVerbalExpressions':
                        scene = new csVerbalExpressionsTestScene();
                        break;
                    case 'csScrollBar':
                        scene = new csScrollBarTestScene();
                        break;
                    case 'csSpriteMask':
                        scene = new csSpriteMaskTestScene();
                        break;
                    case 'csFA':
                        scene = new csFATestScene();
                        break;
                    case 'csFAButton':
                        scene = new csFAButtonTestScene();
                        break;
                    case 'csMustache':
                        scene = new csMustacheTestScene();
                        break;
                    case 'csNumeral':
                        scene = new csNumeralTestScene();
                        break;
                }

                cc.director.runScene(scene);
            }, btn);

            btn.scene = this.menuItemList[i].scene;
            btn._labelItem.label.fontSize = 12;
            btn._labelItem.width = btn._labelItem.label.width;
            btn._labelItem.height = btn._labelItem.label.height;
            btn.x = winSize.width /  2.5;
            btn.y = (this.menuItemList.length * this.GAP - (this.GAP / 1.2)) - (i * this.GAP);
            scrollView.addChild(btn);

            label = new cc.LabelTTF(this.menuItemList[i].desc, "Arial", 15);
            label.x = winSize.width / 2.1;
            label.y = (this.menuItemList.length * this.GAP - (this.GAP / 1.2)) - (i * this.GAP);
            label.anchorX = 0;
            scrollView.addChild(label);
        }

        return true;
    }
});

var MainTestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainTestLayer();
        this.addChild(layer);
    }
});

