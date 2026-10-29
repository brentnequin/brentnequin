<script setup lang="ts">
import type { Movie } from '~/types/movie'
import { createRecommendation } from '~/services/movieRecommendations'

const search = ref('')
const results = ref<Movie[]>([])
const selectedMovie = ref<Movie | null>(null)
const submitted = ref(false)
const showDetails = ref(false)

const form = reactive({
  message: '',
  name: ''
})

function toggleDetails() {
  showDetails.value = !showDetails.value
  if (!showDetails.value) {
    form.message = ''
    form.name = ''
  }
}

async function _searchMovies() {

    // useFetch dynamically updates whenever searchQuery changes
    const { data: searchResults } = await useFetch('/api/movies/search', {
        query: {
            query: search.value
        }
    })

    results.value = searchResults.value.results.map((movie: any) => {
        return {
            tmdbId: movie.id,
            title: movie.title,
            posterPath: movie.poster_path,
            releaseDate: movie.release_date,
            description: movie.overview,
        }
    });
}

async function _submitRecommendation() {
    if (!selectedMovie.value) return
    
    await createRecommendation({
        tmdbId: selectedMovie.value.tmdbId,
        title: selectedMovie.value.title,
        posterPath: selectedMovie.value.posterPath,
        releaseDate: selectedMovie.value.releaseDate,
        description: selectedMovie.value.description ?? null,
        message: showDetails.value ? form.message : undefined,
        recommendedName: showDetails.value ? form.name || null : null,
    })

    submitted.value = true
}

function recommendAnother() {
  submitted.value = false
  selectedMovie.value = null
  search.value = ''
  results.value = []

  Object.assign(form, {
    message: '',
    name: ''
  })
}

</script>

<template>
    <div class="mx-auto w-full max-w-5xl px-6 py-12">
        <div class="mx-auto max-w-2xl text-center">
            <p class="site-eyebrow">
        Movie picker
      </p>
            <h1 class="mt-3 text-4xl font-semibold tracking-tight text-black">
        Recommend a Movie
      </h1>
            <div class="mt-4 flex justify-center">
                <NuxtLink to="/movies" class="site-button-secondary">See recommended movies <span aria-hidden="true">→</span></NuxtLink>
            </div>
    </div>

    <form
            class="site-card mx-auto mt-8 flex w-full max-w-3xl flex-col gap-3 p-5 sm:flex-row sm:items-center"
      @submit.prevent="_searchMovies"
      v-if="!selectedMovie"
    >
      <input
        v-model="search"
        placeholder="Search for a movie..."
                class="site-input min-w-0 flex-1"
      />

      <button
                class="site-button shrink-0"
      >
        Search
      </button>
    </form>

        <div
            v-if="!selectedMovie && results"
            class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
            <MovieCard
                v-for="result in results"
                :key="result.tmdbId"
                :movie="result"
                class="cursor-pointer"
                @click="selectedMovie = result"
            />
        </div>

        <div v-if="selectedMovie && !submitted" class="mt-8 flex flex-col gap-6 text-left md:flex-row md:items-start">
            <img
                :src="selectedMovie.posterPath ? `https://image.tmdb.org/t/p/w500${selectedMovie.posterPath}` : '/placeholder.svg'"
                :alt="selectedMovie.title"
                class="site-card max-h-[70vh] w-full bg-[#e4efdf] object-contain md:w-1/3"
                loading="lazy"
            />

            <div class="site-card flex-1 p-6 sm:p-8">
                <div>
                    <h2 class="text-3xl font-semibold text-black">{{ selectedMovie.title }}</h2>
                    <p class="mt-2 text-sm text-black/60">
                        {{ selectedMovie.releaseDate?.slice(0, 4) }}
                    </p>
                </div>
                <div class="site-callout mt-5 rounded-2xl p-4 text-sm leading-6 text-black/75">
                    {{ selectedMovie.description || 'A great choice — add a short note if you want to explain why.' }}
                </div>

                <div class="mt-8 space-y-5">
                    <button
                        type="button"
                        class="site-button-secondary"
                        @click="toggleDetails"
                    >
                        {{ showDetails ? 'Hide optional details' : 'Add optional details' }}
                    </button>

                    <div v-if="showDetails" class="site-callout space-y-5 rounded-2xl p-5">
                        <div>
                            <label class="mb-2 block text-sm font-semibold text-black">
                                Why should I watch this?
                            </label>
                            <textarea
                                v-model="form.message"
                                rows="5"
                                placeholder="What makes this movie special?"
                                class="site-input resize-y"
                            />
                        </div>
                        <div>
                            <label class="mb-2 block text-sm font-semibold text-black">
                                Your name (optional)
                            </label>
                            <input
                                v-model="form.name"
                                placeholder="Your name (optional)"
                                class="site-input"
                            />
                        </div>
                    </div>
                </div>

                <div class="mt-8 grid gap-3 sm:flex sm:items-center">
                    <button
                        class="site-button w-full justify-center py-3 sm:w-auto"
                        @click="_submitRecommendation"
                    >
                        Submit Recommendation
                    </button>
                    <button
                        class="site-button-secondary w-full justify-center py-3 sm:w-auto"
                        @click="selectedMovie = null"
                    >
                        Choose Another Movie
                    </button>
                </div>
            </div>
        </div>

        <div v-if="submitted" class="site-card mx-auto mt-8 flex max-w-2xl flex-col items-center p-8 text-center sm:p-12">
            <div class="site-tag mb-6 flex h-16 w-16 items-center justify-center rounded-full text-3xl" aria-hidden="true">
                ✓
            </div>
            <h2 class="text-3xl font-semibold text-black sm:text-4xl">
                Recommendation submitted
            </h2>
            <p class="mt-4 text-lg text-black/65">
                Thanks for recommending <span class="font-medium text-black">{{ selectedMovie?.title }}</span>!
            </p>
            <button class="site-button mt-8" @click="recommendAnother">
                Recommend another movie
            </button>
        </div>
    </div>
</template>