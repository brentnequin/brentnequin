import prisma from '../lib/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Math.max(1, Number(query.page ?? 1) || 1)
  const perPage = Math.min(50, Math.max(1, Number(query.per_page ?? 10) || 10))
  const skip = (page - 1) * perPage

  const [groups, totalRows] = await Promise.all([
    prisma.movieRecommendation.groupBy({
      by: ['movieId'],
      _count: { _all: true },
      _max: { createdAt: true },
      orderBy: [
        { _max: { createdAt: 'desc' } },
        { movieId: 'asc' },
      ],
      skip,
      take: perPage,
    }),
    prisma.$queryRaw<Array<{ total: bigint }>>`
      SELECT COUNT(DISTINCT "movieId") AS total
      FROM "MovieRecommendation"
    `,
  ])

  const movies = await prisma.movie.findMany({
    where: { id: { in: groups.map(group => group.movieId) } },
  })
  const moviesById = new Map(movies.map(movie => [movie.id, movie]))
  const items = groups.flatMap((group) => {
    const movie = moviesById.get(group.movieId)

    return movie
      ? [{ movie, recommendationCount: group._count._all }]
      : []
  })

  return {
    page,
    per_page: perPage,
    total: Number(totalRows[0]?.total ?? 0),
    items,
  }
})
