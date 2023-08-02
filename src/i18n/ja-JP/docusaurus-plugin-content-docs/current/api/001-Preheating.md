---
title: "1. 予熱します"
---


- **導入**

NUGET `DotNetCore.Natasha.CSharp`

- すべての参照ファイルを上書きする ***

初心者は、参照ファイルの上書きが完全にエラーを報告しないように、このパッケージを導入することをお勧めします。 NUGET `DotNetCore.Compile.Environment`

- 名前に基づいて既定のドメインに読み込まれるアセンブリ参照ファイルを選択します***

この例では、DLL ファイルの大部分が読み込まれます `return false` アセンブリがこの時点でスキャンされると、メソッドが No を返すと、アセンブリは既定のドメインに読み込まれます。 その後、ランダム ドメイン/カスタム ドメインでビルドすると、このアセンブリを使用するには、既定のドメインのアセンブリが自動的に使用されます。 デリゲート コードが Yes を返すと、アセンブリが除外され、ランダム ドメイン/カスタム ドメインがアセンブリを使用する場合は、手動で読み込む必要があります。 [参考-引用管理章节]

```cs
NatashaInitializer.Preheating((asmName, name) => {
    if (name != null)
    {
        if (name. Contains("System"))
        {
            if (
            name. Contains("Net") ||
            name. Contains("Xml") ||
            name. Contains("IO") ||
            name. Contains("Reflection") ||
            name. Contains("Threading") ||
            name. Contains("Security") ||
            name. Contains("Diagnostics") ||
            name. Contains("Data") ||
            name. Contains("Resources.") ||
            name. Contains("Drawing") ||
            name. Contains("Text") ||
            name. Contains("Globalization") ||
            name. Contains("Service") ||
            name. Contains("Web") ||
            name. Contains("Window") ||
            name. Contains("ComponentModel")
            )
            {
                除外します
                return true;
            }
            return false;
        }
        if (name. Contains("Natasha"))
        {
            読み込みます
            return false;
        }
        if (name. Contains("ConsoleApp3"))
        {
            読み込みます
            return false;
        }
    }
    return true;
});
```

- 名前とバージョンに基づいて、アセンブリの参照ファイルが読み込まれているかどうかを判断します。***

この例では、AssemblyName を使用してアセンブリ名とバージョンを判断し、次のコードは dapper のメジャー バージョン番号 12 のアセンブリ参照ファイルを除外します。

```cs
NatashaInitializer.Preheating((asmName, name) => {
    if (asmName.Name != null)
    {
        if (asmName.Name.Contains("Dapper") && asmName.Version!. Major > 12)
        {
            return true;
        }
    }
    return false;
});
```

> アセンブリ参照ファイルの読み込みを減らすと、メモリの増加を効果的に制御できます。