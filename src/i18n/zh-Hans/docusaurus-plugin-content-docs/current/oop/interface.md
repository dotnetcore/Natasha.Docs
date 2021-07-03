---
title: "interface"
---

快速创建类：

```cs

//创建一个类并获取类型
var type = new OopOperator()
  .Namespace<string>()
  .Interface()
  .Access(Access.None)
  .Name("TestUt3")
  .Body(@"static void Test();")
  .GetType();

```

或

```cs

//创建一个类并获取类型
var type = new NInterface()
  .Namespace<string>()
  .Access(Access.None)
  .Name("TestUt3")
  .Body(@"static void Test();")
  .GetType();

```
