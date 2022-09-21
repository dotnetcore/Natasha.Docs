---
title: "Use required reading"
---

## Brief introduction

Natasha allows you to script interactions at runtime, create dynamic methods, typical scenarios such as type mapping, and make remote calls. Natasha 支持您在运行时进行脚本交互，创建动态方法，典型场景例如类型映射，远程调用。 如果您还没有用过此类的应用可以尝试一些例如 AutoMapper/Dapper/Json.net 之类的名库， 体验一下它们的快捷与方便，如果您继续深入探索便会发现一些 OpCodes 样式的代码,那便是用于动态构建的代码。 If you haven't already used apps like AutoMapper/Dapper/Json.net, experience their quickness and convenience, and if you continue to delve deeper you'll find some OpCodes-style code, that's the code for dynamic builds.

.NET 允许在你程序运行时，根据逻辑再次生成另外一些功能，从技术角度来看， 程序运行的周期大致如下，C# 代码，被编译成 IL 代码，被转化成本地指令， 当您的程序开始运行时，IL 代码变开始起了作用，并且 .NET 虚拟机支持你在运行时再次注入 IL 代码， 这有点像插件，在运行时加载到程序中运行。

<br/>

## scenario

Both Emit and Expression Tree use scenarios, Natasha, apply.

<br/>

## Use groups

First of all, this class library is not for beginners, but needs to have a certain packaging basis, have a certain degree of dynamic programming experience of people.First of all, this class library is not for beginners, but needs to have a certain packaging basis, have a certain dynamic programming skills of people.  
Although Natasha is easy to get started, you don't know where it can be used if you don't have the basics and experience.  
Although Natasha is easy to get started, you don't know where it can be used if you don't have the basics and experience.

<br/>

## Installation

If your project is . NetCore project, then you can use Natasha .

- Command  
  `Install-Package DotNetCore.Natasha.CSharp -Version xxxx`

- nuget  
  `DotNetCore.Natasha.CSharp`

<br/>

## A must see before use

1. Natasha supports lightweight compilation starting at 4.2.0.0, if you need to override all references, please introduce the`DotNetCore.Compile.Environment`package.
2. The more Natasha make files can be added to the project file `<SatelliteResourceLanguages>en</SatelliteResourceLanguages>` to specify the default resource language.
3. Natasha must be warmed up before use: `NatashaManagement/NatashaInitializer.Preheating();` select any one of the classes to initialize.

<br/>

## The first HelloWorld

```cs

You need to prepare a string
string script = "Console.WriteLine(\"Hello World!\"); ";


// then use
var action like this = NDomain.RandomDomain(). Delegate(script);
action();  

// If you will not use action again in the future, you can uninstall
action. DisposeDomain();

```

<br/>

## The second HelloWorld

```cs

Create a delegate within the NDomain1 domain
var func = NDomain.CreateDomain ("NDomain1"). Func<string>("return \"Hello World!\"; ");
func();
func. DisposeDomain();

```
