---
title: "项目简介"
description: "Natasha 助您便利地动态调用代码"
slug: /
---

# Natasha

[![Member project of .NET Core Community](https://img.shields.io/badge/member%20project%20of-NCC-9e20c9.svg)](https://github.com/dotnetcore)
[![Badge](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu/#/zh_CN)
[![GitHub license](https://img.shields.io/github/license/dotnetcore/natasha.svg)](https://github.com/dotnetcore/Natasha/blob/master/LICENSE)

基于 [Roslyn](https://github.com/dotnet/roslyn) 的 C# 动态程序集构建库，该库允许开发者在运行时使用 C# 代码构建域 / 程序集 / 类 / 结构体 / 枚举 / 接口 / 方法等，使得程序在运行的时候可以增加新的模块及功能。Natasha 集成了域管理/插件管理，可以实现域隔离，域卸载，热拔插等功能。 该库遵循完整的编译流程，提供完整的错误提示， 可自动添加引用，完善的数据结构构建模板让开发者只专注于程序集脚本的编写，兼容 netcoreapp2.0+ / netcoreapp3.0+, 跨平台，统一、简便的链式 API。 且我们会尽快修复您的问题及回复您的 [issue](https://github.com/dotnetcore/Natasha/issues/new).

![Console动态生成类型](/images/console.gif)

![创建Controller并删除](/images/create_controller_deletion.gif)
