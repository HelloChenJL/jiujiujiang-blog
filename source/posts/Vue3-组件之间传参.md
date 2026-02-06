---
title: Vue3-组件之间传参
date: 2026-02-06T05:12:42.310Z
categories:
  - Vue3新特性学习
tags:
  - Vue3
  - Vue
---
# Vue3-组件之间传参

常用的传参方式有：

1.  props
    
2.  自定义事件$emits、$on
    
3.  provide/inject
    
4.  $refs、$parent、$children 、defineExpose、
    
5.  $attrs 祖孙传值
    
6.  vuex、pinia
    

## 1.父子之间使用 props 传参

父组件：

```text/x-java
<template>
<div class="myComponents">
  <!-- 组件之间传参 -->
  <MyComParamsSon 
  :person="person" 
  :name="name"
  @changeNameSon="changeName"
  ></MyComParamsSon>
</div>
</template>
<script setup>
import MyComParamsSon from './myComParamsSon.vue';
import { ref, reactive } from 'vue';
let name = ref('Andy')
let person = reactive({
  name: 'Andy',
  age: 18
})
const changeName = (data) => {
  person.name = data
}
</script>

```

子组件：

在vue3中直接使用setup语法糖下的 **defineProps** 宏函数

注意：当我们使用defineProps获取的值是响应式的，可以直接模板或者上下文直接使用，如果对props的值进行解构，会失去响应，可以使用toRefs或者computed进行二次处理

```text/x-java
const props = defineProps({
  name: {
    type: String,
    default: '未知'
  },
  personSon: {
    type: Object,
    default: () => ({})
  }
})
// ts写法：
const props = defineProps<{
  name:string,
  person:{
    sex:string,
    age:number
  }
}>

const {age} = props.person //这里的age不是响应式的
// 可以用toRef包一层
const {age} = toRefs(props.person) 
// 或者使用computed
const age = computed(()=>props.person.name)
  
```

## 2.子组件向父组件传参 $emit $on

子组件向父组件传递参数或者触发事件时候，通常使用 **$emit('事件名称', 参数)** 触发事件, 参数可有可无

在vue3 中可以直接使用 **defineEmits** 宏函数处理

```text/x-java
<script setup lang='ts'>
  // 这里difineemits 中的事件名称需要与 emit 触发的事件名称保持一致
  const emit = defineEmits(['changeNameSon'])
  const handleChangeName = () => {
    emit('changeNameSon', '11111')
    newPerson.value.name = personSon.person.name
  }

  // ts 中使用
  const emits = defineEmits<{
    (e:'changeNameSon', msg:string):void
  }>()
  const emits = defineEmits<{
    changeNameSon: [msg: String] // 具名元组语法
  }>()
</script>
在父组件中使用v-on绑定事件: 简写 @changeNameSon="changeName"
如：
<MyComParamsSon 
  :personSon="person" 
  :name="name"
  @changeNameSon="changeName"
></MyComParamsSon>

```

## 3.祖孙后代之间传参 provide/inject

当嵌套的层级太深的时候，某个子组件需要较远层级的父组件的数据的时候，如果依然使用props传递数据，那么父组件的层级越来越深，不好维护，这时我们可以用**provide**和**inject**来解决

父组件：

```text/x-java
<template>
<div class="par">
  <h3>provide--inject</h3>
  父组件--pName:{{ msg }}
  <h3>provide--inject</h3>
 
  <Provide></Provide>
  <button @click="handleChangeName">父组件change name</button>
  </div>
</template>
<script setup>
import Provide from './components/provide1.vue'
import { ref, provide, inject } from 'vue'
let msg = ref('start')

const handleChangeName = () => {
  msg.value = 'change'
}
const sChangeName = () => {
  msg.value = 'sChangeName'
}
//在这进行注入，可以注入一个回调函数，这样孙子组件可以修改父组件的属性
provide('pName', {msg, sChangeName})
</script>

```

子组件：

```text/x-java
<template>
  <div class="provide1">
    <div>provide1</div>
    <ProvideS></ProvideS>
  </div>
</template>
<script setup>
import ProvideS from './provide11.vue'

</script>

```

孙子组件：

```text/x-java
<template>
<div class="provide11">
  msg---:{{msg}}；
  <br>
  <br>
  <button @click="sChangeName">孙子组件事件</button>
</div>
</template>
<script setup>
import { computed, provide, ref, inject } from 'vue'
//在这里可以拿到父组件注入的值和函数
const { msg, sChangeName } = inject('pName')
</script>

```

注意：vue2的注入依赖默认是非响应式的，若要实现响应式，需要结合computed回调函数使用，vue3中的注入依赖是响应式的。

## 4.$refs $parent $children 父子之间传参，事件触发

vue3中已经将$children废弃，vue3中直接使用setup语法糖，直接使用**defineExpose()**宏函数

而在使用$refs 或者 $parent 进行链式调用时候，需要先在本组件中使用defineExpose 宏函数，

将对应的属性方法暴露出来；

父组件：

```text/x-java
<template>
  <div class="myComponents">
    <MyComParamsSon 
    :name="name"
    @changeNameSon="changeName"
    ref="sonRef"
    ></MyComParamsSon>
  </div>
</template>
<script setup>
import MyComParamsSon from './myComParamsSon.vue';
import { ref, reactive, onMounted } from 'vue';
// 声明一个ref 引用，注意名称需要与dom 结构中的名称保持一致，用于调用子组件的属性方法
const sonRef = ref('sonRef')
let name = ref('Andy')
const changeName = (data) => {
  person.name = data
}
// 若想在子组件中通过 $parent 获取父组件中的属性方法，则同样需要现在 父组件中使用 defineExpose 来暴露
// 父组件暴露的属性和方法，在子组件中通过 $parent 获取
defineExpose({
  name
})
onMounted(() => {
  //sonRef.value 获取子组件通过defineExpose 暴露的属性方法
  console.log('--', sonRef.value.newPerson)
})
</script>

```

子组件：

```text/x-java
<template>
<div class="son-page" >
  This is a child page.
  <br>
  <el-button type="primary" @click="handleChangeParents($parent)">change parents</el-button>
</div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const sonRef1 = ref('sonRef1')

// 推荐使用js 中
const props = defineProps({
  name: {
    type: String,
    default: '未知'
  },
  personSon: {
    type: Object,
    default: () => ({})
  }
})

let newPerson = ref({
  name: 'default Name',
  age: 15
})
const handleChangeName = () => {
  newPerson.value.name = props.personSon.name
}

// 使用 <script setup> 的组件是默认关闭的——即通过模板引用或者 $parent 链获取到的组件的公开实例，不会暴露任何在 <script setup> 中声明的绑定。
// 即如果想要通过链式获取组件的属性、方法，就需要在子组件中通过 defineExpose进行暴露
defineExpose({
  newPerson, // 暴露的属性
  handleChangeName // 暴露的方法，父组件可以调用
})

const handleChangeParents = (parent) => {
  子组件通过 传入的$parent 获取父组件中通过 defineExpose 暴露的属性方法
  console.log('==parent=', parent.name)
}
onMounted(() => {
  console.log('=sonRef1=', sonRef1)
})
</script>

```

## 5.$attrs 子组件中读取父组件的参数

**$attr**用于获取父组件向下级组件传递的属性，不包含下级组件 **defineProps** 中声明的属性，具有属性透传性；多用于祖孙组件之间的属性传递；

而这种方案不需要通过 **defineExpose** 宏函数来暴露**；**

父组件：同第四点父组件

```text/x-java
<template>
  <div class="myComponents">
    <MyComParamsSon 
    :name="name"
    :job="job" //job 参数没有在子组件 props 中声明
    @changeNameSon="changeName"
    ref="sonRef"
    ></MyComParamsSon>
  </div>
</template>
```

子组件：

```text/x-java
<template>
// 第一种方案，一定要使用v-bind="$attrs"， 进行绑定
<div class="son-page" ref="sonRef1" v-bind="$attrs" >
  This is a child page.
  <!-- 第二种方式，点击事件获取 -->
  <el-button type="primary" @click="handleChangeParents($parent, $attrs)">change parents</el-button>
  <br>
  <!-- 子组件中不使用，job而孙子组件中需要使用时 -->
  <GrandSon :job="attrs.job"></GrandSon>
</div>
</template>
<script setup>
import { ref, onMounted, useAttrs } from 'vue'
import GrandSon from './myComParamsGrandSon.vue'
const sonRef1 = ref('sonRef1')

let newPerson = ref({
  name: 'default Name',
  age: 15
})

const handleChangeParents = (parent, $attrs) => {
  <!-- 第二种方案获取 attrs 中的属性 -->
  console.log('==parent=', parent.name, $attrs)
}
<!-- 第一种方案获取 attrs 中的属性 -->
const attrs = useAttrs()
onMounted(() => {
  console.log('=sonRef1=', sonRef1, attrs)
  // console.log('=$attrs=', $attrs)
})
</script>

```

孙子组件：

先在DOM 上绑定 **v-bind="$attrs"**,再在setup 中引入 **import { useAttrs } from 'vue'，**获取 attrs 中没有在props 中声明的属性

```text/x-java
<template>
<div class="grand-son" @click="getGrandParentsAttr($attrs)" v-bind="$attrs">
  孙子组件中的job:{{ job }} 
  <br>
</div>
</template>
<script setup>
import { ref, computed, onMounted, useAttrs } from 'vue'
let job = ref('默认值')
const getGrandParentsAttr = (attrs) => {
  console.log('==attrs=', attrs)
}
const attrs = useAttrs()
onMounted(() => {
  console.log('==useAttrs=', useAttrs())
  job.value = attrs.job
})
</script>

```
