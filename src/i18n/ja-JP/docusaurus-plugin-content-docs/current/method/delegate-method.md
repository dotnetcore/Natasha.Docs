---
title: "Delegate メソッド"
---

FakeMethodOperator に加え、 `DelegateOperator の<T>`が構築されました。

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
action(); 結果は 1 です
```

また、いくつかの方法があります：

```cs
非同期メソッド
DelegateOpeartor<T>. AsyncDelegate
//アンマネージ メソッド
DelegateOpeartor<T>. UnsafeDelegate
//非同期アンマネージ メソッド
DelegateOpeartor<T>. UnsafeAsyncDelegate
```

NamespaceConverter は、Assembly を直接スローしたり、正確なパス タイプを送信したり、String を直接書き込みできます。

```cs
method(script, "System", assembly, tyypeof(Console));
```

可変パラメータなので、複数のパスを渡します

```cs
method(script, "System", "System", "System");
method(script, assembly, assembly, assembly);
method(script, tyypeof(Console), tyypeof(Console), tyypeof(Console));
```
