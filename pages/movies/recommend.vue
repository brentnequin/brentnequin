<script setup lang="ts">
import { searchMovies } from '~/services/movies'
import type { Movie } from '~/types/movie'
import { createRecommendation } from '~/services/movieRecommendations'

const search = ref('')
const results = ref<Movie[]>([])
const selectedMovie = ref<Movie | null>(null)
const submitted = ref(false)

const form = reactive({
  message: '',
  name: ''
})

async function _searchMovies() {

    const response = await searchMovies({query: search.value})

    results.value = response.results.map((movie) => {
        return {
            tmdbId: movie.id,
            title: movie.title,
            posterPath: movie.poster_path,
            releaseDate: movie.release_date
        }
    });
}

async function _submitRecommendation() {
    if (!selectedMovie.value) return
    
    await createRecommendation({
        id: selectedMovie.value.tmdbId,
        message: form.message,
        recommendedName: form.name
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

    <div class="mx-auto py-16 text-center">

        <h1 class="mb-8 text-4xl font-bold">
          Recommend a Movie
        </h1>
    
        <!-- Search -->
        <form
            class="space-x-4 mb-8"
            @submit.prevent="_searchMovies"
            v-if="!selectedMovie"
          >
            <input
              v-model="search"
              placeholder="Search for a movie..."
              class="flex-1 rounded-lg border p-3"
            />
    
            <button
              class="rounded-lg border border-gray-700 px-5 py-3 hover:bg-gray-900"
            >
              Search
            </button>
        </form>

        <!-- Results -->
        <div
            class="grid grid-cols-5 gap-8"
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
        <div class="flex gap-4 text-left" v-if="selectedMovie && !submitted">
            <img
                :src="`https://image.tmdb.org/t/p/w500${selectedMovie.posterPath}`"
                :alt="selectedMovie.title"
                class="h-128 object-cover rounded-xl"
                loading="lazy"
            />
            <div class="bg-gray-400 rounded-xl p-4 space-y-4">
                <h2 class="text-2xl">{{ selectedMovie.title }}</h2>
                <p class="mt-1 text-gray-500">
                    {{ selectedMovie.releaseDate?.slice(0, 4) }}
                </p>
                <div>
                    <label class="mb-2 block font-medium">
                        Why should I watch this?
                    </label>
                    <textarea
                        v-model="form.message"
                        rows="5"
                        placeholder="What makes this movie special?"
                        class="w-full rounded-lg border p-3"
                    />
                </div>
                <div>
                    <label class="mb-2 block font-medium">
                        Your name (optional)
                    </label>
    
                    <input
                        v-model="form.name"
                        placeholder="Your name (optional)"
                        class="w-full rounded-lg border p-3"
                    />
                </div>
                <div class="space-x-2">
                    <button
                        class="rounded-lg bg-gray-800 px-6 py-3 text-white"
                        @click="_submitRecommendation"
                    >
                        Submit Recommendation
                    </button>
                    <button
                        class="rounded-lg bg-gray-800 px-6 py-3 text-white"
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