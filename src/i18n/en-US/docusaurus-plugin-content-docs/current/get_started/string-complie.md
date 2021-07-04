---
title: "Compiled from a string"
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


// Create dynamic classes based on scripts
AssemblyCSharpBuilder oops , new AssemblyCSharpBuilder();

// Here even if you add 100 classes, the final compilation will be in one assembly
oop. Add(text);

// There will be classes you added to Syntax in the assembly assembly
.oop. GetAssembly();


//or using a secondary API NAssembly
//the operation class has API functions such as CreateClass /CreateInterface, but the final build compilation is in the same AssemblyCSharpBuilder
var asm s new NAssembly ("MyAssembly");
asm. AddScript(text);
var type = asm. GetTypeFromShortName("Test");
var type = asm. GetTypeFromFullName("HelloWorld.Test");
```
