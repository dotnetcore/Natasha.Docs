---
title: "enum"
---

```cs

var script = new OopOperator()
    . HiddenNameSpace(). ChangeToEnum()
    . Access(AccessTypes.Public)
    . Name("EnumUT1")
    . EnumField("Apple")
    . EnumField("Orange",2)
    . EnumField("Banana")
    . Builder(). Script;



/* result:

public enum EnumUT1{
   Apple,
   Orange=2,
   Banana}

*/

```

HiddenNameSpace メソッドが呼び出されたため、結果に Namespace はありません

NEnum を使用して、新しいアプリケーションを直接：

```cs

var script = NEnum
    . Namespace("aaa")
    . Access(AccessTypes.Public)
    . Name("EnumUT1")
    . EnumField("Apple")
    . EnumField("Orange",2)
    . EnumField("Banana")
    . GetType();

```
