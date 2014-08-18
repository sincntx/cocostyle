csPixelCollision
=========

### Quick Start

```
var isCollision;
isCollision = csPixelCollision(sprite1, sprite2);
```

### How to use

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

### Class Detail

- `{Boolean} csPixelCollisionk(cc.Sprite sprite1, cc.Sprite sprite2)`

### Etc

-It's only work on HTML5.

-Transformed sprite(Scale, Rotate and etc) not work.
