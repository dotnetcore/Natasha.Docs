---
title: "プラグイン関連"
---

<br/>

|               会員名               |                                                                機能                                                                |
|:-------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------:|
|           プラグインのロード動作           | プラグインの読み込みポリシーの決定:`None (デフォルト)`、`UseHighVersion (高いバージョン依存を使用)` 、`UseLowVersion (低バージョン依存を使用)`を、`UseBeforeIfExist (既存の場合はスキップ)` |
|      LoadPlugin(path,func)      |                             プラグインとその依存関係をロードする、パラメーター1:プラグインパス。 パラメーター 2: アセンブリ名に基づいて特定の依存関係を除外します。                              |
|  LoadPluginWithHighDependency   |                                        LoadPlugin ベースの拡張メソッド: プラグインをロードするときの動作 `使用高バージョン`                                        |
|   LoadPluginWithLowDependency   |                                        LoadPlugin ベースの拡張メソッド: プラグインをロードするときの動作 `使用低バージョン`                                        |
|   LoadPluginWithNewDependency   |                                          LoadPlugin ベースの拡張メソッド: プラグインをロードするときの動作 `何一つ`                                           |
| LoadPluginSkipDefaultDependency |                                    LoadPlugin ベースの拡張メソッド: プラグインをロードするときの動作 `UseBeforeIfExist`                                    |
|       GetPluginAssemblies       |                                                   ドメインに含まれるアセンブリのコレクションを取得します。                                                   |
|     LoadAssemblyFromStream      |                                                   ストリームをドメインに読み込み、アセンブリを返します。                                                    |
|      LoadAssemblyFromFile       |                                                    ファイルをドメインに読み込み、アセンブリを返します。                                                    |
|             参照キャッシュ             |                                                             参照キャッシュ                                                              |


<br/>

### 使用例

#### 初期化する：
```c#
又は
var domain = DomainManagement.Create("myDomain")/Random();
又は
("myDomain")を使用します。 NatashaDomainScope()){ var domain = DomainManagement.CurrentDomain;  }
又は
(DomainManagement.Create("myDomain") を使用します。 CreateScope()){ var domain = DomainManagement.CurrentDomain; }
```

### プラグインの読み込み:
```c#
プラグインが依存する dll がメイン ドメインにロードされた dll と競合する場合に
domain. LoadPluginBehavior = LoadBehaviorEnum.UseHighVersion;
var assembly = domain. LoadPlugin(dllPath);
var assembly = domain. LoadPlugin(dllPath,item=>item. Contain("xxx"));

//または
domain. LoadPluginWithHighDependency(dllPath,item=>item. StartWith("xxx"));
domain. LoadPluginWithLowDependency(dllPath,item=>item. Name!="xxx");
domain. LoadPluginWithNewDependency(dllPath,item=>true);
domain. LoadPluginSkipDefaultDependency(dllPath);
```