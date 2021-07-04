---
title: "Natasha 3.0 plus abstracts the engine structure, separating the framework and the individual modules."
---

#### The standard packages for each module are in Natasha.Framework：

- DomainBase: Inherited from the AssemblyLoadContext class, completes some domain functionality and part abstraction standards.

  - AssemblyReferences ： the reference library needed for compilation, and the field stores the reference to the assembly as an assembly/reference dictionary.
  - GetInstance ： this method needs to be overloaded so that the Create operation of the DomainManagement class can be facilitated, that you need to return an instance of your current class, that it needs to be overloaded.
  - Default_Resolving ： method that is triggered when the system domain loads and needs to be overloaded.
  - Default_ResolvingUnmanagedDll ： method that triggers when the system domain loads non-safe code, it needs to be overloaded.
  - CompileStreamHandler ： methods that are triggered when successfully compiled as streams need to be overloaded.
  - CompileFileHandler: Methods that are triggered when successfully compiled as files need to be overloaded.
  - Remove ： method that triggers when a reference is deleted and needs to be overloaded.

  - AddDeps ： This method defaults to adding dependencies through the file path, 3.0 plus will resolve deps.json, and 2.0 plus will add only a single file.
  - AddReferences FromFolder ： add a reference library from a folder that can be overloaded.
  - AddReferences FromDepsJsonFile ： parsing the reference library from the deps.json file is overloadable.
  - AddReferencesFromDllFile ： gets the reference library from a single dll file and can be overloaded.
  - LoadPluginFromFile ： default implementation, the loading plug-in calls the AddDeps method load reference dependency, calls GetAssemblyFromFile from the file load assembly to the domain, can be overloaded.
  - LoadPluginFromStream ： default implementation, the loading plug-in calls the AddDeps method load reference dependency, and calls GetAssemblyFromStream from the stream load assembly to the domain, which can be overloaded.
  - GetAssemblyFromStream ： default implementation that distinguishes between system and custom domains, loading assemblies from stream to domain and overloading.
  - GetAssemblyFromFile ： default implementation that distinguishes between system domains and custom domains, loading assemblies from files to domains and overloading them.
  - GetDefaultReferences ： this method returns all references to a system domain and can be overloaded.
  - GetCompileReferences ： this method returns a reference to a combination of system domain and non-system domain and can be overloaded.
  - LoadPluginFromFile ： methods that trigger when plug-ins load as files can be overloaded.
  - LoadPluginFromStream ： method that triggers when a plug-in loads in a stream, can be overloaded.

- SyntaxBase: As the base class for syntax transformations, it provides a cache of code and syntax trees, specifies abstract methods, and implements methods for automatically adding caches.

  - TreeCache ： cache that holds string code and syntax trees.
  - LoadTree / LoadTreeFromScript ： each language has its own conversion method, but eventually needs to return to SyntaxTree, which you need to implement when you inherit the class, return the syntax tree for the corresponding language, and overload it.
  - AddTreeToCache ： This method automatically caches the code and syntax trees for the corresponding language and can be overloaded.

- `CompilerBase<TCompilation, TCompilationOptions>` where TCompilation : Where TCompilationOptions: CompilationOptions: Compiler abstraction, TCompilation is constrained as the Compilation type, which is the basis for compilation, and when compiling information is built, each language inherits the class, so it is the compilation basis.TCompilationOptions is constrained as the Compilation Options type, which is changed to an option class for building compiled information, when building compiled information,

  - AssemblyName: The compiler compiles the entire assembly of the current code and needs to specify the assembly name.
  - AssemblyResult: Compilation results.
  - AssemblyOutputKind ：assembly output in a way that compiles to file/compilation to stream stream.
  - Domain: This property hosts domainBase instances.
  - PreComplier ： This method is executed before compilation, and if false is returned, it will prevent compilation and can be overridden.
  - CompileToFile ： this method enables the ability to compile the above information into a file and can be rewritten.
  - CompileToStream: This method enables the ability to compile the above information into a stream and can be rewritten.
  - Compile ：this method enables automatic compilation based on the output method (AssemblyOutputKind), file calls the CompileToFile method, and stream calls the CompileToStream method.
  - CompileTrees ： syntax tree that needs to be compiled.

  - GetCompilationOptions ：returns compilation options that must be rewritten.
  - AddOption ：option setting method and customize it after you get It.
  - GetCompilation ：must be rewritten based on the compilation information set that you get that you get in different languages.

  - CompileEmitToFile： compiles the compilation into a file and must be rewritten.
  - CompileEmitToStream: Compiles compilation into memory stream and must be rewritten.

  - FileCompileSucceedHandler ： events that are raised after a file form has been compiled successfully.
  - StreamCompileSucceedHandler ：events that are raised after a streaming compilation is successful.

  - FileCompileFailedHandler ： events that are raised after file compilation fails.
  - StreamCompileFailedHandler ： events raised after a failed compilation of the streaming form.

Rewrite the above classes to complete dynamic compilation of a language, see engine implementation for details.
