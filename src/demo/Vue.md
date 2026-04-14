---
title: Vue.js
icon: fab fa-markdown
order: 1
category:
  - 使用指南
tag:
  - Vue.js
  - JavaScript
  - 前端框架
author: Mr.Mly
date: 2024-11-01
footer: Mly
copyright: Mly
---

# Vue.js 完全指南

Vue.js 是一个渐进式 JavaScript 框架，专为构建用户界面而设计。由尤雨溪创建，以其优雅的设计、灵活的架构和出色的开发体验，成为最受欢迎的前端框架之一。

## 1. 响应式系统与组件化

### 响应式原理

Vue.js 的核心特性是其响应式系统，能够自动追踪数据的变化并更新 DOM：

```vue
<script setup>
import { ref, reactive, computed, watch } from 'vue'

// ref - 基本数据类型响应式
const count = ref(0)

// reactive - 对象类型响应式
const user = reactive({
  name: '张三',
  age: 25,
  email: 'zhangsan@example.com'
})

// computed - 计算属性（带缓存）
const isAdult = computed(() => user.age >= 18)

// watch - 监听器
watch(count, (newVal, oldVal) => {
  console.log(`计数从 ${oldVal} 变为 ${newVal}`)
})

function increment() {
  count.value++
}
</script>

<template>
  <div>
    <p>当前计数: {{ count }}</p>
    <p>用户: {{ user.name }} ({{ isAdult ? '成年' : '未成年' }})</p>
    <button @click="increment">+1</button>
  </div>
</template>
```

### 组件化架构

```vue
<!-- 父组件 -->
<script setup>
import { ref } from 'vue'
import TodoItem from './TodoItem.vue'

const todos = ref([
  { id: 1, text: '学习 Vue 3', done: true },
  { id: 2, text: '构建项目', done: false }
])

function addTodo(text) {
  todos.value.push({ id: Date.now(), text, done: false })
}

function toggleTodo(id) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) todo.done = !todo.done
}
</script>

<template>
  <div>
    <h2>待办事项</h2>
    <TodoItem 
      v-for="todo in todos" 
      :key="todo.id"
      :todo="todo"
      @toggle="toggleTodo"
    />
  </div>
</template>
```

```vue
<!-- 子组件 TodoItem.vue -->
<script setup>
defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle'])
</script>

<template>
  <li :class="{ done: todo.done }" @click="emit('toggle', todo.id)">
    {{ todo.text }}
  </li>
</template>

<style scoped>
.done {
  text-decoration: line-through;
  color: #999;
}
</style>
```

## 2. 易用性与渐进式集成

### 渐进式特性

Vue.js 可以从简单到复杂逐步应用：

| 使用方式 | 场景 | 复杂度 |
|---------|------|--------|
| **CDN 引入** | 简单页面增强 | ⭐ |
| **单页应用 (SPA)** | 中大型项目 | ⭐⭐⭐ |
| **SSR/Nuxt** | SEO 友好应用 | ⭐⭐⭐⭐ |
| **全栈框架** | 企业级项目 | ⭐⭐⭐⭐⭐ |

```html
<!-- 最简单的 Vue 使用（CDN） -->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">
  <p>{{ message }}</p>
  <button @click="reverseMessage">反转</button>
</div>

<script>
Vue.createApp({
  data() {
    return { message: 'Hello Vue!' }
  },
  methods: {
    reverseMessage() {
      this.message = this.message.split('').reverse().join('')
    }
  }
}).mount('#app')
</script>
```

### 生命周期钩子

```vue
<script setup>
import { onMounted, onUpdated, onUnmounted } from 'vue'

// 组件挂载后
onMounted(() => {
  console.log('组件已挂载')
  // 适合：DOM 操作、发起请求、添加事件监听
})

// 组件更新后
onUpdated(() => {
  console.log('组件已更新')
})

// 组件卸载前
onUnmounted(() => {
  console.log('组件即将卸载')
  // 适合：清理定时器、移除事件监听
})
</script>
```

## 3. 核心指令与语法

### 常用指令速查

| 指令 | 功能 | 示例 |
|------|------|------|
| `v-bind` / `:` | 动态绑定属性 | `<img :src="imageUrl">` |
| `v-on` / `@` | 事件监听 | `<button @click="handleClick">` |
| `v-model` | 双向数据绑定 | `<input v-model="name">` |
| `v-if` / `v-show` | 条件渲染 | `<p v-if="isVisible">显示</p>` |
| `v-for` | 列表渲染 | `<li v-for="item in list" :key="item.id">` |
| `v-html` | 渲染 HTML | `<div v-html="content"></div>` |

### 条件与列表渲染

```vue
<template>
  <div>
    <!-- 条件渲染 -->
    <div v-if="user.role === 'admin'">管理员面板</div>
    <div v-else-if="user.role === 'editor'">编辑器</div>
    <div v-else>普通用户</div>
    
    <!-- 列表渲染 -->
    <ul>
      <li 
        v-for="(item, index) in filteredItems" 
        :key="item.id"
        :class="{ active: index === currentIndex }"
      >
        {{ index + 1 }}. {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const items = ref([
  { id: 1, name: '项目 A', status: 'active' },
  { id: 2, name: '项目 B', status: 'completed' }
])

const currentIndex = ref(0)
const filteredItems = computed(() => 
  items.value.filter(item => item.status === 'active')
)
</script>
```

## 4. 性能优化

### 虚拟 DOM 优化

Vue 3 的虚拟 DOM 采用了编译时优化：

```vue
<!-- 静态提升：Vue 3 自动优化 -->
<template>
  <div class="header">     <!-- 静态节点，只创建一次 -->
    <h1>标题</h1>           <!-- 静态节点，只创建一次 -->
  </div>
  <p>{{ dynamicText }}</p> <!-- 动态节点，正常更新 -->
</template>
```

### 异步组件与懒加载

```javascript
// 路由懒加载
const routes = [
  {
    path: '/dashboard',
    component: () => import('./views/Dashboard.vue')  // 按需加载
  }
]

// 异步组件
import { defineAsyncComponent } from 'vue'

const AsyncModal = defineAsyncComponent(() =>
  import('./components/Modal.vue')
)
```

### keep-alive 缓存

```vue
<template>
  <keep-alive :include="['Home', 'Dashboard']" :max="10">
    <component :is="currentComponent" />
  </keep-alive>
</template>
```

## 5. 生态系统

Vue.js 拥有完善的生态系统：

| 工具/库 | 功能 | 官方链接 |
|---------|------|---------|
| **Vue Router** | 路由管理 | [router.vuejs.org](https://router.vuejs.org) |
| **Pinia** | 状态管理 | [pinia.vuejs.org](https://pinia.vuejs.org) |
| **Vite** | 构建工具 | [vitejs.dev](https://vitejs.dev) |
| **VueUse** | 组合式 API 工具集 | [vueuse.org](https://vueuse.org) |
| **Nuxt** | 全栈框架 | [nuxt.com](https://nuxt.com) |

### Pinia 状态管理示例

```javascript
// stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token')
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.token,
    userName: (state) => state.user?.name || '未登录'
  },
  
  actions: {
    async login(credentials) {
      const res = await api.login(credentials)
      this.token = res.token
      this.user = res.user
      localStorage.setItem('token', res.token)
    },
    
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    }
  }
})
```

---

> **总结**：Vue.js 以其现代化的设计理念、高效的开发体验和强大的生态系统，成为前端开发中的热门选择。无论是小型项目还是大型企业应用，Vue 都能提供优雅的解决方案。
