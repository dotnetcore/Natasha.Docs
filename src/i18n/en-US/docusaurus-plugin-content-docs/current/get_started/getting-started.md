---
title: "Get Started"
---

## Brief introduction

Natasha allows you to script interactions at runtime, create dynamic methods, typical scenarios such as type mapping, and make remote calls. Natasha 支持您在运行时进行脚本交互，创建动态方法，典型场景例如类型映射，远程调用。 如果您还没有用过此类的应用可以尝试一些例如 AutoMapper/Dapper/Json.net 之类的名库， 体验一下它们的快捷与方便，如果您继续深入探索便会发现一些 OpCodes 样式的代码,那便是用于动态构建的代码。 If you haven't already used apps like AutoMapper/Dapper/Json.net, experience their quickness and convenience, and if you continue to delve deeper you'll find some OpCodes-style code, that's the code for dynamic builds.

.NET 允许在你程序运行时，根据逻辑再次生成另外一些功能，从技术角度来看， 程序运行的周期大致如下，C# 代码，被编译成 IL 代码，被转化成本地指令， 当您的程序开始运行时，IL 代码变开始起了作用，并且 .NET 虚拟机支持你在运行时再次注入 IL 代码， 这有点像插件，在运行时加载到程序中运行。

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

## Installation

If your project is . NetCore project, then you can use Natasha .

- Command  
  `Install-Package DotNetCore.Natasha -xxxx`

- nuget  
  `DotNetCore.Natasha`

<br/>

## Preparations

You need to add some of the labels required for references to the project file：

```cs

  <PropertyGroup>

    <OutputType>Exe</OutputType>
    <TargetFramework>netcoreapp2.2</TargetFramework>

    //console/desktop as follows
    <PreserveCompilationContext>true</PreserveCompilationContext>

    //legacy WEB requires
    <MvcRazorExcludeRefAssembliesFromPublish>false</MvcRazorExcludeRefAssembliesFromPublish>

    //3.1 New WEB to add
    <PreserveCompilationReferences>true</PreserveCompilationReferences>
    //3.1 Can reference Razor's compilation service without the node above
    Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation

    // If you feel that there are too many folders about localization under the publishing folder, you can choose the following node
    //option：cs / de / es / fr / it / ja / ko / pl / ru / tr / zh-Hans / zh-Hant
    <SatelliteResourceLanguages>en</SatelliteResourceLanguages>

  </PropertyGroup>

```

<br/>

## The first HelloWorld

```cs

You need to prepare a string
string script s "Console.WriteLine" ("Hello World!");


// and then use
var action s NDomain.Random() like this. Delegate(script);
action();
action. DisposeDomain();

```

<br/>

## The second HelloWorld

```cs

Create a delegate within the NDomain1 domain
var func s NDomain.Create ("NDomain1"). Func<string>("return \"Hello World!\"; ");
func();
func. DisposeDomain();

```
