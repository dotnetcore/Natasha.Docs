---
title: "参照処理とマルチドメインの組み合わせ"
---

## ドメインを作成します

```cs
既定のドメインを取得します
NatashaManagement.GetDefaultDomain();
ランダム ドメインを取得します
NatashaManagement.CreateRandomDomain();
指定した名前のドメインを取得します
NatashaManagement.CreateDomain();
```

## 同じドメインコンパイル

```cs

ネイシャをウォームアップします
NatashaManagement.Preheating();
グローバル Using 参照を増やします
NatashaManagement.AddGlobalUsing("System.IO");
型に対応するメタデータをグローバル参照に追加します
Natasha がすべての参照を自動的に上書きする必要がある場合は、'DotNetCore.Compile.Environment' パッケージを導入してください。
NatashaManagement.AddGlobalReference(typeof(int));
または、アセンブリをグローバル参照に直接追加します
NatashaReferenceDomain.DefaultDomain.References.AddReference(assembly);

ドメインを作成します
var domain = NatashaManagement.CreateRandomDomain();

動的なメソッドを作成します
var action = NDelegate
    ドメインを指定します
    . UseDomain(domain)  
    クラスを構成します
    . ConfigClass(item=>item
        メソッドが存在するクラスの名前を指定します
        . Name("myTestClass")  
        グローバル Using は読み込まれません
        . NoGlobalUsing() 
        現在のドメイン コンパイルによって生成された Using は読み込まれません
        . NotLoadDomainUsing()) 
    . Func<int, int, int>("return arg1+arg2;" );
Console.WriteLine(action(1, 2));  result : 3


上記のクラスとメソッドを再利用します
var func = NDelegate
    . UseDomain(domain)
    . Func<int>("return myTestClass.Invoke(3,4);" );
Console.WriteLine(func());  result : 7
```