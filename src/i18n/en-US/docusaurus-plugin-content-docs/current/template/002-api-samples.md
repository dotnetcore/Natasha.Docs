---
title: 2. Template API Usage Demonstration (Not Updated)
---

- **Introduction**

NUGET `DotNetCore.Natasha.CSharp`
Preheating:

```C#
NatashaInitializer.Preheating();
```

- **NDelegate**

```cs
//NDelegate supports:

// Regular methods: Func/Action
// Asynchronous methods: Async Func/Action
// Unsafe methods: Unsafe Func/Action
// Unsafe asynchronous methods: UnsafeAsync Func/Action

var func = NDelegate
  //Create a domain
  .CreateDomain("NDomain2")    
  //Create a Func<string,int> method in the domain, with the same parameter name as the Func<T1,T> defined in the system.
  .Func<string,int>("return arg.Length;"); 

Assert.Equal(3, func("abc"));
//Unload
DomainManagement.Remove("NDomain2");
```

Or

```cs
//Or
var func = NDelegate
    //Use a random domain
    .RandomDomain()
    //Invoke the instance with the first parameter invisible
    .WithFirstArgInvisible()
    //Create a Func<string,int> method in the domain, with the same parameter name as the Func<T1,T> defined in the system.
    .Func<string,int>("return Length;"); 

Assert.Equal(3, func("abc"));
//Unload
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

Case 2:

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

- Customization

> Quickly customize a method

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
       //If you don't specify Param and Return, the default parameter names defined by the system Func<string,string,Task<string>> will be used. You can see it with F12.
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

> Quickly implement a delegate

```cs

//Define a delegate
public delegate string GetterDelegate(int value);

//Method One
var action = NDelegate.RandomDomain().Delegate<GetterDelegate>("value += 101; return value.ToString();");
string result = action(1);
//result: "102"
```

<br/>
<br/>

#### FakeMethodOperator

> Copy the method quickly and implement it

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
