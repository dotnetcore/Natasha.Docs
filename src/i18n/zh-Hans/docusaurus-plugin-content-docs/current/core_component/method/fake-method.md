---
title: "fake 方法"
---

## 域操作

```cs
FakeMethodOperator.Default             //系统域
FakeMethodOperator.Create("MyDomain")  //创建一个新的独立域
FakeMethodOperator.Random()            //使用一个随机域

//如果方法里传 bool 类型则可以告诉编译器，是否编译成DLL文件，默认是编译到内存。
```

我好累，简单的写吧。

先反射出 MethodInfo, 这样用：

```cs

FakeMethodOperator.Default
.StaticMethodContent(methodInfo)
.Complie()
```

这样你就能得到一个 Delegate 类型的结果，想运行就强转。 （Action）result,这样。

或者这样：

```cs
FakeMethodOperator.Default
.StaticMethodContent(methodInfo)
.Complie<Action>()
```

DelegateOperator 也是基于 FakeMethodOperator
