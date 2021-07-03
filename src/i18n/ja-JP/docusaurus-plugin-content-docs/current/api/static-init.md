---
title: "静的初期化操作"
---

Natasha のすべてのテンプレートは ComplierTemplate から継承され、ComplierTemplate 自体は静的構築メソッドを提供します。したがって、上層 API もサポートされます。

<br/>

## 使用

NDelegate / NAssembly / NClass.. /xxx_Oerator等を以下「Handler」という.

<br/>

#### 静的初期化コード：

```cs

domain ドメインを使用
Handler.UseDomain(domian.compiler => { 编译器配置 })


//コンパイラを使用するドメイン
Handler.UseCompiler(assemblyCSharpCompiler, compiler => { 编译器配置 }));


//"domainJim" ドメインを作成します
Handler.CreateDomain( "domianJim", compiler => { 编译器配置 })


//デフォルトドメインを使用
Handler.DefaultDomain(compiler => { 编译器配置 })


//ランダムドメインの使用
Handler.RandomDomain(compiler => { 编译器配置 })

```

<br/>

#### コンパイラ構成：

```cs
builder =>
{
     builder
       . CustomerUsing() //ユーザ定義のUsingを使用して
       . SetAssemblyName("MyAssemblyName") //アセンブリ名の設定
       . ThrowAndLogCompilerError() // コンパイラの例外をスローして記録する
       . ThrowSyntaxError() //構文ツリー例外をスロー
       . UseStreamCompile();                ストリームを使用して
}
```
