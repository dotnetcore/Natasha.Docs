---
title: 1. Concept and Usage of Domain
---

## Getting started

Refer to the package `DotNetCore.Natasha.Domain` or `DotNetCore.Natasha.CSharp.Compiler.Domain`

`DotNetCore.Natasha.Domain` is the implementation package for Domain.
`DotNetCore.Natasha.CSharp.Compiler.Domain` is the package that binds the Natasha compilation unit and Domain together.

## Creating a Domain

```cs
//If you want to convert the main domain to NatashaDomain, please use the initialization method without parameters and save the instance after creation, do not create repeatedly.
var domain = new NatashaDomain();
//If you want to create a non-main domain
var domain = new NatashaDomain(key);
```

## Loading plugins

#### Before that, I have to say, how a plugin outputs complete dependencies and shields reference interfaces, please refer to [Microsoft documentation](https://learn.microsoft.com/en-us/dotnet/core/tutorials/creating-app-with-plugin-support#simple-plugin-with-no-dependencies)

### Plugin loading

The `LoadPlugin` method allows users to pass in the plugin file path and returns the assembly.

### Assembly comparer

Natasha.Domain self-implements the assembly comparison logic, and uses the SetAssemblyLoadBehavior(AssemblyCompareInfomation loadBehavior) method to specify the loading behavior of assembly dependencies. For example, passing in the "AssemblyCompareInfomation.UseHighVersion" enumeration will compare the program assemblies that the plugin depends on with the assemblies that already exist in the shared domain during the plugin loading process. If the assembly names are the same, the higher version of the assembly will be loaded.

### Encapsulated API

Natasha.Domain combines the plugin loading method and the assembly comparer to generate 4 API methods: `LoadPluginWithHighDependency` / `LoadPluginWithLowDependency` / `LoadPluginUseDefaultDependency` / `LoadPluginWithAllDependency`. Take the first API as an example, if there are different versions of dependencies found during the comparison process, it will choose the higher version of the dependency instead of loading the lower version. Remember to read the comments and ask questions on Github if there are any issues.

### Notes

ALC does not allow loading of reference assemblies because reference assemblies are not executable.
