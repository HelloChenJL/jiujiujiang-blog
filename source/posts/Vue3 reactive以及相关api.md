---
title: Vue3 reactive以及相关api
date: 2026-02-06T05:12:08.201Z
categories:
  - Vue3新特性学习
tags:
  - Vue3
  - Vue
---
# Vue3 reactive以及相关api

# 1.reactive

reactive() 创建一个响应式代理对象，不同于ref()可以创建任意类型的数据，而reactive()只能是对象，会响应式的深层次解包任何属性，将其标注为响应式

响应式是**基于ES6的proxy**实现的[代理对象](https://so.csdn.net/so/search?q=%E4%BB%A3%E7%90%86%E5%AF%B9%E8%B1%A1&spm=1001.2101.3001.7020)，该proxy对象与原对象是不相等的；

```javascript
<script setup>
  import { reactive, onMounted } from 'vue'
  const baseObj = {job:'搬砖', love: '象棋'}
  const person = reactive(baseObj)

  onMounted(() => {
    console.log('----', baseObj === person) // false
  })

</script>
```

# 2.reactive创建对象、数组更新时候

*   创建对象时：不能直接将将新的对象赋值，这样会失去响应式，因为全部赋值破坏了代理指向，从而导致不是原来使用reactive()创建的对象了；需要一个一个属性的赋值；
    
    ```javascript
    <script setup>
    import { reactive } from 'vue'
      let person = reactive({
        job: '躺平',
        love: '跑步'
      })
      let per2 = reactive({
        job: '搬砖',
        love: '跑步'
      })
      const handleChangeJOb = () => {
        person = {}
        console.log('===', person) // {} ；值更新了，但是视图却没有更新
        per2.job = per2.job + '&' // '搬砖&' 值更新了，视图同样更新
        // 这样清空数据，才会让界面跟着同步更新
        // Object.keys(per2).forEach(itm => {
        //   per2[itm] = ''
        // })
        // console.log('=22=per2==', per2)
      }
    </script>
    
    ```
    
*   创建数组时：直接给响应式数组 **赋值为空数组\[\],页面不会更新**，需要将数组的**length赋值为0才可以更新视图**；此处与vue2中刚好相反
    

```javascript
<script setup>
  let myArr = reactive([
    { name: '张三', age: '26' },
    {name: '李四', age: '18'}
  ])

  const handleChangeArr = () => {
    // myArr = [] // 页面视图不更新,得到的是普通数组对象，
    // console.log('==myArr=', myArr) 
    myArr.length = 0 // 页面会同步更新，得到的是proxy代理对象
    console.log('==myArr=', myArr)
     myArr.push({ name: '马六', age: '16'})
    // 使用原生数组方法，进行数据操作时，同样可以更新视图，
    // 相比较vue2 中只重写了7中数组方法，要方便的多
  }
</script>

```

# 3.reactive() 使用时注意事项

```javascript
<script setup>
  // 尽量扁平化，避免多层嵌套
  let per1 = reactive({
    data: {
      name: '王五'
    }
  })
  // 建议如下：
  let perData = reactive({
    name: '王五'
  })

  // 若定义的对象有多层嵌套，需要使用ref 或者 toRefs 来保持响应式
  let pData = reactive({
    person: {
      name: '马超',
      job: '大将军'
    },
  })
  // 以下均可可以更新视图
  pData.person = {name: '关羽', job: '上将军'} 
  pData.person.name = '关羽' 
  const { person } = pData
  person.name = '关羽2'

  // 使用toRefs
  const personRef = toRefs(pData)
  console.log('=00==personRef==', personRef) // 视图更新数据变化

```

# 4、shallowReactive() 创建浅层的响应式

和 reactive()不同，这里没有深层级的转换：一个浅层响应式对象里只有根级别的属性是响应式的。属性的值会被原样存储和暴露，这也意味着值为 ref 的属性**不会**被自动解包了。

```javascript
const state = shallowReactive({
  foo: 1,
  nested: {
    bar: 2
  }
})

// 更改状态自身的属性是响应式的
state.foo++

// ...但下层嵌套对象不会被转为响应式
isReactive(state.nested) // false

// 不是响应式的
state.nested.bar++
```

# 5.isReactive()

isReactive 是用于 检查一个对象是否是由 reactive() 或 shallowReactive() 创建的代理。返回的是一个布尔值
