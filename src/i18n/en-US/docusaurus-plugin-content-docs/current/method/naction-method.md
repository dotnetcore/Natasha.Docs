---
title: "The naction method"
---

NAction static methods that dynamically build delegates for the Action series.

```cs
var action = NAction.Delegate("Console.WriteLine(11);" );
var action1 = NAction<int>. Delegate("Console.WriteLine(arg);" );
var action2 = NAction<int,string>. Delegate("Console.WriteLine(arg1); Console.WriteLine(arg2); ");
.....
```

 <br/>

NAction's second argument is the namespace, which can be thrown directly at an Assembly, or an accurate pass type, or written directly to String.

```cs

method(script, "System", assembly, tyypeof(Console));

```

 <br/>

Because it is a variable parameter, you can pass multiple

```cs

method(script, "System", "System", "System");
method(script, assembly, assembly, assembly);
method(script, tyypeof(Console), tyypeof(Console), tyypeof(Console));

```
