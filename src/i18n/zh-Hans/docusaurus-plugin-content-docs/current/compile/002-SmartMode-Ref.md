---
title: "2.2 智能编译模式 - 引用程序集"
---

## 为何使用引用程序集

引用程序集不包括实现，不会因为具体实现的不同导致意外情况，具有很强的包容性。

## 前提条件

1. 引入 `DotNetCore.Compile.Environment` 环境包， 该包将在编译时输出引用程序集到 refs 文件夹下。
2. 引入 `DotNetCore.Natasha.CSharp.Compiler.Domain` Core 版本的编译域包。
3. 使用预热方法为智能编译做准备。
4. 智能编译。


## 预热案例

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

### 普通预热
1. 泛型预热方法将自动创建 编译域创建者 单例。
2. 传入 false 参数以达到禁用运行时程序集的作用，Natasha 将会选择引用程序集预热。
3. 第一个参数指是否从内存程序集中提取 Using Code， 设置为 false 将从引用程序集中提取 Using。
4. 第二个参数指是否从内存程序集中提取 元数据，设置为 false 将从引用程序集中提取 元数据。
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

### Using缓存预热
第一次生成将 Using Code 写入缓存文件  Natasha.Namespace.cache 中，后续重启会自动从文件中加载。
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

### 分开预热
```cs
//注册编译域
NatashaManagement.RegistDomainCreator<NatashaDomainCreator>();
//预热方法
NatashaManagement.Preheating(false, false);
```

### 过滤预热
```cs
//如果存在 Dapper 主版本高于 12 的程序集，则不要将它加入缓存。
//传入排除方法
NatashaManagement.Preheating<NatashaDomainCreator>((asmName, name) => {
    if (asmName.Name != null)
    {
        if (asmName.Name.Contains("Dapper") && asmName.Version!.Major > 12)
        {
            return true;
        }
    }
    return false;
},false, false，true);
```

> 也许您的环境过于复杂，从而遇到一些意外，请您精简代码之后，确保异常能够重现，提交 issue 给 Natasha。 


## 智能编译

在预热后请参考以下代码

```cs
AssemblyCSharpBuilder builder = new();
var myAssembly = builder
    .UseRandomDomain()
    .UseSmartMode() //启用智能模式
    .Add("public class A{ }")
    .GetAssembly();
```

智能模式将合并 共享域与当前域的 元数据以及 Using, 并启用语义检查.
智能模式的 API 逻辑为：
```cs
.WithCombineReferences(item => item.UseAllReferences())
.WithCombineUsingCode(UsingLoadBehavior.WithAll)
.WithReleaseCompile()
.WithSemanticCheck();
```

可以参考[元数据管理与微调] 对 元数据 的合并行为进行微调。
可以参考[微调Using覆盖] 对 UsingCode 的合并行为进行微调。

## 其他案例

#### 批量排除程序集

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
}，false, false);
```

#### 根据版本排除程序集

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