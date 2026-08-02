import type { MovieRecommendation } from "~/types/movieRecommendation"
import type { PaginatedResponse } from "~/types/pagination"

interface GetRecommendationsOptions {
  perPage?: number
  page?: number
}

interface CreateRecommendationInput {
  tmdbId: number
  title: string
  posterPath?: string | null
  releaseDate: string
  description?: string | null
  message?: string | null
  recommendedName?: string | null
}

export const getRecommendations = (options: GetRecommendationsOptions = {}) => {
  return $fetch<PaginatedResponse<MovieRecommendation>>('/api/movie-recommendations', {
    query: {
      per_page: options.perPage,
      page: options.page,
    },
  })
}

export const createRecommendation = (recommendation: CreateRecommendationInput) => {
  return $fetch<MovieRecommendation>('/api/movie-recommendations', {
    method: 'POST',
    body: {
      tmdbId: recommendation.tmdbId,
      title: recommendation.title,
      posterPath: recommendation.posterPath,
      releaseDate: recommendation.releaseDate,
      description: recommendation.description ?? null,
      message: recommendation.message ?? null,
      recommendedName: recommendation.recommendedName ?? null,
    },
  })
}
