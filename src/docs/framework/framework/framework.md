---
title: "Natasha 3.0+ 抽象了引擎结构，分离出了框架以及各个模块。"
---

#### 各模块的标准封装在 Natasha.Framework 中：

- DomainBase: 继承自 AssemblyLoadContext 类，完成了部分域功能及部分抽象标准。

  - 字段 : 
    - 字段 DefaultDomain : 默认域的实现, 程序主域不可卸载.
    - 字段 AddAssemblyEvent : 程序集加载时触发的事件.
    - 字段 RemoveAssemblyEvent : 程序集删除时触发的事件.
    - 字段 UseNewVersionAssmebly : 如果发现有较新的引用则使用版本更新的引用.
    - 字段 AssemblyReferencesCache : 存放内存流编译过来的程序集与引用.
    - 字段 OtherReferencesFromFile : 存放由外部文件单独加载的引用.
    - 字段 Count : 当前域的引用数量.
  
  - 抽象方法 :
    - 抽象方法 GetReferenceElements : 返回当前域的引用元素集合, 例如: using System; 
    - 抽象方法 LoadPlugin : 加载插件.
    - 抽象方法 RemovePlugin : 移除插件.
    - 抽象方法 GetPluginAssemblies : 获取当前域内的插件程序集集合.
    - 抽象方法 Default_Resolving : 默认域加载事件.
    - 抽象方法 Default_ResolvingUnmanagedDll : 默认域非托管程序集加载事件.
    - 抽象方法 GetCompileReferences : 获取系统域+当前域的所有引用.
    - 抽象方法 CompileStreamCallback : 内存编译流过来之后需要如何处理.
  
  - 虚方法:
    - 虚方法 RemoveReference : 移除外部文件对应的引用.
    - 虚方法 RemoveReference : 移除程序集对应的引用.
    - 虚方法 AddReferencesFromAssembly : 添加该程序集的引用.
    - 虚方法 AddReferencesFromDllFile : 根据 DLL 路径添加单个引用,以文件方式加载成引用.
    - 虚方法 AddReferencesFromFileStream : 根据 DLL 路径添加单个引用,以流方式加载成引用.
    - 虚方法 AddReferencesFromAssemblyStream : 将程序集和内存流添加到引用缓存.
    - 虚方法 AddReferencesFromFolder : 扫描文件夹，并将文件夹下的DLL文件添加到引用.
    - 虚方法 LoadAssemblyFromFile : 将文件转换为程序集, 缓存引用并将程序集加载到域.
    - 虚方法 LoadAssemblyFromStream : 将流转换为程序集, 缓存引用并将程序集加载到域.
    - 虚方法 LoadAssemblyFromStream : 将文件流转换为程序集，缓存引用并将程序集加载到域.
    - 虚方法 Dispose : 清楚引用,销毁函数.
  
  - 保护重载:
    - 保护重载 Load : 必须实现的方法.
    - 保护重载 LoadUnmanagedDll : 必须实现的方法.

<br/>  

- SyntaxBase: 作为语法转换的基础类，提供了代码及语法树缓存，规定了一些抽象方法，实现了自动添加缓存的方法。
  
  - 字段 : 
    - 字段 TreeCache ： 存放字符串代码及语法树的缓存.
    - 字段 ReferenceCache : 引用缓存.
  
  - 方法 :
    - 方法 Clear : 清除以上两个缓存.
  
  - 抽象方法 :
    - 抽象方法 ConvertToTree : 将脚本转换为语法树.
    - 抽象方法 FormartTree : 加载语法树并格式化.
  
  - 虚方法 :
    - 虚方法 AddTreeToCache : 将树添加到缓存, 需要重载 ConvertToTree 进行语法树转换.
    - 虚方法 AddTreeToCache : 加载语法树并缓存, 需要重载 LoadTree 来实现内部功能.


<br/>  

- `CompilerBase<TCompilation, TCompilationOptions>` where TCompilation : Compilation where TCompilationOptions : CompilationOptions: 编译器抽象， TCompilation 被约束为 Compilation 类型，该类为编译的基础类，在构建编译信息时，每种语言都会对该类进行继承改造，因此它是编译基础。TCompilationOptions 被约束为 CompilationOptions 类型.

  - 字段:
    - 字段 AllowUnsafe : 是否允许非安全代码编译.
    - 字段 AssemblyName : 编译器会对当前代码进行整程序集编译，需要指定程序集名.
    - 字段 OutputFilePath : DLL 文件输出路径.
    - 字段 OutputPdbPath : PDB 文件输出路径.
    - 字段 Compilation : 编译单元.
    - 字段 AssemblyKind : 程序集输出类型, 控制台, Windows, DLL等.
    - 字段 ProcessorPlatform : 处理器平台, x86, x64等.
    - 字段 AssemblyOutputKind : 程序集构建方式, 文件 / 流.
    - 字段 CodeOptimizationLevel : 代码优化程度, Debug / Release.
    - 字段 OptionAction : 外传的编译选项委托.
    - 字段 CompileSucceedEvent : 流编译成功之后触发的事件.
    - 字段 CompileFailedEvent : 流编译失败之后触发的事件.
    - 字段 _semanticAnalysistor : 用户定义的语义分析器.
  
  - 属性 :
    - 属性 Domain : 域.
    - 属性 SyntaxTrees : 编译单元中存有的语法树集合.
  
  - 方法 :
    - 方法 AddOption : 在构建选项之后对选项进行的操作.
    - 方法 AppendSemanticAnalysistor : 追加语义分析委托.
    - 方法 SetSemanticAnalysistor : 清空并设置语义分析委托.
  
  - 虚方法 :
    - 虚方法 ComplieToAssembly : 编译逻辑的具体实现,将编译单元输出成程序集.
    - 虚方法 PreCompiler : 构建编译信息之前需要做什么.

  - 抽象方法 : 
    - 抽象方法 GetCompilation : 获取具体类型的编译单元, 该编译单元应该已经配置好 Option.
    - 抽象方法 GetCompilationOptions : 为编译单元准备 编译选项.

对以上类进行重写，即可完成一门语言的动态编译，详情请看 Engine 实现篇。
