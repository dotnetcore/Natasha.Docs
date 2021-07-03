---
title: "new 方法"
---

```cs
NewMethod.Create(builder);     //返回弱类型委托
NewMethod.Create<T>(builder);  //返回强类型委托
```

这里的 builder 是 FastMethodOperator 实例。
