---
title: URL Link 扫码跳转微信小程序案例
date: 2026-02-06T05:20:54.583Z
categories:
  - 小程序相关
tags:
  - 微信小程序
---
# 目的

本文档结合实战梳理案例，帮助开发人员参考使用

# 操作步骤/内容/流程

## 链接生成与跳转

*   **多场景支持**：短信、邮件、网页、微信内均可使用
    
*   **智能跳转**：
    
    *   微信内访问 → 会调整为开放标签直接打开小程序
        
    *   微信外访问 → 通过浏览器打开显示官方中间页
        
    *   ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/4EZlweZ1a72gZqxA/img/e5acd8b2-71ed-4cbe-8c68-cb6585b6c8bf.png)
        
*   **生成链接格式**：`https://wxaurl.cn/*TICKET*` 或 `https://wxmpurl.cn/*TICKET*`
    

## 调用限制

| 限制类型 | 具体说明 |
| --- | --- |
| **生成限制** | URL Scheme + URL Link 每日总生成量 ≤ 50万次 |
| **打开限制** | 每日通过这两种方式打开小程序总次数 ≤ 300万次 |

## 适用场景

*   短信、邮件中的链接跳转
    
*   网页内嵌链接跳转
    
*   微信内直接打开小程序
    
*   生成二维码供用户扫描
    

## 代码实现

[官方调用链接](https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/qrcode-link/url-link/generateUrlLink.html)

1.  引用生成二维码组件
    
    [请至钉钉文档查看附件《yz-qr\_1.0.4.zip》](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxDKq2RpcdKoLwX0W47Z3je9?doc_type=wiki_doc&iframeQuery=anchorId%3DX02mhssr8g5fwfr3is1ykp)
    
2.  二维码绘制
    
    ```javascript
    <template>
      <view class="zk_card-warp">
        <view class="zk_card-warp-title">{{ cardTitle }}</view>
        <view>
          <!--            二维码展示-->
          <yzQr :text="qrCodeUrl" :size="230"></yzQr>
          <view class="zk_refresh-box" @click="getUrlLink">
            二维码3分钟失效
            <img class="zk_refresh-icon" :src="refreshIcon" alt="" />
          </view>
        </view>
       ...
      </view>
    </template>
      
    <script>
      ...
    mounted(){
      getUrlLink() {
        // 请求后端获取跳转小程序的urllink
        const codeData = {
          const expire_time = new Date().getTime() + 3 * 60 * 1000;
          return {
            path: "/pages/record/repair/servePay/servePay",//目标小程序指定页面路径
            query: `orderNo=${this.orderNo}`,//传参
            expire_time,//自定义过期时间
            env_version: "trial"//要打开的小程序版本（正式版为 "release"，体验版                          为"trial"，开发版为"develop"）
          };
        }
          getJumpUrl(codeData).then(res => {
            this.qrCodeUrl = res.root.url_link;
          });
        }
    }
    ...
    </script>
    ```
    
3.  小程序接收传参
    

```javascript
onLoad: function (routerData) {
    this.orderNo = routerData.orderNo;
  }
```

## 注意事项

1.  **只能生成已发布的小程序的 URL Link（跳转的目标小程序的path必须已经上线）。**
    
2.  在微信内或者安卓手机打开 URL Link 时，默认会先跳转官方 H5 中间页，如果需要定制 H5 内容，可以使用云开发静态网站。
    
3.  目标小程序接收参数时需要注意 与平时小程序navigateTo跳转传参有不同，不会包含params这一层对象。
