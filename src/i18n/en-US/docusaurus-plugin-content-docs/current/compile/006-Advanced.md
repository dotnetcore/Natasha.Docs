---
title: 6. Advanced Compilation Techniques
---

## API Specification

- **With Series API:** APIs used when there are conditional status switches such as closing, excluding, enumerating additional values, etc. For example: `WithCombineUsingCode` and `WithoutCombineUsingCode`, `WithHighVersionDependency`, `WithLowVersionDependency`, `WithDebugCompile`, `WithReleaseCompile`, `WithFileOutput`, etc. Another example is the API for compilation options, which are assigned as additional conditions to the options and therefore all start with 'With' (Note: Unlike the Roslyn style, the With method does not return a new object).

- **Set Series API:** Unidirectional assignment APIs, such as `SetDllFilePath`, `SetReferencesFilter`, etc.

- **Config Series API:** APIs that provide additional configurations for important components in the main class, typically for various options operations. For example: `ConfigCompilerOption`, `ConfigSyntaxOptions`, etc.

- **Special Feature API:** This type of API requires very specific and independent functionality, commonly used and prominent. For example, `UseRandomDomain`, `UseSmartMode`, `OutputAsFullAssembly`, `GetAssembly`, etc.

## Dynamic Debugging

The latest version of Natasha supports dynamic source code debugging, and you can use APIs to enable debugging.

```cs
//Write debugging information to a file, original method which may cause cross-platform compatibility issues
builder.WithDebugCompile(item=>item.WriteToFileOriginal())
//Write debugging information to a file, compatible writing method
builder.WithDebugCompile(item=>item.WriteToFile())
//Integrate debugging information into the assembly
builder.WithDebugCompile(item=>item.WriteToAssembly())
//Cannot debug in Release mode
builder.WithReleaseCompile()
//In Release mode, output with debugInfo
builder.WithFullReleaseCompile()
```

## Generate Assembly

Configurations you may need to make before the assembly is compiled

#### Assembly Name

```cs
//Set the name of the assembly
builder.SetAssemblyName();
//Use a random name (if no name is specified during initialization, a random name will be used by default)
builder.WithRandomAssenblyName();
```

#### Semantic-related Configurations

```cs
//Enable semantic checking
builder.WithSemanticCheck()
//Disable semantic checking
builder.WithoutSemanticCheck()
//Enable accessibility check during semantic creation
builder.WithAnalysisAccessibility();
//Disable accessibility check during semantic creation
builder.WithoutAnalysisAccessibility();
//Add semantic processing plugins
builder.AddSemanticAnalysistor();
//Clear built-in semantic processing plugins
builder.ClearInnerSemanticAnalysistor();
```

## Configure Compilation Details

```cs
//First use the API
builder.ConfigCompilerOption(opt=>opt);
    //Even if it is a suppressed prompt, it should still be reported (function to be explored)
    opt.WithSuppressReportor()
    //Specify the compilation platform
    opt.WithPlatform()
    //Specify the compilation flag
    opt.WithCompilerFlag()
    //Specify the output mode, library, application, or other
    opt.WithOutputKind()
    //Import all metadata
    opt.WithAllMetadata()
    //Import only internal metadata
    opt.WithInternalMetadata()
    //Import only public metadata
    opt.WithPublicMetadata()
    //Specify the diagnostic information level to report
    opt.WithDiagnosticLevel()
    //Allowed to have assemblies with the same name and lower versions
    opt.WithLowerVersionsAssembly()
    //Specify the null reference check level
    opt.WithNullableCompile()
    //Enable non-safe context compilation
    opt.WithoutUnsafeCompile()
```

## Output

#### File output

Natasha supports dll/pdb/xml file output, where xml stores information related to assembly comments.Refer to the API

```cs
//This method will output the assembly to dll/pdb/xml files in the default folder
//You can pass in a folder path
//You can pass in the paths of three files
builder.WithFileOutput(string dllFilePath, string? pdbFilePath = null, string? commentFilePath = null)
builder.WithFileOutput(string? folder = null);
//Separate APIs
builder.SetDllFilePath/SetPdbFilePath/SetCommentFilePath();
```

> Note that pdb files will not be generated in Release mode.

#### Assembly output

Natasha has assembly-related configurations

```cs
//Output the full assembly
builder.OutputAsFullAssembly();
//Output the referenced assembly, which by default does not include private members
builder.OutputAsRefAssembly();
//Include private members when outputting
builder.WithPrivateMembers();
//Do not include private members when outputting
builder.WithoutPrivateMembers();

//The compilation result is a referenced assembly, written to a file, and not loaded into the domain.
builder
  .OutputAsRefAssembly();
  .WithFileOutput()
  .WithoutInjectToDomain();
```
