---
title: 使用必读
---

## Brief introduction

Natasha allows you to script interactions at runtime, create dynamic methods, typical scenarios such as type mapping, and make remote calls.
Natasha 支持您在运行时进行脚本交互，创建动态方法，典型场景例如类型映射，远程调用。 如果您还没有用过此类的应用可以尝试一些例如 AutoMapper/Dapper/Json.net 之类的名库， 体验一下它们的快捷与方便，如果您继续深入探索便会发现一些 OpCodes 样式的代码,那便是用于动态构建的代码。 If you haven't already used apps like AutoMapper/Dapper/Json.net, experience their quickness and convenience, and if you continue to delve deeper you'll find some OpCodes-style code, that's the code for dynamic builds.

.NET allows you to generate additional functionality again based on logic while your program is running, and from a technical point of view, the cycle of the program runs roughly as follows, the C#code, compiled into IL code, is converted to cost instructions, When your program starts running, the IL code starts to work, and the .NET virtual machine allows you to inject IL code again at runtime, It's a bit like a plug-in that loads into a program at runtime.

<br/>

## Scenario

Emit 和 表达式树的使用场景，Natasha 均适用。

<br/>

## Use groups

首先来说本类库并不是为初学者准备的，而是需要有一定的封装基础，有一定的动态编程经验的人。\
尽管 Natasha 入门十分简单，但如果您没有基础知识和经验的话还是不知道它能用在何处。

<br/>

## Install

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
