---
title: "Dynamic method"
---

Dynamic method is one of the most commonly used dynamic programming methods, and the resulting delegates are cached for subsequent use. Natasha provides an extremely convenient way to build operational classes, using native C# code to build runtime dynamic methods that greatly improve developers' dynamic programming efficiency. Convenient maintenance work for later people.

<br/>

## principle

Most method construction operation classes are based on a goal：

```cs

using xxx;
public static class xxx
{
    public static xx NatashaDynamicMethod(xxx)
    {
       xxxxxxxxx
    }
}

```

Natasha reflects metadata and generates delegates back to the user.

<br/>

## The operation class encapsulation

Natasha encapsulates the method operation class from three encapsulation depths.

- The first layer：the operator's original operation class, the most flexible.
- The second layer：the packaging method of NewMethod Operator, building a dynamic approach in a static and delegated manner.
- Layer 3：the packaging method of NFunc/NAction Operator to simulate the Func/Action class in a static way to build a dynamic approach.
