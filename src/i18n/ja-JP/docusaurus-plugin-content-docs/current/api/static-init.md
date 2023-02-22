---
title: "4. 高度なコンパイルクラスの初期化操作"
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
       . ClearInnerSemanticAnalysistor() //クリア組み込みのセマンティックフィルタ
       . AddSemanticAnalysistor((asmBuilder,asmCompiltion)=>newCompiltion) // 独自のセマンティックフィルタを追加します
       . DisableSemanticCheck() //セマンティック チェックを無効にする (パフォーマンスを少し向上)
       . DisableNullableCompile() //null 参照可能属性を無効にします
       . CompileWithAssemblyLoadBehavior (LoadBehaviorEnum.UseHighVersion) // コンパイル後にアセンブリを読み込むときに、アセンブリ依存のバージョンが高い場合は、高いバージョン依存が使用されます
       . CompileWithReferenceLoadBehavior(LoadBehaviorEnum.UseHighVersion) //参照をマージするときに参照バージョンが上位バージョンにある場合は、上位バージョンの参照が使用されます
       . CompileWithReferencesFilter((defaultAsmName, targetAsmName)=> LoadVersionResultEnum.UseDefault) //参照フィルタリングロジックを追加します
       . SetDllFilePath(path) //設定によって生成された DLL ファイルパス c:/1.dll
       . SetPdbFilePath(path) //設定によって生成される PDB ファイルパス c:/1.pdb
       . SetXmlFilePath(path) //設定によって生成される XML ファイルパス c:/1.xml
       . SetOutputFolder(outputfolder) //外部出力ディレクトリ
       . UseNatashaFileOut() //使用 outputfolder + assemblyname .dll/.pdb/.xml
       . ConfigCompilerOption(opt=>opt) //Roslyn コンパイラ オプションは、現在、専門家がニーズに合わせて調整できる、ほぼ最適な構成です
       . ConfigSyntaxOptions(opt=>opt) //構文ツリーオプションは、現在、専門家がニーズに合わせて調整できる最も適切な構成です 

       次のバージョンのサポートが計画されています
       . UseNatashaFileOut(outputfolder) //UseNatashaFileOut の 2 つの API を持つ SetOutputFolder をマージします
       . AddLogEvent(nlog=>nlog.xxx) // メソッドを使用してログ イベントを増やします
       . SetAssemblyName ("MyAssemblyName") // メソッドを使用してアセンブリ名を設定します
}
```
