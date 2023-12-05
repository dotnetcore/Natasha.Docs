---
title: "使用必读"
---

## 简介

Natasha 支持您在运行时进行脚本交互，创建动态方法，典型场景例如类型映射，远程调用。
如果您还没有用过此类的应用可以尝试一些例如 AutoMapper/Dapper/Json.net 之类的名库，
体验一下它们的快捷与方便，如果您继续深入探索便会发现一些 OpCodes 样式的代码,那便是用于动态构建的代码。

.NET 允许在你程序运行时，根据逻辑再次生成另外一些功能，从技术角度来看，
程序运行的周期大致如下，C# 代码，被编译成 IL 代码，被转化成本地指令，
当您的程序开始运行时，IL 代码便开始起了作用，并且 .NET 虚拟机支持你在运行时再次注入 IL 代码，
这有点像插件，在运行时加载到程序中运行。

<br/>

## 场景

Emit 和表达式树的使用场景，Natasha 均适用。

<br/>

## 使用群体

首先来说本类库并不是为初学者准备的，而是需要有一定的封装基础，有一定的动态编程经验的人。  
尽管 Natasha 入门十分简单，但如果您没有基础知识和经验的话还是不知道它能用在何处。

<br/>

## 安装

如果您的项目是 .NetCore 项目，那么您可以使用 Natasha .

- 命令  
  `Install-Package DotNetCore.Natasha.CSharp -Version xxxx`

- nuget  
  `DotNetCore.Natasha.CSharp`

<br/>

## 用前必看

1. Natasha 自 4.2.0.0 起开始支持轻量化编译,如果需要覆盖全部引用,请引入`DotNetCore.Compile.Environment`包.
2. Natasha 生成文件较多可以在项目文件中增加 `<SatelliteResourceLanguages>en</SatelliteResourceLanguages>` 来指定默认的资源语言.
3. Natasha 使用前必须预热: `NatashaManagement/NatashaInitializer.Preheating();` 选择任何一个类初始化都可以.

<br/>

## 第一个 HelloWorld

```cs

//你需要准备一个字符串
string script = "Console.WriteLine(\"Hello World!\");";


//然后像这样用
var action = NDelegate.RandomDomain().Delegate<Action>(script);
action();  

//如果以后都不会再用 action 可以卸载
action.DisposeDomain();

```

<br/>

## 第二个 HelloWorld

```cs

//在 NDomain1 域内创建一个委托
var func = NDelegate.CreateDomain("NDomain1").Func<string>("return \"Hello World!\";");
func();
func.DisposeDomain();

```
