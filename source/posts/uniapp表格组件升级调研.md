---
title: uniapp表格组件升级调研
date: 2026-02-06T05:13:31.132Z
categories:
  - 小程序相关
tags:
  - 微信小程序
  - uniapp组件
---
# uniapp表格组件升级调研

# 📝前言

随着项目需求的不断升级，目前使用的表格组件（[https://ext.dcloud.net.cn/plugin?id=22414](https://ext.dcloud.net.cn/plugin?id=22414)）已逐渐不能满足复杂的功能要求。当前组件主要存在以下问题：

1.  **功能局限**：仅提供基础表格展示，缺乏合并单元格、表头合并、自定义单元格插槽等高级功能
    
2.  **技术落后**：仅支持 Vue2，无法兼容以后新项目的 Vue3 技术栈
    
3.  **维护混乱**：各项目组为满足需求，直接修改组件源码，导致版本不统一、维护困难
    

为提升开发效率、保证代码一致性，现对现有表格组件需求进行全面调研，寻找符合以下要求的替代方案：

# 📋需求清单

1.  ✅支持vue2和Vue3
    
2.  ✅支持微信小程序
    
3.  ✅支持合并单元格，表头合并功能
    
4.  ✅固定列
    
5.  ✅支持自定义渲染表格功能
    

# 🔍组件对比

翻遍插件市场和github找到俩个相对比较接近需求的组件

## sl-table

[https://ext.dcloud.net.cn/plugin?id=22380](https://ext.dcloud.net.cn/plugin?id=22380)

## no-bad-table

[https://ext.dcloud.net.cn/plugin?id=622](https://ext.dcloud.net.cn/plugin?id=622)（[https://github.com/MTTTM/uniapp-elemnt-table](https://github.com/MTTTM/uniapp-elemnt-table)）

## 📊 组件对比表

| 对比项 | sl-table | no-bad-table |
| --- | --- | --- |
| **Vue2/Vue3支持** | ✅ 明确支持双版本 | ⚠️ 主要支持Vue2 |
| **微信小程序** | ✅ 支持 | ✅ 支持 |
| **合并单元格、表头** | ✅ 支持 | [进度: 50%]支持单元格合并、表头暂不支持 |
| **固定左右列** | ✅ 支持 | ✅ 支持 |
| **自定义渲染** | [进度: 50%] 小程序目前在组件固定写死提供了俩个（customSlot、customSlot2） | [进度: 50%]仅支持给单元格或者行列设置样式，不支持插槽 |
| **功能丰富度** | ✅ 排序/筛选/分页/虚拟滚动 | ⚠️ 基础功能 |
| **其他** | ✅ 文档比较全面，持续更新 | ⚠️ 19年后没有更新 |

# 🎯总结

sl-table相对功能丰富全面，符合当前项目应用，组件也有持续更新，未来小程序升级V3也不会受影响

# 🚀快速使用示例

### 安装方式

官方下载对应版本的插件（[https://ext.dcloud.net.cn/plugin?id=22380](https://ext.dcloud.net.cn/plugin?id=22380)）放在uni-modules文件夹下

[请至钉钉文档查看附件《sl-table\_1.5.5.zip》](https://alidocs.dingtalk.com/i/nodes/N7dx2rn0JbZQ0AG1syQ7PzZ2JMGjLRb3?doc_type=wiki_doc&iframeQuery=anchorId%3DX02mkai8mlpfjb1hsrk60m)

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/4j6OJ5j6mb07Jq3p/img/ef4a3faf-4b37-48f0-9f28-9b300cdf6840.png)

### ⚡Vue2使用案例

```vue
<!-- Vue2 使用示例（兼容微信小程序） -->
<template>
  <view class="example-container">
    <view class="example-title">Vue2兼容示例</view>
    
    <!-- 基础表格 -->
    <view class="section">
      <view class="section-title">基础表格</view>
      <sl-table 
        :columns="basicColumns" 
        :tableData="basicData"
        @cell-click="handleCellClick"
      />
    </view>

    <!-- 固定列表格 -->
    <view class="section">
      <view class="section-title">固定列表格（支持横向滚动）</view>
      <sl-table 
        :columns="fixedColumns" 
        :tableData="fixedData"
        @cell-click="handleCellClick"
      />
    </view>

    <!-- 合并单元格表格 -->
    <view class="section">
      <view class="section-title">合并单元格表格</view>
      <sl-table 
        :columns="mergeColumns" 
        :tableData="mergeData"
        @cell-click="handleCellClick"
      >
        <!-- Vue2插槽写法（兼容微信小程序） -->
        <template slot="customSlot" slot-scope="{ row }">
          <view class="custom-slot">
            <text class="highlight">{{ row.customField }}</text>
          </view>
        </template>
        <template slot="customSlot2" slot-scope="{ row }">
          <view class="custom-slot">
            <image class="logo" src="/static/changeHeat/add.png"></image>
          <text>{{ row.customField }}</text>
          </view>
        </template>
      </sl-table>
    </view>

    <!-- 上拉加载表格 -->
    <view class="section">
      <view class="section-title">上拉加载表格</view>
      <sl-table 
        :columns="basicColumns" 
        :tableData="loadMoreData"
        :enableLoadMore="true"
        @load-more="handleLoadMore"
        @cell-click="handleCellClick"
      />
    </view>

    <!-- 空数据插槽 -->
    <view class="section">
      <view class="section-title">空数据插槽</view>
      <sl-table 
        :columns="basicColumns" 
        :tableData="[]"
        @cell-click="handleCellClick"
      >
        <template slot="empty">
          <view class="empty-container">
            <text class="empty-icon">📭</text>
            <text class="empty-text">暂无数据，请稍后再试</text>
          </view>
        </template>
      </sl-table>
    </view>
  </view>
</template>

<script>
import SlTable from "@/uni_modules/sl-table/sl-table.vue";
export default {
  name: 'Vue2Example',
  components: {SlTable},
  data() {
    return {
      // 基础表格配置
      basicColumns: [
        {
          label: '姓名',
          prop: 'name',
          width: '30%'
        },
        {
          label: '年龄',
          prop: 'age',
          width: '20%'
        },
        {
          label: '职位',
          prop: 'position',
          width: '25%'
        },
        {
          label: '部门',
          prop: 'department',
          width: '25%'
        }
      ],
      basicData: [
        { name: '张三', age: 28, position: '前端工程师', department: '技术部' },
        { name: '李四', age: 32, position: '后端工程师', department: '技术部' },
        { name: '王五', age: 29, position: '产品经理', department: '产品部' },
        { name: '赵六', age: 35, position: '设计师', department: '设计部' }
      ],

      // 固定列表格配置
      fixedColumns: [
        {
          label: '姓名',
          prop: 'name',
          width: '100px',
          fixed: 'left'
        },
        {
          label: '年龄',
          prop: 'age',
          width: '80px'
        },
        {
          label: '职位',
          prop: 'position',
          width: '150px'
        },
        {
          label: '部门',
          prop: 'department',
          width: '120px'
        },
        {
          label: '邮箱',
          prop: 'email',
          width: '200px'
        },
        {
          label: '操作',
          prop: 'action',
          width: '100px',
          fixed: 'right'
        }
      ],
      fixedData: [
        { name: '张三', age: 28, position: '前端工程师', department: '技术部', email: 'zhangsan@example.com', action: '编辑' },
        { name: '李四', age: 32, position: '后端工程师', department: '技术部', email: 'lisi@example.com', action: '编辑' },
        { name: '王五', age: 29, position: '产品经理', department: '产品部', email: 'wangwu@example.com', action: '编辑' }
      ],

      // 合并表格配置
      mergeColumns: [
        {
          label: '基本信息',
          width: '40%',
          children: [
            { label: '姓名', prop: 'name', width: '50%' },
            { label: '年龄', prop: 'age', width: '50%' }
          ]
        },
        {
          label: '工作信息',
          width: '60%', 
          children: [
            { label: '职位', prop: 'position', width: '50%' },
            { label: '自定义', prop: 'customField', slot: 'customSlot', width: '50%' },
            { label: '测试', slot: 'customSlot2',prop:'test',width: '50%' }
          ]
        }
      ],
      mergeData: [
        { 
          name: '张三', 
          age: {
            value: '28岁',
            rowspan: 2,
            cellStyle: {
              backgroundColor: '#e8f4fd',
              color: '#1890ff'
            }
          },
          position: '前端工程师',
          customField: '优秀员工',
          test:'测试'
        },
        { 
          name: '李四',
          age: {
            display: false  // 被合并的单元格
          },
          position: '后端工程师',
          customField: '技术专家',
          test:'测试'
        },
        {
          name: {
            value: '王五',
            rowspan: 3,
            cellStyle: {
              backgroundColor: '#fff2e8',
              color: '#fa8c16',
              fontWeight: 'bold'
            }
          },
          age: '29岁',
          position: '产品经理',
          customField: '产品达人',
          test:'测试'
        },
        {
          name: {
            display: false  // 这行的姓名应该不显示
          },
          // 第二行，name已被上一行占用，所以age显示在第二行
          age: {
            value: '31岁',  // 第二行的年龄
            cellStyle: {
              backgroundColor: '#fafafa',
              color: '#666'
            }
          },
          position: '项目经理', // 如果需要，可以是不同职位
          customField: '项目专家',
          test:'测试2'
        },
        {
          name: {
            display: false  // 这行的姓名应该不显示
          },
          age: {
            value: '35岁',  // 第二行的年龄
            cellStyle: {
              backgroundColor: '#fafafa',
              color: '#666'
            }
          },
          position: '项目经理', // 如果需要，可以是不同职位
          customField: '项目专家',
          test:'测试2'
        },
      ],

      // 上拉加载数据
      loadMoreData: [
        { name: '张三', age: 28, position: '前端工程师', department: '技术部' },
        { name: '李四', age: 32, position: '后端工程师', department: '技术部' },
        { name: '王五', age: 29, position: '产品经理', department: '产品部' }
      ],
      loadMorePage: 1
    }
  },
  methods: {
    handleCellClick(event) {
      console.log('Vue2 - 单元格点击事件:', event)
      uni.showToast({
        title: `点击了第${event.rowIndex + 1}行第${event.colIndex + 1}列`,
        icon: 'none'
      })
    },
   handleLoadMore({ currentPage, done }) {
      console.log('Vue2 - 上拉加载，当前页码:', currentPage)
      // 模拟异步加载数据
      setTimeout(() => {
        const newData = [
          { name: `新用户${currentPage}-1`, age: 25, position: '测试工程师', department: '技术部' },
          { name: `新用户${currentPage}-2`, age: 27, position: 'UI设计师', department: '设计部' }
        ]
        this.loadMoreData.push(...newData)
        // 模拟加载到第3页后结束
        const isLastPage = currentPage >= 3
        done(isLastPage)
      }, 1000)
    }
  },
  
  // 微信小程序兼容说明：
  // 1. slot用法：使用 slot="slotName" slot-scope="{ row, cell }" 而不是 #slotName
  // 2. 数据绑定：微信小程序中使用 {{}} 语法
  // 3. 事件绑定：微信小程序中使用 bind:eventName 语法
  // 4. 样式绑定：组件内部已优化，:style="method()" 改为计算属性
  // 5. 动态插槽：组件内部已优化，避免动态插槽名问题
  // 6. 组件注册：微信小程序中使用 Page() 函数而不是 export default
}
</script>

<style lang="scss" scoped>
.example-container {
  padding: 20px;
  
  .example-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #1890ff;
  }
  
  .section {
    margin-bottom: 30px;
    
    .section-title {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 10px;
      color: #333;
    }
  }
  
  .custom-slot {
    display: flex;
    align-items: center;
    justify-content: center;
    
    .highlight {
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      font-weight: bold;
    }
  }

  .empty-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;

    .empty-icon {
      font-size: 48px;
      margin-bottom: 10px;
    }

    .empty-text {
      font-size: 14px;
      color: #999;
    }
  }
}
.logo{
  width: 20rpx;
  height: 20rpx;
}
</style>
```

### ⚡Vue3使用案例

```vue
<!-- Vue3 使用示例 -->
<template>
  <view class="example-container">
    <view class="example-title">Vue3兼容示例</view>
    
    <!-- 基础表格 -->
    <view class="section">
      <view class="section-title">基础表格</view>
      <sl-table 
        :columns="basicColumns" 
        :tableData="basicData"
        @cell-click="handleCellClick"
      />
    </view>

    <!-- 固定列表格 -->
    <view class="section">
      <view class="section-title">固定列表格（支持横向滚动）</view>
      <sl-table 
        :columns="fixedColumns" 
        :tableData="fixedData"
        @cell-click="handleCellClick"
      />
    </view>

    <!-- 合并单元格表格 -->
    <view class="section">
      <view class="section-title">合并单元格表格</view>
      <sl-table 
        :columns="mergeColumns" 
        :tableData="mergeData"
        @cell-click="handleCellClick"
      >
        <!-- Vue3风格的自定义插槽 -->
        <template #customSlot="{ row, cell }">
          <view class="custom-slot">
            <text class="highlight">{{ row.customField }}</text>
          </view>
        </template>
      </sl-table>
    </view>

    <!-- 上拉加载表格 -->
    <view class="section">
      <view class="section-title">上拉加载表格</view>
      <sl-table 
        :columns="basicColumns" 
        :tableData="loadMoreData"
        :enableLoadMore="true"
        @load-more="handleLoadMore"
        @cell-click="handleCellClick"
      />
    </view>

    <!-- 空数据插槽 -->
    <view class="section">
      <view class="section-title">空数据插槽</view>
      <sl-table 
        :columns="basicColumns" 
        :tableData="[]"
        @cell-click="handleCellClick"
      >
        <template #empty>
          <view class="empty-container">
            <text class="empty-icon">📭</text>
            <text class="empty-text">暂无数据，请稍后再试</text>
          </view>
        </template>
      </sl-table>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Vue3Example',
  // Vue3的emits声明
  emits: ['cell-clicked'],
  data() {
    return {
      // 基础表格配置
      basicColumns: [
        {
          label: '姓名',
          prop: 'name',
          width: '30%'
        },
        {
          label: '年龄',
          prop: 'age',
          width: '20%'
        },
        {
          label: '职位',
          prop: 'position',
          width: '25%'
        },
        {
          label: '部门',
          prop: 'department',
          width: '25%'
        }
      ],
      basicData: [
        { name: '张三', age: 28, position: '前端工程师', department: '技术部' },
        { name: '李四', age: 32, position: '后端工程师', department: '技术部' },
        { name: '王五', age: 29, position: '产品经理', department: '产品部' },
        { name: '赵六', age: 35, position: '设计师', department: '设计部' }
      ],

      // 固定列表格配置
      fixedColumns: [
        {
          label: '姓名',
          prop: 'name',
          width: '100px',
          fixed: 'left'
        },
        {
          label: '年龄',
          prop: 'age',
          width: '80px'
        },
        {
          label: '职位',
          prop: 'position',
          width: '150px'
        },
        {
          label: '部门',
          prop: 'department',
          width: '120px'
        },
        {
          label: '邮箱',
          prop: 'email',
          width: '200px'
        },
        {
          label: '操作',
          prop: 'action',
          width: '100px',
          fixed: 'right'
        }
      ],
      fixedData: [
        { name: '张三', age: 28, position: '前端工程师', department: '技术部', email: 'zhangsan@example.com', action: '编辑' },
        { name: '李四', age: 32, position: '后端工程师', department: '技术部', email: 'lisi@example.com', action: '编辑' },
        { name: '王五', age: 29, position: '产品经理', department: '产品部', email: 'wangwu@example.com', action: '编辑' }
      ],

      // 合并表格配置
      mergeColumns: [
        {
          label: '基本信息',
          width: '40%',
          children: [
            { label: '姓名', prop: 'name', width: '50%' },
            { label: '年龄', prop: 'age', width: '50%' }
          ]
        },
        {
          label: '工作信息',
          width: '60%', 
          children: [
            { label: '职位', prop: 'position', width: '50%' },
            { label: '自定义', prop: 'customField', slot: 'customSlot', width: '50%' }
          ]
        }
      ],
      mergeData: [
        { 
          name: '张三', 
          age: {
            value: '28岁',
            rowspan: 2,
            cellStyle: {
              backgroundColor: '#e8f4fd',
              color: '#1890ff'
            }
          },
          position: '前端工程师',
          customField: '优秀员工'
        },
        { 
          name: '李四',
          age: {
            display: false  // 被合并的单元格
          },
          position: '后端工程师',
          customField: '技术专家'
        },
        {
          name: {
            value: '王五',
            cellStyle: {
              backgroundColor: '#fff2e8',
              color: '#fa8c16',
              fontWeight: 'bold'
            }
          },
          age: '29岁',
          position: '产品经理',
          customField: '产品达人'
        }
      ],

      // 上拉加载数据
      loadMoreData: [
        { name: '张三', age: 28, position: '前端工程师', department: '技术部' },
        { name: '李四', age: 32, position: '后端工程师', department: '技术部' },
        { name: '王五', age: 29, position: '产品经理', department: '产品部' }
      ],
      loadMorePage: 1
    }
  },
  methods: {
    handleCellClick(event) {
      console.log('Vue3 - 单元格点击事件:', event)
      uni.showToast({
        title: `点击了第${event.rowIndex + 1}行第${event.colIndex + 1}列`,
        icon: 'none'
      })
    },
    handleLoadMore({ pageNum, done }) {
      console.log('Vue3 - 上拉加载，当前页码:', pageNum)
      // 模拟异步加载数据
      setTimeout(() => {
        const newData = [
          { name: `新用户${pageNum}-1`, age: 25, position: '测试工程师', department: '技术部' },
          { name: `新用户${pageNum}-2`, age: 27, position: 'UI设计师', department: '设计部' }
        ]
        this.loadMoreData.push(...newData)
        // 模拟加载到第3页后结束
        const isLastPage = pageNum >= 3
        done(isLastPage)
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.example-container {
  padding: 20px;
  
  .example-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #52c41a;
  }
  
  .section {
    margin-bottom: 30px;
    
    .section-title {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 10px;
      color: #333;
    }
  }
  
  .custom-slot {
    display: flex;
    align-items: center;
    justify-content: center;
    
    .highlight {
      background: linear-gradient(45deg, #52c41a, #1890ff);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      font-weight: bold;
    }
  }

  .empty-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;

    .empty-icon {
      font-size: 48px;
      margin-bottom: 10px;
    }

    .empty-text {
      font-size: 14px;
      color: #999;
    }
  }
}
</style>
```

### [灯泡] 注意

*   **分页加载更多功能需要将容器设定固定值，当内容超出高度才会触发上拉加载更多**
    

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/4j6OJ5j6mb07Jq3p/img/87b14df0-c624-4be5-a493-38f036c13271.png)

*   **loadMore事件返回的参数中示例文档有误，需要解构的话返回值应该叫currentPage非pageNum**
    

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/4j6OJ5j6mb07Jq3p/img/7e61652f-f451-4db3-b114-f3ad4069f33d.png)

```javascript
handleLoadMore({ currentPage, done }) {
      console.log('Vue2 - 上拉加载，当前页码:', currentPage)
      // 模拟异步加载数据
      setTimeout(() => {
        const newData = [
          { name: `新用户${currentPage}-1`, age: 25, position: '测试工程师', department: '技术部' },
          { name: `新用户${currentPage}-2`, age: 27, position: 'UI设计师', department: '设计部' }
        ]
        this.loadMoreData.push(...newData)
        // 模拟加载到第3页后结束
        const isLastPage = currentPage >= 3
        done(isLastPage)
      }, 1000)
    }
```

*   **合并单元格中需要合并的表格需要使用display：false来进行占位**
    

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/4j6OJ5j6mb07Jq3p/img/289be17d-8ad7-4f1e-9b17-3443dbca9086.png)

```javascript
mergeData: [
  { 
    name: '张三', 
    age: {
      value: '28岁',
      rowspan: 2,
      cellStyle: {
        backgroundColor: '#e8f4fd',
        color: '#1890ff'
      }
    },
    position: '前端工程师',
    customField: '优秀员工',
    test:'测试'
  },
  { 
    name: '李四',
    age: {
      display: false  // 被合并的单元格
    },
    position: '后端工程师',
    customField: '技术专家',
    test:'测试'
  },
  {
    name: {
      value: '王五',
      rowspan: 3,
      cellStyle: {
        backgroundColor: '#fff2e8',
        color: '#fa8c16',
        fontWeight: 'bold'
      }
    },
    age: '29岁',
    position: '产品经理',
    customField: '产品达人',
    test:'测试'
  },
  {
    name: {
      display: false  // 这行的姓名应该不显示
    },
    // 第二行，name已被上一行占用，所以age显示在第二行
    age: {
      value: '31岁',  // 第二行的年龄
      cellStyle: {
        backgroundColor: '#fafafa',
        color: '#666'
      }
    },
    position: '项目经理', // 如果需要，可以是不同职位
    customField: '项目专家',
    test:'测试2'
  },
  {
    name: {
      display: false  // 这行的姓名应该不显示
    },
    age: {
      value: '35岁',  // 第二行的年龄
      cellStyle: {
        backgroundColor: '#fafafa',
        color: '#666'
      }
    },
    position: '项目经理', // 如果需要，可以是不同职位
    customField: '项目专家',
    test:'测试2'
  },
],
```

*   **微信小程序不支持动态插槽，组件仅提供了俩个固定的插槽名字，如果有多个插槽要求，只能在组件内增加了**
    

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/4j6OJ5j6mb07Jq3p/img/8660999f-0f8f-41bd-814b-a157a1026b64.png)

### 📚 详细 API

详细 API 请参考组件官方文档
