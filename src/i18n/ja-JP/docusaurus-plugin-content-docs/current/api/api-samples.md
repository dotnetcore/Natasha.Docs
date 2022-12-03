---
title: "API の使用法を示します"
---


- **導入**

NUGET `DotNetCore.Natasha.CSharp` ウォームアップ:
```C#
NatashaInitializer.Preheating();
```


- **NDomain**

```cs 
NDelegate サポート：

// 通常のメソッド：      Func/Action
// 非同期メソッド：      Async Func/Action
// 非安全メソッド：    Unsafe Func/Action
// 非セキュア非同期メソッド： UnsafeAsync Func/Action

var func = NDelegate
  //ドメイン
  を作成します。 CreateDomain("NDomain2")    
  // システム定義の Func<T1,T> パラメータ名と同じパラメータを持つ Func<string,int> メソッドをドメインに作成します。
  . Func<string,int>("return arg. Length; "); 

Assert.Equal(3, func("abc"));
//アンインストール
DomainManagement.Remove ("NDomain2");
```

または

```cs
または
var func = NDelegate
    // ランダム ドメイン
    . RandomDomain()
    //最初の引数呼び出しインスタンス
    を無視します。 WithFirstArgInvisible()
    // は、システム定義の Func<T1,T> パラメータ名と同じパラメータを持つ Func<string,int> メソッドをドメイン内に作成します。
    . Func<string,int>("return Length;" ); 

Assert.Equal(3, func("abc"));
//アンインストール
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

ケース2：
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

- 通常のカスタマイズ

> メソッドをすばやくカスタマイズします

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
       //Param と Return を指定しない場合、デフォルトでは Func<string,string,Task<string>> システム定義のパラメータ名が使用
       されます。 Body(@"
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

> デリゲートをすばやく実装します

```cs

デリゲート
public delegate string GetterDelegate(int value) を定義します。

//メソッド 1
var action = NDelegate.RandomDomain(). Delegate<GetterDelegate>("value += 101; return value. ToString(); ");
string result = action(1);
//result: "102"
```

<br/>
<br/>

#### FakeMethodOperator

> メソッドをすばやくコピーして実装します

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
