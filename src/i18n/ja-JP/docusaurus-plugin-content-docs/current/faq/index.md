---
title: "よくある質問です"
slug: "/よくある質問"
---

<br/>

### 私は軽量な動的コンパイルを使用したいと思っています。Natashaはいくつかの十数メガバイトのメモリを事前にロードする必要があり、パッケージのサイズも増加すると聞きましたが、私にとっては重すぎると感じます。

答：Natashaのプレヒートは初心者向けであり、すべての準備作業を無視して直接動的コンパイルを行うことを意図しています。しかし、emitまたは式木の場合、動的コンパイルに必要なリフレクション関連のメタデータが提供される必要があります。emitおよび式木のプログラミング経験があれば、自分が書いた動的機能がどのようなメタデータに依存しているかを知ることができるはずですが、Natashaは事前ロードせずにカスタムのメタデータを追加することもできます。以下の例をご覧ください。この例では、入力はvalueで、出力はMath.Floor(value/0.3)です。

#### emitバージョン
```cs
        DynamicMethod dynamicMethod = new DynamicMethod("FloorDivMethod", typeof(double), new Type[] { typeof(double) }, typeof(Program).Module);

        ILGenerator ilGenerator = dynamicMethod.GetILGenerator();

        ilGenerator.Emit(OpCodes.Ldarg_0);  
        ilGenerator.Emit(OpCodes.Ldc_R8, 0.3);  
        ilGenerator.Emit(OpCodes.Div);  
        ilGenerator.Emit(OpCodes.Call, typeof(Math).GetMethod("Floor", new Type[] { typeof(double) }));  
        ilGenerator.Emit(OpCodes.Ret); 

        Func<double, double> floorDivMethod = (Func<double, double>)dynamicMethod.CreateDelegate(typeof(Func<double, double>));
```

#### 式木のバージョン
```cs
        ParameterExpression valueParameter = Expression.Parameter(typeof(double), "value");

        Expression divisionExpression = Expression.Divide(valueParameter, Expression.Constant(0.3));
        Expression floorExpression = Expression.Call(typeof(Math), "Floor", null, divisionExpression);

        Expression<Func<double, double>> expression = Expression.Lambda<Func<double, double>>(floorExpression, valueParameter);

        Func<double, double> floorDivMethod = expression.Compile();
```

#### Natashaのバージョン
```cs
AssemblyCSharpBuilder builder = new();
var func = builder
    .UseRandomLoadContext()
    .UseSimpleMode()
    .ConfigLoadContext(ctx => ctx
        .AddReferenceAndUsingCode(typeof(Math))
        .AddReferenceAndUsingCode(typeof(double)))
    .Add("public static class A{ public static double Invoke(double value){ return Math.Floor(value/0.3);  }}")
    .GetAssembly()
    .GetDelegateFromShortName<Func<double, double>>("A", "Invoke");
```

#### Natashaメソッドテンプレートラッパーバージョン
> この拡張ライブラリ`DotNetCore.Natasha.CSharp.Extension.MethodCreator`は、元のNatashaを基にしており、Natasha v9.0以降で利用できます。
```cs
var simpleFunc = "return Math.Floor(arg1/0.3);"
    .WithSimpleBuilder()
    .WithMetadata(typeof(Math))
    .ToFunc<double, double>();
```

以上の2つのNatashaの動的コンパイルでは、数十Mのメモリ使用量の増加は発生せず、必要に応じて構築されます。 同時に、どちらの動的ビルド方法を使用しても、`typeof(Math)`からは逃れることはできませんが、Natashaは軽量なビルドもサポートしており、さらにシンプルです。

### Natashaをルールエンジンとして使用できますか？

答：Natashaの動的ビルド能力は非常に強力であり、他のライブラリの基礎として使用することができます。これは私がこのライブラリを開発する際の本意でもあり、Natashaを使用して独自のルールエンジンを作成することができます。

### スクリプトの結果をキャッシュしたくありません。毎回コンパイルするのは嫌ですか？

答：不可以，缓存結果需要您來完成，Natasha 走的是輕量化路線，`AssemblyCSharpBuilder` 為最小最基礎的編譯單元，如果你想緩存，可以自己實現一個 `ConcurrentDictionary<string,Delegate/Action/Func>` 來緩存結果。Natasha 不负责<span class="notranslate">编译职责之外</span>的事情。

### 我只想使用 <span class="notranslate">using</span> 全集，但不想添加那么多的引用。

答：Natasha 在 v9.0 版本后支持只预热 <span class="notranslate">using</span> 而不添加引用，新增了初始化方法：
```cs
NatashaManagement
    .GetInitializer()
    .WithMemoryUsing()
    //.WithRefUsing()
    //.WithMemoryReference()
    //.WithRefReference();
    //.WithExcludeReferences((asm, @namespace) => 
        //!string.IsNullOrWhiteSpace(@namespace) && 
        //@namespace.StartsWith("Microsoft.VisualBasic"))
    .Preheating<NatashaDomainCreator>();
```
### 能否复用之前创建的编译单元？

答：Natasha v9.0 之前不推荐复用，v9.0 后推出了 Api : `Reset`. 该方法有非常详细的注释引导和提示您需要注意的复用事项。

### 如果不懂元数据，也不想理 <span class="notranslate">using</span> 管理，能否写出一手好的可靠的动态功能逻辑？

答：かなり厳しいです。Natashaは完全にプレヒートされた状態でも、複雑な環境によってさまざまなバージョンの不一致やusingの誤用などが避けられません。就拿简单的例子来说：
```cs
namspace MyNamespace{

    public static class File{

    }
}
```
上記のコードでは、VSが暗黙的なusingの場合でも、System.IOとMyNamespaceの間のFileの参照が不明な問題を処理できません。 そして、Natashaのusingのプレヒートは、VSのusingよりもより包括的なカバレッジを持つことがあり、したがってエラーの発生確率がより高くなる可能性があります。 这需要编码规范来约束开发者，比如避开官方定义的类名，扩展类名等，比如使用 <span class="notranslate">System.IO.File</span> 避开命名空间引用冲突的问题。