---
title: "Logging"
---

#### Open logs：

```cs
NSucceedLog.Enabled = true;
NErrorLog.Enabled = true;
NWarningLog.Enabled = true;


AssemblyCSharpBuilder builder = new ..... builder.LogCompileError().LogSyntaxError()..... NDelegate/NClass/NInterface/.... .[StaticInitMethod](

  builder=>builder.LogCompileError().LogSyntaxError()

)....

```

#### Close logs：

```cs
NSucceedLog.Enabled = false;
NErrorLog.Enabled = false;
NWarningLog.Enabled = false
```

#### Compiler turns on log switch：

```cs
AssemblyBuilder：
Compiler.ErrorBehavior - ExceptionBehavior.Log;
Syntax.ErrorBehavior = ExceptionBehavior.Log;
```
