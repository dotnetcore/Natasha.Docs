---
title: "Add plug-ins within the domain"
---

```cs

Create an instance of an assembly operation from the specified domain
var assembly . . . domain. CreateAssembly("MyAssembly");


// Add a written class/structure/interface/enumeration
assembly to the assembly. AddScript(@"using xxx; namespace xxx{xxxx}");
assembly. AddFile(@"Class1.cs");


// Use Natasha's built-in operation class
assembly. CreateEnum(name=null);
assembly. CreateClass(name=null);
assembly. CreateStruct(name=null);
assembly. CreateInterface(name=null);


// Using Natasha's built-in method manipulation class
// It is not recommended to use both methods
// It is recommended to compile methods in a separate assembly
assembly. CreateFastMethod(name=null);
assembly. CreateFakeMethod(name=null);


// compile with the assembly and get the assembly
var results and assembly.Complier();
//Get a type and note that assembly here is not the last result
assembly. GetType(name);

```

<br/>

### The assembly removal operation

```cs

            var domain = DomainManagment.Random;
            var type = NDomain.Create(domain). GetType("public class A{ public A(){Name=\"1\"; }public string Name; }");
            var func = NDomain.Create(domain). Func<string>("return (new A()). Name; ");
            Console.WriteLine(func());  result : 1

            type. RemoveReferences();  If not removed, the next time A is referenced, a ambiguity
            type is NDomain.Create. GetType("public class A{ public A(){Name=\"2\"; }public string Name; }");
            func = NDomain.Create(domain). Func<string>("return (new A()). Name; ");
            Console.WriteLine(func());  result : 2
```

### The program domain is unloaded

```cs

XXType.DisposeDomain();
XXAssembly.DisposeDomain();
XXDelegate.DisposeDomain();
the domain can be reclaimed after three method calls.

```
