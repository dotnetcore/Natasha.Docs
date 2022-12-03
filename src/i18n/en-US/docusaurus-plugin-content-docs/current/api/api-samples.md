---
title: "API usage is demonstrated"
---


- **induct**

NUGET `DotNetCore.Natasha.CSharp` warm-up:
```C#
NatashaInitializer.Preheating();
```


- **NDomain**

```cs 
NDelegate supports：

// normal methods：      Func/Action
// Asynchronous Methods：      Async Func/Action
// Non-Secure Methods：    Unsafe Func/Action
// Non-Secure Asynchronous Methods： UnsafeAsync Func/Action

var func = NDelegate
  //Create domain
  . CreateDomain("NDomain2")    
  // Create a Func<string,int> method in the domain with the same parameters as the system-defined Func<T1,T> parameter name.
  . Func<string,int>("return arg. Length; "); 

Assert.Equal(3, func("abc"));
//uninstall
DomainManagement.Remove("NDomain2");
```

or

```cs
Or
var func = NDelegate
    //use the random domain
    . RandomDomain()
    //Ignore the first argument call instance
    . WithFirstArgInvisible()
    // Creates a Func<string,int> method in a domain with the same parameter name as the system-defined Func<T1,T> parameter name.
    . Func<string,int>("return Length;" ); 

Assert.Equal(3, func("abc"));
//Uninstall
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
//result = "Hello World1!"
```

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

var result = action("Hello ","World!");    result:   "Hello World!"
```

<br/>


```cs
var delegateAction = FastMethodOperator.Random()

       . Async()
       // If you do not specify Param and Return, you use Func<string,string,Task<string>> system-defined parameter names by default, F12 can see
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

> Enable delegates quickly and quickly

```cs

Define a delegate
public delegate string GetterDelegate(int value);

//Method 1
var action = NDelegate.RandomDomain(). Delegate<GetterDelegate>("value += 101; return value. ToString(); ");
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

<br/>
<br/>
