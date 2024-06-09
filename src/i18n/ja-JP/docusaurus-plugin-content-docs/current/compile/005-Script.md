---
title: 5 スクリプトチュートリアル
---

## 設定オプション

```cs
builder.ConfigSyntaxOptions(opt=>opt.WithLanguageVersion(LanguageVersion.CSharp6))
```

## スクリプトの追加

### Using Codeの動作をBuilderに従ってオーバーライドする

```cs
builder.WithCombineUsingCode(UsingLoadBehavior.WithAll)
builder.Add(myCode)
```

### カスタムなUsing Codeのオーバーライド

第2引数でオーバーライドの動作を指定します

```cs
builder.Add("script",UsingLoadBehavior.WithCurrent)
```
