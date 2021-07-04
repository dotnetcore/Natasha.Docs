---
title: "Exception catch"
---

#### Abnormal structure：

```cs
public class CompilationException
 {

        public CompilationException()
        {

            Diagnostics = new List<Diagnostic>();
            ErrorFlag = ComplieError.None;

        s


        //compile logs
        public string Log;

        //error message
        public string Message;

        //formatted script string
        public string Formatter;

        //Error Type
        publicLyReperoror ErrorFlag;

        //roslyn Diagnostic Collection
        public List<Diagnostic> Diagnostics;

}
```

```cs
The process involving exceptions throughout the compilation process includes：
//Adding a syntax tree returns exceptions
//AssemblyBuilde builder;;
var exception = builder. Syntax.Add();


//Compiled ExceptionS Field Will Have ExceptionS
//AssemblyBuilde Builder;
var exception = builder. Exceptions;


// You can control the occurrence of abnormal actions by setting abnormal behavior
builder. Syntax.ErrorBehavior = ExceptionBehavior.Log | ExceptionBehavior.Throw;
builder.Compiler.ErrorBehavior = ExceptionBehavior.Throw;
```

For example,：

```cs
NClass @class = NClass.Random();
@class. Syntax.ErrorBehavior = xxx;
```
