import prisma from '../lib/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { tmdbId, title, posterPath, releaseDate, message, recommendedName } = body

  if (!tmdbId || !title || !releaseDate || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required recommendation fields',
    })
  }

  const movie = await prisma.movie.upsert({
    where: { tmdbId },
    update: {
      title,
      posterPath,
      releaseDate,
    },
    create: {
      tmdbId,
      title,
      posterPath,
      releaseDate,
    },
  })

  const recommendation = await prisma.movieRecommendation.create({
    data: {
      message,
      recommendedName,
      movie: { connect: { id: movie.id } },
    },
    include: { movie: true },
  })

  return recommendation
})
