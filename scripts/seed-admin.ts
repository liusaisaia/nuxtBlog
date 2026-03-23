import { db } from '../server/database'
import { users } from '../server/database/schema'
import bcrypt from 'bcryptjs'

const password = await bcrypt.hash('admin123', 10)

await db.insert(users).values({
  username: 'admin',
  password,
  displayName: '管理员',
  email: 'admin@example.com',
  role: 'admin'
})

console.log('管理员账户已创建 - 用户名: admin, 密码: admin123')
