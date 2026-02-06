---
title: Vue3 ref 以及相关api
date: 2026-02-06T05:11:58.888Z
categories:
  - Vue3新特性学习
tags:
  - Vue3
  - Vue
---
# Vue3 ref 以及相关api

# 1.ref

接受一个值，可以是基础类型也可以是对象，当将一个对象赋值给ref(),进行更新后视图也可以响应式更新，

**相比reactive的区别**

*   ref可以存储原始类型，而reactive不能。
    
*   ref需要通过<ref>.value访问数据，而reactive()可以直接用作常规对象。
    
*   可以重新分配一个全新的对象给ref的value属性，而reactive()不能。
    
*   ref类型为Ref<T>，而reactive返回的反应类型为原始类型本身。
    
*   watch默认只观察ref的value，而对reactive则执行深度监听。
    
*   ref默认会用reactive 对象类型的原始值进行深层响应转换。
    

# 2.toRef()

toRef 用于将**响应式对象的某个属性**创建为 ref，从而保持与原对象的绑定。接受toRef 一次仅能设置一个数据，接收两个参数，第一个参数是哪个对象，第二个参数是对象的哪个属性

```javascript
 setup(){
	let msg = { name: 'zs', age: 16 }
    let msg2 = toRef(msg, 'name')
    console.log(msg2.value)	// zs
    function change2() {
        msg2.value = 'ww'
        console.log(msg, msg2.value) // {name: "ww", age: 16} ww
        //此时 msg.ww 数据变了 但是视图上的是不会变的
    }
    change2()
    return { msg2,change2 }
    }


```

# 3.toRefs()

toRefs用来把响应式对象转换成普通对象，把对象中的每一个属性，包裹成ref对象

toRefs就是toRef的升级版，只是toRefs是把响应式对象进行转换，其余的特性和toRef无二

```javascript
setup(){
    let msg = { name: 'zs', age: 16 }
    let msg3 = toRefs(msg)
    console.log(msg) // { name:ref, age:ref }  ref代指ref对象
    function change3() {
      msg3.name.value = 'zl'
      msg3.age.value = 20
      console.log(msg, msg3) // {name: "zl", age: 20} { name:ref, age:ref }
    }
    change3()
    return { msg3, change3 }
}

```

# 4.shallowRef

shallowRef 创建浅层响应式，仅对 .value 本身进行响应式处理，而不深度追踪对象内部的变化。

```javascript
<script setup>
import { shallowRef } from 'vue';
 
const obj = shallowRef({ count: 0 });
 
const update = () => {
  obj.value.count++; // 不会触发视图更新
  obj.value = { count: obj.value.count }; // 需要重新赋值整个对象才会更新
};
</script>
...
```

# 5.customRef

customRef 创建自定义的 ref，用于控制数据的读取和存储逻辑（如防抖或节流）。

```javascript
<script setup>
import { ref, customRef } from 'vue';
 
function useDebouncedRef(value, delay = 300) {
  let timeout;
  return customRef((track, trigger) => {
    return {
      get() {
        track(); // 追踪依赖
        return value;
      },
      set(newValue) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          value = newValue;
          trigger(); // 触发更新
        }, delay);
      }
    };
  });
}
 
const searchQuery = useDebouncedRef('', 500);
</script>
 
<template>
  <input v-model="searchQuery" placeholder="输入搜索内容" />
  <p>搜索内容：{
  
  { searchQuery }}</p>
</template>
```

# 6.unRef

unref 直接获取 ref 的值，无需使用 .value。

```javascript
<script setup>
import { ref, unref } from 'vue';
 
const count = ref(10);
 
console.log(unref(count)); // 10
</script>
```

# 7.isRef

isRef 用于检查一个变量是否为 ref。

```javascript
<script setup>
import { ref, isRef } from 'vue';
 
const count = ref(0);
 
console.log(isRef(count)); // true
console.log(isRef(100)); // false
```

# 8.triggerRef

triggerRef 强制触发 shallowRef 的视图更新。

```javascript
<script setup>
import { shallowRef, triggerRef } from 'vue';
 
const obj = shallowRef({ count: 0 });
 
const forceUpdate = () => {
  obj.value.count++; // 不会触发更新
  triggerRef(obj); // 强制触发更新
};
</script>
 
<template>
  <div>
    <p>计数：{
  
  { obj.count }}</p>
    <button @click="forceUpdate">强制更新</button>
  </div>
</template>
```

# 总结

| API | 作用 |
| --- | --- |
| ref(value) | 创建响应式数据（基本类型或对象） |
| toRef(obj, key) | 将对象的某个属性转为 ref |
| toRefs(obj) | 将整个对象的属性转为 ref |
| shallowRef(value) | 创建浅层响应式 ref |
| customRef((track, trigger) => {...}) | 创建自定义 ref |
| unref(ref) | 获取 ref 的值（等价于 ref.value） |
| isRef(value) | 判断是否为 ref |
| triggerRef(ref) | 强制触发 shallowRef 更新 |
