---
title: 5 Script Tutorial
---

## Configuration Options

```cs
builder.ConfigSyntaxOptions(opt=>opt.WithLanguageVersion(LanguageVersion.CSharp6))
```

## Add Script

### Override Using Code with Builder's Behavior

```cs
builder.WithCombineUsingCode(UsingLoadBehavior.WithAll)
builder.Add(myCode)
```

### Customize Override Using Code

The second parameter specifies the override behavior

```cs
builder.Add("script",UsingLoadBehavior.WithCurrent)
```
