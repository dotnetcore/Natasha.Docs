---
title: 6. 高级编译技巧
---

## API 规范

- **With 系列 API：** 带有关闭、排除、枚举附加值等条件状态开关时使用的 API。 例如： `WithCombineUsingCode` 和 `WithoutCombineUsingCode`, `WithHighVersionDependency`、`WithLowVersionDependency`、`WithDebugCompile`、`WithReleaseCompile`、`WithFileOutput` 等,又例如编译选项的 API 都是作为附加条件赋给选项的，因此都由 With 开头(注：与 Roslyn 风格不同，With 方法不返回新对象).

- **Set 系列 API：** 属单向赋值类 API, 例如：`SetDllFilePath`、`SetReferencesFilter` 等.

- **Config 系列 API：** 具有对主类中，某重要组件的额外配置，通常是各类 options 操作的 API, 例如：`ConfigCompilerOption`、`ConfigSyntaxOptions` 等.

- **特殊功能 API：** 此类 API 需要非常独立且明确的功能，常用而显眼，例如 `UseRandomDomain`、`UseSmartMode`、`OutputAsFullAssembly`、`GetAssembly` 等显眼包 API.

## 动态调试

Natasha 最新版支持动态源代码调试，您可以使用 API 来开启调试。

```cs
//调试信息写入文件，原始的写入方式，可能会造成跨平台兼容性问题
builder.WithDebugCompile(item=>item.WriteToFileOriginal())
//调试信息写入文件，兼容性写入方式
builder.WithDebugCompile(item=>item.WriteToFile())
//调试信息整合到程序集中
builder.WithDebugCompile(item=>item.WriteToAssembly())
//Release 发布无法进行调试，
builder.WithReleaseCompile()
//Release 模式将携带 debugInfo 一起输出
builder.WithFullReleaseCompile()
```

## 生成程序集

在程序集被编译前，你可能需要进行的配置

#### 程序集名称

```cs
//设置程序集名字
builder.SetAssemblyName();
//使用随机名(初始化不传入名字，默认用的是随机名)
builder.WithRandomAssenblyName();
```

#### 语义相关配置

```cs
//启用语义检查
buidler.WithSemanticCheck()
//关闭语义检查
buidler.WithoutSemanticCheck()
//在语义创建过程中开启访问级别检查
builder.WithAnalysisAccessibility();
//在语义创建过程中关闭访问性检查
builder.WithoutAnalysisAccessibility();
//增加语义处理插件
builder.AddSemanticAnalysistor();
//清除内置的语义处理插件
builder.ClearInnerSemanticAnalysistor();
```

## 配置编译细节

```cs
//首先使用 API 
builder.ConfigCompilerOption(opt=>opt);
    //即使是被禁断的提示，也要报告出来(功能待挖掘)
    opt.WithSuppressReportor()
    //指定编译平台
    opt.WithPlatform()
    //指定编译标识
    opt.WithCompilerFlag()
    //指定输出方式，类库、应用程序还是其他
    opt.WithOutputKind()
    //导入所有的元数据
    opt.WithAllMetadata()
    //仅导入内部元数据
    opt.WithInternalMetadata()
    //仅导入公共元数据
    opt.WithPublicMetadata()
    //指定诊断信息作为何种级别报告出来
    opt.WithDiagnosticLevel()
    //允许同名低版本程序集存在
    opt.WithLowerVersionsAssembly()
    //指定空引用的检查级别
    opt.WithNullableCompile()
    //开启非安全上下文编译
    opt.WithoutUnsafeCompile()
```

## Output

#### 文件输出

Natasha 支持 dll/pdb/xml 文件输出，其中 xml 存储了程序集注释相关的信息。参考 API

```cs
//该方法将使程序集输出到默认文件夹下的 dll/pdb/xml 文件中
//可传入一个文件夹路径
//可以传入三个文件的路径
builder.WithFileOutput(string dllFilePath, string? pdbFilePath = null, string? commentFilePath = null)
builder.WithFileOutput(string? folder = null);
//分离的 API
builder.SetDllFilePath/SetPdbFilePath/SetCommentFilePath();
```

> 注意，在 Release 模式下将不会产生 pdb 文件。

#### 程序集输出

Natasha 配套有程序集相关的配置

```cs
//输出完整程序集
builder.OutputAsFullAssembly();
//输出引用程序集，此时将默认不包含私有成员
builder.OutputAsRefAssembly();
//输出时包含私有成员
builder.WithPrivateMembers();
//输出时不包含私有成员
builder.WithoutPrivateMembers();

//编译结果为引用程序集，且写入文件，且不会加载到域。
builder
  .OutputAsRefAssembly();
  .WithFileOutput()
  .WithoutInjectToDomain();
```
