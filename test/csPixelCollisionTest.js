var csPixelCollisionTestLayer = cc.Layer.extend({
    sprite1:null,
    sprite2:null,
    spriteLabel:null,
    ctor:function () {
        var winSize;
        var toast;
        var label, menuItem, menu, title;

        this._super();

        winSize = cc.director.getWinSize();

        title = cc.LabelTTF.create("Cocostyle Pixel Collision Test", "Arial", 20);
        title.setPosition(winSize.width / 2, winSize.height - 40);
        title.setColor(cc.color(255, 255, 0, 255));
        this.addChild(title);

        label = cc.LabelTTF.create("[ Main Menu ]", "Arial", 15);
        menuItem = cc.MenuItemLabel.create(label, function() {
            var scene = new MainTestLayer();
            cc.director.runScene(scene);
        }, this);

        menu = cc.Menu.create(menuItem);
        menu.x = 0;
        menu.y = 0;
        menuItem.x = winSize.width - 70;
        menuItem.y = 25;
        this.addChild(menu);

        sprite1 = cc.Sprite.create("src/res/grossini.png");
        sprite1.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
        this.addChild(sprite1);

        sprite2 = cc.Sprite.create("src/res/grossini.png");
        sprite2.setPosition(cc.p(100, winSize.height / 2));
        this.addChild(sprite2);

        spriteLabel = cc.LabelTTF.create("Touch and move", "Arial", 10);
        spriteLabel.setAnchorPoint(cc.p(0, 1));
        sprite2.addChild(spriteLabel);

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
        var curPosition = cc.p(sprite2.x, sprite2.y);
        curPosition = cc.pAdd(curPosition, delta);
        curPosition = cc.pClamp(curPosition, cc.p(0, 0), cc.p(winSize.width, winSize.height));
        sprite2.x = curPosition.x;
        sprite2.y = curPosition.y;
        curPosition = null;

        if(csPixelCollision(sprite1, sprite2)) {
            spriteLabel.setColor(cc.color(255, 0, 0, 255));
        }
        else {
            spriteLabel.setColor(cc.color(255, 255, 255, 255));
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
