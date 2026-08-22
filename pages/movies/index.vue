<script setup lang="ts">
import { getRecommendations } from '~/services/movieRecommendations';

const { data, pending, error } = await useAsyncData(
  'movie-recommendations',
  () => getRecommendations({ perPage: 5 })
)
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 py-16">
    <div class="mb-8">
      <p class="text-sm font-medium uppercase tracking-[0.3em] text-[#6b7280] dark:text-[#9ea8b5]">
        Movie picks
      </p>
      <h1 class="mt-3 text-4xl font-semibold tracking-tight text-[#23324a] dark:text-[#f4f1ea]">
        Movie Recommendations
      </h1>
      <div class="mt-4">
        <NuxtLink to="/movies/recommend" class="inline-flex items-center rounded-full bg-[#23324a] px-4 py-2 text-sm font-medium text-[#f4f1ea] hover:bg-[#304561] dark:bg-[#d9cdb8] dark:text-[#1f2a37] dark:hover:bg-[#e8dccb]">Recommend a movie →</NuxtLink>
      </div>
    </div>

    <div v-if="pending" class="rounded-3xl border border-[#d8d1c3] bg-[#f8f5ee]/80 p-8 text-[#5d6774] dark:border-[#263241] dark:bg-[#111827]/70 dark:text-[#c1c7d0]">
      Loading recommendations...
    </div>

    <div v-else-if="error" class="rounded-3xl border border-[#d8d1c3] bg-[#f8f5ee]/80 p-8 text-[#5d6774] dark:border-[#263241] dark:bg-[#111827]/70 dark:text-[#c1c7d0]">
      Failed to load recommendations.
    </div>

    <div v-else>
      <h2 class="mb-4 text-2xl font-semibold text-[#23324a] dark:text-[#f4f1ea]">Recently Recommended</h2>

      <div v-if="data?.items?.length" class="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <MovieCard
          v-for="rec in data?.items"
          :key="rec.id"
          :movie="rec.movie"
        />
      </div>

      <div v-else class="mt-6 rounded-3xl border border-[#d8d1c3] bg-[#f8f5ee]/80 p-8 text-[#5d6774] dark:border-[#263241] dark:bg-[#111827]/70 dark:text-[#c1c7d0]">
        No recommendations yet. <NuxtLink to="/movies/recommend" class="ml-2 font-medium text-[#23324a] dark:text-[#f4f1ea] hover:underline">Recommend one →</NuxtLink>
      </div>
    </div>
  </div>
</template>