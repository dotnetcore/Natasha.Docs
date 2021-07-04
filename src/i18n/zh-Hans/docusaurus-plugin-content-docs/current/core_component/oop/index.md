---
title: "enum"
---

## 构建数据

我们常用存储结构包括各种类、结构体、接口、枚举，Natasha 支持开发者动态的构建这些类型。
由于以上几种类型在命名空间的包裹中，有些共性，而且都可以独立存在于命名空间中。
经过抽象之后，Natasha 统一采用 OopBuilder 操作进行 4 种结构的构建。

OopBuilder 是由 OopContentTemplate 以及 OopComplier 组成的。

- Template 负责脚本字符串的构建工作。
- Complier 负责字符串的编译及异常搜集工作。

按照 Natasha 的封装规约，Builder 是不宜直接交给用户使用的，对外交付的应该是 Operator 操作类，因此 Natasha 使用了 OopOperator 操作类包裹了 OopBuilder,
尽管 OopOperator 没有进行任何操作和调用，但它仍然是有意义的，意义就是对接用户。

```cs
public class OopOperator : OopBuilder<OopOperator>
{

   public OopOperator()
   {
       Link = this;
   }

}

```

## 结构分解

如图，一个完整的结构，将被拆分成以下几部分：

![Struction](https://github.com/dotnetcore/Natasha/blob/master/Image/OopStruct.png)

此图右边批注对应的是 Natasha 中模板的方法，您只需要`.`然后根据提示找到方法即可。

> 同一行的批注，代码从左到右，方法从上到下。
