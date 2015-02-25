csVerbalExpressions
=========

### 시작하기

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

-자세한 설명은 [JSVerbalExpressions](https://github.com/VerbalExpressions/JSVerbalExpressions)를 참조해주세요.

### 기타

-[JSVerbalExpressions](https://github.com/VerbalExpressions/JSVerbalExpressions)의 코드를 사용했습니다.
