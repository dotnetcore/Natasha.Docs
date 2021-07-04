---
title: "class"
---

Quickly create classes：

```cs

Create a class and get the type
var type s new OopOperator()
  . Namespace<string>()
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

or

```cs

Create a class and get the type
var type s new NClass()
  . Namespace<string>()
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
