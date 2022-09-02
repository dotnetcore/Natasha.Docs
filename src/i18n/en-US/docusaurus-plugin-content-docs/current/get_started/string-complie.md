---
title: "Compilation unit"
---

传入整个字符串进行编译， Natasha 的最小编译单元为程序集。 请使用 AssemblyCSharpBuilder . Please use AssemblyCSharpBuilder .

```cs
string text = @"
  namespace HelloWorld
  {public class Test{public Test(){
            Name=""111"";
        }public string Name;
        public int Age{get; set; }
    }
  }";


//Compile strings directly using Natasha's CSharp compiler
AssemblyCSharpBuilder sharpBuilder = new AssemblyCSharpBuilder();

// Assign a random domain to the compiler
sharpBuilder.Compiler.Domain = DomainManagement.Random();

//Specify file output path
//Specify the parameter output to the specified path, otherwise output to the default path
sharpBuilder.UseNatashaFileOut("c:/output");

// If the code compiles incorrectly, it is thrown and logged.
sharpBuilder.CompileFailedEvent += (compilation, errors) =>
{
    var errorLog = compilation. GetNatashaLog();
};


// Add your script string
sharpBuilder.Add("using System; public static class Test{ public static void Show(){ Console.WriteLine(\"Hello World!\"); }}");

//Compile an assembly
var assembly = sharpBuilder.GetAssembly();


// If you want to get the type directly
var type = sharpBuilder.GetTypeFromShortName("Test");
//or
type = sharpBuilder.GetTypeFromFullName("xxNamespace.xxClassName");


// Create an Action delegate
// must be in the same domain, so specify the domain
// Write the calling script and throw in the assembly just now, which will automatically add a using reference
var action = NDelegate.UseDomain(sharpBuilder.Compiler.Domain). Action("Test.Show();" , assembly);

//Run, see Hello World!
action();


// or using the second-level API NAssembly
// The operation class has API functions such as CreateClass / CreateInterface, but the final build compilation will be in the same AssemblyCSharpBuilder
var asm = new NAssembly("MyAssembly");
asm. AddScript(text);
var type = asm. GetTypeFromShortName("Test");
var type = asm. GetTypeFromFullName("HelloWorld.Test");
```
