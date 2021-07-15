---
title: "API usage is demonstrated"
---

- **NDomain**


```cs 
NDelegate supports：

// Common methods：      Func/Action
// asynchronous methods：      Async Func/Action
//non-secure methods：    Unsafe Func/Action
// Non-secure asynchronous methods： UnsafeAsync Func/Action

var func snr. NDelegate
  //create domains
  . CreateDomain ("NDomain2")    
  // Create a Func<string,int> method in the domain, with the same parameter name as the system-defined Func<T1,T> parameter.
  . Func<string,int>("return arg. Length; "); 

Assert.Equal(3, func("abc"));
//Uninstall
NDomain.Delete ("NDomain2");
```

or

```cs
Or
var func s NDelegate
    // Use random domain
    . RandomDomain()
    //Ignore the first argument call instance
    . WithFirstArgInvisible()
    // Create func<string,int> method in the domain, with the same parameter name as the system-defined Func<T1,T> parameter.
    . Func<string,int>("return Length;" ); 

Assert.Equal(3, func("abc"));
// Uninstall
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
var action = NDomain
  . DefaultDomain()
  . UnsafeAsyncFunc<string, string, Task<string>>(@"
      string result = arg1 +"" ""+ arg2;
      await Task.Delay(1000);
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
var action = FastMethodOperator.DefaultDomain()
             . Param<string>("str1")
             . Param(typeof(string),"str2")
             . Body("return str1+str2;" )
             . Return<string>()
             . Complie<Func<string,string,string>>();

var result = action("Hello ","World!");    result: "Hello World!"
```

<br/>


```cs
var delegateAction = FastMethodOperator.Random()

       . Async()
       // If Param and Return are not specified, func<string,string,Task<string>> system-defined parameter names are used by default, and F12 can be seen as
       . Body(@"
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
var action . . . DelegateOperator<GetterDelegate>. Delegate("value += 101; return value. ToString(); ");
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
//result: "hello"              
```

> [See UT test](https://github.com/dotnetcore/Natasha/blob/master/test/NatashaUT/OperatorUT/FakeOperatorUT.cs#L96-L196)

<br/>
<br/>
