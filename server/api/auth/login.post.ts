import { db, schema } from '../../database'
import { createToken } from '../../utils/auth'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import { checkLoginBlocked, clearLoginFailure, recordLoginFailure } from '../../utils/login-rate-limit'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'

  if (!username || !password) {
    throw createError({
      statusCode: 400,
      message: '请输入用户名和密码'
    })
  }

  const blockedIn = checkLoginBlocked(ip, username)
  if (blockedIn) {
    throw createError({
      statusCode: 429,
      message: `登录失败次数过多，请 ${blockedIn} 秒后重试`,
    })
  }

  const result = await db.select().from(schema.users).where(eq(schema.users.username, username)).limit(1)

  if (!result || result.length === 0) {
    recordLoginFailure(ip, username)
    throw createError({
      statusCode: 401,
      message: '用户名或密码错误'
    })
  }

  const user = result[0]!

  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) {
    recordLoginFailure(ip, username)
    throw createError({
      statusCode: 401,
      message: '用户名或密码错误'
    })
  }

  clearLoginFailure(ip, username)
  const token = await createToken(user)

  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      avatar: user.avatar,
      role: user.role
    }
  }
})
