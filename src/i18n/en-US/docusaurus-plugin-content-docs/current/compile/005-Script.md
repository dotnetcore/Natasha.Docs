---
title: 5 脚本教程
---

## 配置选项

```cs
 builder.ConfigSyntaxOptions(opt=>opt.WithLanguageVersion(LanguageVersion.CSharp6))
```

## 添加脚本

### 跟随 Builder 的行为覆盖 Using Code

```cs
builder.WithCombineUsingCode(UsingLoadBehavior.WithAll)
builder.Add(myCode)
```

### 自定义覆盖 Using Code

第二个参数指定覆盖行为

```cs
builder.Add("script",UsingLoadBehavior.WithCurrent)
```
