---
title: javascript-BOM
date: 2026-02-06T05:07:30.396Z
categories:
  - 学习笔记
tags:
  - JavaScript
---
# javascript-BOM

# 1.什么是BOM

*   BOM是Browser Object Model的缩写，简称浏览器对象模型
    
*   BOM提供了独立于内容而与浏览器窗口进行交互的对象
    
*   由于BOM主要用于管理窗口与窗口之间的通讯，因此其核心对象是window
    
*   BOM由一系列相关的对象构成，并且每个对象都提供了很多方法与属性
    
*   BOM缺乏标准，JavaScript语法的标准化组织是ECMA，DOM的标准化组织是W3C（WHATWG,WebHypertextApplicationTechnologyWorkingGroup——网页超文本应用程序技术工作组目前正在努力促进BOM的标准化）
    
*   BOM最初是Netscape浏览器标准的一部分
    

# 2.可以利用BOM做什么

BOM提供了一些访问窗口对象的一些方法，我们可以用它来**移动窗口位置，改变窗口大小，打开新窗口和关闭窗口，弹出对话框，进行导航以及获取客户的一些信息如：浏览器品牌版本，屏幕分辨率等**。但BOM最强大的功能是它提供了一个访问HTML页面的一入口——document对象，以使得我们可以通过这个入口来使用DOM的强大功能！！！

window对象是BOM的顶层(核心)对象，所有对象都是通过它延伸出来的，也可以称为window的子对象。由于window是顶层对象，因此调用它的子对象时可以不显示的指明window对象，例如下面两行代码是一样的：

```DEFAULT_LANGUAGE
Window.document.write("123")document.write('123')
```

# 3.window对象的属性

window有很多子对象常见的有

| 属性 | 说明 |
| --- | --- |
| document | 对话框中显示的当前的文档 |
| frames | 表示当前对话框中所有frame对象的集合 |
| location | 指定当前文档的URL |
| name | 对话框的名字 |
| status | 状态栏中的当前信息 |
| defaultstatus | 状态栏的默认信息 |
| top | 表示最顶层的浏览器对话框 |
| parent | 表示包含当前对话框的父对话框 |
| opener | 表示打开当前对话框的父对话框 |
| closed | 表示当前对话框是否关闭的逻辑值 |
| self | 表示当前对话框 |
| screen | 表示用户屏幕，提供屏幕尺寸，颜色深度等信息 |
| navigator | 表示浏览器对象，用于获得与浏览器相关的信息 |

通过浏览器的document.compatMode属性确定浏览器对CSS渲染技术的支持：当前主流浏览器都使用Quirks模式和标准模式对页面做不同的处理，通过读取document.compatMode属性的值确定是哪种模式，如果是标准模式返回：CSSICompat，如果使用的Quirks模式，返回的是：BackCompat（但是Opera赋值为QuirksMode），因此一般检测标准模式就可以了，  
\[[https://www.jianshu.com/p/86be91568847](https://www.jianshu.com/p/86be91568847) Quirks模式和标准模式是什么？\] 

## 3.1 window.name属性

[window.name](http://window.name)**属性用于设置当前浏览器窗口的名字。它有一个\***_特点\*_**，\***_就是浏览器刷新后，该属性保持不变\*_**。所以，可以把值存放在该属性内，然后跨页面、甚至跨域名使用。当然，这个值有可能被其他网站的页面改写。**各个浏览器对这个值的储存容量有所不同，但是一般来说，可以高达几MB。

```DEFAULT_LANGUAGE
window.name = "Hello World!";console.log(window.name);
```

该属性只能保存字符串，且当浏览器窗口关闭后，所保存的值就会消失。因此局限性比较大，但是**与iFrame窗口通信时，非常有用**。（\*[https://blog.csdn.net/cw\_hello1/article/details/121540023](https://blog.csdn.net/cw_hello1/article/details/121540023)\*\*）

## 3.2 window.innerHeight属性，window.innerWidth属性

innerHeight 返回窗口的文档显示区的高度，如果有垂直滚动条，也包括滚动条高度。

innerWidth 返回窗口的文档显示区的宽度，如果有水平滚动条，也包括滚动条高度。

innerWidth 和 innerHeight 是只读属性。

**注意：**使用 [outerWidth 和 outerHeight](https://m.runoob.com/jsref/prop-win-outerheight.html) 属性获取浏览器窗口的宽度与高度。

JS中获取窗口高度的方法 ：[js获取屏幕的宽高](https://alidocs.dingtalk.com/i/nodes/93NwLYZXWyg4qz02I5M90okoJkyEqBQm)

## 3.3window.pageXOffset属性，window.pageYOffset属性

window.pageXOffset属性返回页面的水平滚动距离，window.pageYOffset属性返回页面的垂直滚动距离。这两个属性的单位为像素

## 3.4 iframe元素 frames 属性返回窗口中所有命名的框架。

该集合是 Window 对象的数组，每个 Window 对象在窗口中含有一个框架或 <iframe>。属性 frames.length 存放数组 frames\[\] 中含有的元素个数。注意，frames\[\] 数组中引用的框架可能还包括框架，它们自己也具有 frames\[\] 数组。

iframe元素遵守同源政策，只有当父页面与框架页面来自同一个域名，两者之间才可以用脚本通信

```text/javascript
alert(frames.length);//框架的数目
alert(frames[0].document.body.innerHTML);//使用下标直接获取对框架中窗口的引用
//不但可以使用下标，还可以使用frame标签的name属性
alert(frames["frame1"].document.title);
//在框架集中还可以使用ID来获取子窗口的引用
var frame1 =document.getElementById("frame1");//这样只是获取了标签
var frame1Win = frame1.contentWindow;//frame对象的contentWindow包含了窗口的引用
//还可以直接获取框架中document的引用
var frameDoc = frame1.contentDocument;
alert(frameDoc);//但IE不支持contentDocument属性
```

想要修改iframe里面的样式，可以参考[https://www.python100.com/html/5Z5J70N5L4XC.html](https://www.python100.com/html/5Z5J70N5L4XC.html)

## 3.5 Navigator属性

**Window对象的Navigator属性，\***_指向一个包含浏览器相关信息的对象\*_**。**

| 属性 | 说明（这些属性可能对不同的浏览器有不同的支持） |
| --- | --- |
| appName | 返回浏览器的名称 |
| appVersion | 返回浏览器的版本号 |
| userAgent | 返回浏览器用于HTTP请求的用户代理头的值 |
| appCodeName | 返回浏览器的名称 |
| platform | 返回运行浏览器的操作系统或硬件平台 |
| cookieEnable | 检测浏览器是否支持Cookie。该属性值为Boolean，如果支持Cookie，返回true，否则返回false |
| systemLanguage | 返回操作系统使用的默认语言，该属性值为字符串 |
| userLanguage | 返回用户使用的语言，概述性为字符串 |
| language | 返回浏览器中使用的默认语言件 |
| mimeType | 返回一个数组，该数组中的元素代表浏览器支持的mime类型 |
| plugins | 返回一个数组，该数组中的元素代表浏览器已经安装的插件 |

### 3.5.1 Navigator.userAgent属性

Navigator.userAgent属性返回浏览器的User-Agent字符串，用来标示浏览器的种类。下面是Chrome浏览器的User-Agent。

```DEFAULT_LANGUAGE
navigator.userAgent// "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36"
```

通过userAgent属性识别浏览器，不是一个好办法。因为必须考虑所有的情况（不同的浏览器，不同的版本），非常麻烦，而且无法保证未来的适用性，更何况各种上网设备层出不穷，难以穷尽。所以，现在一般不再识别浏览器了，而是使用“功能识别”方法，即逐一测试当前浏览器是否支持要用到的JavaScript功能。

**不过，通过userAgent可以大致准确地识别手机浏览器，方法就是测试是否包含“mobi”字符串。**

```text/x-java
var ua = navigator.userAgent.toLowerCase();

if (/mobi/i.test(ua)) {
   // 手机浏览器
} else {
   // 非手机浏览器
}
```

如果想要识别所有移动设备的浏览器，可以测试更多的特征字符串。

```text/x-java
/mobi|android|touch|mini/i.test(ua)
```

## 3.6 screen属性

screen对象包含了显示设备的信息

```text/x-java
// 显示设备的高度，单位为像素
screen.height
// 1920

// 显示设备的宽度，单位为像素
screen.width
// 1080
```

一般使用以上两个属性，了解设备的分辨率。上面代码显示，某设备的分辨率是1920x1080。

除非调整显示器的分辨率，否则这两个值可以看作常量，不会发生变化。显示器的分辨率与浏览器设置无关，缩放网页并不会改变分辨率。

下面是根据屏幕分辨率，将用户导向不同网页的代码

```text/x-java
if ((screen.width<=800) && (screen.height<=600)) {
   window.location.replace('small.html');
} else {
   window.location.replace('wide.html');
}
```

## 3.7 location属性

对于这样一个URL：[http://www.maidq.com/index.html?ver=1.0&id=6#imhere](http://www.maidq.com/index.html?ver=1.0&id=6#imhere)

我们可以用javascript获得其中的各个部分

1.  window.location.href 整个URL字符串(在浏览器中就是完整的地址栏) 本例返回值: [http://www.maidq.com/index.html?ver=1.0&id=6#imhere](http://www.maidq.com/index.html?ver=1.0&id=6#imhere)
    
2.  window.location.protocol URL 的协议部分 本例返回值:http:
    
3.  window.location.host URL 的主机部分 本例返回值:[www.maidq.com](https://wiki.zoomkey.com.cn/www.maidq.com)
    
4.  window.location.port URL 的端口部分 如果采用默认的80端口(update:即使添加了:80)，那么返回值并不是默认的80而是空字符 本例返回值:""
    
5.  window.location.pathname URL 的路径部分(就是文件地址) 本例返回值:/fisker/post/0703/window.location.html
    
6.  window.location.search 查询(参数)部分 除了给动态语言赋值以外，我们同样可以给静态页面,并使用javascript来获得相信应的参数值 本例返回值:?ver=1.0&id=6
    
7.  window.location.hash 锚点 本例返回值:#imhere
    

# 4.window对象的方法

| 方法 | 说明 |
| --- | --- |
| alert() | 弹出一个警告对话框 |
| confirm() | 在确认对话框中显示指定的字符串 |
| prompt() | 弹出一个提示对话框 |
| open() | 打开新浏览器对话框，并且显示有URL或名字引用的文档，并设置创建对话框的属性 |
| close() | 关闭被引用的对话框 |
| focus() | 将被引用的的对话框放在所有打开对话框的前面 |
| blur() | 将被引用的的对话框放在所有打开对话框的后面 |
| scrollTo(x,y) | 把对话框滚动到指定的坐标 |
| scrollBy(x,y) | 按照指定的位移量滚动对话框 |
| setTimeOut(timer) | 在指定毫秒后，对传递的表达式求值 |
| setInterval(interval) | 指定周期性执行代码 |
| moveTo(x,y) | 将对话框移动到指定坐标处 |
| moveBy(offsetx,offsety) | 将对话框移动到指定的位移量处 |
| resizeTo(x,y) | 设置对话框大小 |
| resizeBy(offsetx,offsety) | 按照指定的位移量设置对话框的大小 |
| print() | 相当于浏览器工具栏中“打印”按钮 |
| status() | 状态条，位于对话框下部的信息条，用于任何时间内信息的提示（有些浏览器不支持） |
| defaultstatus() | 状态条，位于对话框下部的信息条，用于某个事件发生时的信息的提示（有些浏览器不支持） |

## 4.1 alert()，prompt()，confirm()

alert()、prompt()、confirm()都是浏览器用来与用户互动的方法。它们会弹出不同的对话框，要求用户做出回应。

需要注意的是，alert()、prompt()、confirm()这三个方法弹出的对话框，都是浏览器统一规定的式样，是无法定制的。

**alert方法弹出的对话框，只有一个“确定”按钮，往往用来通知用户某些信息。**

```text/x-java
// 格式
alert(message);

// 实例
alert("Hello World");
```

用户只有点击“确定”按钮，对话框才会消失。在对话框弹出期间，浏览器窗口处于冻结状态，如果不点“确定”按钮，用户什么也干不了。

**prompt方法弹出的对话框，在提示文字的下方，还有一个输入框，要求用户输入信息，并有“确定”和“取消”两个按钮。它往往用来获取用户输入的数据。**

```text/x-java
// 格式
var result = prompt(text,[default]);

// 实例
var result = prompt('您的年龄？', 25)
```

**prompt方法的返回值是一个字符串（有可能为空）或者null，\***_具体分成三种情况：\*_

1.  用户输入信息，并**点击“确定”，则用户输入的信息就是返回值**。
    
2.  用户没有输入信息，直接点击“确定”，则输入框的默认值就是返回值。
    
3.  用户点击了“取消”（或者按了Escape按钮），则返回值是null。
    

prompt方法的第二个参数是可选的，但是如果不提供的话，**IE浏览器会在输入框中显示undefined，Chrome会返回空字符串""**。因此，最好总是提供第二个参数，作为输入框的默认值

**confirm方法弹出的对话框，除了提示信息之外，只有“确定”和“取消”两个按钮，往往用来征询用户的意见。**

```text/x-java
// 格式
var result = confirm(message);

// 实例
var result = confirm("你最近好吗？");
```

**confirm方法返回一个布尔值，如果用户点击“确定”，则返回true；如果用户点击“取消”，则返回false**。

## 4.2 URL的编码/解码方法

JavaScript提供四个URL的编码/解码方法。

*   decodeURI()
    
*   decodeURIComponent()
    
*   encodeURI()
    
*   encodeURIComponent()
    

## 4.3 window.getComputedStyle方法

getComputedStyle方法接受一个HTML元素作为参数，返回一个包含该HTML元素的最终样式信息的对象。

#### 4.4 window.matchMedia方法

window.matchMedia方法用来检查CSS的mediaQuery语句

# 5. window对象的事件

| 事件 | 说明 |
| --- | --- |
| onfocus | 当浏览器窗口获得焦点时激活 |
| onblur | 当浏览器窗口失去焦点时激活 |
| onload | 当文档完全载入窗口时触发，但需注意，事件并非总是完全同步 |
| onunload | 当文档未载入时触发 |
| onresize | 当用户改变窗口大小时触发 |
| onerror | 当出现JavaScript错误时，触发一个错误处理事件 |
| onafterprint | 窗口被打印后触发 |
| onbeforeprint | 窗口被打印或被打印预览之前激活 |
| onbeforeunload | 窗口未被载入之前触发，发生于onunload事件之前 |
| ondragdrop | 文档被拖到窗口上时触发（仅用于netspace） |
| onhelp | 当帮助键（通常是F1）被按下时触发 |
| onresizeend | 调整大小的进程结束时激活。通常是用户停止拖拽浏览器窗口边角时激活 |
| onresizestart | 调整大小的进程开始时激活。通常是用户开始拖拽浏览器窗口边角时激活 |
| onscroll | 滚动条往任意方向滚动时触发 |

## 5.1 window.onerror

浏览器脚本发生错误时，会触发window对象的error事件。我们可以通过window.onerror属性对该事件指定回调函数。

```text/x-java
window.onerror = function (message, filename, lineno, colno, error) {
   console.log("出错了！--> %s", error.stack);
};
```

_error事件的回调函数，一共可以有五个参数\*_**，它们的含义依次如下。**

*   **出错信息**
    
*   **出错脚本的网址**
    
*   **行号**
    
*   **列号**
    
*   **错误对象**
    

**老式浏览器只支持前三个参数。**

需要注意的是，如果脚本网址与网页网址不在同一个域（比如使用了CDN），浏览器根本不会提供详细的出错信息，只会提示出错，错误类型是“Script error.”，行号为0，其他信息都没有。这是浏览器防止向外部脚本泄漏信息。一个解决方法是在脚本所在的服务器，设置Access-Control-Allow-Origin的HTTP头信息。

```text/x-java
Access-Control-Allow-Origin:*
```

然后，在网页的script标签中设置crossorigin属性。

```text/x-java
<script crossorigin="anonymous" src="//example.com/file.js"></script>
```

上面代码的crossorigin="anonymous"表示，读取文件不需要身份信息，即不需要cookie和HTTP认证信息。如果设为crossorigin="use-credentials"，就表示浏览器会上传cookie和HTTP认证信息，同时还需要服务器端打开HTTP头信息Access-Control-Allow-Credentials。

**并不是所有的错误，都会触发JavaScript的error事件（即让JavaScript报错），只限于以下三类事件：**

1.  JavaScript语言错误
    
2.  JavaScript脚本文件不存在
    
3.  图像文件不存在
    

以下两类事件不会触发JavaScript的error事件。

1.  CSS文件不存在
    
2.  iframe文件不存在
    

---

