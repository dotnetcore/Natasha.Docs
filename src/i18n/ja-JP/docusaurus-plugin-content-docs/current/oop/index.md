---
title: "enum"
---

## データを構築します

一般的なストレージ構造には、さまざまなクラス、構造体、インターフェイス、列挙体が含まれます。 上記の型は名前空間のパッケージ内に存在する可能性がありますが、一部は共通しており、名前空間内に独立して存在できます。 抽象化後、Natasha は OopBuilder 操作を使用して 4 つの構造を統一的に構築します。

OopBuilder は、OopContentTemplate と OopComplier で構成されます。

- Template は、スクリプト文字列の構築を担当します。
- Complier は、文字列のコンパイルと例外の収集を担当します。

Natasha のカプセル化プロトコルでは、Builder は Operator アクション クラスに直接渡すのは適切ではなく、Operator アクション クラスとして外部に配信されるため、Natasha は OopOperator アクション クラスを使用して OopBuilder をラップします OopOperator はアクションや呼び出しを行わないため、ユーザーをドッキングする意味があります。

```cs
public class OopOperator : OopBuilder<OopOperator>
{

   public OopOperator()
   {
       Link = this;
   }

}

```

## 構造分解

図のように、完全な構造は、次の部分に分割されます：

![Struction](https://github.com/dotnetcore/Natasha/blob/master/Image/OopStruct.png)

この図の右側の注釈は、Natasha のテンプレートのメソッドに対応し、`。`に従って方法を見つけ出します。

> 同じ行に注釈が付け、コードは左から右、メソッドは上から下に記述されます。
