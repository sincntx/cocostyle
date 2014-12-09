var MainTestLayer = cc.Layer.extend({
    menuItemList : null,
    ctor:function () {
        var winSize;
        var title;
        var menuItemList, i;
        var btn, label;

        this._super();

        winSize = cc.director.getWinSize();

        title = new cc.Sprite(res.logo_png);
        title.scale = 0.7;
        title.x = 150;
        title.y = winSize.height - 50;
        this.addChild(title);

        this.menuItemList = [{title:'csButton',desc:'a simple and beautiful button.'},
            {title:'csToast',scene:'csToast',desc:'a quick little message.'},
            {title:'csAlert',scene:'csAlet',desc:'a simple alert window.'},
            {title:'csTypingLabel',scene:'csTypingLabel',desc:'a label with typing effect.'},
            {title:'csTypingLBExt',scene:'csTypingLabelExt',desc:'a label with typing effect and font style.'},
            {title:'csLabelTTFExt',scene:'csLabelTTFExt',desc:'a label with font style(bold, italic and etc).'},
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
        var innerWidth = scrollView.width;
        var innerHeight = this.menuItemList.length * 150;
        scrollView.setInnerContainerSize(cc.size(innerWidth, innerHeight));
        this.addChild(scrollView);

        for(i = 0;i < this.menuItemList.length;i++) {
            var btn = new csButton(this.menuItemList[i].title, csButton.style.emptycircle, csButton.size.large, csButton.color.orange, function(sender) {
                var scene = eval('new ' + sender.parent.scene + 'TestLayer()');
                cc.director.runScene(scene);
            }, btn);

            btn.scene = this.menuItemList[i].scene;
            btn.labelItem.label.fontSize = 10;
            btn.labelItem.width = btn.labelItem.label.width;
            btn.labelItem.height = btn.labelItem.label.height;
            btn.x = winSize.width /  2 - 60;
            btn.y = (this.menuItemList.length * 150 - 100) - (i * 150);
            scrollView.addChild(btn);

            label = new cc.LabelTTF(this.menuItemList[i].desc, "Arial", 10);
            label.x = winSize.width / 2;
            label.y = (this.menuItemList.length * 150 - 100) - (i * 150);
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
