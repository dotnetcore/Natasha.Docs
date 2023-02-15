---
title: "预热 用法展示"
---


- **引入**

NUGET `DotNetCore.Natasha.CSharp`

- *** 覆盖所有引用文件 ***

建议初学者引入此包以保证引用文件覆盖全面不报错.
NUGET `DotNetCore.Compile.Environment`

- *** 根据名称选择加载到默认域的程序集引用文件 ***

该示例中排除了绝大部分 DLL 文件的加载, 其中 `return false` 表示不排除, 当程序集扫描至此, 方法返回'否', 则该程序集将加载至默认域中备用. 随后在随机域 / 自定义域中进行构建时,若要使用此程序集,程序将自动使用默认域中的程序集.
当委托代码返回'是',则代表该程序集被排除在外, 随后随机域 / 自定义域若想使用该程序集, 需要手动加载. [参考-引用管理章节]

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
                //排除
                return true;
            }
            return false;
        }
        if (name.Contains("Natasha"))
        {
            //加载
            return false;
        }
        if (name.Contains("ConsoleApp3"))
        {
            //加载
            return false;
        }
    }
    return true;
});
```

- *** 根据名称及版本判断是否加载该程序集的引用文件 ***

该示例使用 AssemblyName 进行判断程序集名称及版本, 以下代码排除了 dapper 主版本号为 12 的程序集引用文件;

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

> 减少程序集引用文件的加载,可以有效的控制内存涨幅.