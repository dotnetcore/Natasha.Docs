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

Please use DotNetCore.Natasha.CSharp to consolidate the stable version.

<br/>

## The first HelloWorld

```cs

Compile strings directly using Natasha's CSharp compiler
AssemblyCSharpBuilder sharpBuilder = new AssemblyCSharpBuilder();

// Assign a random domain to the compiler
sharpBuilder.Compiler.Domain = DomainManagement.Random();

//Using file compilation mode
sharpBuilder.UseNatashaFileOut("c:/output");

// If the code compiles incorrectly, it is thrown and logged.
sharpBuilder.CompileFailedEvent += (compilation, errors) =>
{
    var errorLog = compilation. GetNatashaLog();
};


//Add your string
sharpBuilder.Add("using System; public static class Test{ public static void Show(){ Console.WriteLine(\"Hello World!\"); }}");
//Compile an assembly
var assembly = sharpBuilder.GetAssembly();


// If you want to get the type directly
var type = sharpBuilder.GetTypeFromShortName("Test");
//or
type = sharpBuilder.GetTypeFromFullName("xxNamespace.xxClassName");


// Create an Action delegate
// must be in the same domain, so specify the domain
// Write the calling script and throw in the assembly just now, which will automatically add a using reference
var action = NDelegate.UseDomain(sharpBuilder.Compiler.Domain). Action("Test.Show();" , assembly);

//Run, see Hello World!
action();

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
