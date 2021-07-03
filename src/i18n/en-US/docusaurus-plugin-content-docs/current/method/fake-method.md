---
title: "The fake method"
---

## The domain operation

```cs
FakeMethodOperator.Default//System Domain
FakeMethodOperator.Create ("MyDomain")//Create a new stand-alone domain
FakeMethodOperator.Random()/use a random domain

//If the bool type in the method tells the compiler whether to compile into a DLL file, compiled to memory by default.
```

I'm so tired, just write it.

Reflect methodInfo first, so that the：

```cs

FakeMethodOperator.Default
. StaticMethodContent(methodInfo)
. Complie()
```

This way you get a Delegate-type result and spin as you want to run. (Action) result, so.

Or so：

```cs
FakeMethodOperator.Default
. StaticMethodContent(methodInfo)
. Complie<Action>()
```

DelegateOperator is also based on FakeMethodOperator
