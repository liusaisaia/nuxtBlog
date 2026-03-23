import { db, schema } from '../../database'
import { createToken } from '../../utils/auth'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  if (!username || !password) {
    throw createError({
      statusCode: 400,
      message: 'Username and password are required'
    })
  }

  const result = await db.select().from(schema.users).where(eq(schema.users.username, username)).limit(1)

  if (!result || result.length === 0) {
    throw createError({
      statusCode: 401,
      message: 'Invalid credentials - user not found'
    })
  }

  const user = result[0]

  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) {
    throw createError({
      statusCode: 401,
      message: 'Invalid credentials'
    })
  }

  const token = await createToken(user)

  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7
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
