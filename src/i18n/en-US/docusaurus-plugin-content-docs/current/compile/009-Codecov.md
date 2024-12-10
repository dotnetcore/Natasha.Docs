---
title: 9. 使用 Codecov 的扩展
---

## 使用方法

1. 引入 `DotNetCore.Natasha.CSharp.Extension.Codecov` 扩展包。
2. 编码。

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
                        Console.WriteLine($"{list[i].MethodName} 执行：100%");
                    }
                    else
                    {
                        var executeCount = list[i].Usage.Count(item => item);
                        Console.WriteLine($"{list[i].MethodName} 执行：{((double)executeCount / list[i].Usage.Length).ToString("P")}");
                    }
                }
                else
                {
                    Console.WriteLine($"{list[i].MethodName} 未执行！");
                }
        }
}
```

## Description

CodeCov 将作为 Natasha 扩展库出现

使用方法:

```cs
List<(string MethodName, bool[] Usage)>?  result = Assembly.GetCodecovCollection();
```

其中 result  将存放方法以及方法所执行行数的集合。
比如 A 类中有方法 Method ,  Method 方法体共 6 行代码逻辑，在执行过程中仅执行了前4行。
result 集合中将有：

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
