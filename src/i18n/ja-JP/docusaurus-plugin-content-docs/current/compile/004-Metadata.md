---
title: 4 元数据管理与微调
---

## 元数据管理

### 增加元数据

新版 Natasha 新增了 NatashaLoadContext 操作类来接管编译所需的 [元数据引用] 以及 [Using Code];

首先获取 NatashaLoadContext 实例;

```cs
var loadContext = DomainManagement.Random();
//或
var loadContext = (new AssemblyCSharpBuilder().UseRandomDomain()).LoadContext;
```

从实现程序集中寻找 [元数据引用] 和 [Using Code] 并添加

```CS
loadContext.AddReferenceAndUsingCode(myType/myAssembly);
```

从引用程序集中寻找 [元数据引用] 和 [Using Code] 并添加

```cs
loadContext.AddReferenceAndUsingCode(refAssemblyFilePath);
```

### 单独增加 [元数据引用]

单独添加 [元数据引用]

```cs
loadContext.ReferenceRecorder.AddReference(
    AssemblyName assemblyName, 
    MetadataReference reference, 
    AssemblyCompareInfomation loadReferenceBehavior)
```

第三个参数的作用是：当域中已存在 assemblyName 时，用那个版本好。

### 单独增加 [Using Code]

```cs
loadContext.UsingRecorder.Using(string? @using);
loadContext.UsingRecorder.Using(IEnumerable<string> @using);
loadContext.UsingRecorder.Using(Assembly assembly);
loadContext.UsingRecorder.Using(params Assembly[] namespaces);
loadContext.UsingRecorder.Using(IEnumerable<Assembly> namespaces);
loadContext.UsingRecorder.Using(IEnumerable<Type> namespaces);
loadContext.UsingRecorder.Using(Type type);
```

## 元数据微调

### 完整覆盖

合并共享域的 [元数据引用] 和 [Using Code]

```cs
 builder.WithCombineReferences(item => item.UseAllReferences())
 builder.WithCombineUsingCode(UsingLoadBehavior.WithAll)
```

### 部分覆盖

合并当前域的 [元数据引用] 和 [Using Code]

```cs
 builder.WithCurrentReferences()
 builder.WithCombineUsingCode(UsingLoadBehavior.WithCurrent)
```

### 自定义

不覆盖 [Using Code]，使用自己传入的 [元数据引用]

```cs
 builder.WithSpecifiedReferences(IEnumerable<MetadataReference> metadataReferences)
 builder.WithoutCombineUsingCode()
```
