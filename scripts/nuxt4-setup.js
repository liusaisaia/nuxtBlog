#!/usr/bin/env node

/**
 * Nuxt 4.0 兼容性设置脚本
 * 确保项目完全兼容 Nuxt 4.0
 */

import { execSync } from 'child_process'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

console.log('🚀 开始 Nuxt 4.0 兼容性设置...\n')

// 1. 检查 Node.js 版本
console.log('📋 检查 Node.js 版本...')
const nodeVersion = process.version
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0])

if (majorVersion < 18) {
  console.error('❌ Nuxt 4.0 需要 Node.js 18 或更高版本')
  console.error(`   当前版本: ${nodeVersion}`)
  process.exit(1)
} else {
  console.log(`✅ Node.js 版本检查通过: ${nodeVersion}`)
}

// 2. 检查 package.json 中的 Nuxt 版本
console.log('\n📋 检查 Nuxt 版本...')
const packageJsonPath = join(process.cwd(), 'package.json')
if (existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
  const nuxtVersion = packageJson.dependencies?.nuxt || packageJson.devDependencies?.nuxt

  if (nuxtVersion && nuxtVersion.includes('4.0')) {
    console.log(`✅ Nuxt 版本检查通过: ${nuxtVersion}`)
  } else {
    console.log(`⚠️  当前 Nuxt 版本: ${nuxtVersion || '未找到'}`)
    console.log('   建议升级到 Nuxt 4.0')
  }
} else {
  console.error('❌ 未找到 package.json 文件')
  process.exit(1)
}

// 3. 检查 nuxt.config.ts 配置
console.log('\n📋 检查 Nuxt 配置...')
const configPath = join(process.cwd(), 'nuxt.config.ts')
if (existsSync(configPath)) {
  const configContent = readFileSync(configPath, 'utf8')

  if (configContent.includes('compatibilityVersion: 4')) {
    console.log('✅ Nuxt 4.0 兼容模式已启用')
  } else {
    console.log('⚠️  未检测到 Nuxt 4.0 兼容模式配置')
    console.log('   请确保在 nuxt.config.ts 中添加:')
    console.log('   future: { compatibilityVersion: 4 }')
  }
} else {
  console.error('❌ 未找到 nuxt.config.ts 文件')
}

// 4. 清理缓存
console.log('\n🧹 清理缓存...')
try {
  // 清理 .nuxt 目录
  if (existsSync('.nuxt')) {
    execSync('rm -rf .nuxt', { stdio: 'inherit' })
    console.log('✅ 已清理 .nuxt 目录')
  }

  // 清理 .output 目录
  if (existsSync('.output')) {
    execSync('rm -rf .output', { stdio: 'inherit' })
    console.log('✅ 已清理 .output 目录')
  }

  // 清理 node_modules/.cache
  if (existsSync('node_modules/.cache')) {
    execSync('rm -rf node_modules/.cache', { stdio: 'inherit' })
    console.log('✅ 已清理 node_modules 缓存')
  }
} catch (error) {
  console.log('⚠️  缓存清理失败，请手动清理')
}

// 5. 安装依赖
console.log('\n📦 检查依赖安装...')
if (!existsSync('node_modules')) {
  console.log('正在安装依赖...')
  try {
    execSync('npm install', { stdio: 'inherit' })
    console.log('✅ 依赖安装完成')
  } catch (error) {
    console.error('❌ 依赖安装失败')
    console.error('请手动运行: npm install')
  }
} else {
  console.log('✅ 依赖已安装')
}

// 6. 运行类型检查
console.log('\n🔍 运行类型检查...')
try {
  execSync('npm run typecheck', { stdio: 'inherit' })
  console.log('✅ 类型检查通过')
} catch (error) {
  console.log('⚠️  类型检查失败，请检查 TypeScript 配置')
}

// 7. 完成提示
console.log('\n🎉 Nuxt 4.0 兼容性设置完成!')
console.log('\n📝 下一步操作:')
console.log('   1. 运行 npm run dev 启动开发服务器')
console.log('   2. 访问 http://localhost:3000 查看应用')
console.log('   3. 查看 nuxt4-compatibility.md 了解更多信息')
console.log('\n🔗 有用的命令:')
console.log('   npm run dev      - 启动开发服务器')
console.log('   npm run build    - 构建生产版本')
console.log('   npm run typecheck - 运行类型检查')
console.log('   npm run lint     - 运行代码检查')
console.log('   npm run clean    - 清理缓存')
