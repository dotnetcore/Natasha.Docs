---
title: "Reference handling combined with multidomain"
---

## Create a domain

```cs
Gets the default domain
NatashaManagement.GetDefaultDomain();
Get the random field
NatashaManagement.CreateRandomDomain();
Gets the domain of the specified name
NatashaManagement.CreateDomain();
```

## Compile in the same domain

```cs

Preheat Natasha
NatashaManagement.Preheating();
Add a global using reference
NatashaManagement.AddGlobalUsing("System.IO");
Add metadata for the type to the global reference
If you need Natasha to automatically overwrite all references, introduce the 'DotNetCore.Compile.Environment' package.
NatashaManagement.AddGlobalReference(typeof(int));
Or append the assembly directly to the global reference
NatashaReferenceDomain.DefaultDomain.References.AddReference(assembly);

Create a domain
var domain = NatashaManagement.CreateRandomDomain();

Create a dynamic method
var action = NDelegate
    Specify the domain
    . UseDomain(domain)  
    Configuration class
    . ConfigClass(item=>item
        Specifies the name of the class in which the method resides
        . Name("myTestClass")  
        Global Using is not loaded
        . NoGlobalUsing() 
        The current domain compilation results in Using are not loaded
        . NotLoadDomainUsing()) 
    . Func<int, int, int>("return arg1+arg2;" );
Console.WriteLine(action(1, 2));  result : 3


Reuse the above classes and methods
var func = NDelegate
    . UseDomain(domain)
    . Func<int>("return myTestClass.Invoke(3,4);" );
Console.WriteLine(func());  result : 7
```