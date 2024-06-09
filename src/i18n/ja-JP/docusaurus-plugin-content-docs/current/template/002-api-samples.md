---
title: 2. テンプレートAPIの使用方法のデモ（未更新）
---

- **導入**

NUGET `DotNetCore.Natasha.CSharp`
プレヒート:

```C#
NatashaInitializer.Preheating();
```

- **NDelegate**

```cs
//NDelegateは以下をサポートしています：

// 通常のメソッド：Func/Action
// 非同期メソッド：Async Func/Action
// アンセーフメソッド：Unsafe Func/Action
// アンセーフ非同期メソッド：UnsafeAsync Func/Action

var func = NDelegate
  //ドメインの作成
  .CreateDomain("NDomain2")    
  //ドメイン内でFunc<string,int>メソッドを作成します。引数はシステムで定義されたFunc<T1,T>の引数名と同じです。
  .Func<string,int>("return arg.Length;"); 

Assert.Equal(3, func("abc"));
//アンロード
DomainManagement.Remove("NDomain2");
```

または

```cs
//または
var func = NDelegate
    //ランダムなドメインを使用
    .RandomDomain()
    //最初の引数を非表示にする
    .WithFirstArgInvisible()
    //ドメイン内でFunc<string,int>メソッドを作成します。引数はシステムで定義されたFunc<T1,T>の引数名と同じです。
    .Func<string,int>("return Length;"); 

Assert.Equal(3, func("abc"));
//アンロード
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

- 通常のカスタマイズ

> クイックにメソッドをカスタマイズする

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
       //ParamとReturnを指定しない場合、デフォルトでFunc<string,string,Task<string>>の引数名が使用されます。F12で見ることができます
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

#### デリゲート操作クラスDelegateOperator

> クイックにデリゲートを実装する

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
