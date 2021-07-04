---
title: "ドメイン内にプラグインを追加します"
---

```cs

指定したドメインからアセンブリ操作のインスタンスを作成
var assembly = domain. CreateAssembly("MyAssembly");


//既に記述されているクラス/構造体/インターフェイス/列挙型の段落をアセンブリに追加する
assembly. AddScript(@"using xxx; namespace xxx{xxxx}");
assembly. AddFile(@"Class1.cs");


//Natasha に組み込まれたアクション クラス
assembly. CreateEnum(name=null);
assembly. CreateClass(name=null);
assembly. CreateStruct(name=null);
assembly. CreateInterface(name=null);


// Natasha に組み込まれたメソッドを使用してクラス
// を操作するには、両方のメソッドを使用することをお勧めしません
// メソッドを別々のアセンブリ内でコンパイルすることをお勧めします
assembly. CreateFastMethod(name=null);
assembly. CreateFakeMethod(name=null);


// アセンブリを使用してコンパイルし、アセンブリ
var result = assembly.Complier();
// 型を取得し、ここで assembly は前の手順の result
assembly ではない。

```

<br/>

### アセンブリの削除操作

```cs

            var domain = DomainManagment.Random;
            var type = NDomain.Create(domain). GetType("public class A{ public A(){Name=\"1\"; }public string Name; }");
            var func = NDomain.Create(domain). Name; ");
            Console.WriteLine(func());  result : 1

            type. RemoveReferences();  削除しない場合、次に A を参照するときに二義性が表示されます
            type = NDomain.Create(domain) です。 . GetType("public class A{ public A(){Name=\"2\"; }public string Name; }");
            func = NDomain.Create(domain). Name; ");
            Console.WriteLine(func());  result : 2
```

### プログラム ドメインのアンインストール

```cs

XXType.DisposeDomain();
XXAssembly.DisposeDomain();
XXDelegate.DisposeDomain();
呼び出した後、ドメインをリサイクルできます。

```
