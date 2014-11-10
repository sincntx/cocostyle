csPixelCollision
=========

### 일단 해보기

```
var isCollision;
isCollision = csPixelCollision(sprite1, sprite2);
```

### 사용법

```
var sprite1 = new cc.Sprite("src/res/grossini.png");
var sprite2 = new cc.Sprite("src/res/grossini.png");

if(csPixelCollision(sprite1, sprite2)) {
    cc.log('true');
}
else {
    cc.log('false');
}
```

### 클래스 세부사항

- `{Boolean} csPixelCollisionk(cc.Sprite sprite1, cc.Sprite sprite2)`

### 기타

-네이티브에서는 동작하지 않고 웹에서만 동작합니다.

-변형된 스프라이트(크기, 회전 등)에서는 아직 동작하지 않습니다.
