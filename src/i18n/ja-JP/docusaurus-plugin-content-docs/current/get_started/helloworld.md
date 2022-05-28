---
title: "Hello world"
---

## はじめに

Natasha は、実行時にスクリプト操作を実行したり、型マッピングやリモート呼び出しなどの一般的なシナリオで動的メソッドを作成したりできます。 如果您还没有用过此类的应用可以尝试一些例如 AutoMapper/Dapper/Json.net 之类的名库， 体验一下它们的快捷与方便，如果您继续深入探索便会发现一些 OpCodes 样式的代码,那便是用于动态构建的代码。

.NET を使用すると、プログラムの実行中にロジックに基づいて他の機能を再度生成でき、技術的な観点からは、 プログラムの実行サイクルは、次のように実行され、C# コードは IL コードにコンパイルされ、コストで変換され、 プログラムの実行を開始すると IL コードが機能し始め、.NET 仮想マシンは実行時に IL コードを再度挿入できます これはプラグインのようなもので、実行時にプログラムにロードされます。

<br/>

## シーン

Emit とエクスプレッション ツリーの使用シナリオは、Natasha の両方に適用されます。

<br/>

## グループを使用します

まず、このライブラリは初心者向けではなく、特定のカプセル化基盤と動的プログラミングスキルを持つ人を必要とします。  
ナタシャは始めるのは簡単ですが、基本と経験がない場合は、どこで使用できるかわからない場合があります。

<br/>

## バージョン通知

DotNetCore.Natasha.CSharp 統合安定版をご利用ください。

<br/>

## 最初のハローワールド

```cs

Natasha を使用した CSharp コンパイラは、文字列
AssemblyCSharpBuilder sharpBuilder = new AssemblyCSharpBuilder();

// コンパイラにランダムドメインを割り当て
sharpBuilder.Compiler.Domain = DomainManagement.Random();

//ファイルコンパイルモードを使用
sharpBuilder.UseNatashaFileOut("c:/output");;

// コードのコンパイルが間違っている場合は、ログをスローしてログを記録します。
sharpBuilder.CompileFailedEvent += (compilation, errors) =>
{
    var errorLog = compilation. GetNatashaLog();
};


// 文字列を追加
sharpBuilder.Add("using System; public static class Test{ public static void Show(){ Console.WriteLine(\"Hello World!\"); }}");
// コンパイルアセンブリ
var assembly = sharpBuilder.GetAssembly();


// 型
var type = sharpBuilder.GetTypeFromShortName ("Test") を直接取得したい場合)
//または
type = sharpBuilder.GetTypeFromFullName("xxNamespace.xxClassName"););


// Action デリゲート
// は同じドメイン内にある必要があるため、指定されたドメイン
//書き込み呼び出しスクリプトを作成し、直前のアセンブリをスローして、using 参照
var action = NDelegate.UseDomain (sharpBuilder.Compiler.Domain) を自動的に追加します。 Action("Test.Show();" , assembly);

//実行し、Hello Worldを参照してください!
action();

```

<br/>

## 2番目のハローワールド

```cs

MyDomain ドメイン内にデリゲートを作成します
var func = NDelegate.CreateDomain("MyDomain")。 Func<string>("return \"Hello World!\"; ");
Console.WriteLine(func());
func. DisposeDomain();

```

<br/>

## 3番目のハローワールド

```cs

ランダムドメイン内にカスタムUsingのデリゲートを作成し、結果をDLL
//に続くUsingパラメータに書き込み、Assembly/Assembly[]/Type/Type[]/string/string[]
//例でtypeof(string)を渡します。 パラメータは可変パラメータであり、無限に追加できます

var func = NDelegate.RandomDomain(
builder=>builder
  . CustomUsing()
  . UseFileCompile()
  ). Func<string>("return \"Hello World!\"; ", typeof(string));
Console.WriteLine(func());
func.

```

```cs
非同期デリゲート
public static async void Test()
{
    await NDelegate
           . RandomDomain()
           . AsyncFunc<Task>("Console.WriteLine(Thread.CurrentThread.ManagedThreadId);" )();
}
```

<br/>

## 4番目のハローワールド

```cs

var @operator = FastMethodOperator.DefaultDomain();
var actionDelegate = @operator
                . Param(typeof(string), "parameter")
                . Body("Console.WriteLine(parameter);" )
                . Compile();

//実行
actionDelegate.DynamicInvoke("HelloWorld!");
actionDelegate.DisposeDomain();

// またはこの
var action = (Action<string>) actionDelegate;
action("HelloWorld!");
action.
```

<br/>

## 5番目のハローワールド

```cs
クラスを
NClass nClass = NClass.DefaultDomain();
nClass
  . Namespace("MyNamespace")
  . Name("MyClass")
  . Ctor(ctor=>ctor. Public(). Body("MyField=\"Hello\"; "))
  . Property(prop => prop
    . Type(typeof(string))
    . Name("MyProperty")
    . Public()
    OnlyGetter("return \"World!\"; ")
  );


//追加メソッド (3.4.00 より前のバージョンでは、上記のプロパティの API を参照)
MethodBuilder mb = new MethodBuilder();
mb
  . Override()
  . Name("ToString")
  . Body("return MyField+\" \"+MyProperty; ")
  . Return(typeof(string));
 nClass.Method(mb);


//フィールドの追加 (3.4.00 より前のバージョンでは、上記のプロパティの API を参照)
FieldBuilder fb = nClass.GetFieldBuilder();
fb. Name("MyField")
  . Type<string>();


//動的呼び出しによって動的に
クラスは var action = NDelegate
  . RandomDomain()
  . Action("Console.WriteLine((new MyClass()). ToString()); ", nClass.GetType());

action();
action.
```

## 6番目のハローワールド

```cs

var hwFunc = FastMethodOperator
                . RandomDomain()
                . Param(typeof(string), "str1")
                . Param<string>("str2")
                . Body("return str1+str2;" )
                . Return<string>()
                . Compile<Func<string, string, string>>();
Console.WriteLine(hwFunc("Hello"," World!"));

```
