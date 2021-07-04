---
title: "Delegate Operations Class DelegateOperator"
---

This class encapsulates the delegate information that FakeMethodOperator will automatically build in and provides the following methods：

- Delegate original delegate
- AsyncDelegate asynchronous delegate
- UnsafeDelegate is a non-secure delegate
- UnsafeAsyncDelegate is a non-secure asynchronous delegate

The parameters of the above methods are all：

string content, delegate string content  
DomainBase domain , current domain  
`Action<AssemblyCSharpBuilder> option , default`, configuration of the compiler  
params NamespaceConverter , a custom namespace reference

Use case：

```cs

  public delegate void ValueDelegate(CallModel model, in DateTime value);
  DelegateOperator<ValueDelegate>. Delegate("model. CreateTime=value; ");
```
