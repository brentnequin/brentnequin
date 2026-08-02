import prisma from '../lib/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Number(query.page ?? 1)
  const perPage = Number(query.per_page ?? 10)
  const skip = (page - 1) * perPage

  const [total, items] = await Promise.all([
    prisma.movieRecommendation.count(),
    prisma.movieRecommendation.findMany({
      skip,
      take: perPage,
      orderBy: { createdAt: 'desc' },
      include: { movie: true },
    }),
  ])

  return {
    page,
    per_page: perPage,
    total,
    items,
  }
})
