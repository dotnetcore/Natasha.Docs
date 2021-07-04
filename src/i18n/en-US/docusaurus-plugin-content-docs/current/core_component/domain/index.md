---
title: "域操作"
---

The program domain, also known as the assembly context, is the carrier of the assembly, we can create a domain to isolate the code environment, or we can uninstall the domain to ensure the release and recovery of system resources, we can also use the lock domain method to ensure that the current usage environment is a locked domain. 用法如下：

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
