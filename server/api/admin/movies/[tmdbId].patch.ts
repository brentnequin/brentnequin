import prisma from '../../../lib/prisma'

export default defineEventHandler(async (event) => {
  const tmdbId = Number(getRouterParam(event, 'tmdbId'))
  if (!Number.isSafeInteger(tmdbId) || tmdbId < 1) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid movie ID',
    })
  }

  const body = await readBody(event)
  if (typeof body?.watched !== 'boolean') {
    throw createError({
      statusCode: 400,
      statusMessage: 'The watched field must be a boolean',
    })
  }

  const movie = await prisma.movie.findFirst({
    where: {
      tmdbId,
      recommendations: { some: {} },
    },
    select: { id: true },
  })

  if (!movie) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Recommended movie not found',
    })
  }

  if (body.watched) {
    const existingViewing = await prisma.movieViewing.findFirst({
      where: { movieId: movie.id },
      select: { id: true },
    })

    if (!existingViewing) {
      await prisma.movieViewing.create({
        data: { movieId: movie.id },
      })
    }
  } else {
    await prisma.movieViewing.deleteMany({
      where: { movieId: movie.id },
    })
  }

  return {
    tmdbId,
    isWatched: body.watched,
  }
})
