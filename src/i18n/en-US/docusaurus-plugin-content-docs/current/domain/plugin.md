---
title: "Plugin related"
---

<br/>

|           Member name           |                                                                                                   function                                                                                                    |
|:-------------------------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|       LoadPluginBehavior        | Decide on the plugin loading strategy:`None (default)`,`UseHighVersion (using high-version dependencies)` ,`UseLowVersion (using low-version dependencies)`,`UseBeforeIfExist (skip if you already have one)` |
|      LoadPlugin(path,func)      |                                       Load plugins and their dependencies, parameter 1: plug-in path; Parameter 2: Exclude certain dependencies based on AssemblyName;                                        |
|  LoadPluginWithHighDependency   |                                                               LoadPlugin-based extension method: Behavior when loading plugin `UseHighVersion`                                                                |
|   LoadPluginWithLowDependency   |                                                                LoadPlugin-based extension method: Behavior when loading plugin `UseLowVersion`                                                                |
|   LoadPluginWithNewDependency   |                                                                    LoadPlugin-based extension method: Behavior when loading plugin `None`                                                                     |
| LoadPluginSkipDefaultDependency |                                                              LoadPlugin-based extension method: Behavior when loading plugin `UseBeforeIfExist`                                                               |
|       GetPluginAssemblies       |                                                                          Gets the collection of assemblies that the domain contains                                                                           |
|     LoadAssemblyFromStream      |                                                                             Loads a stream to the domain and returns the assembly                                                                             |
|      LoadAssemblyFromFile       |                                                                             Loads a file into the domain and returns the assembly                                                                             |
|         ReferenceCache          |                                                                                                Reference cache                                                                                                |


<br/>

### Use case

#### Initialize:
```c#
or
var domain = DomainManagement.Create("myDomain")/Random();
or
using ("myDomain". NatashaDomainScope()){ var domain = DomainManagement.CurrentDomain;  }
or
using (DomainManagement.Create("myDomain"). CreateScope()){ var domain = DomainManagement.CurrentDomain; }
```

### Plugin loading:
```c#
Determines what DLLs the plug-in depends on in case of conflict with DLLs loaded by the main domain
domain. LoadPluginBehavior = LoadBehaviorEnum.UseHighVersion;
var assembly = domain. LoadPlugin(dllPath);
var assembly = domain. LoadPlugin(dllPath,item=>item. Contain("xxx"));

or
domain. LoadPluginWithHighDependency(dllPath,item=>item. StartWith("xxx"));
domain. LoadPluginWithLowDependency(dllPath,item=>item. Name!="xxx");
domain. LoadPluginWithNewDependency(dllPath,item=>true);
domain. LoadPluginSkipDefaultDependency(dllPath);
```