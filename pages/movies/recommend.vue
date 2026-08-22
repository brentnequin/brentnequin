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
  <div class="w-full px-6 py-16 text-center">
    <div class="mx-auto max-w-2xl">
      <p class="text-sm font-medium uppercase tracking-[0.3em] text-[#6b7280] dark:text-[#9ea8b5]">
        Movie picker
      </p>
      <h1 class="mt-3 text-4xl font-semibold tracking-tight text-[#23324a] dark:text-[#f4f1ea]">
        Recommend a Movie
      </h1>
            <div class="mt-4">
                <NuxtLink to="/movies" class="text-sm font-medium text-[#23324a] dark:text-[#f4f1ea] hover:underline">See recommended movies →</NuxtLink>
            </div>
    </div>

    <form
      class="mx-auto mt-8 flex w-full max-w-6xl flex-col gap-3 rounded-3xl border border-[#d8d1c3] bg-[#f8f5ee]/80 p-6 shadow-[0_18px_45px_-25px_rgba(35,50,74,0.35)] backdrop-blur-sm sm:flex-row sm:items-center dark:border-[#263241] dark:bg-[#111827]/70"
      @submit.prevent="_searchMovies"
      v-if="!selectedMovie"
    >
      <input
        v-model="search"
        placeholder="Search for a movie..."
        class="flex-1 rounded-full border border-[#b7b0a0] bg-white/70 px-4 py-3 text-sm text-[#23324a] outline-none transition focus:border-[#23324a] dark:border-[#4b5563] dark:bg-[#1f2937] dark:text-[#f4f1ea]"
      />

      <button
        class="rounded-full bg-[#23324a] px-5 py-3 text-sm font-medium text-[#f4f1ea] transition hover:bg-[#304561] dark:bg-[#d9cdb8] dark:text-[#1f2a37] dark:hover:bg-[#e8dccb]"
      >
        Search
      </button>
    </form>

        <!-- Results -->
        <div
            class="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            v-if="!selectedMovie && results"
        >
            <MovieCard
                class="cursor-pointer transition hover:-translate-y-1"
                v-for="result in results"
                :key="result.tmdbId"
                :movie="result"
                @click="selectedMovie = result"
            />
        </div>

        <!-- Form -->
        <div class="flex flex-col gap-6 text-left md:flex-row md:items-start" v-if="selectedMovie && !submitted">
            <img
                :src="selectedMovie.posterPath ? `https://image.tmdb.org/t/p/w500${selectedMovie.posterPath}` : '/placeholder.svg'"
                :alt="selectedMovie.title"
                class="w-full max-h-[70vh] rounded-[32px] object-contain shadow-xl ring-1 ring-slate-200 dark:ring-slate-700 md:w-1/3"
                loading="lazy"
            />

            <div class="flex-1 rounded-[32px] bg-white p-8 shadow-xl ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800">
                <div class="flex flex-col gap-3">
                    <div>
                        <h2 class="text-3xl font-semibold text-slate-900 dark:text-slate-100">{{ selectedMovie.title }}</h2>
                        <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            {{ selectedMovie.releaseDate?.slice(0, 4) }}
                        </p>
                    </div>
                    <div class="rounded-[24px] bg-slate-50 p-4 text-sm text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-300">
                        <p>
                            {{ selectedMovie.description || 'A great choice — add a short note if you want to explain why.' }}
                        </p>
                    </div>
                </div>

                <div class="mt-8 space-y-6">
                    <button
                        type="button"
                        class="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 shadow-sm transition hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
                        @click="toggleDetails"
                    >
                        {{ showDetails ? 'Hide optional details' : 'Add optional details' }}
                    </button>

                    <div v-if="showDetails" class="space-y-5 rounded-[24px] border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                        <div>
                            <label class="mb-2 block text-sm font-semibold text-slate-900 dark:text-slate-100">
                                Why should I watch this?
                            </label>
                            <textarea
                                v-model="form.message"
                                rows="5"
                                placeholder="What makes this movie special?"
                                class="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
                            />
                        </div>
                        <div>
                            <label class="mb-2 block text-sm font-semibold text-slate-900 dark:text-slate-100">
                                Your name (optional)
                            </label>
                            <input
                                v-model="form.name"
                                placeholder="Your name (optional)"
                                class="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
                            />
                        </div>
                    </div>
                </div>

                <div class="mt-8 grid gap-3 sm:flex sm:items-center">
                    <button
                        class="w-full rounded-3xl bg-slate-900 px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
                        @click="_submitRecommendation"
                    >
                        Submit Recommendation
                    </button>
                    <button
                        class="w-full rounded-3xl border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
                        @click="selectedMovie = null"
                    >
                        Choose Another Movie
                    </button>
                </div>
            </div>
        </div>

        <!-- Submitted -->
         <div
            v-if="submitted"
            class="
                mx-auto flex max-w-2xl
                flex-col items-center
                py-24 text-center
            "
            >
            <div
                class="
                mb-6 flex h-16 w-16
                items-center justify-center
                rounded-full
                bg-green-100
                text-3xl
                "
            >
                ✓
            </div>

            <h1 class="text-4xl font-bold">
                Recommendation Submitted
            </h1>

            <p class="mt-4 text-lg text-gray-500 dark:text-gray-400">
                Thanks for recommending
                <span class="font-medium">
                {{ selectedMovie?.title }}
                </span>
                !
            </p>

            <button
                class="
                mt-10 rounded-xl
                bg-gray-900 px-6 py-3
                text-white
                hover:bg-gray-800
                "
                @click="recommendAnother"
            >
                Recommend Another Movie
            </button>
        </div>
    </div>
</template>