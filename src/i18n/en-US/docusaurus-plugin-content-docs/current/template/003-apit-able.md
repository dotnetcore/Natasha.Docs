---
title: 3. 高级编译类 API速查表
---

<br/>

|         类名         |            作用           |   Namespaces   |     操作类型    |
| :----------------: | :---------------------: | :------------: | :---------: |
|      NAssembly     |  快速创建同程序集的 oop 及委托等操作类  |       全局       | 静态初始化,动态实例化 |
|      NInstance     |    根据类型，提供一个初始化实例的委托    |       全局       |      静态     |
|      NDelegate     | 快速创建指定域的 Action/Func 委托 |       全局       | 静态初始化,动态实例化 |
|       NClass       |        快速创建一个公有类        |       全局       | 静态初始化,动态实例化 |
|     NInterface     |        快速创建一个公有接口       |       全局       | 静态初始化,动态实例化 |
|        NEnum       |        快速创建一个枚举类        |       全局       | 静态初始化,动态实例化 |
|       NRecord      |        快速创建一个记录类        |       全局       | 静态初始化,动态实例化 |
|       NStruct      |        快速创建一个结构体        |       全局       | 静态初始化,动态实例化 |
| FakeMethodOperator |    仿造 MethodInfo 创建方法   | Natasha.CSharp | 静态初始化,动态实例化 |
| FastMethodOperator |          快速创建方法         | Natasha.CSharp | 静态初始化,动态实例化 |
