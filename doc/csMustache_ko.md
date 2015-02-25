csMustache
=========

### 시작하기

```
 var view = {
            title: "cocostyle",
            getTitle: function () {
                return "cocostyle";
            }
        };
        var m = new csMustache();

        tl1 = new cc.LabelTTF("mustache example : " + m.render("{{title}}, {{getTitle}}", view), "Arial", 15);
        this.addChild(tl1);
```

### Mustache

-자세한 설명은 [mustache.js](https://github.com/janl/mustache.js)를 참조해주세요.

### 기타

-[mustache.js](https://github.com/janl/mustache.js)의 코드를 사용했습니다.
