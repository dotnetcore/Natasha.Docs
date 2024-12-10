---
title: 10. 使用 CompileDirector 的扩展
---

## 介绍

这是一个可以让编译单元不断学习和矫正 using code 的库，在重复的编译场景中，几乎每次 using code 和元数据引用都大同小异，甚至不会改变，
该库允编译单元在编译成功时学习有用的 using code 以备后用。

## 使用方法

1. 引入 `DotNetCore.Natasha.CSharp.Extension.CompileDirector` 扩展包。
2. 编码。

### 编译导演

```cs
//传入采样计数阈值，不传默认为 2.
//采样计数会影响 CompileDirector 的“学习”效率.
//每次编译成功，该编译单元成功的 using 计数 + 1.
//当 using 计数大于采样计数阈值时，将被 CompileDirector 内部的 UsingCache 录用为正式 using.
//正式 using 每次会优先覆盖脚本
CompileDirector director = new CompileDirector(3);

//配置每次从该场景中产生的 编译单元。
director.ConfigBuilder(builder => builder
.ConfigSyntaxOptions(opt => opt.WithPreprocessorSymbols("DEBUG"))
.WithDebugCompile()
.ConfigLoadContext(ctx => ctx
    .AddReferenceAndUsingCode<object>()
    .AddReferenceAndUsingCode(typeof(Math))
    .AddReferenceAndUsingCode(typeof(File))
));

//生产编译单元
//由 director 生产的编译单元会自动覆盖已经被录用的 using code.
var builder = director.CreateBuilder();

//编译单元
builder.Add(@"public static class A
{  
    public static void Show()
    { 
        File.WriteAllText(""1.txt"", ""1"");
        Console.WriteLine(Math.Abs(-4));   
    }
}");

//通过 director 获取程序集
// 成功时继续挑选和计数录用 using code
// 失败时将使用对应的 using 覆盖策略进行重编译
//     通过 ConfigUsingConverSrategy API 配置失败时的覆盖策略      
var asm = director.GetAssembly(builder);
asm.GetDelegateFromShortName<Action>("A", "Show")!();
```
