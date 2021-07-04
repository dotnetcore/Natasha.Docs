---
title: "The Natasha.CSharpEngine engine is encapsulated and integrated using the framework of Natasha.Framework."
---

Natasha.CSharpEngine is made up of：Natasha.CSharpSyntax, Natasha.CSharpCompiler, Natasha.Exception, Natasha.Domain.

- As the standard layer of C# , the compilation and syntax libraries are as follows ：

  - Natasha.CSharpSyntax： implements the Syntax Base standard in framework, and the overloaded LoadTreeFrom Lauguage method provides the upper layer with a C# syntax tree.
  - Natasha.CSharpCompiler: Implements the ComplierBase standard in Framework, and the overloaded GetCompilation method provides the upper layer with a C#compilation element.

- The NatashaCSharpEngine class is the core engine, consisting of NatashaCSharpSyntax and NatashaCSharpCompiler, where the engine partially registers the EventerBase event, which implements natashaCSharpSyntax with NatashaCSharpCompiler to automatically correct errors：

  - NatashaCSharpSyntax : Inherited from CSharpSyntax Base in Natasha.CSharpSyntax, and adds some of the functionality required by the upper library itself.
  - Natasha CSharpCompiler : Inherited from CSharp Compiler Base in Natasha.CSharpCompiler and adds some of the features required by the upper library itself.
  - Natasha.Domain ： implements the DomainBase standard in Framework, adds the ability to automatically register with DomainManagement, adds plug-in-reference management, and enhances dynamic compilation and plug-in interaction.
  - Natasha.Exception: The CompilationException class is available and integrated into the above process to collect compilation exceptions throughout the process.

- AssemblyCSharpBuilder compiles a class for exposed assemblies, inherited from NatashaCSharpEngine, encapsulates the syntax tree and compiler configuration APIs, and provides complete control over the compilation process.

You can use Natasha.CSharpSyntax and Natasha.CSharpCompiler to implement your own functionality.
