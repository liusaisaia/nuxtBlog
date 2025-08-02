#!/usr/bin/env node

/**
 * 清理并重新安装脚本
 */

import { execSync } from 'child_process'

console.log('🧹 清理并重新安装...\n')

try {
  console.log('1. 删除 node_modules 和锁文件...')
  execSync('rm -rf node_modules pnpm-lock.yaml .nuxt .output', { stdio: 'inherit' })

  console.log('2. 清理 pnpm 缓存...')
  execSync('pnpm store prune', { stdio: 'inherit' })

  console.log('3. 重新安装依赖...')
  execSync('pnpm install', { stdio: 'inherit' })

  console.log('4. 启动开发服务器...')
  execSync('pnpm dev', { stdio: 'inherit' })

} catch (error) {
  console.error('\n❌ 出现错误')
  console.error('请手动执行以下命令:')
  console.error('1. rm -rf node_modules pnpm-lock.yaml .nuxt .output')
  console.error('2. pnpm install')
  console.error('3. pnpm dev')
}
