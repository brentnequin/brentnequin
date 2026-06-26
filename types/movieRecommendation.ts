import type { Movie } from "./movie"

export interface MovieRecommendation {
  id: number
  recommendedName: string
  createdAt: string
  movie: Movie
}
