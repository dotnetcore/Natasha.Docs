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

まず、このライブラリは初心者向けではなく、特定のカプセル化基盤と動的プログラミングスキルを持つ人を必要とします。  
ナタシャは始めるのは簡単ですが、基本と経験がない場合は、どこで使用できるかわからない場合があります。

<br/>

## インストールします

NetCore プロジェクトでは、Natasha .

- コマンド  
  `Install-Package DotNetCore.Natasha -Version xxxx を選択`

- nuget  
  `DotNetCore.Natasha`

<br/>

## 準備をする

プロジェクト ファイルに、必要なラベルを参照するラベルをいくつか追加する必要があります：

```cs

  <PropertyGroup>

    <OutputType>Exe</OutputType>
    <TargetFramework>netcoreapp2.2</TargetFramework>

    //コンソール/デスクトップは次のとおりです
    <PreserveCompilationContext>true</PreserveCompilationContext>

    //古い WEB は
    <MvcRazorExcludeRefAssembliesFromPublish>false</MvcRazorExcludeRefAssembliesFromPublish>

    //3.1 新しいバージョンの WEB を追加する必要があります
    <PreserveCompilationReferences>true</PreserveCompilationReferences>
    //3.1 上記のノードを追加しない場合、Razor のコンパイル サービスを参照できます
    Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation

    //ローカライズされたフォルダに関するリリース フォルダが多すぎると思う場合は、次のノード
    //オプション：cs / de / es / fr / it / ja / ko / pl / ru / tr / zh-Hans / zh-Hant
    <SatelliteResourceLanguages>en</SatelliteResourceLanguages>

  </PropertyGroup>

```

<br/>

## 最初のハローワールド

```cs

文字列を準備する必要があります
string script = "Console.WriteLine("Hello World!");";


// を使用して、
var action = NDomain.Random() を使用します。 Delegate(script);
action();
action. DisposeDomain();

```

<br/>

## 2番目のハローワールド

```cs

NDomain1 ドメイン内にデリゲートを作成します
var func = NDomain.Create ("NDomain1")。 Func<string>("return \"Hello World!\"; ");
func();
func. DisposeDomain();

```
