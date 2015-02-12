csFAButton
=========

### 시작하기

```
btn = new csFAButton(csFA.icon('fa-adjust'), csButton.style.emptycircle, csButton.size.small, csButton.color.red, function() {
            cc.log('click!');
        }, this);
```

### 메소드
- `ctor(String text, Number style, Number size, cc.Color color)`

### 필드
- `size` : csFAButton.size.tiny, csFAButton.size.small, csFAButton.size.normal, csFAButton.size.large, csFAButton.size.jumbo
- `style` : csFAButton.style.emptycirlcle, csFAButton.style.cirlcle, csFAButton.style.emptyrect, csFAButton.style.rect, csFAButton.style.emptyflat, csFAButton.style.flat
- `color` : csFAButton.color.transparent, csFAButton.color.white, csFAButton.color.blac, csFAButton.color.grey, csFAButton.color.red, csFAButton.color.blue, csFAButton.color.purple, csFAButton.color.orange

### 기타

-[fontawesome-webfont.ttf From Font Awesome](http://fortawesome.github.io/)