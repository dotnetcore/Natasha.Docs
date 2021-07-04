---
title: "域操作"
---

プログラム ドメインはアセンブリ コンテキストとも呼ばれ、コード環境を分離するドメインを作成したり、システム リソースの解放とリサイクルを保証するドメインをアンロードしたりできるアセンブリのキャリアであり、 ロック ドメインメソッドを使用して、現在の使用環境がロックされたドメインであることを保証することもできます。 用法如下：

```cs

//创建一个域
DomainManagment.Create("MyDomain");
//移除一个域
DomainManagment.Remove("MyDomain");
//判断域是否被弱引用所删除(被GC回收)
DomainManagment.IsDeleted("MyDomain");
//获取一个ALC上下文
DomainManagment.Get("MyDomain");




//锁住域上下文
using(DomainManagment.Lock("MyDomain"))
{

    var domain = DomainManagment.CurrentDomain;
    //code in 'MyDomain' domain

}


//创建并锁定一个域上下文
using(DomainManagment.CreateAndLock("MyDomain"))
{

    var domain = DomainManagment.CurrentDomain;
    //code in 'MyDomain' domain

}

```
