---
title: "Logging"
---

#### ログを開く：

```cs
NSucceedLog.Enabled = true;
NErrorLog.Enabled = true;
NWarningLog.Enabled = true;


AssemblyCSharpBuilder builder = new ..... builder.LogCompileError().LogSyntaxError()..... NDelegate/NClass/NInterface/.... .[StaticInitMethod](

  builder=>builder.LogCompileError().LogSyntaxError()

)....

```

#### ログを閉じる：

```cs
NSucceedLog.Enabled = false;
NErrorLog.Enabled = false;
NWarningLog.Enabled = false
```

#### コンパイラはログ スイッチをオンにします：

```cs
AssemblyBuilder で：
Compiler.ErrorBehavior = ExceptionBehavior.Log;
Syntax.ErrorBehavior = ExceptionBehavior.Log;
```
