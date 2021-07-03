---
title: "ドメイン操作"
---

プログラム ドメインはアセンブリ コンテキストとも呼ばれ、コード環境を分離するドメインを作成したり、システム リソースの解放とリサイクルを保証するドメインをアンロードしたりできるアセンブリのキャリアであり、 ロック ドメインメソッドを使用して、現在の使用環境がロックされたドメインであることを保証することもできます。 使用法は次のとおりです：

```cs

ドメインを作成します
DomainManagment.Create("MyDomain");。
//1 つのドメインを削除
DomainManagment.Remove("MyDomain");
//ドメインが弱い参照によって削除されたかどうか (GC によって再利用)
DomainManagment.IsDeleted ("MyDomain") を参照してください。
//ALC コンテキストを取得します
DomainManagment.Get ("MyDomain");




//ロックドメインコンテキスト
using(DomainManagment.Lock("MyDomain"))
{

    var domain = DomainManagment.CurrentDomain;
    //code in 'MyDomain' domain

}


//ドメインコンテキストの作成とロック
using(DomainManagment.CreateAndLock("MyDomain"))
{

    var domain = DomainManagment.CurrentDomain;
    //code in 'MyDomain' domain

}

```
