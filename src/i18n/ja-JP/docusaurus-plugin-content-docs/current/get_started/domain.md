---
title: "参照処理とマルチドメインの組み合わせ"
---

## ドメインを作成します

```cs
取得デフォルトドメイン
NatashaManagement.GetDefaultDomain();
//取得ランダムドメイン
NatashaManagement.CreateRandomDomain();
//指定された名前のドメインを取得
NatashaManagement.CreateDomain();
```

## 同じドメインコンパイル

```cs

予熱 Natasha
NatashaManagement.Preheating();
//増加グローバル Using 参照
NatashaManagement.AddGlobalUsing ("System.IO");
// グローバル参照に型に対応するメタデータを追加する
// Natasha がすべての参照を自動的に上書きする必要がある場合は、'DotNetCore.Compile.Environment' パッケージを導入します。
NatashaManagement.AddGlobalReference (typeof(int)))。
//またはグローバル参照にアセンブリを直接追加する
//NatashaReferenceDomain.DefaultDomain.References.AddReference(assembly);

// ドメイン
var domain = NatashaManagement.CreateRandomDomain();

//
var action = NDelegate
    //指定されたドメイン
    の動的メソッドを作成します。 UseDomain(domain)  
    //configuration クラス
    . ConfigClass(item=>item
        //指定メソッドが存在するクラスの名前
        . Name ("myTestClass")  
        //グローバル Using
        を読み込まない. NoGlobalUsing() 
        //現在のドメイン コンパイルによって生成された Using
        を読み込まない. NotLoadDomainUsing()) 
    . Func<int, int, int>("return arg1+arg2;" );
Console.WriteLine(action(1, 2)); result : 3


//上記のクラスとメソッドを多重化
var func = NDelegate
    . UseDomain(domain)
    . Func<int>("return myTestClass.Invoke(3,4);" );
Console.WriteLine(func());  result : 7
```