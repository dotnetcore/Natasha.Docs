---
title: "5. その他のAPI利用状況の表示"
---


- **徴兵する**

ナゲット `DotNetCore.Natasha.CSharp` 予熱：
```C#
ナターシャイニシャライザー.プレヒート();
```


- **ンドメイン**

```cs 
サポート解除：

通常の方法：      機能/アクション
非同期メソッド：      非同期機能/アクション
安全でない方法：    安全でない機能/アクション
セキュリティで保護されていない非同期メソッド： 安全でない非同期関数/アクション

var func = NDelegate
  ドメインを作成する
  . CreateDomain("NDomain2")    
  ドメインに関数を作成する<string,int> メソッド、パラメーター、およびシステム定義の関数<T1,T> パラメーター名は同じです。
  . ファンク<string,int>("引数を返します。 長さ; "); 

Assert.Equal(3, func("abc"));
降ろす
DomainManagement.Remove("NDomain2");
```

又は

```cs
又は
var func = NDelegate
    ランダムフィールドを使用する
    . ランダムドメイン()
    最初のパラメーターは、インスタンスを呼び出すために無視されます。
    . WithFirstArgInvisible()
    ドメインに関数を作成する<string,int> メソッド、パラメーター、およびシステム定義の関数<T1,T> パラメーター名は同じです。
    . ファンク<string,int>("戻り値の長さ;" ); 

Assert.Equal(3, func("abc"));
降ろす
ファンク。 DisposeDomain();
```

```cs
NormalTestModel model = new NormalTestModel();
var func = NDelegate
  . CreateDomain("NDomain6")
  . アクション<NormalTestModel, int, int>("arg1. 年齢= arg2 + arg3; ");
関数(モデル、1,2);
Assert.Equal(3, model. 年齢);
```

ケース2：
```cs
var アクション = NDelegate
  . デフォルトドメイン()
  . UnsafeAsyncFunc<string, string, Task<string>>(@"
      文字列の結果 = arg1 +"" ""+ arg2;
      待機タスク.遅延(1000);
      Console.WriteLine(result);
      結果を返します。 ");

文字列結果 = アクションを待つ("こんにちは", "World1!");
結果 = "こんにちは世界1!"
```

<br/>

<br/>

#### FastMethodOperator

  <br/>

- 通常のカスタマイズ

> メソッドをすばやくカスタマイズする

```cs
var action = FastMethodOperator.DefaultDomain()
             . パラメータ<string>("str1")
             . Param(typeof(string),"str2")
             . Body("return str1+str2;" )
             . 帰る<string>()
             . 準拠<Func<string,string,string>>();

var result = action("Hello ","World!");    結果:「こんにちは世界!」
```

<br/>


```cs
var delegateAction = FastMethodOperator.Random()

       . 非同期()
       パラメータとリターンを指定しない場合、デフォルトでFuncが使用されます<string,string,Task<string>> システム定義のパラメーター名、F12 が表示されます
       . ボディ(@"
               タスク.遅延(100)を待ちます。
               文字列の結果 = arg1 +"" ""+ arg2;
               Console.WriteLine(result);
               結果を返します。 ")

       . 準拠<Func<string, string, Task<string>>>();

文字列結果=デリゲートアクションを待ちますか? Invoke("Hello", "World2!");   結果: "こんにちはワールド2!"
```

<br/>
<br/>

#### デリゲートオペレーター

> 代理人を迅速かつ迅速に実装する

```cs

代理人を定義する
パブリック デリゲート文字列 GetterDelegate(int 値);

方法1
var action = NDelegate.RandomDomain(). 代表<GetterDelegate>("値 += 101; 戻り値。 ToString(); ");
文字列結果 = アクション(1);
結果: "102"
```

<br/>
<br/>

#### FakeMethodOperator

> メソッドをすばやくコピーして実装する

```cs
パブリッククラスのテスト
{
   パブリック文字列ハンドラ(文字列str)
   {
        ヌルを返します。
   }
}
```

```cs
var action = FakeMethodOperator.RandomDomain()
             . 使用方法(タイプオブ(テスト)。 GetMethod("Handler"))
             . StaticMethodContent(" str += \"hello\"; strを返します。 ")
             . 準拠<Func<string,string>>();

文字列の結果=アクション("シャオ");
結果: "こんにちは"              
```

<br/>
<br/>
