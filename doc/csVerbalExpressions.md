csVerbalExpressions
=========

### Quick Start

```
var tester = new csVerbalExpressions()
            .startOfLine()
            .then( "http" )
            .maybe( "s" )
            .then( "://" )
            .maybe( "www." )
            .anythingBut( " " )
            .endOfLine();

        tl1 = new cc.LabelTTF(tester.RegExp.test("https://www.google.com"), "Arial", 15);
        this.addChild(tl1);

        var result = tester.find( "red" ).replace( "We have a red house", "blue" );

        tl2 = new cc.LabelTTF(result, "Arial", 15);
        this.addChild(tl2);
```

### JSVerbalExpressions

-Please refer to [JSVerbalExpressions](https://github.com/VerbalExpressions/JSVerbalExpressions)

### Etc

-[Most of the code from JSVerbalExpressions](https://github.com/VerbalExpressions/JSVerbalExpressions)
