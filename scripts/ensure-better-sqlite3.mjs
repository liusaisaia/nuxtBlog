import { spawnSync } from 'node:child_process'
import { rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

function canLoadBetterSqlite3() {
  try {
    require('better-sqlite3')
    return true
  } catch (error) {
    const message = String(error?.message || '')
    if (message.includes('NODE_MODULE_VERSION') || message.includes('better_sqlite3.node')) {
      return false
    }
    throw error
  }
}

function runPnpm(args, extraEnv = {}) {
  const result = spawnSync('pnpm', args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: {
      ...process.env,
      ...extraEnv,
    },
  })
  return result.status ?? 1
}

function cleanNativeBuildArtifacts() {
  try {
    const pkgPath = require.resolve('better-sqlite3/package.json')
    const buildDir = join(dirname(pkgPath), 'build')
    rmSync(buildDir, { recursive: true, force: true })
  } catch {
    // ignore cleanup failures
  }
}

if (!canLoadBetterSqlite3()) {
  console.warn('[native-check] better-sqlite3 ABI mismatch detected, rebuilding from source...')
  cleanNativeBuildArtifacts()
  const firstTry = runPnpm(['rebuild', 'better-sqlite3'], {
    npm_config_build_from_source: 'true',
  })

  if (firstTry !== 0 || !canLoadBetterSqlite3()) {
    console.warn('[native-check] first rebuild did not fix it, retrying after a clean install...')
    cleanNativeBuildArtifacts()
    const secondTry = runPnpm(['install', '--no-frozen-lockfile'], {
      npm_config_build_from_source: 'true',
    })
    if (secondTry !== 0 || !canLoadBetterSqlite3()) {
      console.error('[native-check] better-sqlite3 still failed after retry.')
      process.exit(1)
    }
  }
  console.log('[native-check] better-sqlite3 rebuilt successfully for current Node runtime.')
}
