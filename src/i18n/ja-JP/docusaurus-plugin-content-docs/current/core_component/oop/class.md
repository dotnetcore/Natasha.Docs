---
title: "class"
---

クラスをすばやく作成する：

```cs

クラスを作成し、型
var type = new OopOperator() を
  。 Namespace<string>()
  . Access("")
  . Name("TestUt3")
  . Class()
  . Ctor(item => item
    . Modifier(Modifiers.Static)
    . Param<string>("name")
    . Body("this. Name=name; "))
  . Body(@"public static void Test(){}")
  . PublicStaticField<string>("Name")
  . PrivateStaticField<int>("_age")
  . GetType();


```

または

```cs

クラスを作成し、型
var type = new NClass() を取得
  。 Namespace<string>()
  . Access("")
  . Name("TestUt3")
  . Ctor(item => item
    . Modifier(Modifiers.Static)
    . Param<string>("name")
    . Body("this. Name=name; "))
  . Body(@"public static void Test(){}")
  . PublicStaticField<string>("Name")
  . PrivateStaticField<int>("_age")
  . GetType();

```
