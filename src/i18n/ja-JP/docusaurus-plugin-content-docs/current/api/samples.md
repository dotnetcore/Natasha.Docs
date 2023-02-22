---
title: "7. 基礎となる事例"
---

## 前提

この記事は持っている必要があります [使用必读] 章の基礎。

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
        ランダムドメインを使用するか、CreateDomain / UseDomain / DefaultDomain を使用することもできます 
        . RandomDomain()
        //[可选API] 必要に応じて ConfigBuilder を使用してコンパイルユニットを構成します (以下は API のみを示しており、実用的ではありません)。
        . ConfigBuilder(builder => builder
            出力には Natasha パスを使用します
            . UseNatashaFileOut()
            コンパイラ オプションを構成します
            . ConfigCompilerOption(opt => opt
                プラットフォームを構成します
                . SetPlatform(Microsoft.CodeAnalysis.Platform.AnyCpu)
                Release 方式でコンパイルします
                . CompileAsRelease()
                空の警告をオンにします
                . SetNullableCompile(Microsoft.CodeAnalysis.NullableContextOptions.Warnings))
            構文オプションを構成します
            . ConfigSyntaxOptions(opt => opt
                サポートされているスクリプト言語のバージョンを構成します
                . WithLanguageVersion(Microsoft.CodeAnalysis.CSharp.LanguageVersion.CSharp8))
            セマンティック チェックを無効にします
            . DisableSemanticCheck()
            コンパイルが完了した後のアセンブリは、ドメインのプライマリ ドメイン内の同じ名前のアセンブリの読み込み方法と比較されます
            . CompileWithAssemblyLoadBehavior(LoadBehaviorEnum.None)
            コンパイル前にプライマリ ドメインで同じ名前の参照が見つかった場合の読み込み方法 
            . CompileWithReferenceLoadBehavior(LoadBehaviorEnum.UseCustom)
            )
        //[可选API] メソッドが存在するクラス テンプレートを構成します
        . ConfigClass(item => item
            クラスに名前を設定します
            . Name("myClass")
            ドメイン内の Using レコードは使用されません
            . NotLoadDomainUsing()
            既定のドメインの Using キャッシュは使用されません
            . NoGlobalUsing()
            )
        このテンプレートの USING を構成します
        . ConfigUsing("System")
        ここでの API は、デリゲートのパラメーターを含む、定義されたデリゲートを参照します
        例如 Action<int> / Func<int,int> 引数を指定し、引数の名前を Action に指定します<int> / Func<int,int> 定義を見るには、F12 を参照してください。
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
クラス テンプレートを自分でアセンブルします
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


メソッドを追加します
MethodBuilder mb = new MethodBuilder();
mb
  . Public()
  . Override()
  . Name("ToString")
  . Body("return MyField+\" \"+MyProperty; ")
  . Return(typeof(string));
nClass.Method(mb);


フィールドを追加します
nClass.Field(fb => fb. Public()
  . Name("MyField")
  . Type<string>());



動的に作成されたクラスを動的に呼び出します
var action3 = NDelegate
  . RandomDomain()
  . ConfigUsing(nClass.GetType())
  . Action("Console.WriteLine((new MyClass()). ToString()); ");

action3();
action. DisposeDomain();
```


