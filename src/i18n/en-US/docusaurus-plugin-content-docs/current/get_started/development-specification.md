---
title: "Recommended encapsulation specifications"
---

## Natasha encapsulation protocol

Natasha has its own encapsulation rules, which allow the encapsulator to think more clearly and make the work easier to maintain.

<br/>

## A complete Operator

Operator, as a dynamically built operation class for external use, can consist of approximately the following three parts：

- Template
- Builder
- Package / Extension

Template + Compiler => Builder Package(Builder) + API + Extension => Operator

<br/>

## Script Builder

As the most important core part of Operator, Builder primarily provides delegates for Operator, can receive configurations from outside, can combine templates internally, and compiles them.  
it is roughly divided into two parts, the Template template and the Compiler compiler：  
it is roughly divided into two parts, the Template template and the Compiler compiler：  
It is roughly divided into two parts: the Template template and the Compiler compiler：

<br/>

- Template Build Template Use template templates to build runtime script strings, and templates leak OUT of the API to make it easier for consumers to compose compilation strings.
  - UsingTemplat is Natasha's built-in template that provides code builds from namespaces to complete objects.
  - DelegateTemplate is Natasha's built-in template that provides the build of method code.

  - FieldTemplate is Natasha's built-in template that provides the build of field code.

  - PropertyTemplate is Natasha's built-in template that provides the build of property code.

<br/>

   - Compiler compiler

        The compiler takes the strings provided by the template and compiles them to complete Builder's compilation task.

      - AssemblyCSharpBuilder: Using Natasha's CSharp compiler, you can easily compile strings and extract metadata.


<br/>

     Customization can be quickly achieved using Natasha's built-in Builder, such as： OopBuilder<TOperator> , MethodBuilder<TOperator>.
     The former provides it with an object construction template, while the latter focuses on the build method.

<br/>

## Operator

The Operator is packaged on the basis of Builder, and the Operator stores the compilation results provided by the Builder, exposing user-level APIs to the outside world.
<br/>

#### Case

For example, Natasha built-in [FastMethodOperator](https://github.com/dotnetcore/Natasha/blob/master/src/Natasha.CSharp/Natasha.CSharp.Template/Api/Level1/Operator/FastMethodOperator.cs) at [MethodBuilder](https://github.com/dotnetcore/Natasha/blob/master/src/Natasha.CSharp/Natasha.CSharp.Template/Builder/MethodBuilder.cs) Based on packaging and simplification, FastMethodOpeartor's initialization function has customized its own script construction process, which is translated into the following template `public static` ：

```cs
this. Access(AccessFlags.Public)
. Modifier(ModifierFlags.Static);
```

