import prisma from '../lib/prisma'
import { getMovieVoterHash } from '../utils/movieVoter'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Math.max(1, Number(query.page ?? 1) || 1)
  const perPage = Math.min(50, Math.max(1, Number(query.per_page ?? 10) || 10))
  const skip = (page - 1) * perPage

  const [groups, totalRows] = await Promise.all([
    prisma.$queryRaw<Array<{ movieId: number; voteCount: bigint }>>`
      WITH recommendation_counts AS (
        SELECT recommendation."movieId", COUNT(*) AS "recommendationCount", MAX(recommendation."createdAt") AS "lastRecommendedAt"
        FROM "MovieRecommendation" AS recommendation
        WHERE NOT EXISTS (
          SELECT 1
          FROM "MovieViewing" AS viewing
          WHERE viewing."movieId" = recommendation."movieId"
        )
        GROUP BY recommendation."movieId"
      ),
      vote_counts AS (
        SELECT "movieId", COUNT(*) AS "voteCount"
        FROM "MovieVote"
        GROUP BY "movieId"
      )
      SELECT
        recommendations."movieId",
        COALESCE(votes."voteCount", 0) AS "voteCount"
      FROM recommendation_counts AS recommendations
      LEFT JOIN vote_counts AS votes ON votes."movieId" = recommendations."movieId"
      ORDER BY
        COALESCE(votes."voteCount", 0) DESC,
        recommendations."recommendationCount" DESC,
        recommendations."lastRecommendedAt" DESC,
        recommendations."movieId" ASC
      LIMIT ${perPage}
      OFFSET ${skip}
    `,
    prisma.$queryRaw<Array<{ total: bigint }>>`
      SELECT COUNT(DISTINCT recommendation."movieId") AS total
      FROM "MovieRecommendation" AS recommendation
      WHERE NOT EXISTS (
        SELECT 1
        FROM "MovieViewing" AS viewing
        WHERE viewing."movieId" = recommendation."movieId"
      )
    `,
  ])

  const movies = await prisma.movie.findMany({
    where: { id: { in: groups.map(group => group.movieId) } },
    include: { viewings: { select: { id: true } } },
  })
  const movieIds = groups.map(group => group.movieId)
  const voterIdHash = getMovieVoterHash(event)
  const voterVotes = await prisma.movieVote.findMany({
    where: {
      movieId: { in: movieIds },
      voterIdHash,
    },
    select: { movieId: true },
  })
  const votedMovieIds = new Set(voterVotes.map(vote => vote.movieId))
  const moviesById = new Map(movies.map(movie => [movie.id, movie]))
  const items = groups.flatMap((group) => {
    const movie = moviesById.get(group.movieId)

    if (!movie) return []

    const { viewings, ...movieDetails } = movie

    return [{
      movie: movieDetails,
      isWatched: viewings.length > 0,
      voteCount: Number(group.voteCount),
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
