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

Because the HiddenNameSpace method was called, the result was no Namespace

You can also create：directly with NEnum

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
