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

Emit 和 表达式树的使用场景，Natasha 均适用。

<br/>

## 使用群体

首先来说本类库并不是为初学者准备的，而是需要有一定的封装基础，有一定的动态编程经验的人。  
尽管 Natasha 入门十分简单，但如果您没有基础知识和经验的话还是不知道它能用在何处。

<br/>

## 安装

### NUGET 引入

#### DotNetCore.Natasha.CSharp.Template 

该包为完整的动态编译包，包括动态编译单元+动态编译模板，其中，动态编译模板功能是使用链式方法构建脚本字符串，后交由动态编译单元编译。

#### DotNetCore.Natasha.CSharp.Compiler

动态编译为 Natasha 核心库，提供了最基本的动态编译功能，并提供了丰富的配置选项。

<br/>

## 用前必看

1. Natasha 当前版本将不在自动包含“程序集引用包”,若需要覆盖动态编译所需的环境，请引入`DotNetCore.Compile.Environment`包.
2. Natasha 生成文件较多可以在项目文件中增加 `<SatelliteResourceLanguages>en</SatelliteResourceLanguages>` 来指定默认的资源语言.
3. 可选预热: `NatashaManagement/NatashaInitializer.Preheating();` 选择任何一个类初始化都可以，请一定看预热篇,并学习如何配置预热.

<br/>

