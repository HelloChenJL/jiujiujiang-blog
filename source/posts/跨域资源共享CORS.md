---
title: 跨域资源共享CORS
date: 2026-02-06T05:02:40.830Z
categories:
  - 学习笔记
tags:
  - Web安全
---
# 跨域资源共享CORS

# 什么是源orgin

orgion指的是网页内容的来源，我们通过访问某个url获取到的文字图片等资源，这个url就是获取这些资源的源

orgion由三部分组成：

*   scheme(协议)http/https
    
*   hostname(域名/地址)：www.baidu.com
    
*   port(端口)：80/43
    

**只有这三个完全一致才是同源**

**具体的文件路径不同不影响同源，端口号默认是80，所以不写端口和80也是同源**

# 什么是跨源

**跨源(Cross-Origin)也常常被称跨域，其实域也属于源，所以叫跨源更加合适**

现在跨源最常见在前后端分离的项目

*   用户访问地址从前端服务器请求html，js等静态资源
    
*   用户获取到的js脚本执行请求向后端服务器请求数据
    
*   用户本来是从访问前端地址进行获取资源，现在又需要向后端发送请求，这个行为就是跨源行为
    

# 同源策略和跨资源共享

同源策略是浏览器的一种安全策略，它限制了脚本从不同的源进行资源加载，这助于隔离潜在的危险，减少可能的攻击途径。例如，互联网上的恶意网站在用户的浏览器中运行JavaScript脚本向其它服务器发送请求。

在前后端分离项目也会遇到这种问题，这样就需要进行跨源资源共享（cors）CORS是[HTTP协议](https://so.csdn.net/so/search?q=HTTP%E5%8D%8F%E8%AE%AE&spm=1001.2101.3001.7020)的一部分，是一种基于HTTP请求头的机制，它允许服务器指明哪些自身之外的源可以来请求它的数据。**跨源资源共享的工作原理就是添加一条HTTP请求头，让服务器明确告诉浏览器****客户端****哪些源可以访问它。**

此外那些可能对服务器数据产生副作用的HTTP请求方法(比如UPDATE)，规范还要求浏览器向服务发送一个预检请求(使用OPTIONS方法)，该请求将在正式发送请求之前，向服务器查询支不支持即将到来的请求方法，得到服务器明确的"批准"之后，再发送实际的内容。

## 简单请求的定义

不是所有请求都会触发上面所述的**预检请求**。不会触发预检请求的方法，我们一般称之为简单请求，简单请求要满足下面的条件：

只能使用如下方法：

*   GET
    
*   HEAD
    
*   POST
    

自定义的请求头(除了自动设置的请求头)只能包含：

*   Accept
    
*   Accept-Language
    
*   Content-Type(还有额外要求)
    
*   Range
    
    Content-Type只能设置为：
    
*   application/x-www-form-urlencoded
    
*   multipart/form-data
    
*   text/plain
    

不满足上述条件就不是简单请求，就会触发预检机制，也就是在正式请求之前使用OPTIONS方法发送一条预检请求。

# 示例

**简单请求**

这是一个简单请求，访问后端的地址如下

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/8K4nyeZGadbJznLb/img/9e9b609f-9352-4568-b63e-9f295d3e4401.png)

我们请求头的Orign被设置成了：[http://localhost:2334](http://localhost:2334/#/login)

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/8K4nyeZGadbJznLb/img/622651be-008c-4156-ba24-d9274a737da0.png)

后端返回响应，响应头中包含了一条`Access-Control-Allow-Origin:`响值和我们请求设置的一样，说明他同意这个地址进行跨源访问，如果设置成星号`*` 代表所以的源都可以访问。

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/8K4nyeZGadbJznLb/img/3a087e19-d419-4268-9f52-9c18a0d5f1a5.png)

**预检请求**

与简单请求不同，对于预检请求来说，浏览器首先会使用`OPTIONS`方法向后端(另一个源发)发送一个HTTP请求，以确认接下来的实际请求是否可以安全发送。

```javascript
const fetchPromise = fetch("http//backend.com/doc", {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "text/xml",
    "X-PINGOTHER": "pingpong",
  },
  body: "<person><name>Arun</name></person>",
});

fetchPromise.then((response) => {
  console.log(response.status);
});

```

注意请求中设置了一个非标准请求头`X-PINGOTHER`，因此这不是一个简单请求。

当请求发送，浏览器客户端和后端服务器之间进行第一次交互：

```javascript
OPTIONS /doc HTTP/1.1
Host: frontend.com
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Origin: https://frontend.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: content-type,x-pingother

HTTP/1.1 204 No Content
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2
Access-Control-Allow-Origin: frontend.com
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400
Vary: Accept-Encoding, Origin
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive

```

观察浏览器客户端发送的`OPTIONS`请求的请求头，除了`Origin`之外，还有如下两个字段：

```javascript
Access-Control-Request-Method: POST
Access-Control-Request-Headers: content-type,x-pingother

```

相当于浏览器客户端问后端服务器：

*   你允许使用POST方法的请求吗？
    
*   你允许请求头中包含`content-type,x-pingother`吗？
    

观察后端服务器响应头中如下几个字段：

```javascript
Access-Control-Allow-Origin: https://frontend.com
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400
```

相当于服务器回答说：

*   我允许[https://frontend.com这个源访问我](https://frontend.com这个源访问我)
    
*   我允许POST,GET,OPTIONS这三种请求方式
    
*   我允许请求头中包含X-PINGOTHER, Content-Type
    
*   在之后86400秒也就是一天的时间中，此类请求无需再发送OPTIONS预检了。
    

整个预检的流程走完，才是真正的请求：

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/8K4nyeZGadbJznLb/img/929c79fd-92a6-4485-8399-eacf60086804.png)

# 总结

我们常说解决跨域问题，**本质就是在请求的过程中加上一些请求头**。前端的Origin请求头是自动的，因此解决跨域主要是后端的工作。对于常见的后端框架来说只需要通过中间件，或者在有些框架中称之为依赖的东西，为响应自动加上CORS所需要的响应头，告诉客户端浏览器我允许的源、方法、请求头等信息，这也有利于保证我们的后端安全。
