---
title: "Natasha 3.0+ はエンジン構造を抽象化し、フレームワークと個々のモジュールを分離します。"
---

#### 各モジュールの標準パッケージは Natasha.Framework で：

- DomainBase: AssemblyLoadContext クラスから継承され、ドメイン機能の一部と部分的な抽象化標準が完成しました。

  - フィールド:
    - フィールド DefaultDomain : 既定のドメインの実装, プログラムのプライマリ ドメインはアンインストールできません。.
    - フィールド AddAssemblyEvent : アセンブリの読み込み時に発生するイベント。
    - フィールド RemoveAssemblyEvent : アセンブリが削除されたときに発生するイベント。
    - フィールド UseNewVersionAssmebly : 新しい参照が見つかった場合は、バージョンで更新された参照があります。
    - フィールド AssemblyReferencesCache : メモリ ストリームコンパイルされたアセンブリと参照を格納します。
    - フィールド OtherReferencesFromFile : 外部ファイルによって個別にロードされた参照を格納します。
    - フィールド Count : 現在のドメインの参照数。

  - 抽象メソッド:
    - 抽象メソッド GetReferenceElements : 現在のドメインの参照要素のコレクションを返します ( using System など)。
    - 抽象メソッド LoadPlugin : プラグインをロードします。
    - 抽象メソッド RemovePlugin : プラグインを削除します。
    - 抽象メソッド GetPluginAssemblies : 現在のドメイン内のプラグイン アセンブリのコレクションを取得します。
    - 抽象メソッド Default_Resolving : 既定のドメイン ロード イベント。
    - 抽象メソッド Default_ResolvingUnmanagedDll: 既定のドメイン アンマネージ アセンブリの読み込みイベント。
    - 抽象メソッド GetCompileReferences : システム ドメイン + 現在のドメインへのすべての参照を取得します。
    - 抽象メソッド CompileStreamCallback : メモリ コンパイルが流れた後に処理する必要がある処理方法。

  - 仮想メソッド:
    - 仮想メソッド RemoveReference : 外部ファイルへの参照を削除します。
    - 仮想メソッド RemoveReference : アセンブリに対応する参照を削除します。
    - 仮想メソッド AddReferencesFromAssembly : アセンブリへの参照を追加します。
    - 仮想メソッド AddReferencesFromDllFile : DLL パスに基づいて 1 つの参照を追加し、ファイルとして参照として読み込みます。
    - 仮想メソッド AddReferencesFromFileStream : DLL パスに基づいて 1 つの参照を追加し、ストリームとして参照として読み込みます。
    - 仮想メソッド AddReferencesFromAssemblyStream : アセンブリとメモリ ストリームを参照キャッシュに追加します。
    - 仮想メソッド AddReferencesFromFolder : フォルダをスキャンし、フォルダの下の DLL ファイルを参照に追加します。
    - 仮想メソッド LoadAssemblyFromFile : ファイルをアセンブリに変換し、参照をキャッシュし、アセンブリをドメインに読み込みます。
    - 仮想メソッド LoadAssemblyFromStream : ストリームをアセンブリに変換し、参照をキャッシュし、アセンブリをドメインに読み込みます。
    - 仮想メソッド LoadAssemblyFromStream : ファイル ストリームをアセンブリに変換し、参照をキャッシュし、アセンブリをドメインに読み込みます。
    - 仮想メソッド Dispose : 明確な参照、関数の破棄。

  - 保護過負荷:
    - オーバーロード Load の保護 : 実装する必要があるメソッド。
    - オーバーロードされた LoadUnmanagedDll の保護 : 実装する必要があるメソッド。

<br/>

- SyntaxBase: 構文変換の基になるクラスとして、コードと構文ツリーキャッシュを提供し、いくつかの抽象メソッドを定義し、キャッシュを自動的に追加するメソッドを実装します。

  - フィールド:
    - フィールド TreeCache ： 文字列コードと構文ツリーのキャッシュを保持します。
    - フィールド ReferenceCache : 参照キャッシュ.

  - 方法:
    - メソッド Clear : 上記の 2 つのキャッシュをクリアします。

  - 抽象メソッド:
    - 抽象メソッド ConvertToTree : スクリプトを構文ツリーに変換します。
    - 抽象メソッド FormartTree : 構文ツリーを読み込んでフォーマットします。

  - 仮想メソッド:
    - 仮想メソッド AddTreeToCache : ツリーをキャッシュに追加するには、構文ツリー変換のために ConvertToTree をオーバーロードする必要があります。
    - 仮想メソッド AddTreeToCache : 構文ツリーをロードしてキャッシュし、内部機能を実装するために LoadTree をオーバーロードする必要があります。


<br/>

- `CompilerBase<TCompilation, TCompilationOptions>` where TCompilation : Compilation where TCompilationOptions : CompilationOptions: コンパイラ抽象化、TCompilation はコンパイルされた基本クラスである Compilation 型に制約され、コンパイル情報の構築時に各言語が継承および変換されるため、コンパイルの基礎となります。TCompilationOptions は CompilationOptions 型に拘束される.

  - フィールド:
    - フィールド AllowUnsafe : セキュリティで保護されていないコードのコンパイルを許可するかどうか。
    - フィールド AssemblyName : コンパイラは、現在のコードをアセンブリ全体にコンパイルし、アセンブリ名を指定する必要があります。
    - フィールド OutputFilePath : DLL ファイル出力パス。
    - フィールド OutputPdbPath : PDB ファイル出力パス.
    - フィールド Compilation : コンパイル単位.
    - フィールド AssemblyKind : アセンブリ出力タイプ、コンソール、Windows、DLL など
    - フィールドProcessorPlatform : プロセッサプラットフォーム, x86, x64など.
    - フィールド AssemblyOutputKind : アセンブリの構築方法, ファイル / ストリーム.
    - フィールド CodeOptimizationLevel : コードの最適化の程度, Debug / Release.
    - フィールド OptionAction : 外部コンパイル オプション デリゲート。
    - フィールド CompileSucceedEvent : ストリームのコンパイルが成功した後にトリガーされるイベント。
    - フィールド CompileFailedEvent : ストリームのコンパイルに失敗した後にトリガーされるイベント。
    - フィールド _semanticAnalysistor : ユーザー定義のセマンティック アナライザー。

  - プロパティ:
    - プロパティ Domain : ドメイン。
    - プロパティ SyntaxTrees : コンパイル単位に存在する構文ツリーのコレクション。

  - 方法:
    - メソッド AddOption : オプションを構築した後のオプションの操作。
    - 方法 AppendSemanticAnalysistor : 追加意味解析依頼.
    - メソッド SetSemanticAnalysistor : セマンティック解析デリゲートを空にして設定します。

  - 仮想メソッド:
    - 仮想メソッド ComplieToAssembly : コンパイルロジックの具体的な実装は、コンパイルユニットをアセンブリに出力します。
    - 仮想メソッド PreCompiler : コンパイルされた情報を構築する前に行う必要がある処理。

  - 抽象メソッド:
    - 抽象メソッド GetCompilation : Option で構成されている必要がある特定の種類のコンパイル単位を取得します。
    - 抽象メソッド GetCompilationOptions : コンパイル単位のコンパイル オプションを準備します。

上記のクラスをオーバーライドすると、Engine 実装の詳細については、言語の動的コンパイルが完了します。
