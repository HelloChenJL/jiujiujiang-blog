---
title: 内容安全策略（CSP）
date: 2026-02-06T05:02:31.065Z
categories:
  - 学习笔记
tags:
  - Web安全
---
# 内容安全策略（CSP）

# 定义

内容安全策略简称csp，大白话讲就是 开发者通过配置设置一个白名单，告诉客户端哪些外部资源可以加载和执行。csp很大强度的增加了网页的安全性，以及攻击者（如跨站脚本攻击（XSS）和数据注入攻击。）发现了漏洞也没办法注入脚本，除非还控制了一台列入百名版的可信主机。

# 分类

（1）`Content-Security-Policy`

配置好并启用后，不符合 CSP 的外部资源就会被阻止加载。

（2）`Content-Security-Policy-Report-Only`

表示不执行限制选项，只是记录违反限制的行为。它必须与`report-uri`选项配合使用。

（3）常见指令

```javascript
default-src：设置默认加载资源的策略（例如，自身的源、任何地方的源、或者不加载任何外部资源）。
script-src：定义哪些脚本可以执行, 例如script标签, a标签的JavaScript:location.href="" 等.
style-src：定义哪些样式表可以加载。
img-src：定义哪些图片资源可以加载。
connect-src：限制可以通过脚本接口进行连接的URL（例如，AJAX 请求、WebSocket）。
font-src：定义哪些字体资源可以加载。
object-src：限制可以加载哪些插件。
media-src：定义哪些媒体资源（音频和视频）可以加载。
frame-src：定义哪些iframe可以加载。

```

# 配置使用

1.  **设置响应头**
    

多个指令之间用英文分号分割；多个指令值用英文空格分割

```javascript
<?php
// 只允许加载来自同源的所有资源
header("Content-Security-Policy: script-src 'self'"); 
// 允许执行来自同源以及http://192.168.112.183的脚本。
header("Content-Security-Policy: script-src 'self' http://192.168.112.183"); 
// 允许执行来自同源以及http://http://192.168.112.183的行内脚本
// 比如 <a javascript:location.href="http://192.168.112.183/hack.php"></a>
header("Content-Security-Policy: script-src 'self' http://192.168.112.183 'unsafe-inline'");
```

    **b. 设置meta标签**

可以直接在HTML文件中的标签中指定CSP。这种方法通常用于单个HTML页面的情况，或者在无法控制服务器响应头的环境中（例如某些静态站点托管服务）。

1. 无法使用某些指令，如frame-ancestors和report-uri。

2. 对于由多个页面组成的网站，每个页面都需要包含一个<meta>标签，这可能会导致维护上的困难。

3. 与通过HTTP头设置相比，这种方法可能会更容易遭受某些攻击方式，

   因为恶意用户可能会尝试注入标签来覆盖你的CSP规则。

```javascript
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://apis.example.com; img-src 'self' https://images.example.com; style-src 'self' 'unsafe-inline';">
    <title>My Secure Page</title>
</head>
<body>
    <!-- 页面内容 -->
</body>
</html>


```

c. **全局配置CSP, 修改服务器配置文件**

除了在PHP脚本或HTML中直接设置CSP之外，还可以在Web服务器的全局配置中设置内容安全策略（CSP）。

这样做的好处是，可以为所有服务的页面统一定义安全策略，而不必为每个单独的页面或脚本设置。

```javascript
// Apache中
<IfModule mod_headers.c>
    Header set Content-Security-Policy "default-src 'self';"
</IfModule>

// Nginx中
server {
    add_header Content-Security-Policy "default-src 'self';";
    ...
}
// Microsoft IIS中
<configuration>
    <system.webServer>
        <httpProtocol>
            <customHeaders>
                <add name="Content-Security-Policy" value="default-src 'self';" />
            </customHeaders>
        </httpProtocol>
    </system.webServer>
</configuration>

```

**d.拦截并报告CSP违规.**

通过**report-uri**指令指示浏览器发送JSON格式的拦截报告到某个地址

```javascript
// 报告并拦截
<?php
header("Content-Security-Policy: default-src 'self'; report-uri /csp-violation-report-endpoint.php");
?>
  // 只报告不拦截
header("Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self'; report-uri /csp-violation-report-endpoint.php");


```
