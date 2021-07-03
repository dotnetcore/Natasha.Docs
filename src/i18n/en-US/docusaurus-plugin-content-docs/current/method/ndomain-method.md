---
title: "The ndomain method"
---

NDomain's static approach allows you to dynamically build delegates for the Func/Action series.

```cs
Create a delegate in a random domain
var func1 s NDomain.Random(). Func<int>("return 111;" );
// Create a domain called Jim, and create a delegate within the domain
var func2 - NDomain.Create ("Jim"). Func<int,string>("return arg. ToString(); ");
// Create a delegate directly in the system domain
var func3 s NDomain.Default.Func<int,int,string>("return" (arg1-arg2). ToString(); ");
.....
```

 <br/>

The second argument of Func / AsyncFunc / Unsafe Funnc / AsyncUnsafeFunc is the namespace, which can be thrown directly at a Assembly, or an exact pass type, or written directly to String . precision parameters can help Natasha solve the problem of ambiguous reference namespaces

```cs

method(script, "System", assembly, tyypeof(Console));

e.g.：
NDomain.Default.Func<int,int,string>("return" (arg1-arg2). ToString(); ","System","System.IO");
```

 <br/>

Because it is a variable parameter, you can pass multiple

```cs

method(script, "System", "System", "System");
method(script, assembly, assembly, assembly);
method(script, tyypeof(Console), tyypeof(Console), tyypeof(Console));

```
