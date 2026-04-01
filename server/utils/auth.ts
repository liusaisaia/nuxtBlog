import { SignJWT, jwtVerify } from 'jose'
import type { User } from '../database/schema'

const DEFAULT_JWT_SECRET = 'your-secret-key-change-in-production'
const jwtSecret = process.env.JWT_SECRET || DEFAULT_JWT_SECRET

if (process.env.NODE_ENV === 'production' && jwtSecret === DEFAULT_JWT_SECRET) {
  throw new Error('JWT_SECRET 未配置，生产环境已禁止使用默认密钥')
}

const secret = new TextEncoder().encode(jwtSecret)

export async function createToken(user: Pick<User, 'id' | 'username' | 'role'>) {
  return new SignJWT({ 
    id: user.id, 
    username: user.username, 
    role: user.role 
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as { id: number; username: string; role: string }
  } catch {
    return null
  }
}
