---
title: Vue3 watch、watchEffet
date: 2026-02-06T05:12:22.070Z
categories:
  - Vue3新特性学习
tags:
  - Vue3
  - Vue
---
# Vue3 watch、watchEffet

## 1. 用法区别

### 1.1 Vue 2

```javascript
watch: {
  sum(newValue, oldValue) {
    console.log('sum 的值变化了', newValue, oldValue);
  }
}

watch: {
  sum: {
    handler(newValue, oldValue) {
      console.log('sum 的值变化了', newValue, oldValue);
    },
    deep: true, // 深度监听
    immediate: true // 初始化监听
  }
}

```

### 1.2 Vue 3

#### 1.2.1 `watch` 的第一个参数可以是不同形式的“数据源”

*   单个 `ref`：
    

```javascript
const x = ref(0)
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

```

*   Getter 函数：
    

```javascript
const x = ref(0)
const y = ref(0)
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

```

*   多个数据源组成的数组：
    

```javascript
const x = ref(0)
const y = ref(0)
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})

```

#### 1.2.2 不能直接侦听响应式对象的属性值

*   错误示例：
    

```javascript
const obj = reactive({ count: 0 })
// 错误，因为 watch() 得到的参数是一个 number
watch(obj.count, (count) => {
  console.log(`Count is: ${count}`)
})

```

*   正确示例：
    

```javascript
const obj = reactive({ count: 0 })
// 提供一个 getter 函数
watch(
  () => obj.count,
  (count) => {
    console.log(`Count is: ${count}`)
  }
)
// 或者直接监听整个响应对象
watch(obj, (newValue, oldValue) => {
  // 在嵌套的属性变更时触发
  // 注意：`newValue` 此处和 `oldValue` 是相等的
  // 因为它们是同一个对象！
})

```

#### 1.2.3 深度监听和初始化监听

*   深度监听：
    

```javascript
watch(
  source,
  (newValue, oldValue) => {
    // 立即执行，且当 `source` 改变时再次执行
  },
  { deep: true, immediate: true }
)

```

*   在 Vue 3.5+ 中，`deep` 选项还可以是一个数字，表示最大遍历深度。开销比较大，谨慎使用。
    

#### 1.2.4 一次性侦听

*   在 3.4+ 版本中，支持一次性侦听：
    

```javascript
watch(
  source,
  (newValue, oldValue) => {
    // 当 `source` 变化时，仅触发一次
  },
  { once: true }
)

```

#### 1.2.5 副作用清理函数

*   在 Vue 3.5+ 中，增加了一个副作用清理函数 `onWatcherCleanup`，必须在 `watchEffect` 效果函数或 `watch` 回调函数的同步执行期间调用：
    

```javascript
import { watch, onWatcherCleanup } from 'vue'

watch(id, (newId) => {
  const controller = new AbortController()

  fetch(`/api/${newId}`, { signal: controller.signal }).then(() => {
    // 回调逻辑
  })

  onWatcherCleanup(() => {
    // 终止过期请求
    controller.abort()
  })
})

```

*   在 3.5 之前的版本中，提供一个 `onCleanup` 函数，作为第三个参数传递给侦听器回调，以及 `watchEffect` 作用函数的第一个参数：
    

```javascript
// 这在 3.5 之前的版本有效。此外，通过函数参数传递的 onCleanup 与侦听器实例相绑定，因此不受 onWatcherCleanup 的同步限制。
watch(id, (newId, oldId, onCleanup) => {
  // ...
  onCleanup(() => {
    // 清理逻辑
  })
})

watchEffect((onCleanup) => {
  // ...
  onCleanup(() => {
    // 清理逻辑
  })
})

```
