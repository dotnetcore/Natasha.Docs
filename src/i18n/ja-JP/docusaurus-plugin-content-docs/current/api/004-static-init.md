---
title: "4. 高度なコンパイルクラスの初期化"
---

ナターシャのすべてのテンプレートは、それ自体が静的コンストラクターを提供する ComplierTemplate から継承します。したがって、上位レベルの API もサポートされます。

<br/>

## 使う

Nエレゲート/ナッセンブリー/NClass.. /xxx_Oerator等を以下「ハンドラ」という。

<br/>

#### 静的初期化コード：

```cs

ドメイン ドメインを使用する
Handler.UseDomain(domian, compiler => { 编译器配置 });


コンパイラーが使用されているドメイン
Handler.UseCompiler(assemblyCSharpCompiler, compiler => { 编译器配置 }));


「ドメインジム」ドメインを作成する
Handler.CreateDomain("domianJim", compiler => { 编译器配置 });


既定のドメインを使用する
Handler.DefaultDomain(compiler => { 编译器配置 });


ランダムフィールドを使用する
Handler.RandomDomain(compiler => { 编译器配置 });

```

<br/>

#### コンパイラ構成：

```cs
ビルダー=>
{
     ビルダ
       . ClearInnerSemanticAnalysistor() // 組み込みのセマンティックフィルタをクリアします
       . AddSemanticAnalysistor((asmBuilder,asmCompiltion)=>新しいコンパイル) // 独自のセマンティックフィルターを追加する
       . セマンティックチェックを無効にする() // セマンティックチェックを無効にする (パフォーマンスを少し改善)
       . DisableNullableCompile() // null 許容参照属性を無効にします。
       . CompileWithAssemblyLoadBehavior(LoadBehaviorEnum.UseHighVersion) // コンパイル後にアセンブリが読み込まれるときにアセンブリ依存関係の上位バージョンが存在する場合は、上位バージョンの依存関係が使用されます。
       . CompileWithReferenceLoadBehavior(LoadBehaviorEnum.UseHighVersion) // 参照がマージされるときに参照バージョンに新しいバージョンが存在する場合は、参照の上位バージョンが使用されます
       . CompileWithReferencesFilter((defaultAsmName, targetAsmName)=> LoadVersionResultEnum.UseDefault) // 参照フィルタリングロジックを追加
       . SetDllFilePath(path) // 生成された DLL ファイルのパス c:/1 を設定します.dll
       . SetPdbFilePath(path) // 生成された PDB ファイルのパス c:/1.pdb を設定します。
       . SetXmlFilePath(path) // 生成された XML ファイルのパス c:/1 を設定します.xml
       . SetOutputFolder(outputfolder) //Output directory
       . 使用ナターシャファイルアウト() // 出力フォルダ+アセンブリ名を使用 .dll/.pdb/.xml
       . ConfigCompilerOption(opt=>opt) //Roslyn コンパイラー・オプションは、現在ほぼ最適な構成であり、専門家がニーズに応じて調整できます。
       . ConfigSyntaxOptions(opt=>opt) //構文ツリーオプション、これは現在ほぼ最適な構成であり、専門家がニーズに応じて調整できます 

       サポートは次のリリースで計画されています
       . UseNatashaFileOut(outputfolder) // SetOutputFolder API と UseNatashaFileOut API を結合します。
       . AddLogEvent(nlog=>nlog.xxx) // メソッド別にログイベントを増やす
       . SetAssemblyName("MyAssemblyName") // メソッドを使用してアセンブリ名を設定する
}
```
