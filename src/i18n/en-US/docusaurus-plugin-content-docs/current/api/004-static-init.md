---
title: "4. Initialization of advanced compilation classes"
---

Natasha 的所有模板均继承自 ComplierTemplate ，ComplierTemplate 本身会提供静态构造方法。因此上层 API 也会被支持。Therefore, the upper-level API is also supported.Therefore, upper-level APIs will also be supported.

<br/>

## use

NDelegate / NAssembly / NClass.. / xxx_Oerator etc. are hereinafter referred to as "handler".

<br/>

#### Static initialization code：

```cs

Use the domain domain
Handler.UseDomain(domian, compiler => { 编译器配置 });


The domain in which a compiler is used
Handler.UseCompiler(assemblyCSharpCompiler, compiler => { 编译器配置 }));


Create a "domainJim" domain
Handler.CreateDomain("domianJim", compiler => { 编译器配置 });


Use the default domain
Handler.DefaultDomain(compiler => { 编译器配置 });


Use a random field
Handler.RandomDomain(compiler => { 编译器配置 });

```

<br/>

#### Compiler configuration：

```cs
builder =>
{
     builder
       . ClearInnerSemanticAnalysistor() // clears the built-in semantic filter
       . AddSemanticAnalysistor((asmBuilder,asmCompiltion)=>newCompiltion) // Add your own semantic filters
       . DisableSemanticCheck() // Disable semantic checking (improves performance a bit)
       . DisableNullableCompile() // Disables the nullable reference attribute
       . CompileWithAssemblyLoadBehavior(LoadBehaviorEnum.UseHighVersion) // If a higher version of the assembly dependency exists when the assembly is loaded after compilation, the higher version dependency is used
       . CompileWithReferenceLoadBehavior(LoadBehaviorEnum.UseHighVersion) // If a later version exists for the reference version when the reference is merged, the higher version of the reference is used
       . CompileWithReferencesFilter((defaultAsmName, targetAsmName)=> LoadVersionResultEnum.UseDefault) // Add reference filtering logic
       . SetDllFilePath(path) // sets the generated DLL file path c:/1.dll
       . SetPdbFilePath(path) // Sets the path c:/1.pdb of the generated PDB file
       . SetXmlFilePath(path) // Sets the generated XML file path c:/1.xml
       . SetOutputFolder(outputfolder) //Output directory
       . UseNatashaFileOut() // Use outputfolder + assemblyname .dll/.pdb/.xml
       . ConfigCompilerOption(opt=>opt) //Roslyn compiler options, which are currently almost the most suitable configuration and can be adjusted by professionals according to their needs
       . ConfigSyntaxOptions(opt=>opt) //syntax tree option, which is currently almost the most suitable configuration and can be adjusted by professionals according to their needs 

       Support is planned for the next release
       . UseNatashaFileOut(outputfolder) // Combines the SetOutputFolder and UseNatashaFileOut APIs
       . AddLogEvent(nlog=>nlog.xxx) // Increase log events by method
       . SetAssemblyName("MyAssemblyName") // Set the assembly name via the method
}
```
