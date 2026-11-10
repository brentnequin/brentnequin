import { createHash, randomBytes } from 'node:crypto'
import type { H3Event } from 'h3'

const voterCookieName = 'movie_voter_id'
const voterCookieMaxAge = 60 * 60 * 24 * 365

export function getMovieVoterHash(event: H3Event) {
  let voterId = getCookie(event, voterCookieName)

  if (!voterId || !/^[\w-]{43}$/.test(voterId)) {
    voterId = randomBytes(32).toString('base64url')
    setCookie(event, voterCookieName, voterId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: voterCookieMaxAge,
    })
  }

  return createHash('sha256').update(voterId).digest('hex')
}
