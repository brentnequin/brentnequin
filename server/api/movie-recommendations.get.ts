import prisma from '../lib/prisma'
import { getMovieVoterHash } from '../utils/movieVoter'

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
        { _count: { movieId: 'desc' } },
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
    include: { viewings: { select: { id: true } } },
  })
  const movieIds = groups.map(group => group.movieId)
  const voterIdHash = getMovieVoterHash(event)
  const [voteGroups, voterVotes] = await Promise.all([
    prisma.movieVote.groupBy({
      by: ['movieId'],
      where: { movieId: { in: movieIds } },
      _count: { _all: true },
    }),
    prisma.movieVote.findMany({
      where: {
        movieId: { in: movieIds },
        voterIdHash,
      },
      select: { movieId: true },
    }),
  ])
  const voteCountsByMovieId = new Map(voteGroups.map(group => [group.movieId, group._count._all]))
  const votedMovieIds = new Set(voterVotes.map(vote => vote.movieId))
  const moviesById = new Map(movies.map(movie => [movie.id, movie]))
  const items = groups.flatMap((group) => {
    const movie = moviesById.get(group.movieId)

    if (!movie) return []

    const { viewings, ...movieDetails } = movie

    return [{
      movie: movieDetails,
      isWatched: viewings.length > 0,
      voteCount: voteCountsByMovieId.get(group.movieId) ?? 0,
      hasVoted: votedMovieIds.has(group.movieId),
    }]
  })

  return {
    page,
    per_page: perPage,
    total: Number(totalRows[0]?.total ?? 0),
    items,
  }
})
