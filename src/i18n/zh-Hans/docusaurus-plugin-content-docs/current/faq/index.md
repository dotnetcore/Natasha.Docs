---
title: "常见问题"
slug: "/常见问题"
---

<br/>

### 我想使用轻量级动态编译，听说 Natasha 预热要好几十 M 的内存，而且打包的大小也增加了，我感觉太重了。

答： Natasha 的预热是给萌新准备的，本意是忽略所有的准备工作直接进行动态编译。但是无论是 emit 还是 表达式树，都要反射相关的元数据给动态编译使用，如果你有 emit 和 表达式树 相关编程经验，就能知道你所编写的动态功能都依赖什么元数据了，而 Natasha 可以不预热并支持自定义添加元数据，参见以下示例, 该实例输入为 value, 输出为 Math.Floor(value/0.3)：

#### emit 版本
```cs
        DynamicMethod dynamicMethod = new DynamicMethod("FloorDivMethod", typeof(double), new Type[] { typeof(double) }, typeof(Program).Module);

        ILGenerator ilGenerator = dynamicMethod.GetILGenerator();

        ilGenerator.Emit(OpCodes.Ldarg_0);  
        ilGenerator.Emit(OpCodes.Ldc_R8, 0.3);  
        ilGenerator.Emit(OpCodes.Div);  
        ilGenerator.Emit(OpCodes.Call, typeof(Math).GetMethod("Floor", new Type[] { typeof(double) }));  
        ilGenerator.Emit(OpCodes.Ret); 

        Func<double, double> floorDivMethod = (Func<double, double>)dynamicMethod.CreateDelegate(typeof(Func<double, double>));
```

#### 表达式树版本
```cs
        ParameterExpression valueParameter = Expression.Parameter(typeof(double), "value");

        Expression divisionExpression = Expression.Divide(valueParameter, Expression.Constant(0.3));
        Expression floorExpression = Expression.Call(typeof(Math), "Floor", null, divisionExpression);

        Expression<Func<double, double>> expression = Expression.Lambda<Func<double, double>>(floorExpression, valueParameter);

        Func<double, double> floorDivMethod = expression.Compile();
```

#### Natasha 版本
```cs
AssemblyCSharpBuilder builder = new();
var func = builder
    .UseRandomLoadContext()
    .UseSimpleMode()
    .ConfigLoadContext(ctx => ctx
        .AddReferenceAndUsingCode(typeof(Math))
        .AddReferenceAndUsingCode(typeof(double)))
    .Add("public static class A{ public static double Invoke(double value){ return Math.Floor(value/0.3);  }}")
    .GetAssembly()
    .GetDelegateFromShortName<Func<double, double>>("A", "Invoke");
```

#### Natasha 方法模板封装版
> 该扩展库 `DotNetCore.Natasha.CSharp.Extension.MethodCreator` 在原 Natasha 基础上封装，并在 Natasha v9.0 版本后发布。
```cs
var simpleFunc = "return Math.Floor(arg1/0.3);"
    .WithSimpleBuilder()
    .WithMetadata(typeof(Math))
    .ToFunc<double, double>();
```

以上两种 Natasha 的动态编译都不会引起几十M 的内存涨幅，属于按需构建。
同时由此可以看出，无论哪种动态构建，都无法挣脱 `typeof(Math)` 的束缚，Natasha 同样支持轻量级的构建，甚至更加简洁。

### 我可以使用 Natasha 作为规则引擎吗？

答：Natasha 的动态构建能力非常强大，它是可以作为编写其他库的基础，这也是我当初开发此库的本意，你可以用 Natasha 封装属于你的规则引擎。

### 我不想每次都编译，能否缓存脚本的结果？

答：不可以，缓存结果需要您来完成，Natasha 走的是轻量化路线，`AssemblyCSharpBuilder` 为最小最基础的编译单元，如果你想缓存，可以自己实现一个 `ConcurrentDictionary<string,Delegate/Action/Func>` 来缓存结果。Natasha 不负责编译职责之外的事情。

### 我只想使用 using 全集，但不想添加那么多的引用。

答：Natasha 在 v9.0 版本后支持只预热 using 而不添加引用，新增了初始化方法：
```cs
NatashaManagement
    .GetInitializer()
    .WithMemoryUsing()
    //.WithRefUsing()
    //.WithMemoryReference()
    //.WithRefReference();
    //.WithExcludeReferences((asm, @namespace) => 
        //!string.IsNullOrWhiteSpace(@namespace) && 
        //@namespace.StartsWith("Microsoft.VisualBasic"))
    .Preheating<NatashaDomainCreator>();
```
### 能否复用之前创建的编译单元？

答：Natasha v9.0 之前不推荐复用，v9.0 后推出了 Api : `Reset`. 该方法有非常详细的注释引导和提示您需要注意的复用事项。

### 如果不懂元数据，也不想理 using 管理，能否写出一手好的可靠的动态功能逻辑？

答：很勉强，Natasha 全预热的情况下也不可避免复杂环境带来的各种版本不一致，using 滥用等情况。就拿简单的例子来说：
```cs
namspace MyNamespace{

    public static class File{

    }
}
```
以上代码在 VS 开启隐式 using 情况下，也无法处理 File 在 System.IO 和 MyNamespace 之间引用不明的问题。
而 Natasha 的 using 预热有时要比 VS 的 using 覆盖更加全面，因此出错的概率可能会更大。
这需要编码规范来约束开发者，比如避开官方定义的类名，扩展类名等，比如使用 System.IO.File 避开命名空间引用冲突的问题。