---
title: "enum"
---

## Build the data

Our common storage structures include classes, structures, interfaces, and enumerations, and Natasha supports developer dynamic builds of these types. Because these types are common in a package in a namespace, they can exist independently in the namespace. After abstraction, Natasha unified the construction of four structures using the OopBuilder operation.

OopBuilder is made up of OopContentTemplate and OopComplier.

- Template is responsible for building script strings.
- Complier is responsible for string compilation and exception collection.

According to Natasha's encapsulation protocol, Builder is not suitable for direct user use, and external delivery should be the Operator operation class, so Natasha wraps OopBuilder with the OopOperator operation class, Although OopOperator does not do anything and calls, it still makes sense to connect the user.

```cs
public class OopOperator : OopBuilder<OopOperator>
{

   public OopOperator()
   {
       Link = this;
   }

}

```

## Structural decomposition

As shown, a complete structure will be split into the following sections：

![Struction](https://github.com/dotnetcore/Natasha/blob/master/Image/OopStruct.png)

The annotation on the right side of this figure corresponds to the method of the template in Natasha, and you only need to`.`and find a way based on the prompts.

> Annotations on the same line, code from left to right, method from top to bottom.
