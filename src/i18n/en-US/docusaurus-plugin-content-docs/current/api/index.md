---
title: "3. Advanced compilation class API cheat sheet"
---

<br/>

|   The class name   |                                   function                                    |   Namespaces   |            The type of operation             |
|:------------------:|:-----------------------------------------------------------------------------:|:--------------:|:--------------------------------------------:|
|     NAssembly      | Quickly create action classes such as oop and delegates for the same assembly |     Global     | Static initialization, dynamic instantiation |
|     NInstance      |  Depending on the type, a delegate that initializes the instance is provided  |     Global     |                    Static                    |
|     NDelegate      |         Quickly create Action/Func delegates for the specified domain         |     Global     | Static initialization, dynamic instantiation |
|       NClass       |                         Quickly create a public class                         |     Global     | Static initialization, dynamic instantiation |
|     NInterface     |                       Quickly create a public interface                       |     Global     | Static initialization, dynamic instantiation |
|       NEnum        |                      Quickly create an enumerated class                       |     Global     | Static initialization, dynamic instantiation |
|      NRecord       |                         Quickly create a record class                         |     Global     | Static initialization, dynamic instantiation |
|      NStruct       |                          Quickly create a structure                           |     Global     | Static initialization, dynamic instantiation |
| FakeMethodOperator |                        Copy methodInfo creation method                        | Natasha.CSharp | Static initialization, dynamic instantiation |
| FastMethodOperator |                            Quickly create methods                             | Natasha.CSharp | Static initialization, dynamic instantiation |
