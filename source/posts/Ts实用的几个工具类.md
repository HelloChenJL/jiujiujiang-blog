---
title: Ts实用的几个工具类
date: 2026-02-06T05:08:46.919Z
categories:
  - 学习笔记
tags:
  - TypeScript
---
# Ts实用的几个工具类

### 1.Partial<T>： 将类型T中所有属性改为可选属性

```text/javascript
interface Person{
name:string;
age:number;
sex:string;
}
const person:Person = {
  name:"zhangsan",
  age:12,
  sex:'female'
}
const newPerson = {
  name:"zhaosi",
  age:18
}
function updateData (person:Person,newPerson:Partial<Person>){
return {...person,...newPerson}
}
const data = updateData(person,newPerson)
console.log(data,"updatedata")//{name:'zhaosi',age:18,sex:'female'}
```

### 2.Required<T>：将所有的可选属性变为必选属性

```text/javascript
interface Person{
name?:string;
age?:number;
sex:string;
}
type newPerson = Required<Person>
const ab: RequiredUser = {
name: "张三",
age: 18,
sex:'male'
};
```

### 3.Pick<T，K>：从类型T中选择指定的属性K，生成一个新的类型。

```text/x-java
interface Person {
name?:string;
age?:number;
sex:string;
}
type PickNameAge = Pick<Person,'name'|'age'>
const pickNameAge:PickNameAge = {
  name:"xiaoming",
  age:12
}
使用场景：当我们在像后台接口传数据的时候，定义了数据的类型，但是这些数据类型分别属于不同的模块，可以使用pick工具类，在各个模块从已经定义的类型中选取指定的属性。
```

### 4.Omit<T, K>：从类型 T 中删除指定的属性 K，生成一个新的类型

```text/x-java
interface Person {
name?:string;
age?:number;
sex:string;
}
type OmitNameAge = Omit<Person,'name'|'age'>
const omitNameAge:OmitNameAge = {
sex:"male"
}
```

### 5.Record<K, T>：K属性名的类型，T属性值的类型

```text/x-java
interface Person {
name?:string;
age?:number;
sex:string;
}
type RecordData = Record<string,number|string>
Record<K, T> 经常被用于定义一些映射表，将某个类型的属性名映射为另一个类型的属性值。例如，我们可以使用 Record<string, Person> 来定义一个对象类型，其中属性名为字符串类型，属性值为 Person 类型：
type RecordPerson = Record<string | Person>
const newPerson:RecordPerson = {
a:{
      name:"zhangsan",
      age:12,
      sex:'male'
},
b:{
name:"lisi",
      age:12,
      sex:'male'
}
}
```

### 6.Exclude<T, U>：从类型 T 中排除掉类型 U 中包含的类型。

这里可能会想到Omit工具类，这俩个区别是，Omit是将指定属性从目标属性删除，而Exclude是将指定类型从目标类型中删除  
Exclude主要用于联合类型，可以排除一个或多个类型，Omit主要用于对象类型，可以删除一个或多个属性。

```text/x-java
interface Person {
name?:string;
age?:number;
sex:string;
}
type ExcludePerson = Exclude<string|number|boolean,number>
type ExcludeNumber = Omit<Person,'name'|'age'>
```

### 7.Extract<T, U>：用于从类型T中提取出类型 U 中包含的类型。

这个类似与Pick，区别：Pick是从对象属性中取出指定属性类型，Extract是从联合类型中取出指定的类型

```text/x-java
type MyType = string | number | boolean;
type MyNewType = Extract<MyType, string>; // MyNewType 的类型为 string
也可以使用 Extract 工具类型来提取 Person 类型中的 name 属性：
interface Person {
name?:string;
age?:number;
sex:string;
}
type NameOnly = Extract<keyof Person, 'name'>; // NameOnly 的类型为 'name'
const nameOnly: NameOnly = "name";
```

### 8.ReturnType<T>: 它用于获取函数类型 T 的返回值类型。如果 T 不是函数类型，将会产生一个编译错误。

```text/x-java
function add(a: number, b: number) {
return a + b;
}

type AddReturnType = ReturnType<typeof add>; // AddReturnType 的类型为 number
```

### 9.NonNullable<T>：它用于从类型 T 中排除 null 和 undefined 类型，返回一个新类型，新类型的值将不包含 null 和 undefined 类型。

```text/x-java
const MyType:number|string|null|undefined = "123"
type NewType = NonNullable<typeof MyType> //number|string
```

### 10.Parameters<T>：从函数类型 T 中获取参数类型的元组。

```text/x-java
function add(a: number, b: string) {
return a + b;
}

type AddParameters = Parameters<typeof add>; // AddParameters 的类型为 [number, string]
```
---

