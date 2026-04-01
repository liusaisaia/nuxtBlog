import { ensureLocalSchema } from '~/server/database'

export default defineNitroPlugin(async () => {
  await ensureLocalSchema()
})
