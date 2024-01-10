---
title: "1.域的概念与使用"
---

## 开始

引用包 `DotNetCore.Natasha.Domain` 或 `DotNetCore.Natasha.CSharp.Compiler.Domain`;

`DotNetCore.Natasha.Domain` 为 域 的实现包。
`DotNetCore.Natasha.CSharp.Compiler.Domain` 为 Natasha 编译单元与 域的粘合包。

## 创建域

```cs
//如果你想将主域转化为 NatashaDomain,请使用不带参数的初始化方法，并创建后将实例保存起来，不要重复创建。
var domain = new NatashaDomain();
//如果你想创建非主域
var domain = new NatashaDomain(key);
```

## 加载插件

#### 在这之前我不得不说，一个插件如何输出完整依赖，如何屏蔽引用接口，请参照[微软文档](https://learn.microsoft.com/en-us/dotnet/core/tutorials/creating-app-with-plugin-support#simple-plugin-with-no-dependencies)


### 插件加载

 `LoadPlugin` 方法允许用户传入插件文件路径，返回程序集。

### 程序集比较器

Natasha.Domain 自实现了程序集比较逻辑，通过 SetAssemblyLoadBehavior(AssemblyCompareInfomation loadBehavior) 方法来指定程序集依赖加载行为，例如 "AssemblyCompareInfomation.UseHighVersion" 枚举传入，将导致插件加载过程中，插件所依赖的程序集与共享域已存在的程序集进行比较，如果程序集名相同，则加载版本较高的程序集。

### 封装 API 

Natasha.Domain 合并了插件加载方法和程序集比较器产生了 4 个 API 方法，`LoadPluginWithHighDependency` / `LoadPluginWithLowDependency` / `LoadPluginUseDefaultDependency` / `LoadPluginWithAllDependency`.
就拿第一个 API 来说，如果比对过程中找到的依赖版本有高有低，则选择高版本的依赖，而非加载低版本依赖，在使用过程中记得看注释，有问题要去 Github 提问。

### 注意事项

ALC 不允许加载引用程序集，因为引用程序集不可执行。