---
title: "引用处理与多域组合"
---

## 创建域

```cs
//获取默认域
NatashaManagement.GetDefaultDomain();
//获取随机域
NatashaManagement.CreateRandomDomain();
//获取指定名称的域
NatashaManagement.CreateDomain();
```

## 同域编译

```cs

//预热 Natasha
NatashaManagement.Preheating();
//增加全局的 Using 引用
NatashaManagement.AddGlobalUsing("System.IO");
//向全局引用中增加类型对应的元数据
//如果需要Natasha 自动覆盖全部引用,请引入 'DotNetCore.Compile.Environment' 包.
NatashaManagement.AddGlobalReference(typeof(int));
//或直接追加程序集到全局引用中
//NatashaReferenceDomain.DefaultDomain.References.AddReference(assembly);

//创建一个域
var domain = NatashaManagement.CreateRandomDomain();

//创建一个动态的方法
var action = NDelegate
    //指定域
    .UseDomain(domain)  
    //配置类
    .ConfigClass(item=>item
        //指定方法所在类的名称
        .Name("myTestClass")  
        //不加载全局Using
        .NoGlobalUsing() 
        //不加载当前域编译产生的Using
        .NotLoadDomainUsing()) 
    .Func<int, int, int>("return arg1+arg2;");
Console.WriteLine(action(1, 2)); // result : 3


//复用上面的类和方法
var func = NDelegate
    .UseDomain(domain)
    .Func<int>("return myTestClass.Invoke(3,4);");
Console.WriteLine(func()); // result : 7
```