csToast
=========

### Quick Start

```
var toast = new csToast();
toast.run(this);
```

### Customizing

```
var winSize = cc.director.getWinSize();
var toast = new csToast();
toast.set({text : "text", 
           backgroundColor : cc.color(50, 50, 50, 255),
           backgroundImage : "res/blue_button00.png"},
           fontFillColor : cc.color(255, 255, 255, 255),
           fontSize : 15,
           fontName : "Arial",
           duration : 2,
           position : cc.p(winSize.width / 2, winSize.height / 2)           
           );
toast.run(this);
```

### Fields

- {Number} _duration
- {cc.LabelTTF} _labelChild
- {cc.LayerColor} _backgroundChild
- {cc.Sprite} _backgroundImage

### Methods

- `run(cc.Node parent)`
- `set(Object param)`
- `setBackgroundImage(cc.Sprite backgroundImage)`
- `setBackgroundColor(cc.color backgroundColor)`
- `setFontFillColor(cc.Color fontColor)`
- `setFontName(String fontName)`
- `setFontSize(Number fontSize)`
- `setText(String text)`
- `setDuration(Number duration)`
- `{cc.Sprite} getBackgroundImage()`
- `{cc.Color} getBackgroundColor()`
- `{cc.Color} getFontFillColor()`
- `{String} getFontName()`
- `{Number} getFontSize()`
- `{String} getText()`
- `{Number} getDuration()`
