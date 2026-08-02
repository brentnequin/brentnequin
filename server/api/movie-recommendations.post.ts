import prisma from '../lib/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { tmdbId, title, posterPath, releaseDate, description, message, recommendedName } = body

  if (!tmdbId || !title || !releaseDate) {
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

  const recommendation = await prisma.movieRecommendation.create({
    data: {
      message: message ?? null,
      recommendedName: recommendedName ?? null,
      movie: { connect: { id: movie.id } },
    },
    include: { movie: true },
  })

  return recommendation
})
