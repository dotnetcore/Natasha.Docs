---
title: 1.域的概念与使用
---

## 開始

引用包 `DotNetCore.Natasha.Domain` 或 `DotNetCore.Natasha.CSharp.Compiler.Domain`;

`DotNetCore.Natasha.Domain` 为 域 的实现包。
`DotNetCore.Natasha.CSharp.Compiler.Domain` 为 Natasha 编译单元与 域的粘合包。

## 创建域

```cs
//如果你想将主域转化为 NatashaDomain,请使用不带参数的初始化方法，并创建后将实例保存起来，不要重複创建。
var domain = new NatashaDomain();
//如果你想创建非主域
var domain = new NatashaDomain(key);
```

## 加载插件

#### 在这之前我不得不说，一个插件如何输出完整依赖，如何屏蔽引用接口，请参照[微软文档](https://learn.microsoft.com/en-us/dotnet/core/tutorials/creating-app-with-plugin-support#simple-plugin-with-no-dependencies)

### 插件加载

`LoadPlugin` 方法允许用户传入插件文件路径，返回程序集。

### 程序集比较器

Natasha.Domain 自实现了程序集比较逻辑，通过 SetAssemblyLoadBehavior(AssemblyCompareInfomation loadBehavior) 方法来指定程序集依赖加载行为，例如 "AssemblyCompareInfomation.UseHighVersion" 枚舉傳入，將導致插件加載過程中，插件所依賴的程序集与共享域已存在的程序集進行比较，如果程序集名相同，则加載版本較高的程序集。

### 封装 API

Natasha.Domain 合并了插件加载方法和程序集比较器產生了 4 個 API 方法，`LoadPluginWithHighDependency` / `LoadPluginWithLowDependency` / `LoadPluginUseDefaultDependency` / `LoadPluginWithAllDependency`.
就拿第一個 API 來說，如果比對過程中找到的依賴版本有高有低，则選擇高版本的依賴，而非加載低版本依賴，在使用過程中記得看註釋，有問題要去 Github 提問。

### 注意事項

ALC 不允許加載引用程序集，因為引用程序集不可執行。
