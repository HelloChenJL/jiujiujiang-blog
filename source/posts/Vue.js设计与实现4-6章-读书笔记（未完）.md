---
title: Vue.js设计与实现4-6章-读书笔记（未完）
date: 2026-02-06T05:11:08.029Z
categories:
  - Vue相关
tags:
  - Vue
---
# Vue.js设计与实现4-6章-读书笔记（未完）

# /\*\*/[#Vue.js设计与实现4-6章-读书笔记（未完）-](#Vue.js设计与实现4-6章-读书笔记（未完）-)[第4章 响应系统的作用与实现](#Vue.js设计与实现4-6章-读书笔记（未完）-第4章响应系统的作用与实现)[4.1响应式数据与副作用函数](#Vue.js设计与实现4-6章-读书笔记（未完）-4.1响应式数据与副作用函数)[4.2响应式数据的基本实现](#Vue.js设计与实现4-6章-读书笔记（未完）-4.2响应式数据的基本实现)[4.3设计一个完善的响应系统](#Vue.js设计与实现4-6章-读书笔记（未完）-4.3设计一个完善的响应系统)[4.4分支切换与cleanup](#Vue.js设计与实现4-6章-读书笔记（未完）-4.4分支切换与cleanup)[4.5嵌套的effect与effect栈](#Vue.js设计与实现4-6章-读书笔记（未完）-4.5嵌套的effect与effect栈)[4.6 避免无限递归循环](#Vue.js设计与实现4-6章-读书笔记（未完）-4.6避免无限递归循环)[4.7 调度执行](#Vue.js设计与实现4-6章-读书笔记（未完）-4.7调度执行)

# 第4章 响应系统的作用与实现

## 4.1响应式数据与副作用函数

副作用函数顾名思义就是会产生副作用的函数，什么函数会产生副作用呢?例如执行某个函数会直接或间接影响其他函数的执行，这时这个函数就产生了副作用，或者这个函数修改了全局变量，也是一个副作用。

响应式数据就是，这个数据在被修改后，其他引用的地方也会跟着改变，这就代表这个数据是响应式的。

## 4.2响应式数据的基本实现

如何实现响应式数据呢，通过观察只要能拦截一个对象的读取和设置操作，事情就变得简单，当读取字段的时候我们可以把副作用函数effect()存储到一个“桶”里面

![image2024-9-19_17-16-30.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/confluenceImport/8180135318765114356/confluenceIMG/235077653/234029371.png)

当对值进行修改的时候，再把副作用函数从“桶”里面取出执行即可

![image2024-9-19_17-18-27.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/confluenceImport/8180135318765114356/confluenceIMG/235077653/234029373.png)

vue是如何实现对对象属性的读取和设置进行拦截的呢？在es5之前只能通过Object.definProperty函数实现，包括vue2也是这种方式，在es5之后我们可以使用Proxy来实现，这也是vue3实现采用的方式

proxy代理实现原理

```text/x-java
 // 存储副作用函数的桶
const bucket = new Set() 
//原始数据
const data = { text: 'hello world' }
// 对原始数据的代理
const obj = new Proxy(data, {
// 拦截读取操作
get(target, key) {
   //将副作用函数 effect 添加到存储副作用函数的桶中
 	bucket.add(effect)
   // 返回属性值
	return target[key]
},
// 拦截设置操作
set(target, key, newVal) {
    // 设置属性值
	target[key] = newVal
   // 把副作用函数从桶里取出并执行
	bucket.forEach(fn => fn())
   // 返回 true 代表设置操作成功
	return true
	}
})
```

## 4.3设计一个完善的响应系统

上面的例子是一个简单微型的响应系统，如何完善一个响应系统。首先将副作用函数的名字固定成effect，是不好的，可以全局定义一个全局变量activeEffect，初始值是undefined，用来存储被注册的副作用函数函数，接着重新定义了effect 函数，它变成了一个用来注册副作用函数的函数，effect 函数接收一个参数 fn，即要注册的副作用函数。当我们使用一个匿名副作用函数作为effect函数的一个参数，当 effect 函数执行时，首先会把匿名的副作用函数 fn 赋值给全局变量 activeEffect。接着执行被注册的匿名副作用函数 fn，这将会触发响应式数据 obj.text 的读取操作，进而触发代理对象Proxy 的 get 拦截函数。

这个使用WeakMap配合Map构建新的“桶”的结构，使响应数据和副作用函数之间建立更加精确的联系，WeakMap是弱引用，他不影响垃圾回机器的工作，当代码对一个对象没有被引用关系时就会被回收，而Map反之，没有被引用了也不会被回收，最终可能导致内存溢出

```text/x-java
 effect(
//一个匿名的副作用函数
 () => {
 document.body.innerText = obj.text
 	}
 )
// 存储副作用函数的桶  
const bucket = new WeakMap();  
  
// 创建一个Proxy来拦截对象的读取和设置操作  
const obj = new Proxy(data, {  
    // 拦截读取操作  
    get(target, key) {  
        // 将副作用函数 activeEffect 添加到存储副作用函数的桶中  
        track(target, key);  
        // 返回属性值  
        return target[key];  
    },  
    // 拦截设置操作  
    set(target, key, newVal) {  
        // 设置属性值  
        target[key] = newVal;  
        // 把副作用函数从桶里取出并执行  
        trigger(target, key);  
        return true; // 根据需要返回true或false，这里假设总是成功  
    }  
});  
  
// 在 get 拦截函数内调用 track 函数追踪变化  
function track(target, key) {  
    // 没有 activeEffect，直接 return  
    if (!activeEffect) return;  
    let depsMap = bucket.get(target);  
    if (!depsMap) {  
        bucket.set(target, (depsMap = new Map()));  
    }  
    let deps = depsMap.get(key);  
    if (!deps) {  
        depsMap.set(key, (deps = new Set()));  
    }  
    deps.add(activeEffect);  
}  
  
// 在 set 拦截函数内调用 trigger 函数触发变化  
function trigger(target, key) {  
    const depsMap = bucket.get(target);  
    if (!depsMap) return;  
    const effects = depsMap.get(key);  
    effects && effects.forEach(fn => fn());  
}  


```

## 4.4分支切换与cleanup

分支切换是什么？

```text/x-java
const data = { ok: true, text: 'hello world' }
const obj = new Proxy(data, { /* ... */ })
 effect(function effectFn() {
 document.body.innerText = obj.ok ? obj.text : 'not'
 })
```

在 effectFn 函数内部存在一个三元表达式，根据字段 obj.ok值的不同会执行不同的代码分支。当字段 obj.ok 的值发生变化时，代码执行的分支会跟着变化，这就是所谓的分支切换。

当修改obj.ok为false的时候，会触发副作用函数，但是当修改obj.text的值的时候也会触发调用副作用函数，这样就会导致冗余的副作用的问题，这会导致副作用函进行不必要的更新。所以为了解决这个问题，在每次副作用函数执行之前，清除上一次建立的响应联系，当执行副作用函数后，会再次建立新的响应联系，新的响应联系中不存在冗余的副作用。此过程还遇到了遍历Set数据导致无限循环的问题，该问题产生的原因可以从ECMA 规范中得知，即“在调用 forEach 遍历 Set 集合时，如果一个值已经被访问过了，但这个值被删除并重新添加到集合，如果此时forEach 遍历没有结束，那么这个值会重新被访问。”解决方案是建立一个新的 Set 数据结构用来遍历。

## 4.5嵌套的effect与effect栈

嵌套得副作用函数发生在组件嵌套得场景中，即父子组件关系。这时为了避免在响应式数据与副作用函数之间建立得响应联系发生错乱，我们需要使用副作用函数栈来存储不同的副作用函数，当副作用函数执行时，将当前副作用函数压入栈中，当一个副作用函数执行完毕后，将其从栈中弹出。当读取响应式数据得时候，被读取得响应式数据只会与当前栈顶的副作用函数建立响应联系，从而解决问题。                                                                                                                                                                                                                                                                                                           

## 4.6 避免无限递归循环

上面解决了响应数据混乱的问题，使用栈来存储副作用函数，但是当副作用函数中有一个自增的操作，该操作就会导致栈溢出，是因为读取和设置操作是在同一个副作用函数内进行的，响应式数据的读取和设置操作发生在同一个副作用函数内，解决办法很简单，如果trigger触发执行副作用函数与当前正在执行的副作用函数相同，则不触发执行。

## 4.7 调度执行

可调度性是响应系统非常重要的特征。首先我们需要明确什么是可调度性。所谓可调度，指的是当trigger动作触发副作用函数重新执行时，有能力决定副作用函数执行的时机、次数以及方式。实现原理是为effect函数郑家第二个选项参数，通过scheduler选项指定调用器，这样用户可以通过调度器自行完成任务调度。还可以使用调度器实现任务去重，即通过一个微任务队列对任务进行缓存，从而实现去重。这个类似于在Vue.js中联系多次修改响应式数据但只会出发以西更新。实际上Vue.js内部实现了一个更加完善的调度器。

  

