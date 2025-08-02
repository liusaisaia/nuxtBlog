#!/usr/bin/env node

/**
 * 依赖修复脚本
 * 解决 Nuxt 项目的依赖兼容性问题
 */

import { execSync } from 'child_process'
import { existsSync } from 'fs'

console.log('🔧 开始修复依赖问题...\n')

// 1. 清理现有的依赖和缓存
console.log('🧹 清理现有依赖和缓存...')
try {
  if (existsSync('node_modules')) {
    console.log('  - 删除 node_modules 目录')
    execSync('rm -rf node_modules', { stdio: 'inherit' })
  }

  if (existsSync('package-lock.json')) {
    console.log('  - 删除 package-lock.json')
    execSync('rm -f package-lock.json', { stdio: 'inherit' })
  }

  if (existsSync('.nuxt')) {
    console.log('  - 删除 .nuxt 目录')
    execSync('rm -rf .nuxt', { stdio: 'inherit' })
  }

  if (existsSync('.output')) {
    console.log('  - 删除 .output 目录')
    execSync('rm -rf .output', { stdio: 'inherit' })
  }

  console.log('✅ 清理完成')
} catch (error) {
  console.log('⚠️  清理过程中遇到问题，继续执行...')
}

// 2. 清理 npm 缓存
console.log('\n🗑️  清理 npm 缓存...')
try {
  execSync('npm cache clean --force', { stdio: 'inherit' })
  console.log('✅ npm 缓存清理完成')
} catch (error) {
  console.log('⚠️  npm 缓存清理失败，继续执行...')
}

// 3. 重新安装依赖
console.log('\n📦 重新安装依赖...')
try {
  console.log('  正在安装依赖，这可能需要几分钟...')
  execSync('npm install', { stdio: 'inherit' })
  console.log('✅ 依赖安装完成')
} catch (error) {
  console.error('❌ 依赖安装失败')
  console.error('请尝试以下解决方案：')
  console.error('1. 检查网络连接')
  console.error('2. 尝试使用 yarn 或 pnpm')
  console.error('3. 检查 Node.js 版本 (需要 18+)')
  process.exit(1)
}

// 4. 验证关键依赖
console.log('\n🔍 验证关键依赖...')
try {
  const packageJson = JSON.parse(require('fs').readFileSync('package.json', 'utf8'))
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies }

  const criticalDeps = ['nuxt', 'vue', 'typescript', 'vue-tsc', '@unocss/nuxt']

  for (const dep of criticalDeps) {
    if (dependencies[dep]) {
      console.log(`  ✅ ${dep}: ${dependencies[dep]}`)
    } else {
      console.log(`  ❌ ${dep}: 未找到`)
    }
  }
} catch (error) {
  console.log('⚠️  依赖验证失败')
}

// 5. 运行 Nuxt 准备
console.log('\n⚙️  运行 Nuxt 准备...')
try {
  execSync('npm run postinstall', { stdio: 'inherit' })
  console.log('✅ Nuxt 准备完成')
} catch (error) {
  console.log('⚠️  Nuxt 准备失败，但可能不影响运行')
}

// 6. 完成提示
console.log('\n🎉 依赖修复完成!')
console.log('\n📝 下一步操作:')
console.log('   1. 运行 npm run dev 启动开发服务器')
console.log('   2. 如果仍有问题，请检查 Node.js 版本')
console.log('   3. 考虑使用 yarn 或 pnpm 作为包管理器')

console.log('\n🔗 有用的命令:')
console.log('   npm run dev      - 启动开发服务器')
console.log('   npm run build    - 构建生产版本')
console.log('   npm run lint     - 运行代码检查')
console.log('   npm run clean    - 清理缓存')

console.log('\n💡 如果问题持续存在:')
console.log('   1. 检查 Node.js 版本: node --version (需要 18+)')
console.log('   2. 尝试使用 yarn: yarn install && yarn dev')
console.log('   3. 尝试使用 pnpm: pnpm install && pnpm dev')
