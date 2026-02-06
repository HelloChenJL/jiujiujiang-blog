---
title: 前端工程项目配置文件package.json
date: 2026-02-06T05:01:55.269Z
categories:
  - 学习笔记
tags:
  - Vue
---
# 前端工程项目配置文件package.json

# 有哪些字段？

使用npm 进行init后会默认填写下面字段

```javascript
{
  "name": "test",
  "version": "1.0.0",
  "description": "测试一下",
  "main": "index.js",
  "scripts": {
    "test": "testa"
  },
  "repository": {
    "type": "git",
    "url": "http://1111"
  },
  "keywords": [
    "133"
  ],
  "author": "zhangsan",
  "license": "ISC"
}
```

# 字段分别的含义？

*   **name**
    
    *   是指软件包的名称，一般如果这个包需要发布，需要注意重名，一般比较简短，不发布的话和项目同名就行
        
*   **version**
    
    *   发布包的版本号 x.x.x的形式
        
    *   首次发布应该是从1.0.0开始，增加补丁： 1.0.1 ，增加小版本 ：1.1.0，再增加大版本：2.0.0
        
*   **description**
    
    *   项目描述：填写这个有助于发现这个软件包，他会出现在npm搜索中列出
        
*   **keywords**
    
    *   项目关键字：写这个有助于发现这个软件包
        
*   **homepage**
    
    *   项目主页的网址：可以写git仓库的readme地址
        
*   **bugs**
    
    *   项目问题跟踪器的网址和/或报告问题的电子邮件地址。这些信息对遇到软件包问题的人很有帮助。
        
*   **license**
    
    *   开源声明许可
        
*   **author**
    
    *   作者名称：包含一个 "姓名 "字段以及可选的 "url "和 “电子邮件”
        
    *   {  "author": "Barney Rubble b@rubble.com (http://barnyrubble.tumblr.com/)" }
        
*   **contributors**
    
    *   贡献者，是一个数组 规则和author一样
        
*   **private**
    
    *   设置true 代表是私有项目，那么npm将拒绝发布它
        
*   **main**
    
    *   入口文件，如果未设置 main，则默认为软件包根目录下的 index.js。
        
    *   main 字段是一个模块 ID，它是程序的主要入口。也就是说，如果你的软件包名为 foo，用户安装后执行 require(“foo”) 命令，就会返回主模块的 exports 对象。
        
*   **browser**
    
    *   如果你的模块（仅）在浏览器环境使用，应该用browser字段替换main字段
        
*   **config**
    
    *   配置 "对象可用于设置软件包脚本中使用的配置参数，这些参数会在升级过程中持续存在例如，如果一个软件包有以下配置：
        

```javascript
{
  "name": "foo",
  "config": {
    "port": "8080"
  }
}

```

*   **scripts**
    
    *   可以定义一组可以运行的 node 脚本。
        
    *   可通过npm run xxx调用,如果安装了yarn，可以使用yarn xxx，例如npm run dev
        

```javascript
{
    "scripts": {
      "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
      "start": "npm run dev",
      "unit": "jest --config test/unit/jest.conf.js --coverage",
      "test": "npm run unit",
      "lint": "eslint --ext .js,.vue src test/unit",
      "build": "node build/build.js"
    }
}
```

*   **dependencies**
    
    *   设置作为依赖安装的 npm 软件包的列表。当使用 npm install  则安装到该属性下
        

*   **devDependencies**
    
    *   设置作为开发依赖安装的 npm 软件包的列表。和dependencies的区别：作为开发依赖不会被部署到生产环境。 npm install --save-dev 
        
*    **type - 模块类型**
    
    *   `"module"`: 使用 ES 模块
        
    *   `"commonjs"`: 使用 CommonJS 模块（默认）
        
*   **exports - 导出映射**
    

```javascript
{
  "exports": {
    ".": {
      "import": "./dist/esm/index.js",
      "require": "./dist/cjs/index.js",
      "default": "./dist/esm/index.js"
    },
    "./package.json": "./package.json"
  }
}
```

*   **imports - 导入映射**
    

```javascript
{
  "imports": {
    "#internal/*": "./src/internal/*.js"
  }
}
```

**其他一些不常见的配置**

**参考：**[https://blog.csdn.net/qq\_41581588/article/details/128874414?utm\_medium=distribute.pc\_relevant.none-task-blog-2~default~baidujs\_baidulandingword~default-1-128874414-blog-136553889.235^v43^pc\_blog\_bottom\_relevance\_base6&spm=1001.2101.3001.4242.2&utm\_relevant\_index=4](https://blog.csdn.net/qq_41581588/article/details/128874414?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-1-128874414-blog-136553889.235^v43^pc_blog_bottom_relevance_base6&spm=1001.2101.3001.4242.2&utm_relevant_index=4)
