---
title: vue3的js文件中使用vue-router
date: 2026-02-06T05:15:13.146Z
categories:
  - 工作总结
tags:
  - Vue3
  - Vue
---
# vue3的js文件中使用vue-router

### 1.问题：

在vue文件中使用语法，同样在js文件中使用控制台会报出警告，并且打印出来的router是undefined

```text/javascript
import {useRouter ,userRoute} from 'vue-router'

const router = userRouter(）

console.log(router)//undefined
```

### 2.原因：

因为上面写的引入方式是vue3的hooks，不是js的，所以只需要导入我们自己创建的router文件就可以了

```text/javascript
import router from “@/router/index.js”
```
---

