---
title: "Natasha.CSharpEngine エンジンは、Natasha.Framework のフレームワークを使用してカプセル化および統合されています。"
---

Natasha構造図:

![png](/images/framework-natasha-all.svg)

Natasha.Framework は Natasha にコア コンパイル クラス標準を提供し、コンパイル機能を記述する必要がある開発者は Natasha.Framework の個々の抽象クラスを実装する必要があります (後で説明します)。

Natasha.Framework は、次の 2 つの部分に分かれています。
  - Roslyn 標準に基づく構文ツリーとコンパイラ。
  - Runtime ベースのドメイン実装。

このうち、SyntaxBase は文字列から構文ツリーへの変換インターフェイスを提供しますが、構文ツリーが独自に実装または参照する必要がある言語は、コンパイラにコンパイルするために Roslyn 構文ツリーと互換性がある必要があります。  ここでのコンパイラには、開発者が参照または実装する必要がある異なる言語のコンパイラもあります。 Framework プロジェクトは Roslyn の抽象実装のみを提供するため、抽象実装を使用してコンパイル プロセスを簡単に作成したり、独自のコンパイル フレームワークをカスタマイズしたりできます。  
Runtime のドメイン抽象化のもう 1 つの部分は、Natasha のドメイン ベース クラスによって指定され、部分的な API が実装され、コンパイルがメモリからアセンブリへの変換と参照管理を実装するのに役立ちます。

Natasha は Natasha.CSharp.Engine で、Framework プロジェクトによって提供される抽象クラスを使用して、スクリプトからアセンブリドメインへの C# のプロセス全体を完了し、例外制御、セマンティック前処理、Engine を完全で実行可能な動的コンパイル シナリオのように、より詳細で完璧な実装を提供します。 Engine はコンポーネント登録インターフェイスを開き、実装された構文ツリー/コンパイラ/ドメイン登録を Engine に動的コンパイル魂の下に与えるエンティティに登録できます。 この Natasha.CSharp.Engine は、動的コンパイル作業を実行できます。

外側の Template API とフラット Script Utils は、主に動的に構築しやすいように、文字列とメタデータの処理であり、Natasha.CSharp.Reverser は Script Utils レイヤーの実装であり、主に文字列にメタデータを復元する機能を提供します。 Natasha.CSharp.Template は、開発者が動的コンパイル ライブラリを使用するコストを削減するために、よりわかりやすい API を提供します。

Natasha.CSharp.All は、すべての Natasha CSharp 動的コンパイル関連コンポーネントを統合し、コンポーネントの登録と動的コンパイルのウォームアップ読み込みを完了する初期化関数を提供します。

```cs
NatashaInitializer.InitializeAndPreheating();
```

![png](/images/framework-natasha-component.svg)