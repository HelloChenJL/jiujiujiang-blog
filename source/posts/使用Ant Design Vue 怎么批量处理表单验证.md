---
title: 使用Ant Design Vue 怎么批量处理表单验证
date: 2026-02-06T05:15:21.904Z
categories:
  - 工作总结
tags:
  - Vue
  - Antd
  - Form

---
# 使用Ant Design Vue 怎么批量处理表单验证

1.需要注意三点，

*   绑定form表单
    
*   设置rules
    
*   给表单项绑定对应name
    
*   在rules里面可以根据需求自定义验证规  
      
    ![image2024-1-5_9-4-54.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/confluenceImport/8180135318765114356/confluenceIMG/200674048/200674031.png)![image2024-1-5_9-1-25.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/confluenceImport/8180135318765114356/confluenceIMG/200674048/200674026.png)
    

  

2.有的时候校验的值是对象中嵌套的某个属性

例如：想要校验form表单里面的sopTaskUserParamDTO对象里的userIdList 属性，这样我们直接在name上写userIdList是不生效的，可以给name定义成下面这种数组的格式就可以了。

  

![image2024-1-5_9-9-23.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/confluenceImport/8180135318765114356/confluenceIMG/200674048/200674036.png)![image2024-1-5_9-2-25.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/confluenceImport/8180135318765114356/confluenceIMG/200674048/200674028.png)

  

  

  

