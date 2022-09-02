---
title: "コンパイル単位"
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


// Natasha を使用する CSharp コンパイラは、文字列
AssemblyCSharpBuilder sharpBuilder = new AssemblyCSharpBuilder();

// コンパイラにランダムドメインを割り当て
sharpBuilder.Compiler.Domain = DomainManagement.Random();

//指定されたファイル出力パス
//指定されたパラメータは、指定されたパスの下に出力されます, そうでなければ、デフォルトパスに出力
sharpBuilder.UseNatashaFileOut ("c:/output");

// コードのコンパイルが間違っている場合は、ログをスローしてログを記録します。
sharpBuilder.CompileFailedEvent += (compilation, errors) =>
{
    var errorLog = compilation. GetNatashaLog();
};


// スクリプト文字列を追加
sharpBuilder.Add ("using System; public static class Test{ public static void Show(){ Console.WriteLine(\"Hello World!\"); }}");

// コンパイルアセンブリ
var assembly = sharpBuilder.GetAssembly();


// 型
var type = sharpBuilder.GetTypeFromShortName ("Test") を直接取得したい場合)
//または
type = sharpBuilder.GetTypeFromFullName("xxNamespace.xxClassName"););


// Action デリゲート
// は同じドメイン内にある必要があるため、指定されたドメイン
//書き込み呼び出しスクリプトを作成し、直前のアセンブリをスローして、using 参照
var action = NDelegate.UseDomain (sharpBuilder.Compiler.Domain) を自動的に追加します。 Action("Test.Show();" , assembly);

//実行し、Hello Worldを参照してください!
action();


//または第 2 レベルの API NAssembly
// 操作クラスには CreateClass / CreateInterface などの API 関数がありますが、最終的なビルド コンパイルはすべて同じ AssemblyCSharpBuilder で
var asm = new NAssembly ("MyAssembly"))。
asm. AddScript(text);
var type = asm. GetTypeFromShortName("Test");
var type = asm. GetTypeFromFullName("HelloWorld.Test");
```
