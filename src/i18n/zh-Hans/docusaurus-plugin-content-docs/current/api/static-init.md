---
title: "4. 高级编译类的初始化操作"
---

Natasha 的所有模板均继承自 ComplierTemplate ，ComplierTemplate 本身会提供静态构造方法。因此上层 API 也会被支持。

<br/>

## 使用

NDelegate / NAssembly / NClass.. / xxx_Oerator 等等以下称为 “Handler”.

<br/>

#### 静态初始化代码：

```cs

//使用 domain 域
Handler.UseDomain(domian, compiler => { 编译器配置 });


//使用某编译器的域
Handler.UseCompiler(assemblyCSharpCompiler, compiler => { 编译器配置 }));


//创建一个 "domainJim" 域
Handler.CreateDomain("domianJim", compiler => { 编译器配置 });


//使用默认域
Handler.DefaultDomain(compiler => { 编译器配置 });


//使用随机域
Handler.RandomDomain(compiler => { 编译器配置 });

```

<br/>

#### 编译器配置：

```cs
builder =>
{
     builder
       .ClearInnerSemanticAnalysistor()    //清除内置的语义过滤器
       .AddSemanticAnalysistor((asmBuilder,asmCompiltion)=>newCompiltion)           //添加自己的语义过滤器
       .DisableSemanticCheck()             //禁用语义检查(可提升一点性能)
       .DisableNullableCompile()           //禁用可空引用特性
       .CompileWithAssemblyLoadBehavior(LoadBehaviorEnum.UseHighVersion)            //如果在编译后加载程序集时,程序集依赖存在较高的版本,则使用高版本依赖
       .CompileWithReferenceLoadBehavior(LoadBehaviorEnum.UseHighVersion)           //如果在合并引用时,引用版本存在较高的版本, 则使用高版本的引用
       .CompileWithReferencesFilter((defaultAsmName, targetAsmName)=> LoadVersionResultEnum.UseDefault) //添加引用过滤逻辑
       .SetDllFilePath(path)               //设置生成的 DLL 文件路径  c:/1.dll
       .SetPdbFilePath(path)               //设置生成的 PDB 文件路径  c:/1.pdb
       .SetXmlFilePath(path)               //设置生成的 XML 文件路径  c:/1.xml
       .SetOutputFolder(outputfolder)      //对外输出目录
       .UseNatashaFileOut()                //使用 outputfolder + assemblyname .dll/.pdb/.xml
       .ConfigCompilerOption(opt=>opt)     //Roslyn 编译器选项, 目前几乎是最合适的配置,专业人士可依据需求调整
       .ConfigSyntaxOptions(opt=>opt)      //语法树 选项, 目前几乎是最合适的配置,专业人士可依据需求调整 

       //下个版本计划支持
       .UseNatashaFileOut(outputfolder)    //合并 SetOutputFolder 与 UseNatashaFileOut 两个API
       .AddLogEvent(nlog=>nlog.xxx)        //通过方法增加日志事件
       .SetAssemblyName("MyAssemblyName")  //通过方法设置程序集名
}
```
