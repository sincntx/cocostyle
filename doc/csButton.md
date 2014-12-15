csButton
=========

### Quick Start

```
var btn1 = new csButton('Go', csButton.style.emptycircle, csButton.size.tiny, csButton.color.red, function() {
            cc.log('click!');
        }, this);

this.addChild(btn1);
```

### Methods
- `ctor(String msg, Number style, Number size, cc.Color color, Function callback, cc.Node target)`

### Field
- `size` : csButton.size.tiny, csButton.size.small, csButton.size.normal, csButton.size.large, csButton.size.jumbo
- `style` : csButton.style.emptycirlcle, csButton.style.cirlcle, csButton.style.emptyrect, csButton.style.rect, csButton.style.emptyflat, csButton.style.flat
- `colore` : csButton.color.transparent, csButton.color.white, csButton.color.blac, csButton.color.grey, csButton.color.red, csButton.color.blue, csButton.color.purple, csButton.color.orange
