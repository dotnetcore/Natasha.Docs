---
title: 4 Metadata Management and Fine-tuning
---

## Metadata Management

### Add Metadata

The new version of Natasha has added the NatashaLoadContext operation class to take over the [metadata references] and [Using Code] required for compilation;

First, get an instance of NatashaLoadContext;

```cs
var loadContext = DomainManagement.Random();
//or
var loadContext = (new AssemblyCSharpBuilder().UseRandomDomain()).LoadContext;
```

Find [metadata references] and [Using Code] from the implementing assembly and add them

```CS
loadContext.AddReferenceAndUsingCode(myType/myAssembly);
```

Find [metadata references] and [Using Code] from the referenced assembly and add them

```cs
loadContext.AddReferenceAndUsingCode(refAssemblyFilePath);
```

### Add [metadata references] separately

Add [metadata references] separately

```cs
loadContext.ReferenceRecorder.AddReference(
    AssemblyName assemblyName, 
    MetadataReference reference, 
    AssemblyCompareInfomation loadReferenceBehavior)
```

The purpose of the third parameter is: when the assemblyName already exists in the domain, use the better version.

### Add [Using Code] separately

```cs
loadContext.UsingRecorder.Using(string? @using);
loadContext.UsingRecorder.Using(IEnumerable<string> @using);
loadContext.UsingRecorder.Using(Assembly assembly);
loadContext.UsingRecorder.Using(params Assembly[] namespaces);
loadContext.UsingRecorder.Using(IEnumerable<Assembly> namespaces);
loadContext.UsingRecorder.Using(IEnumerable<Type> namespaces);
loadContext.UsingRecorder.Using(Type type);
```

## Metadata Fine-tuning

### Complete Override

Merge [metadata references] and [Using Code] of shared domain

```cs
builder.WithCombineReferences(item => item.UseAllReferences())
 builder.WithCombineUsingCode(UsingLoadBehavior.WithAll)
```

### Partial Override

Merge [metadata references] and [Using Code] of the current domain

```cs
builder.WithCurrentReferences()
 builder.WithCombineUsingCode(UsingLoadBehavior.WithCurrent)
```

### Custom

Do not override [Using Code] and use the [metadata references] passed in

```cs
builder.WithSpecifiedReferences(IEnumerable<MetadataReference> metadataReferences)
 builder.WithoutCombineUsingCode()
```
