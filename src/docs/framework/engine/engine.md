---
title: "Natasha.CSharpEngine 引擎采用了 Natasha.Framework 的框架，对其进行封装、集成。"
---

Natasha 结构示意图:

![png](/images/framework-natasha-all.svg)

Natasha.Framework 为 Natasha 提供了核心的编译类标准, 需要编写编译功能的开发者需要实现 Natasha.Framework 中各个抽象类(后续有讲).

Natasha.Framework 分为两大部分:
  - 基于 Roslyn 标准的语法树及编译器.
  - 基于 Runtime 的域实现.

其中, SyntaxBase 为字符串到语法树提供了转换接口, 但具体是什么语言的语法树需要自己去实现或引用, 同时该语法树也是需要兼容 Roslyn 语法树的以便送入编译器中进行编译.  这里的编译器也有不同语言的编译器, 都需要开发者来自己引用或者实现. Framework 项目仅仅是提供了 Roslyn 的抽象实现, 因此我们可以方便的用抽象实现来拟现编译流程,甚至定制自己的编译框架.  
另一部分为 Runtime 的域抽象, Natasha 的域基础类规定及实现了部分 API, 它可以很好的帮助编译实现内存到程序集的转化与引用管理. 

Natasha 在 Natasha.CSharp.Engine 它使用 Framework 项目提供的抽象类完成了 C# 从脚本到程序集入域的整个流程, 并在异常控制,语义预处理方面提供了更加细节更加完美的实现, 让 Engine 更像是一个完整可行的动态编译方案. Engine 对完开放了组件注册接口, 可以将已经实现的语法树/编译器/域注册进入 Engine 中赋予动态编译灵魂下的实体, 例如 Natasha 实现了 framework 抽象基础类, NatashaAssemblyDomain / NatashaCSharpCompiler / NatashaCSharpSyntax 三个分别明确了域的功能/ CSharp 编译器的功能/ CSharp 语法树的功能. 到此 Natasha.CSharp.Engine 已经可以进行动态编译工作了.

至于外层的 Template API 以及平级的 Script Utils 都是对字符串及元数据的加工处理, 主要是为了更加方便动态构建, Natasha.CSharp.Reverser 为 Script Utils 层的实现, 它主要提供还原元数据为字符串的功能; Natasha.CSharp.Template 在所有的基础上, 提供了更加友好的 API, 以方便开发者降低使用动态编译库的成本.

Natasha.CSharp.All 整合了所有 Natasha CSharp 动态编译相关的组件, 并提供初始化函数来完成组件的注册和动态编译的预热加载.

```cs
NatashaInitializer.InitializeAndPreheating();
```

![png](/images/framework-natasha-component.svg)