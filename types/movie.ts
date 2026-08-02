export interface Movie {
  tmdbId: number
  title: string
  posterPath?: string | null
  releaseDate: string
  description?: string | null
}
