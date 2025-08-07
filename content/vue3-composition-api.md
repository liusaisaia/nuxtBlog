---
title: 'Vue 3 Composition API 实战指南'
description: '深入了解Vue 3 Composition API的核心概念和实际应用，包括响应式系统、生命周期钩子和组合式函数的最佳实践。'
date: '2024-01-18'
category: '前端开发'
tags: ['Vue3', 'Composition API', 'JavaScript', '响应式']
author: '前端开发者'
readingTime: '12'
---

# Vue 3 Composition API 实战指南

Vue 3 的 Composition API 是一个革命性的特性，它为我们提供了更灵活、更强大的组件逻辑组织方式。本文将深入探讨 Composition API 的核心概念和实际应用。

## 🎯 为什么选择 Composition API？

### Options API 的局限性

在 Vue 2 中，我们主要使用 Options API：

```javascript
export default {
  data() {
    return {
      count: 0,
      message: 'Hello'
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  computed: {
    doubleCount() {
      return this.count * 2
    }
  }
}
```

虽然 Options API 简单易懂，但在复杂组件中会遇到以下问题：

1. **逻辑分散**：相关逻辑被分散在不同的选项中
2. **复用困难**：逻辑复用需要使用 mixins，容易产生命名冲突
3. **类型推导**：TypeScript 支持不够完善

### Composition API 的优势

```vue
<script setup>
import { ref, computed } from 'vue'

// 响应式数据
const count = ref(0)
const message = ref('Hello')

// 计算属性
const doubleCount = computed(() => count.value * 2)

// 方法
const increment = () => {
  count.value++
}
</script>
```

Composition API 带来的好处：

- ✅ **逻辑聚合**：相关逻辑可以组织在一起
- ✅ **更好的复用**：通过组合式函数实现逻辑复用
- ✅ **类型安全**：完美的 TypeScript 支持
- ✅ **更好的性能**：更精确的依赖追踪

## 🔧 核心 API 详解

### 1. 响应式基础

#### ref() - 基本类型响应式

```javascript
import { ref } from 'vue'

// 创建响应式引用
const count = ref(0)
const message = ref('Hello Vue 3')

// 访问和修改值
console.log(count.value) // 0
count.value = 10

// 在模板中自动解包
// <template>{{ count }}</template>
```

#### reactive() - 对象响应式

```javascript
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  user: {
    name: 'John',
    age: 25
  }
})

// 直接访问属性
console.log(state.count) // 0
state.count++
state.user.name = 'Jane'
```

#### ref vs reactive 选择指南

```javascript
// ✅ 推荐：基本类型使用 ref
const count = ref(0)
const message = ref('')
const isLoading = ref(false)

// ✅ 推荐：对象使用 reactive
const user = reactive({
  name: '',
  email: '',
  profile: {
    avatar: '',
    bio: ''
  }
})

// ❌ 避免：对象使用 ref（需要 .value）
const user = ref({
  name: '',
  email: ''
})
console.log(user.value.name) // 需要 .value
```

### 2. 计算属性和侦听器

#### computed() - 计算属性

```javascript
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

// 只读计算属性
const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})

// 可写计算属性
const fullNameWritable = computed({
  get() {
    return `${firstName.value} ${lastName.value}`
  },
  set(value) {
    [firstName.value, lastName.value] = value.split(' ')
  }
})
```

#### watch() - 侦听器

```javascript
import { ref, watch, watchEffect } from 'vue'

const count = ref(0)
const message = ref('')

// 侦听单个源
watch(count, (newValue, oldValue) => {
  console.log(`count changed from ${oldValue} to ${newValue}`)
})

// 侦听多个源
watch([count, message], ([newCount, newMessage], [oldCount, oldMessage]) => {
  console.log('Multiple values changed')
})

// 立即执行的侦听器
watchEffect(() => {
  console.log(`Count is: ${count.value}`)
  // 会在 count 变化时自动重新执行
})
```

### 3. 生命周期钩子

```javascript
import { 
  onMounted, 
  onUpdated, 
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount
} from 'vue'

export default {
  setup() {
    onBeforeMount(() => {
      console.log('组件即将挂载')
    })
    
    onMounted(() => {
      console.log('组件已挂载')
      // DOM 操作
    })
    
    onBeforeUpdate(() => {
      console.log('组件即将更新')
    })
    
    onUpdated(() => {
      console.log('组件已更新')
    })
    
    onBeforeUnmount(() => {
      console.log('组件即将卸载')
      // 清理工作
    })
    
    onUnmounted(() => {
      console.log('组件已卸载')
    })
  }
}
```

## 🎨 实战案例

### 1. 用户管理组件

```vue
<template>
  <div class="user-manager">
    <div class="search-bar">
      <input 
        v-model="searchQuery" 
        placeholder="搜索用户..."
        class="search-input"
      >
    </div>
    
    <div class="user-list">
      <div 
        v-for="user in filteredUsers" 
        :key="user.id"
        class="user-card"
        @click="selectUser(user)"
      >
        <img :src="user.avatar" :alt="user.name">
        <div class="user-info">
          <h3>{{ user.name }}</h3>
          <p>{{ user.email }}</p>
        </div>
      </div>
    </div>
    
    <div v-if="loading" class="loading">
      加载中...
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserApi } from '@/composables/useUserApi'

// 响应式数据
const searchQuery = ref('')
const selectedUser = ref(null)
const loading = ref(false)

// 使用组合式函数
const { users, fetchUsers } = useUserApi()

// 计算属性
const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  
  return users.value.filter(user => 
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// 方法
const selectUser = (user) => {
  selectedUser.value = user
  console.log('Selected user:', user)
}

// 生命周期
onMounted(async () => {
  loading.value = true
  try {
    await fetchUsers()
  } finally {
    loading.value = false
  }
})
</script>
```

### 2. 组合式函数 - useUserApi

```javascript
// composables/useUserApi.js
import { ref } from 'vue'

export function useUserApi() {
  const users = ref([])
  const loading = ref(false)
  const error = ref(null)
  
  const fetchUsers = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch('/api/users')
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      users.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  
  const createUser = async (userData) => {
    loading.value = true
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      
      if (!response.ok) {
        throw new Error('Failed to create user')
      }
      
      const newUser = await response.json()
      users.value.push(newUser)
      return newUser
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }
  
  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser
  }
}
```

### 3. 表单处理组合式函数

```javascript
// composables/useForm.js
import { ref, reactive } from 'vue'

export function useForm(initialValues = {}) {
  const values = reactive({ ...initialValues })
  const errors = ref({})
  const isSubmitting = ref(false)
  
  const setFieldValue = (field, value) => {
    values[field] = value
    // 清除该字段的错误
    if (errors.value[field]) {
      delete errors.value[field]
    }
  }
  
  const setFieldError = (field, message) => {
    errors.value[field] = message
  }
  
  const validate = (rules) => {
    errors.value = {}
    
    for (const [field, rule] of Object.entries(rules)) {
      const value = values[field]
      
      if (rule.required && (!value || value.trim() === '')) {
        errors.value[field] = rule.message || `${field} 是必填项`
        continue
      }
      
      if (rule.minLength && value.length < rule.minLength) {
        errors.value[field] = `${field} 至少需要 ${rule.minLength} 个字符`
        continue
      }
      
      if (rule.pattern && !rule.pattern.test(value)) {
        errors.value[field] = rule.message || `${field} 格式不正确`
      }
    }
    
    return Object.keys(errors.value).length === 0
  }
  
  const handleSubmit = async (onSubmit, rules = {}) => {
    if (!validate(rules)) {
      return false
    }
    
    isSubmitting.value = true
    
    try {
      await onSubmit(values)
      return true
    } catch (error) {
      console.error('Form submission error:', error)
      return false
    } finally {
      isSubmitting.value = false
    }
  }
  
  const reset = () => {
    Object.keys(values).forEach(key => {
      values[key] = initialValues[key] || ''
    })
    errors.value = {}
  }
  
  return {
    values,
    errors,
    isSubmitting,
    setFieldValue,
    setFieldError,
    validate,
    handleSubmit,
    reset
  }
}
```

## 🚀 最佳实践

### 1. 组合式函数命名规范

```javascript
// ✅ 好的命名
useUserApi()
useLocalStorage()
useEventListener()
useAsyncData()

// ❌ 避免的命名
getUserApi()
localStorage()
eventListener()
```

### 2. 逻辑组织

```javascript
// ✅ 按功能组织
export default {
  setup() {
    // 1. 响应式数据
    const count = ref(0)
    const message = ref('')
    
    // 2. 计算属性
    const doubleCount = computed(() => count.value * 2)
    
    // 3. 方法
    const increment = () => count.value++
    
    // 4. 生命周期
    onMounted(() => {
      console.log('Component mounted')
    })
    
    // 5. 返回模板需要的内容
    return {
      count,
      message,
      doubleCount,
      increment
    }
  }
}
```

### 3. TypeScript 支持

```typescript
import { ref, computed, Ref } from 'vue'

interface User {
  id: number
  name: string
  email: string
}

export function useUsers() {
  const users: Ref<User[]> = ref([])
  const loading = ref(false)
  
  const activeUsers = computed(() => 
    users.value.filter(user => user.active)
  )
  
  const fetchUsers = async (): Promise<void> => {
    loading.value = true
    try {
      const response = await fetch('/api/users')
      users.value = await response.json()
    } finally {
      loading.value = false
    }
  }
  
  return {
    users,
    loading,
    activeUsers,
    fetchUsers
  }
}
```

## 📝 总结

Composition API 为 Vue 3 带来了更强大的逻辑组织能力：

1. **更好的逻辑复用**：通过组合式函数实现
2. **更清晰的代码结构**：相关逻辑聚合在一起
3. **更好的 TypeScript 支持**：完整的类型推导
4. **更灵活的组件设计**：不受选项式 API 限制

掌握 Composition API 是现代 Vue 开发的必备技能，它将帮助你构建更加健壮和可维护的应用程序。

## 🔗 相关资源

- [Vue 3 官方文档](https://vuejs.org/)
- [Composition API RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0013-composition-api.md)
- [VueUse - 实用的组合式函数集合](https://vueuse.org/)

---

希望这篇文章能帮助你更好地理解和使用 Vue 3 的 Composition API！如果你有任何问题或建议，欢迎在评论区交流。