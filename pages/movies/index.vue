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
    </div>

    <div v-if="pending" class="rounded-3xl border border-[#d8d1c3] bg-[#f8f5ee]/80 p-8 text-[#5d6774] dark:border-[#263241] dark:bg-[#111827]/70 dark:text-[#c1c7d0]">
      Loading recommendations...
    </div>

    <div v-else-if="error" class="rounded-3xl border border-[#d8d1c3] bg-[#f8f5ee]/80 p-8 text-[#5d6774] dark:border-[#263241] dark:bg-[#111827]/70 dark:text-[#c1c7d0]">
      Failed to load recommendations.
    </div>

    <div v-else>
      <h2 class="mb-4 text-2xl font-semibold text-[#23324a] dark:text-[#f4f1ea]">Recently Recommended</h2>

      <div class="flex flex-wrap gap-6">
        <MovieCard
          v-for="rec in data?.items"
          :key="rec.id"
          :movie="rec.movie"
        />
      </div>
    </div>
  </div>
</template>