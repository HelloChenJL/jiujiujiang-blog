---
title: Antd的 select、datePicker等组件选项框随页面滚动问题如何解决
date: 2026-02-06T05:15:07.182Z
categories:
  - 工作总结
tags:
  - 经验总结
  - Antd
  - Form
---
# Antd的 select、datePicker等组件选项框随页面滚动问题如何解决

# 前言

在开发的时候经常会在在表单里面使用下拉框或者时间框，当页面有滚动条的时候，下拉框的内容会随着页面滚动，没有定位在下拉框上面

例如：

![image2024-8-4_15-54-25.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/confluenceImport/8180135318765114356/confluenceIMG/227738774/227738773.png)

# 解决方法

我们可以使用官方提供的**getPopupContainer** 方法

```text/x-java
:getPopupContainer="(triggerNode: any) => triggerNode.parentNode"
```

但是在开发的时候发现datePicker组件这样写不生效，打印datePicker直接拿到的triggerNode.parentNode拿的还是最外层div，所以还是分离的，所以需要在datePicker外面加一层div就好了，网上看有人说直接定位到身节点，但是实践发现定位到本身节点确实不在分离了，但是会导致选择器不能选日期。

一般我们做项目的时候其实很多地方都会存在这种问题，所以我们可以在全局进行配置，这样就不用每个都改一遍了

```text/javascript
<template>
  <a-config-provider :locale="zhCN" :getPopupContainer="getPopupContainer">
    <el-config-provider :locale="elZhCN">
      <ZkConfigProvider v-bind="config">
        <RouterView />
      </ZkConfigProvider>
    </el-config-provider>
  </a-config-provider>
</template>
<script>
const getPopupContainer = (triggerNode: HTMLElement) => {
  if (triggerNode) {
    return triggerNode.parentNode as HTMLElement;
  }
  return document.body;
};
</script>
```

