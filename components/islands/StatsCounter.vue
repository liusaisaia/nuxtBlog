<template>
  <div class="card p-6 text-center">
    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
      {{ count }}
    </h3>
    <p class="text-gray-600 dark:text-gray-300 mb-4">{{ label }}</p>
    <button
      @click="increment"
      class="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
    >
      增加计数
    </button>
  </div>
</template>

<script setup lang="ts">
// 这是一个组件岛屿示例，展示 Nuxt 4.0 的新特性
// 组件岛屿可以在服务端渲染的页面中独立进行客户端交互

interface Props {
  label?: string
  initialCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  label: '访问次数',
  initialCount: 0
})

const count = ref(props.initialCount)

const increment = () => {
  count.value++
}

// 模拟从 API 获取数据
onMounted(async () => {
  // 这里可以进行异步数据获取
  await new Promise(resolve => setTimeout(resolve, 100))
  console.log('组件岛屿已挂载')
})
</script>
