import type { Movie } from "./movie"

export interface MovieRecommendation {
  id: number
  recommendedName?: string | null
  createdAt: string
  movie: Movie
  message: string
}
