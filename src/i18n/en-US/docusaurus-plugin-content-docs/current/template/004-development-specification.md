---
title: 4. Recommended Encapsulation Specification
---

## Natasha Encapsulation Specification

Natasha has its own encapsulation rules, which can make the encapsulator's ideas clearer and make the work easier to maintain.

<br/>

## A complete Operator

Operator is a dynamic construction class used for external use. An Operator can roughly consist of the following 3 parts:

- Template
- Builder
- Package / Extension

Template + Compiler => Builder
Package(Builder) + API + Extension => Operator

<br/>

## ScriptBuilder (Builder)

As the most important core part of Operator, Builder primarily provides delegates for Operator, can receive configurations from outside, can combine templates internally, and compiles them.<br x-id="2" />
it is roughly divided into two parts, the Template template and the Compiler compiler：<br x-id="2" />
it is roughly divided into two parts, the Template template and the Compiler compiler：\
It is roughly divided into two parts: Template and Compiler:

<br/>

- Template Build Template
  Use template templates to build runtime script strings, and templates leak OUT of the API to make it easier for consumers to compose compilation strings.
  - UsingTemplate is a built-in template in Natasha, which provides code construction from namespaces to complete objects.
  - DelegateTemplate is a built-in template in Natasha, which provides method code construction.
  - FieldTemplate is a built-in template in Natasha, which provides field code construction.
  - PropertyTemplate is a built-in template in Natasha, which provides property code construction.

<br/>  

- Compiler
  The compiler receives the string provided by the template and compiles it to complete the compilation task of the Builder.
  - AssemblyCSharpBuilder: With the CSharp compiler of Natasha, it is easy to compile strings and extract metadata.

<br/>

You can quickly achieve customization by directly using the built-in Builder of Natasha, such as OopBuilder[TOperator], MethodBuilder[Operator] generic method.
The former provides object construction templates, while the latter focuses on method construction.

<br/>

## Operator

Operator encapsulates Builder based on Package, and Operator stores the compilation results provided by Builder, exposing API to users. <br/>

#### Case

For example, the built-in [FastMethodOperator](https://github.com/dotnetcore/Natasha/blob/master/src/Natasha.CSharp/Natasha.CSharp.Template/Api/Level1/Operator/FastMethodOperator.cs) in Natasha is wrapped and simplified based on [MethodBuilder](https://github.com/dotnetcore/Natasha/blob/master/src/Natasha.CSharp/Natasha.CSharp.Template/Builder/MethodBuilder.cs). The initialization function of FastMethodOperator customizes its own script construction process. The following template is translated into `public static`:

```cs
this.Access(AccessFlags.Public)
.Modifier(ModifierFlags.Static);
```
