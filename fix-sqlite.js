#!/usr/bin/env node

/**
 * 修复 better-sqlite3 安装问题
 */

import { execSync } from 'child_process'

console.log('🔧 修复 better-sqlite3 安装问题...\n')

try {
  // 1. 清理缓存
  console.log('🧹 清理 pnpm 缓存...')
  execSync('pnpm store prune', { stdio: 'inherit' })

  // 2. 删除 node_modules 和锁文件
  console.log('🗑️  删除 node_modules 和锁文件...')
  execSync('rm -rf node_modules pnpm-lock.yaml', { stdio: 'inherit' })

  // 3. 重新安装依赖
  console.log('📦 重新安装依赖...')
  execSync('pnpm install', { stdio: 'inherit' })

  console.log('\n✅ 修复完成！')
  console.log('现在可以运行: pnpm dev')

} catch (error) {
  console.error('\n❌ 修复失败')
  console.error('请尝试手动执行以下命令:')
  console.error('1. rm -rf node_modules pnpm-lock.yaml')
  console.error('2. pnpm install')
  console.error('3. 如果还有问题，尝试: pnpm add better-sqlite3')
}
