#!/usr/bin/env node

/**
 * Windows 环境修复脚本
 * 解决 better-sqlite3 编译问题
 */

import { execSync } from 'child_process'

console.log('🔧 Windows 环境修复脚本...\n')

try {
  console.log('1. 清理环境...')
  execSync('rm -rf node_modules pnpm-lock.yaml', { stdio: 'inherit' })

  console.log('2. 清理 pnpm 缓存...')
  execSync('pnpm store prune', { stdio: 'inherit' })

  console.log('3. 重新安装依赖 (跳过可选依赖)...')
  execSync('pnpm install --ignore-optional', { stdio: 'inherit' })

  console.log('\n✅ 修复完成！')
  console.log('现在可以运行: pnpm dev')

} catch (error) {
  console.error('\n❌ 自动修复失败')
  console.error('\n🛠️  手动修复步骤:')
  console.error('1. 删除 node_modules 和 pnpm-lock.yaml')
  console.error('2. 运行: pnpm install --ignore-optional')
  console.error('3. 如果还有问题，考虑使用 npm 而不是 pnpm')

  console.error('\n💡 替代方案:')
  console.error('- 使用 npm install 代替 pnpm')
  console.error('- 或者禁用 @nuxt/content 模块')
}
