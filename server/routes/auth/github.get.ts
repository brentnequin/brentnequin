import { sendRedirect } from 'nuxt/server'

export default defineOAuthGitHubEventHandler({
  async onSuccess(event, { user }) {
    const config = useRuntimeConfig(event)
    const allowedGithubUsername = config.adminGithubUsername?.trim().toLowerCase()

    if (!allowedGithubUsername) {
      await clearUserSession(event)
      throw createError({
        statusCode: 500,
        statusMessage: 'Admin access is not configured',
      })
    }

    if (user.login.toLowerCase() !== allowedGithubUsername) {
      await clearUserSession(event)
      return sendRedirect(event, '/admin?error=not-authorized')
    }

    await setUserSession(event, {
      user: {
        githubLogin: user.login,
      },
    })

    return sendRedirect(event, '/admin')
  },
  onError(event, error) {
    console.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/admin?error=oauth-failed')
  },
})
