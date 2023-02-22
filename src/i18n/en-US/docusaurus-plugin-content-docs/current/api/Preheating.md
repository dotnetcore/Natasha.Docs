---
title: "1. Preheat"
---


- **induct**

NUGET `DotNetCore.Natasha.CSharp`

- Overwrite all referenced files ***

It is recommended that beginners introduce this package to ensure that the reference file coverage is comprehensive and does not report errors. NUGET `DotNetCore.Compile.Environment`

- Select assembly reference files to load into the default domain based on name

The sample excludes the loading of most DLL files, among them `return false` Indicates that when an assembly is scanned to this point, the method returns 'No', and the assembly will be loaded into the default domain for backup. To use this assembly when subsequently building in a random domain/custom domain, the program will automatically use the assembly in the default domain. When the delegate code returns 'Yes', it means that the assembly is excluded, and then the random field/custom field needs to load it manually if it wants to use the assembly. [参考-引用管理章节]

```cs
NatashaInitializer.Preheating((asmName, name) => {
    if (name != null)
    {
        if (name. Contains("System"))
        {
            if (
            name. Contains("Net") ||
            name. Contains("Xml") ||
            name. Contains("IO") ||
            name. Contains("Reflection") ||
            name. Contains("Threading") ||
            name. Contains("Security") ||
            name. Contains("Diagnostics") ||
            name. Contains("Data") ||
            name. Contains("Resources.") ||
            name. Contains("Drawing") ||
            name. Contains("Text") ||
            name. Contains("Globalization") ||
            name. Contains("Service") ||
            name. Contains("Web") ||
            name. Contains("Window") ||
            name. Contains("ComponentModel")
            )
            {
                exclude
                return true;
            }
            return false;
        }
        if (name. Contains("Natasha"))
        {
            load
            return false;
        }
        if (name. Contains("ConsoleApp3"))
        {
            load
            return false;
        }
    }
    return true;
});
```

- Decide whether to load the assembly's reference file based on the name and version ***

The example uses AssemblyName to determine the assembly name and version, and the following code excludes the assembly reference file with the dapper major version number of 12;

```cs
NatashaInitializer.Preheating((asmName, name) => {
    if (asmName.Name != null)
    {
        if (asmName.Name.Contains("Dapper") && asmName.Version!. Major > 12)
        {
            return true;
        }
    }
    return false;
});
```

> Reducing the loading of assembly reference files can effectively control the memory increase.