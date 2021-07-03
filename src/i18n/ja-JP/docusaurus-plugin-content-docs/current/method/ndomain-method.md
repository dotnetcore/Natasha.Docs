---
title: "ndomain メソッド"
---

Func/Action ファミリのデリゲートを動的に構築できる NDomain の静的メソッド。

```cs
ランダムドメインにデリゲートを作成します
var func1 = NDomain.Random() Func<int>("return 111;" );
// Jim という名前のドメインを作成し、ドメイン内にデリゲートを作成します
var func2 = NDomain.Create("Jim")。. Func<int,string>("return arg. ToString(); ");
//システム ドメインに直接デリゲートを作成します
var func3 = NDomain.Default.Func<int,int,string>("return (arg1+arg2))。 ToString(); ");
.....
```

 <br/>

Func / AsyncFunc / UnsafeFunc / AsyncUnsafeFunc の 2 番目の引数は名前空間で、Assembly を直接スローしたり、正確な Type を渡したり、String を直接書き込みできます。 正確なパスは、Natasha が名前空間の二義参照の問題を解決するのに役立ちます

```cs

method(script, "System", assembly, tyypeof(Console));

例：
NDomain.Default.Func<int,int,string>("return (arg1+arg2)) です。 ToString(); ","System","System.IO");
```

 <br/>

可変パラメータなので、複数のパスを渡します

```cs

method(script, "System", "System", "System");
method(script, assembly, assembly, assembly);
method(script, tyypeof(Console), tyypeof(Console), tyypeof(Console));

```
