import type { H3Event } from 'h3'

export async function requireAdmin(event: H3Event) {
  const config = useRuntimeConfig(event)
  const allowedGithubUsername = config.adminGithubUsername?.trim().toLowerCase()

  if (!allowedGithubUsername) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Admin access is not configured',
    })
  }

  const session = await getUserSession(event)
  const githubLogin = session.user?.githubLogin

  if (typeof githubLogin !== 'string') {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication required',
    })
  }

  if (githubLogin.trim().toLowerCase() !== allowedGithubUsername) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Admin access required',
    })
  }
}
