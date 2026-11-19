import type { AdminMovie } from '~/types/adminMovie'

export const getAdminMovies = () =>
  $fetch<AdminMovie[]>('/api/admin/movies')

export const setMovieWatched = (tmdbId: number, watched: boolean) =>
  $fetch<{ tmdbId: number, isWatched: boolean }>(`/api/admin/movies/${tmdbId}`, {
    method: 'PATCH',
    body: { watched },
  })
