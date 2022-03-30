---
title: "The Natasha.CSharpEngine engine is encapsulated and integrated using the framework of Natasha.Framework."
---

Natasha structure diagram:

![png](/images/framework-natasha-all.svg)

Natasha.Framework provides Natasha with the core compilation class standards, and developers who need to write compilation capabilities need to implement the various abstract classes in Natasha.Framework (as followed).

Natasha.Framework is divided into two parts:
  - Syntax tree and compiler based on Roslyn standard.
  - Runtime-based domain implementation.

Wherein, SyntaxBase provides a conversion interface for string-to-syntax trees, but the syntax tree for exactly what language needs to be implemented or referenced by itself, and the syntax tree also needs to be compatible with the Roslyn syntax tree for compilation into the compiler.  The compiler here also has compilers in different languages, requiring developers to reference or implement them themselves. Framework projects simply provide an abstract implementation of Roslyn, so we can easily use abstract implementations to draw up the compilation process and even customize our own compilation framework.  
another part is Runtime's domain abstraction, Natasha's domain-based class provisions and implementation of part of the API, which can be very good for compiling and implementing memory-to-assembly conversion and reference management.

Natasha in Natasha.CSharp.Engine uses the abstract classes provided by the Framework project to complete the entire process of C# from script to assembly into the domain, and provides more detailed and more perfect implementation in terms of exception control and semantic pre-processing, making Engine more of a complete and feasible dynamic compilation scenario. Engine has opened up the component registration interface, and can register the implemented syntax tree/compiler/domain into the entities that have been implemented into the Engine to give the dynamic compilation soul, such as Natasha implementing the framework abstract base class, Natasha AssemblyDomain / Natasha CSharp Corppiler / NatashaCSharpSyntax three features that define the functionality of the domain / the functionality of the CSharp compiler / CSharp syntax tree. By this point Natasha.CSharp.Engine is ready for dynamic compilation.

As for the outer template API and the flat Script Utils are both processed for strings and metadata, mainly for more convenient dynamic construction, Natasha.CSharp.Reverser is the implementation of the Script Utils layer, which mainly provides the ability to restore metadata as strings; Natasha.CSharp.Template provides a friendlier API on all basis, to facilitate developers to reduce the cost of using dynamic compilation libraries.

Natasha.CSharp.All integrates all Natasha CSharp dynamic compilation related components, and provides initialization functions to complete component registration and dynamic compilation of warm-up loading.

```cs
NatashaInitializer.Preheating();
```

![png](/images/framework-natasha-component.svg)