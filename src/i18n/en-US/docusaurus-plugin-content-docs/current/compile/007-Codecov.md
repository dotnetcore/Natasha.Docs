---
title: 7. Using Codecov Extension
---

## Usage Method

1. Import the `DotNetCore.Natasha.CSharp.Extension.Codecov` extension package.
2. Encoding.

```cs
builder.WithCodecov();
Assembly asm = builder.GetAssembly();
List<(string MethodName, bool[] Usage)>? list = asm.GetCodecovCollection();
Show(list);


public static void Show(List<(string MethodName, bool[] Usage)> list)
{
        for (int i = 0; i < list!.Count; i++)
        {
                if (list[i].Usage != null)
                {
                    if (list[i].Usage.Length == 0)
                    {
                        Console.WriteLine($"{list[i].MethodName} executed: 100%");
                    }
                    else
                    {
                        var executeCount = list[i].Usage.Count(item => item);
                        Console.WriteLine($"{list[i].MethodName} executed: {((double)executeCount / list[i].Usage.Length).ToString("P")}");
                    }
                }
                else
                {
                    Console.WriteLine($"{list[i].MethodName} not executed!");
                }
        }
}
```

## Description

CodeCov will appear as a Natasha extension library

Usage:

```cs
List<(string MethodName, bool[] Usage)>? result = Assembly.GetCodecovCollection();
```

Where result will store a collection of methods and their executed lines.
For example, in class A, there is a method called Method, which has a total of 6 lines of code logic. During execution, only the first 4 lines are executed.
The result collection will contain:

```cs
"MyNamespace.A.Method":
 [0] = true,
 [1] = true,
 [2] = true,
 [3] = true,
 [4] = false,
 [5] = false,
```

<br/>
<br/>
