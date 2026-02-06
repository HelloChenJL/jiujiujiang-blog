---
title: URL Scheme跳转微信小程序方案
date: 2026-02-06T05:29:59.227Z
categories:
  - 小程序相关
tags:
  - 微信小程序
  - uniapp组件
---
# URL Scheme跳转微信小程序方案

# 背景

URL Scheme是为手机应用程序分配的一种特殊格式的URL，用于访问特定的APP或其特定功能，以实现通信。这类似于给服务器资源分配URL以便访问，只不过这里的URL被赋予了更特殊的功能，即指向某个具体的APP或者APP内的特定功能。

每个APP都需要一个标识，以便用户能够定位并访问它。这个标识就是URL Scheme中的“Scheme”部分。它在URL中起到引导作用，指示浏览器或操作系统打开特定的APP或其特定功能。

# 实现方式

借助URL Scheme实现扫码跳转小程序：将对应的跳转参数传递给服务端接口，生成 [URL Scheme](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/url-scheme) 后，将其转换为二维码。用户扫码后，可直接跳转至小程序对应功能页面。

# URL Scheme介绍

URL Scheme 是微信小程序提供的一种页面跳转方式，主要分为以下两种：

### 加密 URL Scheme

1.  **获取方式**：通过服务端接口获取，适用于从短信、邮件、微信外网页等场景打开小程序。生成示例格式为 `weixin://dl/business/?t= *TICKET*` 。
    
2.  **拼接参数**：支持在后面拼接参数，如 `weixin://dl/business/?t= *TICKET*&cq=*CUSTOM PARAMETER*` 。但参数有一定限制和要求。
    
3.  **iOS 系统支持**：可直接识别跳转小程序；Android 系统不支持直接识别，需通过 H5 页面中转。
    

### 明文 URL Scheme

1.  **获取方式**：开发者无需调用接口，在平台设置声明后可自行拼接生成，格式如 `weixin://dl/business/?appid=*APPID*&path=*PATH*&query=*QUERY*&env_version=*ENV_VERSION*` 。
    
2.  **参数说明**：包括必填的 appid 和 path ，选填的 query 和 env\_version 。
    

### 频率限制

每天生成加密 URL Scheme 和 URL Link 的总数量上限为 50 万，通过它们打开小程序的总次数上限为 300 万。

### 注意事项

1.  只能生成已发布的小程序的 URL Scheme 。
    
2.  可能会触发系统弹框询问，需处理用户选择不跳转的场景。
    
3.  部分浏览器限制直接跳转，可设置跳转按钮。
    
4.  平台有安全策略防止链接被黑灰产批量打开导致访问上限。
    

此功能针对非个人主体小程序开放。在使用时需遵循相关规定和要求，以确保正常实现页面跳转功能。

:::
在实际开发当中，通常我们会使用 **加密** **URL Scheme**。
:::

# 代码实现

## 组件结构

| views<br>  \|- components<br>      \|- QrCode  // 转换为二维码<br>      \|- SchemePage  // 获取 Scheme 码 |
| --- |

## 页面代码

```vue
<template>
  <BaseCard :hasExtra="false" :header="codeData.header" cardClass="zk_width" class="zk_card_margin">
    <div slot="body">
      <div>
        //生成二维码
        <vue-qr :correctLevel="3" :autoColor="false" colorDark="#262626"
                :text="`${url}`" :size="180" :logoMargin="3"></vue-qr>
        <div class="zk_body-text">请用手机微信扫描二维码</div>
      </div>
    </div>
  </BaseCard>
</template>

<script>
import BaseCard from "@/components/BaseCard/BaseCard";
import VueQr from "vue-qr";
import {wxm} from "@/config/server";
export default {
  name: "index",
  components: {BaseCard, VueQr},
  props: {
    codeData: {
      type: Object,
      default: () => {
        return {
          header: '',
          path: '',
          routerName: '',
          query: ''
        }
      }
    }
  },
  data() {
    return {
      url: ''
    }
  },
  mounted() {
    const {path,routerName,query} = this.codeData
    // 跳转H5访问服务器接口获取 URL Scheme
    this.url = `${wxm.protocol}://${window.location.host}/#/${routerName}/scheme?path=${encodeURIComponent(path)}&query=${encodeURIComponent(query || '')}`
  }
}
</script>

<style scoped lang="scss">
.zk_width {
  width: 500px;
  height: 340px;
}

.zk_body-text {
  @include zk_text(20px,24px,14px);
  text-align: center;
  color: #8c8c8c;
}
</style>
```
```vue
<script>
import {getScheme} from "@/api/wxm";

export default {
  name: "index",
  mounted() {
    const {path,query} = this.$route.query
    // H5访问服务器接口获取 URL Scheme
    getScheme({path: path,query: query, version: "release"}, (res) => {
      location.href = res.root.openLink
    })
  }
}
</script>

<style scoped>

</style>
```

入口页调用QrCode组件，将所需的参数传入

```text/x-java
<template>
  <QrCode :codeData="codeData"></QrCode>
</template>

<script>
import QrCode from '@/views/components/QrCode/QrCode';

export default {
  name: 'Modifyinfos',
  components: {QrCode},
  data() {
    return {
	  codeData: {
		 header: '信息修改', // 二维码窗口的标题
      	 path: '/pages_with_contract/modifyInfo/modifyInfo',  // 对应的小程序功能路由
      	 routerName: 'modifyinfos',  // 官网代码中此功能的路由
		 query:'',  // 小程序跳转的路径参数，非必传，不传时默认为空串
    }
  },
};
</script>

<style scoped>

</style>
```

# 测试步骤

在QrCode组件中，将拼接的${wxm.protocol} （即https）替换为本地服务对应的http，打印对应的Scheme码跳转H5路径

```text/x-java
this.url = `http://${window.location.host}/#/${routerName}/scheme?path=${encodeURIComponent(path)}&query=${encodeURIComponent(query || '')}`
console.log('url',this.url)
```

![image2024-7-14_14-6-50.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/confluenceImport/-1895441960499079832/confluenceIMG/224659310/224659296.png)

在新页面中打开这个H5，其中走了获取Scheme码的接口，即返回的openLink

![image2024-7-14_14-8-12.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/confluenceImport/-1895441960499079832/confluenceIMG/224659310/224659297.png)

在微信开发者工具中选择URL Scheme编译模式，将返回的Scheme码粘贴到此处，点击确定即可测试跳转对应功能页面

![image2024-7-14_14-10-39.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/confluenceImport/-1895441960499079832/confluenceIMG/224659310/224659300.png)

![image2024-7-14_14-12-8.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/confluenceImport/-1895441960499079832/confluenceIMG/224659310/224659302.png)

![image2024-7-14_14-13-56.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/confluenceImport/-1895441960499079832/confluenceIMG/224659310/224659306.png)
