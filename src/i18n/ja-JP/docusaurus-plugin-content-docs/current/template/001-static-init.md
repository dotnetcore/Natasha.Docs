---
title: 1. テンプレートの初期化操作
---

## 该文档已停更，若需要请提 ISSUE

Natasha のすべてのテンプレートは ComplierTemplate を継承しています。ComplierTemplate は静的な構築メソッドを提供します。そのため、上位の API もサポートされます。

<br/>

## 使用する

NDelegate / NAssembly / NClass.. / xxx_Oerator などはここでは「Handler」と呼ばれます。

<br/>

#### 静的な初期化コード：

```cs

// domain ドメインを使用
Handler.UseDomain(domian, compiler => { コンパイラの設定 });


// 特定のコンパイラのドメインを使用
Handler.UseCompiler(assemblyCSharpCompiler, compiler => { コンパイラの設定 });


// "domainJim" というドメインを作成
Handler.CreateDomain("domianJim", compiler => { コンパイラの設定 });


// デフォルトのドメインを使用
Handler.DefaultDomain(compiler => { コンパイラの設定 });


// ランダムなドメインを使用
Handler.RandomDomain(compiler => { コンパイラの設定 });

```

<br/>
