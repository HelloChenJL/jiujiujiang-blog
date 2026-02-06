---
title: Vue3 TransitionGroup
date: 2026-02-06T05:12:29.484Z
categories:
  - Vue3新特性学习
tags:
  - Vue3
  - Vue
---
# Vue3 TransitionGroup

# 前言

TransitionGroup是Vue用来显示过渡列表的组件，相似的组件还有一个叫transition，<transition>组件用于单个元素的进入/离开过渡，通常与v-if或v-show配合使用。它控制单个元素的过渡效果，比如淡入淡出、滑动等。

# 应用场景

| **特性** | `<transition>` | `<transition-group>` |
| --- | --- | --- |
| **目标** | 单个元素 | 列表（`v-for` 渲染） |
| **包裹元素** | 无（直接包裹子元素） | 默认渲染为 `<div>` |
| **核心功能** | 进入/离开过渡 | 增删改、排序过渡 |
| **性能** | 轻量 | 需优化多元素处理 |
| **典型场景** | 弹窗、提示框 | 动态列表、拖拽排序 |

# V3版本的TransitionGroup

## 1.与V2版本的区别

### 1. 类名命名规范

Vue 2：使用 `v-` 前缀（如 `v-enter`, `v-leave-to`）。

Vue 3：遵循 CSS 过渡规范，改用更清晰的命名：

`enter-from` → 替代 `v-enter`

`leave-to` → 替代 `v-leave-to`

`enter-active`/`leave-active` 保留

### 2. 包裹元素标签

Vue 2：默认渲染为 `<span>`，可通过 `tag` 属性修改（如 `tag="div"`）。

Vue 3：默认使用 `<div>` 包裹，移除 `tag` 属性，需直接在外层使用 `<div>` 或其他元素。

### 3. 列表移动动画

Vue 2：通过 `v-move` 类实现元素位置变化过渡。

Vue 3：改用 CSS 的 `transform` 属性实现平滑移动，需配合 `move-class` 或 CSS 过渡。

### 4. 过渡模式（Mode）

Vue 2：支持 `mode="out-in"` 等模式控制过渡顺序。

Vue 3：模式行为更严格，需显式定义进入/离开顺序，避免冲突。

### 5. 组件与 CSS 变量

Vue 3：支持通过 CSS 变量（如 `--duration`）动态控制过渡时间，提供更灵活的样式管理。

### 6. 性能优化

Vue 3：底层优化虚拟 DOM 算法，列表过渡更高效，尤其在频繁更新时表现更优。

# 详细使用

*   将需要过渡的元素放入transition-group组件内部。
    
*   使用v-for指令遍历数据列表，并为每个元素设置`唯一的key属性`。
    
*   定义过渡效果的样式
    

```javascript
<template>
  <button @click="addBox">增加盒子</button>
  <transition-group
    tag="div"
    class="box-wrap"
    enter-active-class="animate__animated animate__bounceIn"
    leave-active-class="animate__animated animate__bounceOut"
  >
    <div
      v-for="item in boxList"
      :key="item.id"
      :style="{ backgroundColor: item.bgColor }"
      class="box"
    ></div>
  </transition-group>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

const boxList = reactive([
  {
    id: 1,
    bgColor: "#666666",
  },
]);
const addBox = () => {
  boxList.push({
    id: boxList.length + 1,
    bgColor: color16(),
  });
};
const color16 = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  return color;
};
</script>
<style scoped lang="scss">
.box-wrap {
  display: flex;
  align-item: center;
  justify-content: space-between;
}
.box {
  width: 200px;
  height: 200px;
  margin: 10px;
}
</style>


```

在上面案例中，首先需要安装animate.css组件库

npm install animate.css --save

其中tag指定一个元素作为容器元素来渲染，其余用法和animate一致。需要注意的是，使用animate.css组件库类名时前面需要加上animate\_\_animated才会生效。
