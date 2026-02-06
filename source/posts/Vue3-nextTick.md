---
title: Vue3-nextTick
date: 2026-02-06T05:12:59.692Z
categories:
  - Vue3新特性学习
tags:
  - Vue3
  - Vue
---
# Vue3-nextTick

# 1.作用

nextTick()用于处理DOM更新完成之后，执行回调的方法

# 2.实现

vue2中nextTick()是基于浏览器的异步队列和微任务队列而执行的

vue3中nextTick()是基于MutationObserver 和Promise.resolve().then() 来实现的；解决了vue2 中 Promise() 的浏览器缺陷；

**vue3 中使用 Promise 封装 nextTick**

```javascript
const promise = Promise.resolve()
export function nextTick(callback?:Function){
    return promise.then(callback)
}
```

在 Vue 3 中 nextTick() 方法的行为和 Vue 2 中基本相似，但它进行了一些优化，以提高性能和稳定性。nextTick() 通过利用微任务（microtask）来确保在 DOM 更新之后执行回调，从而避免在同一事件循环中执行 DOM 操作。简单的理解是，当数据更新了，在dom中渲染后，自动执行函数。

```javascript
<script setup>
import { ref, nextTick, onMounted } from 'vue'

onMounted(async() => {
    await nextTick()
    // 在nextTick 下面的 js 都是属于异步的，都会等待 DOM更新完成之后再进行数据更新
    // 或者  如下 两种方式均可
    // await nextTick(() => {

    // })
})
</script>

```

# 3.使用场景

*   **在数据变化后等待DOM更新**
    
    比如更改了一个数据属性，该属性控制一个元素的可见性。然后你可能想要等待DOM更新以便可以获取该元素的新的宽度或高度。在这种情况下，你可以使用 nextTick() 来确保你的代码在DOM更新后执行。
    
    ```javascript
    <template>  
        <div ref="nameBox">{{ message }}</div>  
    </template>  
        
    <script setup>  
    import { ref, nextTick } from 'vue';  
    const message = ref('hello');  
    const nameBox = ref(null);  
    const  updateMessage = () => {  
        message.value = 'Other name!';  
        nextTick(() => {  
            console.log(nameBox.value.textContent); // 输出: Other name!  
        });  
    }  
    </script>
    
    ```
    
*   **在创建或销毁组件后等待DOM更新**
    

当创建或销毁Vue组件时，Vue需要时间来更新DOM。如果你需要立即访问新创建或已销毁的DOM元素，你可能会遇到问题，因为DOM可能还没有更新。在这种情况下，你可以使用 nextTick() 来确保你的代码在DOM更新后执行。

```javascript
<template>  
  <div>  
    <button @click="handleChangCom">显隐组件</button>  
    <ChildComponent v-if="isShowChild" ref="componentRef" />  
  </div>  
</template>  
  
<script setup>  
import { ref, nextTick } from 'vue';  
import ChildComponent from './ChildComponent.vue';  
  
const isShowChild = ref(false);  
const componentRef = ref(null);  
//当我们点击按钮时，handleChangCom方法会被调用，从而修改 isShowChild 的值。
//然后，我们使用nextTick()来等待Vue的DOM更新队列清空，确保如果ChildComponent被创建，
//它现在已经被挂载到DOM上；如果它被销毁，它已经从DOM上移除。
const handleChangCom = () => {  
  isShowChild.value = !isShowChild.value;  
  // 等待DOM更新  
  nextTick() 
  if (isShowChild.value) {  
    // 现在ChildComponent已经被创建并挂载到DOM上  
    console.log('Child component has been mounted:', componentRef.value);  
  } else {  
    // 现在ChildComponent已经被销毁并从DOM上移除  
    console.log('Child component has been unmounted.');  
  }  
}  
 
</script>
```

*   **处理大量数据**
    

在处理大量数据时，Vue.js 可能会变得有点慢，因为它需要时间来处理所有的数据并更新DOM。在这种情况下，你可能想要使用 nextTick() 来分批处理数据，以便给浏览器一些时间来更新DOM。这可以提高应用程序的性能，并减少用户在处理大量数据时的等待时间

```javascript
<template>  
  <div>  
    <div v-for="(item, index) in items" :key="index">{{ item }}</div>  
  </div>  
</template>  
  
<script setup>  
import { ref, nextTick } from 'vue';  
const items = ref([]);  
const fetchData = () => {  
  // 假设 getBatchListServer 是一个异步函数，用于从后台 
  getBatchListServer().then(newItems => {  
    items.value = newItems;  
    nextTick(() => {  
      console.log('All items are rendered');  
      // 这里可以执行依赖于所有项都已渲染的代码  
    });  
  });  
}  
</script>

```
