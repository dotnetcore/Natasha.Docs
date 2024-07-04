---
title: 2.1 スマートコンパイルモード - 実装アセンブリ
---

## なぜ実装アセンブリを使用するのか

実装アセンブリには、具体的な実装とプライベートフィールドが含まれます。メモリ使用量が少なくなりますが、実装アセンブリには依存関係がありますので、注意して使用する必要があります。

## 前提条件

1. `DotNetCore.Natasha.CSharp.Compiler.Domain`コアバージョンのコンパイルドメインパッケージをインポートしてください。
2. スマートコンパイルのためのプレヒートメソッドを使用します。
3. スマートコンパイル。

## プレヒートの例

### 通常のプレヒート

1. ジェネリックなプレヒートメソッドでコンパイルドメインクリエーターのシングルトンを自動的に作成します。
2. true パラメータを渡すことで、ランタイムアセンブリを無効にすることができます。Natasha では、メモリアセンブリを選択します。
3. 最初のパラメータは、メモリアセンブリから Using Code を抽出するかどうかを指定します。true を設定すると、実装アセンブリから Using を抽出します。
4. 2番目のパラメータは、メモリアセンブリからメタデータを抽出するかどうかを指定します。true を設定すると、実装アセンブリからメタデータを抽出します。

```cs
//コンパイルドメインの登録と事前準備のメソッド
NatashaManagement.Preheating<NatashaDomainCreator>(true, true);
```

### Usingキャッシュのプレヒート

最初の生成時にUsing Codeをキャッシュファイル`Natasha.Namespace.cache`に書き込み、後続の再起動ではファイルから自動的に読み込みます。

```cs
//コンパイルドメインの登録と事前準備のメソッド
NatashaManagement.Preheating<NatashaDomainCreator>(true, true, true);
```

### 分離プレヒート

```cs
//コンパイルドメインの登録
NatashaManagement.RegistDomainCreator<NatashaDomainCreator>();
//事前準備のメソッド
NatashaManagement.Preheating(true, true);
```

### フィルタープレヒート

```cs
//バージョン12よりも高いDapperのメインアセンブリが存在する場合、キャッシュに追加しないでください。
//除外メソッドを渡す
NatashaManagement.Preheating<NatashaDomainCreator>((asmName, name) => {
    if (asmName.Name != null)
    {
        if (asmName.Name.Contains("Dapper") && asmName.Version!.Major > 12)
        {
            return true;
        }
    }
    return false;
}, true, true, true);
```

> 環境が複雑すぎて予期しない事態に遭遇した可能性がありますので、コードを簡素化して例外が再現可能かどうかを確認し、Natashaへ問題を報告してください。

## スマートコンパイル

プレヒート後は、以下のコードを参照してください。

```cs
AssemblyCSharpBuilder builder = new();
var myAssembly = builder
    .UseRandomDomain()
    .UseSmartMode() //启用智能模式
    .Add("public class A{ }")
    .GetAssembly();
```

智能模式将合并 共享域与当前域的 元数据以及 Using, 并启用语义检查.
智能模式的 API 逻辑为：

```cs
.WithCombineReferences(item => item.UseAllReferences())
.WithCombineUsingCode(UsingLoadBehavior.WithAll)
.WithReleaseCompile()
.WithSemanticCheck();
```

可以参考[元数据管理与微调] 对 元数据 的合并行为进行微调。
可以参考[微调Using覆盖] 对 UsingCode 的合并行为进行微调。

## 其他案例

#### 批量排除程序集

```cs
NatashaInitializer.Preheating((asmName, name) => {
    if (name != null)
    {
        if (name.Contains("System"))
        {
            if (
            name.Contains("Net") ||
            name.Contains("Xml") ||
            name.Contains("IO") ||
            name.Contains("Reflection") ||
            name.Contains("Threading") ||
            name.Contains("Security") ||
            name.Contains("Diagnostics") ||
            name.Contains("Data") ||
            name.Contains("Resources.") ||
            name.Contains("Drawing") ||
            name.Contains("Text") ||
            name.Contains("Globalization") ||
            name.Contains("Service") ||
            name.Contains("Web") ||
            name.Contains("Window") ||
            name.Contains("ComponentModel")
            )
            {
                //除外
                return true;
            }
            return false;
        }
        if (name.Contains("Natasha"))
        {
            //読み込み
            return false;
        }
        if (name.Contains("ConsoleApp3"))
        {
            //読み込み
            return false;
        }
    }
    return true;
}, true, true);
```

#### 根据版本排除程序集

该示例使用 AssemblyName 进行判断程序集名称及版本, 以下代码排除了 dapper 主版本号为 12 的程序集引用文件;

```cs
NatashaInitializer.Preheating((asmName, name) => {
    if (asmName.Name != null)
    {
        if (asmName.Name.Contains("Dapper") && asmName.Version!.Major > 12)
        {
            return true;
        }
    }
    return false;
});
```

> 减少程序集引用文件的加载,可以有效的控制内存涨幅.
