---
title: "Get Started"
---

## はじめに

Natasha は、実行時にスクリプト操作を実行したり、型マッピングやリモート呼び出しなどの一般的なシナリオで動的メソッドを作成したりできます。 如果您还没有用过此类的应用可以尝试一些例如 AutoMapper/Dapper/Json.net 之类的名库， 体验一下它们的快捷与方便，如果您继续深入探索便会发现一些 OpCodes 样式的代码,那便是用于动态构建的代码。

.NET 允许在你程序运行时，根据逻辑再次生成另外一些功能，从技术角度来看， 程序运行的周期大致如下，C# 代码，被编译成 IL 代码，被转化成本地指令， 当您的程序开始运行时，IL 代码变开始起了作用，并且 .NET 虚拟机支持你在运行时再次注入 IL 代码， 这有点像插件，在运行时加载到程序中运行。

<br/>

## シーン

Emit とエクスプレッション ツリーの使用シナリオは、Natasha の両方に適用されます。

<br/>

## グループを使用します

まず、このライブラリは初心者向けではなく、特定のカプセル化基盤と動的プログラミングの経験を持つ人を必要とします。  
ナタシャは始めるのは簡単ですが、基本と経験がない場合は、どこで使用できるかわからない場合があります。

<br/>

## インストールします

NetCore プロジェクトでは、Natasha .

- コマンド  
  `Install-Package DotNetCore.Natasha.CSharp -Version xxxx`

- nuget  
  `DotNetCore.Natasha.CSharp`

<br/>

## 使用前に必見です

1. Natasha は 4.2.0.0 から軽量コンパイルをサポートしており、すべての参照を上書きする必要がある場合は、`DotNetCore.Compile.Environment`パッケージを導入してください。
2. Natasha ビルド ファイルの多くでは、プロジェクト ファイルに `<SatelliteResourceLanguages>en</SatelliteResourceLanguages>` を追加して、既定のリソース言語を指定できます。
3. Natasha は、使用前にウォームアップする必要があります: `NatashaManagement/NatashaInitializer.Preheating();` 任意のクラス初期化を選択できます。

<br/>

## 最初のハローワールド

```cs

文字列
string script = "Console.WriteLine""Hello World!");" を準備する必要があります。


// そして、このように
var action = NDomain.Random(). Delegate(script);
action();  

// 後で action を使用しない場合は、
action をアンインストールできます。 DisposeDomain();

```

<br/>

## 2番目のハローワールド

```cs

NDomain1 ドメイン内にデリゲート
var func = NDomain.Create ("NDomain1") を作成します。 Func<string>("return \"Hello World!\"; ");
func();
func. DisposeDomain();

```
