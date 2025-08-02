#!/usr/bin/env node

/**
 * pnpm 依赖升级脚本
 * 自动升级所有依赖到最新版本
 */

import { execSync } from 'child_process'
import { existsSync } from 'fs'

console.log('🚀 开始升级所有依赖 (使用 pnpm)...\n')

// 1. 检查 pnpm 是否安装
console.log('📋 检查 pnpm...')
try {
  execSync('pnpm --version', { stdio: 'pipe' })
  console.log('✅ pnpm 已安装')
} catch (error) {
  console.error('❌ 未找到 pnpm')
  console.error('请先安装 pnpm: npm install -g pnpm')
  process.exit(1)
}

// 2. 方法一：使用 pnpm update --latest (推荐)
console.log('\n⬆️  使用 pnpm 升级所有依赖到最新版本...')
try {
  console.log('正在检查可更新的依赖...')
  execSync('pnpm outdated', { stdio: 'inherit' })
} catch (error) {
  console.log('所有依赖都是最新版本')
}

try {
  console.log('\n正在升级依赖...')
  execSync('pnpm update --latest', { stdio: 'inherit' })
  console.log('✅ 依赖升级完成')
} catch (error) {
  console.log('⚠️  pnpm update 失败，尝试使用 ncu 方法...')

  // 备用方法：使用 npm-check-updates
  try {
    execSync('ncu --version', { stdio: 'pipe' })
    console.log('使用 npm-check-updates 升级...')
  } catch (ncuError) {
    console.log('安装 npm-check-updates...')
    execSync('npm install -g npm-check-updates', { stdio: 'inherit' })
  }

  execSync('ncu -u', { stdio: 'inherit' })
  console.log('✅ package.json 已更新')

  // 清理并重新安装
  console.log('\n🧹 清理旧依赖...')
  if (existsSync('node_modules')) {
    execSync('rm -rf node_modules', { stdio: 'inherit' })
  }
  if (existsSync('pnpm-lock.yaml')) {
    execSync('rm -f pnpm-lock.yaml', { stdio: 'inherit' })
  }

  console.log('\n📦 重新安装依赖...')
  execSync('pnpm install', { stdio: 'inherit' })
}

// 3. 运行安全审计
console.log('\n🔍 运行安全审计...')
try {
  execSync('pnpm audit', { stdio: 'inherit' })
} catch (error) {
  console.log('⚠️  发现安全问题，运行 pnpm audit --fix 修复')
}

console.log('\n🎉 依赖升级完成!')
console.log('\n📝 下一步:')
console.log('1. 运行 pnpm dev 测试项目')
console.log('2. 检查是否有破坏性变更')
console.log('3. 运行测试确保功能正常')

console.log('\n🔗 有用的 pnpm 命令:')
console.log('pnpm dev         - 启动开发服务器')
console.log('pnpm build       - 构建生产版本')
console.log('pnpm lint        - 运行代码检查')
console.log('pnpm audit --fix - 修复安全问题')
console.log('pnpm outdated    - 检查过时的依赖')
console.log('pnpm up --latest - 升级到最新版本')
