---
title: "Fast method"
---

## The domain operation

```cs
FastMethodOperator.Default//System Domain
FastMethodOperator.Create ("MyDomain")//Create a new stand-alone domain
FastMethodOperator.Random()//Use a random domain

//If the bool type is passed in the method, you can tell the compiler whether to compile into a DLL file, which is compiled to memory by default.
```

<br/>

## How it's built

In the FastMethodOperator operation class, a default template is made in the constructor：

```cs
HiddenNameSpace()
. OopAccess(AccessTypes.Public)
. OopModifier(Modifiers.Static)
. MethodAccess(AccessTypes.Public)
. MethodModifier(Modifiers.Static);
```

1. The namespace is hidden.
1. The class's access level is public.
1. The modifier of the class is static,
1. The access level of the method is common.
1. The modifier of the method is static

<br/>

## Expect results

The look of the template translates into a string of：

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

## Auto-customized

以上的结果可以看出，`xxx`的内容可能需要由自己来定制。Natasha 考虑到这种情况，在模板中实现了‘自实现’功能。Natasha takes this into account and implements the 'self-implementation' feature in the template.Natasha takes this into account and implements the 'self-implementation' feature in the template.

- className:

  In the class template, the initialization of the class name is randomly created, as follows：`opNameScript s "N" and Guid.NewGuid(). ToString("N");`, the class name is automatically created as a GUID.

- returnType/params:

  Natasha provides the ability to return values and parameters by rewriting the `Complie<T>`method in FastMethodOperator to examine and process return values and parameters before the parent class compiles, and severe lazy cancer patients are not even bothered to write return values and parameters.

<br/>

## Why not implement Using automatically

- Difficult to determine the ambiguity reference, ambiguity this problem I do not want to explain more.
- Making namespace mapping tables is costly and requires addressing ambiguity.
- 编程的严谨性，任何编译型语言都是强约束的，它们有自己的规则和特性，不管您是用 EMIT 还是表达式树，元数据都是不可缺少的， Natasha 虽然不用你再去写指令及元数据，但起码的命名空间还是需要您来保障的。

<br/>

## Feel free to customize

Natasha's templates are live and Builder is flexible, so you can customize them to your own scenario without having to stick to FastMethodOperator templates.

例如： `Operator.OopAccess(AccessTypes.Internal);`这将覆盖原有的 OopAccess 函数功能。

<br/>

## Case

```cs

 var script = FastMethodOperator.Default
               . Param<string>("str1")
               . Param<string>("str2")
               . MethodBody(@"
                   string result = str1 +"" ""+ str2;
                   Console.WriteLine(result);
                   return result; ")
               . Return<string>()
               . Builder()
               . MethodScript;


/?can see the generated code：
public static string Natasha DynamicMethod (String str1, String str2)
s
     string results s str1 s"
     Console.WriteLine(result);
     return result;
}*/

```

您还可以在. 之后找到 UseAsync/UseUnsafe 等方法，它们可以让您定制更加丰富的功能。 这里有个有趣的地方，如果您去看过 Natasha 的 CI 过程的测试会发现，日志中有很多“Hello World”, 这些就是在动态方法中输出的 hello world,在测试的时候被输出出来了。
