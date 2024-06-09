---
title: 3 軽量なコンパイルモード
---

## 前提条件

1. `DotNetCore.Natasha.CSharp.Compiler.Domain`コアバージョンのコンパイルドメインパッケージをインポートしてください。
2. シンプルなコンパイル。

## シンプルなコンパイル

プレヒート後は、以下のコードを参照してください。

```cs
AssemblyCSharpBuilder builder = new();
var myAssembly = builder
    .UseRandomDomain()
    .UseSimpleMode() //軽量モードを有効にする
    .Add("public class A{ }")
    .GetAssembly();
```

軽量モードでは、[現在のドメイン]のメタデータとUsingが統合され、意味チェックが無効になります。
シンプルモードのAPIロジックは次のとおりです：

```cs
 .WithCurrentReferences()
 .WithCombineUsingCode(UsingLoadBehavior.WithCurrent)
 .WithReleaseCompile()
 .WithoutSemanticCheck();
```

可以参考[元数据管理与微调] 对 元数据 的合并行为进行微调。
可以参考[微调Using覆盖] 对 UsingCode 的合并行为进行微调。
