csVideo
=========

### 일단 해보기

```
var video = new csVideo('http://www.w3schools.com/html/mov_bbb.mp4');
this.addChild(video);
video.video.play();
```

### 필드

- {HTML5 Video} video
- And cc.Node fileds

### 주의사항

- 네이티브에서는 동작하지 않고 웹에서만 동작합니다.
- "frameworks/cocos2d-html5/extensions/editbox/CCdomNode.js"가 필요합니다.
