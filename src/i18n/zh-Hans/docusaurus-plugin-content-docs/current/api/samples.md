---
title: "7. 基础案例"
---

## 前提

此篇需要有 [使用必读] 章节的基础.

## 使用群体

首先来说本类库并不是为初学者准备的，而是需要有一定的封装基础，有一定的动态编程技巧的人。  
尽管 Natasha 入门十分简单，但如果您没有基础知识和经验的话还是不知道它能用在何处。

<br/>

## 版本通告

请使用 DotNetCore.Natasha.CSharp 稳定版。

<br/>

## 第一个 HelloWorld

```cs

var action1 = NDelegate
        //使用随机域 也可以使用 CreateDomain / UseDomain / DefaultDomain 
        .RandomDomain()
        //[可选API] 必要时使用 ConfigBuilder 配置编译单元(下面只为展示API, 无实际意义)
        .ConfigBuilder(builder => builder
            //使用 Natasha 路径进行输出
            .UseNatashaFileOut()
            //配置编译器选项
            .ConfigCompilerOption(opt => opt
                //配置平台
                .SetPlatform(Microsoft.CodeAnalysis.Platform.AnyCpu)
                //Release 方式编译
                .CompileAsRelease()
                //开启可空警告
                .SetNullableCompile(Microsoft.CodeAnalysis.NullableContextOptions.Warnings))
            //配置语法选项
            .ConfigSyntaxOptions(opt => opt
                //配置支持的脚本语言版本
                .WithLanguageVersion(Microsoft.CodeAnalysis.CSharp.LanguageVersion.CSharp8))
            //禁用语义检查
            .DisableSemanticCheck()
            //编译完成之后的程序集, 相比域主域中同名程序集如何加载
            .CompileWithAssemblyLoadBehavior(LoadBehaviorEnum.None)
            //编译前如果在主域中遇到同名引用, 该如何加载 
            .CompileWithReferenceLoadBehavior(LoadBehaviorEnum.UseCustom)
            )
        //[可选API] 配置该方法所在的类模板
        .ConfigClass(item => item
            //给类配置一个名字,不用随即名
            .Name("myClass")
            //不使用域内的 Using 记录
            .NotLoadDomainUsing()
            //不使用默认域的 Using 缓存
            .NoGlobalUsing()
            )
        //为这个模板配置一个 USING
        .ConfigUsing("System")
        //这里的API 参照定义的委托, 包括委托的参数
        //例如 Action<int> / Func<int,int> 拥有一个参数, 参数的名字请在 Action<int> / Func<int,int> 上F12 查看定义.
        .Action("Console.WriteLine(\"Hello World!\");");

action1();
action1.DisposeDomain();
```

<br/>

## 第二个 HelloWorld

```cs
//异步委托
var action = NDelegate
           .RandomDomain()
           .AsyncFunc<Task>("Console.WriteLine(Thread.CurrentThread.ManagedThreadId);")();

public static async void Test()
{
    await action();
}
```


<br/>

## 第三个 HelloWorld

```cs

var @operator = FastMethodOperator.DefaultDomain();
var actionDelegate = @operator
                .Param(typeof(string), "parameter")
                .Body("Console.WriteLine(parameter);")
                .Compile();

var action = (Action<string>)actionDelegate;
action("HelloWorld!");
action.DisposeDomain();
```

<br/>

## 第四个 HelloWorld

```cs

var hwFunc = FastMethodOperator
                .RandomDomain()
                .Param(typeof(string), "str1")
                .Param<string>("str2")
                .Body("return str1+str2;")
                .Return<string>()
                .Compile<Func<string, string, string>>();
Console.WriteLine(hwFunc("Hello"," World!"));

```

## 第五个 HelloWorld

```cs
//自己组装类模板
NClass nClass = NClass.DefaultDomain();
nClass
  .Namespace("MyNamespace")
  .Public()
  .Name("MyClass")
  .Ctor(ctor => ctor.Public().Body("MyField=\"Hello\";"))
  .Property(prop => prop
    .Type(typeof(string))
    .Name("MyProperty")
    .Public()
    .OnlyGetter("return \"World!\";")
  );


//添加方法
MethodBuilder mb = new MethodBuilder();
mb
  .Public()
  .Override()
  .Name("ToString")
  .Body("return MyField+\" \"+MyProperty;")
  .Return(typeof(string));
nClass.Method(mb);


//添加字段
nClass.Field(fb => fb.Public()
  .Name("MyField")
  .Type<string>());



//动态调用动态创建的类
var action3 = NDelegate
  .RandomDomain()
  .ConfigUsing(nClass.GetType())
  .Action("Console.WriteLine((new MyClass()).ToString());");

action3();
action.DisposeDomain();
```


