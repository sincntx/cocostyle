csTypingLabelExt(extend cc.LabelTTF)
=========

### Quick Start

```
var tlabel = new csTypingLabelExt("My name is typing label!!!!!", "Arial", 30);
tlabel.setPosition(winSize.width / 2, winSize.height / 2);
tlabel.setFontStyle("bold italic");
this.addChild(tlabel);
tlabel.run(0.05);
```

### Fields

- {String} _fontStyle
- {Number} _nowCur
- {String} _originalString
- And cc.LabelTTF fileds

### Methods

- `run(Number duration)`
- `stop()`
- `renew()`
- `{String} getFontStyle()`
- `setFontStyle(String fontStyle)`
- And cc.LabelTTF methods
- It's only work on HTML5.
