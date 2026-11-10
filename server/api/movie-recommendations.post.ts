import prisma from '../lib/prisma'
import { getMovieVoterHash } from '../utils/movieVoter'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { tmdbId, title, posterPath, releaseDate, description, message, recommendedName } = body

  if (!tmdbId || !title || !releaseDate) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required recommendation fields',
    })
  }

  const voterIdHash = getMovieVoterHash(event)

  return prisma.$transaction(async (transaction) => {
    const movie = await transaction.movie.upsert({
      where: { tmdbId },
      update: {
        title,
        posterPath,
        releaseDate,
        description,
      },
      create: {
        tmdbId,
        title,
        posterPath,
        releaseDate,
        description,
      },
    })

    const recommendation = await transaction.movieRecommendation.create({
      data: {
        message: message ?? null,
        recommendedName: recommendedName ?? null,
        movie: { connect: { id: movie.id } },
      },
      include: { movie: true },
    })

    await transaction.movieVote.createMany({
      data: [{ movieId: movie.id, voterIdHash }],
      skipDuplicates: true,
    })

    return recommendation
  })
})
