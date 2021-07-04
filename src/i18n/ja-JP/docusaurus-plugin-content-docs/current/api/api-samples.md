---
title: "API の使用法を示します"
---

- **NDomain**

```cs


NDomain サポート：

// 通常のメソッド：      Func/Action
// 非同期メソッド：      Async Func/Action
// 非セキュア メソッド：    Unsafe Func/Action
// アンセキュア非同期メソッド： UnsafeAsync Func/Action



//------ ドメインの作成 (アンインストールが容易) ----//-----Func メソッドの作成--------//
var func = nDomain.Create("NDomain2")。 Func<string,string>("return arg;" );
Assert.Equal("1", func("1"));
//アンインストール可能
NDomain.Delete ("NDomain2");


NormalTestModel model = new NormalTestModel();
var func = NDomain.Create("NDomain6"). Action<NormalTestModel, int, int>("arg1. Age=arg2+arg3; ");
func(model,1,2);
Assert.Equal(3, model. Age);



ケース 2：
var action = NDomain.Default() UnsafeAsyncFunc<string, string, Task<string>>(@"
                            string result = arg1 +"" ""+ arg2;
                            Console.WriteLine(result);
                            return result; ");

string result = await action("Hello", "World1!");
//result = "Hello World1!"

```

#### OopOperator : [UT テスト](https://github.com/dotnetcore/Natasha/blob/master/test/NatashaUT/BuilderUT)

#### OopComplier : [UT テスト](https://github.com/dotnetcore/Natasha/blob/master/test/NatashaUT/OopComplierTest.cs)

<br/>

<br/>

#### FastMethodOperator

  <br/>

- 通常のカスタマイズ

> メソッドをすばやくカスタマイズします

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

- 增强实现与异步支持 > `Complie<T>`方法会检测参数以及返回类型，如果其中有任何一处没有指定，那么 `Complie` 方法会使用自己默认的参数或者返回值进行填充, > 如果是 `Action<int>` 这种带有 1 个参数的，请使用"arg", 另外如果想使用异步方法，请使用 `UseAsync` 方法,或者 `AsyncFrom<Class>(methodName)`这两种方法。 > 返されるパラメーターを指定するには、 `Task<>`を指定して、ランタイムが非同期に呼び出されるようにし、外部メソッドのレイヤーに async キーワードが必要です。

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

> デリゲートをすばやく実装します

```cs

デリゲートを定義します
public delegate string GetterDelegate(int value);



//メソッド1
var action = DelegateOperator<GetterDelegate>. Delegate("value += 101; return value. ToString(); ");
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

> [UT テストを参照してください](https://github.com/dotnetcore/Natasha/blob/master/test/NatashaUT/DynamicMethodTest.cs#L96-L196)

<br/>
<br/>
