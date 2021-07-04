---
title: "naction メソッド"
---

Action ファミリのデリゲートを動的に構築できる NAction 静的メソッド。

```cs
var action = NAction.Delegate("Console.WriteLine(11);" );
var action1 = NAction<int>. Delegate("Console.WriteLine(arg);" );
var action2 = NAction<int,string>. Delegate("Console.WriteLine(arg1); Console.WriteLine(arg2); ");
.....
```

 <br/>

NAction の 2 番目の引数は名前空間で、Assembly を直接スローしたり、Type を正確に渡したり、String を直接書き込みできます。

```cs

method(script, "System", assembly, tyypeof(Console));

```

 <br/>

可変パラメータなので、複数のパスを渡します

```cs

method(script, "System", "System", "System");
method(script, assembly, assembly, assembly);
method(script, tyypeof(Console), tyypeof(Console), tyypeof(Console));

```
