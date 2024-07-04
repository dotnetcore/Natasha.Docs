---
title: 1. Template initialization operation
---

Natasha 的所有模板均继承自 ComplierTemplate ，ComplierTemplate 本身会提供静态构造方法。因此上层 API 也会被支持。Therefore, the upper-level API is also supported.Therefore, the upper-level API will also be supported.

<br/>

## Used By

NDelegate / NAssembly / NClass.. / xxx_Oerator, etc. are referred to as "Handler".

<br/>

#### Static initialization code:

```cs

//Use domain
Handler.UseDomain(domain, compiler => { compiler configuration });


//Use domain of a certain compiler
Handler.UseCompiler(assemblyCSharpCompiler, compiler => { compiler configuration });


//Create a domain named "domainJim"
Handler.CreateDomain("domainJim", compiler => { compiler configuration });


//Use default domain
Handler.DefaultDomain(compiler => { compiler configuration });


//Use random domain
Handler.RandomDomain(compiler => { compiler configuration });

```

<br/>
