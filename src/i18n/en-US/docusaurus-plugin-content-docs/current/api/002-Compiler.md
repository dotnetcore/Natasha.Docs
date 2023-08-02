---
title: "2. Basic compilation unit"
---


- **induct**

NUGET `DotNetCore.Natasha.CSharp`


- Select assembly reference files to load into the default domain based on name

The following example shows the most common features of compilation units.

```cs
AssemblyCSharpBuilder builder = new AssemblyCSharpBuilder();

Assign a domain to the compiler in which the assembly will be generated.
builder. Domain = NatashaManagement.CreateRandomDomain();
If you want to detect the log you can add the log event here, and the debug can see each property value in the parameter
builder. LogCompilationEvent += Builder_LogCompilationEvent;


Load DLL files from files into the domain.
builder. Domain.LoadAssemblyFromFile("x://xxx/x.dll");
Load the plugin (dll+deps.json) file delivered by someone else, skip if a file with the same name exists in the default domain.
Similar APIs are:
LoadPluginWithAllDependency [全加载]
LoadPluginWithHighDependency[高版本加载]
LoadPluginWithLowDependency [低版本加载]
builder. Domain.LoadPluginUseDefaultDependency("x://xxx/x.dll");
If a higher version of the assembly dependency exists when the assembly is loaded after compilation, the higher version dependency is used
builder. CompileWithAssemblyLoadBehavior(LoadBehaviorEnum.UseHighVersion) 
If a higher version exists for the reference version when the reference is merged, the higher version of the reference is used           
builder. CompileWithReferenceLoadBehavior(LoadBehaviorEnum.UseHighVersion)
Add reference filtering logic          
builder. CompileWithReferencesFilter((defaultAsmName, targetAsmName)=> LoadVersionResultEnum.UseDefault) 


Use the Natahsha default output directory and file name for file output of dynamic assemblies
Parameters can be replaced with directories
builder. UseNatashaFileOut();
builder. SetDllFilePath(path);               Set the generated DLL file path c:/1.dll
builder. SetPdbFilePath(path);               Set the path of the generated PDB file c:/1.pdb
builder. SetXmlFilePath(path);              Sets the generated XML file path c:/1.xml


Configure compiler parameters, do not change them by non-specialists
builder. ConfigCompilerOption(opt => { });
Configure syntax tree parameters, do not change them by non-specialists
builder. ConfigSyntaxOptions(opt => opt);


Add pre-compilation semantic filters (delegates)
builder. AddSemanticAnalysistor((currentBuilder, currentCompiler) => currentCompiler);
Clear all semantic filters to improve performance a bit
builder. ClearInnerSemanticAnalysistor();


Add the assembled script here, and use DefaultUsing.UsingScript to get the preheated using code.
builder. Add(DefaultUsing.UsingScript + "public class A{}");
Gets the compiled dynamic assembly
var asm = builder. GetAssembly();


If you want to get the type directly
var type = builder. GetTypeFromShortName("Test");
or
type = builder. GetTypeFromFullName("xxNamespace.xxClassName");
```

- Known Issues ***
  - Missing reference file error NatashaException: "The value of RuntimeMetadataVersion could not be found.The assembly containing System.Object could not be found, or a value was not specified for RuntimeMetadataVersion through the option. ”
    - use `NatashaManagement.AddGlobalReference();` to manually add the reference file for the default domain.
    - use `domain. LoadAssemblyFromFile / LoadPluginXXXDependency` Add references to other domains.
  - Missing Using references;
    - use `NatashaManagement.AddGlobalUsing("mynamespace")` to manually add a global using.
    - use `domain. UsingRecorder.Using("mynamespace")` to manually add other domains using.
