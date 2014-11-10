csLabelTTFExt(extend cc.LabelTTF)
=========

### 일단 해보기

```
var tlabel = new csLabelTTFExt("My name is typing label!!!!!", "Arial", 30);
tlabel.setPosition(winSize.width / 2, winSize.height / 2);
tlabel.setFontStyle("bold italic");
this.addChild(tlabel);
```

### 필드

- {String} _fontStyle
- And cc.LabelTTF fileds

### 메소드

- `{String} getFontStyle()`
- `setFontStyle(String fontStyle)`
- 그리고 cc.LabelTTF 메소드들
- 네이티브에서는 동작하지 않고 웹에서만 동작합니다.
