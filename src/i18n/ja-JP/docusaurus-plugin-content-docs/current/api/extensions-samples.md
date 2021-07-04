---
title: "ナタシャの型拡張を使用します"
---

```cs

Example:


        typeof(Dictionary<string,List<int>>[]). GetDevelopName();
        //result: "System.Collections.Generic.Dictionary<System.String,System.Collections.Generic.List<Int32>>[]"


        typeof(Dictionary<string,List<int>>[]). GetAvailableName();
        //result: "Dictionary_String_List_Int32____"


        typeof(Dictionary<string,List<int>>). GetAllGenericTypes();
        //result: [string,list<>,int]


        typeof(Dictionary<string,List<int>>). IsImplementFrom<IDictionary>();
        //result: true


        typeof(Dictionary<string,List<int>>). IsSimpleType();
        //result: false


        typeof(List<>). With(typeof(int));
        //result: List<int>

```

<br/>
<br/>
