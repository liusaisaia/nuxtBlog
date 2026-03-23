export default defineEventHandler(async (event) => {
  // 清除 cookie
  setCookie(event, 'auth_token', '', {
    httpOnly: true,
    maxAge: 0,
    path: '/'
  })
  
  return { success: true, message: '退出登录成功' }
})
