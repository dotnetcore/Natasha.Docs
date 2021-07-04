---
title: "Static initialization operation"
---

Natasha 的所有模板均继承自 ComplierTemplate ，ComplierTemplate 本身会提供静态构造方法。因此上层 API 也会被支持。Therefore, the upper-level API is also supported.Therefore, the upper-level API is also supported.

<br/>

## use

NDelegate / NAssembly / NClass.. / xxx_Oerator and so on is called "Handler".

<br/>

#### Static initialization code：

```cs

Use domain domain
Handler.UseDomain (domian, compiler s> { 编译器配置 });


// Use a compiler's domain
Handler.UseCompiler (assemblyCSharpCompiler, compiler s> { 编译器配置 }));


// Create a "domainJim" domain
Handler.CreateDomain ("domian Jim", compiler s> { 编译器配置 });


// Use the default domain
Handler.DefaultDomain (compiler s> { 编译器配置 });


// Use random domain
Handler.RandomDomain (compiler s> { 编译器配置 });

```

<br/>

#### Compiler configuration：

```cs
builder =>
{
     builder
       . CustomerUsing() // Use user-defined
       . SetAssemblyName ("MyAssemblyName") // Set assembly name
       . ThrowAndLogCompilerErrRor() // Throw and record the compiler's exception
       . ThrowSyntaxError() //Throw syntax tree exception
       . UseStreamCompile();                Compile
with a stream
```
