---
title: "2. 基本コンパイル単位"
---


- **徴兵する**

ナゲット `DotNetCore.Natasha.CSharp`


- 名前に基づいて既定のドメインにロードするアセンブリ参照ファイルを選択する

次の例は、コンパイル単位の最も一般的な機能を示しています。

```cs
AssemblyCSharpBuilder builder = new AssemblyCSharpBuilder();

アセンブリが生成されるコンパイラにドメインを割り当てます。
ビルダ。 Domain = NatashaManagement.CreateRandomDomain();
ログを検出する場合は、ここにログイベントを追加すると、デバッグはパラメータの各プロパティ値を確認できます
ビルダ。 LogCompilationEvent += Builder_LogCompilationEvent;


DLL ファイルをファイルからドメインに読み込みます。
ビルダ。 Domain.LoadAssemblyFromFile("x://xxx/x.dll");
他の人から提供されたプラグイン(dll+deps.json)ファイルをロードし、同じ名前のファイルがデフォルトドメインに存在する場合はスキップします。
同様の API は次のとおりです。
LoadPluginWithAllDependency [全加载]
LoadPluginWithHighDependency[高版本加载]
LoadPluginWithLowDependency [低版本加载]
ビルダ。 Domain.LoadPluginUseDefaultDependency("x://xxx/x.dll");
コンパイル後にアセンブリが読み込まれるときに、より高いバージョンのアセンブリ依存関係が存在する場合は、より高いバージョンの依存関係が使用されます。
ビルダ。 CompileWithAssemblyLoadBehavior(LoadBehaviorEnum.UseHighVersion) 
参照がマージされるときに参照バージョンに上位バージョンが存在する場合は、参照の上位バージョンが使用されます。           
ビルダ。 CompileWithReferenceLoadBehavior(LoadBehaviorEnum.UseHighVersion)
参照フィルター ロジックの追加          
ビルダ。 CompileWithReferencesFilter((defaultAsmName, targetAsmName)=> LoadVersionResultEnum.UseDefault) 


動的アセンブリのファイル出力に Natahsha の既定の出力ディレクトリとファイル名を使用する
パラメータはディレクトリに置き換えることができます
ビルダ。 使用するナターシャファイルアウト();
ビルダ。 SetDllFilePath(path);               生成されたDLLファイルのパスc:/1を設定します.dll
ビルダ。 SetPdbFilePath(path);               生成されたPDBファイルのパスを設定します c:/1.pdb
ビルダ。 SetXmlFilePath(path);              生成された XML ファイルのパス c:/1 を設定します.xml


コンパイラパラメータを設定し、非専門家が変更しないでください
ビルダ。 ConfigCompilerOption(opt => { });
構文ツリーパラメータを設定し、専門家以外が変更しない
ビルダ。 ConfigSyntaxOptions(opt => オプト);


コンパイル前のセマンティック フィルター (デリゲート) を追加する
ビルダ。 AddSemanticAnalysistor((currentBuilder, currentCompiler) => 現在のコンパイラ);
すべてのセマンティックフィルターをクリアして、パフォーマンスを少し向上させます
ビルダ。 ClearInnerSemanticAnalysistor();


アセンブルされたスクリプトをここに追加し、DefaultUsing.UsingScript を使用して、予熱された使用コードを取得します。
ビルダ。 Add(DefaultUsing.UsingScript + "public class A{}");
コンパイルされた動的アセンブリを取得します。
var asm = builder. GetAssembly();


型を直接取得したい場合
var タイプ = ビルダー。 GetTypeFromShortName("Test");
又は
タイプ = ビルダー。 GetTypeFromFullName("xxNamespace.xxClassName");
```

- 既知の問題***
  - 参照ファイルが見つからないエラー ナターシャ例外: "ランタイム メタデータ バージョンの値が見つかりませんでした。オブジェクトを含むアセンブリが見つからなかったか、オプションを使用して RuntimeMetadataVersion に値が指定されませんでした。 "
    - 使う `NatashaManagement.AddGlobalReference();` をクリックして、既定のドメインの参照ファイルを手動で追加します。
    - 使う `ドメイン。 LoadAssemblyFromFile / LoadPluginXXXデペンデンシー` 他のドメインへの参照を追加します。
  - 参照を使用して欠落しています。
    - 使う `NatashaManagement.AddGlobalUsing("mynamespace")` を使用してグローバルを手動で追加します。
    - 使う `ドメイン。 UsingRecorder.Using("mynamespace")` を使用して他のドメインを手動で追加します。
