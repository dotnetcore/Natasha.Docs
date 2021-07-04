---
title: "Natasha 3.0+ はエンジン構造を抽象化し、フレームワークと個々のモジュールを分離します。"
---

#### 各モジュールの標準パッケージは Natasha.Framework で：

- DomainBase: AssemblyLoadContext クラスから継承され、ドメイン機能の一部と部分的な抽象化標準が完成しました。

  - AssemblyReferences ： アセンブリ/参照ディクショナリとしてアセンブリに対応する参照を格納するために必要な参照ライブラリをコンパイルします。
  - GetInstance ： メソッドは、DomainManagement クラスの Create 操作を簡単にするためにオーバーロードする必要があり、現在のクラスのインスタンスを返す必要があり、オーバーロードが必要です。
  - Default_Resolving ： ドメインの読み込み時にトリガーされるメソッドを作成するには、オーバーロードが必要です。
  - Default_ResolvingUnmanagedDll ： アンペアコードがロードされたときに起動するメソッドを記述するには、オーバーロードが必要です。
  - CompileStreamHandler ： ストリームとして正常にコンパイルされたときに起動するメソッドをオーバーロードする必要があります。
  - CompileFileHandler : ファイルとして正常にコンパイルされたときに起動するメソッドで、オーバーロードが必要です。
  - Remove ： が削除されたときに発生するメソッドで、オーバーロードが必要です。

  - AddDeps ： メソッドの既定の実装では、ファイル パスを介して依存関係が追加され、3.0+ は deps.json を解析し、2.0+ は 1 つのファイルのみを追加します。
  - AddReferencesFromFolder ： 、オーバーロードできるフォルダから参照ライブラリを追加します。
  - AddReferencesFromDepsJsonFile ： deps.json ファイルから参照ライブラリを解決し、オーバーロードできます。
  - AddReferencesFromDllFile ： 単一の dll ファイルからオーバーロードできる参照ライブラリを取得します。
  - LoadPluginFromFile ： 既定の実装では、Load プラグインは AddDeps メソッドを呼び出して参照依存関係を読み込み、GetAssemblyFromFile を呼び出して、ファイルからドメインにアセンブリを読み込み、オーバーロードできます。
  - LoadPluginFromStream ： 既定の実装では、読み込みプラグインは AddDeps メソッドを呼び出して参照依存関係を読み込み、GetAssemblyFromStream を呼び出してストリームからドメインにアセンブリを読み込み、オーバーロードできます。
  - GetAssemblyFromStream ： 既定の実装では、システム ドメインとカスタム ドメインを区別し、ストリームからドメインにアセンブリを読み込み、オーバーロードできます。
  - GetAssemblyFromFile ： 既定の実装であり、システム ドメインとカスタム ドメインを区別し、ファイルからドメインにアセンブリを読み込み、オーバーロードできます。
  - GetDefaultReferences ： メソッドは、オーバーロードできるシステム ドメインへのすべての参照を返します。
  - GetCompileReferences ： メソッドは、オーバーロードできるシステム ドメインと非システム ドメインの組み合わせへの参照を返します。
  - LoadPluginFromFile ： プラグインがファイルとして読み込まれたときに起動するメソッドをオーバーロードできます。
  - LoadPluginFromStream ： プラグインがストリームとして読み込まれるときに起動するメソッドをオーバーロードできます。

- SyntaxBase: 構文変換の基になるクラスとして、コードと構文ツリーキャッシュを提供し、いくつかの抽象メソッドを定義し、キャッシュを自動的に追加するメソッドを実装します。

  - TreeCache ： 文字列コードと構文ツリーのキャッシュを保持します。
  - LoadTree / LoadTreeFromScript ： 各言語には独自の変換メソッドがありますが、最終的には SyntaxTree を返す必要があり、クラスを継承するときにメソッドを実装し、対応する言語の構文ツリーを返し、オーバーロードする必要があります。
  - AddTreeToCache ： メソッドは、対応する言語のコードと構文ツリーを自動的にキャッシュし、オーバーロードできます。

- `CompilerBase<TCompilation, TCompilationOptions>` where TCompilation : Compilation where TCompilationOptions : CompilationOptions: コンパイラ抽象化、TCompilation はコンパイルの基になるクラスとして制約され、コンパイル情報を構築するときに各言語が継承するため、コンパイルベースになります。TCompilationOptions は CompilationOptions 型に制約され、コンパイル情報を構築するオプションクラスにクラス変更され、コンパイル情報を構築するときに、

  - AssemblyName : コンパイラは、現在のコードをアセンブリ全体にコンパイルし、アセンブリ名を指定する必要があります。
  - AssemblyResult : コンパイル結果。
  - AssemblyOutputKind は、Assembly ：を使用して、ファイル file / ストリーム stream にコンパイルします。
  - Domain : このプロパティは DomainBase インスタンスをホストします。
  - PreComplier ： コンパイル前に実行され、false が返された場合はコンパイルがブロックされ、オーバーライド可能です。
  - CompileToFile ： メソッドは、上記の情報をファイルにコンパイルする機能を実装し、オーバーライドできます。
  - CompileToStream : このメソッドは、上記の情報をストリームにコンパイルする機能を実装し、オーバーライドできます。
  - Compile ：メソッドは、出力方法 (AssemblyOutputKind) に基づいて自動コンパイルを実装し、file は CompileToFile メソッドを呼び出し、stream は CompileToStream メソッドを呼び出します。
  - CompileTrees ： コンパイルする必要がある構文ツリーです。

  - GetCompilationOptions ：オプションを返し、オーバーライドする必要があります。
  - AddOption ：メソッドを設定し、CompilationOptions を取得した後にアクションをカスタマイズします。
  - GetCompilation ：取得した CompilationOptions に基づいて異なる言語のコンパイル情報セットを返すには、オーバーライドする必要があります。

  - CompileEmitToFile： compilation をファイルにコンパイルし、再書き込みする必要があります。
  - CompileEmitToStream: compilation をメモリ ストリームにコンパイルし、オーバーライドする必要があります。

  - FileCompileSucceedHandler ： ファイル形式のコンパイルが成功した後に発生するイベントです。
  - StreamCompileSucceedHandler ：コンパイルが成功した後に発生するイベントです。

  - FileCompileFailedHandler ： コンパイルが失敗した後に発生するイベントです。
  - StreamCompileFailedHandler ： コンパイルが失敗した後に発生するイベントです。

上記のクラスをオーバーライドすると、Engine 実装の詳細については、言語の動的コンパイルが完了します。
