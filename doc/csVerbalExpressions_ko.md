csVerbalExpressions
=========

### 시작하기

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

-자세한 설명은 [JSVerbalExpressions](https://github.com/VerbalExpressions/JSVerbalExpressions)를 참조해주세요.

### 기타

-[JSVerbalExpressions](https://github.com/VerbalExpressions/JSVerbalExpressions)의 코드를 사용했습니다.
