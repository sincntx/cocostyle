var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        var winSize = cc.director.getWinSize();
        var toast = new csToast();
        toast.set({text:"textteasdsadasdadadsxt", backgroundImage:"res/blue_button00.png"
        });
        toast.run(this);

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

