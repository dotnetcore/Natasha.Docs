---
title: 11. 使用 MethodCreator 的扩展
---

## 介绍

MethodCreator 扩展库允许开发者快速构建动态委托。

## 使用方法

1. 引入 `DotNetCore.Natasha.CSharp.Extension.MethodCreator` 扩展包。
2. 编码。

### 共分为两种模式

#### 精简构造模式

精简构造模式需要自己管理元数据和using

```cs
 var func = "return arg1 + arg2 + 0.1;"
    .WithMetadata<double>()
    .ToFunc<double, double, double>();
```

#### 智能构造模式

智能构造模式将自动覆盖元数据和 using

```cs
 var func = "return arg1 + arg2 + 0.1;"
    .ToFunc<double, double, double>();
```

<br/>
<br/>
