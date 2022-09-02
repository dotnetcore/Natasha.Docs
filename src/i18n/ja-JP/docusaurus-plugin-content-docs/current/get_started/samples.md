---
title: "ケース"
---

## 前提

この記事には、 [使用必读] 章の基礎が必要です。

## グループを使用します

まず、このライブラリは初心者向けではなく、特定のカプセル化基盤と動的プログラミングスキルを持つ人を必要とします。  
ナタシャは始めるのは簡単ですが、基本と経験がない場合は、どこで使用できるかわからない場合があります。

<br/>

## バージョン通知

DotNetCore.Natasha.CSharp 安定版をご利用ください。

<br/>

## 最初のハローワールド

```cs

var action1 = NDelegate
        // ランダムドメインを使用するか、CreateDomain / UseDomain / DefaultDomain 
        . RandomDomain()
        //[可选API] 必要に応じて ConfigBuilder を使用してコンパイルユニットを構成します (以下、API を示すだけであり、実用的ではありません)
        . ConfigBuilder (builder => builder
            // Natasha パスを使用して出力
            . UseNatashaFileOut()
            //構成コンパイラオプション
            . ConfigCompilerOption(opt => opt
                //構成プラットフォーム
                . SetPlatform(Microsoft.CodeAnalysis.Platform.AnyCpu)
                //Release 方式コンパイル
                . CompileAsRelease()
                // オン null 警告
                . SetNullableCompile(Microsoft.CodeAnalysis.NullableContextOptions.Warnings))
            //設定構文オプション
            . ConfigSyntaxOptions(opt => opt
                //構成でサポートされているスクリプト言語バージョン
                . WithLanguageVersion(Microsoft.CodeAnalysis.CSharp.LanguageVersion.CSharp8))
            //無効セマンティックチェック
            . DisableSemanticCheck()
            // コンパイルが完了した後のアセンブリは、ドメインのプライマリ ドメイン内の同じ名前のアセンブリが
            を読み込む方法と比較します。 CompileWithAssemblyLoadBehavior (LoadBehaviorEnum.None)
            //コンパイル前にプライマリ ドメインで同じ名前の参照が見つかった場合、 
            を読み込む方法. CompileWithReferenceLoadBehavior (LoadBehaviorEnum.UseCustom)
            )
        //[可选API] メソッドが存在するクラス テンプレート
        . ConfigClass(item => item
            // は、クラスに名前を付け
            。 Name ("myClass")
            // ドメイン内の Using レコード
            を使用しません。 NotLoadDomainUsing()
            // デフォルトドメインを使用しない Using キャッシュ
            . NoGlobalUsing()
            )
        // このテンプレートの USING
        を設定します。 ConfigUsing ("System")
        // ここでの API 参照定義のデリゲートには、デリゲートのパラメーター
        // Action<int> / Func<int,int> などのデリゲートが含まれています パラメータがあり、パラメータの名前は Action<int> / Func<int,int> で F12 で定義を表示します。
        . Action("Console.WriteLine(\"Hello World!\"); ");

action1();
action1. DisposeDomain();
```

<br/>

## 2番目のハローワールド

```cs
非同期デリゲート
var action = NDelegate
           . RandomDomain()
           . AsyncFunc<Task>("Console.WriteLine(Thread.CurrentThread.ManagedThreadId);" )();

public static async void Test()
{
    await action();
}
```


<br/>

## 3番目のハローワールド

```cs

var @operator = FastMethodOperator.DefaultDomain();
var actionDelegate = @operator
                . Param(typeof(string), "parameter")
                . Body("Console.WriteLine(parameter);" )
                . Compile();

var action = (Action<string>)actionDelegate;
action("HelloWorld!");
action. DisposeDomain();
```

<br/>

## 4番目のハローワールド

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

## 5番目のハローワールド

```cs
クラステンプレートを自分で組み立てる
NClass nClass = NClass.DefaultDomain();
nClass
  . Namespace("MyNamespace")
  . Public()
  . Name("MyClass")
  . Ctor(ctor => ctor. Public(). Body("MyField=\"Hello\"; "))
  . Property(prop => prop
    . Type(typeof(string))
    . Name("MyProperty")
    . Public()
    . OnlyGetter("return \"World!\"; ")
  );


//add メソッド
MethodBuilder mb = new MethodBuilder();
mb
  . Public()
  . Override()
  . Name("ToString")
  . Body("return MyField+\" \"+MyProperty; ")
  . Return(typeof(string));
nClass.Method(mb);


//add フィールド
nClass.Field(fb => fb. Public()
  . Name("MyField")
  . Type<string>());



//動的に作成されたクラス
var action3 = NDelegate
  . RandomDomain()
  . ConfigUsing(nClass.GetType())
  . Action("Console.WriteLine((new MyClass()). ToString()); ");

action3();
action. DisposeDomain();
```


