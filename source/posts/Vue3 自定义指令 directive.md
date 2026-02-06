---
title: Vue3 自定义指令 directive
date: 2026-02-06T05:12:15.176Z
categories:
  - Vue3新特性学习
tags:
  - Vue3
  - Vue
---
# Vue3 自定义指令 directive

## 作用

自定义指令是用来操作底层DOM的，尽管vue推崇数据驱动视图的理念，但并非所有情况都适合数据驱动。自定义指令就是一种有效的补充和拓展，不仅仅可用于定义任何DOM操作，并且是可以重复使用。

自定义指令，是由一个包含类似组件生命周期钩子函数的对象组成，钩子函数会接受组件所绑定的元素作为参数

## 2.组件内自定义指令

在 `<script setup>` 中，任何以 `v` 开头的**驼峰式命名**的变量都可以当作自定义指令使用。

```javascript
<template>
  <span v-color="'red'">11111</span>
</template>
<script setup lang="ts">
  const vColor = {
  mounted(el, binding) {
    console.log(el, binding, "11111");//el是当前dom元素，binding.value是值传给指令的值
    el.style.color = binding.value;
  },
};
</script>
```

## 3.全局的自定义指令 

 例如下面声明的防重提交指令文件，直接在main.ts 中引入并且挂载在vue实例上即可全局使用；

```javascript
import type { Directive } from "vue";
export const vReplayClickDirective:Directive = {
  mounted(el, binding) {
            el.addEventListener('click', () => {
                if (!el.disabled) {
                    el.disabled = true
                    const timer = setTimeout(() => {
                        el.disabled = false
                        clearTimeout(timer)
                    }, binding.value || 1500)
                }
            })
        },
}
```
```javascript
import { vReplayClick } from "@/directives/vReplayClickDirective";
const app = createApp(App);
app.directive("replayClick", vReplayClick)
```

```javascript
<template>
  <button v-replay-click="1000">提交</button>
  // 因默认是1500毫秒，所以可以不写执行时间，直接写上指令即可
  <button v-my-replay-click>提交</button>
</template>

```

## 4.简化形式

对于自定义指令来说，一个很常见的情况是仅仅需要在 `mounted` 和 `updated` 上实现相同的行为，除此之外并不需要其他钩子。这种情况下我们可以直接用一个函数来定义指令，如下所示：

```javascript
export const vColor: Directive = (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value;
};
```

## 5.注意

组件上不建议使用自定义指令，因为自定义指令需要作用在根节点上，vue3组件中可能同时存在多个根节点；

详细的指令钩子函数以及钩子参数参考官网文档

[https://cn.vuejs.org/guide/reusability/custom-directives.html: https://cn.vuejs.org/guide/reusability/custom-directives.html](https://cn.vuejs.org/guide/reusability/custom-directives.html)
