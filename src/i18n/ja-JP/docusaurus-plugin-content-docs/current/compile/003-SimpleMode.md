---
title: 3 轻便编译模式
---

## 前提条件

1. 引入 `DotNetCore.Natasha.CSharp.Compiler.Domain` Core 版本的编译域包。
2. 简洁编译。

## 简洁编译

在预热后请参考以下代码

```cs
AssemblyCSharpBuilder builder = new();
var myAssembly = builder
    .UseRandomDomain()
    .UseSimpleMode() //启用轻便模式
    .Add("public class A{ }")
    .GetAssembly();
```

轻便模式将合并 [当前域]的 元数据以及 Using, 并关闭语义检查.
简洁模式的 API 逻辑为：

```cs
 .WithCurrentReferences()
 .WithCombineUsingCode(UsingLoadBehavior.WithCurrent)
 .WithReleaseCompile()
 .WithoutSemanticCheck();
```

可以参考[元数据管理与微调] 对 元数据 的合并行为进行微调。
可以参考[微调Using覆盖] 对 UsingCode 的合并行为进行微调。
