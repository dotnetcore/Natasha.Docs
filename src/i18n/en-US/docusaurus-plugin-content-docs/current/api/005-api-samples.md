---
title: "5. Other API usage display"
---


- **induct**

NUGET `DotNetCore.Natasha.CSharp` Preheat:
```C#
NatashaInitializer.Preheating();
```


- **NDomain**

```cs 
NDelegate support：

Normal method：      Func/Action
Asynchronous methods：      Async Func/Action
Non-secure methods：    Unsafe Func/Action
Non-secure asynchronous methods： UnsafeAsync Func/Action

var func = NDelegate
  Create a domain
  . CreateDomain("NDomain2")    
  Create a func in your domain<string,int> methods, parameters, and system-defined func<T1,T> The parameter names are the same.
  . Func<string,int>("return arg. Length; "); 

Assert.Equal(3, func("abc"));
unload
DomainManagement.Remove("NDomain2");
```

or

```cs
or
var func = NDelegate
    Use a random field
    . RandomDomain()
    The first parameter is ignored to call the instance
    . WithFirstArgInvisible()
    Create a func in your domain<string,int> methods, parameters, and system-defined func<T1,T> The parameter names are the same.
    . Func<string,int>("return Length;" ); 

Assert.Equal(3, func("abc"));
unload
func. DisposeDomain();
```

```cs
NormalTestModel model = new NormalTestModel();
var func = NDelegate
  . CreateDomain("NDomain6")
  . Action<NormalTestModel, int, int>("arg1. Age=arg2+arg3; ");
func(model,1,2);
Assert.Equal(3, model. Age);
```

Case 2：
```cs
var action = NDelegate
  . DefaultDomain()
  . UnsafeAsyncFunc<string, string, Task<string>>(@"
      string result = arg1 +"" ""+ arg2;
      await Task.Delay(1000);
      Console.WriteLine(result);
      return result; ");

string result = await action("Hello", "World1!");
result = "Hello World1!"
```

<br/>

<br/>

#### FastMethodOperator

  <br/>

- Normal customization

> Quickly customize a method

```cs
var action = FastMethodOperator.DefaultDomain()
             . Param<string>("str1")
             . Param(typeof(string),"str2")
             . Body("return str1+str2;" )
             . Return<string>()
             . Complie<Func<string,string,string>>();

var result = action("Hello ","World!");    result:   "Hello World!"
```

<br/>


```cs
var delegateAction = FastMethodOperator.Random()

       . Async()
       If you do not specify Param and Return, Func is used by default<string,string,Task<string>> System-defined parameter names, F12 can be seen
       . Body(@"
               await Task.Delay(100);
               string result = arg1 +"" ""+ arg2;
               Console.WriteLine(result);
               return result; ")

       . Complie<Func<string, string, Task<string>>>();

string result = await delegateAction?. Invoke("Hello", "World2!");   result:   "Hello World2!"
```

<br/>
<br/>

#### DelegateOperator

> Implement delegates quickly and quickly

```cs

Define a delegate
public delegate string GetterDelegate(int value);

Method one
var action = NDelegate.RandomDomain(). Delegate<GetterDelegate>("value += 101; return value. ToString(); ");
string result = action(1);
result: "102"
```

<br/>
<br/>

#### FakeMethodOperator

> Quickly copy the method and implement

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
             . UseMethod(typeof(Test). GetMethod("Handler"))
             . StaticMethodContent(" str += \"hello\"; return str; ")
             . Complie<Func<string,string>>();

string result = action("xiao");
result: "hello"              
```

<br/>
<br/>
