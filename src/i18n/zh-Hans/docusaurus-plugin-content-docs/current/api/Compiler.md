---
title: "2. 基本编译单元"
---


- **引入**

NUGET `DotNetCore.Natasha.CSharp`


- *** 根据名称选择加载到默认域的程序集引用文件 ***

以下示例展示了编译单元最常见的功能.

```cs
AssemblyCSharpBuilder builder = new AssemblyCSharpBuilder();

//给编译器分配一个域, 程序集将在该域中产生.
builder.Domain = NatashaManagement.CreateRandomDomain();
//如果你想检测日志可以在这里添加日志事件, 调试可看到参数中的每个属性值
builder.LogCompilationEvent += Builder_LogCompilationEvent;


//从文件加载 DLL 文件到该域中.
builder.Domain.LoadAssemblyFromFile("x://xxx/x.dll");
//加载其他人交付的插件(dll+deps.json)文件,如果默认域中存在同名文件,则跳过.
//同类API有:
//          LoadPluginWithAllDependency [全加载]
//          LoadPluginWithHighDependency[高版本加载]
//          LoadPluginWithLowDependency [低版本加载]
builder.Domain.LoadPluginUseDefaultDependency("x://xxx/x.dll");
//如果在编译后加载程序集时,程序集依赖存在较高的版本,则使用高版本依赖
builder.CompileWithAssemblyLoadBehavior(LoadBehaviorEnum.UseHighVersion) 
//如果在合并引用时,引用版本存在较高的版本, 则使用高版本的引用           
builder.CompileWithReferenceLoadBehavior(LoadBehaviorEnum.UseHighVersion)
//添加引用过滤逻辑          
builder.CompileWithReferencesFilter((defaultAsmName, targetAsmName)=> LoadVersionResultEnum.UseDefault) 


//使用 Natahsha 默认的输出目录及文件名进行动态程序集的文件输出
//参数可以更换目录
builder.UseNatashaFileOut();
builder.SetDllFilePath(path);               //设置生成的 DLL 文件路径  c:/1.dll
builder.SetPdbFilePath(path);               //设置生成的 PDB 文件路径  c:/1.pdb
builder.SetXmlFilePath(path);              //设置生成的 XML 文件路径  c:/1.xml


//配置编译器参数,非专业人员请勿更改
builder.ConfigCompilerOption(opt => { });
//配置语法树参数,非专业人员请勿更改
builder.ConfigSyntaxOptions(opt => opt);


//添加编译前的语义过滤器(委托)
builder.AddSemanticAnalysistor((currentBuilder, currentCompiler) => currentCompiler);
//清楚所有语义过滤器,提高一点性能
builder.ClearInnerSemanticAnalysistor();


//这里添加拼装好的脚本,使用 DefaultUsing.UsingScript 可以获取预热产生的 using 代码.
builder.Add(DefaultUsing.UsingScript + "public class A{}");
//获取编译后的动态程序集
var asm = builder.GetAssembly();


//如果你想直接获取到类型
var type = builder.GetTypeFromShortName("Test");
//或
type = builder.GetTypeFromFullName("xxNamespace.xxClassName");
```

- *** 已知问题 ***
  - 缺少引用文件报错 NatashaException:“找不到 RuntimeMetadataVersion 的值。找不到包含 System.Object 的程序集，或未通过选项为 RuntimeMetadataVersion 指定值。”  
    - 使用 `NatashaManagement.AddGlobalReference();` 来手动添加默认域的引用文件. 
    - 使用 `domain.LoadAssemblyFromFile / LoadPluginXXXDependency` 来手东添加其他域的引用文件.
  - 缺少 Using 引用;
    - 使用 `NatashaManagement.AddGlobalUsing("mynamespace")` 来手动添加全局 using.
    - 使用 `domain.UsingRecorder.Using("mynamespace")` 来手动添加其他域的 using.
