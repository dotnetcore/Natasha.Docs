---
title: "编译单元"
---

传入整个字符串进行编译， Natasha 的最小编译单元为程序集。
请使用 AssemblyCSharpBuilder .

```cs
string text = @"
  namespace HelloWorld
  {public class Test{public Test(){
            Name=""111"";
        }public string Name;
        public int Age{get;set;}
    }
  }";


//使用 Natasha 的 CSharp 编译器直接编译字符串
AssemblyCSharpBuilder sharpBuilder = new AssemblyCSharpBuilder();

//给编译器指定一个随机域
sharpBuilder.Compiler.Domain = DomainManagement.Random();

//指定文件输出路径
//指定参数则输出到指定的路径下, 否则输出到默认路径
sharpBuilder.UseNatashaFileOut("c:/output");

//如果代码编译错误，那么抛出并且记录日志。
sharpBuilder.CompileFailedEvent += (compilation, errors) =>
{
    var errorLog = compilation.GetNatashaLog();
};


//添加你的脚本字符串
sharpBuilder.Add("using System; public static class Test{ public static void Show(){ Console.WriteLine(\"Hello World!\");}}");

//编译出一个程序集
var assembly = sharpBuilder.GetAssembly();


//如果你想直接获取到类型
var type = sharpBuilder.GetTypeFromShortName("Test");
//或
type = sharpBuilder.GetTypeFromFullName("xxNamespace.xxClassName");


//创建一个 Action 委托
//必须在同一域内，因此指定域
//写调用脚本，把刚才的程序集扔进去，这样会自动添加using引用
var action = NDelegate.UseDomain(sharpBuilder.Compiler.Domain).Action("Test.Show();", assembly);

//运行，看到 Hello World!
action();


//或者使用二级API NAssembly
//该操作类有 CreateClass / CreateInterface 等 API 函数，但最终的构建编译都会在同一个 AssemblyCSharpBuilder 中
var asm = new NAssembly("MyAssembly");
asm.AddScript(text);
var type = asm.GetTypeFromShortName("Test");
var type = asm.GetTypeFromFullName("HelloWorld.Test");
```
