csTypingLabel(extend cc.LabelTTF)
=========

### 일단 해보기

```
var tlabel = new csTypingLabel("My name is typing label!!!!!", "Arial", 30);
tlabel.setPosition(winSize.width / 2, winSize.height / 2);
this.addChild(tlabel);
tlabel.run(0.05);
```

### 필드

- {Number} _nowCur
- {String} _originalString
- And cc.LabelTTF fileds

### 메소드

- `run(Number duration)`
- `stop()`
- `renew()`
- 그리고 cc.LabelTTF 메소드들
- 네이티브에서는 동작하지 않고 웹에서만 동작합니다.
