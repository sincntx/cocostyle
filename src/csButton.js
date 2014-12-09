var csButton = cc.Menu.extend({
    bgItem : null,
    drawNode : null,
    selectDrawNode : null,
    labelItem : null,
    ctor:function(msg, style, size, color, callback, target) {
        this._super();
        this.drawNode = new cc.DrawNode();
        this.selectDrawNode = new cc.DrawNode();
        this.bgItem = new cc.MenuItemSprite(this.drawNode, this.selectDrawNode, null, callback, target);
        this.addChild(this.bgItem, 1);

        this.labelItem = new cc.MenuItemLabel(new cc.LabelTTF(msg, "Arial", 15), callback, target);
        this.addChild(this.labelItem, 2);

        this._draw(style, size, color);
    },
    _draw:function(style, size, color) {
        var strokeSize = 1;

        switch(size) {
            case csButton.size.tiny:
                this.labelItem.label.fontSize = 8;
                strokeSize = 1;
                break;
            case csButton.size.small:
                this.labelItem.label.fontSize = 12;
                strokeSize = 2;
                break;
            case csButton.size.normal:
                this.labelItem.label.fontSize = 20;
                strokeSize = 3;
                break;
            case csButton.size.large:
                this.labelItem.label.fontSize = 24;
                strokeSize = 4;
                break;
            case csButton.size.jumbo:
                this.labelItem.label.fontSize = 30;
                strokeSize = 5;
                break;
        }

        switch(style) {
            case csButton.style.emptycircle:
                this.drawNode.drawCircle(cc.p(size, size), size, 0, size, false, strokeSize, color);
                this.selectDrawNode.drawCircle(cc.p(size, size), size * 0.9, 0, size, false, strokeSize, color);
                this.bgItem.width = size * 2;
                this.bgItem.height = size * 2;
                this.labelItem.label.setColor(color);
                break;
            case csButton.style.circle:
                this.drawNode.drawDot(cc.p(size, size), size, color);
                this.selectDrawNode.drawDot(cc.p(size, size), size * 0.9, color);
                this.bgItem.width = size * 2;
                this.bgItem.height = size * 2;
                if(color !== csButton.color.transparent && color !== csButton.color.white)
                    this.labelItem.label.setColor(csButton.color.white);
                else
                    this.labelItem.label.setColor(color);
                break;
            case csButton.style.emptyrect:
                this.drawNode.drawRect(cc.p(0,0), cc.p(size * 2, size * 2), cc.color(0,0,0,0), strokeSize, color);
                this.selectDrawNode.drawRect(cc.p(size * 0.2, size * 0.2), cc.p(size * 2 * 0.9, size * 2 * 0.9), cc.color(0,0,0,0), strokeSize, color);
                this.bgItem.width = size * 2;
                this.bgItem.height = size * 2;
                this.labelItem.label.setColor(color);
                break;
            case csButton.style.rect:
                this.drawNode.drawRect(cc.p(0,0), cc.p(size * 2, size * 2), color, 0, cc.color(0,0,0,0));
                this.selectDrawNode.drawRect(cc.p(size * 0.2, size * 0.2), cc.p(size * 2 * 0.9, size * 2 * 0.9), color, 0, cc.color(0,0,0,0));
                this.bgItem.width = size * 2;
                this.bgItem.height = size * 2;
                if(color !== csButton.color.transparent && color !== csButton.color.white)
                    this.labelItem.label.setColor(csButton.color.white);
                else
                    this.labelItem.label.setColor(color);
                break;
            case csButton.style.emptyflat:
                this.drawNode.drawRect(cc.p(0,0), cc.p(this.labelItem.label.width + size, size * 2), cc.color(0,0,0,0), strokeSize, color);
                this.selectDrawNode.drawRect(cc.p(size * 0.2, size * 0.2), cc.p(this.labelItem.label.width + (size * 0.9), size * 2 * 0.9), cc.color(0,0,0,0), strokeSize, color);
                this.bgItem.width = this.labelItem.label.width + size;
                this.bgItem.height = size * 2;
                this.labelItem.label.setColor(color);
                break;
            case csButton.style.flat:
                this.drawNode.drawRect(cc.p(0,0), cc.p(this.labelItem.label.width + size, size * 2), color, 0, cc.color(0,0,0,0));
                this.selectDrawNode.drawRect(cc.p(size * 0.2, size * 0.2), cc.p(this.labelItem.label.width + (size * 0.9), size * 2 * 0.9), color, 0, cc.color(0,0,0,0));
                this.bgItem.width = this.labelItem.label.width + size;
                this.bgItem.height = size * 2;
                if(color !== csButton.color.transparent && color !== csButton.color.white)
                    this.labelItem.label.setColor(csButton.color.white);
                else
                    this.labelItem.label.setColor(color);
                break;
        }

        this.labelItem.width = this.labelItem.label.width;
        this.labelItem.height = this.labelItem.label.height;
    }
});

csButton.style = {emptycircle:0, circle:1, emptyrect:2, rect:3, emptyflat:4, flat:5};
csButton.size = {tiny:15, small:20, normal:30, large:40, jumbo:50};
csButton.color = {transparent:cc.color(255,255,255,255), white:cc.color(255,255,255,255), black:cc.color(0,0,0,255), grey:cc.color(100,100,100,255), blue:cc.color(0,161,203,255), green:cc.color(148,193,46,255),orange:cc.color(241,141,5,255),red:cc.color(229,64,40,255),purple:cc.color(135,49,140,255)};
