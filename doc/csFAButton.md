csFAButton
=========

### Quick Start

```
btn = new csFAButton(csFA.icon('fa-adjust'), csFAButton.style.emptycircle, csFAButton.size.small, csFAButton.color.red, function() {
            cc.log('click!');
        }, this);
```

### Methods
- `ctor(String text, Number style, Number size, cc.Color color)`

### Field
- `size` : csFAButton.size.tiny, csFAButton.size.small, csFAButton.size.normal, csFAButton.size.large, csFAButton.size.jumbo
- `style` : csFAButton.style.emptycirlcle, csFAButton.style.cirlcle, csFAButton.style.emptyrect, csFAButton.style.rect, csFAButton.style.emptyflat, csFAButton.style.flat
- `color` : csFAButton.color.transparent, csFAButton.color.white, csFAButton.color.blac, csFAButton.color.grey, csFAButton.color.red, csFAButton.color.blue, csFAButton.color.purple, csFAButton.color.orange

### Etc

-[fontawesome-webfont.ttf From Font Awesome](http://fortawesome.github.io/)