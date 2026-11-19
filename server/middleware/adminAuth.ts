import { requireAdmin } from '../utils/adminAuth'

export default defineEventHandler(async (event) => {
  const pathname = getRequestURL(event).pathname
  if (!pathname.startsWith('/api/admin/')) return

  await requireAdmin(event)
})
