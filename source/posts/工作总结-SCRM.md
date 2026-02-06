---
title: 工作问题总结
date: 2026-02-06T05:15:55.389Z
categories:
  - 工作总结
tags:
  - Vue
  - Javascript
  - 报错
---
# 工作总结-SCRM

## 1.使用dayJs或者momentjs的时候想要给表单一个初始值，控制台报错（TypeError: date.locale is not a function）

```text/javascript
<a-date-picker
  showTime
  format="YYYY-MM-DD HH:mm"
  v-model:value="startTime"
/>
<a-date-picker
  showTime
  format="YYYY-MM-DD HH:mm"
  v-model:value="endTime"
/>
// 初始化时间
const endDate = dayjs()
.endOf("day")
.startOf("minute")
.format("YYYY-MM-DD HH:mm"); // 结束时间
const startDate = dayjs()
.subtract(7, "day")
.startOf("day")
.startOf("minute")
.format("YYYY-MM-DD HH:mm"); // 开始时间
 
let startTime = ref(startDate)
let endTime = ref(endDate)
这样写会报错，因为andt组件中picker绑定的时间不符合格式应该是dayjs 对象，不能将一个字符串直接赋值上去
正确写法需要进行转换一下
let startTime = ref(dayjs(startDate))
let endTime = ref(dayjs(endDate))
```

## 2.h5文件上传图片或视频

  

```text/x-java
uni.chooseImage({
  count: 1, // 最多可以选择的图片张数
  sourceType: ["album"], // 选择图片的来源，相册["camera"]-->相机
  success: (res) => {
  const filePath = res.tempFiles[0];//文件类型
  const fileUrl = res.tempFilePaths[0]//文件路径
  // 限制类型
  if (filePath.type == "image/jpeg" || filePath.type == "image/png") {
    // 处理图片逻辑
    this.uploadAttachments(fileUrl);//图片地址
  } else if (filePath.type == "video/mp4") {
    // 处理非图片逻辑
    this.uploadAttachments(fileUrl);
  } else {
    uni.showToast({
      title: "图片格式不正确请重新上传",
      icon: "none",
    });
  }
  },
});
uni.chooseVideo({
  count: 1,
  sourceType: ["camera"], // 选择视频的来源，相机
  maxDuration: 30,
  mediaType: ["video"],
  compressed: true,
  success: (res) => {
  // 判断视频是否超过10m
  if (res.size > 10 * 1024 * 1024) {
    uni.showToast({
      title: "视频过大，请重新选择或者拍摄",
      icon: "none",
    });
    return;
  }
  // 限制avi视频类型
  if (res.tempFile.type == "video/avi") {
    uni.showToast({
      title: "视频格式不支持，请重新选择",
      icon: "none",
    });
    return;
  }
  this.uploadAttachments(res.tempFilePath);
  },
  fail: (err) => {
  // 处理错误3
  uni.showToast({
    title: "视频录制失败",
    icon: "none",
  });
  },
});
```

## 3.在uniapp中在methods中使用防抖时候不能获取到this

```text/x-java
methods: {
      foo: debounce(() => {
          console.log(this) // undefined
      })
  }
正确写法：
methods: {
  foo: debounce(function(){
      console.log(this) // undefined
  })
}
```

官方文档也有给出解释，不应该使用箭头函数来定义methods函数，因为：箭头函数绑定了父级作用域的上下文，所以this将不会按照期望指向组件实例，

使用箭头函数，那么这个this就会是window了，因为箭头函数存在一个特性就是其中不存在this,会向上一层作用域中进行查找，其中上一层作用域必须为函数作用域或者是全局作用域。所以此时找到全局作用域，此时为window。（methods不是作用域，只是定义对象，继续往上找就是script标签，所以指向window）

## 4.在弹窗里面使用input输入框不能聚焦

在antd中有一个autoFocus属性，可以实现自动聚焦，他只会在页面首次加载的时候才能focus，尤其我们写在弹窗里面，弹窗会根据if来控制弹窗，会导致focus失效，可以使用组件实例手动调用focus。

```text/x-java
在onmounted直接调用也会失效，往上很多人说用nextTick，但是我在项目里面还是不可以，最后使用setTimeOut，并且的加上延迟的时间才可以。
setTimeout(() => {
  inputRef.value.focus();
}, 100);
```

## 5.在表单里面写一个自定义组件，在进行表单校验的时候会导致校验提前

```text/x-java
<GridFormItem label="客群群主" name="userIdList">
<UserTreeSelect
  ref="userTreeRef"
  :orgTreeData="codeEmployeesTreeData"
  @getSelectedValue="getSelectedValue"
  :selectedNode="form.userIdList"
  :treeCheckable="true"
></UserTreeSelect>
</GridFormItem>
const getSelectedValue = (value:string[]) => {
form.value.userIdList = value;
};
想要在值change的时候进行校验，在getSelectedValue中我们会将值赋值给表单中的userIdList会触发校验，但是校验是异步的，还没等值更新，就已经触发校验了，会导致校验的是上一次的值，需要将校验变成同步的，等值更新后在校验。
const getSelectedValue = (value: string[]) => {
form.value.userIdList = value;
setTimeout(() => {
  formRef.value.getFormInstance().validate("userIdList");
});
};
```
---

