---
title: "オブジェクト ビルダー OopBuilder"
---

オブジェクト ビルダーは、UsingTemplate テンプレートを継承し、オブジェクトを構築するためのすべての API を所有します。  
オブジェクトビルダーは、FieldBuilder / PropertyBuilder / MethodBuilder / CtorBuilder のデリゲートビルド API をラップします ：`Method (Action<MethodBuilder> action)`  
や、PublicField / InternalField / PrivateStaticField などの単純な Field API など。
