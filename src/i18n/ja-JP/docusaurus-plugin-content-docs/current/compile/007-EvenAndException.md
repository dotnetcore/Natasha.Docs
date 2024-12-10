---
title: 7. Natasha 的异常
---

## 使用方法

Natasha 在编译时出错会抛出异常，异常 Model 如下：

```cs
public sealed class NatashaException : Exception
{

    //格式化后的脚本字符串
    public string Formatter;

    //错误类型
    public NatashaExceptionKind ErrorKind;

    //roslyn诊断集合
    public List<Diagnostic> Diagnostics;

    /// <summary>
    /// 详细的编译信息
    /// </summary>
    public string CompileMessage;

}
```

### 如何监控和获取异常

Natasha 的事件执行流程如下：

1. 添加语法树时：

- 使用 FastAddScriptWithoutCheck，则不会抛出异常。
- 使用 Add 则会进行语法检查，并抛出异常。

2. 编译时：

- 编译后先触发 LogCompilationEvent 事件，用来获取编译后的信息。
- 如果编译成功会继续引发 CompileSucceedEvent 事件。
- 如果编译失败会继续引发 CompileFailedEvent 事件。

3. 编译周期之外：

- 编译过后，可以通过 GetException() 获取异常（可能为空）。
