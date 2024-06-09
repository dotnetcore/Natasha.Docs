---
title: Package Description
---

<br/>

### Domain Implementation Package

The `DotNetCore.Natasha.DynamicLoad.Base` package is the interface package that binds the compilation unit with the domain. It is used to customize the domain and provide it to the Natasha compilation unit.

The `DotNetCore.Natasha.Domain` package is the official Core 3.0+ domain operation package for Natasha.

The `Natasha.CSharp.Compiler.Domain` package inherits from `DotNetCore.Natasha.Domain` and implements the `DotNetCore.Natasha.DynamicLoad.Base` compilation interface package.

### Compilation Unit Package

The `DotNetCore.Natasha.CSharp.Compiler` package is the basic compilation unit package for Natasha. If you do not use the template package, you can reference this package separately for compilation.

### Extension Package

The `DotNetCore.Natasha.CSharp.Template.Core` package is a template compilation package based on the compilation unit.

The `DotNetCore.Natasha.CSharp.Extension.Ambiguity` package is an extension package that resolves ambiguous references based on the compilation unit.

The `DotNetCore.Natasha.CSharp.Extension.Codecov` package is an extension package that calculates the dynamic assembly usage based on the compilation unit.
