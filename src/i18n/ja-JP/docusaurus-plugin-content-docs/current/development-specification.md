---
title: "Natasha を使用してクラス ライブラリをカプセル化する方法"
---

## ナタシャのパッケージングプロトコル

Natasha には独自のパッケージルールがあり、パッケージのアイデアが明確になり、作業の保守が容易になります。

<br/>

## 完全なオペラ

Operator は、外部で使用されるアクションクラスを動的に構築するクラスとして、次の 3 つの部分から構成される：

- Template
- Builder
- Package / Extension

<br/>

## スクリプト ビルダー (Builder)

Operator の最も重要なコア部分である Builder は、主に Operator にデリゲートを提供し、外部から構成を受け取り、テンプレートを内部的に結合してコンパイルします。  
、Compiler コンパイラとの Template テンプレートの 2 つの部分に大：

<br/>

- Template ビルド テンプレート Template テンプレートを使用してランタイム スクリプト文字列を構築し、テンプレートが外部にリークして API をリークし、コンシューマーがコンパイル文字列を簡単に構成できます。
  - UsingTemplat は Natasha の組み込みテンプレートで、名前空間から完全なオブジェクトへのコード構築を提供します。
  - DelegateTemplate は Natasha の組み込みテンプレートで、メソッド コードの構築を提供します。

  - FieldTemplate は Natasha の組み込みテンプレートで、フィールド コードの構築を提供します。

  - PropertyTemplate は Natasha の組み込みテンプレートで、プロパティ コードの構築を提供します。

<br/>

   - Compiler コンパイラ

        コンパイラは、テンプレートによって提供される文字列を受け取り、Builder のコンパイル タスクを完了するためにコンパイルします。

      - AssemblyCSharpBuilder : Natasha の CSharp コンパイラを使用すると、文字列のコンパイルとメタデータの抽出を簡単に行うことができます。


<br/>

     Natasha に組み込まれている Builder を直接使用すると、： OopBuilder<TOperator> や MethodBuilder などのカスタマイズをすばやく<TOperator>。
     前者はオブジェクト構築テンプレートを提供し、後者は構築方法に焦点を当てします。

<br/>

## アクション クラス (Operator)

Operator は Builder ベースに Package カプセル化され、Operator は Builder が提供するコンパイル結果を格納し、ユーザーレベルの API を外部に漏らします。
<br/>

#### ケース

たとえば、Natasha に組み込まれた [FastMethodOperator](https://github.com/dotnetcore/Natasha/blob/master/src/Natasha.CSharp/Natasha.CSharp.Template/Api/Level1/Operator/FastMethodOperator.cs) は、 [MethodBuilder](https://github.com/dotnetcore/Natasha/blob/master/src/Natasha.CSharp/Natasha.CSharp.Template/Builder/MethodBuilder.cs) に基づいてラップおよび簡略化され、FastMethodOperaartor の初期化関数では、テンプレートを `public static に翻訳する独自のスクリプト構築プロセスをカスタマイズします` ：

```cs
this. Access(AccessFlags.Public)
. Modifier(ModifierFlags.Static);
```

同時に、MethodBuilder のメソッド スクリプトは、コンパイルと使用のためにクラス/インターフェイス/構造体に "寄生" する必要があるため、MethodBuilder にはホスト [OopBuilder](https://github.com/dotnetcore/Natasha/blob/master/src/Natasha.CSharp/Natasha.CSharp.Template/Builder/MethodBuilder.cs#L24) が</code>{randomname} ：`組み込まれています。</p>

<pre><code class="cs"> ClassOptions(item => item
. Modifier(ModifierFlags.Static)
. Class()
. UseRandomName()
. HiddenNamespace()
. Access(AccessFlags.Public)
);
`</pre>
