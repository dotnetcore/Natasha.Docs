---
title: "Delegate method"
---

Based on FakeMethodOperator, a `DelegateOperator<T>`operation class is built.

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
var action = DelegateOpeartor<Func<string>>. Delegate("return \"1\"; ");
action(); The result is 1
```

There are several ways to：

```cs
Asynchronous method
DelegateOpeartor<T>. AsyncDelegate
//Unmanaged Methods
DelegateOpeartor<T>. UnsafeDelegate
//asynchronous unmanaged methods
DelegateOpeartor<T>. UnsafeAsyncDelegate
```

NamespaceConverter can throw a Assembly directly, or an accurate pass type, or write String.

```cs
method(script, "System", assembly, tyypeof(Console));
```

Because it is a variable parameter, you can pass multiple

```cs
method(script, "System", "System", "System");
method(script, assembly, assembly, assembly);
method(script, tyypeof(Console), tyypeof(Console), tyypeof(Console));
```
