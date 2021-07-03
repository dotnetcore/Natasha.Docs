---
title: "Add plug-ins within the domain"
---

```cs

Injecting plug-ins into the domain
string dllPath , "1/2/3 .dll";
var domain = DomainManagment.Get/Create("MyDomain");

// Loading plug-ins as a file
//3.0 version will perform deps.json dependent file monitoring
var assembly s domain. LoadPluginFromFile(dllPath);
// Load plug-ins in a streaming manner
var assembly s domain. LoadPluginFromStream(dllPath);



//remove the reference from the current domain and the next compilation will not take the assembly's information with

//Remove the short name reference
domain. Remove(dllPath);
// Remove assembly references, or short name references
domain. Remove(assembly);

```
