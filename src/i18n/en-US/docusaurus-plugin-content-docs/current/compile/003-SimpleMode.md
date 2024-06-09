---
title: 3 Lightweight Compilation Mode
---

## Prerequisite

1. Introduce the `DotNetCore.Natasha.CSharp.Compiler.Domain` Core version of the compilation domain package.
2. Concise compilation.

## Concise compilation

Please refer to the following code after preheating

```cs
AssemblyCSharpBuilder builder = new();
var myAssembly = builder
    .UseRandomDomain()
    .UseSimpleMode() //Enable lightweight mode
    .Add("public class A{ }")
    .GetAssembly();
```

The lightweight mode merges the metadata of the current domain and the 'Using' statements, and disables semantic checks.
The API logic for the concise mode is:

```cs
 .WithCurrentReferences()
 .WithCombineUsingCode(UsingLoadBehavior.WithCurrent)
 .WithReleaseCompile()
 .WithoutSemanticCheck();
```

You can refer to [Metadata management and fine-tuning] to fine-tune the merging behavior of metadata.
You can refer to [Fine-tuning Using override] to fine-tune the merging behavior of UsingCode.
