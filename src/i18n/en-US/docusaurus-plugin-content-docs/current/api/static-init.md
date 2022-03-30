---
title: "Static initialization operation"
---

Natasha 的所有模板均继承自 ComplierTemplate ，ComplierTemplate 本身会提供静态构造方法。因此上层 API 也会被支持。Therefore, the upper-level API is also supported.Therefore, the upper-level API is also supported.

<br/>

## use

NDelegate / NAssembly / NClass.. / xxx_Oerator and so on is called "Handler".

<br/>

#### Static initialization code：

```cs

Use domain domain
Handler.UseDomain (domian, compiler s> { 编译器配置 });


// Use a compiler's domain
Handler.UseCompiler (assemblyCSharpCompiler, compiler s> { 编译器配置 }));


// Create a "domainJim" domain
Handler.CreateDomain ("domian Jim", compiler s> { 编译器配置 });


// Use the default domain
Handler.DefaultDomain (compiler s> { 编译器配置 });


// Use random domain
Handler.RandomDomain (compiler s> { 编译器配置 });

```

<br/>

#### Compiler configuration：

```cs
builder =>
{
     builder
       . ClearInnerSemanticAnalysistor() //Clear built-in semantic filter
       . AddSemanticAnalysistor((asmBuilder, asmCompiltion)=>newCompiltion) //Add your own semantic filter
       . DisableSemanticCheck() //Disable semantic checking (improves performance a bit)
       . DisableNullableCompile() //Disable nullable reference feature
       . CompileWithAssemblyLoadBehavior(LoadBehaviorEnum.UseHighVersion) // If a higher version exists in the assembly dependency when the assembly is loaded as a result of compilation, a higher version dependency is used
       . CompileWithReferenceLoadBehavior(LoadBehaviorEnum.UseHighVersion) // If a higher version exists for the reference version when merging references, a reference from a higher version is used
       . CompileWithReferencesFilter((defaultAsmName, targetAsmName)=> LoadVersionResultEnum.UseDefault) //Add reference filtering logic
       . SetDllFilePath(path) //Sets the generated DLL file path c:/1.dll
       . SetPdbFilePath(path) //Set the generated PDB file path c:/1.pdb
       . SetXmlFilePath(path) //Sets the generated XML file path c:/1.xml
       . SetOutputFolder(outputfolder) //External Output Directory
       . UseNatashaFileOut() //Use outputfolder + assemblyname .dll/.pdb/.xml
       . ConfigCompilerOption(opt=>opt) //Roslyn compiler option, currently almost the most suitable configuration, professionals can adjust the
       according to their needs . ConfigSyntaxOptions(opt=>opt) //syntax tree option, currently almost the most suitable configuration for professionals to adjust to their needs 

       // Next release plan support
       . UseNatashaFileOut(outputfolder) //Merge setOutputFolder and UseNatashaFileOut two APIs
       . AddLogEvent(nlog=>nlog.xxx) // Increase log events by
       . SetAssemblyName("MyAssemblyName") // Set assembly name by method
}
```
