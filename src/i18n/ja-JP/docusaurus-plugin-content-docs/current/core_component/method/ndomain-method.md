---
title: "ndomain 方法"
---

NDomain 的静态方法，可以动态构建出 Func / Action 系列的委托。

```cs
ランダムドメインにデリゲートを作成します
var func1 = NDomain.Random() Func<int>("return 111;" );
// Jim という名前のドメインを作成し、ドメイン内にデリゲートを作成します
var func2 = NDomain.Create("Jim")。 . Func<int,string>("return arg. ToString(); ");
//システム ドメインに直接デリゲートを作成します
var func3 = NDomain.Default.Func<int,int,string>("return (arg1+arg2))。
```

 <br/>

Func / AsyncFunc / UnsafeFunc / AsyncUnsafeFunc の 2 番目の引数は名前空間で、Assembly を直接スローしたり、正確な Type を渡したり、String を直接書き込みできます。 正確なパスは、Natasha が名前空間の二義参照の問題を解決するのに役立ちます

```cs

method(script, "System", assembly, tyypeof(Console));

例如：
NDomain.Default.Func<int,int,string>("return (arg1+arg2).ToString();","System","System.IO");
```

 <br/>

由于是可变参数，所以你可以传多种多个

```cs

method(script, "System", "System", "System");
method(script, assembly, assembly, assembly);
method(script, tyypeof(Console), tyypeof(Console), tyypeof(Console));

```
