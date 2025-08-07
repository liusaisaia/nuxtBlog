#!/bin/bash

# 现代博客部署脚本
# 支持多种部署方式：静态生成、服务端渲染、Docker等

set -e

echo "🚀 开始部署现代博客..."

# 检查Node.js版本
NODE_VERSION=$(node -v)
echo "📦 当前Node.js版本: $NODE_VERSION"

if [[ "$NODE_VERSION" < "v18" ]]; then
    echo "❌ 需要Node.js 18或更高版本"
    exit 1
fi

# 安装依赖
echo "📥 安装依赖..."
npm ci

# 运行代码检查
echo "🔍 运行ESLint检查..."
npm run lint

# 运行TypeScript类型检查
echo "🔧 运行TypeScript类型检查..."
npx vue-tsc --noEmit

# 根据部署类型构建
DEPLOY_TYPE=${1:-"static"}

case $DEPLOY_TYPE in
    "static")
        echo "🏗️ 构建静态站点..."
        npm run generate
        echo "✅ 静态站点构建完成，输出目录: .output/public"
        ;;
    "ssr")
        echo "🏗️ 构建SSR应用..."
        npm run build
        echo "✅ SSR应用构建完成，输出目录: .output"
        ;;
    "preview")
        echo "👀 构建并启动预览..."
        npm run build
        npm run preview
        ;;
    *)
        echo "❌ 未知的部署类型: $DEPLOY_TYPE"
        echo "支持的类型: static, ssr, preview"
        exit 1
        ;;
esac

echo "🎉 部署完成！"