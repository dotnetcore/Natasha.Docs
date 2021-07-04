---
title: "文字列からコンパイルします"
---

文字列全体をコンパイルに渡して、Natasha の最小コンパイル単位はアセンブリです。 AssemblyCSharpBuilder を使用してください。

```cs
string text = @"
  namespace HelloWorld
  {public class Test{public Test(){
            Name=""111"";
        }public string Name;
        public int Age{get; set; }
    }
  }";


//スクリプトから動的クラスを作成する
AssemblyCSharpBuilder oop = new AssemblyCSharpBuilder();

//ここでは 100 クラスを追加しても、最終的にコンパイルされ、アセンブリに oop
されます。 Add(text);

//以下のアセンブリには、Syntax で追加したクラス
Assembly assembly = oop があります。 GetAssembly();


/または第 2 レベルの API NAssembly
//このアクションクラスには CreateClass / CreateInterface などの API 関数がありますが、最終的なビルドコンパイルは同じ AssemblyCSharpBuilder で行います
var asm = new NAssembly("MyAssembly");
asm. AddScript(text);
var type = asm. GetTypeFromShortName("Test");
var type = asm. GetTypeFromFullName("HelloWorld.Test");
```
