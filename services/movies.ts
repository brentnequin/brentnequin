interface SearchMoviesOptions {
  query: string
}

interface SearchMoviesResponse {
    page: number
    results: {
        id: number
        title: string
        release_date: string
        poster_path: string
    }[]
    total_pages: number
    total_results: number
}

export const searchMovies = (options: SearchMoviesOptions) => {
  const api = useApi()
  return api.get<SearchMoviesResponse>('/movies', options)
}
