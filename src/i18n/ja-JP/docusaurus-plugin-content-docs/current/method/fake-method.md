---
title: "fake メソッド"
---

## ドメイン操作

```cs
FakeMethodOperator.Default //システムドメイン
FakeMethodOperator.Create("MyDomain") //新しいスタンドアロンドメインを作成する
FakeMethodOperator.Random() //ランダムドメインを使用する

//メソッドに bool 型を渡す場合は、DLL ファイルにコンパイルするかどうかをコンパイラに指示できます。
```

私はとても疲れている、簡単に書いてください。

MethodInfo を最初に反映し、：

```cs

FakeMethodOperator.Default
. StaticMethodContent(methodInfo)
. Complie()
```

これにより、Delegate 型の結果が得られます。 (Action)result。これは.

または、それは：

```cs
FakeMethodOperator.Default
. StaticMethodContent(methodInfo)
. Complie<Action>()
```

DelegateOperator は FakeMethodOperator にも基づいている
