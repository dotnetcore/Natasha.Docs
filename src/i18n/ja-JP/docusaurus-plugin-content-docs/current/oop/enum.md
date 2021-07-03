---
title: "enum"
---

```cs

var script = new OopOperator()
    .HiddenNameSpace().ChangeToEnum()
    .Access(AccessTypes.Public)
    .Name("EnumUT1")
    .EnumField("Apple")
    .EnumField("Orange",2)
    .EnumField("Banana")
    .Builder().Script;



/* result:

public enum EnumUT1{
   Apple,
   Orange=2,
   Banana}

*/

```

因为调用了 HiddenNameSpace 方法，所以结果没有 Namespace

也可以直接用 NEnum 来创建：

```cs

var script = NEnum
    .Namespace("aaa")
    .Access(AccessTypes.Public)
    .Name("EnumUT1")
    .EnumField("Apple")
    .EnumField("Orange",2)
    .EnumField("Banana")
    .GetType();

```
