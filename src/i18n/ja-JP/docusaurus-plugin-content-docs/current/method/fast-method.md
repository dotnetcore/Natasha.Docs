---
title: "fast 方法"
---

## 域操作

```cs
FastMethodOperator.Default             //系统域
FastMethodOperator.Create("MyDomain")  //创建一个新的独立域
FastMethodOperator.Random()            //使用一个随机域

//如果方法里传 bool 类型则可以告诉编译器，是否编译成DLL文件，默认是编译到内存。
```

<br/>

## 构建方式

FastMethodOperator 操作类中，构造函数里制作了一个默认的模板：

```cs
HiddenNameSpace()
.OopAccess(AccessTypes.Public)
.OopModifier(Modifiers.Static)
.MethodAccess(AccessTypes.Public)
.MethodModifier(Modifiers.Static);
```

1. 隐藏了命名空间。
1. 类的访问级别为公有。
1. 类的修饰符为静态，
1. 方法的访问级别为共有。
1. 方法的修饰符为静态

<br/>

## 期望结果

模板的样子翻译成字符串为：

```cs

using xxx;
public static class xxx
{
    public static xx NatashaDynamicMethod(xxx)
    {
       //content
    }
}

```

<br/>

## 自动定制

以上的结果可以看出，`xxx`的内容可能需要由自己来定制。Natasha 考虑到这种情况，在模板中实现了‘自实现’功能。

- className:

  在类模板中，类名初始化会被随机创建，如下：`OopNameScript = "N" + Guid.NewGuid().ToString("N");`, 类名将自动以 GUID 的形式创建。

- returnType/params:

  在 FastMethodOperator 中重写了 `Complie<T>`方法，以便在父类（builder）编译前对返回值和参数进行检查处理，重度懒癌患者甚至懒得写返回值和参数，那么 Natasha 为此提供了返回值和参数解析的功能。

<br/>

## 为什么不自动实现 Using

- 难以确定的二义性引用，二义性这个问题我不想再多解释了。
- 制作命名空间映射表，这个代价是巨大的，并还需要解决二义性。
- 编程的严谨性，任何编译型语言都是强约束的，它们有自己的规则和特性，不管您是用 EMIT 还是表达式树，元数据都是不可缺少的， Natasha 虽然不用你再去写指令及元数据，但起码的命名空间还是需要您来保障的。

<br/>

## 随意定制

Natasha 的模板都是写活的，Builder 都十分的灵活，因此您可以不用拘泥于 FastMethodOperator 的模板，在使用时根据自己的场景进行定制。

例如： `Operator.OopAccess(AccessTypes.Internal);`这将覆盖原有的 OopAccess 函数功能。

<br/>

## 案例

```cs

 var script =  FastMethodOperator.Default
               .Param<string>("str1")
               .Param<string>("str2")
               .MethodBody(@"
                   string result = str1 +"" ""+ str2;
                   Console.WriteLine(result);
                   return result;")
               .Return<string>()
               .Builder()
               .MethodScript;


/*可以看到生成的代码：
public static string NatashaDynamicMethod(String str1, String str2)
{
     string result = str1 +" "+ str2;
     Console.WriteLine(result);
     return result;
}*/

```

您还可以在. 之后找到 UseAsync/UseUnsafe 等方法，它们可以让您定制更加丰富的功能。 这里有个有趣的地方，如果您去看过 Natasha 的 CI 过程的测试会发现，日志中有很多“Hello World”, 这些就是在动态方法中输出的 hello world,在测试的时候被输出出来了。
