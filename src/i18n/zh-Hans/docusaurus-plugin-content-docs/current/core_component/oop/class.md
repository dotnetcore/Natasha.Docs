---
title: "class"
---

快速创建类：

```cs

//创建一个类并获取类型
var type = new OopOperator()
  .Namespace<string>()
  .Access("")
  .Name("TestUt3")
  .Class()
  .Ctor(item => item
    .Modifier(Modifiers.Static)
    .Param<string>("name")
    .Body("this.Name=name;"))
  .Body(@"public static void Test(){}")
  .PublicStaticField<string>("Name")
  .PrivateStaticField<int>("_age")
  .GetType();


```

或

```cs

//创建一个类并获取类型
var type = new NClass()
  .Namespace<string>()
  .Access("")
  .Name("TestUt3")
  .Ctor(item => item
    .Modifier(Modifiers.Static)
    .Param<string>("name")
    .Body("this.Name=name;"))
  .Body(@"public static void Test(){}")
  .PublicStaticField<string>("Name")
  .PrivateStaticField<int>("_age")
  .GetType();

```
