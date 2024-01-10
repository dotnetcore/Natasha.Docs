---
title: "2. 模板 API 用法展示(未更新)"
---


- **引入**

NUGET `DotNetCore.Natasha.CSharp`
预热:
```C#
NatashaInitializer.Preheating();
```


- **NDelegate**

```cs 
//NDelegate 支持：

// 普通方法：      Func/Action
// 异步方法：      Async Func/Action
// 非安全方法：    Unsafe Func/Action
// 非安全异步方法： UnsafeAsync Func/Action

var func = NDelegate
  //创建域
  .CreateDomain("NDomain2")    
  //在域中创建 Func<string,int> 方法, 参数与系统定义的 Func<T1,T> 参数名一样.
  .Func<string,int>("return arg.Length;"); 

Assert.Equal(3, func("abc"));
//卸载
DomainManagement.Remove("NDomain2");
```

或者

```cs
//或者
var func = NDelegate
    //使用随机域
    .RandomDomain()
    //忽略第一个参数调用实例
    .WithFirstArgInvisible()
    //在域中创建 Func<string,int> 方法, 参数与系统定义的 Func<T1,T> 参数名一样.
    .Func<string,int>("return Length;"); 

Assert.Equal(3, func("abc"));
//卸载
func.DisposeDomain();
```

```cs
NormalTestModel model = new NormalTestModel();
var func = NDelegate
  .CreateDomain("NDomain6")
  .Action<NormalTestModel, int, int>("arg1.Age=arg2+arg3;");
func(model,1,2);
Assert.Equal(3, model.Age);
```

案例2：
```cs
var action = NDelegate
  .DefaultDomain()
  .UnsafeAsyncFunc<string, string, Task<string>>(@"
      string result = arg1 +"" ""+ arg2;
      await Task.Delay(1000);
      Console.WriteLine(result);
      return result;");

string result = await action("Hello", "World1!");
//result = "Hello World1!"
```

<br/>

<br/>

#### FastMethodOperator

  <br/>

- 普通定制

> 快速定制一个方法

```cs
var action = FastMethodOperator.DefaultDomain()
             .Param<string>("str1")
             .Param(typeof(string),"str2")
             .Body("return str1+str2;")
             .Return<string>()
             .Complie<Func<string,string,string>>();

var result = action("Hello ","World!");    //result:   "Hello World!"
```

<br/>


```cs
var delegateAction = FastMethodOperator.Random()

       .Async()
       //如果不指定Param 和 Return 则默认使用 Func<string,string,Task<string>> 系统定义的参数名, F12 可看
       .Body(@"
               await Task.Delay(100);
               string result = arg1 +"" ""+ arg2;
               Console.WriteLine(result);
               return result;")

       .Complie<Func<string, string, Task<string>>>();

string result = await delegateAction?.Invoke("Hello", "World2!");   //result:   "Hello World2!"
```

<br/>
<br/>

#### DelegateOperator

> 快速快速实现委托

```cs

//定义一个委托
public delegate string GetterDelegate(int value);

//方法一
var action = NDelegate.RandomDomain().Delegate<GetterDelegate>("value += 101; return value.ToString();");
string result = action(1);
//result: "102"
```

<br/>
<br/>

#### FakeMethodOperator

> 快速复制方法并实现

```cs
public class Test
{
   public string Handler(string str)
   {
        return null;
   }
}
```

```cs
var action = FakeMethodOperator.RandomDomain()
             .UseMethod(typeof(Test).GetMethod("Handler"))
             .StaticMethodContent(" str += \"hello\";return str; ")
             .Complie<Func<string,string>>();

string result = action("xiao");
//result: "hello"              
```

<br/>
<br/>
