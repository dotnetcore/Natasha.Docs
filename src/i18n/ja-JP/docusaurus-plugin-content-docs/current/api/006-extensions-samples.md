---
title: "6.ナターシャの型拡張を使用する"
---

```cs

例：


        タイプオブ(辞書<string,List<int>>[]). GetRuntimeName();
        結果: "辞書<String,List<Int32>>[]"        


        タイプオブ(辞書<string,List<int>>[]). GetDevelopName();
        結果: "System.Collections.Generic.Dictionary<System.String,System.Collections.Generic.List<System.Int32>>[]"

        タイプオブ(辞書<,>). GetDevelopNameWithoutFlag();
        結果: "System.Collections.Generic.Dictionary<,>"


        タイプオブ(辞書<string,List<int>>[]). GetAvailableName();
        結果: "Dictionary_String_List_Int32____"


        タイプオブ(辞書<string,List<int>>). GetAllGenericTypes();
        結果: [文字列,リスト<>,int]


        タイプオブ(辞書<string,List<int>>). は実装から<IDictionary>();
        結果: 真


        タイプオブ(辞書<string,List<int>>). IsSimpleType();
        結果: 偽


        タイプオブ(リスト<>). with(typeof(int));
        結果: リスト<int>

```

<br/>
<br/>
