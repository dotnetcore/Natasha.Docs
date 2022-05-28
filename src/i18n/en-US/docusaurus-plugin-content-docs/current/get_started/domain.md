---
title: "Reference handling with multi-domain combinations"
---

## Create a domain

```cs
Get default domain
NatashaManagement.GetDefaultDomain();
//Get random domain
NatashaManagement.CreateRandomDomain();
//Get the domain with the specified name
NatashaManagement.CreateDomain();
```

## Same-domain compilation

```cs

Warm-up Natasha
NatashaManagement.Preheating();
//Add global Using reference
NatashaManagement.AddGlobalUsing("System.IO");
// Add metadata for types to global references
// If Natasha automatically overwrites all references, introduce the 'DotNetCore.Compile.Environment' package.
NatashaManagement.AddGlobalReference(typeof(int));
// or append the assembly directly to the global reference
//NatashaReferenceDomain.DefaultDomain.References.AddReference(assembly);

//Create a domain
var domain = NatashaManagement.CreateRandomDomain();

// Create a dynamic method
var action = NDelegate
    //Specify Domain
    . UseDomain(domain)  
    //Configuration Class
    . ConfigClass(item=>item
        //Specifies the name of the class in which the method is located
        . Name("myTestClass")  
        //Does not load the global Using
        . NoGlobalUsing() 
        // Does not load the Using
        produced by the current domain compilation. NotLoadDomainUsing()) 
    . Func<int, int, int>("return arg1+arg2;" );
Console.WriteLine(action(1, 2)); result : 3


//Multiplex the above class and method
var func = NDelegate
    . UseDomain(domain)
    . Func<int>("return myTestClass.Invoke(3,4);" );
Console.WriteLine(func());  result : 7
```