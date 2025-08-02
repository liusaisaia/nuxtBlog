@echo off
echo 🚀 启动 Nuxt 博客项目...
echo.

REM 检查 Node.js 是否安装
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 未检测到 Node.js，请先安装 Node.js 18 或更高版本
    echo 下载地址: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js 已安装
node --version

REM 检查是否存在 node_modules
if not exist "node_modules" (
    echo.
    echo 📦 检测到缺少依赖，正在安装...
    npm install
    if errorlevel 1 (
        echo ❌ 依赖安装失败，尝试修复...
        npm run fix-deps
        if errorlevel 1 (
            echo ❌ 自动修复失败，请手动运行: npm run fix-deps
            pause
            exit /b 1
        )
    )
    echo ✅ 依赖安装完成
)

echo.
echo 🌟 启动开发服务器...
npm run dev

if errorlevel 1 (
    echo.
    echo ❌ 启动失败
    echo 请尝试以下解决方案:
    echo 1. 运行: npm run fix-deps
    echo 2. 检查端口 3000 是否被占用
    echo 3. 查看 TROUBLESHOOTING.md 获取更多帮助
    pause
)
