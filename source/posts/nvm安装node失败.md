---
title: nvm安装node失败
date: 2026-02-06T05:17:33.298Z
categories:
  - 工具安装
tags:
  - 工具
---
# nvm安装node失败

1.  nvm安装以后执行node -v 提示不是内部命令解决：如果当前电脑已经下载了node，一定要将node都进行卸载和清除环境变量再进行nvm安装
    
2.  执行后还是提示node不是内部命令
    
    1.  检查nvm下载的node版本路径下面的内容是否是空的，或者没有这俩个文件，说明未安装成功![image2023-3-29_11-30-4.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/confluenceImport/8180135318765114356/confluenceIMG/167445901/167445896.png)  
        
    2.  是空的话去对应官网进行下载对应想要的版本  
        下载地址：[https://nodejs.org/zh-cn/download/release](https://nodejs.org/zh-cn/download/releases)[s](https://nodejs.org/zh-cn/download/releases)![image2023-3-29_12-58-41.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/confluenceImport/8180135318765114356/confluenceIMG/167445901/167445897.png)
        
    3.  下载成功后，将安装包解压，解压后的名字改为npm，放在node\_moudles里面![image2023-3-29_13-2-17.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/confluenceImport/8180135318765114356/confluenceIMG/167445901/167445898.png)
        
    4.  然后打开npm文件夹下的bin文件夹，找到npm和npm.cmd俩文件![image2023-3-29_13-3-52.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/confluenceImport/8180135318765114356/confluenceIMG/167445901/167445899.png)
        
    5.  将这俩个文件复制到当前node版本的文件夹下![image2023-3-29_13-5-16.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/confluenceImport/8180135318765114356/confluenceIMG/167445901/167445900.png)
        
    6.  最后，重新打开cmd，输入指令npm -v，就可以查看到版本号了
        

  

