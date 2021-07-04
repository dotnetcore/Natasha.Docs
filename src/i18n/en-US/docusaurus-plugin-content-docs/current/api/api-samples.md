---
title: "API usage is demonstrated"
---

- **NDomain**

```cs


NDomain supports：

// Common methods：      Func/Action
//asynchronous methods：      Async Func/Action
// Non-secure methods：    Unsafe Func/Action
// Non-secure asynchronous methods： ------ UnsafeAsync Func/Action



//------ create a domain (easy uninstall) ----//----- create func methods--------/
var func s NDomain.Create ("NDomain2"). Func<string,string>("return arg;" );
Assert.Equal("1", func("1"));
//Uninstallable
NDomain.Delete ("NDomain2");


NormalTestModel model = new NormalTestModel();
var func = NDomain.Create("NDomain6"). Action<NormalTestModel, int, int>("arg1. Age=arg2+arg3; ");
func(model,1,2);
Assert.Equal(3, model. Age);



Case 2：
var action s NDomain.Default(). UnsafeAsyncFunc<string, string, Task<string>>(@"
                            string result = arg1 +"" ""+ arg2;
                            Console.WriteLine(result);
                            return result; ");

string result = await action("Hello", "World1!");
//result = "Hello World1!"

```

#### OopOperator : [see UT Test](https://github.com/dotnetcore/Natasha/blob/master/test/NatashaUT/BuilderUT)

#### OopComplier :[ see UT Test](https://github.com/dotnetcore/Natasha/blob/master/test/NatashaUT/OopComplierTest.cs)

<br/>

<br/>

#### FastMethodOperator

  <br/>

- General customization

> Quickly customize a method

```cs
var action = FastMethodOperator.Default()
             . Param<string>("str1")
             . Param(typeof(string),"str2")
             . MethodBody("return str1+str2;" )
             . Return<Task<string>>()
             . Complie<Func<string,string,string>>();

var result = action("Hello ","World!");    result: "Hello World!"
```

<br/>

- 增强实现与异步支持 > `Complie<T>`方法会检测参数以及返回类型，如果其中有任何一处没有指定，那么 `Complie` 方法会使用自己默认的参数或者返回值进行填充, > 如果是 `Action<int>` 这种带有 1 个参数的，请使用"arg", 另外如果想使用异步方法，请使用 `UseAsync` 方法,或者 `AsyncFrom<Class>(methodName)`这两种方法。 > 返回的参数需要您指定 `Task<>`,以便运行时异步调用，记得外面那层方法要有 async 关键字哦。 > the parameters returned require you to specify `Task<>`so that the runtime calls asynchronously, remember that the outer layer of methods has the async keyword. > the parameters returned require you to specify `Task<>`so that the runtime calls asynchronously, remember that the outer layer of methods has the async keyword.

```cs
var delegateAction = FastMethodOperator.Random()

       . UseAsync()
       . MethodBody(@"
               await Task.Delay(100);
               string result = arg1 +"" ""+ arg2;
               Console.WriteLine(result);
               return result; ")

       . Complie<Func<string, string, Task<string>>>();

string result = await delegateAction?. Invoke("Hello", "World2!");   result: "Hello World2!"
```

<br/>
<br/>

#### DelegateOperator

> Enable delegates quickly and quickly

```cs

Define a delegate
public delegate string GetterDelegate (int value);



//Method One
var action . DelegateOperator<GetterDelegate>. Delegate("value += 101; return value. ToString(); ");
string result = action(1);
//result: "102"


```

<br/>
<br/>

#### FakeMethodOperator

> Quickly copy the method and implement it

```cs
public class Test
{
   public string Handler(string str)
   {
        retrurn null;
   }
}

```

```cs
var action = FakeMethodOperator.Default()
             . UseMethod(typeof(Test). GetMethod("Handler"))
             . StaticMethodContent(" str += "" is xxx;" ",return str; ")
             . Complie<Func<string,string>>();

string result = action("xiao");              result: "xiao is xxx;"
```

> [See UT test](https://github.com/dotnetcore/Natasha/blob/master/test/NatashaUT/DynamicMethodTest.cs#L96-L196)

<br/>
<br/>
