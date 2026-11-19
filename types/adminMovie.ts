export interface AdminMovie {
  tmdbId: number
  title: string
  posterPath: string | null
  releaseDate: string | null
  description: string | null
  isWatched: boolean
}
