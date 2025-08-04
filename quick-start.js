#!/usr/bin/env node

/**
 * 快速启动脚本
 */

import { execSync } from 'child_process'

console.log('🚀 快速启动 Nuxt 博客...\n')

try {
  console.log('1. 检查依赖...')
  execSync('pnpm install', { stdio: 'inherit' })

  console.log('2. 启动开发服务器...')
  execSync('pnpm dev', { stdio: 'inherit' })

} catch (error) {
  console.error('\n❌ 启动失败')
  console.error('请检查以下问题:')
  console.error('1. 确保 pnpm 已安装')
  console.error('2. 确保 Node.js 版本 >= 18')
  console.error('3. 检查是否有语法错误的 .vue 文件')

  console.error('\n🔧 故障排除:')
  console.error('- 运行: rm -rf node_modules pnpm-lock.yaml')
  console.error('- 然后: pnpm install')
  console.error('- 最后: pnpm dev')
}
