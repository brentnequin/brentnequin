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
