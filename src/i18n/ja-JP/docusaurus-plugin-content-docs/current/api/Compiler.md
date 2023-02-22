---
title: "2. 基本コンパイル単位"
---


- **導入**

NUGET `DotNetCore.Natasha.CSharp`


- 名前に基づいて既定のドメインに読み込まれるアセンブリ参照ファイルを選択します***

次の例は、コンパイル単位の最も一般的な機能を示しています。

```cs
AssemblyCSharpBuilder builder = new AssemblyCSharpBuilder();

アセンブリが生成されるドメインをコンパイラに割り当てます。
builder. Domain = NatashaManagement.CreateRandomDomain();
ログを検出する場合は、ここでログ イベントを追加できます
builder. LogCompilationEvent += Builder_LogCompilationEvent;


ファイルからそのドメインに DLL ファイルを読み込みます。
builder. Domain.LoadAssemblyFromFile("x://xxx/x.dll");
他のユーザーが配信したプラグイン (dll+deps.json) ファイルを読み込み、既定のドメインに同じ名前のファイルが存在する場合はスキップします。
同様の API には、次のものがあります。
LoadPluginWithAllDependency [全加载]
LoadPluginWithHighDependency[高版本加载]
LoadPluginWithLowDependency [低版本加载]
builder. Domain.LoadPluginUseDefaultDependency("x://xxx/x.dll");
コンパイル後にアセンブリを読み込むときに、アセンブリの依存関係が高いバージョンが存在する場合は、高いバージョン依存が使用されます
builder. CompileWithAssemblyLoadBehavior(LoadBehaviorEnum.UseHighVersion) 
参照をマージするときに参照バージョンが上位バージョンにある場合は、上位バージョンの参照が使用されます           
builder. CompileWithReferenceLoadBehavior(LoadBehaviorEnum.UseHighVersion)
参照フィルタ ロジックを追加します          
builder. CompileWithReferencesFilter((defaultAsmName, targetAsmName)=> LoadVersionResultEnum.UseDefault) 


Natahsha の既定の出力ディレクトリとファイル名を使用して、動的アセンブリのファイル出力を行います
パラメータはカタログを置き換えることができます
builder. UseNatashaFileOut();
builder. SetDllFilePath(path);               生成された DLL ファイル パス c:/1.dllを設定します
builder. SetPdbFilePath(path);               生成された PDB ファイル パス c:/1.pdbを設定します
builder. SetXmlFilePath(path);              生成された XML ファイル パス c:/1.xmlを設定します


コンパイラ パラメータを構成し、専門家以外のユーザーは変更しないでください
builder. ConfigCompilerOption(opt => { });
構文ツリー パラメータを構成し、専門家以外のユーザーは変更しないでください
builder. ConfigSyntaxOptions(opt => opt);


コンパイル前のセマンティック フィルタの追加 (デリゲート)
builder. AddSemanticAnalysistor((currentBuilder, currentCompiler) => currentCompiler);
すべてのセマンティック フィルタを明確にし、パフォーマンスを向上させます
builder. ClearInnerSemanticAnalysistor();


ここでは、DefaultUsing.UsingScript を使用してウォームアップによって生成された using コードを取得する、組み立てられたスクリプトを追加します。
builder. Add(DefaultUsing.UsingScript + "public class A{}");
コンパイルされた動的アセンブリを取得します
var asm = builder. GetAssembly();


型に直接取得する場合
var type = builder. GetTypeFromShortName("Test");
または
type = builder. GetTypeFromFullName("xxNamespace.xxClassName");
```

- 既知の問題 ***
  - 参照ファイル エラー NatashaExceptionがありません: "RuntimeMetadataVersion の値が見つかりません。System.Object を含むアセンブリが見つからないか、オプションによって RuntimeMetadataVersion に値が指定されていません。 ”
    - 使用します `NatashaManagement.AddGlobalReference();` 既定のドメインの参照ファイルを手動で追加します。
    - 使用します `domain. LoadAssemblyFromFile / LoadPluginXXXDependency` 他のドメインの参照ファイルを追加するために手を取る.
  - Using 参照がありません。
    - 使用します `NatashaManagement.AddGlobalUsing("mynamespace")` を使用して、グローバル using を手動で追加します。
    - 使用します `domain. UsingRecorder.Using("mynamespace")` を使用して、他のドメインの using を手動で追加します。
