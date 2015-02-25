csVerbalExpressions
=========

### Quick Start

```
var tester = csVerbalExpressions()
            .startOfLine()
            .then( "http" )
            .maybe( "s" )
            .then( "://" )
            .maybe( "www." )
            .anythingBut( " " )
            .endOfLine();

        var testMe = "https://www.google.com";

        tl1 = new cc.LabelTTF(tester.test(testMe), "Arial", 15);
        this.addChild(tl1);
```

### JSVerbalExpressions

-Please refer to [JSVerbalExpressions](https://github.com/VerbalExpressions/JSVerbalExpressions)

### Etc

-[Most of the code from JSVerbalExpressions](https://github.com/VerbalExpressions/JSVerbalExpressions)
