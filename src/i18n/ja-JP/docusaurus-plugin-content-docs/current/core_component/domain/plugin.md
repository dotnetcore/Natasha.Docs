---
title: "ドメイン内にプラグインを追加します"
---

```cs

プラグインをドメインに挿入
string dllPath = @"1/2/3.dll。 ;
var domain = DomainManagment.Get/Create("MyDomain");

// プラグインをファイルとしてロードする
//3.0 バージョンでは、deps.json の依存ファイル監視
var assembly = domain. LoadPluginFromFile(dllPath);
// プラグインをストリームとしてロードする
var assembly = domain. LoadPluginFromStream(dllPath);



// 参照を現在のドメインから削除すると、次のコンパイルではアセンブリの情報が含まれていません

//削除短い名前の参照
domain.

```
