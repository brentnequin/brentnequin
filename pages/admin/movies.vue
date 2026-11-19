<script setup lang="ts">
import { getAdminMovies, setMovieWatched } from '~/services/adminMovies'
import type { AdminMovie } from '~/types/adminMovie'

definePageMeta({ layout: 'admin' })

const { ready, loggedIn } = useUserSession()
const movies = ref<AdminMovie[]>([])
const pending = ref(true)
const error = ref('')
const savingMovieIds = ref(new Set<number>())
const movieErrors = ref(new Map<number, string>())

async function loadMovies() {
  error.value = ''

  try {
    movies.value = await getAdminMovies()
  } catch {
    error.value = 'Could not load recommended movies. Please try again.'
  } finally {
    pending.value = false
  }
}

async function toggleWatched(movie: AdminMovie) {
  if (savingMovieIds.value.has(movie.tmdbId)) return

  const savingIds = new Set(savingMovieIds.value)
  savingIds.add(movie.tmdbId)
  savingMovieIds.value = savingIds

  const errors = new Map(movieErrors.value)
  errors.delete(movie.tmdbId)
  movieErrors.value = errors

  try {
    const result = await setMovieWatched(movie.tmdbId, !movie.isWatched)
    movie.isWatched = result.isWatched
  } catch {
    const nextErrors = new Map(movieErrors.value)
    nextErrors.set(movie.tmdbId, 'Could not update watched status. Please try again.')
    movieErrors.value = nextErrors
  } finally {
    const nextSavingIds = new Set(savingMovieIds.value)
    nextSavingIds.delete(movie.tmdbId)
    savingMovieIds.value = nextSavingIds
  }
}

watch([ready, loggedIn], ([isReady, isLoggedIn]) => {
  if (!isReady) return

  if (isLoggedIn) {
    void loadMovies()
  } else {
    movies.value = []
    pending.value = false
  }
}, { immediate: true })
</script>

<template>
  <section>
    <NuxtLink to="/admin" class="site-nav-link">← Admin dashboard</NuxtLink>
    <p class="site-eyebrow mt-6">Content</p>
    <h1 class="mt-3 text-4xl font-semibold tracking-tight text-black">Movies</h1>
    <p class="mt-4 max-w-2xl leading-7 text-black/65">
      Update watched status for movies recommended on the public movie page.
    </p>

    <div v-if="pending" class="site-card mt-8 p-8 text-black/65" role="status">
      Loading movies...
    </div>

    <div v-else-if="error" class="site-card mt-8 p-8" role="alert">
      <p class="text-red-700">{{ error }}</p>
      <button type="button" class="site-button mt-4" @click="loadMovies">Try again</button>
    </div>

    <div v-else-if="movies.length" class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
      <article
        v-for="movie in movies"
        :key="movie.tmdbId"
        class="site-card flex gap-4 p-4"
      >
        <img
          :src="movie.posterPath ? `https://image.tmdb.org/t/p/w185${movie.posterPath}` : '/placeholder.svg'"
          :alt="movie.title"
          class="h-32 w-22 rounded-xl bg-[#e4efdf] object-cover"
          loading="lazy"
        />
        <div class="flex min-w-0 flex-1 flex-col items-start">
          <h2 class="text-lg font-semibold text-black">{{ movie.title }}</h2>
          <p class="mt-1 text-sm text-black/60">{{ movie.releaseDate?.slice(0, 4) }}</p>
          <span class="site-tag mt-3 px-2 py-1 text-xs">
            {{ movie.isWatched ? 'Watched' : 'Not watched yet' }}
          </span>
          <button
            type="button"
            class="site-button-secondary mt-4"
            :disabled="savingMovieIds.has(movie.tmdbId)"
            @click="toggleWatched(movie)"
          >
            {{
              savingMovieIds.has(movie.tmdbId)
                ? 'Saving...'
                : movie.isWatched
                  ? 'Mark unwatched'
                  : 'Mark watched'
            }}
          </button>
          <p v-if="movieErrors.get(movie.tmdbId)" class="mt-2 text-sm text-red-700" role="alert">
            {{ movieErrors.get(movie.tmdbId) }}
          </p>
        </div>
      </article>
    </div>

    <div v-else class="site-card mt-8 p-8 text-black/65">
      No recommended movies to manage yet.
    </div>
  </section>
</template>
