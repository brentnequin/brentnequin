import type { Movie } from "./movie"

export interface MovieRecommendation {
  id: number
  recommendedName?: string | null
  createdAt: string
  movie: Movie
  message: string
}

export interface PublicMovieRecommendationGroup {
  movie: Movie
  isWatched: boolean
  voteCount: number
  hasVoted: boolean
}

export interface MovieVoteResult {
  voteCount: number
  hasVoted: boolean
}
