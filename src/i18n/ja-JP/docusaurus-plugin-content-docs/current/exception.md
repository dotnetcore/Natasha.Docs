---
title: "例外キャッチ"
---

#### 例外構造：

```cs
public class CompilationException
 {

        public CompilationException()
        {

            Diagnostics = new List<Diagnostic>();
            ErrorFlag = ComplieError.None;

        }


        //コンパイルログ
        public string Log;

        //エラー情報
        public string Message;

        //format のスクリプト文字列
        public string Formatter;

        //エラーの種類
        public ComplieError ErrorFlag;

        //roslyn 診断コレクション
        public List<Diagnostic> Diagnostics;

}
```

```cs
コンパイル プロセス全体で例外が関与するプロセスには、：
// 構文ツリーを追加すると例外
//AssemblyBuilde builder;
var exception = builder. Syntax.Add();


//コンパイル後の Exceptions フィールドに例外があります
//AssemblyBuilde builder;
var exception = builder. Exceptions;


//異常な動作を設定することで、異常の発生動作を制御
builder. Syntax.ErrorBehavior = ExceptionBehavior.Log | ExceptionBehavior.Throw;
builder.Compiler.ErrorBehavior = ExceptionBehavior.Throw;
```

例：

```cs
NClass @class = NClass.Random();
@class. Syntax.ErrorBehavior = xxx;
```
