type AttemptEntry = {
  count: number
  firstAt: number
  blockedUntil?: number
}

const WINDOW_MS = 10 * 60 * 1000
const BLOCK_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 5
const attempts = new Map<string, AttemptEntry>()

function now() {
  return Date.now()
}

function normalizeUsername(username?: string) {
  return (username || '').trim().toLowerCase()
}

function keyFor(ip: string, username?: string) {
  return `${ip}::${normalizeUsername(username)}`
}

export function checkLoginBlocked(ip: string, username?: string) {
  const key = keyFor(ip, username)
  const entry = attempts.get(key)
  if (!entry) return null

  const ts = now()
  if (entry.blockedUntil && entry.blockedUntil > ts) {
    return Math.ceil((entry.blockedUntil - ts) / 1000)
  }

  if (entry.firstAt + WINDOW_MS < ts) {
    attempts.delete(key)
    return null
  }

  return null
}

export function recordLoginFailure(ip: string, username?: string) {
  const key = keyFor(ip, username)
  const ts = now()
  const current = attempts.get(key)

  if (!current || current.firstAt + WINDOW_MS < ts) {
    attempts.set(key, { count: 1, firstAt: ts })
    return
  }

  current.count += 1
  if (current.count >= MAX_ATTEMPTS) {
    current.blockedUntil = ts + BLOCK_MS
  }
  attempts.set(key, current)
}

export function clearLoginFailure(ip: string, username?: string) {
  attempts.delete(keyFor(ip, username))
}
