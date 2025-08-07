<template>
  <div class="py-12 bg-white dark:bg-gray-900 min-h-screen">
    <div class="container-main max-w-4xl mx-auto">
      <!-- 页面标题 -->
      <PageHeader 
        title="关于我们"
        description="欢迎来到现代博客，这里是技术分享与思考碰撞的地方"
      />

      <!-- 主要内容 -->
      <div class="prose prose-lg max-w-none dark:prose-invert mb-16">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <!-- 左侧内容 -->
          <div class="lg:col-span-2 space-y-8">
            <section>
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                我们的故事
              </h2>
              <div class="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  现代博客诞生于对技术分享的热爱和对知识传播的执着。我们相信，在这个快速发展的技术时代，
                  分享经验、交流思想是推动整个行业进步的重要力量。
                </p>
                <p>
                  这个博客系统采用了最新的前端技术栈构建，包括 Nuxt 4、Vue 3、TypeScript、UnoCSS 等，
                  不仅为读者提供了优秀的阅读体验，也展示了现代 Web 开发的最佳实践。
                </p>
                <p>
                  我们致力于创造一个开放、友好的技术交流环境，无论你是初学者还是资深开发者，
                  都能在这里找到有价值的内容和志同道合的朋友。
                </p>
              </div>
            </section>

            <section>
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                我们的使命
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-primary-50 dark:bg-primary-900/10 p-6 rounded-lg">
                  <div class="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="i-heroicons-academic-cap" class="w-6 h-6 text-white" />
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    知识分享
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">
                    分享实用的技术知识和开发经验，帮助更多人成长
                  </p>
                </div>
                <div class="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-lg">
                  <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="i-heroicons-users" class="w-6 h-6 text-white" />
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    社区建设
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">
                    构建活跃的技术社区，促进开发者之间的交流合作
                  </p>
                </div>
                <div class="bg-green-50 dark:bg-green-900/10 p-6 rounded-lg">
                  <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="i-heroicons-rocket-launch" class="w-6 h-6 text-white" />
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    技术创新
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">
                    探索前沿技术，推动 Web 开发技术的发展和应用
                  </p>
                </div>
                <div class="bg-purple-50 dark:bg-purple-900/10 p-6 rounded-lg">
                  <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="i-heroicons-heart" class="w-6 h-6 text-white" />
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    用户体验
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">
                    提供优秀的阅读体验，让知识获取变得更加愉悦
                  </p>
                </div>
              </div>
            </section>
          </div>

          <!-- 右侧边栏 -->
          <div class="space-y-8">
            <!-- 统计信息 -->
            <StatsCard
              title="博客统计"
              :stats="[
                { label: '文章总数', value: stats.totalPosts },
                { label: '分类数量', value: stats.totalCategories },
                { label: '标签数量', value: stats.totalTags },
                { label: '建站时间', value: '2024年' }
              ]"
            />

            <!-- 联系方式 -->
            <ContactCard
              title="联系我们"
              :contacts="[
                { label: 'contact@example.com', href: 'mailto:contact@example.com', icon: 'i-heroicons-envelope' },
                { label: 'GitHub', href: 'https://github.com', icon: 'i-simple-icons-github', target: '_blank' },
                { label: 'Twitter', href: 'https://twitter.com', icon: 'i-simple-icons-twitter', target: '_blank' }
              ]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO 配置
useSeoMeta({
  title: '关于我们 - 现代博客',
  description: '了解现代博客的故事、使命和技术栈。我们致力于创造一个开放、友好的技术交流环境，分享实用的技术知识和开发经验。',
  ogTitle: '关于我们 - 现代博客',
  ogDescription: '了解现代博客的故事、使命和技术栈。我们致力于创造一个开放、友好的技术交流环境，分享实用的技术知识和开发经验。'
})

// 获取统计数据
const { data: allPosts } = await useAsyncData('stats-posts', () =>
  queryContent()
    .where({ _partial: false })
    .find()
)

// 计算统计信息
const stats = computed(() => {
  if (!allPosts.value) {
    return {
      totalPosts: 0,
      totalCategories: 0,
      totalTags: 0
    }
  }

  const categories = new Set()
  const tags = new Set()

  allPosts.value.forEach(post => {
    if (post.category) {
      categories.add(post.category)
    }
    if (post.tags) {
      post.tags.forEach((tag: string) => tags.add(tag))
    }
  })

  return {
    totalPosts: allPosts.value.length,
    totalCategories: categories.size,
    totalTags: tags.size
  }
})

// 技术栈详情
const techDetails = [
  {
    name: 'Nuxt 4',
    description: '基于 Vue 3 的全栈框架，提供服务端渲染和静态生成',
    version: '4.0.2',
    icon: 'i-simple-icons-nuxtdotjs',
    iconColor: 'text-green-500',
    bgColor: 'bg-green-100 dark:bg-green-900/20'
  },
  {
    name: 'Vue 3',
    description: '渐进式 JavaScript 框架，提供响应式和组合式 API',
    version: '3.5.18',
    icon: 'i-simple-icons-vuedotjs',
    iconColor: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/20'
  },
  {
    name: 'TypeScript',
    description: 'JavaScript 的超集，提供静态类型检查',
    version: '5.6.3',
    icon: 'i-simple-icons-typescript',
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20'
  },
  {
    name: 'UnoCSS',
    description: '即时原子化 CSS 引擎，高性能且灵活',
    version: '0.63.6',
    icon: 'i-simple-icons-unocss',
    iconColor: 'text-gray-600',
    bgColor: 'bg-gray-100 dark:bg-gray-700/20'
  },
  {
    name: 'Nuxt UI',
    description: '基于 Tailwind CSS 的 Vue 组件库',
    version: '3.3.0',
    icon: 'i-heroicons-squares-2x2',
    iconColor: 'text-primary-500',
    bgColor: 'bg-primary-100 dark:bg-primary-900/20'
  },
  {
    name: 'Nuxt Content',
    description: '基于文件的 CMS，支持 Markdown 和 MDX',
    version: '2.13.4',
    icon: 'i-heroicons-document-text',
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20'
  }
]
</script>