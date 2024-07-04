---
title: パッケージの説明
---

<br/>

### ドメイン実装パッケージ

`DotNetCore.Natasha.DynamicLoad.Base` パッケージは、コンパイルユニットとドメインを接続するためのインターフェースパッケージです。カスタムドメインを実装し、Natashaのコンパイルユニットに使用します。

`DotNetCore.Natasha.Domain` は、Natasha公式のCore3.0以上のドメイン操作パッケージです。

`Natasha.CSharp.Compiler.Domain` は、`DotNetCore.Natasha.Domain` を継承し、`DotNetCore.Natasha.DynamicLoad.Base` のコンパイルインターフェースパッケージを実装しています。

### コンパイルユニットパッケージ

`DotNetCore.Natasha.CSharp.Compiler` は、Natashaの基本的なコンパイルユニットパッケージです。テンプレートパッケージを使用しない場合は、このパッケージだけを参照してコンパイルすることができます。

### 拡張パッケージ

`DotNetCore.Natasha.CSharp.Template.Core` は、コンパイルユニットを基に構築されたテンプレートコンパイルパッケージです。

`DotNetCore.Natasha.CSharp.Extension.Ambiguity` は、コンパイルユニットを基に拡張された二義性の解決パッケージです。

`DotNetCore.Natasha.CSharp.Extension.Codecov` は、コンパイルユニットを基に拡張された動的アセンブリ使用量の統計パッケージです。
