---
title: 2.1 Smart Compilation Mode - Implementing Assemblies
---

## Why Use Implementing Assemblies

Implementing assemblies include the specific implementation and private fields of logic, with less memory growth during warm-up. However, implementing assemblies have sensitive dependencies and should be used with caution.

## Prerequisite

1. Introduce the `DotNetCore.Natasha.CSharp.Compiler.Domain` Core version of the compilation domain package.
2. Prepare for intelligent compilation using the preheating method.
3. Intelligent Compilation.

## Preheating Examples

### Ordinary Preheating

1. The generic preheating method will automatically create a singleton for the compilation domain creator.
2. Passing the true parameter to disable runtime assemblies, Natasha will choose to preheat memory assemblies.
3. The first parameter indicates whether to extract 'Using Code' from memory assemblies. Set it to true to extract 'Using' from implementing assemblies.
4. The second parameter indicates whether to extract 'Metadata' from memory assemblies. Set it to true to extract 'Metadata' from implementing assemblies.

```cs
//Register the compilation domain and preheat method
NatashaManagement.Preheating<NatashaDomainCreator>(true, true);
```

### Using Cache Preheating

The first generation will write the 'Using Code' into the cache file 'Natasha.Namespace.cache', and subsequent restarts will automatically load it from the file.

```cs
//Register the compilation domain and preheat method
NatashaManagement.Preheating<NatashaDomainCreator>(true, true, true);
```

### Separate Preheating

```cs
//Register the compilation domain
NatashaManagement.RegistDomainCreator<NatashaDomainCreator>();
//Preheat method
NatashaManagement.Preheating(true, true);
```

### Filter Preheating

```cs
//Exclude the assembly if there is a Dapper assembly with a major version greater than 12.
//Pass the exclusion method
NatashaManagement.Preheating<NatashaDomainCreator>((asmName, name) => {
    if (asmName.Name != null)
    {
        if (asmName.Name.Contains("Dapper") && asmName.Version!.Major > 12)
        {
            return true;
        }
    }
    return false;
}, true, true, true);
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
}, true, true);
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
