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
            {title:'csTypingLBExt',scene:'csTypingLabelExt',desc:'a label with typing effect and font style.'},
            {title:'csLabelTTFExt',scene:'csLabelTTFExt',desc:'a label with font style(bold, italic and etc).'},
            {title:'csPixelCol',scene:'csPixelCollision',desc:'pixel collision detection.'},
            {title:'csCrypto',scene:'csCrypto',desc:'MD5, SHA1, SHA256, AES and etc.'},
            {title:'csVideo',scene:'csVideo',desc:'a video player as cocos2d sprite.'},
            {title:'csIframe',scene:'csIframe',desc:'a iFrame as cocos2d sprite.'},
            {title:'csAntiAlising',scene:'csCanvasAntiAlising',desc:'anti alising on canvas.'},
            {title:'csValidator',scene:'csValidator',desc:'validate email, url, credit card number and etc.'},
            {title:'csMoment',scene:'csMoment',desc:'parse, validate, manipulate, and display dates.'}
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
                    case 'csTypingLabelExt':
                        scene = new csTypingLabelExtTestScene();
                        break;
                    case 'csLabelTTFExt':
                        scene = new csLabelTTFExtTestScene();
                        break;
                    case 'csPixelCollision':
                        scene = new csPixelCollisionTestScene();
                        break;
                    case 'csCrypto':
                        scene = new csCryptoTestScene();
                        break;
                    case 'csVideo':
                        scene = new csVideoTestScene();
                        break;
                    case 'csIframe':
                        scene = new csIframeTestScene();
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

        var label = new cc.LabelTTF("[ Main Menu ]", "Arial", 15);
        var menuItem = new cc.MenuItemLabel(label, function() {
            var scene = new MainTestLayer();
            cc.director.runScene(scene);
        }, this);
        menu = cc.Menu.create(menuItem);
        menu.x = 0;
        menu.y = 0;
        menuItem.x = winSize.width - 70;
        menuItem.y = 25;
        this.addChild(menu);


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

