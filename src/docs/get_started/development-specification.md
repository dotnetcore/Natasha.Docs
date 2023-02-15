---
title: "建议的封装规范"
---

## Natasha 封装规约

Natasha 有自己的封装规则，这可以让封装者思路更加清晰，并让作品更加容易维护。

<br/>

## 一个完整的 Operator

Operator 作为动态构建对外使用的操作类，一个 Operator 可大致由以下 3 部分组成：

- Template
- Builder
- Package / Extension

Template + Compiler => Builder
Package(Builder) + API + Extension => Operator  

<br/>

## 脚本构建器（Builder）

作为 Operator 最重要的核心部分，Builder 主要为 Operator 提供委托，可以从外部接收配置，可以在内部组合模板并进行编译。  
其大致分为两部分 Template 模板与 Compiler 编译器：

<br/>

- Template 构建模板
  使用 Template 模板构建运行时脚本字符串，模板对外暴漏 API 以方便使用者组成编译字符串。
  - UsingTemplat 是 Natasha 内置模板，提供了从命名空间到完整对象的代码构建。
  - DelegateTemplate 是 Natasha 内置模板，提供了方法代码的构建。

  - FieldTemplate 是 Natasha 内置模板，提供了字段代码的构建。

  - PropertyTemplate 是 Natasha 内置模板，提供了属性代码的构建。

<br/>  
     
   - Compiler 编译器
     
        编译器接收模板提供的字符串并进行编译，完成 Builder 的编译任务。
        
      - AssemblyCSharpBuilder  : 使用 Natasha 的 CSharp 编译器可以轻松的完成字符串的编译和元数据的提取。


<br/>

     直接使用 Natasha 内置的 Builder 可以快速实现定制，例如： OopBuilder<TOperator> ，MethodBuilder<TOperator>。
     前者为其提供对象构造模板，后者专注构建方法。

<br/>
     
## 操作类（Operator）

Operator 在 Builder 的基础上进行了 Package 封装，Operator 存储了 Builder 提供的编译结果，对外暴漏用户级别的 API 。
<br/>

#### 案例

例如 Natasha 内置的 [FastMethodOperator](https://github.com/dotnetcore/Natasha/blob/master/src/Natasha.CSharp/Natasha.CSharp.Template/Api/Level1/Operator/FastMethodOperator.cs) 在 [MethodBuilder](https://github.com/dotnetcore/Natasha/blob/master/src/Natasha.CSharp/Natasha.CSharp.Template/Builder/MethodBuilder.cs) 的基础上进行了包装和简化，FastMethodOpeartor 的初始化函数中定制了一个专属自己的脚本构建流程，如下模板翻译成 `public static` ：

```cs
this.Access(AccessFlags.Public)
.Modifier(ModifierFlags.Static);
```

