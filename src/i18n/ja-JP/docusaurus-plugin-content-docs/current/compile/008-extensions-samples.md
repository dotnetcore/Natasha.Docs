---
title: 8. 使用Natasha的类型扩展
---

```cs

例子:


        typeof(Dictionary<string,List<int>>[]).GetRuntimeName();
        //result:  "Dictionary<String,List<Int32>>[]"        


        typeof(Dictionary<string,List<int>>[]).GetDevelopName();
        //result:  "System.Collections.Generic.Dictionary<System.String,System.Collections.Generic.List<System.Int32>>[]"

        typeof(Dictionary<,>).GetDevelopNameWithoutFlag();
        //result:  "System.Collections.Generic.Dictionary<,>"


        typeof(Dictionary<string,List<int>>[]).GetAvailableName();
        //result:  "Dictionary_String_List_Int32____"


        typeof(Dictionary<string,List<int>>).GetAllGenericTypes();
        //result:  [string,list<>,int]


        typeof(Dictionary<string,List<int>>).IsImplementFrom<IDictionary>();
        //result: true


        typeof(Dictionary<string,List<int>>).IsSimpleType();
        //result: false


        typeof(List<>).With(typeof(int));
        //result: List<int>

```

<br/>
<br/>
