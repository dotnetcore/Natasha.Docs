---
title: 包说明
---

<br/>

### 域实现包

`DotNetCore.Natasha.DynamicLoad.Base` 包为编译单元与域的粘合接口包，自定义实现域并给 Natasha 编译单元用。

`DotNetCore.Natasha.Domain` Natasha 官方的 Core3.0+ 域操作包。

`Natasha.CSharp.Compiler.Domain` 继承自 `DotNetCore.Natasha.Domain` 并实现了 `DotNetCore.Natasha.DynamicLoad.Base` 编译粘合接口包。

## 编译单元包

`DotNetCore.Natasha.CSharp.Compiler` Natasha 基础编译单元包。

### 扩展包

`DotNetCore.Natasha.CSharp.Template.Core` 在编译单元基础上构建的模板编译包。

`DotNetCore.Natasha.CSharp.Extension.Ambiguity` 在编译单元基础上扩展的解决二义性引用的包。

`DotNetCore.Natasha.CSharp.Extension.Codecov` 在编译单元基础上扩展的统计动态程序集使用率的包。
