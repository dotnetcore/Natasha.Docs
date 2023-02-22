---
title: "7. Basic case"
---

## precondition

This article needs to have [使用必读] Basis of the chapter.

## Use groups

首先来说本类库并不是为初学者准备的，而是需要有一定的封装基础，有一定的动态编程技巧的人。  
尽管 Natasha 入门十分简单，但如果您没有基础知识和经验的话还是不知道它能用在何处。  
Although Natasha is easy to get started, you don't know where it can be used if you don't have the basics and experience.First of all, this class library is not for beginners, but needs to have a certain packaging basis, have a certain dynamic programming skills of people.  
Although Natasha is easy to get started, you don't know where it can be used if you don't have the basics and experience.  
Although Natasha is easy to get started, you don't know where it can be used if you don't have the basics and experience.

<br/>

## Version announcement

Please use DotNetCore.Natasha.CSharp stable.

<br/>

## The first HelloWorld

```cs

var action1 = NDelegate
        You can also use CreateDomain / UseDomain / DefaultDomain 
        . RandomDomain()
        //[可选API] Use ConfigBuilder to configure compilation units when necessary (the following is only to show the API, no practical meaning)
        . ConfigBuilder(builder => builder
            Use the Natasha path for output
            . UseNatashaFileOut()
            Configure compiler options
            . ConfigCompilerOption(opt => opt
                Configure the platform
                . SetPlatform(Microsoft.CodeAnalysis.Platform.AnyCpu)
                Compile in Release mode
                . CompileAsRelease()
                Turn on nullable warnings
                . SetNullableCompile(Microsoft.CodeAnalysis.NullableContextOptions.Warnings))
            Configure syntax options
            . ConfigSyntaxOptions(opt => opt
                Configure the supported scripting language versions
                . WithLanguageVersion(Microsoft.CodeAnalysis.CSharp.LanguageVersion.CSharp8))
            Disable semantic checking
            . DisableSemanticCheck()
            How assemblies with the same name are loaded after compilation compared to assemblies with the same name in the domain home domain
            . CompileWithAssemblyLoadBehavior(LoadBehaviorEnum.None)
            How to load if a reference with the same name is encountered in the main domain before compilation 
            . CompileWithReferenceLoadBehavior(LoadBehaviorEnum.UseCustom)
            )
        //[可选API] Configure the class template in which the method resides
        . ConfigClass(item => item
            Configure a name for the class, not an immediate name
            . Name("myClass")
            Using records within the domain are not used
            . NotLoadDomainUsing()
            The Using cache for the default domain is not used
            . NoGlobalUsing()
            )
        CONFIGURE A USING FOR THIS TEMPLATE
        . ConfigUsing("System")
        The API here refers to the defined delegate, including the parameters of the delegate
        For example, Action<int> / Func<int,int> There is a parameter, the name of the parameter is in Action<int> / Func<int,int> On F12 see definitions.
        . Action("Console.WriteLine(\"Hello World!\"); ");

action1();
action1. DisposeDomain();
```

<br/>

## The second HelloWorld

```cs
Asynchronous delegates
var action = NDelegate
           . RandomDomain()
           . AsyncFunc<Task>("Console.WriteLine(Thread.CurrentThread.ManagedThreadId);" )();

public static async void Test()
{
    await action();
}
```


<br/>

## The third HelloWorld

```cs

var @operator = FastMethodOperator.DefaultDomain();
var actionDelegate = @operator
                . Param(typeof(string), "parameter")
                . Body("Console.WriteLine(parameter);" )
                . Compile();

var action = (Action<string>)actionDelegate;
action("HelloWorld!");
action. DisposeDomain();
```

<br/>

## The fourth HelloWorld

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

## The fifth HelloWorld

```cs
Assemble the class template yourself
NClass nClass = NClass.DefaultDomain();
nClass
  . Namespace("MyNamespace")
  . Public()
  . Name("MyClass")
  . Ctor(ctor => ctor. Public(). Body("MyField=\"Hello\"; "))
  . Property(prop => prop
    . Type(typeof(string))
    . Name("MyProperty")
    . Public()
    . OnlyGetter("return \"World!\"; ")
  );


Add a method
MethodBuilder mb = new MethodBuilder();
mb
  . Public()
  . Override()
  . Name("ToString")
  . Body("return MyField+\" \"+MyProperty; ")
  . Return(typeof(string));
nClass.Method(mb);


Add fields
nClass.Field(fb => fb. Public()
  . Name("MyField")
  . Type<string>());



Dynamically call dynamically created classes
var action3 = NDelegate
  . RandomDomain()
  . ConfigUsing(nClass.GetType())
  . Action("Console.WriteLine((new MyClass()). ToString()); ");

action3();
action. DisposeDomain();
```


