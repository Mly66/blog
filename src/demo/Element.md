---
title: Element UI
icon: lock
order: 5
category:
  - 使用指南
tag:
  - Vue.js
  - UI组件库
  - 前端开发
author: Mr.Mly
date: 2024-11-05
footer: Mly
copyright: Mly
---

# Element UI 完全指南

Element UI 是一款基于 Vue.js 的桌面端组件库，由饿了么前端团队开发和维护。它提供了一套完整的企业级 UI 组件，帮助开发者快速构建美观、高效的中后台应用。

## 1. 丰富的组件库

Element UI 提供了 **60+ 高质量组件**，覆盖了中后台开发的所有常见场景：

| 组件类型 | 常用组件 | 应用场景 |
|---------|---------|---------|
| **基础组件** | Button, Icon, Layout | 页面布局与基础交互 |
| **表单组件** | Form, Input, Select, DatePicker | 数据录入与验证 |
| **数据展示** | Table, Tree, Tag, Badge | 数据呈现与状态标识 |
| **反馈组件** | Message, MessageBox, Notification | 用户操作反馈 |
| **导航组件** | Menu, Tabs, Breadcrumb | 页面导航与路由 |
| **高级组件** | Dialog, Drawer, Popover | 复杂交互场景 |

```vue
<!-- 表单示例：完整的验证与提交 -->
<template>
  <el-form :model="form" :rules="rules" ref="userForm" label-width="80px">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: { username: '', email: '' },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.userForm.validate(valid => {
        if (valid) alert('验证通过！')
      })
    },
    resetForm() {
      this.$refs.userForm.resetFields()
    }
  }
}
</script>
```

## 2. 高度可定制性

Element UI 组件具有高度可定制性，支持多种自定义方式：

### 主题定制

通过 SCSS 变量覆盖默认主题色：

```scss
// 自定义主题变量
$--color-primary: #67C23A;
$--font-path: '~element-ui/lib/theme-chalk/fonts';

@import "~element-ui/packages/theme-chalk/src/index";
```

### 按需引入

使用 `babel-plugin-component` 实现按需加载，减小打包体积：

```javascript
// babel.config.js
module.exports = {
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}

// 按需引入组件
import { Button, Select } from 'element-ui'
Vue.use(Button)
Vue.use(Select)
```

## 3. 响应式设计

Element UI 的所有组件都基于响应式设计，内置了 **24 栅格系统**：

```vue
<!-- 响应式布局示例 -->
<el-row :gutter="20">
  <el-col :xs="24" :sm="12" :md="8" :lg="6">
    <div class="grid-content bg-purple"></div>
  </el-col>
  <el-col :xs="24" :sm="12" :md="8" :lg="6">
    <div class="grid-content bg-purple"></div>
  </el-col>
  <el-col :xs="24" :sm="12" :md="8" :lg="6">
    <div class="grid-content bg-purple"></div>
  </el-col>
  <el-col :xs="24" :sm="12" :md="8" :lg="6">
    <div class="grid-content bg-purple"></div>
  </el-col>
</el-row>
```

| 断点 | 媒体查询 | 适用设备 |
|-----|---------|---------|
| `xs` | `<768px` | 超小屏幕（手机） |
| `sm` | `≥768px` | 小屏幕（平板） |
| `md` | `≥992px` | 中等屏幕（桌面） |
| `lg` | `≥1200px` | 大屏幕（宽屏） |

## 4. 易于使用和良好的文档支持

Element UI 的组件封装简单，开发人员可以轻松地在 Vue.js 应用程序中使用。同时，Element UI 有着详尽的文档和活跃的社区：

- **官方文档**：[https://element.eleme.io](https://element.eleme.io) - 提供完整的 API 文档和交互式示例
- **GitHub 社区**：超过 **54k+ Stars**，活跃的 Issue 讨论和 PR 贡献
- **生态完善**：
  - `element-admin` - 后台管理模板
  - `vue-element-admin` - 集成权限管理的完整解决方案
  - `Figma/Sketch` 设计资源

## 5. 最佳实践

### 表单验证技巧

```javascript
// 自定义验证器
const validateAge = (rule, value, callback) => {
  if (!value) return callback(new Error('年龄不能为空'))
  if (value < 0 || value > 150) return callback(new Error('年龄不合理'))
  callback()
}

// 异步验证（如检查用户名是否存在）
const validateUsername = async (rule, value, callback) => {
  const exists = await checkUsernameExists(value)
  exists ? callback(new Error('用户名已存在')) : callback()
}
```

### 表格数据处理

```vue
<el-table :data="tableData" border style="width: 100%">
  <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
  <el-table-column prop="name" label="姓名" width="180"></el-table-column>
  <el-table-column prop="address" label="地址"></el-table-column>
  <el-table-column label="操作" width="120">
    <template slot-scope="scope">
      <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
      <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
    </template>
  </el-table-column>
</el-table>
```

---

> **总结**：Element UI 以其完善的组件库、灵活的定制能力和优秀的开发体验，成为 Vue 2 生态中最受欢迎的桌面端 UI 框架之一。对于中后台项目而言，选择 Element UI 能大幅提升开发效率和代码质量。
