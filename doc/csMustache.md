csMustache
=========

### Quick Start

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

-Please refer to [mustache.js](https://github.com/janl/mustache.js)

### Etc

-[Most of the code from mustache.js](https://github.com/janl/mustache.js)
