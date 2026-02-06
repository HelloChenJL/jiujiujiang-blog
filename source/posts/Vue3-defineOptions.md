---
title: Vue3-defineOptions
date: 2026-02-06T05:12:50.022Z
categories:
  - Vue3新特性学习
tags:
  - Vue3
  - Vue
---
# Vue3-defineOptions

defineOptions()是3.3之后的新属性

# 前言

在我们使用组件的时候，默认情况下在父组件进行传递，但是子组件专门用props进行接的属性会被透传（子组件必须是单根节点）

当我们编写组件想要在一个目标元素或者其他组件外面包一层时，可能不期望透传。我们就可以使用defineOptions设置一个 inheritAttrs 为 false  来禁止这个默认行为。想要访问这些属性可以使用 $attrs 来进行访问，并且可以通过 **v-bind** 来显式绑定在一个非根节点的元素上。

```javascript
defineOptions({
  inheritAttrs: false // 设置不让透传
})
```

# 用法

在3.3之前，如果我们写的组件需要声明name属性方便调试时，则我们声明的单文件组件名称就是文件的名称，但是现在按照规范我们的组件通常是叫index.vue,所以我们在使用的时候需要单独加一个script标签重新定义组件名称

```javascript
<script lang="ts">
  export default {
    name: 'myOptionCom'
  }
</script>

<script setup>
  // setup 语法糖中没有 name 属性
</script>
```

3.3版本之后可以使用defineOptions配置name，不需要额外写选项式api语法

```javascript
<script setup>
  defineOptions({
    name: 'MyComponent',
    inheritAttrs: false
  })
</script>
```

# 注意

和 props 有所不同，透传 attributes 在 JavaScript 中保留了它们原始的大小写，所以像 foo-bar 这样的一个 attribute 需要通过 $attrs\['foo-bar'\] 来访问。

像 @click 这样的一个 v-on 事件监听器将在此对象下被暴露为一个函数 $attrs.onClick。

虽然 `attrs` 的属性总是`最新的`，但是他是`非响应式的`，无法通过 `watch` 去监听其变化，若想要是响应式的，建议使用`props | emits` 进行处理；

使用useAttrs获取属性值

```javascript
import { useAttrs } from 'vue'
const attrs = useAttrs()
```
