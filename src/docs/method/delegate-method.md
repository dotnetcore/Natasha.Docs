---
title: "Delegate 方法"
---

再 FakeMethodOperator 基础上，构建了 `DelegateOperator<T>`操作类。

```cs

  Delegate(
    string content,
    params NamespaceConverter[] usings
  )

  Delegate(
    string content,
    AssemblyDomain domain = default,
    bool inCache = false,
    bool complieInFile = false,
    params NamespaceConverter[] usings
  )

```

```cs
var action = DelegateOpeartor<Func<string>>.Delegate("return \"1\";");
action(); //结果是1
```

同时还有几个方法：

```cs
//异步方法
DelegateOpeartor<T>.AsyncDelegate
//非托管方法
DelegateOpeartor<T>.UnsafeDelegate
//异步非托管方法
DelegateOpeartor<T>.UnsafeAsyncDelegate
```

NamespaceConverter，可以直接扔一个 Assembly,或者精确的传 Type,或者直接写 String.

```cs
method(script, "System", assembly, tyypeof(Console));
```

由于是可变参数，所以你可以传多种多个

```cs
method(script, "System", "System", "System");
method(script, assembly, assembly, assembly);
method(script, tyypeof(Console), tyypeof(Console), tyypeof(Console));
```
