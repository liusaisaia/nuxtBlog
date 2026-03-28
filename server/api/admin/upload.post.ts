import { mkdir, writeFile } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { randomUUID } from 'node:crypto'
import { verifyToken } from '~/server/utils/auth'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
}

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token')
  if (!token) {
    throw createError({ statusCode: 401, message: '未登录' })
  }

  const payload = await verifyToken(token)
  if (!payload) {
    throw createError({ statusCode: 401, message: '登录已过期' })
  }

  const formData = await readMultipartFormData(event)
  if (!formData) {
    throw createError({ statusCode: 400, message: '未接收到上传文件' })
  }

  const fileField = formData.find(item => item.name === 'file')
  if (!fileField || !fileField.data) {
    throw createError({ statusCode: 400, message: '请提供图片文件' })
  }

  if (!fileField.type || !(fileField.type in ALLOWED_MIME_TO_EXT)) {
    throw createError({ statusCode: 400, message: '仅支持 JPG/PNG/WebP/GIF 图片' })
  }

  if (fileField.data.byteLength > MAX_FILE_SIZE) {
    throw createError({ statusCode: 400, message: '图片大小不能超过 5MB' })
  }

  const fromFilename = extname(fileField.filename || '').replace('.', '').toLowerCase()
  const safeExt = /^[a-z0-9]+$/.test(fromFilename) ? fromFilename : ''
  const ext = safeExt || ALLOWED_MIME_TO_EXT[fileField.type]

  const now = new Date()
  const year = String(now.getFullYear())
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const relativeDir = `uploads/${year}/${month}`
  const targetDir = join(process.cwd(), 'public', relativeDir)
  await mkdir(targetDir, { recursive: true })

  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`
  const targetPath = join(targetDir, filename)
  await writeFile(targetPath, fileField.data)

  return {
    success: true,
    url: `/${relativeDir}/${filename}`,
    mimeType: fileField.type,
    size: fileField.data.byteLength,
  }
})
