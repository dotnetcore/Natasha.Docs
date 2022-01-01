---
title: "域 API 速查表"
---

<br/>

|        成员名        |                 作用                  | 
| :----------------: | :-----------------------------------: |  
|     LoadPluginBehavior      | 决定插件加载策略:`None(默认)`,`UseHighVersion(使用高版本依赖)` ,`UseLowVersion(使用低版本依赖)`,`UseBeforeIfExist(如果已有则跳过)`|  
|     LoadPlugin(path,func)      | 加载插件及其依赖,参数1:插件路径;参数2:根据 AssemblyName 排除某些依赖; |  
|     LoadPluginWithHighDependency | 基于 LoadPlugin 的扩展方法: 加载插件时 Behavior 为 `UseHighVersion` |
|     LoadPluginWithLowDependency | 基于 LoadPlugin 扩展方法: 加载插件时 Behavior 为 `UseLowVersion` |
|     LoadPluginWithNewDependency | 基于 LoadPlugin 扩展方法: 加载插件时 Behavior 为 `None` |
|     LoadPluginSkipDefaultDependency | 基于 LoadPlugin 扩展方法: 加载插件时 Behavior 为 `UseBeforeIfExist` |
|     GetPluginAssemblies      |   获取该域含有的程序集集合   |  
|     LoadAssemblyFromStream       |   加载一个流到域并返回程序集   |  
|     LoadAssemblyFromFile     |     加载一个文件到域并返回程序集       |  
|     ReferenceCache   |  引用缓存  |


<br/>

### 使用案例

#### 初始化:
```c#
//或者
var domain = DomainManagement.Create("myDomain")/Random();
//或者
using ("myDomain".NatashaDomainScope()){ var domain = DomainManagement.CurrentDomain;  }
//或者
using (DomainManagement.Create("myDomain").CreateScope()){ var domain = DomainManagement.CurrentDomain;}
```

### 插件加载:
```c#
//决定插件所依赖的dll 在与主域加载的dll发生冲突时所
domain.LoadPluginBehavior = LoadBehaviorEnum.UseHighVersion;
var assembly = domain.LoadPlugin(dllPath);
var assembly = domain.LoadPlugin(dllPath,item=>item.Contain("xxx"));

//或
domain.LoadPluginWithHighDependency(dllPath,item=>item.StartWith("xxx"));
domain.LoadPluginWithLowDependency(dllPath,item=>item.Name!="xxx");
domain.LoadPluginWithNewDependency(dllPath,item=>true);
domain.LoadPluginSkipDefaultDependency(dllPath);
```