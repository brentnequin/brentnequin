import type { MovieRecommendation } from "~/types/movieRecommendation"
import type { PaginatedResponse } from "~/types/pagination"


interface GetRecommendationsOptions {
  perPage?: number
  page?: number
}

export const getRecommendations = (options: GetRecommendationsOptions = {}) => {
  const api = useApi()
  return api.get<PaginatedResponse<MovieRecommendation>>('/movie-recommendations', { per_page: options.perPage })
}

export const createRecommendation = (recommendation: Partial<MovieRecommendation>) => {
  const api = useApi()
  const body = {
    tmdb_id: recommendation.id,
    message: recommendation.message,
    recommender_name: recommendation.recommendedName
  }
  return api.post<MovieRecommendation>('/movie-recommendations', body)
}