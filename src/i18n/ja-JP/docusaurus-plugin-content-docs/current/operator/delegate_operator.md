---
title: "デリゲート アクション クラス DelegateOperator"
---

このクラスは、FakeMethodOperator が自動的に構築するデリゲート情報をカプセル化し、次のメソッドを提供します：

- Delegate オリジナル デリゲート
- AsyncDelegate 非同期デリゲート
- UnsafeDelegate 非セキュリティ デリゲート
- UnsafeAsyncDelegate 非セキュア非同期デリゲート

上記のメソッドの引数は：

string content, デリゲート文字列コンテンツ  
DomainBase domain = default, 現在存在するドメイン  
`Action<AssemblyCSharpBuilder> option = default`コンパイラの構成  
params NamespaceConverter[] usings によってカスタマイズされた名前空間参照

使用例：

```cs

  public delegate void ValueDelegate(CallModel model, in DateTime value);
  DelegateOperator<ValueDelegate>. Delegate("model. CreateTime=value; ");
```
