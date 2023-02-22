---
title: "推奨されるカプセル化仕様"
---

## ナタシャのパッケージングプロトコル

Natasha には独自のパッケージルールがあり、パッケージのアイデアが明確になり、作業の保守が容易になります。

<br/>

## 完全なオペラ

Operator は、外部で使用されるアクションクラスを動的に構築するクラスとして、次の 3 つの部分から構成される：

- Template
- Builder
- Package / Extension

Template + Compiler => Builder Package(Builder) + API + Extension => Operator

<br/>

## スクリプト ビルダー (Builder)

Operator の最も重要なコア部分として、Builder は主に Operator にデリゲートを提供し、外部から構成を受信し、テンプレートを内部的に組み合わせてコンパイルできます。  
これは、Compiler コンパイラを使用して Template テンプレートの 2 つの部分に大別されます：

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
     前者はオブジェクト構築テンプレートを提供し、後者は構築方法に焦点を当てします。
     前者はオブジェクト構築テンプレートを提供し、後者は構築方法に焦点を当てします。

<br/>

## アクション クラス (Operator)

Operator は Builder に基づいて Package カプセル化され、Operator は Builder が提供するコンパイル結果を格納し、ユーザー レベルの API を外部にリークします。
<br/>

#### ケース

たとえば、Natasha に組み込まれています [FastMethodOperator](https://github.com/dotnetcore/Natasha/blob/master/src/Natasha.CSharp/Natasha.CSharp.Template/Api/Level1/Operator/FastMethodOperator.cs) で [MethodBuilder](https://github.com/dotnetcore/Natasha/blob/master/src/Natasha.CSharp/Natasha.CSharp.Template/Builder/MethodBuilder.cs) ラップと簡素化に基づいて、FastMethodOpeartor の初期化関数は、次のテンプレートに翻訳された独自のスクリプト構築プロセスをカスタマイズします `public static` ：

```cs
this. Access(AccessFlags.Public)
. Modifier(ModifierFlags.Static);
```

