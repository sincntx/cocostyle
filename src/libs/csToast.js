var csToast = cc.Layer.extend({
    _duration:2,
    _labelChild:null,
    _backgroundChild:null,
    _backgroundImage:null,
    _backgroundImageCheck:false,
    ctor:function() {
        var winSize = cc.director.getWinSize();

        this._super();

        _backgroundChild = new cc.LayerColor(cc.color(50, 50, 50, 255));
        _backgroundChild.setLocalZOrder(1);
        _labelChild = new cc.LabelTTF("", "Arial", 15);
        _labelChild.setLocalZOrder(3);
        _backgroundImageCheck = false;

        this.adjustBackgroundChild();

        this.addChild(_backgroundChild);
        this.addChild(_labelChild);

        this.setPosition(winSize.width / 2, winSize.height / 2);
    },
    set:function(params) {
        if(params.backgroundColor) {
            this.setBackgroundColor(params.backgroundColor);
        }

        if(params.fontFillColor) {
            this.setFontFillColor(params.fontFillColor);
        }

        if(params.fontSize) {
            this.setFontSize(params.fontSize);
        }

        if(params.fontName) {
            this.setFontName(params.fontName);
        }

        if(params.text) {
            this.setText(params.text);
        }

        if(params.duration) {
            this.setDuration(params.duration);
        }

        if(params.position) {
            this.setPosition(params.position);
        }

        if(params.backgroundImage) {
            this.setBackgroundImage(params.backgroundImage);
        }
    },
    adjustBackgroundChild:function() {
        var winSize = cc.director.getWinSize();

        _backgroundChild.width = _labelChild.getContentSize().width + (winSize.width / 20);
        _backgroundChild.height = _labelChild.getContentSize().height + (winSize.height / 20);
        _backgroundChild.setPosition(cc.p(_backgroundChild.width / -2, _backgroundChild.height / -2));

        if(_backgroundImageCheck) {
            _backgroundImage.setScaleX((_labelChild.getContentSize().width + (winSize.width / 20)) / _backgroundImage.getContentSize().width);
            _backgroundImage.setScaleY((_labelChild.getContentSize().height + + (winSize.height / 20)) / _backgroundImage.getContentSize().height);
        }
    },
    setBackgroundImage:function(backgroundImage) {
        var winSize = cc.director.getWinSize();

        if(_backgroundImageCheck) {
            var sprite = new cc.Sprite(backgroundImage);

            _backgroundImage.setTexture(sprite.texture);
            _backgroundImage.setScaleX((_labelChild.getContentSize().width + (winSize.width / 20)) / _backgroundImage.getContentSize().width);
            _backgroundImage.setScaleY((_labelChild.getContentSize().height + + (winSize.height / 20)) / _backgroundImage.getContentSize().height);
        }
        else {
            _backgroundImage = new cc.Sprite(backgroundImage);
            _backgroundImage.setScaleX((_labelChild.getContentSize().width + (winSize.width / 20)) / _backgroundImage.getContentSize().width);
            _backgroundImage.setScaleY((_labelChild.getContentSize().height + + (winSize.height / 20)) / _backgroundImage.getContentSize().height);
            _backgroundImage.setLocalZOrder(2);
            this.addChild(_backgroundImage);
            _backgroundImageCheck = true;
        }
    },
    getBackgroundImage:function() {
        return _backgroundImage;
    },
    setBackgroundColor:function(backgroundColor) {
        _backgroundChild.setColor(backgroundColor);
    },
    getBackgroundColor:function() {
        return _backgroundChild.getColor();
    },
    setFontFillColor:function(fontFillColor) {
        _labelChild.setFontFillColor(fontFillColor);
    },
    getFontFillColor:function() {
        return _labelChild.getColor();
    },
    setFontName:function(fontName) {
        _labelChild.setFontName(fontName);
    },
    getFontName:function() {
        return _labelChild.getFontName();
    },
    setFontSize:function(fontSize) {
        _labelChild.setFontSize(fontSize);
        this.adjustBackgroundChild();
    },
    getFontSize:function() {
        return _labelChild.getFontSize();
    },
    setText:function(text) {
        _labelChild.setString(text);
        this.adjustBackgroundChild();
    },
    getText:function() {
        return _labelChild.getString();
    },
    setDuration:function(duration) {
        _duration = duration;
    },
    getDuration:function() {
        return _duration;
    },
    run:function(parent) {
        var childFadeInAction = new cc.FadeIn(0.5);
        var childFadeOutAction = new cc.FadeOut(0.5);
        var childDelayAction = new cc.DelayTime(this._duration);
        var toastDelayAction = new cc.DelayTime(this._duration + 1);
        var toastFinishAction = new cc.CallFunc(function() {
            this.removeFromParent(true);
        }, this);
        var childSequenceAction = new cc.Sequence(childFadeInAction, childDelayAction, childFadeOutAction);
        var toastSequenceAction = new cc.Sequence(toastDelayAction, toastFinishAction);

        _labelChild.setOpacity(0);
        _labelChild.runAction(childSequenceAction.clone());
        _backgroundChild.setOpacity(0);
        _backgroundChild.runAction(childSequenceAction.clone());
        if(_backgroundImageCheck) {
            _backgroundImage.setOpacity(0);
            _backgroundImage.runAction(childSequenceAction.clone());
        }

        parent.addChild(this);
        this.runAction(toastSequenceAction);
    }
});
