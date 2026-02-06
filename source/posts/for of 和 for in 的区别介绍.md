---
title: for of 和 for in 的区别介绍
date: 2026-02-06T05:07:21.704Z
categories:
  - 学习笔记
tags:
  - JavaScript
---
# for of 和 for in 的区别介绍

## 1.相同点

for of 和 for in都是用来遍历的属性

## 2.不同点

**for in遍历的是数组的索引（即键名），而for of遍历的是数组元素值**

  

*   for...in 语句用于遍历数组或者对象的属性（对数组或者对象的属性进行循环操作）。
    
*   for in得到对对象的key或数组,字符串的下标
    
*   for of和forEach一样,是直接得到值
    
*   for of不能用于对象
    

1.两者对比例子(遍历对象)

```text/x-java
const obj ={name:"amy",age:12,sex:"女"}for（let index in obj）{console.log(index)}//name
//age
// sexfor（let item in obj）{
 console.log(item)
}//Uncaught SyntaxError: Unexpected identifier 'obj'说明： for in 和 for of 对一个obj对象进行遍历,for in 正常的获取了对象的 key值,而 for of却报错了
```

2.两者对比例子(遍历数组)

```text/x-java
const arr = [1,2,3,4]
for（let index in arr）{
	console.log(index)
}
//0,1,2,3
for（let item in obj）{
	console.log(item)
}
//1,2,3,4
```

## 3.注意：

*   index索引为字符串型数字，不能直接进行几何运算
    
*   for in 遍历顺序有可能不是按照实际数组的内部顺序
    
*   使用for in会遍历数组所有的可枚举属性，包括原型。所以for in更适合遍历对象。
    
*   for...of 不能循环普通的对象（如通过构造函数创造的），需要通过和 Object.keys()搭配使用
    
*   for of 不同与 forEach, 它可以与 break、continue和return 配合使用,也就是说 for of 循环可以随时退出循环。continue是退出本次循环，break是退出循环，return false相当于循环中的break退出循环(前提是for of循环在一个函数里面，不然会报错)
    
*   [js中for、forEach、for in、for of退出循环方式(continue\break\return false)差别](https://www.jianshu.com/p/bf59bccd69e1)
    

  

---

