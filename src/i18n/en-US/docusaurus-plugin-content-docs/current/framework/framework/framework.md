---
title: "Natasha 3.0 plus abstracts the engine structure, separating the framework and the individual modules."
---

#### The standard packages for each module are in Natasha.Framework：

- DomainBase: Inherited from the AssemblyLoadContext class, completes some domain functionality and part abstraction standards.

  - field:
    - Field DefaultDomain : The implementation of the default domain, the program main domain can not be unloaded.
    - Field AddAssemblyEvent : Events triggered when the assembly loads.
    - Field RemoveAssemblyEvent : Events triggered when an assembly is deleted.
    - Field UseNewVersionAsmebly : If a newer reference is found, the reference is updated with the version.
    - Field AssemblyReferencesCache : Stores memory streams compiled from assemblies and references.
    - Field OtherReferences FromFile : Stores references loaded separately by external files.
    - Field Count : Number of references to the current domain.

  - Abstract method:
    - Abstract method GetReferenceElements: Returns a collection of reference elements for the current domain, for example: using System;
    - Abstract method LoadPlugin : Load plugin.
    - Abstract method RemovePlugin : Remove plug-in.
    - Abstract method GetPlugin Assemblies : Gets a collection of plug-in assemblies within the current domain.
    - Abstract method Default_Resolving: Default domain load event.
    - Abstract method Default_ResolvingUnmanagedDll: Default domain unmanaged assembly load event.
    - Abstract method GetCompileReferences: Get all references to the system domain plus the current domain.
    - Abstract method CompileStreamCallback : What to do after memory compilation flows over.

  - Virtual method:
    - Virtual method RemoveReference: Remove the reference to the external file.
    - Virtual method RemoveReference: Remove the reference to the assembly.
    - Virtual method AddReferences FromAssembly : Add a reference to the assembly.
    - Virtual method AddReferences FromDllFile : Add a single reference according to the DLL path and load it into a reference as a file.
    - Virtual method AddReferences FromFileStream: Add a single reference based on the DLL path and load it as a reference in a stream.
    - Virtual method AddReferences FromAssemblyStream: Add assembly and memory streams to the reference cache.
    - Virtual method AddReferences FromFolder : Scan the folder and add the DLL file under the folder to the reference.
    - Virtual method LoadAssemblyFromFile : Convert files to assemblies, cache references, and load assemblies into domains.
    - Virtual method LoadAssemblyFromStream : Converts a stream to an assembly, caches references, and loads the assembly into the domain.
    - Virtual method LoadAssemblyFromStream: Converts a file stream into an assembly, caches references, and loads the assembly into the domain.
    - Virtual method Dispose : Clear reference, destroy function.

  - Protection overload:
    - Protect overloaded Load: The method that must be implemented.
    - Protect overloaded LoadUnmanagedDll : The method that must be implemented.

<br/>

- SyntaxBase: As the base class for syntax transformations, it provides a cache of code and syntax trees, specifies abstract methods, and implements methods for automatically adding caches.

  - field:
    - Field TreeCache ： cache that holds string code and syntax trees.
    - Field ReferenceCache : Reference Cache.

  - method:
    - Method Clear : Clear both caches.

  - Abstract method:
    - Abstract method ConvertToTree : Convert scripts to syntax trees.
    - Abstract Method FormartTree : Load the syntax tree and format it.

  - Virtual method:
    - Virtual method AddTreeToCache : Adding a tree to the cache requires overloading ConvertToTree for syntax tree conversion.
    - Virtual method AddTreeToCache : Load syntax tree and cache, loadTree needs to be overloaded to implement internal functionality.


<br/>

- `CompilerBase<TCompilation, TCompilationOptions>` where TCompilation : Compilation where TCompilationOptions : CompilationOptions: 编译器抽象， TCompilation 被约束为 Compilation 类型，该类为编译的基础类，在构建编译信息时，每种语言都会对该类进行继承改造，因此它是编译基础。TCompilationOptions 被约束为 CompilationOptions 类型, 改类为构建编译信息的选项类，在构建编译信息时，TCompilationOptions is constrained as the Compilation Options type, which is changed to an option class for building compiled information, when building compiled information,TCompilationOptions is bound to the CompilOptions type.

  - field:
    - Field AllowUnsafe: Whether non-secure code compilation is allowed.
    - Field AssemblyName : The compiler compiles the entire assembly of the current code and needs to specify the assembly name.
    - Field OutputFilePath : DLL file output path.
    - Field OutputPdbPath : PDB file output path.
    - Field Compilation : Compilation unit.
    - Field AssemblyKind : Assembly Output Type, Console, Windows, DLL, etc.
    - Field ProcessorPlatform : Processor platform, x86, x64, etc.
    - Field AssemblyOutputKind : How assemblies are built, files / streams.
    - Field CodeOptimizationLevel : Code Optimization, Debug / Release.
    - Field OptionAction : External compilation option delegate.
    - Field CompileSucceedEvent : Events triggered after a successful stream compilation.
    - Field CompileFailedEvent : Events triggered after stream compilation failure.
    - Field _semanticAnalysistor : User-defined semantic analyzer.

  - attribute:
    - Property Domain : Domain.
    - Property SyntaxTrees : A collection of syntax trees that exist in the compilation unit.

  - method:
    - Method AddOption : The operation on the option after the option is built.
    - Method AppendSemantic Analyticstor: Append Semantic Analysis Delegate.
    - Method SetSemantic Analyticstor: Empty and set up semantic analysis delegates.

  - Virtual method:
    - Virtual method ComplieToAssembly : the concrete implementation of compiling logic that outputs the compilation unit into an assembly.
    - Virtual Method PreCompiler: What to do before building compiled information.

  - Abstract method:
    - Abstract method GetCompilation : Get a specific type of compilation unit, which should have been configured for Option.
    - Abstract method GetCompilationOptions : Prepare compilation options for compilation units.

Rewrite the above classes to complete dynamic compilation of a language, see engine implementation for details.
