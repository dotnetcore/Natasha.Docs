---
title: "fast メソッド"
---

## ドメイン操作

```cs
FastMethodOperator.Default //システムドメイン
FastMethodOperator.Create("MyDomain") //新しいスタンドアロンドメインを作成する
FastMethodOperator.Random() //ランダムドメインを使用する

//メソッドに bool 型を渡す場合は、DLL ファイルにコンパイルするかどうかをコンパイラに指示できます。
```

<br/>

## ビルド方法

FastMethodOperator アクション クラスでは、コンストラクターで既定のテンプレートが作成されます：

```cs
HiddenNameSpace()
. OopAccess(AccessTypes.Public)
. OopModifier(Modifiers.Static)
. MethodAccess(AccessTypes.Public)
. MethodModifier(Modifiers.Static);
```

1. 名前空間が非表示になります。
1. クラスのアクセス レベルはパブリックです。
1. クラスの修飾子は静的です。
1. メソッドのアクセス レベルは共通です。
1. メソッドの修飾子は静的です

<br/>

## 期待される結果

テンプレートの外観は、文字列に変換：

```cs

using xxx;
public static class xxx
{
    public static xx NatashaDynamicMethod(xxx)
    {
       //content
    }
}

```

<br/>

## 自動カスタマイズ

上記の結果から、`xxx`コンテンツは、自分でカスタマイズする必要があることがわかります。ナタシャは、このような状況を考慮して、テンプレートに「自己実装」機能を実装しました。

- className:

  クラス テンプレートでは、クラス名の初期化は、次のようにランダムに作成されます：`OopNameScript = "N" + Guid.NewGuid() を参照)。 ToString("N");`、クラス名は自動的に GUID として作成されます。

- returnType/params:

  FastMethodOperator で `Complie<T>`メソッドがオーバーライドされ、親クラスがコンパイルされる前に戻り値とパラメーターがチェックされ、重度の怠け者の患者が戻り値とパラメーターを記述するのも怠け者になり、Natasha は戻り値とパラメーター解決機能を提供します。

<br/>

## Using を自動的に実装しない理由

- 二義的な引用を特定するのは難しいが、二義性の問題についてはこれ以上説明したくない。
- 名前空間マッピング テーブルを作成するコストは膨大であり、二義性に対処する必要があります。
- 编程的严谨性，任何编译型语言都是强约束的，它们有自己的规则和特性，不管您是用 EMIT 还是表达式树，元数据都是不可缺少的， Natasha 虽然不用你再去写指令及元数据，但起码的命名空间还是需要您来保障的。

<br/>

## カスタマイズしてお気軽に

Natasha のテンプレートはすべて書き込み可能で、Builder は柔軟性が高いため、FastMethodOperator のテンプレートにとらわれず、使用時にシーンに合わせてカスタマイズできます。

例如： `Operator.OopAccess(AccessTypes.Internal);`这将覆盖原有的 OopAccess 函数功能。

<br/>

## ケース

```cs

 var script = FastMethodOperator.Default
               . Param<string>("str1")
               . Param<string>("str2")
               . MethodBody(@"
                   string result = str1 +"" ""+ str2;
                   Console.WriteLine(result);
                   return result; ")
               . Return<string>()
               . Builder()
               . MethodScript;


/* は、生成されたコードを表示できます：
public static string NatashaDynamicMethod(String str1, String str2)
{
     string result = str1 +" "+ str2;
     Console.WriteLine(result);
     return result;
}*/

```

また、. その後、UseAsync/UseUnsafe などの方法を見つけ、より豊富な機能をカスタマイズできます。 这里有个有趣的地方，如果您去看过 Natasha 的 CI 过程的测试会发现，日志中有很多“Hello World”, 这些就是在动态方法中输出的 hello world,在测试的时候被输出出来了。
