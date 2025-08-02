#!/usr/bin/env node

/**
 * 项目启动脚本
 * 自动检查和修复常见问题
 */

import { execSync } from 'child_process'
import { existsSync } from 'fs'

console.log('🚀 启动 Nuxt 博客项目...\n')

// 检查 Node.js 版本
const nodeVersion = process.version
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0])

if (majorVersion < 18) {
  console.error('❌ 需要 Node.js 18 或更高版本')
  console.error(`   当前版本: ${nodeVersion}`)
  process.exit(1)
}

console.log(`✅ Node.js 版本: ${nodeVersion}`)

// 检查是否需要安装依赖
if (!existsSync('node_modules')) {
  console.log('\n📦 检测到缺少依赖，正在安装...')
  try {
    execSync('npm install', { stdio: 'inherit' })
    console.log('✅ 依赖安装完成')
  } catch (error) {
    console.error('❌ 依赖安装失败，尝试修复...')
    try {
      execSync('npm run fix-deps', { stdio: 'inherit' })
    } catch (fixError) {
      console.error('❌ 自动修复失败，请手动运行: npm run fix-deps')
      process.exit(1)
    }
  }
}

// 启动开发服务器
console.log('\n🌟 启动开发服务器...')
try {
  execSync('npm run dev', { stdio: 'inherit' })
} catch (error) {
  console.error('\n❌ 启动失败')
  console.error('请尝试以下解决方案:')
  console.error('1. 运行: npm run fix-deps')
  console.error('2. 检查端口 3000 是否被占用')
  console.error('3. 查看 TROUBLESHOOTING.md 获取更多帮助')
}
