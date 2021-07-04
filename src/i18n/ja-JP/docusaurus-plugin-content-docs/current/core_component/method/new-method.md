---
title: "new メソッド"
---

```cs
NewMethod.Create(builder);     弱い型のデリゲートを返
NewMethod.Create<T>(builder);  厳密に型指定されたデリゲートを返します
```

ここで builder は FastMethodOperator のインスタンスです。
