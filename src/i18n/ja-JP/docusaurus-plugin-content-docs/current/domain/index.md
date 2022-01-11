---
title: "ドメイン API クイック チェックリスト"
---

<br/>

|              メンバー名              |                                                                       役割                                                                       |
|:-------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------:|
|       LoadPluginBehavior        | プラグインの読み込みポリシーの決定:`None (デフォルト)`、`UseHighVersion (高いバージョン依存を使用)` 、UseLowVersion (低バージョン依存を使用)</code>を`、UseBeforeIfExist (既存の場合はスキップ)<code>` |
|      LoadPlugin(path,func)      |                                プラグインとその依存関係をロードします, パラメータ 1: プラグインパス; パラメータ 2: AssemblyName に基づいて特定の依存関係を除外します。                                |
|  LoadPluginWithHighDependency   |                                        LoadPlugin ベースの拡張メソッド: プラグインの読み込み時に Behavior が `UseHighVersion`                                         |
|   LoadPluginWithLowDependency   |                                         LoadPlugin ベースの拡張メソッド: プラグインの読み込み時に Behavior が `UseLowVersion`                                         |
|   LoadPluginWithNewDependency   |                                             LoadPlugin ベースの拡張メソッド: プラグインの読み込み時に Behavior が `None`                                              |
| LoadPluginSkipDefaultDependency |                                       LoadPlugin ベースの拡張メソッド: プラグインの読み込み時に Behavior が `UseBeforeIfExist`                                        |
|       GetPluginAssemblies       |                                                          ドメインに含まれるアセンブリのコレクションを取得します                                                           |
|     LoadAssemblyFromStream      |                                                           ドメインにストリームを読み込み、アセンブリを返します                                                           |
|      LoadAssemblyFromFile       |                                                           ドメインにファイルを読み込み、アセンブリを返します                                                            |
|         ReferenceCache          |                                                                    参照キャッシュ                                                                     |


<br/>

### 使用例

#### 初期化:
```c#
または
var domain = DomainManagement.Create ("myDomain")/Random();
//または
using ("myDomain". NatashaDomainScope()){ var domain = DomainManagement.CurrentDomain;  }
//または
using (DomainManagement.Create("myDomain"). CreateScope()){ var domain = DomainManagement.CurrentDomain; }
```

### プラグインの読み込み:
```c#
//决定插件所依赖的dll 在与主域加载的dll发生冲突时所
domain.LoadPluginBehavior = LoadBehaviorEnum.UseHighVersion;
var assembly = domain.LoadPlugin(dllPath);
var assembly = domain.LoadPlugin(dllPath,item=>item.Contain("xxx"));

//或
domain.LoadPluginWithHighDependency(dllPath,item=>item.StartWith("xxx"));
domain.LoadPluginWithLowDependency(dllPath,item=>item.Name!="xxx");
domain.LoadPluginWithNewDependency(dllPath,item=>true);
domain.LoadPluginSkipDefaultDependency(dllPath);
```