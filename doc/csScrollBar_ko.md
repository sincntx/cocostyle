csScrollBar
=========

### 시작하기

```
var scrollView = new ccui.ScrollView();
scrollView.setContentSize(cc.size(winSize.width * 0.8, winSize.height * 0.8));
scrollView.setInnerContainerSize(cc.size(winSize.width * 0.8, winSize.height * 3.2));
scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
scrollView.setTouchEnabled(true);
scrollView.y = 50;
this.addChild(scrollView);

var scrollBar = new csScrollBar(scrollView, cc.color(cc.color(50, 50, 50, 255)), cc.color(200, 200, 200, 255));
this.addChild(scrollBar);
```

### 메소드
- `ctor(ccui.ScrollView scroll, cc.Color backgroundColor, cc.Color cursorColor)`
