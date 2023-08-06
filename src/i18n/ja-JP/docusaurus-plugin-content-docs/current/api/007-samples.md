---
title: "7.基本的なケース"
---

## 前提条件

この記事には [使用必读] 章の基礎。

## グループを使用します

まず、このライブラリは初心者向けではなく、特定のカプセル化基盤と動的プログラミングスキルを持つ人を必要とします。  
ナタシャは始めるのは簡単ですが、基本と経験がない場合は、どこで使用できるかわからない場合があります。

<br/>

## バージョン通知

DotNetCore.Natasha.CSharp stable を使用してください。

<br/>

## 最初のハローワールド

```cs

var action1 = NDelegate
        ドメインの作成/ドメインの使用/デフォルトドメインを使用することもできます 
        . ランダムドメイン()
        //[可选API] 必要に応じて ConfigBuilder を使用してコンパイル単位を構成します (以下は API を示すためのものであり、実用的な意味はありません)。
        . ConfigBuilder(ビルダー=> ビルダ
            出力にナターシャパスを使用する
            . 使用するナターシャファイルアウト()
            コンパイラ オプションの構成
            . ConfigCompilerOption(opt => 選ぶ
                プラットフォームを構成する
                . SetPlatform(Microsoft.CodeAnalysis.Platform.AnyCpu)
                リリースモードでコンパイルする
                . CompileAsRelease()
                null 許容警告を有効にする
                . SetNullableCompile(Microsoft.CodeAnalysis.NullableContextOptions.Warnings))
            構文オプションの構成
            . ConfigSyntaxOptions(opt => 選ぶ
                サポートされているスクリプト言語のバージョンを構成する
                . WithLanguageVersion(Microsoft.CodeAnalysis.CSharp.LanguageVersion.CSharp8))
            セマンティック チェックを無効にする
            . セマンティックチェックを無効にする()
            コンパイル後に同じ名前のアセンブリをドメイン ホーム ドメイン内の同じ名前のアセンブリと比較する方法
            . CompileWithAssemblyLoadBehavior(LoadBehaviorEnum.None)
            コンパイル前にメインドメインで同じ名前の参照が検出された場合のロード方法 
            . CompileWithReferenceLoadBehavior(LoadBehaviorEnum.UseCustom)
            )
        //[可选API] メソッドが存在するクラス テンプレートを構成する
        . コンフィグクラス(アイテム=> アイテム
            即時名ではなくクラス名を構成する
            . 名前("マイクラス")
            ドメイン内のレコードの使用は使用されません
            . NotLoadDomainUsing()
            既定のドメインの使用キャッシュは使用されません。
            . NoGlobalUsing()
            )
        このテンプレートの使用を構成する
        . ConfigUsing("System")
        ここでの API は、デリゲートのパラメーターを含む、定義されたデリゲートを参照します。
        たとえば、アクション<int> / ファンク<int,int> パラメータがあり、パラメータの名前はアクションにあります<int> / ファンク<int,int> F12 では定義を参照してください。
        . Action("Console.WriteLine(\"Hello World!\"); ");

アクション1();
アクション1。 DisposeDomain();
```

<br/>

## 2番目のハローワールド

```cs
非同期デリゲート
var アクション = NDelegate
           . ランダムドメイン()
           . 非同期機能<Task>("Console.WriteLine(Thread.CurrentThread.ManagedThreadId);" )();

パブリック静的非同期 void Test()
{
    アクション();
}
```


<br/>

## 3番目のハローワールド

```cs

var @operator = FastMethodOperator.DefaultDomain();
var アクションデリゲート = @operator
                . Param(typeof(string), "parameter")
                . Body("Console.WriteLine(parameter);" )
                . コンパイル();

var アクション = (アクション<string>)アクションデリゲート;
アクション("ハローワールド!");
アクション。 DisposeDomain();
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
クラス テンプレートを自分で組み立てる
NClass nClass = NClass.DefaultDomain();
nクラス
  . 名前空間("MyNamespace")
  . パブリック()
  . 名前("マイクラス")
  . Ctor(ctor => クター。 パブリック()。 Body("MyField=\"Hello\"; "))
  . プロパティ(prop => 支柱
    . 型(型(文字列))
    . 名前("マイプロパティ")
    . パブリック()
    . OnlyGetter("return \"World!\"; ")
  );


メソッドを追加する
MethodBuilder mb = new MethodBuilder();
メガバイト
  . パブリック()
  . オーバーライド()
  . 名前("文字列変換先")
  . Body("return MyField+\" \"+MyProperty; ")
  . 戻り値(型(文字列));
nClass.Method(mb);


フィールドの追加
nClass.Field(fb => FB。 パブリック()
  . 名前("マイフィールド")
  . 種類<string>());



動的に作成されたクラスを動的に呼び出す
var action3 = NDelegate
  . ランダムドメイン()
  . ConfigUsing(nClass.GetType())
  . Action("Console.WriteLine((new MyClass()). ToString()); ");

アクション3();
アクション。 DisposeDomain();
```


