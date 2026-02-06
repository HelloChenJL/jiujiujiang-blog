---
title: Ts基本类型-keyof
date: 2026-02-06T05:08:38.368Z
categories:
  - 学习笔记
tags:
  - TypeScript
---
# Ts基本类型-keyof

### 1.keyof :取后面对象所有的键值，作为联合类型（注意：keyof 运算符只能用于类型级别的操作，因此需要将对象的类型作为操作数传递给 keyof 运算符）

```text/javascript
 type Person{
     name:string
     age:number,
     sex:string
 }
 type key  = keyof Person
 //"name"|"age"|"sex"
```

### 2.实际应用

1.  获取对象所有属性的类型Person\['key'\] 是查询类型，可以获取到对应属性类型的类型
    
2.  和typeof配合使用：判断某个数据的类型，根据已有的值来获取值的类型，来简化代码的书写
    
3.  约束泛型参数的范围  
    K extends keyof 对K进行了约束，只能是'name','age','sex'中的一个类型或者几个类型组成的联合类型；如果没有这个约束{\[P in K\]: T\[P\];会报错
    
4.  和映射类型组合实现某些功能a.\[P in keyof T\]是对所有属性的键值类型进行遍历，案例中得到的P 分别是'name','age'和'sex';  
    b.T\[P\]是查询类型，Person\['name'\] 的结果是string，Person\['age'\] 的结果是number，Person\['sex'\] 的结果是string  
    c.将每个属性类型添加readonly修饰符，最后的结果就是 { readonly id: number; readonly name: string; readonly age: number; }  
    
5.  去掉对象类型的某些属性微软官是通过Pick 和exclude组合来实现Omit逻辑的，我们可以通过以下的代码实现同样的功能。代码中的as P extends K ? never : P这部分代码叫做重映射 ，因为我们不一定需要的是P，有些情况下需要对P进行一些转换；案例中K 中包含的P键值类型则通过never忽略了，相反则保留。所以最后的结果是{age: number;}  
    
6.  给对象类型添加新的属性
    
7.  和条件类型组合实现功能案例中P extends keyof S ？ X : Y 是条件类型(PSXY 四个是占位符，分别表示四种类型,P extends S 表示 P类型能被赋值给S类型)，类似于js的三元运算。代码中的含义就是如果 P是F的属性类型，则取F\[P\]，如果P是S的属性类型，则取S\[P\]。
    

  

  

---

