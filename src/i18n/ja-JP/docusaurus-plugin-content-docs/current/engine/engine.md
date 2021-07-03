---
title: "Natasha.CSharpEngine エンジンは、Natasha.Framework のフレームワークを使用してカプセル化および統合されています。"
---

Natasha.CSharpEngine は、：Natasha.CSharpSyntax \ Natasha.CSharpCompiler \ Natasha.Exception \ Natasha.Domain で構成されています。

- C# 標準レイヤーとして、コンパイルと構文ライブラリは次のようになります ：

  - Natasha.CSharpSyntax： は、Framework の SyntaxBase 標準を実装し、LoadTreeFromLauguage メソッドをオーバーロードして、上層に C# 構文ツリーを提供します。
  - Natasha.CSharpCompiler: Framework の ComplierBase 標準を実装し、GetCompilation メソッドをオーバーロードして、上層に C# コンパイル要素を提供します。

- NatashaCSharpEngine クラスはコア エンジンであり、NatashaCSharpSyntax と NatashaCSharpCompiler で構成され、エンジンセクションには ComplierBase のイベントが登録され、NatashaCSharpSyntax と NatashaCSharpCompiler の自動エラー訂正機能が実装されます：

  - NatashaCSharpSyntax : Natasha.CSharpSyntax の CSharpSyntaxBase から継承され、ライブラリ自体に必要な機能の一部が追加されます。
  - NatashaCSharpCompiler : Natasha.CSharpCompiler の CSharpCompilerBase から継承され、トップライブラリ自体に必要な機能の一部が追加されます。
  - Natasha.Domain ： は、Framework の DomainBase 標準を実装し、DomainManagement に自動的に登録する機能を追加し、プラグイン参照管理を追加し、動的コンパイルとプラグインの相互作用を強化します。
  - Natasha.Exception : CompilationException クラスを提供し、上記のプロセスに統合してコンパイル例外を収集します。

- AssemblyCSharpBuilder は、NatashaCSharpEngine から継承され、構文ツリーとコンパイラの構成 API をカプセル化し、コンパイル プロセスを完全に制御する、外部に公開されるアセンブリ のコンパイル クラスです。

Natasha.CSharpSyntax および Natasha.CSharpCompiler を使用して、独自の機能を実装できます。
