var csPixelCollisionTestLayer = cc.Layer.extend({
    sprite1:null,
    sprite2:null,
    spriteLabel:null,
    ctor:function () {
        var winSize;
        var label, menuItem, menu, title;

        this._super();

        winSize = cc.director.getWinSize();

        title = new cc.LabelTTF("Cocostyle Pixel Collision Test", "Arial", 20);
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

        this.sprite1 = new cc.Sprite("res/grossini.png");
        this.sprite1.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
        this.addChild(this.sprite1);

        this.sprite2 = new cc.Sprite("res/grossini.png");
        this.sprite2.setPosition(cc.p(100, winSize.height / 2));
        this.addChild(this.sprite2);

        this.spriteLabel = new cc.LabelTTF("Touch and move", "Arial", 10);
        this.spriteLabel.setAnchorPoint(cc.p(0, 1));
        this.sprite2.addChild(this.spriteLabel);

        if ('mouse' in cc.sys.capabilities)
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseMove: function(event){
                    if(event.getButton() == cc.EventMouse.BUTTON_LEFT)
                        event.getCurrentTarget().touchEvent(event);
                }
            }, this);

        if (cc.sys.capabilities.hasOwnProperty('touches')){
            cc.eventManager.addListener({
                prevTouchId: -1,
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesMoved:function (touches, event) {
                    var touch = touches[0];
                    if (this.prevTouchId != touch.getID())
                        this.prevTouchId = touch.getId();
                    else event.getCurrentTarget().touchEvent(touches[0]);
                }
            }, this);
        }

        return true;
    },
    touchEvent:function (event) {
        var winSize = cc.director.getWinSize();
        var delta = event.getDelta();
        var curPosition = cc.p(this.sprite2.x, this.sprite2.y);
        curPosition = cc.pAdd(curPosition, delta);
        curPosition = cc.pClamp(curPosition, cc.p(0, 0), cc.p(winSize.width, winSize.height));
        this.sprite2.x = curPosition.x;
        this.sprite2.y = curPosition.y;
        curPosition = null;

        if(csPixelCollision(this.sprite1, this.sprite2)) {
            this.spriteLabel.setColor(cc.color(255, 0, 0, 255));
        }
        else {
            this.spriteLabel.setColor(cc.color(255, 255, 255, 255));
        }
    }
});

var csPixelCollisionTestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new csPixelCollisionTestLayer();
        this.addChild(layer);
    }
});
