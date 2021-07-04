---
title: "The domain operation"
---

The program domain, also known as the assembly context, is the carrier of the assembly, we can create a domain to isolate the code environment, or we can uninstall the domain to ensure the release and recovery of system resources, we can also use the lock domain method to ensure that the current usage environment is a locked domain. The usage is as follows：

```cs

Create a domain
DomainManagment.Create ("MyDomain");
// Remove a domain
DomainManagment.Remove ("MyDomain");
// Determine whether the domain has been deleted by a weak reference (recycled by GC)
DomainManagment.IsDeleted ("MyDomain");
// Get an ALC context
DomainManagment.Get ("MyDomain");




//Lock domain context
using ("MyDomain")
s

    var domain s domainmanagment.CurrentDomain;
    //code in 'MyDomain' domain




//Create and lock a domain context
using ("MyDomain")
s

    domain var s domainmanagment.CurrentDomain;
    //code in 'MyDomain' domain

}

```
