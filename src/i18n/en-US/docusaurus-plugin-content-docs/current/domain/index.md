---
title: "Domain API cheat sheet"
---

<br/>

|           Member name           |                                                                 function                                                                 |
|:-------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------:|
|       LoadPluginBehavior        | Decide on the plugin loading strategy:`None (default)`,`UseHighVersion` ,`UseLowVersion`,`UseBeforeIfExist (skip if one already exists)` |
|      LoadPlugin(path,func)      |   Load the plugin and its dependencies, parameter 1: plugin path; Parameter 2: Exclude certain dependencies according to AssemblyName;   |
|  LoadPluginWithHighDependency   |                                  LoadPlugin-based extension: Load plugin with behavior `UseHighVersion`                                  |
|   LoadPluginWithLowDependency   |                            LoadPlugin-based extension method: Behavior is `UseLowVersion`when loading plugins                            |
|   LoadPluginWithNewDependency   |                              LoadPlugin-based extension method: Behavior is `None when loading the plugin`                               |
| LoadPluginSkipDefaultDependency |                          LoadPlugin-based extension method: Behavior when loading plugins is `UseBeforeIfExist`                          |
|       GetPluginAssemblies       |                                        Gets the collection of assemblies that the domain contains                                        |
|     LoadAssemblyFromStream      |                                          Loads a stream to the domain and returns the assembly                                           |
|      LoadAssemblyFromFile       |                                          Loads a file into the domain and returns the assembly                                           |
|         ReferenceCache          |                                                            Reference caching                                                             |


<br/>

### Use case

#### initialize:
```c#
or
var domain = DomainManagement.Create("myDomain")/Random();
//or
using ("myDomain". NatashaDomainScope()){ var domain = DomainManagement.CurrentDomain;  }
//or
using (DomainManagement.Create("myDomain"). CreateScope()){ var domain = DomainManagement.CurrentDomain; }
```

### Plugin loading:
```c#
Decide which dll the plugin depends on
domain when it conflicts with the dll loaded by the main domain. LoadPluginBehavior = LoadBehaviorEnum.UseHighVersion;
var assembly = domain. LoadPlugin(dllPath);
var assembly = domain. LoadPlugin(dllPath,item=>item. Contain("xxx"));

//or
domain. LoadPluginWithHighDependency(dllPath,item=>item. StartWith("xxx"));
domain. LoadPluginWithLowDependency(dllPath,item=>item. Name!="xxx");
domain. LoadPluginWithNewDependency(dllPath,item=>true);
domain. LoadPluginSkipDefaultDependency(dllPath);
```