---
title: VueUse有哪些实用的方法
date: 2026-02-06T05:11:15.806Z
categories:
  - Vue相关
tags:
  - Vue
---
# VueUse有哪些实用的方法

### [VueUse官网](https://vueuse.org/core/useOnline/)

### 1.useVmodal

useVModel函数将其简化为只使用标准的ref语法，假设我们有一个自定义的文本输入，试图为其文本输入的值创建一个v-model。通常情况下，我们必须接受一个 value的 prop，然后发出一个 change事件来更新父组件中的数据值。

我们可以使用useVModel，把它当作一个普通的ref，而不是使用ref并调用props.value和update:value。

```text/javascript
子组件：
<script setup>
import { useVModel } from '@vueuse/core'
//1.首先定义了要附加到v-model上的 props
const props = defineProps({
count: Number,
})
2.然后我们发出一个事件，使用v-model的命名惯例update:<propName>
const emit = defineEmits(['update:count'])
3.使用useVModel组合来将 prop和事件绑定到一个ref
const count = useVModel(props, 'count', emit)
</script>

<template>
<div>
  <button @click="count = count - 1">-</button>
  <button @click="count = 0">Reset to 0</button>
  <button @click="count = count + 1">+</button>
</div>
</template>

父组件：
<script setup>
import { ref } from 'vue'
import Input from './components/Input.vue'

const count = ref(50)
</script>

<template>
<div>
这里的count ref是通过v-model绑定与 Input组件内部的count ref同步的。
  <Input v-model:count="count" />
  {{ count }}
</div>
</template>
```

每当 prop 发生变化时，这个 count 就会改变。但只要它从这个组件中被改变，它就会发出update:count事件，通过v-model指令触发更新。

### 2.useStorage

使用useStorage自动将 ref 同步到 localstorage

```text/x-java
<script setup>
import { useStorage } from '@vueuse/core'
const input = useStorage('unique-key', 'Hello, world!')
</script>

<template>
<div>
  <input v-model="input" />
</div>
</template>
```

第一次加载时， input 显示 'Hello, world!'，但最后，它会显示你最后在 input 中输入的内容，因为它被保存在localstorage中。

除了 localstorage，我们也可以指定 sessionstorage

```text/x-java
const input = useStorage('unique-key', 'Hello, world!', sessionStorage)
```

### 3.useRefHistory 跟踪响应式数据的变化

useRefHistory跟踪对 ref 所做的每一个改变，并将其存储在一个数组中。这样我们能够轻松为应用程序提供**撤销**和**重**做功能。

```text/x-java
<template>
<p>
  <button> Undo </button>
  <button> Redo </button>
</p>
<textarea v-model="text"/>
</template>

<script setup>
import { ref } from 'vue'
const text = ref('')
</script>

<style scoped>
button {
  border: none;
  outline: none;
  margin-right: 10px;
  background-color: #2ecc71;
  color: white;
  padding: 5px 10px;;
}
</style>
```

接着，导入useRefHistory，然后通过 useRefHistory从 text 中提取history、undo和redo属性。

```text/x-java
import { ref } from 'vue'
import { useRefHistory } from '@vueuse/core'

const text = ref('')
const { history, undo, redo } = useRefHistory(text)
```

每当我们的ref发生变化，更新history属性时，就会触发一个监听器。

```text/x-java
<template>
<p>
  <button @click="undo"> Undo </button>
  <button @click="redo"> Redo </button>
</p>
<textarea v-model="text"/>
</template>

<script setup>
import { ref } from 'vue'
import { useRefHistory } from '@vueuse/core'
const text = ref('')
const { history, undo, redo } = useRefHistory(text)
</script>

<style scoped>
button {
  border: none;
  outline: none;
  margin-right: 10px;
  background-color: #2ecc71;
  color: white;
  padding: 5px 10px;;
}
</style>
```

为这个功能增加更多的功能。例如，我们可以深入追踪 reactive 对象，并像这样限制 history 记录的数量。

```text/x-java
const { history, undo, redo } = useRefHistory(text, {
deep: true,
capacity: 10,
})
```

### 4.onClickOutside 关闭 modal

onClickOutside 检测在一个元素之外的任何点击。检测点击非常简单。但是，当点击发生在一个元素之外时，如何检测？那就有点棘手了。但使用VueUse中的 onClickOutside 组件就很容易能做到这点。常见的使用情况是关闭任何模态或弹出窗口。

```text/x-java
<template>
<button @click="open = true"> Open Popup </button>
<div class="popup" v-if='open'>
//2.然后我们用元素上的ref•属性把它变成一个模板ref。
  <div class="popup-content" ref="popup">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis aliquid autem reiciendis eius accusamus sequi, ipsam corrupti vel laboriosam necessitatibus sit natus vero sint ullam! Omnis commodi eos accusantium illum?
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
const open = ref(false)
//1.为想要追踪的 container 元素创建一个 ref :
const popup = ref() // template ref
//3.有了容器的ref 之后，我们把它和一个处理程序一起传递给onClickOutside组合。
onClickOutside(popup, () => {
open.value = false
})
</script>

<style scoped>
</style
```

### 5.使用 useTransition 做个数字加载动画

  

```text/x-java
我们只用一行就能顺利地在数值之间进行过渡。

import { ref } from 'vue'
import { useTransition, TransitionPresets } from '@vueuse/core'
//1.初始化一个 ref 变量 count ，初始值为 0
const count = ref(0)
//2.使用 useTransition 创建一个变量 output
const output = useTransition(count , {
 duration: 3000,
 transition: TransitionPresets.easeOutExpo,
})
//3.改变 count 的值
count.value = 5000

</script>
然后在 template 中显示 output 的值：

<template>
 <h2> 
   <p> {{ Math.round(output) }}+ </p>
 </h2>
</template>

<script setup>
import { ref } from 'vue'
import { useTransition, TransitionPresets } from '@vueuse/core'
const count = ref(0)
const output = useTransition(count, {
 duration: 3000,
 transition: TransitionPresets.easeOutExpo,
})
count.value = 5000
</script>
```

  

我们还可以使用useTransition 转换整个数字数组。 使用位置或颜色时，这非常有用。 使用颜色的一个很好的技巧是使用计算的属性将RGB值格式化为正确的颜色语法。

```text/x-java
<template>
<h2 :style="{ color: color } "> COLOR CHANGING </h2>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTransition, TransitionPresets } from '@vueuse/core'
const source = ref([, , ])
const output = useTransition(source, {
duration: 3000,
transition: TransitionPresets.easeOutExpo,
})
const color = computed(() => {
const [r, g, b] = output.value
return `rgb(${r}, ${g}, ${b})`
})
source.value = [255, , 255]
</script>
```
---

