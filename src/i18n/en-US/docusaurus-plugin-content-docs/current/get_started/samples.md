---
title: "Case"
---

## precondition

This article needs to have a basic [使用必读] chapter.

## Use groups

首先来说本类库并不是为初学者准备的，而是需要有一定的封装基础，有一定的动态编程技巧的人。  
尽管 Natasha 入门十分简单，但如果您没有基础知识和经验的话还是不知道它能用在何处。  
Although Natasha is easy to get started, you don't know where it can be used if you don't have the basics and experience.First of all, this class library is not for beginners, but needs to have a certain packaging basis, have a certain dynamic programming skills of people.  
Although Natasha is easy to get started, you don't know where it can be used if you don't have the basics and experience.  
Although Natasha is easy to get started, you don't know where it can be used if you don't have the basics and experience.

<br/>

## Version announcement

Please use the stable version of DotNetCore.Natasha.CSharp.

<br/>

## The first HelloWorld

```cs

var action1 = NDelegate
        //Use random domains Can also use CreateDomain / UseDomain / DefaultDomain 
        . RandomDomain()
        //[可选API] Configure the compilation unit using ConfigBuilder if necessary (below is just to show the API, meaningless)
        . ConfigBuilder(builder => builder
            //Output using Natasha path
            . UseNatashaFileOut()
            //Configure Compiler Options
            . ConfigCompilerOption(opt => opt
                //configure platform
                . SetPlatform (Microsoft.CodeAnalysis.Platform.AnyCpu) compiled
                //Release
                . CompileAsRelease()
                //Open nullable warning
                . SetNullableCompile(Microsoft.CodeAnalysis.NullableContextOptions.Warnings))
            //Configuration Syntax Options
            . ConfigSyntaxOptions(opt => opt
                //configure supported scripting language versions
                . WithLanguageVersion (Microsoft.CodeAnalysis.CSharp.LanguageVersion.CSharp8))
            //Disable Semantic Checking
            . DisableSemanticCheck()
            //how assemblies after compilation is complete, compared to how assemblies of the same name in the domain master domain are loaded
            . CompileWithAssemblyLoadBehavior(LoadBehaviorEnum.None) Before
            compiling //,if you encounter a reference with the same name in the main domain, how to load the 
            . CompileWithReferenceLoadBehavior(LoadBehaviorEnum.UseCustom)
            )
        //[可选API] Configure the class template in which the method is located
        . ConfigClass(item => item
            // configure a name for the class without following the name
            . Name("myClass")
            //Do not use using using records within the domain
            . NotLoadDomainUsing()
            //Using cache without default domain
            . NoGlobalUsing()
            )
        // Configure a USING
        for this template . ConfigUsing("System")
        // Here the API refers to the defined delegate, including the delegate's parameters
        // e.g. Action<int> / Func<int,int> has a parameter, the name of the parameter can be viewed on the Action<int> / Func<int,int> F12 to view the definition.
        . Action("Console.WriteLine(\"Hello World!\"); ");

action1();
action1. DisposeDomain();
```

<br/>

## The second HelloWorld

```cs
Asynchronous delegate
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


//Add Method
MethodBuilder mb = new MethodBuilder();
mb
  . Public()
  . Override()
  . Name("ToString")
  . Body("return MyField+\" \"+MyProperty; ")
  . Return(typeof(string));
nClass.Method(mb);


//Add field
nClass.Field(fb => fb. Public()
  . Name("MyField")
  . Type<string>());



//dynamically calls dynamically created classes
var action3 = NDelegate
  . RandomDomain()
  . ConfigUsing(nClass.GetType())
  . Action("Console.WriteLine((new MyClass()). ToString()); ");

action3();
action. DisposeDomain();
```


