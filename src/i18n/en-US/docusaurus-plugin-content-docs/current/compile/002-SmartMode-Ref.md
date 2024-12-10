---
title: 2.2 Intelligent Compilation Mode - Reference Assembly
---

## Why Use Reference Assembly

Reference Assembly does not include the implementation and will not cause unexpected situations due to different implementations. It has strong inclusiveness.

## Prerequisite

1. Introduce the `DotNetCore.Compile.Environment` package, which will output the reference assembly to the `refs` folder during compilation.
2. Introduce the `DotNetCore.Natasha.CSharp.Compiler.Domain` Core version of the compilation domain package.
3. Prepare for intelligent compilation using the preheating method.
4. Intelligent Compilation.

## Preheating Examples

### 链式预热

从 V9 版本起，Natasha 支持链式预热：

```cs
NatashaManagement
    //获取链式构造器
    .GetInitializer() 
    //使用引用程序集中的命名空间
    .WithRefUsing()
    //使用引用程序集中的元数据
    .WithRefReference()
    //使用内存中的命名空间
    .WithMemoryUsing()
    //使用内存中的元数据
    .WithMemoryReference()
    //使用文件来持久化缓存 命名空间
    .WithFileUsingCache()
    //过滤哪些元数据是不能用的，被排除的
    .WithExcludeReferences((asm, asmStr) => { return false; })
    //注册域构造器
    .Preheating<NatashaDomainCreator>();
```

如果不指定相关 API ,预热将跳过此行为，例如只写 WithXXXReference 不写 using 相关的 API, 那么 Natasha 预热时将只对元数据进行操作，不会缓存 using code. 这样做的好处是实现了高度定制化，按需预热。

### Ordinary Preheating

1. The generic preheating method will automatically create a singleton for the compilation domain creator.
2. Passing false as a parameter to disable the runtime assembly, Natasha will choose to preheat the reference assembly.
3. The first parameter specifies whether to extract the 'Using Code' from the memory assembly. Setting it to false will extract 'Using' from the reference assembly.
4. The second parameter specifies whether to extract the metadata from the memory assembly. Setting it to false will extract the metadata from the reference assembly.

```cs
//注册编译域并预热方法
NatashaManagement.Preheating<NatashaDomainCreator>(false, false);
//或 V9 版本
NatashaManagement
    //获取链式构造器
    .GetInitializer() 
    //使用引用程序集中的命名空间
    .WithRefUsing()
    //使用引用程序集中的元数据
    .WithRefReference()
    //注册域构造器
    .Preheating<NatashaDomainCreator>();
```

### Using Cache Preheating

The first generation will write the 'Using Code' into the cache file 'Natasha.Namespace.cache', and subsequent restarts will automatically load it from the file.

```cs
//注册编译域并预热方法
NatashaManagement.Preheating<NatashaDomainCreator>(false, false，true);
//或 V9 版本
NatashaManagement
    //获取链式构造器
    .GetInitializer() 
    //使用引用程序集中的命名空间
    .WithRefUsing()
    //使用引用程序集中的元数据
    .WithRefReference()
    //使用文件来持久化缓存 命名空间
    .WithFileUsingCache()
    //注册域构造器
    .Preheating<NatashaDomainCreator>();
```

### Separate Preheating

```cs
//Register the compilation domain
NatashaManagement.RegistDomainCreator<NatashaDomainCreator>();
//Preheating method
NatashaManagement.Preheating(false, false);
```

### Filter Preheating

```cs
//If there is an assembly with Dapper's major version greater than 12, do not add it to the cache.
//Pass in the exclusion method
NatashaManagement.Preheating<NatashaDomainCreator>((asmName, name) => {
    if (asmName.Name != null)
    {
        if (asmName.Name.Contains("Dapper") && asmName.Version!.Major > 12)
        {
            return true;
        }
    }
    return false;
}, false, false, true);
```

> Perhaps your environment is too complex, encountering some unexpected problems. Please simplify the code to ensure that the exception can be reproduced, and submit an issue to Natasha.

## Intelligent Compilation

Please refer to the following code after preheating

```cs
AssemblyCSharpBuilder builder = new();
var myAssembly = builder
    .UseRandomDomain()
    .UseSmartMode() //Enable smart mode
    .Add("public class A{ }")
    .GetAssembly();
```

Smart mode will merge metadata and 'Using' code from shared domain and current domain, and enable semantic checks.
The API logic for smart mode is as follows:

```cs
.WithCombineReferences(item => item.UseAllReferences())
.WithCombineUsingCode(UsingLoadBehavior.WithAll)
.WithReleaseCompile()
.WithSemanticCheck();
```

You can refer to [Metadata management and fine-tuning] to fine-tune the merging behavior of metadata.
You can refer to [Fine-tuning Using override] to fine-tune the merging behavior of UsingCode.

## Other cases

#### Batch exclude assemblies

```cs
NatashaInitializer.Preheating((asmName, name) => {
    if (name != null)
    {
        if (name.Contains("System"))
        {
            if (
            name.Contains("Net") ||
            name.Contains("Xml") ||
            name.Contains("IO") ||
            name.Contains("Reflection") ||
            name.Contains("Threading") ||
            name.Contains("Security") ||
            name.Contains("Diagnostics") ||
            name.Contains("Data") ||
            name.Contains("Resources.") ||
            name.Contains("Drawing") ||
            name.Contains("Text") ||
            name.Contains("Globalization") ||
            name.Contains("Service") ||
            name.Contains("Web") ||
            name.Contains("Window") ||
            name.Contains("ComponentModel")
            )
            {
                //Exclude
                return true;
            }
            return false;
        }
        if (name.Contains("Natasha"))
        {
            //Load
            return false;
        }
        if (name.Contains("ConsoleApp3"))
        {
            //Load
            return false;
        }
    }
    return true;
}，false, false);
```

#### Exclude assemblies based on versions

This example uses AssemblyName to determine the assembly name and version. The following code excludes the reference files of the dapper with major version 12;

```cs
NatashaInitializer.Preheating((asmName, name) => {
    if (asmName.Name != null)
    {
        if (asmName.Name.Contains("Dapper") && asmName.Version!.Major > 12)
        {
            return true;
        }
    }
    return false;
});
```

> Reducing the loading of assembly reference files can effectively control memory consumption.
