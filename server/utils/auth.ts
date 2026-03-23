import { SignJWT, jwtVerify } from 'jose'
import type { User } from '../database/schema'

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
)

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
