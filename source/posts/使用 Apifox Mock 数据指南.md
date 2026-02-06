---
title: 使用 Apifox Mock 数据指南
date: 2026-02-06T05:14:36.672Z
categories:
  - 工作总结
tags:
  - 工具
---
# 使用 Apifox Mock 数据指南

## 1. 前言

Apifox 提供了一个高效的 Mock 引擎，能够根据接口文档自动生成合理的响应数据，无需额外配置，极大地提高了开发效率。

## 2. 使用场景

*   **前后端并行开发**：当 API 文档已完成但接口尚未开发时，前端可以使用 Mock 数据进行开发，从而实现前后端并行开发，缩短项目周期。
    
*   **保护生产数据**：当 API 涉及不便直接调用的生产数据时，前端可以借助 Mock 数据进行开发，避免对生产数据造成影响。
    
*   **测试支持**：在测试过程中，当外部数据需要测试数据集时，可以使用 Mock 数据作为数据源，方便测试人员进行各种测试场景的模拟。
    

## 3. Mock 方式

Apifox 提供了三种 Mock 方式，以满足不同的开发和测试需求：

*   **本地 Mock**：在客户端运行时可以使用，适合本地开发和调试。
    
*   **云端 Mock**：云端 Mock 不依赖本地机器的开启，可以在任何机器上随时访问云端 Mock 数据，适合团队协作和远程开发。
    
*   **Runner Mock**：适用于大规模自动化测试的数据源或非公开 API 的沙箱环境，适合测试团队进行自动化测试和集成测试。
    

在日常开发中，推荐使用本地 Mock，因为它简单快捷，能够满足大多数开发需求。

## 4. 使用方法

### 4.1 创建接口

按照接口创建的要求，填写接口的名称、请求方法、请求路径、请求参数和返回响应等信息，然后点击【保存】按钮保存接口数据。

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/YdgOk2bNkobxKq4B/img/0be6d53f-cd43-4015-8dae-e29cb1f08681.png)

### 4.2 定义响应数据

#### 4.2.1 直接输入值或使用动态值

*   **直接指定固定值**：Apifox 将始终为该字段返回这个值，所有未指定的字段将使用 Apifox 的智能 Mock 生成。
    

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/YdgOk2bNkobxKq4B/img/5eae4148-84a9-4c26-b752-5e9337d634a7.png)

*   **使用动态值**：可以使用 Apifox 的动态值（基于 Faker.js）生成真实的随机数据，直接在下拉列表中选择。如果需要更复杂的动态值，可以参考[动态值表达式](https://docs.apifox.com/46262793f0)模块文档中查看完整的模块、方法及其参数列表。
    

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/YdgOk2bNkobxKq4B/img/293f10d6-e6a2-4d53-a41d-08f5fb3c49b5.png)

动态表达式也可以多个连接，例如，要在一个字符串中生成真实的完整地址，可以这样写：

```javascript
{{$location.streetAddress}}，{{$location.city}}，{{$location.state}}，{{$location.zipCode}}，{{$location.country}}

结果：
"华阳大道188号，成都市，四川省，610000，中国"

```

#### 4.2.2 模拟长数据

当页面需要展示多条数据（如文章列表、商品列表等）时，要快速生成几十条甚至几百条数据，可以在高级设置中设置「最大/最小元素个数」，以及设置枚举值。

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/YdgOk2bNkobxKq4B/img/65853666-038b-44d1-9ef8-a803cd3850d1.png)

### 4.3 设置 Mock 响应的期望

如果你需要返回特定或高度自定义的 Mock 响应，可以使用「Mock 期望」。这让你完全控制 Mock 服务返回的内容。

在「文档模式」或「调试模式」下，可以在接口的 Mock 标签页中设置期望。

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/YdgOk2bNkobxKq4B/img/8f5a991f-3622-4e9b-ba24-4348d7d23a57.png)

#### 4.3.1 返回固定数据

通过添加一个无参数条件的期望，可以返回固定的数据。

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/YdgOk2bNkobxKq4B/img/92f0135d-d0b4-4584-a3d8-f917cf0c65e5.png)

#### 4.3.2 返回条件数据

设置参数条件时，可以选择哪些请求参数作为条件。支持的条件包括 query、path、header、cookie 和 body 参数。填写参数名和条件后，当条件满足时，系统将返回对应的响应内容。

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/YdgOk2bNkobxKq4B/img/0adf117a-4aa2-4fc3-b25a-ed6a1d25e28e.png)

设置多个条件时，这些条件会作为交集处理，只有当多个参数同时匹配时，才会匹配到该期望。

#### 4.3.3 设置 IP 条件

可使接口在接收到特定 IP 地址或 IP 地址范围的请求时，返回相应的 Mock 数据，常用于模拟不同环境或不同客户端的请求响应场景。

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/YdgOk2bNkobxKq4B/img/32064d45-a9c9-472e-99b2-88cb9edcf3d3.png)

#### 4.3.4 设置返回的响应 Headers

真实接口可能会返回特定的响应头（如`Content-Type`、`Set-Cookie`、`Access-Control-Allow-Origin`），通过 Mock 相同的 Headers，可让前端在开发阶段获得与生产环境一致的响应格式。或者在测试跨域资源共享时，需模拟服务端返回`Access-Control-*`系列头可以使用此设置。

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/YdgOk2bNkobxKq4B/img/9bb18190-23ef-439f-a05f-ae2283cdf169.png)

#### 4.3.5 设置状态码和响应延迟时间

*   **HTTP 状态码**：可以为响应设置自定义的 HTTP 状态码（默认是 200）。这样就能模拟各种 API 响应场景，包括错误状态。
    
*   **响应延迟**：可以为响应设置延迟。这个功能对测试应用如何处理较慢的 API 响应很有用。
    

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/YdgOk2bNkobxKq4B/img/2de5d8ae-0ec4-4241-bc54-418517dc17f1.png)

#### 4.3.6 设置期望是否启用

可以根据需要启用或禁用某个 Mock 期望，灵活控制 Mock 数据的返回。

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/YdgOk2bNkobxKq4B/img/37205c17-fe00-4040-93f7-c0d589eda721.png)

### 4.4 访问 Mock 数据

完成上述设置后，直接复制 Mock 数据的 URL，就可以在浏览器或其他工具中直接访问 Mock 数据。

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/YdgOk2bNkobxKq4B/img/6ee8254b-ded3-49a1-8f7c-0ea2e7e88f78.png)

## 5.总结

通过以上步骤，可以轻松地使用 Apifox 的 Mock 功能，快速生成和使用 Mock 数据，提高开发和测试效率。
