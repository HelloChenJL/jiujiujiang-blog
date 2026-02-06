---
title: promise和async await
date: 2026-02-06T05:08:11.631Z
categories:
  - 学习笔记
tags:
  - JavaScript
---
# promise和async await

### 一、什么是同步、异步

同步：同步的操作是严格按照先后顺序执行的，第一个操作没有执行完的话是不会执行第二个操作的；  
异步：而异步的操作不一定会按照先后顺序执行，碰到了比较耗时的操作时(例如等待网络请求的响应)，不阻塞，而是接着执行后面的操作，等响应到达之后再执行刚才耗时操作的进一步处理。

### 二、宏任务、微任务

宏任务：setTimeout、setInterval、XMLHttprequest、setImmediate、I/O、UI rendering等  
微任务：promise、process.nextTick（node环境）、Object.observe, MutationObserver等。  
微任务执行顺序优先宏任务

示例：

```text/javascript
setTimeout(function() {
  console.log('我是定时器！');
})
new Promise(function(resolve) {
  console.log('我是promise！');
  resolve();
}).then(function() {
  console.log('我是then！');
})
console.log('我是主线程！');


执行顺序：
我是promise！
我是主线程！
我是then！
我是定时器！

解析：
1>执行主代码块，主代码块属于宏任务
2>遇到setTimeout，放到宏任务队列
3>若遇到Promise，把then之后的内容放进微任务队列
4>当第一次宏任务执行完检查是否存在微任务，若存在执行所有微任务
5>执行完毕后，开始下一次的宏任务



```

三、Promise

#### 1.promise顾名思义就是承诺的意思，保证这件事情会有个结果给你，promise有三种状态，成功（fulfiled）或者失败（rejected），还有一个等待状态（pending）。

示例：

```text/javascript
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2000) // 成功以后这个resolve会把成功的结果捕捉到
        // reject(2000) // 失败以后这个reject会把失败的结果捕捉到
    }, 1000)
    console.log(1111)
})

promise.then(res => {
    console.log(res) // then里面第一个参数就能拿到捕捉到的成功结果
}, err =>{
    console.log(res)// then里面第二个参数就能拿到捕捉到的失败结果
})

打印结果：

1111
2000（一秒以后）
```

#### 2.then链式操作

示例：

```text/javascript
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2000)
    }, 1000)
    console.log(1111)
})
promise.then(res => {
    console.log(res) // 这个地方会打印捕捉到的2000
    return res + 1000 // 这个函数的返回值，返回的就是这个promise对象捕捉到的成功的值
}).then(res => {
    console.log(res) //这个地方打印的就是上一个promise对象return的值
})

所以打印顺序应该是：

1111
2000
3000
```

#### 3.catch捕获操作  
这个catch就是专门捕捉错误的回调的，还是先看例子：

```text/javascript
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
      reject(2000) // 失败以后这个reject会把失败的结果捕捉到
  }, 1000)
  console.log(1111)
})
promise.catch(res => {
  console.log(res) // catch里面就能拿到捕捉到的失败结果
})

打印结果：

1111
2000（一秒以后）
```

#### 4.promise.all

一共有三个接口A、B、C，必须三个接口都成功以后，才能发起第四个请求，怎么实现呢？  
这样就可以用到all

```text/javascript
let getInfoA = new Promise((resolve, reject) => {
  console.log('小A开始执行了')
  resolve()
})
let getInfoB = new Promise((resolve, reject) => {
  console.log('小B开始执行了')
  resolve()
})
let getInfoC = new Promise((resolve, reject) => {
  console.log('小C开始执行了')
  resolve()
})
Promise.all([getInfoA, getInfoB, getInfoC]).then(res => {
  console.log('全都执行完了！')
})
接收一个Promise对象组成的数组作为参数，当这个数组所有的Promise对象状态都变成resolved或者rejected的时候，它才会去调用then方法。非常完美，非常优雅。
```

5.现在又有一个需求，同样是接口A、B、C，只要有一个响应了，我就可以调接口D，那么怎么实现呢？

```text/javascript
let getInfoA = new Promise((resolve, reject) => {
  console.log('小A开始执行了')
  setTimeout((err => {
      resolve('小A最快')
  }),1000)
})
let getInfoB = new Promise((resolve, reject) => {
  console.log('小B开始执行了')
  setTimeout((err => {
      resolve('小B最快')
  }),1001)
})
let getInfoC = new Promise((resolve, reject) => {
  console.log('小C开始执行了')
  setTimeout((err => {
      resolve('小C最快')
  }),1002)
})
Promise.race([getInfoA, getInfoB, getInfoC]).then(res => {
  console.log(res)
})

打印结果

小A开始执行了
小B开始执行了
小C开始执行了
小A最快
与Promise.all相似的是，Promise.race都是以一个Promise对象组成的数组作为参数，不同的是，只要当数组中的其中一个Promsie状态变成resolved或者rejected时，就可以调用.then方法了。
```

### 四、async await 

async 有三个特点 ：

1.  函数前面会加一个async修饰符，来证明这个函数是一个**异步函数；**
    
2.  await 是个运算符，用于组成表达式，它会阻塞后面的代码
    
3.  **await 如果等到的是 Promise 对象，则得到其 resolve值。**
    

示例1：

```text/javascript
async function doSomething1(){
  let x = await 'hhh'
  return x
}

console.log(doSomething1())

doSomething1().then(res => {
  console.log(res)
})

打印结果：

Promise {<pending>}
hhh
解析:
1>async返回的是一个promise对象，函数内部 return 返回的值，会成为 then 方法回调函数的参数；
2>await如果等到的不是promise对象，就得到一个表达式的运算结果。

示例2：
let dd = 0;
const ceshi = async () => {
console.log("123")
await new Promise((resolve, reject) => {
  if (true) {
    dd = 1;
  }
  resolve('123')
});
return dd
};
const baba = async () => {
let ds = await ceshi();
console.log(dd, "dddd");
console.log(ds,"tttttt");
};
let c = baba();
console.log(c, "cccc");

打印结果：
123
Promise {<pending>} 'cccc'
1 'dddd'
1 'tttttt'
解析：先执行主线程，所以打印123，然后执行打印c，因为baba加了async所以他是一个异步函数，所以打印出来c是一个promise对象，(想要获取dd的值需要使用.then()获取),等到ceshi函数执行完并resolve，打印dd，并将ceshi函数return的值赋值给ds，进行打印tttt
```
---

