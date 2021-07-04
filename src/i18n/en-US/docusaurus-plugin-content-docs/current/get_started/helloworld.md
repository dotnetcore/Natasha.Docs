---
title: "Hello world"
---

## Brief introduction

Natasha allows you to script interactions at runtime, create dynamic methods, typical scenarios such as type mapping, and make remote calls. Natasha 支持您在运行时进行脚本交互，创建动态方法，典型场景例如类型映射，远程调用。 如果您还没有用过此类的应用可以尝试一些例如 AutoMapper/Dapper/Json.net 之类的名库， 体验一下它们的快捷与方便，如果您继续深入探索便会发现一些 OpCodes 样式的代码,那便是用于动态构建的代码。 If you haven't already used apps like AutoMapper/Dapper/Json.net, experience their quickness and convenience, and if you continue to delve deeper you'll find some OpCodes-style code, that's the code for dynamic builds.

.NET allows you to generate additional functionality again based on logic while your program is running, and from a technical point of view, the cycle of the program runs roughly as follows, the C#code, compiled into IL code, is converted to cost instructions, When your program starts running, the IL code starts to work, and the .NET virtual machine allows you to inject IL code again at runtime, It's a bit like a plug-in that loads into a program at runtime.

<br/>

## scenario

Both Emit and Expression Tree use scenarios, Natasha, apply.

<br/>

## Use groups

首先来说本类库并不是为初学者准备的，而是需要有一定的封装基础，有一定的动态编程技巧的人。  
尽管 Natasha 入门十分简单，但如果您没有基础知识和经验的话还是不知道它能用在何处。  
Although Natasha is easy to get started, you don't know where it can be used if you don't have the basics and experience.First of all, this class library is not for beginners, but needs to have a certain packaging basis, have a certain dynamic programming skills of people.  
Although Natasha is easy to get started, you don't know where it can be used if you don't have the basics and experience.  
Although Natasha is easy to get started, you don't know where it can be used if you don't have the basics and experience.

<br/>

## Version announcement

Use DotNetCore.Natasha.CSharp.All v2.0.0.0 Consolidated Stability.

<br/>

## Preparations

- Introduce a packaged dynamic build library： DotNetCore.Natasha.CSharp.All

- Initialization operation：

  ```cs
  Register components only
  NatashaInitializer.Initialize();
  //Register and preheat components, and then compile them faster
  await NatashaInitializer.InitialIzeAndPreheating ();
  ```

- Knock the code

<br/>

## The first HelloWorld

```cs

Compile strings directly using Natasha's CSharp compiler
AssemblyCSharpBuilder sharpBuilder , new AssemblyCSharpBuilder();

// Assign the compiler a random domain
sharpBuilder.Compiler.Domain s domainmanagement.Random;

// Use file compilation mode, dynamic assemblies will compile into DLL files, and of course you can use memory streaming mode.
sharpBuilder.UseFileCompile();

// If the code compiles incorrectly, throw and log.
sharpBuilder.ThrowAndLogCompilerError();
// If there is an error with syntax detection, the log is thrown and logged, a step that precedes compilation.
sharpBuilder.ThrowAndLogSyntaxError();


//Add your string
sharpBuilder.Add ("using System; public static class Test{ public static void Show(){ Console.WriteLine(\"Hello World!\"); }}");
//compile an assembly
var assembly s sharpBuilder.GetAssembly();


//If you want to get directly to type
var type s sharpBuilder.GetTypeFromShortName ("Test");
type = sharpBuilder.GetTypeFromFullName("xxNamespace.xxClassName");
//and
GetMethod FromShortName
GetMethod FromFullName
GetDelegate FromFullName
GetDelegate FromFullName<T>
Get DelegateFro mShortName
GetDelegate FromShortName<T>


// Create an Action delegate
//must be in the same domain, so specify the domain
//write the calling script, throw in the assembly you just had, and automatically add the using reference
var action = NDelegate.UseDomain(sharpBuilder.Compiler.Domain). Action("Test.Show();" , assembly);

//Run and see Hello World!

```

<br/>

## The second HelloWorld

```cs

Create a delegate in the MyDomain domain
var var func s nDelegate.CreateDomain ("MyDomain"). Func<string>("return \"Hello World!\"; ");
Console.WriteLine(func());
func. DisposeDomain();

```

<br/>

## The third HelloWorld

```cs

Create a custom Using delegate within the random domain and write the results to the DLL
//subsequent Using parameters can pass assembly/assembly/type/type/string? /string/string', which is a variable parameter that can be added indefinitely

var func sdal negate.RandomDomain (
builder->builder
  . CustomUsing()
  . UseFileCompile()
  ). Func<string>("return \"Hello World!\"; ", typeof(string));
Console.WriteLine(func());
func.

```

```cs
Asynchronous delegates
public static async void Test()

    await NDelegate
           . RandomDomain()
           . AsyncFunc<Task>("Console.WriteLine(Thread.CurrentThread.ManagedThreadId);" )();
}
```

<br/>

## The fourth HelloWorld

```cs

var @operator = FastMethodOperator.DefaultDomain();
var actionDelegate = @operator
                . Param(typeof(string), "parameter")
                . Body("Console.WriteLine(parameter);" )
                . Compile();

//Run
Delegate.DynamicInvoke("HelloWorld!");
actionDelegate.DisposeDomain();

// or so
var action .<string>) actionDelegate;
action("HelloWorld!");
action.
```

<br/>

## The fifth HelloWorld

```cs
Class
NClass nClass s NClass.DefaultDomain();
nClass
  . Namespace("MyNamespace")
  . Name("MyClass")
  . Ctor(ctor=>ctor. Public(). Body("MyField=\"Hello\"; "))
  . Property(prop => prop
    . Type(typeof(string))
    . Name("MyProperty")
    . Public()
    OnlyGetter("return \"World!\"; ")
  );


//Add method (prior to 3.4.00, please refer to the API of the above properties)
MethodBuilder mb Method s newBuilder();
mb
  . Override()
  . Name("ToString")
  . Body("return MyField+\" \"+MyProperty; ")
  . Return(typeof(string));
 nClass.Method(mb);


//Add fields (prior to 3.4.00, please refer to the API of the above properties)
FieldBuilder fb s nClass.GetFieldBuilder();
fb. Name("MyField")
  . Type<string>();


//dynamic calls dynamically created classes
var action s NDelegate
  . RandomDomain()
  . Action("Console.WriteLine((new MyClass()). ToString()); ", nClass.GetType());

action();
action.
```

## The sixth HelloWorld

```cs

var hwFunc = FastMethodOperator
                . RandomDomain()
                . Param(typeof(string), "str1")
                . Param<string>("str2")
                . Body("return str1+str2;" )
                . Return<string>()
                . Compile<Func<string, string, string>>();
Console.WriteLine(hwFunc("Hello"," World!"));

```
