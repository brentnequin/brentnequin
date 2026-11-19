import prisma from '../../lib/prisma'

export default defineEventHandler(async (event) => {
  const movies = await prisma.movie.findMany({
    where: {
      recommendations: { some: {} },
    },
    orderBy: [
      { title: 'asc' },
      { tmdbId: 'asc' },
    ],
    select: {
      tmdbId: true,
      title: true,
      posterPath: true,
      releaseDate: true,
      description: true,
      viewings: {
        select: { id: true },
        take: 1,
      },
    },
  })

  return movies.map(({ viewings, ...movie }) => ({
    ...movie,
    isWatched: viewings.length > 0,
  }))
})
