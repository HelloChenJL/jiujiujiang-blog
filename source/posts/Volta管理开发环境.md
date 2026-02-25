---
title: Volta管理开发环境
date: 2026-02-06T05:07:50.247Z
categories:
  - 工作总结
  - 工具安装
tags:
  - 工具
---
# Volta管理开发环境

*   介绍
    
*   Volta
    
    *   安装
        
    *   应用
        
        *   pnpm
            
*   项目应用
    
    /\*\*/
    
    # 介绍
    
      
    
    随着产品迭代以及Node的升级，管理不同版本，以确保运行时的兼容性和稳定性非常重要，之前梳理了一些环境管理的工具，对比过后决定应用volta，尝试通过volta管理项目上的环境内容。
    
    当前存在的一些问题：
    
*   如果使用的命令行工具，未添加到项目的依赖里，那其他开发者就不知道你用的什么工具，协作成本提升；
    
*   如果不同开发者用的全局安装的工具版本不一样，那么出现bug将难以排查；
    
*   如果不同的项目使用的工具版本不一样，切换项目时需要切换工具版本，目前我们用的nvm。
    

# Volta

一站式的JavaScript管理工具，基于Rust开发。

git：[https://github.com/volta-cli/volta](https://github.com/volta-cli/volta)

官网：[https://volta.sh/](https://volta.sh/)

主要特点：

*   不仅仅是管理node的版本，可以在项目维度上管理相关的环境依赖，当新下载项目时，会自动检测默认版本；
    
*   跨平台支持，包括 Windows 和Unix shell；
    
*   快速设置和切换node引擎；
    
*   支持多个包管理器(目前支持npm、yarn，pnpm处于试验阶段)；
    
*   为协作者提供可复制的环境。
    

## 安装

[https://github.com/volta-cli/volta/releases](https://github.com/volta-cli/volta/releases)，下载当前的最新版本[volta-1.1.1-windows-x86\_64.msi](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/confluenceImport/3133969900967700530/confluenceIMG/209060814/210371703.msi)

1、卸载本地nvm以及相关的node环境；

2、本地安装volta，确认成功；

![image2024-3-12_14-26-20.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/confluenceImport/3133969900967700530/confluenceIMG/209060814/209060777.png)

## 应用

主要命令

```text/x-java
volta fetch 将工具缓存到本地机器以供离线使用
volta install 设置工具的默认版本
volta uninstall 从工具链中卸载工具
volta pin 固定项目的运行时或包管理器
volta list 显示当前工具链
volta completions 命令补全
volta which 查看 volta 安装的工具的目录
volta setup 为当前用户/shell 启用 volta
volta run 运行带有自定义Node、npm、pnpm和/或Yarn版本的命令
volta help 输出帮助信息
```

环境安装

以node管理为例，其他环境依赖如npm、yarn同理

安装最新node命令（**通过install安装的是全局的默认版本**）

```text/x-java
volta install node
```

安装指定版本

```text/x-java
volta install node@20.9.0
```

可能会遇到下载失败或慢的问题

> Node.js官网：版本进入当前版本状态六个月，这让库作者有时间添加对它们的支持。 六个月后，奇数版本（9、11 等）将不受支持，偶数版本（10、12 等）将变为活动 LTS 状态并可供常规使用。LTS 版本状态为“长期支持”，这通常保证关键 bug 将在总共 30 个月内得到修复。 生产应用程序应仅使用活动 LTS 或维护 LTS 版本。

解决方案将node安装文件放到本地的目录，node安装文件地址：[https://registry.npmmirror.com/binary.html?path=node/](https://registry.npmmirror.com/binary.html?path=node/)

本地目录：win: C:\Users\admin\AppData\Local\Volta\tools\image\node

![image2024-3-12_14-37-17.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/confluenceImport/3133969900967700530/confluenceIMG/209060814/209060789.png)

版本管理

设置项目上的环境，以收费系统为例，将node版本确定在20.9版本

```text/x-java
volta pin node@20.9
```

在项目目录输入以上命令，在package.json文件中会添加如下配置，至此收费系统node环境设置完成

![image2024-3-12_14-55-6.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/confluenceImport/3133969900967700530/confluenceIMG/209060814/209060812.png)

### pnpm

关于pnpm现在的支持是试验阶段

> Support for pnpm is currently experimental. To enable it, ensure that the environment variable VOLTA\_FEATURE\_PNPM is set to 1. On Windows, this can be added to your user or system environment variables in the System Settings. On Linux/Mac, you can set the value inside of your profile script (e.g. .bash\_profile, .zshrc, or similar).As this support is experimental, there may be some outstanding issues. Some of the known limitations are listed below, however if you run into anything while using pnpm with Volta that doesn’t work the way you would expect, please [open an issue on our GitHub](https://github.com/volta-cli/volta/issues/new).

在windows下设置VOLTA\_FEATURE\_PNPM命令，需要管理员模式

```text/x-java
setx VOLTA_FEATURE_PNPM 1
```

查看安装的命令，确认安装情况

```text/x-java
volta list 
```

![image2024-3-12_15-6-47.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/confluenceImport/3133969900967700530/confluenceIMG/209060814/209060822.png)

# 项目应用

在项目上设置完后，执行node -v查看每个项目的node版本

老版微信项目

![image2024-3-12_15-10-7.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/confluenceImport/3133969900967700530/confluenceIMG/209060814/209060829.png)

收费系统

![image2024-3-12_15-10-24.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/confluenceImport/3133969900967700530/confluenceIMG/209060814/209060831.png)

可见，两个项目在打开之后会自动切换node的版本，无需手动切换，直接进行开发。
