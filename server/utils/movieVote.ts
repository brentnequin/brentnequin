import type { H3Event } from 'h3'
import prisma from '../lib/prisma'
import { getMovieVoterHash } from './movieVoter'

export async function setMovieVote(event: H3Event, hasVoted: boolean) {
  const rawTmdbId = getRouterParam(event, 'tmdbId')
  const tmdbId = Number(rawTmdbId)

  if (!rawTmdbId || !/^\d+$/.test(rawTmdbId) || !Number.isSafeInteger(tmdbId) || tmdbId < 1) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid movie ID',
    })
  }

  const movie = await prisma.movie.findUnique({
    where: { tmdbId },
    select: { id: true },
  })

  if (!movie) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Movie not found',
    })
  }

  const voterIdHash = getMovieVoterHash(event)

  if (hasVoted) {
    await prisma.movieVote.createMany({
      data: [{ movieId: movie.id, voterIdHash }],
      skipDuplicates: true,
    })
  } else {
    await prisma.movieVote.deleteMany({
      where: { movieId: movie.id, voterIdHash },
    })
  }

  const [voteCount, vote] = await Promise.all([
    prisma.movieVote.count({ where: { movieId: movie.id } }),
    prisma.movieVote.findUnique({
      where: { movieId_voterIdHash: { movieId: movie.id, voterIdHash } },
      select: { movieId: true },
    }),
  ])

  return {
    voteCount,
    hasVoted: vote !== null,
  }
}
