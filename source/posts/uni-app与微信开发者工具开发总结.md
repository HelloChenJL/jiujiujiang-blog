---
title: uni-app与微信开发者工具开发总结
date: 2026-02-06T05:13:41.251Z
categories:
  - 小程序相关
tags:
  - 微信小程序
  - 工具
  - 配置
---
# uni-app与微信开发者工具开发总结

前言：微信开发者工具进行开发小程序 VS uni-app开发小程序

### 1.生命周期

**微信开发者工具**

*   组件的生命周期，指的是组自身的一些函数，在特定时间段被触发，其中，最重要的生命周期是：created，attached，detached
    

```DEFAULT_LANGUAGE

 全部生命周期函数：
created：在组件实例刚刚被创建时执行（此时还不可以调用this.setData）
attached：在组件实例进入页面节点树时执行(发请求获取初始数据)
ready：在组件在视图层布局完成后执行
moved：在组件实例被移动到节点树另一个位置时执行
detached：在组件实例被从页面节点树移除时执行(退出一个页面的时候会执行，适合做一些清理性质的工作)
error：每当组件方法抛出错误时执行

 
```

注意：组件生命周期写在组建的lifetimes节点中，写在外面的生命周期会被lifetimes中的生命周期覆盖

```DEFAULT_LANGUAGE

 component({
	lifetimes:{
	 created(){
	 	...
	 },
	 attached(){
	 	...
	 }
	}
})

 
```

*   组件所在页面的生命周期，指的是有的时候组件会依赖于页面状态的变化，就需要使用页面的生命周期，在自定义组件中组件所在页面的生命周期有3个，show、hide、resize
    

```DEFAULT_LANGUAGE

 show：组件所在的页面被展示时执行
hide：组件所在的页面被隐藏时执行
resize：组件所在的页面尺寸变化时执行

 
```

注意：组件在页面中生命周期写在组件的pageLifetimes节点中

```DEFAULT_LANGUAGE

 component({
	pageLifetimes：{
	 show(){
	 	...
	 },
	 hide(){
	 	...
	 }
	}，
	lifetimes:{
	 created(){
	 	...
	 },
	 attached(){
	 	...
	 }
	}
})

 
```

**uni-app**

*   在组件里面使用生命周期的时候使用vue的生命周期
    

如：beforeCreate，created，beforeMount，mounted…

*   在页面里面使用生命周期的时候用小程序的生命周期
    

如：onInit,onLoad,onShow,onReady…

*   在App.vue里面写的生命周期就是代表这整个应用的生命周期
    

如：onLaunch，onShow，onHide，onError..

*   详细请查看：[https://blog.csdn.net/qq\_41619796/article/details/122706754](https://blog.csdn.net/qq_41619796/article/details/122706754)
    

注意：在tabbar切换的时候不会触发onload函数，如果想在onload里面写方法可以使用onTabItemTap钩子，在组件中最好不要和页面的生命周期混用，所以在组件里面可以使用mounted钩子

```DEFAULT_LANGUAGE

 //生命周期
    onTabItemTap(){
      //调用的方法
        console.log("onload")
    },

 
```

### 2.组件传值

**微信开发者工具**

*   **父传子**
    
*   在子组件的properties定义属性
    
*   在父组件中通过标签属性来传递，若不传递则使用子组件value定义的默认值
    

```DEFAULT_LANGUAGE

 //子组件 childrenComp
properties：{
	isShow：{//属性名
		type:Boolean,
		value:false,//父组件不传值的时候显示的默认值
	}
}
//父组件通过标签进行传值
<children-comp isShow={{show}}></children-comp>

 
```

*   **子传父**
    
*   在子组件绑定事件
    

```DEFAULT_LANGUAGE

 //子组件定义一个事件通过triggerEvent进行传值
<view bindtap="chooseItem" data-index = "1"></view>
//JS
chooseItem(e){
	let index= e.currentTarget.dataset.
	this.triggerEvent('curChoosed',{
		index
	})
}
//父组件绑定该方法
<children-comp bind:curChoosed><children-comp>
//js获取传来的值
curChoosed(e){
	console.log(e.detail.index)
}

 
```

*   也可以在标签上通过data-xxx来绑定值，在该标签的事件上进行获取值
    

```DEFAULT_LANGUAGE

 //wxml 通过data-xxx绑定要传的值
<view data-wifiName="{{ssid}}" bindtap="enterPwd"></view>

//js 使用e.currentTarget.dataset.xxx获取绑定的值
enterPwd(e){
	console.log(e.currentTarget.dataset.wifiName)
}

 
```

*   文本框数据的双向绑定
    

```DEFAULT_LANGUAGE

 //wxml
<view>
  <input type="text" bindtap="getValue" value={{name}}/>
</view>
//js
getValue(e){
  console.log("获取绑定的值--->",e.detail.value)
}

 
```

**uni-app**

*   **父传子**
    
*   子组件通过props接受父组件传来的值
    

```DEFAULT_LANGUAGE

 父组件：
// 1. 引入子组件
import zi from '../../components/zi.vue'
// 2. 在components中对子组件进行注册
export default {
   components:{
    	zi
	} 
}
<!-- 以标签的形势载入; 通过数据绑定的形势进行传值 -->
<zi :userInfo="张三"></zi>

 
```
```DEFAULT_LANGUAGE

 子组件：
//1.通过props接收父组件中传过来的值
props:['userInfo']
<!-- 2.在标签中直接使用 -->
<view>{{userInfo}}</view>

 
```

*   **子传父**
    
*   使用emit，子组件通过事件来向父组件传值
    

```DEFAULT_LANGUAGE

 子组件：
<template>
	<view @click="send">
    	点击传值
    </view>
</template>
<script>
	export default{
        methods:{
            //点击事件
            send: function(){
                //向父组件传值
                this.$emit("sendData", "我是子")
            }
        }
    }
</script>

 
```
```DEFAULT_LANGUAGE

 父组件：
<template>
	<view>
    	<zi @sendData="getData"></zi>
   	</view>
</template>

<script>
    //1.导入子组件
	import zi from '../../components/zi.vue';
    //2.注册子组件
    export dufault {
        components: {
            zi
        },
        methods: {
            getData: function(res){
                console.log(res) //我是子
            }
        }
    }
</script>


 
```

### 3.项目一直编译中，不能成功启动

*   确保开发者工具-设置-安全中已经开启服务端口，使用Hbuilder需要配置微信开发者工具的安装路径，将开发者工具-本地设置的不校验合法域名、web-view…进行勾选。
    
*   将微信服务大厅项目使用开发工具进行启动的时候，一直显示正在编译…
    

原因：node版本太高（18.xx.xx）不匹配，下载对应版本的node，目前使用12.14.0(由于经常需要切换node版本，可以安装一个nvm，进行node版本切换)，

nvm注意，安装以后执行node -v 提示不是内部命令

解决：如果当前电脑已经下载了node，一定要将node都进行卸载和清除环境变量再进行nvm安装，如果还是这样检查nvm下载的node版本路径下面的内容是否是空的，是空的话去对应官网进行下载

前言：微信开发者工具进行开发小程序 VS uni-app开发小程序**微信开发者工具**注意：组件生命周期写在组建的lifetimes节点中，写在外面的生命周期会被lifetimes中的生命周期覆盖注意：组件在页面中生命周期写在组件的pageLifetimes节点中**uni-app**如：beforeCreate，created，beforeMount，mounted…如：onInit,onLoad,onShow,onReady…如：onLaunch，onShow，onHide，onError..注意：在tabbar切换的时候不会触发onload函数，如果想在onload里面写方法可以使用onTabItemTap钩子，在组件中最好不要和页面的生命周期混用，所以在组件里面可以使用mounted钩子**微信开发者工具uni-app**原因：node版本太高（18.xx.xx）不匹配，下载对应版本的node，目前使用12.14.0(由于经常需要切换node版本，可以安装一个nvm，进行node版本切换)，nvm注意，安装以后执行node -v 提示不是内部命令解决：如果当前电脑已经下载了node，一定要将node都进行卸载和清除环境变量再进行nvm安装，如果还是这样检查nvm下载的node版本路径下面的内容是否是空的，是空的话去对应官网进行下载  

  

---

