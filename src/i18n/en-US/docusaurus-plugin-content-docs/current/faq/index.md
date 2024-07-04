---
title: "frequently asked questions"
slug: "/Frequently asked questions"
---

<br/>

### I want to use lightweight dynamic compilation. I heard that Natasha requires several tens of megabytes of memory for preheating, and the packaged size also increases. I feel it's too heavy.

Answer: The preheating of Natasha is designed for beginners, the original intention is to ignore all preparation work and directly perform dynamic compilation.However, whether it's emitting or expression tree, both require reflection-related metadata for dynamic compilation. If you have experience with emitting and expression tree programming, you will know what metadata your dynamically written functions rely on. Natasha can skip preheating and support custom metadata addition. See the following example, where the input is value and the output is Math.Floor(value/0.3):

#### Emit version
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

#### Expression tree version
```cs
        ParameterExpression valueParameter = Expression.Parameter(typeof(double), "value");

        Expression divisionExpression = Expression.Divide(valueParameter, Expression.Constant(0.3));
        Expression floorExpression = Expression.Call(typeof(Math), "Floor", null, divisionExpression);

        Expression<Func<double, double>> expression = Expression.Lambda<Func<double, double>>(floorExpression, valueParameter);

        Func<double, double> floorDivMethod = expression.Compile();
```

#### Natasha version
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

#### Natasha method template encapsulation version
> This extension library `DotNetCore.Natasha.CSharp.Extension.MethodCreator` is encapsulated based on the original Natasha and released after version 9.0 of Natasha.
```cs
var simpleFunc = "return Math.Floor(arg1/0.3);"
    .WithSimpleBuilder()
    .WithMetadata(typeof(Math))
    .ToFunc<double, double>();
```

The above two dynamic compilations of Natasha will not cause a memory increase of tens of megabytes, they belong to on-demand construction. At the same time, it can be seen that no matter which dynamic construction, it cannot escape the constraint of `typeof(Math)`. Natasha also supports lightweight construction, which is even more concise.

### Can I use Natasha as a rule engine?

A: The dynamic construction ability of Natasha is very powerful. It can be used as the basis for developing other libraries, which was also the original intention of developing this library. You can use Natasha to encapsulate your own rule engine.

### I don't want to compile every time, can I cache the result of the script?

A: No, caching the result needs to be done by you. Natasha follows the lightweight route. `AssemblyCSharpBuilder` is the smallest and most basic compilation unit. If you want to cache, you can implement a ConcurrentDictionary<string,Delegate/Action/Func> to cache the result.Natasha is not responsible for anything other than the compilation responsibility.

### I only want to use the using statement, but I don't want to add so many references.

A: Natasha supports only preheating using without adding references after version 9.0, and a new initialization method is added:
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
### Can the previously created compilation units be reused?

A: Before Natasha v9.0, reuse is not recommended. After v9.0, the Api: `Reset` is introduced. This method has very detailed comments to guide and remind you of the reuse considerations you need to pay attention to.

### If you don't understand metadata and don't want to manage using, can you write reliable dynamic functional logic?

A: It's quite challenging. Even with Natasha fully preheated, it is inevitable to encounter various inconsistencies caused by complex environments and excessive use of 'using' statements.Take a simple example:
```cs
namespace MyNamespace{

    public static class File{

    }
}
```
Even with implicit 'using' enabled in VS, the code above still cannot handle the issue of ambiguous reference between 'File' in 'System.IO' and 'MyNamespace'. And sometimes, Natasha's preheating with 'using' statements may cover more extensively than that in VS, which may increase the probability of errors. This requires coding conventions to constrain developers, such as avoiding class names defined by official sources and using class name extensions, for example, using 'System.IO.File' to avoid conflicts in namespace references.