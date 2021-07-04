---
title: "interface"
---

Quickly create classes：

```cs

Create a class and get the type
var type s new OopOperator()
  . Namespace<string>()
  . Interface()
  . Access(Access.None)
  . Name("TestUt3")
  . Body(@"static void Test(); ")
  . GetType();

```

or

```cs

Create a class and get the type
var type s new NInterface()
  . Namespace<string>()
  . Access(Access.None)
  . Name("TestUt3")
  . Body(@"static void Test(); ")
  . GetType();

```
