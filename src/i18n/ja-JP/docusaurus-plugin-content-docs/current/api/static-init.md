---
title: "静的初期化操作"
---

Natasha のすべてのテンプレートは ComplierTemplate から継承され、ComplierTemplate 自体は静的構築メソッドを提供します。したがって、上層 API もサポートされます。

<br/>

## 使用

NDelegate / NAssembly / NClass.. /xxx_Oerator等を以下「Handler」という.

<br/>

#### 静的初期化コード：

```cs

domain ドメインを使用
Handler.UseDomain(domian.compiler => { 编译器配置 })


//コンパイラを使用するドメイン
Handler.UseCompiler(assemblyCSharpCompiler, compiler => { 编译器配置 }));


//"domainJim" ドメインを作成します
Handler.CreateDomain( "domianJim", compiler => { 编译器配置 })


//デフォルトドメインを使用
Handler.DefaultDomain(compiler => { 编译器配置 })


//ランダムドメインの使用
Handler.RandomDomain(compiler => { 编译器配置 })

```

<br/>

#### コンパイラ構成：

```cs
builder =>
{
     builder
       . ClearInnerSemanticAnalysistor() // 明確に組み込まれたセマンティックフィルタ
       . AddSemanticAnalysistor((asmBuilder,asmCompiltion)=>newCompiltion) //独自のセマンティックフィルタ
       を追加します。 DisableSemanticCheck() // セマンティック チェックを無効にする (パフォーマンスを少し向上させる)
       。 DisableNullableCompile() //null 参照可能なプロパティを無効にする
       . CompileWithAssemblyLoadBehavior (LoadBehaviorEnum.UseHighVersion) // コンパイル結果にアセンブリを読み込むときに、アセンブリ依存が高いバージョンがある場合は、高いバージョン依存
       . CompileWithReferenceLoadBehavior (LoadBehaviorEnum.UseHighVersion) //参照をマージするときに参照バージョンが上位バージョンにある場合は、上位バージョンの参照
       . CompileWithReferencesFilter((defaultAsmName, targetAsmName)=> LoadVersionResultEnum.UseDefault) //参照フィルタリングロジック
       . SetDllFilePath(path) //設定生成された DLL ファイルパス c:/1.dll
       . SetPdbFilePath(path) //設定生成されたPDBファイルパスc:/1.pdb
       . SetXmlFilePath(path) //設定生成された XML ファイルパス c:/1.xml
       . SetOutputFolder(outputfolder) //外部出力ディレクトリ
       . UseNatashaFileOut() //使用 outputfolder + assemblyname .dll/.pdb/.xml
       . ConfigCompilerOption(opt=>opt) //Roslyn コンパイラ オプションは、現在、専門家がニーズに合わせて
       を調整できる、ほぼ最も適切な構成です。 ConfigSyntaxOptions(opt=>opt) //構文ツリーオプションは、現在、専門家がニーズに合わせて 

       //次のバージョンプランサポート
       を調整することができる、ほぼ最も適切な構成です。 UseNatashaFileOut(outputfolder) //マージ SetOutputFolder と UseNatashaFileOut の 2 つの API
       . AddLogEvent(nlog=>nlog.xxx) // メソッドを使用してログ イベント
       を増やします。 SetAssemblyName("MyAssemblyName") //メソッドによるアセンブリ名の設定
}
```
