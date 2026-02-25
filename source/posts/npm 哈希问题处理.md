---
title: npm 哈希问题处理
date: 2026-02-06T05:07:50.247Z
categories:
  - 工作总结
tags:
  - npm
---
# npm 哈希问题处理

# 问题

项目构建时会进行依赖文件的install，近期有项目反馈install时出现sha512的问题

```javascript
J:\Jenkins2\jenkins_home\workspace\DYGRWXV>npm install 
npm ERR! code EINTEGRITY
npm ERR! sha512-n43JRhlUKUAlibEJhPeir1ncUID16QnEjNpwzNdO3Lm4ywrBpBZ5oLD0I6br9evr1Y9JTqwRtAh7JLoOzAQdVA== integrity checksum failed when using sha512: wanted sha512-n43JRhlUKUAlibEJhPeir1ncUID16QnEjNpwzNdO3Lm4ywrBpBZ5oLD0I6br9evr1Y9JTqwRtAh7JLoOzAQdVA== but got sha512-xIp7/apCFJuUHdDLWe8O1HIkb0kQrOMb/0u6FXQjemHn/ii5LrIzU6bdECnsiTF/GjZkMEKg1xdiZwNqDYlZ6g==. (7610 bytes)
```

# 处理

此问题原因是因为下载npm包的时候，会进行包的哈希检测，以防下载的包被人恶意篡改，然而有时候因为cnpm与npm混用导致这个问题，可以通过以下步骤解决

**检索具体的integrity**

根据npm报错的sha512值到package-lock.json中ctrl + f 找到是哪个具体包的integrity 然后把这个包的整体信息删除。重新npm install 这样整个安装过程就只会更改有问题的这个包，并且package-lock.json会重新生成这个包的依赖项。

或者npm uninstall '包名' 把这个包卸载了，然后执行npm install，最后不要忘记把这个已经卸载的包也重新安装回来，此时package-lock.json也会自动更新这个包的信息创建新的integrity值。

**删除lock文件**

删除package-lock.json这个文件夹，重新安装，产生的问题是，如果是一个刚创建没多久的项目可能没什么关系，但是一旦这个项目是一个已经好几年的老项目，删除package-lock.json后，重新安装时，就会造成一些包的依赖项和原来不一致，此时你很难保证这些依赖项有没有进行过重大更新，一旦出现和以前版本不兼容的情况，就会导致整个项目无法正常启动。

### 具体方式

在package-lock文件中找到相关的代码

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/Lk3lbVvJ2p37lm96/img/f8d60c05-5a3b-48ae-9612-be8312079990.png)

将此部分内容删除，然后提交代码到git上，重新构建项目