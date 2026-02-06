---
title: Vue3-定义局部样式、样式穿透
date: 2026-02-06T05:12:35.110Z
categories:
  - Vue3新特性学习
tags:
  - Vue3
  - Vue
---
# Vue3-定义局部样式、样式穿透

# 1.前言

在我们使用第三方组件库的时候，经常需要修改组件库样式，就会用到穿透

```javascript
:deep(.a_form){
  //
}
```

# 2.scoped原理

vue中的scoped通过DOM结构以及css样式上加上唯一不重复的标记 **:data-v-hash** 的方式，以保证唯一，达到私有化模块化的目的。

**scoped进行渲染是遵循如下规则：**

*   给HTML的DOM节点加一个不重复data属性(形如：data-v-123)来表示他的唯一性/
    
*   在每句css选择器的末尾（编译后的生成的css语句）加一个当前组件的data属性选择器（如\[data-v-123\]）来私有化样式
    

*   如果组件内部包含有其他组件，只会给其他组件的最外层标签加上当前组件的data属性
    

PostCSS会给一个组件中的所有dom添加了一个独一无二的动态属性data-v-xxxx，然后，给CSS选择器额外添加一个对应的属性选择器来选择该组件中dom，这种做法使得样式只作用于含有该属性的dom——组件内部dom, 从而达到了’样式模块化’的效果

```javascript
<style lang="scss" scoped>//私有化样式
...
</style>
```

# 3.使用场景

父组件会对引用的子组件最外层添加父组件的hash值

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/vBPlN8VB42RXqdG8/img/2504de78-9c78-4ccf-ba7d-d093e5954985.png)

子组件设置dom样式

```javascript
.child span{
  color:rgb(24,11,1)
}
```

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/vBPlN8VB42RXqdG8/img/bc1e0bca-9185-4028-ad10-5ba33ed5f424.png)

父组件修改子组件样式

```javascript
.child :deep(span){
  color:green
}
```

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/vBPlN8VB42RXqdG8/img/4238edb0-4a12-4b32-bfa8-43e095bac817.png)
